-- SecureParcel Scan MVP v0.1
-- Initial database schema for seller parcels and public verification logging.

-- ============================================================
-- Parcels
-- Each parcel belongs to one authenticated seller. The code is
-- stored without its display hyphen, for example: 7KRMP4WX.
-- ============================================================
create table public.parcels (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references auth.users(id) on delete cascade,
  order_reference text,
  verification_code text unique not null,
  created_at timestamptz not null default now()
);

-- Speeds up the seller dashboard query for recent parcels.
create index parcels_seller_id_created_at_idx
  on public.parcels (seller_id, created_at desc);

-- The unique constraint above already creates an index for exact
-- verification_code lookups, so no additional code index is needed.

-- ============================================================
-- Verification attempts
-- Logs both valid and invalid manual code checks. parcel_id stays
-- null when an entered code does not match an existing parcel.
-- ============================================================
create table public.verification_attempts (
  id uuid primary key default gen_random_uuid(),
  entered_code text not null,
  parcel_id uuid references public.parcels(id) on delete set null,
  is_valid boolean not null,
  created_at timestamptz not null default now()
);

-- Speeds up chronological review of verification activity.
create index verification_attempts_created_at_idx
  on public.verification_attempts (created_at desc);

-- Useful for looking up the attempt history for one parcel later.
create index verification_attempts_parcel_id_created_at_idx
  on public.verification_attempts (parcel_id, created_at desc);

-- ============================================================
-- Row Level Security: parcels
-- Sellers may only read and manage rows where seller_id matches
-- their Supabase Auth user id. Visitors receive no parcel access.
-- ============================================================
alter table public.parcels enable row level security;

create policy "Sellers can view their own parcels"
  on public.parcels
  for select
  to authenticated
  using ((select auth.uid()) = seller_id);

create policy "Sellers can create their own parcels"
  on public.parcels
  for insert
  to authenticated
  with check ((select auth.uid()) = seller_id);

create policy "Sellers can update their own parcels"
  on public.parcels
  for update
  to authenticated
  using ((select auth.uid()) = seller_id)
  with check ((select auth.uid()) = seller_id);

create policy "Sellers can delete their own parcels"
  on public.parcels
  for delete
  to authenticated
  using ((select auth.uid()) = seller_id);

-- ============================================================
-- Row Level Security: verification attempts
-- No public or authenticated policies are added intentionally.
-- A future server-side verification endpoint will use the service
-- role key to check a code and write its attempt log. This prevents
-- visitors from reading parcel details or browsing attempt records.
-- ============================================================
alter table public.verification_attempts enable row level security;
