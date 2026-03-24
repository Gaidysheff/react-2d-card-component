# 💳 Interactive 2D Bank Card Component

[![Live Demo](https://img.shields.io)](https://bank-card-2d.vercel.app/)

![Preview](./docs/cover.png)

A sleek, production-ready React component for credit card data entry. Focused on smooth UX, real-time validation, and modern styling.

### 🌟 Key Features

- **Dynamic Field Sync:** Real-time synchronization between form inputs and the card preview.
- **Smart Validation:** Powered by **TanStack Form** and **Zod** for robust, type-safe error handling.
- **Luhn Algorithm:** Automatic card number validation.
- **Adaptive UI:** Built with **Tailwind CSS** and **Shadcn UI** for a clean, accessible interface.
- **Responsive Design:** Works flawlessly on mobile and desktop devices.

### 🛠 Tech Stack

- **React 19** (Vite)
- **TanStack Form** (State management)
- **Zod** (Schema validation)
- **Tailwind CSS** (Styling)
- **Lucide React** (Icons)

### 🚀 Getting Started

1. Clone the repo: `git clone [url]`
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev`

### 💡 Why this approach?

This component demonstrates how to handle complex form states without performance lags. By using **TanStack Form**, we ensure that only the necessary fields re-render, keeping the card preview animation buttery smooth.
