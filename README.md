## Getting Started

First, run graphql-codegen to generate latest graphql schema code

```bash
npm run codegen
# or
yarn codegen
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployed on Vercel

https://leonardo-taupe.vercel.app/


# Leonardo App Architecture

## Overview

This document describes the core architecture of the Leonardo app, focusing on authentication (UserAuth) and global state management using Zustand and Apollo Client for GraphQL queries.

---

## 1. User Authentication (UserAuth)

### Design

- **Provider Pattern:**

  - Authentication logic is encapsulated in a React context provider (`UserAuthProvider`).
  - The provider exposes authentication state and methods (login, logout, get/set user info) via a custom hook (`useAuth`).
  - The provider is included in the app's root providers, making auth state available throughout the app.

- **Modal UI:**

  - A singleton user modal (`UserModal`) is managed via a dialog context (using Chakra UI v3's `useDialog` and `Dialog` components).
  - The modal supports both login and profile editing modes, toggled by the app as needed.
  - The modal is opened/closed via context methods, ensuring only one instance is active at a time.

- **Auth Flow:**
  - On first visit or logout, the modal prompts for login (username and job title).
  - User info is stored in context and can be edited via the modal.
  - The `withAuth` HOC can be used to protect pages/components, redirecting unauthenticated users to the login modal.

---

## 2. State Management: Zustand + Apollo Client

### Design

- **Zustand Store:**

  - Global state is managed using Zustand, a lightweight state management library.
  - The store is defined in `src/lib/store.ts` and can be extended for any global state needs.

- **Normalized Episodes State:**

  - Episodes data from the Rick and Morty GraphQL API is stored in a normalized structure:
    - `episodesById`: All episodes keyed by their ID.
    - `episodeIdsByPage`: Maps page numbers to arrays of episode IDs.
    - `pageInfo`: Pagination info (count, pages, next, prev).
    - `loading`/`error`: For UI state.
  - This enables efficient lookups, pagination, and caching of previously fetched pages.

- **Apollo Client Integration:**

  - Apollo Client is configured in `src/lib/apollo-client.ts` and used for all GraphQL queries.
  - The Zustand store's `fetchEpisodes` action uses Apollo Client's `query` method with the generated `GetEpisodesDocument` for type safety and consistency.
  - The store normalizes and merges new data into the global state, avoiding duplication and enabling fast access.

- **Generated GraphQL Types:**
  - GraphQL Code Generator is used to generate type-safe hooks and query documents from the API schema.
  - All queries and mutations use these generated types for safety and maintainability.

---

## 3. UI Integration

- Components (e.g., `EpisodesGrid`) use the Zustand store to fetch and display paginated episode data.
- Pagination state can be synced with the URL for deep linking and navigation.
- Modals (e.g., `UserModal`, `EpisodeDetailModal`) use Chakra UI v3's Dialog system for consistent, accessible overlays.

---

## 4. Extensibility

- The architecture supports adding more global state (e.g., favorites, filters) to the Zustand store.
- Additional GraphQL queries/mutations can be integrated using the same pattern (codegen + Apollo + Zustand normalization if needed).
- The authentication system can be extended for real backends or OAuth providers as needed.

---

## Component Hierarchy Structure diagram

```
App (Root)
└─ RootProviders
   ├─ UserModal (login/profile modal)
   └─ Layout
      ├─ Header
      │  ├─ Dropdown (User Avatar)
      ├─ Main Content
      │  └─ Home Page (page.tsx)
      │     └─ HOC withAuth
      │         └─ EpisodesGrid
      │             ├─ Pagination
      │             └─ GirdItem
      |             │  └─ PreloadImage (for episode images)
      │             └─ EpisodeDetailModal
      │                └─ PreloadImage (for character images)
      └─ Footer
```

## File Structure (Relevant Parts)

```
src/
  app/
    page.tsx                # Home page, reads page param, passes to EpisodesGrid
    layout.tsx              # Root layout, includes providers
  components/
    EpisodesGrid.tsx        # Grid of episodes, paginated, uses Zustand store
    EpisodeDetailModal.tsx  # Modal for episode details (Dialog-based)
    UserModal.tsx           # Modal for user login/profile (Dialog-based)
    PreloadImage.tsx        # Image loader with fallback
  lib/
    store.ts                # Zustand store, normalized episodes state
    apollo-client.ts        # Apollo Client setup
  providers/
    UserAuthProvider.tsx    # Auth context/provider
    RootProviders.tsx       # All app-level providers
```
