import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import ProjectsPage from "./pages/ProjectsPage";
import TasksPage from "./pages/TasksPage";
import UpdateProfile from "./pages/UpdateProfile";
import AuthProvider from "./providers/AuthProvider";
import AuthGuard from "./guards/AuthGuard";
import HomeLayout from "./Layouts/HomeLayout";
import SidebarLayout from "./Layouts/SidebarLayout";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          <Route element={<AuthGuard />}>
            <Route element={<HomeLayout />}>
              <Route element={<SidebarLayout />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/my-account" element={<UpdateProfile />} />
                <Route path="/projects" element={<ProjectsPage />} />
              </Route>
              <Route path="/projects/:projectId" element={<TasksPage />} />
            </Route>
          </Route>

          <Route path="*" element={<>404 Not Found</>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
