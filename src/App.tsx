import { FloatButton } from 'antd';
import "./App.css";
import MainPage from "./components/MainPage/Main";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";

function App() {
  return (
    <div>
      <FloatButton icon= {<DownloadOutlined />} onClick={() => console.log("click")} />
      <MainPage />
    </div>
  );
}

export default App;
