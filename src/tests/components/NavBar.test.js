import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from '../../components/NavBar';

describe('NavBar', () => {
  test('renders without crashing', () => {
    render(<NavBar setView={jest.fn()} />);
    expect(screen.getByText('Transactions')).toBeInTheDocument();
  });

  test('calls setView with correct argument on click', () => {
    const setView = jest.fn();
    render(<NavBar setView={setView} />);
    fireEvent.click(screen.getByText('Monthly Rewards'));
    expect(setView).toHaveBeenCalledWith('monthlyRewards');
  });
});
