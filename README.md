# Odin Shopping Cart

A responsive shopping cart web application built for [The Odin Project](https://www.theodinproject.com/) React course. This project demonstrates key React concepts including state management, routing, component composition, and localStorage persistence, with a focus on modern UI/UX and mobile responsiveness.

## Tech Stack

- **React** (v19)
- **Vite** (bundler)
- **React Router DOM** (v7)
- **@mdi/react** & **@mdi/js** (Material Design Icons)
- **CSS Modules** (scoped styling)
- **LocalStorage** (cart persistence)
- **DummyJSON & FakeStoreAPI** (product/image data)

## Features

- Product listing with quantity controls
- Add/remove items from cart
- Cart summary with itemized pricing
- Delete items from cart
- Responsive design for desktop and mobile
- Persistent cart state via localStorage
- Animated UI and polished styles

## Getting Started

1. **Install dependencies:**
   ```sh
   pnpm install
   ```
2. **Run the development server:**
   ```sh
   pnpm dev
   ```
3. **Build for production:**
   ```sh
   pnpm build
   ```

## Project Structure

- `src/components/` – Reusable UI components
- `src/pages/` – Route-based pages (Shop, Cart, Homepage)
- `src/modules/` – Utility functions
- `src/assets/` – Fonts and icons
- `src/routes/` – App routing

## Credits

- [The Odin Project](https://www.theodinproject.com/)
- [FakeStoreAPI](https://fakestoreapi.com/)
- [DummyJSON](https://dummyjson.com/)
- [Material Design Icons](https://materialdesignicons.com/)
