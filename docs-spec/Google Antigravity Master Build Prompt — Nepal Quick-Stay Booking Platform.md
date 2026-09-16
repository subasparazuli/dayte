You are a senior full-stack software architect, product designer, security engineer, DevOps engineer, QA engineer, and technical product manager.

Build a complete production-ready web application from scratch for Nepal called:

QUICKSTAY
Subtitle: "Book a private short stay, by the hour."

The application is a marketplace that allows adults to discover and book hotels, guest rooms, apartments, private rooms, serviced spaces, and other legally permissible short-stay accommodations in Nepal on an hourly or short-duration basis.

The platform should optimize for:
1. Fast booking
2. Privacy
3. Self check-in
4. Advance digital payment
5. Accurate real-time availability
6. Easy location discovery
7. Minimal unnecessary disclosure of guest information
8. Trust and safety
9. A polished mobile-first experience
10. Scalable architecture suitable for expansion beyond Nepal

IMPORTANT PRODUCT POSITIONING

The platform is an accommodation/short-stay marketplace.

It may be used by adults for many legitimate purposes, including:
- rest during the day
- transit stays
- work/flexible workspace use
- private meetings
- tourism
- couples/dating
- overnight or hourly accommodation

The platform must NOT advertise, facilitate, match, arrange, or enable prostitution, sexual services, trafficking, exploitation, or illegal activities.

All guests must be adults according to the legal requirements applicable to the service, with age/identity verification implemented at appropriate stages.

Do not create marketing copy implying that the service exists to facilitate sexual encounters.

==================================================
1. CORE USER TYPES
==================================================

Implement three primary roles:

A. GUEST
B. HOST
C. ADMIN

Optionally design architecture that can later support:
D. PROPERTY MANAGER / HOTEL STAFF
E. SUPPORT AGENT

GUEST capabilities:
- Create account
- Login/logout
- OTP authentication
- Browse available spaces
- Select geographic area
- View properties on Google Maps
- Search by area, landmark, address, or map
- Filter by date/time
- Filter by hourly duration
- Filter by price
- Filter by property/space type
- Filter by amenities
- See only available spaces
- View photos
- View property details
- Select room/space
- Select start time
- Select duration
- View complete price breakdown
- Reserve temporarily while paying
- Pay online
- Receive confirmed booking
- Receive check-in instructions
- Receive self-check-in code/access information
- Navigate to property using Google Maps
- View booking history
- Cancel according to cancellation policy
- Request support/refund
- Leave a review after completed stay
- Delete account

HOST capabilities:
- Register
- Complete host/property onboarding
- Submit business/identity/property information required by applicable laws and payment providers
- Create property
- Add multiple spaces/rooms
- Add photos
- Specify amenities
- Configure availability
- Configure hourly pricing
- Configure minimum/maximum duration
- Configure check-in and check-out rules
- Configure self-check-in method
- Configure cleaning buffers
- Configure cancellation policy
- View bookings
- View earnings
- View payouts
- View occupancy/utilization
- Receive booking notifications
- Manage room/space availability
- Temporarily disable a room
- Issue or request refunds where allowed
- Respond to reviews
- Contact platform support

ADMIN capabilities:
- Dashboard
- User management
- Host approval
- Property approval
- Room approval
- Booking monitoring
- Payment monitoring
- Refund management
- Dispute management
- Fraud/risk monitoring
- Reviews moderation
- Content moderation
- Reported listing management
- User suspension
- Property suspension
- Payment reconciliation
- Platform commission configuration
- Pricing/service-fee configuration
- Audit logs
- System health
- Analytics
- Feature flags
- Configuration management

==================================================
2. PRIMARY USER JOURNEY
==================================================

The guest journey should be extremely short:

HOME
→ Select AREA / LOCATION
→ Select DATE
→ Select START TIME
→ Select DURATION
→ See available spaces
→ Map/list view
→ Select property
→ Select room/space
→ Review details
→ Enter required guest information
→ Choose payment method
→ Pay
→ Confirm booking
→ Receive booking confirmation
→ Receive self-check-in instructions
→ Open Google Maps navigation

The guest should be able to complete the process in as few screens as realistically possible.

Do not create unnecessary registration steps before users can browse listings.

Allow browsing before login.

Require login/verification before final booking where necessary.

==================================================
3. MAP EXPERIENCE
==================================================

Use Google Maps Platform.

Use current Google Maps APIs and avoid legacy APIs unless explicitly required.

Use:
- Maps JavaScript API
- Places API (New)
- Place Autocomplete / Place search
- Geocoding where required
- Routes functionality where appropriate

Create an interactive map/list experience.

Example:

------------------------------------------------
Search location: [ Thamel, Kathmandu       ]

[ Filters ]

MAP
   ●
      ●
   ●       ●
       ●
          ●

LIST
Hotel/Space A
Rs. 600 / 2 hours
0.8 km away

Hotel/Space B
Rs. 900 / 3 hours
1.2 km away
------------------------------------------------

Requirements:
- Map markers for available spaces
- Marker clustering for dense areas
- Select marker → show listing preview
- Select listing → open property/room page
- Map should update according to filters
- Search location using Google Places
- Do not expose more precise location information than necessary before booking if the host/property has elected to use approximate-location mode
- After successful booking, provide an accurate navigation destination
- Generate a Google Maps navigation link for the confirmed property
- Support mobile navigation

Do not expose private residential exact addresses unnecessarily before booking.

Store latitude/longitude securely.

==================================================
4. PRIVACY-FIRST DESIGN
==================================================

Privacy is a core product requirement.

Implement privacy by design.

Guest information should be collected only when necessary.

Avoid publicly exposing:
- guest full name
- phone number
- email address
- identity documents
- booking history
- exact arrival information
- private notes

Hosts should not automatically receive unnecessary guest information.

Guests should not automatically receive unnecessary host information.

Before booking:
- Property may show approximate map location
- Exact location can optionally remain hidden
- Host can choose privacy level

After booking:
- Provide exact address according to property configuration
- Provide access instructions
- Provide host/property contact channel
- Provide emergency/support contact

Never expose:
- database IDs
- internal IDs
- payment secrets
- access-control secrets
- admin metadata
- private notes

Use encryption for sensitive information at rest and TLS for data in transit.

Design data retention policies.

Implement account deletion.

Implement audit logging for sensitive administrative actions.

==================================================
5. SELF CHECK-IN
==================================================

Self check-in is a core feature.

Support several check-in methods through an abstraction layer:

1. PIN code
2. One-time access code
3. Smart lock API
4. Lockbox code
5. Host-provided instructions
6. Property-specific QR code

Build a generic CheckInProvider interface so future smart-lock integrations can be added without redesigning the application.

Example:

Booking confirmed
↓
Access credentials generated
↓
Credential activates at check-in time
↓
Guest receives instructions
↓
Guest arrives
↓
Guest unlocks/enters
↓
Check-in recorded
↓
Stay active
↓
Check-out
↓
Access credential expires

Security requirements:
- Access credentials must be unique
- Never store plaintext access credentials unnecessarily
- Hash credentials where possible
- Time-limit access credentials
- Credentials should not activate before allowed check-in time
- Credentials must automatically expire
- Prevent reuse
- Log access events
- Provide emergency support flow
- Allow host to invalidate credentials

DO NOT reveal access credentials to unauthorized users.

==================================================
6. BOOKING ENGINE
==================================================

The booking engine must prevent double bookings.

A booking must contain:

- booking_id
- guest_id
- property_id
- space_id
- start_datetime
- end_datetime
- duration
- base_price
- taxes
- service_fee
- discount
- total_amount
- currency
- payment_status
- booking_status
- cancellation_status
- check_in_status
- check_out_status
- access_status
- created_at
- updated_at

Booking states:

DRAFT
→ PAYMENT_PENDING
→ PAYMENT_PROCESSING
→ CONFIRMED
→ CHECKIN_AVAILABLE
→ CHECKED_IN
→ COMPLETED

Alternative failure states:

PAYMENT_FAILED
CANCELLED
EXPIRED
REFUND_PENDING
REFUNDED
DISPUTED
NO_SHOW

Implement transaction-safe inventory locking.

When a user starts checkout:
- Temporarily reserve the inventory
- Give the payment session a short expiration
- Prevent competing checkout from booking the same space
- Release inventory automatically when payment expires

Use database transactions and appropriate locking/constraints.

Never rely solely on frontend availability checks.

The backend must be authoritative.

==================================================
7. TIME-BASED PRICING
==================================================

Support hourly pricing.

Examples:

1 hour = Rs. X
2 hours = Rs. Y
3 hours = Rs. Z

Also support:
- different weekday pricing
- weekend pricing
- peak hours
- off-peak pricing
- holiday pricing
- minimum stay
- maximum stay
- cleaning buffer
- early check-in surcharge
- late check-out surcharge

Build a PricingEngine abstraction.

The pricing engine must return a transparent calculation:

Base price
+ taxes
+ platform fee
+ optional service fee
- discount
= total

Never calculate final payable amounts solely on the client.

The backend must calculate the authoritative amount.

==================================================
8. PAYMENT SYSTEM
==================================================

Design a provider abstraction:

PaymentProvider

Methods should conceptually include:

createPayment()
verifyPayment()
getPaymentStatus()
handleWebhook()
refundPayment()
getTransaction()
reconcilePayment()

Implement payment adapters for:

1. Khalti
2. eSewa
3. Fonepay / supported Fonepay QR integration

Do NOT hard-code assumptions about merchant API credentials or production endpoints.

Use official provider documentation.

Use environment variables for:
- merchant credentials
- secrets
- API URLs
- callback URLs
- webhook secrets

Payment architecture:

Guest
↓
Create booking intent
↓
Create payment intent
↓
Redirect/open payment provider
↓
User completes payment
↓
Provider callback/webhook
↓
Server verifies payment independently
↓
Update payment status
↓
Confirm booking
↓
Generate check-in credentials

IMPORTANT:

Never mark a booking CONFIRMED merely because the browser returns to a success page.

The backend must independently verify the payment.

Implement:
- idempotent webhook handling
- duplicate callback protection
- transaction reconciliation
- payment timeout
- failed payment recovery
- refund handling
- partial refund support where provider allows
- payment audit records

Do not store wallet PINs, OTPs, card numbers, or other payment credentials.

==================================================
9. FONEPAY QR
==================================================

Treat Fonepay QR as a configurable payment provider.

Support the appropriate merchant integration based on the actual Fonepay commercial/API arrangement available to the platform.

If API-based dynamic QR is available for the merchant account:
- generate transaction-specific payment request
- display QR
- poll or receive callback where officially supported
- verify transaction server-side

If only another approved Fonepay merchant flow is available:
- implement the provider interface without pretending an unsupported API exists
- clearly isolate the integration
- create a configuration adapter

Never build an insecure "upload screenshot as payment proof" mechanism as the primary payment confirmation method.

==================================================
10. USER AUTHENTICATION
==================================================

Use secure authentication.

Prefer:
- phone OTP
- email OTP or magic link
- passwordless authentication

Implement:
- rate limiting
- account lockout/risk controls
- session expiry
- refresh tokens where applicable
- secure cookies
- CSRF protection where required
- XSS protection
- password hashing if passwords are supported
- device/session management
- logout everywhere

Support optional future identity verification.

==================================================
11. AGE / SAFETY
==================================================

The platform is adults-only.

Build an explicit eligibility mechanism.

Do not allow minors to create bookings.

Do not collect unnecessary identity information.

If age verification or identity verification is required by law, property policy, payment provider, insurance requirements, or platform policy, implement it through a replaceable verification service.

Never store unnecessary identity documents indefinitely.

Implement:
- suspicious behavior detection
- excessive cancellation detection
- payment fraud detection
- account abuse detection
- property abuse reporting
- guest reporting
- host reporting
- emergency support mechanism

Do not implement:
- sexual services marketplace
- prostitution matching
- escort marketplace
- trafficking
- underage booking
- anonymous criminal-use facilitation

==================================================
12. LISTING MODEL
==================================================

Property:

property_id
host_id
name
property_type
description
address
city
district
province
latitude
longitude
google_place_id
approximate_location_enabled
contact_policy
check_in_policy
check_out_policy
house_rules
verification_status
approval_status
created_at
updated_at

Space:

space_id
property_id
name
space_type
description
capacity
amenities
photos
hourly_rates
availability_rules
minimum_duration
maximum_duration
cleaning_buffer
self_checkin_enabled
checkin_method
status

Examples of space types:
- Hotel room
- Guest room
- Private room
- Apartment
- Studio
- Meeting room
- Rest room
- Serviced room
- Other legally permissible short-stay space

==================================================
13. HOST VERIFICATION
==================================================

Create a host onboarding process.

Possible requirements:
- identity
- phone
- email
- property ownership/authorization
- business registration where applicable
- PAN/VAT where applicable
- bank/payout details
- property information
- emergency contact
- self-check-in details

Do not assume every host is an individual or every listing is a hotel.

Support:
- individual host
- registered hotel
- guesthouse
- property management business

Admin approval should be configurable.

==================================================
14. REVIEWS
==================================================

Only allow reviews for completed bookings.

Review:
- rating
- cleanliness
- accuracy
- check-in experience
- location
- value
- review text

Do not allow:
- reviews before a completed stay
- self-reviews
- duplicate reviews
- retaliatory manipulation
- abusive content

Implement moderation/reporting.

==================================================
15. SEARCH AND FILTERING
==================================================

Search parameters:

location
date
start time
duration
price range
space type
amenities
rating
distance
self check-in
verified property
instant confirmation

Sorting:
- relevance
- price low to high
- price high to low
- nearest
- highest rated
- recommended

Availability must be computed against the booking engine.

Do not display spaces as available based merely on stale cached frontend data.

==================================================
16. MOBILE-FIRST UI
==================================================

Design for mobile first.

The most important screen is:

HOME

[ Where do you need a stay? ]

[ Search area / landmark ]

[ Date ]

[ Start time ]

[ Duration ]

[ Search ]

Then:

[ MAP ] [ LIST ]

Use a modern hospitality UI.

Design should be:
- premium
- trustworthy
- discreet
- simple
- fast
- clean
- Nepal-friendly
- mobile-first

Avoid:
- excessive animations
- clutter
- unnecessary registration
- confusing checkout
- excessive popups

==================================================
17. CHECKOUT
==================================================

Checkout should display:

Property
Space
Date
Start time
Duration
Price
Taxes
Fees
Discount
Total

Then:

Guest information
Payment method
Terms acceptance
Cancellation policy

Payment buttons:

[ Khalti ]
[ eSewa ]
[ Fonepay QR ]

After successful verification:

BOOKING CONFIRMED

Show:
- booking reference
- property
- room/space
- time
- duration
- exact address according to property's privacy setting
- self-check-in instructions
- access information
- support contact
- Google Maps navigation

CTA:

[ Navigate with Google Maps ]

==================================================
18. GOOGLE MAPS NAVIGATION
==================================================

After booking, provide a Google Maps navigation/action link using the confirmed destination.

The application should support:

"Open in Google Maps"

and, where appropriate, map route functionality.

Do not depend entirely on embedded Google navigation.

A normal external navigation handoff should be available.

==================================================
19. ADMIN DASHBOARD
==================================================

Create a professional admin panel.

Dashboard:

Today's bookings
Active stays
Upcoming stays
Revenue
Platform fees
Pending host approvals
Pending property approvals
Payment failures
Refund requests
Disputes
Reports
Fraud/risk alerts

Charts:
- bookings/day
- revenue/day
- occupancy
- average booking duration
- cancellation rate
- payment success rate
- top locations
- top properties

==================================================
20. NOTIFICATIONS
==================================================

Create notification abstraction.

Channels:
- Email
- SMS
- Push notification
- In-app

Events:
- account created
- booking created
- payment successful
- payment failed
- booking confirmed
- booking reminder
- check-in available
- check-in instructions
- check-out reminder
- cancellation
- refund
- host booking alert
- support update

Use provider adapters.

==================================================
21. DATABASE
==================================================

Design a normalized relational database.

Recommended logical entities:

users
user_profiles
roles
hosts
properties
spaces
amenities
property_amenities
space_amenities
property_photos
space_photos
availability_rules
availability_exceptions
bookings
booking_guests
payments
payment_events
refunds
payouts
pricing_rules
reviews
notifications
checkin_credentials
checkin_events
support_tickets
reports
audit_logs
admin_actions
fraud_events
settings

Use foreign keys.

Use indexes for:
- spatial search
- property
- space
- availability
- booking dates
- booking status
- payment status
- host
- location

==================================================
22. RECOMMENDED TECH STACK
==================================================

Unless there is a strong technical reason otherwise, use:

Frontend:
- Next.js
- TypeScript
- React
- Tailwind CSS
- accessible component system

Backend:
- Next.js server-side/API layer or separate TypeScript backend
- REST or well-structured API architecture

Database:
- PostgreSQL
- PostGIS for geographic queries

ORM:
- Prisma or equivalent strongly typed ORM

Authentication:
- secure OTP-based authentication provider or a properly implemented authentication layer

Maps:
- Google Maps Platform
- Maps JavaScript API
- Places API (New)
- Routes API/library where required

Storage:
- S3-compatible object storage for photos

Caching:
- Redis where useful

Background jobs:
- Redis-based queue or equivalent

Deployment:
- Docker
- CI/CD
- managed PostgreSQL
- managed object storage
- production HTTPS

The architecture must be modular enough to change any component later.

==================================================
23. SECURITY
==================================================

Treat security as a first-class requirement.

Implement:

- TLS
- secure headers
- CSP
- CORS policy
- CSRF protection where required
- input validation
- output encoding
- SQL injection protection
- XSS protection
- rate limiting
- brute-force protection
- API authentication
- authorization
- role-based access control
- object-level authorization
- webhook signature validation
- payment verification
- secret management
- secure logging
- audit trails

Use OWASP principles.

Never trust client-side values.

Never trust:
- price
- availability
- user role
- payment status
- booking status
- property ownership
- access permissions

All sensitive state changes must be server authoritative.

==================================================
24. FRAUD AND ABUSE PREVENTION
==================================================

Create a RiskEngine abstraction.

Possible signals:
- excessive failed payments
- multiple accounts
- unusual booking velocity
- repeated cancellations
- suspicious device behavior
- repeated failed OTP
- payment mismatch
- abnormal location patterns
- repeated disputes
- suspicious host behavior

Do not use discriminatory profiling.

Risk decisions should be explainable.

Allow configurable rules.

==================================================
25. PRIVACY / DATA GOVERNANCE
==================================================

Create:
Privacy Policy
Terms of Service
Cancellation Policy
Host Terms
Acceptable Use Policy
Community Guidelines
Data Retention Policy

Make these configurable through the admin CMS.

The system should support:
- account deletion
- data export where legally required
- data retention rules
- access logs
- consent management

Privacy policies must not claim legal compliance automatically.

Flag Nepal-specific legal/compliance requirements as configuration/review items requiring legal counsel.

==================================================
26. LOCATION PRIVACY
==================================================

Implement listing privacy levels:

PUBLIC_EXACT
PUBLIC_APPROXIMATE
HIDDEN_UNTIL_BOOKED

For example:

Before booking:
"Near Thamel, Kathmandu"

After booking:
full property address

The host chooses the permitted privacy level subject to platform policy and legal requirements.

==================================================
27. BOOKING PRIVACY
==================================================

Guest bookings should not be publicly visible.

Hosts should only see bookings relevant to their property.

Guests should only see their own bookings.

Administrators may access information according to role and audit policy.

Implement strict object-level authorization.

==================================================
28. ERROR HANDLING
==================================================

Never show users:
- stack traces
- SQL errors
- API secrets
- internal identifiers
- framework errors

Create user-friendly errors:

"Payment could not be verified."
"That room is no longer available."
"Your payment session expired."
"Your booking was not completed."
"Please try another payment method."

Log technical details securely server-side.

==================================================
29. OBSERVABILITY
==================================================

Implement:

- structured logs
- request IDs
- error tracking
- payment event logs
- booking event logs
- audit logs
- health endpoint
- readiness check
- liveness check
- monitoring hooks

Create an architecture that can integrate with:
- Sentry
- OpenTelemetry
- cloud logging

==================================================
30. TESTING
==================================================

Create tests from the beginning.

Unit tests:
- pricing
- availability
- booking state transitions
- cancellation
- refunds
- payment verification
- check-in credentials
- authorization

Integration tests:
- booking flow
- payment callback
- payment idempotency
- inventory locking
- host listing creation

E2E tests:
- guest registration
- search
- map
- booking
- payment
- confirmation
- check-in
- cancellation

Security tests:
- unauthorized booking access
- unauthorized host access
- privilege escalation
- webhook replay
- duplicate payments
- price manipulation
- availability manipulation

==================================================
31. PAYMENT TESTING
==================================================

Never use real payment credentials during development.

Create:
- payment provider interface
- mock provider
- sandbox configuration
- fake webhook generator

Make it possible to fully test:

PAYMENT INITIATED
→ PAYMENT SUCCESS
→ PAYMENT FAILED
→ PAYMENT EXPIRED
→ DUPLICATE CALLBACK
→ REFUND
→ PARTIAL REFUND
→ PAYMENT/BOOKING MISMATCH

==================================================
32. SEED DATA
==================================================

Create development seed data for Kathmandu Valley.

Include example locations such as:
- Thamel
- Lazimpat
- Baluwatar
- Baneshwor
- Patan
- Jawalakhel
- Lalitpur
- Bhaktapur
- Airport area

Clearly label all seeded listings as DEVELOPMENT / DEMO data.

Do not represent fictitious businesses as real businesses.

==================================================
33. SEO
==================================================

Create SEO-friendly public listing pages.

Examples:

/stay
/stays/kathmandu
/stays/kathmandu/thamel
/property/[slug]
/property/[slug]/[space-slug]

Use:
- semantic HTML
- metadata
- OpenGraph
- structured data where appropriate
- sitemap
- robots.txt

Do not expose private booking information in search indexes.

==================================================
34. PERFORMANCE
==================================================

Target excellent mobile performance.

Optimize:
- image loading
- lazy loading
- code splitting
- map loading
- database queries
- caching
- search
- API response times

Do not load Google Maps unnecessarily.

Use map APIs efficiently and respect billing/cost considerations.

Google Maps Platform uses usage-based billing, so minimize unnecessary map/Places calls and architect caching/session usage appropriately.

==================================================
35. COST CONTROL
==================================================

Create a configuration layer for:
- map API quotas
- Places requests
- image storage
- database
- email
- SMS
- payment API calls

Add monitoring hooks for API usage.

Never embed unlimited third-party API calls in client-side loops.

==================================================
36. PROJECT STRUCTURE
==================================================

Create a clean monorepo or modular repository.

Example:

/apps
  /web
  /admin

/packages
  /ui
  /database
  /auth
  /payments
  /maps
  /booking
  /pricing
  /notifications
  /checkin
  /security
  /config

/docs
  architecture.md
  api.md
  database.md
  payments.md
  deployment.md
  security.md
  privacy.md

/tests

/infrastructure

==================================================
37. DEVELOPMENT PHASES
==================================================

Do not try to blindly implement the entire system in one giant pass.

Implement in stages.

PHASE 1 — Foundation
- Repository
- Architecture
- Database
- Authentication
- UI system
- Environment configuration

PHASE 2 — Marketplace
- Host
- Property
- Space
- Listing
- Search
- Filters
- Photos

PHASE 3 — Maps
- Google Maps
- Places
- Map/list UI
- Geographic search

PHASE 4 — Booking
- Availability
- Pricing
- Inventory locking
- Checkout
- Booking states

PHASE 5 — Payments
- Khalti
- eSewa
- Fonepay provider abstraction
- Webhooks
- Verification
- Reconciliation

PHASE 6 — Self Check-in
- Credential generation
- Check-in state
- Access providers
- Expiration

PHASE 7 — Admin
- Admin dashboard
- Approvals
- Payments
- Refunds
- Reports
- Moderation

PHASE 8 — Security
- OWASP review
- Authorization review
- Payment review
- Privacy review

PHASE 9 — Testing
- Unit
- Integration
- E2E
- Security

PHASE 10 — Deployment
- Docker
- CI/CD
- Production config
- Monitoring
- Backups
- Disaster recovery

==================================================
38. IMPORTANT CODING INSTRUCTION
==================================================

DO NOT generate fake implementations and pretend they are production-ready.

When an external service requires:
- API credentials
- merchant onboarding
- commercial approval
- legal approval
- API access
- production credentials

create a clearly defined integration adapter with:
- interfaces
- environment variables
- configuration
- mock implementation
- sandbox implementation where documentation permits

Then document exactly what must be supplied before production.

Never invent undocumented API endpoints.

Never guess payment signatures.

Never guess webhook formats.

Use the provider's official documentation.

==================================================
39. DELIVERABLES
==================================================

Produce:

1. Complete source code
2. Database schema
3. Migrations
4. Seed data
5. Authentication
6. Guest application
7. Host dashboard
8. Admin dashboard
9. Booking engine
10. Pricing engine
11. Payment abstraction
12. Khalti integration
13. eSewa integration
14. Fonepay integration adapter
15. Google Maps integration
16. Google Places integration
17. Navigation links
18. Self-check-in subsystem
19. Notification subsystem
20. Reviews
21. Security controls
22. Audit logging
23. Tests
24. Docker configuration
25. CI/CD configuration
26. Environment template
27. API documentation
28. Architecture documentation
29. Deployment documentation
30. Security documentation

==================================================
40. ENVIRONMENT VARIABLES
==================================================

Create a complete .env.example.

Include placeholders such as:

DATABASE_URL=

NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=

GOOGLE_MAPS_API_KEY=

KHALTI_BASE_URL=
KHALTI_PUBLIC_KEY=
KHALTI_SECRET_KEY=
KHALTI_WEBHOOK_SECRET=

ESEWA_BASE_URL=
ESEWA_MERCHANT_ID=
ESEWA_SECRET_KEY=
ESEWA_WEBHOOK_SECRET=

FONEPAY_BASE_URL=
FONEPAY_MERCHANT_ID=
FONEPAY_SECRET=
FONEPAY_WEBHOOK_SECRET=

REDIS_URL=

STORAGE_ENDPOINT=
STORAGE_BUCKET=
STORAGE_ACCESS_KEY=
STORAGE_SECRET_KEY=

EMAIL_PROVIDER=
EMAIL_API_KEY=

SMS_PROVIDER=
SMS_API_KEY=

JWT_SECRET=

SESSION_SECRET=

==================================================
41. ADMIN CONFIGURATION
==================================================

Do not hard-code business rules.

Create configurable settings for:

platform_fee
service_fee
tax_rate
minimum_booking_duration
maximum_booking_duration
booking_hold_minutes
cancellation_window
refund_policy
host_commission
guest_age_requirement
listing_approval_required
host_approval_required
approximate_location_default
self_checkin_allowed
review_window
fraud_thresholds

==================================================
42. BUSINESS MODEL
==================================================

Support:

- host commission
- guest service fee
- optional promotional discounts
- coupon system
- minimum booking value
- configurable taxes

Do not assume exact Nepal tax/commission rules.

Make them configurable and explicitly document that production values require business/legal/accounting validation.

==================================================
43. LEGAL/COMPLIANCE CHECKPOINT
==================================================

Before production deployment, create a compliance checklist covering:

- accommodation/business registration
- local licensing
- taxation
- payment-provider merchant onboarding
- privacy/data protection
- identity/age verification
- consumer protection
- refund requirements
- electronic transaction requirements
- host obligations
- guest obligations
- law-enforcement request handling
- emergency procedures

The software must NOT claim that these requirements are satisfied merely because the code exists.

==================================================
44. PRODUCT EXPERIENCE
==================================================

The main selling proposition is:

"Find a suitable short stay quickly, pay securely, and check in privately."

The UX should feel closer to:
- modern hotel booking
- ride-hailing simplicity
- Airbnb-style marketplace
- food-delivery-style fast checkout

But do NOT copy proprietary branding, layouts, or copyrighted visual assets.

==================================================
45. ACCEPTANCE TEST
==================================================

The MVP is complete only when the following scenario works end-to-end:

1. Host creates account.
2. Host creates property.
3. Host creates a room.
4. Host adds photos.
5. Host defines Rs. hourly pricing.
6. Host enables self check-in.
7. Admin approves property.
8. Guest searches "Thamel".
9. Map shows available properties.
10. Guest chooses a room.
11. Guest chooses a date.
12. Guest chooses start time.
13. Guest chooses duration.
14. Backend calculates price.
15. Guest selects a payment method.
16. Payment is initiated.
17. Payment provider returns/calls back.
18. Backend independently verifies payment.
19. Booking becomes CONFIRMED.
20. Inventory is locked.
21. Guest receives confirmation.
22. Self-check-in credential is generated.
23. Credential activates only during allowed check-in window.
24. Guest sees exact navigation destination according to property settings.
25. Guest completes check-in.
26. Check-in is recorded.
27. Guest checks out.
28. Access credential expires.
29. Booking becomes COMPLETED.
30. Guest can review property.
31. Host sees completed booking.
32. Admin sees payment and booking records.
33. Audit trail exists.

==================================================
46. FINAL AGENT BEHAVIOR
==================================================

Act like a senior engineering team.

Before implementing:
- inspect the repository
- identify constraints
- create architecture
- identify missing dependencies
- create implementation plan
- create tasks
- implement incrementally
- run tests
- fix errors
- review security
- review UX
- review database integrity
- review payment correctness

After each major phase:
- run tests
- verify compilation
- verify database migrations
- inspect errors
- update documentation

Never leave TODOs disguised as finished features.

Clearly label:
- implemented
- mocked
- sandbox
- requires credentials
- requires provider approval
- requires legal review

The objective is a genuinely runnable, maintainable MVP that can be deployed after legitimate third-party onboarding and compliance review—not a mockup or demo pretending to be production software.