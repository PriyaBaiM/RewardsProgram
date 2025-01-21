const fetch = require('node-fetch');
const { fetchData } = require('../../../utils/services/ApiService');
const log = require('loglevel');

jest.mock('node-fetch');
jest.mock('loglevel');

describe('fetchData', () => {
  beforeEach(() => {
    log.setLevel('info');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('fetches data successfully', async () => {
    const mockResponse = { data: [{ id: '1', name: 'Alice' }] };
    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const data = await fetchData();
    expect(data).toEqual(mockResponse);
    expect(log.info).toHaveBeenCalledWith('Fetching data from DataTransactions.json');
    expect(log.info).toHaveBeenCalledWith('Data fetched successfully');
  });

  test('handles server error', async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(fetchData()).rejects.toThrow('Server error: 500');
    expect(log.error).toHaveBeenCalledWith('Failed to fetch data', expect.any(Error));
  });

  test('handles network error', async () => {
    fetch.mockRejectedValue(new TypeError('Failed to fetch'));

    await expect(fetchData()).rejects.toThrow('Failed to fetch data');
    expect(log.error).toHaveBeenCalledWith('Failed to fetch data', expect.any(Error));
  });
});
