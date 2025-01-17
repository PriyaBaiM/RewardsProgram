const axios = require('axios');
const { fetchData } = require('../../services/ApiService');
const log = require('loglevel');

jest.mock('axios');
jest.mock('loglevel');

describe('fetchData', () => {
  test('fetches data successfully', async () => {
    const mockResponse = { data: [{ id: '1', name: 'Alice' }] };
    axios.get.mockResolvedValue(mockResponse);
    const data = await fetchData();
    expect(data).toEqual(mockResponse.data);
    expect(log.info).toHaveBeenCalledWith('Fetching data from DataTransactions.json');
    expect(log.info).toHaveBeenCalledWith('Data fetched successfully');
  });

  test('handles fetch error', async () => {
    axios.get.mockRejectedValue(new Error('Network error'));
    await expect(fetchData()).rejects.toThrow('Network error: Failed to fetch data');
    expect(log.error).toHaveBeenCalledWith('Failed to fetch data', expect.any(Error));
  });
});
