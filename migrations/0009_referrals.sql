create table if not exists "referral_codes" (
  "userId" text not null primary key references "user" ("id") on delete cascade,
  "code" text not null unique,
  "createdAt" timestamptz default CURRENT_TIMESTAMP not null
);

create table if not exists "referrals" (
  "id" text not null primary key,
  "referrerUserId" text not null references "user" ("id") on delete cascade,
  "referredUserId" text not null unique references "user" ("id") on delete cascade,
  "createdAt" timestamptz default CURRENT_TIMESTAMP not null,
  "rewardedAt" timestamptz
);

create index if not exists "referrals_referrer_idx" on "referrals" ("referrerUserId");
