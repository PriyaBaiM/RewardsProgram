import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TransactionsTable = ({ transactions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTransactions = filteredTransactions.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  return (
    <div>
      <h2>Transactions</h2>
      <div className="filter-container">
        <label htmlFor="searchFilter">Filter by Customer Name: </label>
        <input
          id="searchFilter"
          type="text"
          placeholder="Search by Customer Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th onClick={handleSort} style={{ cursor: 'pointer' }}>Customer Name</th>
            <th>Purchase Date</th>
            <th>Product Purchased</th>
            <th>Price</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.name}</td>
              <td>{transaction.date}</td>
              <td>{transaction.product}</td>
              <td style={{ textAlign: 'right' }}>{transaction.currency} {transaction.price.toFixed(2)}</td>
              <td style={{ textAlign: 'right' }}>{transaction.currency} {transaction.rewardPoints.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TransactionsTable.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    product: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rewardPoints: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
  })).isRequired,
};

export default TransactionsTable;
