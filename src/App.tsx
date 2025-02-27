import { ConfigProvider, theme } from "antd";
import "./App.css";
import MainPage from "./components/MainPage/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./app/login/page";
import Registration from "./components/Auth/Registration/Registration";
import Error404 from "./components/ErrorPage/Error404";
import { ThemeProvider } from "./components/theme-provider";
import DashboardPage from "./app/dashboard/page";

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/auth/registration" element={<Registration />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
export default App;
