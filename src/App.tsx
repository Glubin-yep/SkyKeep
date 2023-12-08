import { ConfigProvider, theme } from "antd";
import "./App.css";
import MainPage from "./components/MainPage/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import Registration from "./components/Auth/Registration/Registration";
import Error404 from "./components/ErrorPage/Error404";

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
            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </div>
  );
};
export default App;
