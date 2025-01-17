import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Driver from '../../rewardsScreen/Driver';
import { fetchData } from '../../services/ApiService';
import log from 'loglevel';

jest.mock('../../services/ApiService');
jest.mock('loglevel');

const mockData = [
  { id: '1', name: 'Alice', date: '2023-01-01', product: 'Product A', price: 100, rewardPoints: 10 },
  { id: '2', name: 'Bob', date: '2023-02-01', product: 'Product B', price: 200, rewardPoints: 20 },
];

describe('Driver', () => {
  beforeEach(() => {
    fetchData.mockResolvedValue(mockData);
  });

  test('renders without crashing', async () => {
    render(<Driver />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('Reward Program')).toBeInTheDocument());
  });

  test('displays error message on fetch failure', async () => {
    fetchData.mockRejectedValue(new Error('Failed to fetch data'));
    render(<Driver />);
    await waitFor(() => expect(screen.getByText((content, element) => content.startsWith('Error:') && content.includes('Failed to fetch data'))).toBeInTheDocument());
  });
});
