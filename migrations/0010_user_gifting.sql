alter table "user" add column if not exists "proSource" text;
alter table "user" add column if not exists "canGift" boolean not null default false;
alter table "user" add column if not exists "giftsRemaining" integer not null default 0;

-- Backfill: the only server-side path that ever set isPro=true was the paid
-- Razorpay webhook, so existing permanent-Pro rows are paid subscribers.
update "user"
set "proSource" = 'subscription', "canGift" = true, "giftsRemaining" = 3
where "isPro" and "proSource" is null and not coalesce("isLifetimePro", false);
