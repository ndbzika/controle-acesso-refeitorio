import axios from '../../config/axios';

export interface ILoginService {
  login: string;
  password: string;
}

export interface ILoginServiceResponse {
  token: string;
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
      return res.data as ILoginServiceResponse;
    })
    .catch((err) => {
      return err.data;
    });
  return req;
};
