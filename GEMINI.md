# Project Overview

This is a modern full-stack web application built with **React 19**, **Convex**, and **Better Auth**. It uses **Vite** as the build tool and **TypeScript** for type safety. The project demonstrates a seamless integration between Convex (a backend-as-a-service) and Better Auth (a comprehensive authentication library) using the `@convex-dev/better-auth` integration.

## Key Technologies

- **Frontend:** React 19, Vite, TypeScript, Tailwind CSS, Lucide React, Radix UI.
- **Backend:** Convex (Serverless functions, database, and real-time synchronization).
- **Authentication:** Better Auth with `@convex-dev/better-auth` integration, supporting email/password authentication by default.
- **UI Components:** Shadcn UI (Radix UI + Tailwind).

## Architecture

- **`convex/`**: Contains the backend logic, including schema definitions, authentication configuration, and HTTP actions.
  - `convex.config.ts`: Installs the Better Auth Convex component.
  - `schema.ts`: Defines the database schema (currently a `todos` table).
  - `auth.ts`: Configures the Better Auth server-side logic and Convex adapter.
  - `http.ts`: Handles authentication-related HTTP routes.
- **`src/`**: Contains the React frontend.
  - `lib/auth-client.ts`: Configures the Better Auth client for the frontend.
  - `main.tsx`: Sets up the `ConvexBetterAuthProvider` to wrap the application.
  - `components/ui/`: Contains reusable UI components.

# Building and Running

## Prerequisites

- [Bun](https://bun.sh/) (preferred) or [Node.js](https://nodejs.org/).
- A [Convex](https://www.convex.dev/) account.

## Setup

1.  **Install dependencies:**
    ```bash
    bun install
    ```

2.  **Configure Environment Variables:**
    Create a `.env.local` file (or let Convex handle it) and ensure the following are set for the frontend:
    - `VITE_CONVEX_URL`: Your Convex deployment URL.
    - `VITE_CONVEX_SITE_URL`: Your Convex site URL (usually ends in `.convex.site`).

3.  **Start the Convex dev server:**
    ```bash
    npx convex dev
    ```

4.  **Start the Vite development server:**
    ```bash
    bun run dev
    ```

## Scripts

- `bun run dev`: Starts the Vite development server.
- `bun run build`: Builds the application for production.
- `bun run lint`: Runs ESLint for code quality checks.
- `bun run preview`: Previews the production build locally.

# Development Conventions

- **Authentication:** Use the `authClient` from `src/lib/auth-client.ts` for client-side auth operations (sign in, sign up, sign out).
- **Database Access:** Use Convex queries and mutations. The schema is defined in `convex/schema.ts`.
- **Styling:** Use Tailwind CSS utility classes. Reusable components are located in `src/components/ui`.
- **Type Safety:** Ensure all new Convex functions and frontend components are properly typed. Use `npm run build` to verify types.
- **Components:** Follow the Shadcn UI pattern for adding new components.
