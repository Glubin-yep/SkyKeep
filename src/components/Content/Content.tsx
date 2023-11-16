import { Layout } from "antd";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Activity from "./Activity/Activity";
import History from "./History/History";
import './Content.css'

const { Content } = Layout;
const { Footer } = Layout;


function ContentLayout() {
 
  return (
    <Content className="content">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
      <Footer style={{ textAlign: "center" }}>
        SkyKeep ©2023 Created by Dmytro Chyr
      </Footer>
    </Content>
    
  );
}

export default ContentLayout;
