import { useState } from "react";
import { FloatButton } from 'antd';
import "./App.css";
import MainPage from "./components/MainPage/Main";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <FloatButton icon= {<DownloadOutlined />} onClick={() => console.log("click")} />
      <MainPage />
    </div>
  );
}

export default App;
