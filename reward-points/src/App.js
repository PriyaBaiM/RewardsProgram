import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import calculateRewards from './rewardCalculation'; 
import aggregateRewards from './totalRewardCalculation';
import dataTransactions from './data';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [monthlyRewards, setMonthlyRewards] = useState([]);
  const [totalRewards, setTotalRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (dataTransactions) {
          setTransactions(dataTransactions);
          this.log('info', 'Transactions fetched successfully');
        } else {
          throw new Error('No transactions data available');
        }
      } catch (err) {
        setError('Failed to fetch transactions');
        this.log('error', 'Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      const rewardsData = aggregateRewards(transactions);
      setMonthlyRewards(Object.values(rewardsData.monthly));
      setTotalRewards(Object.values(rewardsData.total));
      this.log('info', 'Rewards data aggregated');
    }
  }, [transactions]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Rewards Program</h1>
      <RewardsTable title="User Monthly Rewards" data={monthlyRewards} columns={['Customer ID', 'Name', 'Month', 'Year', 'Reward Points']} />
      <RewardsTable title="Total Rewards" data={totalRewards} columns={['Name', 'Reward Points']} />
      <TransactionsTable transactions={transactions} />
    </div>
  );
};

const RewardsTable = ({ title, data, columns }) => (
  <div>
    <h2>{title}</h2>
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {Object.values(row).map((val, idx) => (
              <td key={idx}>{val}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

RewardsTable.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};

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
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>{transaction.id}</td>
            <td>{transaction.name}</td>
            <td>{transaction.date}</td>
            <td>{transaction.product}</td>
            <td>{transaction.price}</td>
            <td>{calculateRewards(transaction.price)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

TransactionsTable.propTypes = {
  transactions: PropTypes.array.isRequired,
};

export default App;

