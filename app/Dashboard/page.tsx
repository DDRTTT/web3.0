'use client';

import { Card, Row, Col, Statistic,theme,Layout} from 'antd';
import {
  UserOutlined,
  WalletOutlined,
  SwapOutlined,
  LineChartOutlined,
} from '@ant-design/icons';
const { Content } = Layout;
const Dashboard = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
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
    <h1 className="text-2xl font-bold mb-6">仪表盘</h1>
    {/* 统计卡片 */}
    <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="总用户数"
              value={1234}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="总资产"
              value={8846}
              prefix={<WalletOutlined />}
              valueStyle={{ color: '#cf1322' }}
              suffix="ETH"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="今日交易"
              value={93}
              prefix={<SwapOutlined />}
              valueStyle={{ color: '#1677ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="增长率"
              value={13.5}
              prefix={<LineChartOutlined />}
              valueStyle={{ color: '#52c41a' }}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      {/* 活动日志 */}
      <Row gutter={[16, 16]} className="mt-6">
        <Col span={24}>
          <Card 
            title="最近活动" 
            bordered={false}
            className="shadow-sm"
          >
            <ul className="space-y-4">
              <li className="flex items-center justify-between border-b pb-2">
                <span>用户 John Doe 完成了钱包认证</span>
                <span className="text-gray-500">2分钟前</span>
              </li>
              <li className="flex items-center justify-between border-b pb-2">
                <span>新增 ETH 转账交易 #12345</span>
                <span className="text-gray-500">15分钟前</span>
              </li>
              <li className="flex items-center justify-between border-b pb-2">
                <span>系统自动完成日终结算</span>
                <span className="text-gray-500">1小时前</span>
              </li>
              <li className="flex items-center justify-between">
                <span>新用户 Alice 完成注册</span>
                <span className="text-gray-500">2小时前</span>
              </li>
            </ul>
          </Card>
        </Col>
      </Row>
  </Content>
  );
};

export default Dashboard;
