import React, { useState } from "react";
import { Layout } from "antd";
import Slider from "../Slider/Slider";
import Dashboard from "../Content/Dashboard/Dashboard";
import './Main.css'
import { Footer } from "antd/es/layout/layout";

const { Content: AntContent } = Layout;

const Main: React.FC = () => {
  const [activeContent, setActiveContent] = useState<React.ReactNode>(<Dashboard />);

  const changeContent = (content: React.ReactNode) => {
    setActiveContent(content);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Slider onChangeContent={changeContent} />
      <AntContent className="content">
        {activeContent}
        <Footer style={{ textAlign: "center" }}>
        SkyKeep ©2023 Created by Dmytro Chyr
      </Footer>
      </AntContent>
      
    </Layout>
  );
};

export default Main;
