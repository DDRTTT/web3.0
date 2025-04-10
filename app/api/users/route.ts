import { NextRequest, NextResponse } from 'next/server';
import { successResponse, errorResponse } from '../utils/response';

// 模拟数据库
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

// GET /api/users - 获取所有用户
export async function GET() {
  try {
    return NextResponse.json(successResponse(users));
  } catch (error) {
    return NextResponse.json(
      errorResponse('Failed to fetch users'),
      { status: 500 }
    );
  }
}

// POST /api/users - 创建新用户
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newUser = {
      id: users.length + 1,
      ...body,
    };
    users.push(newUser);
    return NextResponse.json(
      successResponse(newUser, 'User created successfully'),
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      errorResponse('Failed to create user'),
      { status: 500 }
    );
  }
}
