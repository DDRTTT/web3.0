'use client';

import { Layout, Card, Input, Button, List, Avatar, Typography } from 'antd';
import { SendOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useX } from '../components/XProvider';

const { Content } = Layout;
const { TextArea } = Input;
const { Title } = Typography;

export default function AiPage() {
  const { messages, isTyping, addMessage, setIsTyping } = useX();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // 只在消息列表为空时添加欢迎消息
    if (messages.length === 0) {
      addMessage({
        type: 'ai',
        content: '你好！我是 AI 助手，有什么我可以帮你的吗？',
      });
    }
  }, [addMessage, messages.length]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // 添加用户消息
    addMessage({
      type: 'user',
      content: inputValue.trim(),
    });
    setInputValue('');
    setIsTyping(true);

    // 模拟 AI 响应
    setTimeout(() => {
      addMessage({
        type: 'ai',
        content: '这是一个模拟的 AI 响应。在实际应用中，这里将连接到真实的 AI 服务。',
      });
      setIsTyping(false);
    }, 1000);
  };

  return (
    <Content
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
      }}
    >
      <Title level={2} style={{ marginBottom: '20px' }}>AI 助手</Title>
      
      <Card
        style={{
          height: 'calc(100vh - 200px)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          height: '100%' 
        }}>
          {/* 消息列表区域 */}
          <div style={{ 
            flex: 1, 
            overflowY: 'auto', 
            marginBottom: '20px',
            padding: '10px'
          }}>
            <List
              itemLayout="horizontal"
              dataSource={messages}
              renderItem={(message) => (
                <List.Item style={{
                  justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                  border: 'none'
                }}>
                  <div style={{
                    maxWidth: '70%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: message.type === 'user' ? 'row-reverse' : 'row',
                    gap: '10px'
                  }}>
                    <Avatar
                      icon={message.type === 'user' ? <UserOutlined /> : <RobotOutlined />}
                      style={{
                        backgroundColor: message.type === 'user' ? '#1677ff' : '#52c41a'
                      }}
                    />
                    <div style={{
                      background: message.type === 'user' ? '#1677ff' : '#f0f2f5',
                      padding: '10px 15px',
                      borderRadius: '8px',
                      color: message.type === 'user' ? '#fff' : 'rgba(0, 0, 0, 0.85)'
                    }}>
                      {message.content}
                    </div>
                  </div>
                </List.Item>
              )}
            />
            {isTyping && (
              <div style={{ padding: '10px', color: '#888' }}>
                AI 正在输入...
              </div>
            )}
          </div>

          {/* 输入区域 */}
          <div style={{ 
            display: 'flex', 
            gap: '10px',
            padding: '10px',
            borderTop: '1px solid #f0f0f0'
          }}>
            <TextArea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="输入你的问题..."
              autoSize={{ minRows: 1, maxRows: 4 }}
              onPressEnter={(e) => {
                if (!e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSend}
              style={{ height: 'auto' }}
            >
              发送
            </Button>
          </div>
        </div>
      </Card>
    </Content>
  );
}
