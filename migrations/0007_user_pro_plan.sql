alter table "user" add column if not exists "proPlan" text;
alter table "user" add column if not exists "proExpiresAt" timestamptz;
