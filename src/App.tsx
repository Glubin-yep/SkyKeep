import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import ActivityPage from "./app/activity/page";
import DashboardPage from "./app/dashboard/page";
import HistoryPage from "./app/history/page";
import LoginPage from "./app/login/page";
import LogoutPage from "./app/logout/page";
import ProfilePage from "./app/profile/page";
import Registration from "./components/Auth/Registration/Registration";
import Error404 from "./components/ErrorPage/Error404";
import { ProtectedRoute } from "./components/protected-route";
import { ThemeProvider } from "./components/theme-provider";

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/registration" element={<Registration />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/logout" element={<LogoutPage />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
