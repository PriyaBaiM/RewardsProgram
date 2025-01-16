import React from 'react';
import PropTypes from 'prop-types';

const MonthlyRewardsTable = ({ monthlyRewards }) => (
  <div>
    <h2>User Monthly Rewards</h2>
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
        {monthlyRewards.map((reward, index) => (
          <tr key={index}>
            <td>{reward.customerId}</td>
            <td>{reward.name}</td>
            <td>{reward.month}</td>
            <td>{reward.year}</td>
            <td>{reward.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

MonthlyRewardsTable.propTypes = {
  monthlyRewards: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MonthlyRewardsTable;
