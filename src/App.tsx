import { ConfigProvider, FloatButton, theme } from "antd";
import "./App.css";
import MainPage from "./components/MainPage/Main";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import AuthService from "./service/AuthService";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import Registration from "./components/Auth/Registration/Registration";

const Test = (email: string, password: string): void => {
  AuthService.login(email, password);
};

const App: React.FC = () => {
  return (
    <div>
      <ConfigProvider
        theme={{
          algorithm: [theme.darkAlgorithm],
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/auth/registration" element={<Registration />} />
            <Route path="/auth/login" element={<Login />} />
          </Routes>
        </BrowserRouter>

        <FloatButton
          icon={<DownloadOutlined />}
          onClick={() => Test("test@gamil.com", "12345")}
        />
      </ConfigProvider>
    </div>
  );
};
export default App;
