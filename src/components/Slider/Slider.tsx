import {
  CloudOutlined,
  DesktopOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { Menu, Layout, MenuProps } from "antd";
import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import "../Slider/Slider.css";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export default function Slider() {
  const [collapsed, setCollapsed] = useState(false);

  const items: MenuItem[] = [
    getItem("Storage", "1", <CloudOutlined />),
    getItem("Activity", "2", <DesktopOutlined />),
    getItem("History", "3", <HistoryOutlined />),
  ];

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
        className="Menu"
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
}
