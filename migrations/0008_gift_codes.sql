create table if not exists "gift_codes" (
  "id" text not null primary key,
  "code" text not null unique,
  "createdBy" text not null references "user" ("id") on delete cascade,
  "durationMonths" integer not null,
  "expiresAt" timestamptz not null,
  "redeemedBy" text references "user" ("id") on delete set null,
  "redeemedAt" timestamptz,
  "createdAt" timestamptz default CURRENT_TIMESTAMP not null
);

create index if not exists "gift_codes_creator_idx" on "gift_codes" ("createdBy");
