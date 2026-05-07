## Order Management Portal

### Concept

A small internal portal for processing online store orders. Managers accept orders, update their status, and view customer details and order contents. Customers already exist in the seed data — no registration flow needed.

The project is intentionally simplified: no payment processing, no warehouse system, no email notifications.

---

### What the app does

A manager opens the portal and sees a list of incoming orders. Each order has a customer, a list of items with quantities and prices, a total, and a current status. The manager can move the order through a status pipeline, add an internal note, and apply a discount. Certain transitions are blocked by business rules — and those rules are exactly what participants will find and test.

---

### Pages and what each one represents

| Route | What a BA sees | Business purpose |
|---|---|---|
| `/orders` | List of all orders with status badges and totals | Main workspace for the manager |
| `/orders/[id]` | Order detail: customer, items, timeline, notes | Where most business rules are visible |
| `/orders/[id]/edit` | Status change, discount field, internal note | The form where rules are enforced |
| `/customers` | List of customers with order count and total spend | Customer overview |
| `/customers/[id]` | Customer profile and their order history | Traceability from customer to orders |
| `/products` | Product catalogue with stock flag | Read-only reference for the manager |

---

### Status pipeline

```
New → Confirmed → In Preparation → Shipped → Delivered
                                           ↘ Cancelled
```

Business rules baked into the transitions — each one is a PoC target:

- An order cannot move to **Confirmed** if any item has zero stock.
- An order cannot be **Cancelled** once it has reached **Shipped**.
- A **discount** greater than 20% requires a manager note to be saved.
- The **total** is recalculated on every save — it cannot be edited directly.
- An order with no items cannot be saved in any status.

---

### Seed data — what participants see on day one

Three customer profiles with realistic names and addresses. Twelve orders spread across all statuses so every pipeline stage is visible immediately. Two products marked as out of stock to trigger the Confirmed rule. One order already in Shipped status to demonstrate the Cancelled block. One order with a discount above the threshold and no note — so participants can observe what happens when the rule fires.

No one needs to create data. Everything is visible from the first page load.

---

### Session 4

**The UI tells the story before the code does.** A BA can click through the order list, spot the status badges, try to cancel a shipped order, and observe the block — all before opening a single file. The hypothesis writes itself: *"Is this rule enforced only in the UI, or does the API also block it?"*

**Every exercise maps directly to a business conversation.** Changing the discount threshold from 20% to 30%, removing the mandatory note requirement, or tweaking the status label from "In Preparation" to "Processing" are all one-file changes that produce a clear, readable diff and a concrete stakeholder question.

**The domain is universally familiar.** Every participant has placed an online order. No domain onboarding is needed. The BA can focus entirely on the tracing and testing technique, not on understanding what the system is supposed to do.

---

### Typical PoC scenarios for Session 4 exercises

| Hypothesis | What to patch | What to observe |
|---|---|---|
| What if the discount threshold were raised to 30%? | Validation rule in the order edit service | Does the form accept a 25% discount without a note? Does the API also allow it? |
| What if "In Preparation" were renamed "Processing"? | Status label in the UI component | Does the label change everywhere — list, detail, edit form, timeline? |
| What if the mandatory note for discounts were removed? | Validation condition in the form or schema | Can a manager save a 25% discount with no note? Does anything break? |
| What if a cancelled order showed a "Restore" button? | Seed status + UI condition | Does the button appear? Does clicking it trigger a route or fail silently? |
| What if an out-of-stock item did not block Confirmed? | Stock check in the transition rule | Can the order move to Confirmed? Is the rule only in the UI or also in the API? |

---

### Technical profile

| Property | Value |
|---|---|
| Framework | Next.js 15, App Router |
| Language | TypeScript |
| UI library | Material UI (MUI) — same as `lf-client` |
| Data layer | MongoDB in-memory, seeded on startup |
| Validation | Zod schemas |
| Dependency injection | Awilix container |
| i18n | Single locale (English) — no language switcher to distract |
| Setup | `npm install` + `npm run dev`, one terminal, one URL |

The stack is identical to `lf-client`. Participants who completed Sessions 1–3 open this project and immediately recognise the folder structure, the service pattern, and the seed file location. No reorientation needed.

---

### AGENTS.md starter — ready to drop in

```markdown
# About this project

This is a training copy of an internal order management portal for a small
online store. It is used as a sandbox for BA hypothesis-testing exercises.
The database is in-memory and resets on every restart.

# Key pages

| Route             | Business purpose                              |
|-------------------|-----------------------------------------------|
| `/orders`         | Order list — main manager workspace           |
| `/orders/[id]`    | Order detail with status timeline and notes   |
| `/orders/[id]/edit` | Status change, discount, internal note      |
| `/customers`      | Customer list with order history              |
| `/products`       | Product catalogue with stock status           |

# Status pipeline

New → Confirmed → In Preparation → Shipped → Delivered
                                           ↘ Cancelled

# Business rules

- Cannot confirm an order if any item has zero stock.
- Cannot cancel an order that has reached Shipped.
- A discount above 20% requires a manager note.
- Order total is calculated automatically and cannot be edited directly.
- An order with no items cannot be saved.

# Architecture

Pages use Next.js App Router under `app/`. Each page calls a service via
an Awilix DI container. Services apply business rules and call repositories
in `app/infrastructure/`. Data is validated through Zod schemas.

# For BAs

Explain features in business terms first, then reference files.
Use plain language. Avoid unexplained jargon.
```

