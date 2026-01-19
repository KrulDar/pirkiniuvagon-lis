# Architecture Overview

## Project Structure

```
src/
├── components/     # React components (UI and Feature logic)
├── hooks/          # Custom React hooks (Data fetching, State)
├── lib/            # Utilities and external client initializations (Supabase)
├── scripts/        # Helper scripts (e.g., RLS testing)
├── App.jsx         # Main application entry point and routing logic
├── main.jsx        # React DOM rendering
└── index.css       # Global styles and Design System variables
```

## Tech Stack

- **React 19**: UI Library.
- **Vite**: Build tool and dev server.
- **Supabase**: Backend-as-a-Service providing:
    - **PostgreSQL**: Database.
    - **Auth**: User authentication.
    - **Realtime**: WebSocket subscriptions for instant updates.
    - **Internationalization (i18n)**: Multi-language support via `i18next`.

## State Management

The application uses a combination of React's `useState` & `useEffect` hooks along with **Supabase Realtime** subscriptions.

- **Global Data**: The `useAppData` hook (`src/hooks/useAppData.js`) fetches the user profile, role, and available lists on load.
- **Real-time**: Feature components (like `ShoppingList`) likely subscribe to database changes to update the UI instantly without manual refreshes.

## Design System

Styles are defined in `src/index.css` using **CSS Variables**.

- **Theming**: Supports Light and Dark modes via `data-theme` attribute and `prefers-color-scheme` media query.
- **Colors**: Uses HSL color values for dynamic adjustments (e.g., `--color-primary: 216 98% 52%`).
- **Responsive**: Mobile-first media queries ensure usability on phones and tablets.

## Database Schema (High Level)

- **profiles**: Linked to `auth.users`.
- **lists**: Container for items.
- **items**: Individual shopping entries.
- **categories**: grouping for items.
- **user_roles**: Managing permissions.

> [!NOTE]
> Database access is secured using PostgreSQL Row Level Security (RLS) policies.
