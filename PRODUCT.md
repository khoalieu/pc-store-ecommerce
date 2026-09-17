# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML5 and CSS3. A very small amount of dependency-free vanilla JavaScript is allowed only for preview interactions such as sidebar and drawer toggles, tabs, dropdowns, accordions, and modals. The current validation target is desktop web; mobile-specific interface work is deferred. No application state, authentication, backend, API, database, payment, shipping, or production business logic is implemented in this phase.

## Users

- Primary: Vietnamese PC buyers who need to assemble or upgrade a new-component desktop within a budget and want to understand compatibility, total cost, shop terms, and responsibility after purchase before committing.
- Secondary: buyers who prefer to publish a budget and requirements so several qualified shops can propose comparable builds.
- Shop owners and authorized staff: maintain offers and stock, respond to build requests, process sub-orders, shipping, after-sales work, and settlement views within their own shop scope.
- Platform operators: catalogue specialists, support/moderation staff, and platform administrators who manage standard models, compatibility rules, cases, transactions, policies, and audit history according to role.

## Product Purpose

PCMatch is a Vietnamese B2C marketplace for new PC components. It helps buyers move from technical uncertainty to a reviewable configuration, compare offers transparently, purchase across one or more shops, and retain clear ownership of shipping, warranty, returns, and disputes. The current static UI package is the official visual baseline for Buyer, Shop, and Admin surfaces before production engineering begins.

## Positioning

PCMatch combines three kinds of matching in one traceable experience: component-to-component compatibility, requirement-to-budget configuration, and buyer-to-shop proposal comparison. Standard technical models are separated from shop offers, and compatibility evidence is kept distinct from price, seller reputation, and commercial terms.

## Operating Context

- Public discovery and buyer account areas cover search, model research, offer comparison, PC building, budget requests, proposals, multi-shop checkout, order tracking, and after-sales support.
- A Shop portal covers shop onboarding, staff permissions, standard-model lookup, offers, stock, proposals, sub-orders, shipping, after-sales processing, finance, and reporting.
- An Admin portal covers accounts and permissions, shops, catalogue data and sources, compatibility rules, moderation, cases, payment/refund monitoring, settlements, shipping integrations, policy, reporting, and audit.
- Product language is Vietnamese; money is VND; delivery is within Vietnam; displayed dates and times should be consistent with Vietnam time.
- The continuous illustrative scenario follows buyer Nguyễn Minh, shops BuildPro Sài Gòn and TechZone Hà Nội, Build ID `BLD-MINH-2026-001`, and parent order `PCM-260916-001`.

## Capabilities and Constraints

- MVP scope is B2C new components across CPU, Mainboard, RAM, GPU, SSD, PSU, Case, and Cooling.
- A shop has one primary warehouse in MVP. A checkout creates one parent order and one sub-order per shop; each sub-order has one shipment in MVP.
- Online payment and shipping are simulated. COD, instalments, wallets, real payment details, live carrier integrations, and production callbacks are out of scope.
- Assembly is available only when one shop supplies the complete build and offers assembly. Multi-shop assembly is not supported.
- A shop proposal may use only that shop's own offers. Selecting a proposal does not reserve stock or create an order.
- Compatibility has four explicit outcomes: incompatible, conditional, insufficient data, and passed checks. A passed check is not an absolute guarantee, and insufficient data may not be presented as success.
- The cart does not reserve stock or guarantee price. Checkout must visibly recheck price, stock, fees, warranty, and compatibility without silently substituting products or partially placing an invalid order.
- Standard models, shop offers, parent orders, sub-orders, payments, shipments, after-sales cases, refunds, and settlements are separate concepts and must remain visually distinct.
- This phase is a static web UI reference with no backend or production business logic. All data, loading, error, permission, stale-data, and integration states are authored examples rather than live behavior.
- Open production decisions remain documented in `docs/PCMatch_UI_REQUIREMENTS_SPEC.md`; the UI must avoid turning unresolved assumptions into policy or commercial claims.

## Brand Commitments

- Brand name: PCMatch.
- Full name: PCMatch — Sàn linh kiện và kết nối cấu hình PC đa cửa hàng.
- Tagline: “Khớp cấu hình. Đúng ngân sách. Chọn shop minh bạch.”
- The two primary public entry points—“Tự build PC” and “Nhận cấu hình theo ngân sách”—have equal strategic weight.
- Voice is technically precise, transparent, helpful, and calm. It explains uncertainty and responsibility instead of hiding them behind promotional language.
- No approved logo, illustration system, trademark clearance, or complete production brand library exists in the repository yet. A small, source-documented set of product packshots is included only as catalog seed media for static UI validation; commercial usage rights must be confirmed or the assets replaced before public release.

## Evidence on Hand

- `docs/PCMatch_UI_REQUIREMENTS_SPEC.md` is the confirmed product and UI requirements authority for this phase. It consolidates the project's earlier analysis package, use cases, actor definitions, and scope decisions.
- The specification contains the role model, 107-screen inventory, state vocabulary, business rules that must be visible in UI, traceability matrix, representative data scenario, responsive expectations, and prototype acceptance criteria.
- No real customer testimonials, partner logos, verified commercial benchmarks, production prices, carrier/payment contracts, or live operational data are available. Future work must not fabricate them.
- Seed product imagery and its provenance are recorded in `prototype/assets/images/products/SOURCES.md`; the images demonstrate catalog density and recognition but are not evidence of supplier relationships or merchandising approval.

## Product Principles

1. Make compatibility understandable, not magical: show the result, uncertainty, source context, affected parts, and a corrective path.
2. Keep technical truth separate from commercial choice: model facts, shop offers, price, delivery, warranty, and reputation must remain independently inspectable.
3. Preserve responsibility across boundaries: users should always know which shop, shipment, item, serial, payment, or case an action affects.
4. Recheck before commitment: price, stock, fees, compatibility, and version changes are surfaced before order placement or proposal acceptance.
5. Demonstrate the whole system with one coherent scenario: representative data and states stay consistent across Buyer, Shop, and Admin surfaces.

## Accessibility & Inclusion

- The current static validation package targets desktop web; future production implementation must define tablet and mobile behavior as a separate scoped pass.
- Use semantic structure, visible keyboard focus, labelled controls, sufficiently large touch targets, text alternatives, and errors stated in words.
- Status and compatibility meanings must never rely on color alone; pair color with text and a recognizable symbol.
- Main reading text is at least 16px, with sufficient contrast and predictable navigation across each portal.
- Dense tables preserve column relationships and semantic headers on desktop; future small-screen behavior must not drop critical data or actions.
