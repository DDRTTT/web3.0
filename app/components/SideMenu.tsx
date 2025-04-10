'use client';

import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  WalletOutlined,
  RobotOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';

const { Sider } = Layout;

const menuItems = [
  {
    key: '/',
    icon: <DashboardOutlined />,
    label: '仪表盘',
  },
  {
    key: '/users',
    icon: <UserOutlined />,
    label: '用户管理',
  },
  {
    key: '/wallet',
    icon: <WalletOutlined />,
    label: '钱包管理',
  },
  {
    key: '/Ai',
    icon: <RobotOutlined />,
    label: '人工智能',
  },
];

const SideMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleMenuClick = (key: string) => {
    router.push(key);
  };

  return (
    <Sider 
      collapsible 
      collapsed={collapsed} 
      onCollapse={(value) => setCollapsed(value)}
      theme="light"

    >
      <div style={{ 
        height: '64px', 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: collapsed ? '14px' : '18px',
        fontWeight: 'bold',
        color: '#1677ff',
      }}>
        {collapsed ? 'W3' : 'Web3 Admin'}
      </div>
      <Menu
        theme="light"
        selectedKeys={[pathname]}
        mode="inline"
        items={menuItems}
        onClick={({ key }) => handleMenuClick(key)}
      />
    </Sider>
  );
};

export default SideMenu;
