-- SecureParcel Scan MVP v0.1
-- Allow authenticated sellers to reach the parcels table. Row Level
-- Security policies from the initial migration still decide which
-- rows each seller may read or change.

grant select, insert, update, delete
  on table public.parcels
  to authenticated;

-- Server-only workflows use the service role. This includes public
-- verification checks and their attempt logs in the next phase.
grant select, insert, update, delete
  on table public.parcels
  to service_role;

grant select, insert, update, delete
  on table public.verification_attempts
  to service_role;

-- Keep visitors blocked from parcel data. Public verification will
-- use the server-only service role client in a later phase.
revoke all
  on table public.parcels
  from anon;

-- Attempt logs remain server-only. Neither visitors nor signed-in
-- sellers need direct table access for the MVP.
revoke all
  on table public.verification_attempts
  from anon, authenticated;
