import { createFileRoute } from "@tanstack/react-router";
import {
  MCP_PAID_ONLY_MESSAGE,
  MCP_UPGRADE_MESSAGE,
  authenticateMcpToken,
} from "@/lib/mcp-tokens.server";
import { callMcpTool, listMcpTools } from "@/lib/mcp-tools.server";
import { checkRateLimit, rateLimitedResponse } from "@/lib/rate-limit.server";

/**
 * FormaBill MCP endpoint (Pro-only) — Streamable-HTTP-compatible JSON-RPC.
 *
 * Connect any MCP-compatible client (Claude Desktop custom integrations,
 * Cursor, Windsurf, …) to `https://<host>/api/mcp` with header
 * `Authorization: Bearer <personal-access-token>` (generated in Settings →
 * AI / MCP). Stateless: every request carries auth; no session ids.
 *
 * Supported methods: `initialize`, `notifications/initialized`, `ping`,
 * `tools/list`, `tools/call`. Tool failures resolve as MCP `isError` results
 * (transport stays 200); only auth/rate-limit/parse problems use HTTP errors.
 */

const SUPPORTED_PROTOCOLS = ["2024-11-05", "2025-03-26", "2025-06-18"];
const LATEST_PROTOCOL = "2025-06-18";
const SERVER_INFO = { name: "formabill", version: "1.0.0" };

type JsonRpcId = string | number | null;
type JsonRpcRequest = {
  jsonrpc?: unknown;
  id?: JsonRpcId;
  method?: unknown;
  params?: unknown;
};

/** Permissive CORS: Bearer tokens carry auth, so any origin may call. */
function corsHeaders(): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Authorization, Content-Type, Accept, Mcp-Protocol-Version",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
  };
}

function response(id: JsonRpcId, result: unknown): Response {
  return Response.json({ jsonrpc: "2.0", id, result }, { headers: corsHeaders() });
}

function error(id: JsonRpcId, code: number, message: string): Response {
  return Response.json(
    { jsonrpc: "2.0", id, error: { code, message } },
    { headers: corsHeaders() },
  );
}

function httpError(message: string, status: number): Response {
  return Response.json({ error: message }, { status, headers: corsHeaders() });
}

function bearerToken(request: Request): string | null {
  const header = request.headers.get("authorization") ?? "";
  const match = /^Bearer\s+(.+)$/i.exec(header.trim());
  const token = match?.[1]?.trim();
  return token ? token : null;
}

async function handleOne(request: Request, userId: string, raw: unknown): Promise<Response | null> {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return error(null, -32600, "Invalid Request: expected a JSON-RPC object.");
  }
  const { jsonrpc, id = null, method, params } = raw as JsonRpcRequest;
  if (jsonrpc !== "2.0" || typeof method !== "string") {
    return error(id ?? null, -32600, "Invalid Request: bad jsonrpc version or method.");
  }

  // Notifications (no id) get no body back.
  if (method === "notifications/initialized") {
    return new Response(null, { status: 202 });
  }

  const requestId = (id ?? null) as JsonRpcId;
  if (method === "initialize") {
    const requested =
      params && typeof params === "object" && !Array.isArray(params)
        ? (params as { protocolVersion?: unknown }).protocolVersion
        : undefined;
    return response(requestId, {
      protocolVersion:
        typeof requested === "string" && SUPPORTED_PROTOCOLS.includes(requested)
          ? requested
          : LATEST_PROTOCOL,
      capabilities: { tools: {} },
      serverInfo: SERVER_INFO,
    });
  }
  if (method === "ping") return response(requestId, {});
  if (method === "tools/list") return response(requestId, { tools: listMcpTools() });
  if (method === "tools/call") {
    const args =
      params && typeof params === "object" && !Array.isArray(params)
        ? (params as { name?: unknown; arguments?: unknown })
        : {};
    if (typeof args.name !== "string" || !args.name) {
      return error(requestId, -32602, 'Invalid params: "name" is required.');
    }
    const result = await callMcpTool(userId, args.name, args.arguments);
    return response(requestId, result);
  }
  return error(requestId, -32601, `Method not found: ${method}.`);
}

export const Route = createFileRoute("/api/mcp")({
  server: {
    handlers: {
      GET: () =>
        Response.json(
          {
            error:
              "FormaBill MCP endpoint. Connect with Streamable HTTP: POST JSON-RPC to this URL with an Authorization: Bearer <token> header.",
          },
          { status: 405, headers: { Allow: "POST", ...corsHeaders() } },
        ),
      // CORS preflight for browser- and extension-based MCP clients.
      OPTIONS: () =>
        new Response(null, {
          status: 204,
          headers: corsHeaders(),
        }),
      POST: async ({ request }) => {
        const token = bearerToken(request);
        if (!token) {
          return httpError(
            "Missing MCP token. Send Authorization: Bearer <token> (Settings → AI / MCP).",
            401,
          );
        }
        const auth = await authenticateMcpToken(token).catch(() => null);
        if (!auth || !auth.ok) {
          const message =
            auth?.reason === "not_pro"
              ? MCP_UPGRADE_MESSAGE
              : auth?.reason === "paid_only"
                ? MCP_PAID_ONLY_MESSAGE
                : "Invalid or revoked MCP token. Generate a new one in Settings → AI / MCP.";
          return httpError(
            message,
            auth?.reason === "not_pro" || auth?.reason === "paid_only" ? 403 : 401,
          );
        }
        const limit = checkRateLimit(`mcp:${auth.tokenId}`, 100, 60_000);
        if (!limit.allowed) {
          const limited = rateLimitedResponse(limit.retryAfterSec);
          const headers = new Headers(limited.headers);
          for (const [key, value] of Object.entries(corsHeaders())) headers.set(key, value);
          return new Response(limited.body, { status: limited.status, headers });
        }

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return error(null, -32700, "Parse error: body must be JSON.");
        }
        if (Array.isArray(body)) {
          // JSON-RPC batch: resolve each entry, drop notification responses.
          const settled = await Promise.all(
            body.map(async (entry) => {
              const res = await handleOne(request, auth.userId, entry);
              if (!res) return null;
              if (res.status === 202) return null;
              return res.json();
            }),
          );
          return Response.json(settled.filter((entry) => entry !== null), {
            headers: corsHeaders(),
          });
        }
        const res = await handleOne(request, auth.userId, body);
        if (!res) return new Response(null, { status: 202, headers: corsHeaders() });
        const headers = new Headers(res.headers);
        for (const [key, value] of Object.entries(corsHeaders())) headers.set(key, value);
        return new Response(res.body, { status: res.status, headers });
      },
    },
  },
});
