-- Tathastu / Sankalp mweb V1 schema
-- Run this after docs/api/supabase-phase1-schema.sql.
-- Purpose: production-shaped mobile web booking flow with dummy OTP now and Twilio later.

create extension if not exists pgcrypto;

create table if not exists public.mweb_leads (
  id uuid primary key default gen_random_uuid(),
  phone text not null unique,
  name text,
  last_verified_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.mweb_otp_challenges (
  id uuid primary key default gen_random_uuid(),
  phone text not null,
  code_hash text not null,
  provider text not null default 'dummy' check (provider in ('dummy', 'twilio')),
  status text not null default 'pending'
    check (status in ('pending', 'verified', 'expired', 'locked')),
  attempts integer not null default 0 check (attempts >= 0),
  max_attempts integer not null default 5 check (max_attempts > 0),
  expires_at timestamptz not null default (now() + interval '10 minutes'),
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.mweb_home_banners (
  id uuid primary key default gen_random_uuid(),
  ritual_id uuid references public.rituals(id) on delete set null,
  badge text not null,
  title text not null,
  subtitle text not null,
  visual_tone text not null default 'clay',
  display_order integer not null default 0,
  status text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.mweb_ritual_use_cases (
  id uuid primary key default gen_random_uuid(),
  ritual_id uuid not null references public.rituals(id) on delete cascade,
  group_label text not null,
  icon_name text not null default 'sparkles',
  title text not null,
  subtitle text not null,
  price_minor integer not null check (price_minor >= 0),
  currency text not null default 'INR',
  is_popular boolean not null default false,
  display_order integer not null default 0,
  status text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.mweb_time_slots (
  id uuid primary key default gen_random_uuid(),
  ritual_id uuid references public.rituals(id) on delete cascade,
  slot_date date not null,
  slot_time time not null,
  label text,
  is_auspicious boolean not null default false,
  capacity integer not null default 50 check (capacity > 0),
  booked_count integer not null default 0 check (booked_count >= 0),
  status text not null default 'open' check (status in ('open', 'full', 'blocked')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (ritual_id, slot_date, slot_time)
);

create table if not exists public.mweb_bookings (
  id uuid primary key default gen_random_uuid(),
  booking_number text not null unique,
  lead_id uuid not null references public.mweb_leads(id) on delete restrict,
  phone text not null,
  customer_name text not null,
  ritual_id uuid references public.rituals(id) on delete restrict,
  ritual_title text not null,
  use_case_id uuid references public.mweb_ritual_use_cases(id) on delete set null,
  use_case_title text,
  slot_id uuid references public.mweb_time_slots(id) on delete set null,
  preferred_date date,
  preferred_time time,
  amount_minor integer not null check (amount_minor >= 0),
  currency text not null default 'INR',
  status text not null default 'otp_verified'
    check (status in (
      'otp_verified',
      'pending_payment',
      'paid',
      'pending_assignment',
      'assigned',
      'ritual_scheduled',
      'ritual_in_progress',
      'completed',
      'cancelled',
      'refunded'
    )),
  intent_note text,
  source text not null default 'mweb',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.mweb_booking_status_events (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.mweb_bookings(id) on delete cascade,
  from_status text,
  to_status text not null,
  actor_type text not null default 'system' check (actor_type in ('lead', 'admin', 'pandit', 'system', 'payment')),
  note text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.mweb_payment_requests (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.mweb_bookings(id) on delete cascade,
  amount_minor integer not null check (amount_minor > 0),
  currency text not null default 'INR',
  provider text not null default 'manual' check (provider in ('manual', 'razorpay', 'cashfree')),
  status text not null default 'invoice_created'
    check (status in ('invoice_created', 'payment_intent_created', 'paid', 'failed', 'expired', 'cancelled', 'refunded')),
  provider_payment_id text,
  payment_url text,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (booking_id)
);

create index if not exists idx_mweb_leads_phone on public.mweb_leads(phone);
create index if not exists idx_mweb_otp_phone_created on public.mweb_otp_challenges(phone, created_at desc);
create index if not exists idx_mweb_banners_active_sort on public.mweb_home_banners(status, display_order);
create index if not exists idx_mweb_use_cases_ritual_sort on public.mweb_ritual_use_cases(ritual_id, status, display_order);
create unique index if not exists idx_mweb_home_banners_badge_unique on public.mweb_home_banners(badge);
create unique index if not exists idx_mweb_use_cases_ritual_title_unique on public.mweb_ritual_use_cases(ritual_id, title);
create index if not exists idx_mweb_slots_lookup on public.mweb_time_slots(ritual_id, slot_date, status);
create index if not exists idx_mweb_bookings_lead_created on public.mweb_bookings(lead_id, created_at desc);
create index if not exists idx_mweb_bookings_status_created on public.mweb_bookings(status, created_at desc);
create index if not exists idx_mweb_events_booking_created on public.mweb_booking_status_events(booking_id, created_at);

drop trigger if exists set_mweb_leads_updated_at on public.mweb_leads;
create trigger set_mweb_leads_updated_at
before update on public.mweb_leads
for each row execute function public.set_updated_at();

drop trigger if exists set_mweb_home_banners_updated_at on public.mweb_home_banners;
create trigger set_mweb_home_banners_updated_at
before update on public.mweb_home_banners
for each row execute function public.set_updated_at();

drop trigger if exists set_mweb_ritual_use_cases_updated_at on public.mweb_ritual_use_cases;
create trigger set_mweb_ritual_use_cases_updated_at
before update on public.mweb_ritual_use_cases
for each row execute function public.set_updated_at();

drop trigger if exists set_mweb_time_slots_updated_at on public.mweb_time_slots;
create trigger set_mweb_time_slots_updated_at
before update on public.mweb_time_slots
for each row execute function public.set_updated_at();

drop trigger if exists set_mweb_bookings_updated_at on public.mweb_bookings;
create trigger set_mweb_bookings_updated_at
before update on public.mweb_bookings
for each row execute function public.set_updated_at();

drop trigger if exists set_mweb_payment_requests_updated_at on public.mweb_payment_requests;
create trigger set_mweb_payment_requests_updated_at
before update on public.mweb_payment_requests
for each row execute function public.set_updated_at();

alter table public.mweb_leads enable row level security;
alter table public.mweb_otp_challenges enable row level security;
alter table public.mweb_home_banners enable row level security;
alter table public.mweb_ritual_use_cases enable row level security;
alter table public.mweb_time_slots enable row level security;
alter table public.mweb_bookings enable row level security;
alter table public.mweb_booking_status_events enable row level security;
alter table public.mweb_payment_requests enable row level security;

drop policy if exists "Anyone can read active mweb banners" on public.mweb_home_banners;
create policy "Anyone can read active mweb banners"
on public.mweb_home_banners
for select
to anon, authenticated
using (status = 'active');

drop policy if exists "Anyone can read active mweb use cases" on public.mweb_ritual_use_cases;
create policy "Anyone can read active mweb use cases"
on public.mweb_ritual_use_cases
for select
to anon, authenticated
using (status = 'active');

drop policy if exists "Anyone can read open mweb slots" on public.mweb_time_slots;
create policy "Anyone can read open mweb slots"
on public.mweb_time_slots
for select
to anon, authenticated
using (status = 'open' and booked_count < capacity);

-- No direct public read/write policies for leads, OTP, bookings, payments.
-- Public access goes through SECURITY DEFINER RPCs below.

create or replace function public.mweb_normalize_phone(raw_phone text)
returns text
language plpgsql
immutable
as $$
declare
  digits text;
begin
  digits := regexp_replace(coalesce(raw_phone, ''), '[^0-9]', '', 'g');

  if length(digits) = 10 then
    return '+91' || digits;
  end if;

  if length(digits) = 12 and left(digits, 2) = '91' then
    return '+' || digits;
  end if;

  if length(digits) > 0 and left(coalesce(raw_phone, ''), 1) = '+' then
    return '+' || digits;
  end if;

  return digits;
end;
$$;

create or replace function public.request_mweb_otp(raw_phone text)
returns table (
  challenge_id uuid,
  phone text,
  expires_at timestamptz,
  dev_otp text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  normalized_phone text;
  new_challenge_id uuid;
  new_expires_at timestamptz;
begin
  normalized_phone := public.mweb_normalize_phone(raw_phone);

  if normalized_phone is null or length(normalized_phone) < 10 then
    raise exception 'invalid_phone';
  end if;

  update public.mweb_otp_challenges
  set status = 'expired'
  where mweb_otp_challenges.phone = normalized_phone
    and status = 'pending';

  insert into public.mweb_otp_challenges (phone, code_hash, provider, expires_at)
  values (normalized_phone, '1234', 'dummy', now() + interval '10 minutes')
  returning mweb_otp_challenges.id, mweb_otp_challenges.expires_at into new_challenge_id, new_expires_at;

  return query select new_challenge_id, normalized_phone, new_expires_at, '1234'::text;
end;
$$;

create or replace function public.verify_mweb_otp(
  challenge_id uuid,
  raw_phone text,
  code text,
  lead_name text default null
)
returns table (
  lead_id uuid,
  phone text,
  verified_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  normalized_phone text;
  challenge public.mweb_otp_challenges%rowtype;
  next_lead_id uuid;
  now_ts timestamptz := now();
begin
  normalized_phone := public.mweb_normalize_phone(raw_phone);

  select *
  into challenge
  from public.mweb_otp_challenges
  where mweb_otp_challenges.id = verify_mweb_otp.challenge_id
    and mweb_otp_challenges.phone = normalized_phone
  for update;

  if not found then
    raise exception 'otp_not_found';
  end if;

  if challenge.status <> 'pending' then
    raise exception 'otp_not_pending';
  end if;

  if challenge.expires_at < now_ts then
    update public.mweb_otp_challenges set status = 'expired' where id = challenge.id;
    raise exception 'otp_expired';
  end if;

  if challenge.attempts >= challenge.max_attempts then
    update public.mweb_otp_challenges set status = 'locked' where id = challenge.id;
    raise exception 'otp_locked';
  end if;

  if coalesce(code, '') <> challenge.code_hash then
    update public.mweb_otp_challenges
    set
      attempts = attempts + 1,
      status = case when attempts + 1 >= max_attempts then 'locked' else mweb_otp_challenges.status end
    where id = challenge.id;
    raise exception 'otp_invalid';
  end if;

  update public.mweb_otp_challenges
  set status = 'verified', verified_at = now_ts
  where id = challenge.id;

  insert into public.mweb_leads (phone, name, last_verified_at)
  values (normalized_phone, nullif(trim(coalesce(lead_name, '')), ''), now_ts)
  on conflict on constraint mweb_leads_phone_key do update set
    name = coalesce(nullif(trim(coalesce(excluded.name, '')), ''), public.mweb_leads.name),
    last_verified_at = excluded.last_verified_at,
    updated_at = now()
  returning id into next_lead_id;

  return query select next_lead_id, normalized_phone, now_ts;
end;
$$;

create or replace function public.create_mweb_booking(
  p_lead_id uuid,
  p_ritual_id uuid,
  p_use_case_id uuid,
  p_slot_id uuid,
  p_customer_name text,
  p_intent_note text default null
)
returns table (
  booking_id uuid,
  booking_number text,
  status text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  lead_row public.mweb_leads%rowtype;
  ritual_row public.rituals%rowtype;
  use_case_row public.mweb_ritual_use_cases%rowtype;
  slot_row public.mweb_time_slots%rowtype;
  amount integer;
  next_booking_id uuid;
  next_booking_number text;
begin
  select * into lead_row from public.mweb_leads where id = p_lead_id;
  if not found or lead_row.last_verified_at is null or lead_row.last_verified_at < now() - interval '24 hours' then
    raise exception 'lead_not_verified';
  end if;

  if nullif(trim(coalesce(p_customer_name, '')), '') is null then
    raise exception 'customer_name_required';
  end if;

  select * into ritual_row from public.rituals where id = p_ritual_id and public.rituals.status = 'active';
  if not found then
    raise exception 'ritual_not_found';
  end if;

  if p_use_case_id is not null then
    select * into use_case_row
    from public.mweb_ritual_use_cases
    where id = p_use_case_id
      and ritual_id = p_ritual_id
      and public.mweb_ritual_use_cases.status = 'active';
    if not found then
      raise exception 'use_case_not_found';
    end if;
    amount := use_case_row.price_minor;
  else
    amount := coalesce(ritual_row.starting_price_minor, 0);
  end if;

  if p_slot_id is not null then
    select * into slot_row
    from public.mweb_time_slots
    where id = p_slot_id
      and (ritual_id = p_ritual_id or ritual_id is null)
      and public.mweb_time_slots.status = 'open'
      and booked_count < capacity
    for update;
    if not found then
      raise exception 'slot_unavailable';
    end if;
  end if;

  next_booking_number := 'SK' || floor(10000 + random() * 89999)::text;

  insert into public.mweb_bookings (
    booking_number,
    lead_id,
    phone,
    customer_name,
    ritual_id,
    ritual_title,
    use_case_id,
    use_case_title,
    slot_id,
    preferred_date,
    preferred_time,
    amount_minor,
    currency,
    status,
    intent_note
  )
  values (
    next_booking_number,
    lead_row.id,
    lead_row.phone,
    nullif(trim(p_customer_name), ''),
    ritual_row.id,
    ritual_row.title,
    p_use_case_id,
    use_case_row.title,
    p_slot_id,
    slot_row.slot_date,
    slot_row.slot_time,
    amount,
    coalesce(use_case_row.currency, ritual_row.currency, 'INR'),
    'pending_payment',
    p_intent_note
  )
  returning id into next_booking_id;

  if p_slot_id is not null then
    update public.mweb_time_slots
    set booked_count = booked_count + 1
    where id = p_slot_id;
  end if;

  insert into public.mweb_booking_status_events (booking_id, from_status, to_status, actor_type, note)
  values (next_booking_id, null, 'pending_payment', 'lead', 'Booking created after OTP verification');

  insert into public.mweb_payment_requests (booking_id, amount_minor, currency, provider, status)
  values (next_booking_id, amount, coalesce(use_case_row.currency, ritual_row.currency, 'INR'), 'manual', 'invoice_created');

  return query select next_booking_id, next_booking_number, 'pending_payment'::text;
end;
$$;

create or replace function public.mock_pay_mweb_booking(
  p_lead_id uuid,
  p_booking_id uuid
)
returns table (
  booking_id uuid,
  booking_number text,
  status text,
  paid_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  booking_row public.mweb_bookings%rowtype;
  now_ts timestamptz := now();
begin
  select *
  into booking_row
  from public.mweb_bookings
  where id = p_booking_id
    and lead_id = p_lead_id
  for update;

  if not found then
    raise exception 'booking_not_found';
  end if;

  if booking_row.status not in ('pending_payment', 'paid', 'pending_assignment') then
    raise exception 'booking_not_payable';
  end if;

  update public.mweb_payment_requests
  set status = 'paid', paid_at = now_ts
  where public.mweb_payment_requests.booking_id = booking_row.id;

  update public.mweb_bookings
  set status = 'pending_assignment'
  where public.mweb_bookings.id = booking_row.id;

  insert into public.mweb_booking_status_events (booking_id, from_status, to_status, actor_type, note)
  values (booking_row.id, booking_row.status, 'pending_assignment', 'payment', 'Mock payment completed');

  return query select booking_row.id, booking_row.booking_number, 'pending_assignment'::text, now_ts;
end;
$$;

create or replace function public.get_mweb_booking(
  p_lead_id uuid,
  p_booking_id uuid
)
returns table (
  booking_id uuid,
  booking_number text,
  ritual_title text,
  use_case_title text,
  preferred_date date,
  preferred_time time,
  amount_minor integer,
  currency text,
  status text,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
begin
  return query
  select
    b.id,
    b.booking_number,
    b.ritual_title,
    b.use_case_title,
    b.preferred_date,
    b.preferred_time,
    b.amount_minor,
    b.currency,
    b.status,
    b.created_at
  from public.mweb_bookings b
  where b.id = p_booking_id
    and b.lead_id = p_lead_id;
end;
$$;

grant execute on function public.request_mweb_otp(text) to anon, authenticated;
grant execute on function public.verify_mweb_otp(uuid, text, text, text) to anon, authenticated;
grant execute on function public.create_mweb_booking(uuid, uuid, uuid, uuid, text, text) to anon, authenticated;
grant execute on function public.mock_pay_mweb_booking(uuid, uuid) to anon, authenticated;
grant execute on function public.get_mweb_booking(uuid, uuid) to anon, authenticated;
