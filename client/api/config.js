const { NEXT_PUBLIC_BACKEND_API } = process.env;

export const BASE_URL =
  NEXT_PUBLIC_BACKEND_API === 'fastapi'
    ? 'http://127.0.0.1:8000'
    : 'http://localhost:4000';
