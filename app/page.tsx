'use client';

import { Layout, Typography, Card, Row, Col, Statistic, Button } from 'antd';
import { 
  DashboardOutlined, 
  UserOutlined, 
  WalletOutlined,
  ArrowUpOutlined,
  TransactionOutlined,
  TeamOutlined,
  DollarOutlined
} from '@ant-design/icons';
import { useEffect } from 'react';
import { useLoading } from './components/LoadingProvider';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export default function HomePage() {
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
      setLoading(false);
    };
  }, [setLoading]);

  // 栈 有效括号闭合
  function isValid() {
    let s = '{{}[]{}{}[][]}';
    if (s.length % 2) { // s 长度必须是偶数
        return false;
    }
    const mp = {')': '(', ']': '[', '}': '{'};
    const st: string[] = [];
    for (const c of s) {
        if (!mp.hasOwnProperty(c)) { // c 是左括号
            st.push(c); // 入栈
        }
        if (st.length === 0 || st.pop() !== mp[c]) { // c 是右括号
          console.log(false);
          return false; // 没有左括号，或者左括号类型不对
        }
    }
    console.log(st.length === 0);
    return st.length === 0; // 所有左括号必须匹配完毕
  };

  // 合并两个有序链表
  function mergeTwoLists(l1, l2) {
    if(l1 === null){
        return l2;
    }
    if(l2 === null){
        return l1;
    }
    if(l1.val < l2.val){
        l1.next = mergeTwoLists(l1.next, l2);
        return l1;
    }else{
        l2.next = mergeTwoLists(l1, l2.next);
        return l2;
    }
  };



  // 数组扁平化
  function flatten() {  
    let array = [1, [2, [3, [4, 5]], 6], [7, [8, 9]]];  
    const result:any[] = [];  
    function recursiveFlatten(element) {  
        if (Array.isArray(element)) {  
            element.forEach(item => {  
                recursiveFlatten(item);  
            });  
        } else {  
            result.push(element);  
        }  
    }  
    array.forEach(element => {  
        recursiveFlatten(element);  
    });  
    return result;  
}  

  function handleClick() {
    isValid()
  }

  return (
    <Content
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
        background: '#f5f5f5',
      }}
    >
      {/* 欢迎区域 */}
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>欢迎使用 Web3 管理系统</Title>
        <Paragraph>一站式 Web3 应用管理解决方案</Paragraph>
        <Button onClick={()=>{handleClick()}}>123123123</Button>
      </div>

      {/* 统计数据卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} hoverable>
            <Statistic
              title="总用户数"
              value={11280}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1677ff' }}
            />
            <div style={{ marginTop: 8, color: '#52c41a' }}>
              <ArrowUpOutlined /> 较昨日增长 12%
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} hoverable>
            <Statistic
              title="今日交易"
              value={1893}
              prefix={<TransactionOutlined />}
              valueStyle={{ color: '#1677ff' }}
            />
            <div style={{ marginTop: 8, color: '#52c41a' }}>
              <ArrowUpOutlined /> 较昨日增长 8%
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} hoverable>
            <Statistic
              title="活跃钱包"
              value={3256}
              prefix={<WalletOutlined />}
              valueStyle={{ color: '#1677ff' }}
            />
            <div style={{ marginTop: 8, color: '#52c41a' }}>
              <ArrowUpOutlined /> 较昨日增长 15%
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} hoverable>
            <Statistic
              title="总交易额"
              value={8934562}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#1677ff' }}
              precision={2}
            />
            <div style={{ marginTop: 8, color: '#52c41a' }}>
              <ArrowUpOutlined /> 较昨日增长 5%
            </div>
          </Card>
        </Col>
      </Row>

      {/* 功能区域卡片 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card 
            hoverable 
            style={{ height: '100%' }}
            actions={[
              <span key="explore">探索更多</span>
            ]}
          >
            <Card.Meta
              avatar={<DashboardOutlined style={{ fontSize: '24px', color: '#1677ff' }} />}
              title="数据分析"
              description="实时监控和分析系统数据，直观展示关键指标，帮助您做出明智决策。"
            />
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card 
            hoverable 
            style={{ height: '100%' }}
            actions={[
              <span key="manage">管理用户</span>
            ]}
          >
            <Card.Meta
              avatar={<UserOutlined style={{ fontSize: '24px', color: '#1677ff' }} />}
              title="用户管理"
              description="高效管理用户账户，监控用户活动和状态，确保系统安全运行。"
            />
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card 
            hoverable 
            style={{ height: '100%' }}
            actions={[
              <span key="wallet">查看钱包</span>
            ]}
          >
            <Card.Meta
              avatar={<WalletOutlined style={{ fontSize: '24px', color: '#1677ff' }} />}
              title="钱包集成"
              description="支持多种主流钱包，安全管理数字资产，提供完整的交易记录。"
            />
          </Card>
        </Col>
      </Row>

      {/* 底部信息 */}
      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <Paragraph type="secondary">
          基于 Next.js 和 Ant Design 构建的现代化 Web3 管理系统
        </Paragraph>
      </div>
    </Content>
  );
}
