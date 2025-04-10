interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  code?: number;
}

export const successResponse = <T>(data: T, message = 'Success'): ApiResponse<T> => ({
  success: true,
  data,
  message,
  code: 200,
});

export const errorResponse = (message: string, code = 400): ApiResponse => ({
  success: false,
  message,
  code,
});
