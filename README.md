# Amazon Style Landing Page

A premium, responsive product listing and detail application built as an Amazon Style Landing Page. 

**Demo Link:** [https://Devanshu269.github.io/AmazonStyleProductlandingPage/](https://Devanshu269.github.io/AmazonStyleProductlandingPage/)

*(Note: Replace the link above with the actual GitHub Pages URL once deployed).*

---

## 🚀 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Devanshu269/AmazonStyleProductlandingPage.git
   cd "AmazonStyleProductlandingPage"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🧠 Assumptions Made

1. **Dataset Size for Filtering:** 
   The DummyJSON API does not currently support server-side filtering by multiple concurrent parameters (e.g., Price Range + Brand) alongside pagination natively. Since the dataset is relatively small (~194 items total), the app assumes it is safe and performant to fetch the full dataset for a selected category (or all products if no category is selected) and perform price and brand filtering **client-side**.
2. **Brand Filtering:** 
   Since there isn't a dedicated `/brands` endpoint, the list of available brands in the filter sidebar is dynamically extracted from the fetched products.
3. **URL Search Params:** 
   The requirement "Previously selected filters should remain applied when navigating back" implies state persistence. I assumed using URL Search Parameters (e.g., `?category=beauty&page=2`) is the best approach for this, as it allows users to share links with specific filters applied and guarantees the back button works exactly as expected without needing complex global state management (like Redux).
4. **Styling:** 
   The requirement explicitly asked to avoid heavy UI libraries. I assumed a bespoke, modern CSS implementation using custom properties, CSS Grid/Flexbox, and a premium "glassmorphism" aesthetic would best demonstrate UI/UX skills.

---

## 🏗️ Architectural Decisions

1. **React + Vite:** Chosen for fast development server startup, optimized production builds, and modern tooling out-of-the-box.
2. **React Router DOM:** Used for declarative routing between the Listing Page (`/`) and Detail Page (`/product/:id`). Crucial for managing the URL search parameters to persist filter states.
3. **Custom Hooks for Data Fetching & State:**
   - `useProducts`: Encapsulates the logic for fetching data, applying client-side filters (price/brand), and handling client-side pagination. This keeps the component logic clean.
   - `useCategories`: Fetches and caches categories on mount.
   - `useProductDetail`: Fetches a single product's data.
4. **Component-Driven UI:**
   UI is broken down into small, reusable components (`ProductCard`, `ProductGrid`, `Filters`, `Pagination`, `StarRating`, `Loader`, `ErrorMessage`).
5. **CSS Variables (Custom Properties):**
   The entire design system (colors, spacing, shadows) is managed via CSS variables in `index.css`. This makes the theme easy to maintain and extend in the future.
6. **Error & Loading States:**
   Graceful degradation is implemented. Skeleton loaders are shown during network requests, and styled error boundaries/retry buttons appear if API calls fail.

---

## 🔮 Improvements If Given More Time

1. **Server-Side Filtering & Pagination (Backend Dependency):** 
   If the backend API supported it, I would move price and brand filtering, along with pagination, entirely to the server side (e.g., `?category=beauty&minPrice=10&brand=Apple&skip=0&limit=12`). This is required for scaling to thousands of products.
2. **Debouncing Filter Inputs:**
   Add a 300ms–500ms debounce to the min/max price text inputs to prevent aggressive re-filtering/re-rendering on every keystroke.
3. **Global State Management:**
   While URL parameters are great for filter state, adding a lightweight global state tool (like Zustand or React Context) would be useful for managing global elements like a Shopping Cart or User Authentication state.
4. **Unit and E2E Testing:**
   Integrate Vitest/React Testing Library to write unit tests for the custom hooks (especially the filtering logic) and components. Add Cypress or Playwright for End-to-End testing of the filter → click product → go back flow.
5. **Accessibility (a11y) Improvements:**
   Ensure stricter adherence to WCAG guidelines. Improve keyboard navigation traps in the sidebar, ensure all color contrasts meet AAA standards, and add more comprehensive `aria` labels.
6. **Image Optimization:**
   Currently relying on the CDN images provided by DummyJSON. In a real app, I would implement lazy loading (e.g., using intersection observers or `loading="lazy"`) and responsive image sets (`srcset`) to optimize load times on mobile.
