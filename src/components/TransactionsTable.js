import React from 'react';
import PropTypes from 'prop-types';

const TransactionsTable = ({ transactions }) => (
  <div>
    <h2>Transactions</h2>
    <table>
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>Customer Name</th>
          <th>Purchase Date</th>
          <th>Product Purchased</th>
          <th>Price</th>
          <th>Reward Points</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(transaction => (
          <tr key={transaction.id}>
            <td>{transaction.id}</td>
            <td>{transaction.name}</td>
            <td>{transaction.date}</td>
            <td>{transaction.product}</td>
            <td style={{ textAlign: 'right' }}>{transaction.price.toFixed(2)}</td>
            <td style={{ textAlign: 'right' }}>{transaction.rewardPoints.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

TransactionsTable.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TransactionsTable;
