# Shopping List App

A modern, real-time collaborative shopping list application built with React and Supabase.

## Features

- **Real-time Collaboration**: Changes appear instantly across all devices.
- **Multiple Lists**: Create and manage multiple shopping lists.
- **Smart Categorization**: Organize items by categories with custom colors.
- **User Roles**: Role-based access control (Admin/User).
- **Responsive Design**: Mobile-first interface with dark mode support.

## Tech Stack

- **Frontend**: React 19, Vite
- **Backend & Database**: Supabase (PostgreSQL, Auth, Realtime)
- **Styling**: Vanilla CSS with CSS Variables (HSL)
- **State Management**: React Hooks + Supabase Realtime

## Quick Start

1.  **Clone the repository**
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Setup Environment Variables**:
    Copy `.env.example` to `.env` (create one if it doesn't exist) and add your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_project_url
    VITE_SUPABASE_ANON_KEY=your_anon_key
    ```
4.  **Run the development server**:
    ```bash
    npm run dev
    ```

## Documentation

- [Setup Guide](docs/SETUP.md) - Detailed installation and configuration instructions.
- [Architecture Overview](docs/ARCHITECTURE.md) - Project structure, state management, and database schema.
- [Contributing Guidelines](docs/CONTRIBUTING.md) - How to contribute to the project.

## License

MIT
