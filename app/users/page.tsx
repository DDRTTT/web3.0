'use client';

import { Layout, theme } from 'antd';
import UserList from './UserList';
import { useEffect, useState } from 'react';

const { Content } = Layout;

export default function UsersPage() {
  const [loading, setLoading] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    // 模拟数据加载
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Content
      style={{
        margin: '24px 16px',
        padding: 24,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        minHeight: 280,
      }}
    >
      <h1 className="text-2xl font-bold mb-6">用户管理</h1>
      <UserList />
    </Content>
  );
}
