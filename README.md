# NorthStar — Cars & Tempo Travellers Demo (Zone 1)

Fast, clean, trustworthy demo for a real operator. **Frontend + mock backend**. Production-ready architecture: swap mock for real API + Razorpay without rebuilding.

> Built with ponytail full: fewest files, zero extra deps, stdlib first. `npm run build` passes.

## Stack (one decision)
**Next.js 16 App Router + TypeScript + Tailwind 4** — SSR/SSG for SEO, Route Handlers for mock API in same deploy, `next/font` self-hosted. No Redux, no date lib, no carousel, no icon font. Deps: `next`, `react`, `react-dom`, `tailwind`, `eslint`.

## Run
```bash
cd travel-demo
npm install
npm run dev   # http://localhost:3000
npm run build # production build (verified 2026-09-05)
npm start     # serve build
node test-smoke.mjs # double-booking guard check (needs server on :3001)
```

## Structure
```
src/data/vehicles.ts   ← single source for fleet/destinations/company (swap to API)
src/lib/holdStore.ts  ← in-memory holds + atomic confirm (ponytail: single server demo)
src/app/api/*         ← mock: /vehicles, /availability, /holds, /confirm, /payments
src/app/(site)/       ← /, /vehicles, /vehicles/[slug], /about, /services, /contact
src/app/booking/*     ← search → availability → details → payment → confirm
```

## Booking flow
`Home widget → /booking/availability?pickup&drop&date&time&passengers → Select & Hold (10m TTL, countdown) → /booking/details → /booking/payment (mock: 70% success, force buttons) → POST /api/confirm (second availability check) → /booking/confirm?id=BK-...`

- **Double-booking guard:** `slotKey = vehicleId|date` in `holdStore.ts:15`. `createHold` rejects if HELD/BOOKED. `confirmHold` does second check atomically before flipping to BOOKED. Tested in `test-smoke.mjs`.
- **Hold:** `globalThis` Map + lazy sweep. `HOLD_TTL 10m`. `ponytail: in-memory, resets on deploy. Upgrade: Vercel KV/Redis adapter same interface.`
- **Payment:** `app/api/payments/route.ts` — `MockProvider` only. UI never sees secret. `createOrder`/`verify` stay server-side. Future: `RazorpayProvider implements PaymentProvider` with `RAZORPAY_KEY_SECRET` server-only.

## Pricing
Server-computed: `base (km×perKm) + driver (days×driverPerDay) + 5% tax = total`. Client amount ignored. Extra km `₹X/km` after 250 km/day.

## SEO / Perf
- Titles/meta per page, one h1, OG, `LocalBusiness` JSON-LD in `layout.tsx`
- `sitemap.ts` / `robots.ts`, `alt` on all, semantic HTML
- `next/font` Inter, Tailwind purge (~12KB), `next/image` not needed (CSS placeholders for Zone 1), JS <80KB home, Lighthouse target 95+
- No JS tracker in Zone 1

## Responsive
Mobile-first. Header sticky, hamburger sheet <768. Widget stacks 1-col mobile, 6-col desktop overlapping hero. Cards 1→2→3 col. Inputs ≥16px (no iOS zoom), native `date`/`time`. Booking sidebar sticky desktop, full-width mobile. No hover-only UI.

## Swap to real backend (no rebuild)
1. `MOCK_MODE=false` + `API_BASE_URL=https://api.example.com`
2. Implement `RestAdapter` (stub exists) forwarding with `Authorization`
3. Add `RazorpayProvider` (`app/api/payments` swaps `MockProvider` for `RazorpayProvider`)
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID` public, `RAZORPAY_KEY_SECRET` server-only
4. Replace `vehicles.json` fetch with DB (Prisma later — not in Zone 1)

## Error states covered
No vehicles, invalid pickup/drop/date, capacity mismatch, HOLD_EXPIRED (410), SLOT_TAKEN (409), payment fail, network offline, incomplete details, double-submit (Idempotency-Key).

## What was skipped (Zone 1)
Animations, maps/distance matrix, OTP, auth, admin, seat-map, i18n, Sentry, KV. Each marked `ponytail:` with ceiling + upgrade path in code.

## Deploy
Vercel: `git push` → preview + prod. Or `next build && next start` anywhere. No env needed for mock.

## Acceptance (run before handover)
- `npm run build` passes
- `node test-smoke.mjs` → `ALL CHECKS PASSED` (hold 409, confirm atomic, booked appears in availability)
- Manual: 2 tabs same vehicle+date → first confirm wins, second shows 409 + alternatives

---
Demo — mock payment only. No real capture.
