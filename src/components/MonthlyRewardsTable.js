import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getMonthName } from '../utils/Helpers';

const MonthlyRewardsTable = ({ monthlyRewards }) => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredRewards = selectedMonth
    ? monthlyRewards.filter(reward => getMonthName(reward.month) === selectedMonth)
    : monthlyRewards;

  const sortedRewards = filteredRewards.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  const uniqueMonths = [...new Set(monthlyRewards.map(reward => getMonthName(reward.month)))];

  return (
    <div>
      <h2>User Monthly Rewards</h2>
      <div className="filter-container">
        <label htmlFor="monthFilter">Filter by Month: </label>
        <select id="monthFilter" value={selectedMonth} onChange={handleMonthChange}>
          <option value="">All</option>
          {uniqueMonths.map((month, index) => (
            <option key={index} value={month}>{month}</option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th onClick={handleSort} style={{ cursor: 'pointer' }}>Name</th>
            <th>Month</th>
            <th>Year</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {sortedRewards.map((reward, index) => (
            <tr key={index}>
              <td>{reward.customerId}</td>
              <td>{reward.name}</td>
              <td>{getMonthName(reward.month)}</td>
              <td>{reward.year}</td>
              <td style={{ textAlign: 'right' }}>{reward.currency} {reward.points.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

MonthlyRewardsTable.propTypes = {
  monthlyRewards: PropTypes.arrayOf(PropTypes.shape({
    customerId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    month: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    points: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
  })).isRequired,
};

export default MonthlyRewardsTable;
