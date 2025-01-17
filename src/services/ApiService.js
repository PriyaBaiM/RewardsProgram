const fetch = require('node-fetch');
const log = require('loglevel');

log.setLevel('info');

const fetchData = async () => {
  try {
    log.info('Fetching data from DataTransactions.json');
    const response = await fetch('/DataTransactions.json');
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    const data = await response.json();
    log.info('Data fetched successfully');
    return data;
  } catch (error) {
    log.error('Failed to fetch data', error);
    if (error.message.startsWith('Server error:')) {
      throw error;
    } else {
      throw new Error('Failed to fetch data');
    }
  }
};

module.exports = { fetchData };
