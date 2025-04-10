'use client';

import React from 'react';
import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { LoadingProvider } from './components/LoadingProvider';

const customTheme = {
  token: {
    colorPrimary: '#1677ff',
    borderRadius: 6,
  },
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider 
      locale={zhCN}
      theme={customTheme}
    >
      <LoadingProvider>
        {children}
      </LoadingProvider>
    </ConfigProvider>
  );
}
