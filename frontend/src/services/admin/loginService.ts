import { handleError } from '@/helpers/ErrorHandle';
import axios from '../../config/axios';
import { AdminToken } from '@/models/Admin';
import { useNavigate } from 'react-router-dom';

export interface ILoginService {
  login: string;
  password: string;
}

export interface ILoginServiceResponse {
  token?: string;
  message?: string;
  error?: boolean | null;
}

export const loginService = async (login = '', password = '') => {
  try {
    const data = await axios.post<AdminToken>('/auth/admin/login', {
      login,
      password,
    });
    return data.data;
  } catch (error) {
    console.log('error: ', error);

    handleError(error);
  }
};
