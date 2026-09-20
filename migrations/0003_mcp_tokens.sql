create table if not exists "mcp_tokens" (
  "id" text not null primary key,
  "userId" text not null references "user" ("id") on delete cascade,
  "name" text not null,
  "tokenHash" text not null unique,
  "prefix" text not null,
  "createdAt" timestamptz default CURRENT_TIMESTAMP not null,
  "lastUsedAt" timestamptz,
  "revokedAt" timestamptz
);

create index if not exists "mcp_tokens_user_idx" on "mcp_tokens" ("userId");
