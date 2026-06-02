# SecureParcel Scan MVP v0.1

SecureParcel Scan is a lean mobile-friendly web app for small Indian e-commerce sellers to create handwritten parcel verification codes.

Sellers create parcel records from a protected dashboard. Customers or delivery recipients can visit the public verification page, manually enter the handwritten code, and see only whether the code is valid or invalid.

## Current MVP Scope

- Email/password seller signup and login
- Protected seller dashboard
- Parcel creation with optional order reference
- 8-character handwritten-friendly verification codes
- Public manual verification at `/verify`
- Verification attempt logging
- No OCR
- No QR codes
- No courier, customer, recipient, payment, or analytics features

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Supabase Auth and Postgres
- Vercel

## Local Setup

Install dependencies:

```bash
pnpm install
```

Create local environment variables:

```bash
cp .env.example .env.local
```

Fill in `.env.local` with values from your Supabase project:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Run the app:

```bash
pnpm run dev
```

Open:

```text
http://localhost:3000
```

## Environment Variables

`NEXT_PUBLIC_SUPABASE_URL`

Your Supabase project URL. This is safe to expose to the browser.

`NEXT_PUBLIC_SUPABASE_ANON_KEY`

Your Supabase anon key. This is safe to expose to the browser when Row Level Security is configured correctly.

`SUPABASE_SERVICE_ROLE_KEY`

Your Supabase service role key. This is server-only and must never be exposed in browser code or committed to Git. It is used for public verification lookups and verification attempt logging.

## Supabase Setup

1. Create a Supabase project.
2. Go to `Project Settings` -> `API`.
3. Copy the project URL, anon key, and service role key into `.env.local`.
4. Go to `Authentication` -> `Providers` -> `Email`.
5. For MVP behavior, disable `Confirm email` so successful signup can immediately redirect to `/dashboard`.
6. Run the migrations below in order.

## Migration Order

Run these SQL files in Supabase SQL Editor in this exact order:

1. `supabase/migrations/202606020001_initial_schema.sql`
2. `supabase/migrations/202606020002_grant_parcel_access.sql`

The first migration creates:

- `parcels`
- `verification_attempts`
- indexes
- Row Level Security policies

The second migration grants table access to the correct roles while keeping RLS and public privacy intact:

- authenticated sellers can access only their own parcels
- anonymous users cannot access parcel data directly
- service-role server code can verify parcel codes and log attempts

## Vercel Deployment

1. Push this project to a Git repository.
2. Import the repository in Vercel.
3. Choose the Next.js framework preset.
4. Add these environment variables in Vercel Project Settings:

```bash
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

5. Use the default build command:

```bash
pnpm run build
```

6. Use the default output settings for Next.js.
7. Deploy.

After deployment, test:

- `/signup`
- `/login`
- `/dashboard`
- parcel creation
- `/verify` with a valid code
- `/verify` with an invalid code

## Verification Commands

Run before deploying:

```bash
pnpm run lint
pnpm run build
```

## Git Hygiene

`.env.local` is ignored by `.gitignore` through the `.env*` rule. `.env.example` is intentionally committed as a safe template.
