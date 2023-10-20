import React from "react";
import { Layout } from "antd";
import Slider from "../Slider/Slider";
import Content from "../Content/Content";

const { Footer } = Layout;

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Slider />
      <Layout>
        <Content />
        <Footer style={{ textAlign: "center" }}>
          SkyKeep ©2023 Created by Dmytro Chyr
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
