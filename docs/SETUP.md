# Setup Guide

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (v7 or higher)
- A [Supabase](https://supabase.com/) account and project

## Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/pirkiniu-vagonelis.git
    cd pirkiniu-vagonelis
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env` file in the root directory (you can copy `.env.example` if it exists, otherwise create it fresh):
    ```env
    VITE_SUPABASE_URL=your_project_url
    VITE_SUPABASE_ANON_KEY=your_anon_key
    ```
    Replace `your_project_url` and `your_anon_key` with values from your Supabase project settings (Project Settings > API).

## Database Setup

You will need to set up the following tables in your Supabase project. You can use the SQL Editor in the Supabase Dashboard.

### Required Tables
- `profiles`: Stores user profiles.
- `user_roles`: Stores user roles (e.g., 'admin', 'user').
- `lists`: Stores shopping lists.
- `items`: Stores shopping list items.
- `categories`: Stores item categories.

*(Note: Detailed schema definitions can be found in the `scripts/` directory or inferred from codebase usage if SQL scripts are not provided).*

## Development

Start the development server:

```bash
npm run dev
```

The application will benefit available at `http://localhost:5173`.

## building for Production

To create a production build:

```bash
npm run build
```

The output will be in the `dist/` directory.
