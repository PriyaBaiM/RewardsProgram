import React from 'react';
import { render, screen } from '@testing-library/react';
import TotalRewardsTable from '../../components/TotalRewardsTable';

const mockRewards = [
  { name: 'Alice', points: 100.00 },
  { name: 'Bob', points: 200.00 },
];

describe('TotalRewardsTable', () => {
  test('renders without crashing', () => {
    render(<TotalRewardsTable totalRewards={mockRewards} />);
    expect(screen.getByText('Total Rewards [For last three consecutive months]')).toBeInTheDocument();
  });

  test('displays total rewards correctly', () => {
    render(<TotalRewardsTable totalRewards={mockRewards} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('100.00')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('200.00')).toBeInTheDocument();
  });
});
