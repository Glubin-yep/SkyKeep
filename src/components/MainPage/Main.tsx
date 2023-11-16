import React from "react";
import { Layout } from "antd";
import Slider from "../Slider/Slider";
import Content from "../Content/Content";

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Slider />
      <Content />
      
    </Layout>
  );
};

export default App;
