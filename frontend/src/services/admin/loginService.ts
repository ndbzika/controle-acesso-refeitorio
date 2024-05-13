import axios from '../../config/axios';

export interface ILoginService {
  login: string;
  password: string;
}

export interface ILoginServiceResponse {
  token?: string;
  message?: string;
  error?: boolean | null;
}

export const loginService = async ({
  login = '',
  password = '',
}: ILoginService) => {
  const req = await axios
    .post('/auth/admin/login', {
      login,
      password,
    })
    .then((res) => {
      return {
        token: res.data.token,
        error: res.data.error,
      } as ILoginServiceResponse;
    })
    .catch((err) => {
      return {
        data: err.response,
        error: err.response.data.error,
      } as ILoginServiceResponse;
    });
  return req;
};
