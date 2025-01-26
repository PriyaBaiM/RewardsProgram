import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionsTable from '../../components/TransactionsTable';

const mockTransactions = [
  { id: '1', name: 'Alice', date: '2023-01-01', product: 'Product A', price: 100.00, rewardPoints: 10.00 },
  { id: '2', name: 'Bob', date: '2023-02-01', product: 'Product B', price: 200.00, rewardPoints: 20.00 },
];

describe('TransactionsTable', () => {
  test('renders without crashing', () => {
    render(<TransactionsTable transactions={mockTransactions} />);
    expect(screen.getByText('Transactions')).toBeInTheDocument();
  });

  test('displays transactions correctly', () => {
    render(<TransactionsTable transactions={mockTransactions} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Product A')).toBeInTheDocument();
    expect(screen.getByText('10.00')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Product B')).toBeInTheDocument();
    expect(screen.getByText('20.00')).toBeInTheDocument();
  });
});
