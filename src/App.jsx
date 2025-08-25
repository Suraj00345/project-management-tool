import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import ProjectsPage from "./pages/ProjectsPage";
import TasksPage from "./pages/TasksPage";
import UpdateProfile from "./pages/UpdateProfile";
import AuthProvider from "./providers/AuthProvider";
import AuthGuard from "./guards/AuthGuard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          <Route
            path="/"
            element={
              <AuthGuard>
                <DashboardPage />
              </AuthGuard>
            }
          />
          <Route
            path="/my-account"
            element={
              <AuthGuard>
                <UpdateProfile />
              </AuthGuard>
            }
          />

          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:projectId" element={<TasksPage />} />

          <Route path="*" element={<>Not Found</>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
