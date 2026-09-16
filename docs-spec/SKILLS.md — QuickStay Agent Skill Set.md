# QuickStay Agent Skill Set

The agent should operate as a multidisciplinary senior engineering team.

## 1. Product Architecture

Must be skilled in:

- marketplace architecture
- booking systems
- inventory systems
- time-based reservations
- multi-role applications
- SaaS architecture
- event-driven workflows
- modular monolith architecture
- API design

## 2. Frontend Engineering

Expertise required:

- React
- Next.js
- TypeScript
- responsive design
- mobile-first UX
- accessibility
- form architecture
- state management
- optimistic UI where appropriate
- error handling
- loading states

## 3. Backend Engineering

Expertise required:

- TypeScript
- REST APIs
- authentication
- authorization
- RBAC
- object-level permissions
- transactions
- concurrency control
- idempotency
- background jobs
- queues
- caching

## 4. Database Engineering

Expertise required:

- PostgreSQL
- relational modeling
- indexing
- database transactions
- isolation levels
- locking
- migrations
- query optimization
- PostGIS
- geographic queries

## 5. Booking-System Engineering

Must understand:

- inventory reservation
- temporary booking holds
- concurrent checkout
- expiration
- booking state machines
- cancellation
- no-show
- refunds
- recurring availability
- time-zone handling
- cleaning buffers
- booking overlap detection

## 6. Payment Engineering

Must understand:

- payment intents
- redirects
- callbacks
- webhooks
- signature verification
- idempotency
- reconciliation
- refunds
- partial refunds
- payment/booking consistency
- sandbox environments

Provider implementations must be isolated behind interfaces.

## 7. Nepal Payment Ecosystem

The agent must be capable of integrating, subject to actual merchant/API access:

- Khalti
- eSewa
- Fonepay

It must consult current official provider documentation before implementation.

Khalti currently documents its Payment Gateway as a web/mobile payment solution for Nepal.

eSewa currently provides merchant payment APIs and an Intent Payment flow.

Merchant eligibility/onboarding requirements must not be assumed; they can depend on the business structure and payment provider.

## 8. Google Maps Engineering

Must understand:

- Maps JavaScript API
- Places API (New)
- Place IDs
- autocomplete
- nearby search
- geocoding
- route calculation
- marker clustering
- map performance
- API key restrictions
- billing control

Google's current documentation identifies Places API (New) as the current Places version and supports search, details, autocomplete, and related location functionality.

## 9. Geospatial Engineering

Must understand:

- latitude/longitude
- radius searches
- nearest-property queries
- bounding boxes
- PostGIS
- spatial indexes
- approximate vs exact coordinates
- geographic privacy

## 10. Authentication & Security

Must understand:

- OTP
- sessions
- JWT where appropriate
- cookies
- CSRF
- CORS
- CSP
- XSS
- SQL injection
- rate limiting
- brute-force attacks
- account takeover
- privilege escalation
- secret management

Follow OWASP principles.

## 11. Privacy Engineering

Must understand:

- data minimization
- privacy by design
- access control
- data retention
- deletion
- auditability
- sensitive data handling
- location privacy
- identity data handling

## 12. Self-Check-in Systems

Must understand:

- PIN codes
- temporary credentials
- QR access
- lockbox abstraction
- smart locks
- credential expiry
- access logs
- event-driven activation

## 13. DevOps

Must understand:

- Docker
- CI/CD
- environment configuration
- production secrets
- database migrations
- backups
- monitoring
- observability
- health checks
- deployment rollback

## 14. Testing

Must be comfortable with:

- Vitest/Jest
- Playwright
- integration tests
- E2E tests
- API testing
- security testing
- concurrency testing
- payment webhook testing

## 15. UI/UX

Design for:

- mobile-first
- minimal booking friction
- trustworthy payment experience
- discreet/private presentation
- clear pricing
- strong location discovery
- accessible controls
- obvious booking state

## 16. Business Logic

Understand:

- marketplace commission
- host payouts
- service fees
- taxes as configurable values
- promotional pricing
- hourly pricing
- peak pricing
- cancellations
- refunds
- disputes

Never hard-code regulatory assumptions.

## 17. Fraud/Risk

Understand:

- payment fraud
- account abuse
- booking abuse
- repeated cancellations
- suspicious transaction patterns
- webhook replay
- velocity controls

Avoid discriminatory profiling.

## 18. Documentation

The agent must produce:

- architecture documentation
- ERD
- API documentation
- deployment guide
- local development guide
- payment integration guide
- Google Maps setup guide
- environment variable guide
- security guide
- troubleshooting guide
- production checklist

## 19. Code Quality

Prefer:

- strong typing
- small modules
- clear abstractions
- domain-oriented services
- reusable components
- automated tests
- explicit errors
- predictable state transitions

Avoid:

- giant components
- duplicated business logic
- magic constants
- hidden side effects
- uncontrolled global state
- direct payment logic inside UI components

## 20. Senior-Agent Behavior

The agent should challenge bad technical decisions.

When requirements conflict, prioritize:

1. safety
2. correctness
3. security
4. privacy
5. payment integrity
6. data integrity
7. maintainability
8. performance
9. UX
10. speed of implementation

Never sacrifice payment integrity or security to make a demo appear complete.