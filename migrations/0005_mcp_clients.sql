create table if not exists "mcp_clients" (
  "id" text not null primary key,
  "userId" text not null references "user" ("id") on delete cascade,
  "name" text not null,
  "email" text not null default '',
  "createdAt" timestamptz default CURRENT_TIMESTAMP not null
);

create index if not exists "mcp_clients_user_idx" on "mcp_clients" ("userId");
