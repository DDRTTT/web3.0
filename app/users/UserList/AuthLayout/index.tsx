'use client';

import { Modal, Form, Input, message } from 'antd';
import { useEffect } from 'react';
import { createUser, updateUser, User } from '@/app/services/users';

interface UserModalProps {
  visible: boolean;
  user?: User | null;
  onClose: () => void;
}

export default function UserModal({ visible, user, onClose }: UserModalProps) {
  const [form] = Form.useForm();
  const isEdit = !!user;

  useEffect(() => {
    if (visible && user) {
      form.setFieldsValue(user);
    } else {
      form.resetFields();
    }
  }, [visible, user, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (isEdit) {
        await updateUser(user.id, values);
        message.success('更新成功');
      } else {
        await createUser(values);
        message.success('创建成功');
      }
      onClose();
    } catch (error) {
      message.error(isEdit ? '更新失败' : '创建失败');
    }
  };

  return (
    <Modal
      title={isEdit ? '编辑用户' : '新增用户'}
      open={visible}
      onOk={handleSubmit}
      onCancel={onClose}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="name"
          label="姓名"
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '请输入有效的邮箱地址' }
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
