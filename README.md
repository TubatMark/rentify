# 🚗 Rentify
### *The Intelligent Fleet Management Solution*

Rentify is a comprehensive dashboard designed to streamline vehicle operations, booking workflows, and performance tracking. Built for efficiency and real-time visibility, it empowers fleet managers to monitor their assets with precision and ease.

---

### ✨ Key Features

*   **📊 Dynamic Dashboard**: Gain instant insights with real-time statistics on total vehicles, active bookings, and fleet utilization.
*   **🚘 Advanced Vehicle Tracking**: Manage your entire inventory in one place. Add, update, or remove vehicles with status tracking (Available, Rented, Maintenance).
*   **📅 Seamless Booking Management**: Track rental cycles and customer reservations with an intuitive interface.
*   **📜 Live Activity Logs**: Monitor every update across your fleet through a dedicated activity feed, ensuring complete operational transparency.
*   **🌓 Responsive Design**: A polished, modern UI that works flawlessly across desktop and mobile devices.

---

### 🛠️ Built With

*   **Framework**: [Next.js](https://nextjs.org/) for a lightning-fast React experience.
*   **Backend**: [Convex](https://convex.dev/) for real-time data synchronization and type safety.
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/) for modern, fluid animations.
*   **Icons**: [Lucide React](https://lucide.dev/) for clean, consistent iconography.

---

### 🚀 Getting Started

Experience the Rentify dashboard locally in just a few steps:

1.  **Clone the Repository**
2.  **Install Dependencies**
    ```bash
    pnpm install
    ```
3.  **Launch the Real-time Backend**
    ```bash
    npx convex dev
    ```
4.  **Start the Frontend**
    ```bash
    pnpm dev
    ```

Visit `http://localhost:3000` to explore the dashboard.

---

### 💡 Note for Developers

The current codebase contains **mocked** Convex generated files in `convex/_generated/` to allow the project to build without requiring a live connection during initial setup. Running `npx convex dev` will replace these with actual generated code and connect you to your own live backend.
