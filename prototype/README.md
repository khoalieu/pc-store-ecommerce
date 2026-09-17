# PCMatch official static UI

## Open the interface

From the repository root:

```bash
python3 -m http.server 4173 -d prototype
```

Then open `http://127.0.0.1:4173/`.

No build step, backend, API, authentication, database, payment, or carrier integration is required. JavaScript is limited to UI-only interactions: menus/sidebar, tabs, dialogs, dropdowns, and synchronized slot focus.

## Implemented product surfaces

| Requirement family | Static UI file |
|---|---|
| Sitemap and all B01–B45, S01–S31, A01–A31 IDs | `index.html` |
| B01 Home | `buyer/home.html` |
| B02/B03 Search and category | `buyer/search.html` |
| B04/B05 Model and offers | `buyer/model.html` |
| B14/B15 Builder and slot selection | `buyer/builder.html` |
| B21–B27 Budget request and proposal comparison | `buyer/proposals.html` |
| B28–B34 Cart, checkout, diff, payment result | `buyer/checkout.html` |
| B35–B45 Order, shipping, after-sales, cases | `buyer/order.html` |
| S01–S16 and S27–S31 Shop overview | `shop/dashboard.html` |
| S17–S26 Shop order and after-sales family | `shop/order.html` |
| A01–A05 and A12–A31 Admin operations | `admin/dashboard.html` |
| A06–A11 Catalogue and compatibility rules | `admin/rules.html` |
| B08–B13 Account and authentication family | `auth/login.html` |
| Shared loading/empty/error/permission/confirmation states | `states/index.html` |

Displayed values are interface fixtures rather than live data. They remain consistent with the Nguyễn Minh / BuildPro Sài Gòn / TechZone Hà Nội scenario in the requirements specification.
