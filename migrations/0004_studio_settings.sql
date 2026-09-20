create table if not exists "studio_settings" (
  "userId" text not null primary key references "user" ("id") on delete cascade,
  "data" jsonb not null default '{}',
  "updatedAt" timestamptz default CURRENT_TIMESTAMP not null
);
