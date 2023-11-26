import React, { useState } from "react";
import {
  CloudOutlined,
  DesktopOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
import logo from "../../assets/logo.svg";
import "../Slider/Slider.css";
import DashBoard from "../Content/Dashboard/Dashboard";
import Activity from "../Content/Activity/Activity";
import History from "../Content/History/History";

const { Sider } = Layout;

interface SliderProps {
  onChangeContent: (content: React.ReactNode) => void;
}

const Slider: React.FC<SliderProps> = ({ onChangeContent }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick = (contentKey: string) => {
    switch (contentKey) {
      case "1":
        onChangeContent(<DashBoard />);
        break;
      case "2":
        onChangeContent(<Activity />);
        break;
      case "3":
        onChangeContent(<History />);
        break;
      default:
        break;
    }
  };

  return (
    <Sider
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="logo-vertical">
        <img className="logo-image" src={logo} alt=" " />
        <span className="logo-text" hidden={collapsed}>
          Sky Keep
        </span>
      </div>

      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        onSelect={({ key }) => handleMenuClick(key)}
      >
        <Menu.Item key="1" icon={<CloudOutlined />}>
          <a>Dashboard</a>
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          <a>Activity</a>
        </Menu.Item>
        <Menu.Item key="3" icon={<HistoryOutlined />}>
          <a>History</a>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Slider;
