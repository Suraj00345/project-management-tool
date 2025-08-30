# Organivo - Project Management Tool

Organivo is a modern project management tool designed to help teams organize, collaborate, and boost productivity. Built with React, Vite, Zustand, and Tailwind CSS, Organivo provides a seamless experience for managing projects, tasks, and team workflows.

## Features

- **User Authentication**: Secure registration, login, and email verification.
- **Dashboard**: Overview of projects, tasks, lists, and analytics.
- **Project Management**: Create, edit, archive, and delete projects with priority settings.
- **Task Boards**: Kanban-style boards with draggable lists and tasks.
- **Task Management**: Add, edit, delete, and reorder tasks within lists.
- **Responsive Design**: Fully responsive UI for desktop and mobile.
- **Profile Management**: Update profile info, password, and email.
- **Notifications**: Real-time feedback with toast notifications.
- **Modern UI**: Built with Tailwind CSS and Lucide icons.

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Lucide Icons](https://lucide.dev/)
- [Axios](https://axios-http.com/)

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/organivo-project-management-tool.git
   cd project-management-tool
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and configure the API URL and other settings.

4. **Start the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser:**
   - Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Project Structure

```
project-management-tool/
├── public/                # Static assets and icons
├── src/
│   ├── assets/            # Images and SVGs
│   ├── components/        # Reusable React components
│   ├── hooks/             # Custom React hooks
│   ├── Layouts/           # Layout components (Sidebar, Loader, etc.)
│   ├── pages/             # Page components (Dashboard, Projects, etc.)
│   ├── providers/         # Context and providers
│   ├── store/             # Zustand stores
│   ├── utils/             # Utility functions and API clients
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
├── .env                   # Environment variables
├── package.json
├── vite.config.js
└── README.md
```

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Lint code with ESLint

## License

This project is licensed under the MIT License.

---

**Organivo** — Empowering teams to organize, collaborate, and grow.
