import axios from 'axios';
import log from 'loglevel';

log.setLevel('info');

export const fetchData = async () => {
  try {
    log.info('Fetching data from DataTransactions.json');
    const response = await axios.get('/DataTransactions.json');
    log.info('Data fetched successfully');
    return response.data;
  } catch (error) {
    log.error('Failed to fetch data', error);
    throw new Error('Failed to fetch data');
  }
};
