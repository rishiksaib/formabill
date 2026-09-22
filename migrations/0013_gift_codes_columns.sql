-- Repair migration: guarantees the gift-code columns the API selects,
-- no matter which earlier migration state a database is in. Fully idempotent:
-- safe to apply on fresh databases, fully migrated ones, and anything stuck
-- in between (e.g. a deploy that shipped code newer than its last migrate run).
--
-- Ordering matters: the column is added WITHOUT a default first so the
-- backfill below can tell legacy rows (NULL) apart from real values. A
-- NOT NULL DEFAULT added up front would stamp every legacy row with the
-- default and silently devalue old multi-month codes.
alter table "gift_codes" add column if not exists "giftDurationDays" integer;
alter table "gift_codes" add column if not exists "planType" text;

-- Backfill day grants for rows minted before day grants existed.
update "gift_codes"
set "giftDurationDays" = "durationMonths" * 30
where "giftDurationDays" is null;

-- Normalize the column for all histories (no-op where already correct).
alter table "gift_codes" alter column "giftDurationDays" set default 7;
alter table "gift_codes" alter column "giftDurationDays" set not null;
