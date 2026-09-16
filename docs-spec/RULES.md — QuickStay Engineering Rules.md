# QuickStay Engineering Rules

## Rule 1 — Never fake integrations

Never invent undocumented payment APIs, webhook formats, authentication schemes, or third-party endpoints.

Use official documentation.

When documentation or credentials are unavailable, build a provider adapter and sandbox/mock implementation rather than fabricating a working integration.

## Rule 2 — Backend is authoritative

Never trust frontend values for:

- price
- availability
- payment status
- booking status
- user role
- property ownership
- permissions
- check-in eligibility

Recalculate and validate everything on the server.

## Rule 3 — Prevent double booking

The booking engine must provide transactional protection against concurrent reservations.

Frontend availability is informational only.

## Rule 4 — Payment confirmation requires server verification

A browser redirect is not proof of payment.

Confirm payment only after successful backend verification or an authenticated provider webhook.

All payment callbacks must be idempotent.

## Rule 5 — Never expose secrets

Never commit:

- API keys
- merchant secrets
- JWT secrets
- database passwords
- webhook signing secrets
- private access codes

Use environment variables or a secrets manager.

## Rule 6 — Privacy by default

Collect the minimum data necessary.

Do not publicly expose:

- guest information
- private bookings
- exact residential addresses unnecessarily
- identity documents
- access credentials
- private host notes

## Rule 7 — Adults only

The platform is restricted to adults.

Do not enable minors to book.

Do not build features facilitating prostitution, trafficking, sexual services, exploitation, or unlawful activity.

## Rule 8 — Self-check-in credentials are sensitive

Access codes are equivalent to physical keys.

They must:

- be unique
- expire automatically
- activate only during the permitted period
- be invalidatable
- be protected from disclosure
- produce audit events

## Rule 9 — Object-level authorization is mandatory

Every endpoint handling:

- bookings
- payments
- properties
- rooms
- reviews
- check-in credentials

must verify that the requesting user is authorized to access that specific object.

Never rely only on role checks.

## Rule 10 — Admin actions must be auditable

Record:

- actor
- action
- target
- timestamp
- relevant metadata

for sensitive administrative operations.

## Rule 11 — Secure third-party map usage

Use current Google Maps Platform APIs.

Avoid unnecessary API calls.

Do not expose server-only API keys to the client.

Restrict browser keys by domain and API where supported.

## Rule 12 — Mobile-first

Every important guest action must work well on a mobile browser.

## Rule 13 — Accessibility

Use semantic HTML, keyboard navigation, sufficient contrast, accessible controls, labels, and sensible focus behavior.

## Rule 14 — No destructive shortcuts

Never solve a problem by:

- disabling authorization
- bypassing payment verification
- exposing database records
- accepting arbitrary prices from clients
- disabling validation
- storing credentials in plaintext

## Rule 15 — Test before declaring completion

A feature is not complete merely because the code compiles.

Run:

- unit tests
- integration tests
- relevant E2E tests
- lint
- type checking
- database migration checks

## Rule 16 — Documentation is part of implementation

Update documentation whenever architecture, API contracts, database schema, deployment, or configuration changes.

## Rule 17 — Fail safely

When an external provider fails:

- do not confirm an unpaid booking
- do not create duplicate bookings
- do not leak secrets
- do not lose transaction state

## Rule 18 — Idempotency everywhere it matters

Use idempotency for:

- payment initiation
- payment webhooks
- booking confirmation
- refunds
- notification triggers
- check-in events

## Rule 19 — Business rules are configurable

Do not hard-code:

- fees
- cancellation rules
- duration limits
- commission
- taxes
- booking hold time

## Rule 20 — Separate business logic from providers

Payment, maps, notifications, storage, check-in, and identity verification must be behind interfaces/adapters wherever practical.

This allows providers to be replaced without rewriting the application.

## Rule 21 — Do not claim legal compliance

The software may provide mechanisms for compliance but must not state that the platform is legally compliant until the relevant business and legal requirements have been reviewed.

## Rule 22 — Production readiness requires external onboarding

Do not mark the project production-ready until:

- payment merchant accounts are approved
- API credentials exist
- Google Maps billing/configuration is configured
- domain/security configuration is complete
- backups are configured
- monitoring is configured
- legal/compliance review is complete

## Rule 23 — Keep the MVP focused

Prioritize:

search → availability → booking → payment → confirmation → self-check-in → navigation

Avoid unnecessary social/networking features during MVP.

## Rule 24 — Never use demo data as real data

All seed/demo properties must be clearly identified as development data.

## Rule 25 — Every finished feature must have acceptance criteria

Before declaring a feature finished, verify the expected user journey and failure cases.