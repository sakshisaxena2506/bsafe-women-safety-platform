create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null unique,
  phone text,
  address text,
  blood_group text,
  role text not null default 'user' check (role in ('user', 'volunteer', 'admin')),
  safety_status text default 'Protected',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  relationship text not null,
  phone text not null,
  email text,
  priority text not null default 'Primary',
  created_at timestamptz not null default now()
);

create table if not exists public.alerts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  volunteer_id uuid references public.profiles(id) on delete set null,
  latitude numeric not null,
  longitude numeric not null,
  timestamp timestamptz not null default now(),
  status text not null default 'active' check (status in ('active', 'pending', 'accepted', 'completed', 'resolved')),
  severity text not null default 'critical',
  location text,
  description text,
  responder text,
  created_at timestamptz not null default now()
);

create table if not exists public.volunteers (
  id uuid primary key references public.profiles(id) on delete cascade,
  verification_status text not null default 'review' check (verification_status in ('review', 'verified', 'rejected')),
  active_cases integer not null default 0,
  completed_cases integer not null default 0,
  response_rate numeric,
  current_latitude numeric,
  current_longitude numeric,
  created_at timestamptz not null default now()
);

create table if not exists public.safe_zones (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text not null,
  category text not null,
  type text,
  contact text,
  contact_number text,
  distance text,
  status text not null default 'Open',
  latitude numeric,
  longitude numeric,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.contacts enable row level security;
alter table public.alerts enable row level security;
alter table public.volunteers enable row level security;
alter table public.safe_zones enable row level security;

create policy "Profiles are readable by authenticated users"
on public.profiles for select
to authenticated
using (true);

create policy "Users can update own profile"
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Users can manage own contacts"
on public.contacts for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can create own alerts"
on public.alerts for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Authenticated users can read alerts"
on public.alerts for select
to authenticated
using (true);

create policy "Volunteers and admins can update alert status"
on public.alerts for update
to authenticated
using (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.role in ('volunteer', 'admin')
  )
)
with check (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.role in ('volunteer', 'admin')
  )
);

create policy "Safe zones are readable by authenticated users"
on public.safe_zones for select
to authenticated
using (true);

create policy "Admins can manage safe zones"
on public.safe_zones for all
to authenticated
using (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.role = 'admin'
  )
)
with check (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.role = 'admin'
  )
);
