import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MonthlyRewardsTable from '../../components/MonthlyRewardsTable';
import { getMonthName } from '../../utils/Helpers';

jest.mock('../../utils/Helpers', () => ({
  getMonthName: jest.fn(),
}));

const mockRewards = [
  { customerId: '1', name: 'Alice', month: 1, year: 2023, points: 100.00 },
  { customerId: '2', name: 'Bob', month: 2, year: 2023, points: 200.00 },
];

describe('MonthlyRewardsTable', () => {
  beforeEach(() => {
    getMonthName.mockImplementation((month) => ['January', 'February'][month - 1]);
  });

  test('renders without crashing', () => {
    render(<MonthlyRewardsTable monthlyRewards={mockRewards} />);
    expect(screen.getByText('User Monthly Rewards')).toBeInTheDocument();
  });

  test('filters rewards by selected month', () => {
    render(<MonthlyRewardsTable monthlyRewards={mockRewards} />);
    fireEvent.change(screen.getByLabelText('Filter by Month:'), { target: { value: 'January' } });
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.queryByText('Bob')).not.toBeInTheDocument();
  });
});
