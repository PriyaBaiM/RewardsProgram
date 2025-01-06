import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import dataTransactions from './data';

jest.mock(dataTransactions, () => ({
  transactions: [
    { id: 1, customerId: 1, name: 'David', date: '2023-12-15', product: 'Laptop', price: 120.2 },
    { id: 2, customerId: 1, name: 'David', date: '2024-01-20', product: 'Phone', price: 80.5 },
    { id: 3, customerId: 2, name: 'Julie', date: '2024-01-25', product: 'Tablet', price: 150.3 },
    { id: 4, customerId: 2, name: 'Julie', date: '2024-02-10', product: 'Monitor', price: 200.4 }
  ],
}));

describe('App', () => {
  test('renders loading state initially', () => {
    render(<App />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state on fetch failure', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.reject('API is down'));
    render(<App />);
    await waitFor(() => expect(screen.getByText('Failed to fetch transactions')).toBeInTheDocument());
  });

  test('renders tables correctly after data fetch', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText('Rewards Program')).toBeInTheDocument());

    // Check User Monthly Rewards table
    expect(screen.getByText('User Monthly Rewards')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();

    // Check Total Rewards table
    expect(screen.getByText('Total Rewards')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();

    // Check Transactions table
    expect(screen.getByText('Transactions')).toBeInTheDocument();
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('Tablet')).toBeInTheDocument();
    expect(screen.getByText('Monitor')).toBeInTheDocument();
  });
});

