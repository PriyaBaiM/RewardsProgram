import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getMonthName } from '../utils/Helpers';

const MonthlyRewardsTable = ({ monthlyRewards }) => {
  const [selectedMonth, setSelectedMonth] = useState('');

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const filteredRewards = selectedMonth
    ? monthlyRewards.filter(reward => getMonthName(reward.month) === selectedMonth)
    : monthlyRewards;

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
            <th>Name</th>
            <th>Month</th>
            <th>Year</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {filteredRewards.map((reward, index) => (
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
  monthlyRewards: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MonthlyRewardsTable;
