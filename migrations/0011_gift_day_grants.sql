alter table "gift_codes" add column if not exists "giftDurationDays" integer;
alter table "gift_codes" add column if not exists "planType" text;

-- Backfill day grants from the old month grants (1mo = 30 days) so existing
-- unused codes keep their promised value under the new model.
update "gift_codes"
set "giftDurationDays" = "durationMonths" * 30
where "giftDurationDays" is null;
