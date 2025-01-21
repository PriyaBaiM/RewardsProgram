import React from 'react';
import PropTypes from 'prop-types';

const TotalRewardsTable = ({ totalRewards }) => (

  <div>
    <h2>Total Rewards [For last three consecutive months ]</h2>
    <table>
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Reward Points</th>
        </tr>
      </thead>
      <tbody>
        {totalRewards.map((reward, index) => (
          <tr key={index}>
            <td>{reward.name}</td>
            <td>{reward.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

TotalRewardsTable.propTypes = {
  totalRewards: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TotalRewardsTable;
