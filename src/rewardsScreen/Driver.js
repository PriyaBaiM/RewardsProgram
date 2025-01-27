import React, { useState, useEffect } from 'react';
import { fetchData } from '../utils/services/ApiService';
import TransactionsTable from '../components/TransactionsTable';
import MonthlyRewardsTable from '../components/MonthlyRewardsTable';
import TotalRewardsTable from '../components/TotalRewardsTable';
import NavBar from '../components/NavBar';
import { calculateRewards, aggregateMonthlyRewards, aggregateTotalRewards } from '../utils/Helpers';
import '../styles/App.css';
import log from 'loglevel';

log.setLevel('info');

const Driver = () => {
  const [transactions, setTransactions] = useState([]);
  const [monthlyRewards, setMonthlyRewards] = useState([]);
  const [totalRewards, setTotalRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('transactions');

  useEffect(() => {
    const getData = async () => {
      try {
        log.info('Starting data fetch');
        const data = await fetchData();
        const transactionsWithPoints = calculateRewards(data);
        setTransactions(transactionsWithPoints);
        setMonthlyRewards(aggregateMonthlyRewards(transactionsWithPoints));
        setTotalRewards(aggregateTotalRewards(transactionsWithPoints));
        log.info('Data processed successfully');
      } catch (err) {
        log.error('Error fetching or processing data', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleNewTransaction = async (newTransaction) => {
    try {
      log.info('Adding new transaction');
      const updatedTransactions = [...transactions, newTransaction];
      const transactionsWithPoints = calculateRewards(updatedTransactions);
      setTransactions(transactionsWithPoints);
      setMonthlyRewards(aggregateMonthlyRewards(transactionsWithPoints));
      setTotalRewards(aggregateTotalRewards(transactionsWithPoints));
      log.info('New transaction added successfully');
    } catch (err) {
      log.error('Error adding new transaction', err);
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="heading">Reward Program</h1>
      <NavBar setView={setView} />
      {view === 'transactions' && <TransactionsTable transactions={transactions} />}
      {view === 'monthlyRewards' && <MonthlyRewardsTable monthlyRewards={monthlyRewards} />}
      {view === 'totalRewards' && <TotalRewardsTable totalRewards={totalRewards} />}
    </div>
  );
};

export default Driver;
