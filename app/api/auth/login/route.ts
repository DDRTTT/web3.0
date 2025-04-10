import { NextRequest, NextResponse } from 'next/server';
import { successResponse, errorResponse } from '../../utils/response';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // 这里应该实现实际的用户验证逻辑
    if (username === 'admin' && password === 'admin123') {
      return NextResponse.json(
        successResponse({
          token: 'mock-jwt-token',
          user: {
            id: 1,
            username: 'admin',
            role: 'admin',
          },
        })
      );
    }

    return NextResponse.json(
      errorResponse('Invalid credentials'),
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      errorResponse('Internal server error'),
      { status: 500 }
    );
  }
}
