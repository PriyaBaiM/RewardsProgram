import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../screens/App';

const dataTransactions = [
  { id: 1, customerId: 1, name: 'David', date: '2023-12-15', product: 'Laptop', price: 120.2 },
  { id: 2, customerId: 1, name: 'David', date: '2024-01-20', product: 'Phone', price: 80.5 },
  { id: 3, customerId: 2, name: 'Julie', date: '2024-01-25', product: 'Tablet', price: 150.3 },
  { id: 4, customerId: 2, name: 'Julie', date: '2024-02-10', product: 'Monitor', price: 200.4 }
];

jest.mock('./data', () => ({
  fetchData: jest.fn(() => Promise.resolve(dataTransactions)),
}));
 
describe('App Component', () => {
  test('renders loading state initially', () => {
    render(<App />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
