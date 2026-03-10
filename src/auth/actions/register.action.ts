import { tesloApi } from '@/api/tesloApi';
import type { AuthResponse } from './interfaces/auth.response';

export const registerAction = async (
  fullName: string,
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
    fullName,
    email,
    password,
  });

  return data;
};
