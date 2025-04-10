'use client';

import { useState, useEffect } from 'react';
import { Layout, Card, Button, Tag, Modal, Form, Input, message } from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import { useLoading } from '../components/LoadingProvider';
import { ethers } from 'ethers';
import { WalletOutlined } from '@ant-design/icons';


const { Content } = Layout;
const { confirm } = Modal;

interface WalletItem {
  id: string;
  name: string;
  address: string;
  balance: number;
  status: 'active' | 'inactive' | 'locked';
  type: 'ETH' | 'BSC' | 'Polygon';
  lastTransaction: string;
  createdAt: string;
}

// 模拟钱包数据
const mockWallets: WalletItem[] = [
  {
    id: '1',
    name: '主要钱包',
    address: '0x1234...5678',
    balance: 1.234,
    status: 'active',
    type: 'ETH',
    lastTransaction: '2024-01-20 12:34:56',
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    name: '备用钱包',
    address: '0x5678...9012',
    balance: 0.567,
    status: 'inactive',
    type: 'BSC',
    lastTransaction: '2024-01-19 15:45:30',
    createdAt: '2024-01-02',
  },
  {
    id: '3',
    name: '交易钱包',
    address: '0x9012...3456',
    balance: 2.345,
    status: 'active',
    type: 'Polygon',
    lastTransaction: '2024-01-21 09:12:45',
    createdAt: '2024-01-03',
  },
];

export default function WalletPage() {
  const { setLoading } = useLoading();
  const [wallets, setWallets] = useState<WalletItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingWallet, setEditingWallet] = useState<WalletItem | null>(null);

  const [account, setAccount] = useState<string>('');
  const [ethBalance, setEthBalance] = useState<string>('');

  const [form] = Form.useForm();

  useEffect(() => {
    setLoading(true);
    // 在useEffect后添加钱包连接逻辑（约第76行后）
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount('');
          setEthBalance('');
        }
      });
    }
    // 模拟API请求
    setTimeout(() => {
      setWallets(mockWallets);
      setLoading(false);
    }, 1000);
  }, [setLoading]);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        message.error('请安装MetaMask钱包');
        return;
      }
      
      const accounts = await window.ethereum.request<string[]>({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts && accounts.length > 0) {
        const address = accounts[0];
        setAccount(address);
        
        const provider = new ethers.BrowserProvider(window.ethereum);
        const balance = await provider.getBalance(address);
        setEthBalance(ethers.formatEther(balance));
  
        // 自动添加MetaMask钱包到列表
        const newWallet: WalletItem = {
          id: `metamask_${Date.now()}`,
          name: 'MetaMask钱包',
          address,
          balance: parseFloat(ethers.formatEther(balance)),
          status: 'active',
          type: 'ETH', 
          lastTransaction: new Date().toLocaleString(),
          createdAt: new Date().toISOString().split('T')[0],
        };
        setWallets(prev => [...prev, newWallet]);
      }
    } catch (error) {
      message.error('连接钱包失败');
    }
  };

  const handleAdd = () => {
    setEditingWallet(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: WalletItem) => {
    setEditingWallet(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record: WalletItem) => {
    confirm({
      title: '确认删除',
      icon: <ExclamationCircleOutlined />,
      content: `确定要删除钱包 "${record.name}" 吗？`,
      onOk() {
        setWallets(wallets.filter(item => item.id !== record.id));
        message.success('删除成功');
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingWallet) {
        // 编辑现有钱包
        setWallets(wallets.map(item =>
          item.id === editingWallet.id ? { ...item, ...values } : item
        ));
        message.success('更新成功');
      } else {
        // 添加新钱包
        const newWallet: WalletItem = {
          id: Date.now().toString(),
          ...values,
          status: 'active',
          lastTransaction: '-',
          createdAt: new Date().toISOString().split('T')[0],
        };
        setWallets([...wallets, newWallet]);
        message.success('添加成功');
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const columns: ProColumns<WalletItem>[] = [
    {
      title: '钱包名称',
      dataIndex: 'name',
      key: 'name',
      search: true,
    },
    {
      title: '钱包地址',
      dataIndex: 'address',
      key: 'address',
      search: true,
      render: (text) => (
        <a href={`https://etherscan.io/address/${text}`} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: '余额',
      dataIndex: 'balance',
      key: 'balance',
      sorter: (a, b) => a.balance - b.balance,
      render: (text) => `${text} ETH`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: '活跃', value: 'active' },
        { text: '不活跃', value: 'inactive' },
        { text: '锁定', value: 'locked' },
      ],
      render: (status) => {
        const statusConfig = {
          active: { color: 'success', text: '活跃' },
          inactive: { color: 'default', text: '不活跃' },
          locked: { color: 'error', text: '锁定' },
        };
        const config = statusConfig[status as keyof typeof statusConfig];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      filters: [
        { text: 'ETH', value: 'ETH' },
        { text: 'BSC', value: 'BSC' },
        { text: 'Polygon', value: 'Polygon' },
      ],
    },
    {
      title: '最后交易',
      dataIndex: 'lastTransaction',
      key: 'lastTransaction',
      sorter: (a, b) => new Date(a.lastTransaction).getTime() - new Date(b.lastTransaction).getTime(),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            删除
          </Button>
        </>
      ),
    },
  ];

  return (
    <Content style={{ margin: '24px 16px', padding: 24 }}>
      <ProTable<WalletItem>
        headerTitle="钱包管理"
        columns={columns}
        dataSource={wallets}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        toolBarRender={() => [
          <Button
            key="add"
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            添加钱包
          </Button>,
          account?(
            <Button key="connected" type="default" icon={<WalletOutlined />}>
              {`${account.slice(0, 6)}...${account.slice(-4)} | ${Number(ethBalance).toFixed(4)} ETH`}
            </Button>
          ): (
            <Button 
              key="connect"
              type="primary" 
              icon={<WalletOutlined />}
              onClick={connectWallet}
            >
              连接MetaMask
            </Button>
          )
        ]}
      />

      <Modal
        title={editingWallet ? '编辑钱包' : '添加钱包'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="钱包名称"
            rules={[{ required: true, message: '请输入钱包名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="钱包地址"
            rules={[
              { required: true, message: '请输入钱包地址' },
              { pattern: /^0x[a-fA-F0-9]{40}$/, message: '请输入有效的钱包地址' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="balance"
            label="余额"
            rules={[{ required: true, message: '请输入余额' }]}
          >
            <Input type="number" step="0.001" />
          </Form.Item>
          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '请选择类型' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  );
}
