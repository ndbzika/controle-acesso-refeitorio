import axios from '@/config/axios';
import { handleError } from '@/helpers/ErrorHandle';

export const PresencaService = async () => {
  try {
    return await axios.get('/presenca').then((response) => response.data);
  } catch (error) {
    handleError(error);
  }
};

export const RelatoriosService = (dataInicio: string, dataFim: string) => {
  try {
    return axios
      .get('/relatorios', {
        params: {
          dataInicio,
          dataFim,
        },
      })
      .then((res) => {
        return res.data;
      });
  } catch (error) {
    handleError(error);
  }
};
