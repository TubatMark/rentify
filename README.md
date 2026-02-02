# Rentify - Fleet Management with Convex

This project is integrated with [Convex](https://convex.dev/) for its backend.

## Important Note for Developers

The current codebase contains **mocked** Convex generated files in `convex/_generated/` to allow the project to build and pass type checks without requiring a live Convex connection during the initial setup.

To connect this project to a real Convex backend and make it fully functional:

1.  **Install Dependencies:**
    ```bash
    pnpm install
    ```

2.  **Initialize Convex:**
    Run the following command to log in and set up your Convex project. This will replace the mocked files with actual generated code.
    ```bash
    npx convex dev
    ```

3.  **Update Types:**
    If you make changes to the schema in `convex/schema.ts`, the `npx convex dev` command will automatically regenerate the API types in `convex/_generated/`.

## Project Structure

*   `convex/`: Contains the backend schema and functions.
    *   `schema.ts`: Database schema definition (Vehicles, Bookings, Activities).
    *   `vehicles.ts`, `bookings.ts`, etc.: Backend query and mutation functions.
*   `src/components/ConvexClientProvider.tsx`: Client-side provider for Convex.
*   `src/app/`: Next.js App Router pages (Dashboard, Vehicles, Bookings).

## Mock Data vs. Real Data

The UI components are currently set up to use `useQuery` hooks.
*   If the backend is not running or empty, the pages will show **Skeleton Loading States**.
*   Once you populate your Convex database (via the Convex Dashboard or seed scripts), the data will appear automatically.
