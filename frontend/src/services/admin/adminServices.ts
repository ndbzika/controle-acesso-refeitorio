import axios from '@/config/axios';
import { handleError } from '@/helpers/ErrorHandle';

export const PresencaService = async () => {
  try {
    return await axios.get('/presenca').then((response) => response.data);
  } catch (error) {
    handleError(error);
  }
};
