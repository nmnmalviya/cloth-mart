# WearIt - a Zomato-style app, but for clothes

A full multi-page React web app modeled on Zomato's UX: browse stores, view a store's catalog,
add items to cart, checkout, and see order history — except instead of restaurants and food,
it's clothing merchants and apparel.

## Structure

```
cloth-mart/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx                 # BrowserRouter + CartProvider + App
    ├── App.jsx                  # route definitions + bottom nav shell
    ├── index.css
    ├── data/
    │   └── merchants.json       # 6 mock clothing stores with products (swap for your API)
    ├── context/
    │   └── CartContext.jsx      # global cart + order state (React Context)
    ├── components/
    │   ├── Header.jsx           # HomeHeader (search) + BackHeader (detail pages)
    │   ├── BottomNav.jsx         # Home / Cart / Orders / Profile tabs
    │   ├── OfferBanner.jsx       # promo carousel
    │   ├── CategoryStrip.jsx    # category filter chips
    │   ├── MerchantCard.jsx     # store card on Home
    │   ├── ProductCard.jsx      # product row with Add/qty controls
    │   └── Stars.jsx
    └── pages/
        ├── Home.jsx              # store listing, search, sort, category filter
        ├── MerchantPage.jsx      # store's product catalog ("restaurant menu" equivalent)
        ├── CartPage.jsx          # cart review + checkout
        ├── OrdersPage.jsx        # order history (mock, in-memory)
        └── ProfilePage.jsx       # account tab
```

## Run it

```bash
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173).

## How it maps to Zomato

| Zomato concept        | WearIt equivalent              |
|------------------------|---------------------------------|
| Restaurants            | Clothing merchants/stores       |
| Menu items             | Products (tees, kurtas, jackets…) |
| Cuisine tags           | Style tags (Streetwear, Ethnic, Formal…) |
| Delivery time & rating | Same, per store                |
| Cart & checkout        | Same                            |
| Order history          | Same                            |

## Connecting a real backend

Replace the static import in any page:
```js
import merchantsData from "../data/merchants.json";
```
with a fetch call to your API, keeping the same shape:
`{ id, name, tagline, rating, reviews, deliveryTime, area, priceForTwo, offer, cover, products: [{ id, name, price, mrp, category, img, desc, bestseller }] }`.

The cart, routing, and all components will keep working unchanged since they only depend on that shape.

## Build for production

```bash
npm run build
```
