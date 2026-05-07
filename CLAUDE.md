# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

An internal order management portal for processing online store orders. Managers accept orders, update statuses, view customer details, and manage order contents. This is a training sandbox for BA hypothesis-testing exercises with an in-memory database that resets on restart.

**Key constraint**: Intentionally simplified — no payment processing, no warehouse system, no email notifications. Customers exist in seed data; no registration flow.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **UI Library**: Material UI (MUI)
- **Database**: MongoDB in-memory, seeded on startup
- **Validation**: Zod schemas
- **Dependency Injection**: Awilix container
- **i18n**: Single locale (English)

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Start development server
```

Setup is single-terminal, single-URL.

## Architecture

### Page Routes

| Route | Purpose |
|-------|---------|
| `/orders` | Order list — main manager workspace |
| `/orders/[id]` | Order detail with customer, items, timeline, notes |
| `/orders/[id]/edit` | Status change, discount field, internal note form |
| `/customers` | Customer list with order count and total spend |
| `/customers/[id]` | Customer profile with order history |
| `/products` | Product catalogue with stock status (read-only) |
| `/api/orders/[id]` | PATCH endpoint for updating orders |

### Data Flow Pattern

Pages (under `app/`) → Services (via `createServices()` factory) → Repositories (in `app/infrastructure/`)

- **Pages**: Use Next.js App Router (Server Components by default)
- **Client Components**: Form interactions marked with `"use client"`
- **Services**: Apply business rules, validate via Zod schemas (in `app/lib/services/`)
- **Repositories**: Handle data persistence (in `app/infrastructure/repositories/`)
- **Database**: MongoDB in-memory via `mongodb-memory-server`

### Key Files

- `app/lib/di/services.ts` - Service factory that wires up repositories and services
- `app/infrastructure/database/connection.ts` - MongoDB in-memory connection
- `app/infrastructure/database/seed.ts` - Seed data (3 customers, 6 products, 12 orders)
- `app/lib/validation/schemas.ts` - Zod validation schemas
- `app/lib/types.ts` - TypeScript type definitions

### Status Pipeline

```
New → Confirmed → In Preparation → Shipped → Delivered
                                           ↘ Cancelled
```

### Business Rules (Core Testing Targets)

1. **Stock Check**: Cannot move order to `Confirmed` if any item has zero stock
2. **Cancellation Block**: Cannot `Cancel` an order once it reaches `Shipped`
3. **Discount Threshold**: Discounts > 20% require a manager note
4. **Total Recalculation**: Order total is auto-calculated; cannot be edited directly
5. **Empty Order Block**: Orders with no items cannot be saved in any status

These rules are intentionally designed as PoC targets for BA exercises.

## Seed Data

Three customer profiles, twelve orders (spread across all statuses), two out-of-stock products, one shipped order (to demo cancellation block), one order with >20% discount and no note (to trigger validation rule).

Everything is visible from first page load — no data creation needed.

## Common PoC Scenarios

BAs use this to test hypotheses by making targeted code changes:

| Hypothesis | Target Change | Observation Goal |
|------------|---------------|------------------|
| Raise discount threshold to 30% | Validation rule in order edit service | Does form accept 25% discount without note? Does API allow it? |
| Rename "In Preparation" to "Processing" | Status label in UI component | Does label change everywhere (list, detail, edit, timeline)? |
| Remove mandatory note for discounts | Validation condition in form/schema | Can manager save 25% discount with no note? |
| Add "Restore" button for cancelled orders | Seed status + UI condition | Does button appear? Does clicking trigger route or fail? |
| Remove stock check for Confirmed | Stock check in transition rule | Can order move to Confirmed? Rule in UI only or also API? |

## Development Context

This matches the `lf-client` stack from Sessions 1-3. BAs familiar with that project will recognize folder structure, service patterns, and seed file locations immediately.

## For Communication with BAs

- **Explain features in business terms first**, then reference files
- Use plain language; avoid unexplained jargon
- Frame features around the status pipeline and business rules
- The UI tells the story before the code does
