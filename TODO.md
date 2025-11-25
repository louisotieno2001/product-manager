# Product Manager Vue 3 App - Todo List

## 1. Project Setup
- [ ] Initialize Vue 3 app with Vite
- [ ] Install and setup Vue Router
- [ ] Install and setup Pinia for state management
- [ ] Install Tailwind CSS and configure with primary color #000080
- [ ] Configure Axios or fetch wrapper for API calls

## 2. Authentication
- [ ] Create Login page (`/login`)
  - [ ] Centered login form with username, password, and login button
  - [ ] Implement login API call to DummyJSON login endpoint
  - [ ] Store auth token and user info in Pinia auth store
  - [ ] Persist auth state to localStorage
  - [ ] Redirect to `/products` on successful login
- [ ] Add route protection
  - [ ] Restrict `/login` to unauthenticated users only
  - [ ] Redirect authenticated users away from `/login`

## 3. Product Listing (`/products`)
- [ ] Create product listing page
  - [ ] Display products in a table with columns: thumbnail (circular), title, truncated description, category, price, stock
  - [ ] Add search input to filter products by title
  - [ ] Add optional filters (if time permits)
  - [ ] Add "Add New Product" button linking to add product page
  - [ ] Make table rows clickable to open product details

## 4. Product Details (`/products/:id`)
- [ ] Create product details page
  - [ ] Display full product information: image, title, full description, category, price, stock, rating, discount (nice to have)
  - [ ] Provide a "Back to Home" button
  - [ ] Add a "Delete" button with confirmation modal
  - [ ] Optional: Add edit product feature

## 5. Add Product (`/products/new`)
- [ ] Create Add Product form page
  - [ ] Form fields: title (required), description, category, price, stock, thumbnail URL
  - [ ] Validate required fields
  - [ ] On success, add product to Pinia store and redirect to product listing

## 6. State Management with Pinia
- [ ] Auth Store:
  - [ ] Manage token, user info, isAuthenticated getter
  - [ ] Actions: login(), logout(), restoreSession()
- [ ] Product Store:
  - [ ] Manage products, isLoading, error states
  - [ ] Actions: fetchProducts(), fetchProductById(), addProduct(), updateProduct(), deleteProduct()

## 7. API Integration
- [ ] Use DummyJSON for authentication and product APIs
- [ ] Attach auth token in headers for product-related API requests

## 8. Styling
- [ ] Use Tailwind CSS throughout the app
- [ ] Apply primary color #000080 where applicable (buttons, links, highlights)

## 9. Routing
- [ ] Setup Vue Router with routes for:
  - `/login`
  - `/products`
  - `/products/:id`
  - `/products/new`
- [ ] Implement route guards using auth state

## 10. Final Deliverables
- [ ] Write a detailed README.md with setup, run instructions, and project overview
- [ ] Push code to a public GitHub repository
- [ ] Deploy app on GitHub Pages
- [ ] Ensure all features are tested and working before deadline (25th November 2025, 2:00 PM Africa/Nairobi)

## 11. Optional Bonus
- [ ] Implement product editing feature on product details page
- [ ] Add nice-to-have UI enhancements (ratings, discount display, better filters)

---

Deadline: 25th November 2025, 2:00 PM (Africa/Nairobi time)