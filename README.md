# Bhojan — Food Ordering React Web Application

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![React Router](https://img.shields.io/badge/React_Router-6.21.1-red.svg)](https://reactrouter.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Bhojan** (meaning *meal* in Sanskrit) is a modern, high-performance food delivery web application built with React 18, React Router v6, and Swiggy's Live DAPI. It provides a real-time food discovery and ordering experience.

---

## 🚀 Key Features Implemented

### 1. 🛡️ Complete CORS Issue Resolution
- **Dev-Server Reverse Proxy (`setupProxy.js`)**: Configured `http-proxy-middleware` in Create React App to transparently forward `/dapi/*` requests directly to `https://www.swiggy.com` with custom browser headers and origin rewriting. This eliminates all browser CORS blocks on `localhost:3000` without requiring external extensions.
- **Dual-Mode Resilient Data Fetching**: Attempts dev-server proxy first, followed by direct API, and gracefully falls back to rich local datasets (`restaurantList` and fallback menus) if Swiggy's servers rate-limit or return 202/Cloudflare challenges.
- **Visual API Status Indicator**: A non-intrusive status pill clearly informs the user whether live Swiggy data or verified cached data is currently being served, complete with a manual refresh button.

### 2. 🛒 Full-Featured Cart & Checkout System
- **State Management via React Context API (`CartContext.js`)**: Centralized cart state supporting `addToCart`, `removeFromCart`, `deleteFromCart`, and `clearCart`.
- **LocalStorage Persistence**: Cart state automatically syncs to `localStorage` so items survive page refreshes.
- **Interactive Dish Stepper (`Menu.js`)**: Seamless `+ ADD` and `[-] quantity [+]` controls directly on the menu items.
- **Floating Cart Banner**: Appears at the bottom of the restaurant menu whenever items are in the cart, providing immediate visual feedback and quick navigation to checkout.
- **Dynamic Bill Breakdown (`Cart.js`)**:
  - Item total calculation
  - Delivery partner fee with free delivery threshold (orders above ₹300)
  - Platform fee & GST / restaurant tax calculations
  - Special cooking/delivery instruction notes
  - Delivery address card
- **Simulated Order Placement**: Interactive checkout generating unique Order IDs (`BHJ-XXXXXX`) and a visual 3-stage delivery tracking timeline (*Order Confirmed* → *Cooking in Kitchen* → *Out for Delivery*).

### 3. 🔍 Smart Search & Multi-Filter Engine
- **Multi-Attribute Search**: Real-time search across restaurant names, cuisines, and localities.
- **Interactive Filter Chips**:
  - ⭐ Top Rated (4.2+ rating)
  - ⚡ Fast Delivery (≤ 35 mins)
  - 🌱 Pure Veg filter
  - 💰 Budget Friendly (Under ₹300)
  - Quick "Reset Filters" action
- **Empty States**: Helpful messages with reset action buttons when no matching results are found.

### 4. 🍽️ Rich Restaurant Menu Page
- **Restaurant Banner**: Showcases cover image, average rating, cuisines, area name, delivery time, and cost for two.
- **Veg Only Toggle**: Smooth toggle switch that filters veg items without losing un-filtered menu cache.
- **Menu Search**: Real-time in-menu dish search.
- **Category Filter Pills**: Quick category pills (e.g. Recommended, Main Course, Breads, Beverages, Desserts).

### 5. 🎨 Design & UX Excellence
- **Design System**: Curated color palette (Swiggy brand orange `#fc8019`, emerald green `#0f8a65`, sleek dark cards `#1e293b`).
- **Typography**: Enhanced with Google's *Plus Jakarta Sans*.
- **Pulsing Shimmer Skeletons (`Shimmer.js`)**: Modern skeleton cards during data fetching.
- **Network Status Bar**: Real-time online/offline detector in navbar.
- **Mobile Responsive**: Fully responsive navbar with hamburger menu for mobile and tablet devices.

---

## 📁 Project Architecture

```
swiggy/
├── public/
│   ├── index.html            # Main HTML with SEO tags & Plus Jakarta Sans
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── About.js          # About Us page with architectural highlights
│   │   ├── Body.js           # Main restaurant feed, search, and filter chips
│   │   ├── Cart.js           # Full cart page with bill breakdown & checkout
│   │   ├── Contact.js        # Contact page with interactive form
│   │   ├── Error.js          # Custom 404 & route error page
│   │   ├── Footer.js         # Modern footer with branding & social links
│   │   ├── Header.js         # Navbar with online pill & live cart badge
│   │   ├── Menu.js           # Dish row card with stepper & diet indicators
│   │   ├── RestaurantCard.js # Restaurant card with discount badges & SLA
│   │   ├── RestaurantMenu.js # Restaurant header, menu filters & floating bar
│   │   ├── Shimmer.js        # Pulsing skeleton cards
│   │   └── constants.js      # API endpoints, fallback menus & restaurant data
│   ├── context/
│   │   └── CartContext.js    # React Context for cart state & storage
│   ├── setupProxy.js         # CRA webpack-dev-server proxy to bypass CORS
│   ├── App.css               # Complete modern CSS design system
│   ├── App.js                # Root component & React Router configuration
│   └── index.js              # Entry point
└── package.json
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/RajShukla1/Bhojan-App.git

# Navigate to project directory
cd Bhojan-App

# Install dependencies
npm install
```

### Running Locally
```bash
npm start
```
The application will launch at [http://localhost:3000](http://localhost:3000). The dev-server automatically engages `setupProxy.js` to route all `/dapi` requests to Swiggy's API without CORS restrictions.

### Building for Production
```bash
npm run build
```
Creates an optimized production bundle in the `build/` directory.

---

## 👨‍💻 Author
- **Raj Shukla**
- Twitter: [@rajshuklatwt](https://twitter.com/rajshuklatwt)
- LinkedIn: [Raj Shukla](https://linkedin.com/in/rajshukla18)
- GitHub: [RajShukla1](https://github.com/RajShukla1)
