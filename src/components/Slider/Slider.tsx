import {
  CloudOutlined,
  DesktopOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
import { useState } from "react";
import logo from "../../assets/logo.svg";
import "../Slider/Slider.css";

const { Sider } = Layout;

export default function Slider() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
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
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        selectedKeys={["1"]}
      >
        <Menu.Item key="1" icon={<CloudOutlined />}>
          <a href="/">DashBoard</a>
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          <a href="/activity">Activity</a>
        </Menu.Item>
        <Menu.Item key="3" icon={<HistoryOutlined />}>
          <a href="/history">History</a>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
