import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TotalRewardsTable = ({ totalRewards }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredRewards = totalRewards.filter(reward =>
    reward.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedRewards = filteredRewards.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  return (
    <div>
      <h2>Total Rewards [For last three consecutive months]</h2>
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
            <th onClick={handleSort} style={{ cursor: 'pointer' }}>Customer Name</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {sortedRewards.map((reward, index) => (
            <tr key={index}>
              <td>{reward.name}</td>
              <td style={{ textAlign: 'right' }}>{reward.currency} {reward.points.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TotalRewardsTable.propTypes = {
  totalRewards: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
  })).isRequired,
};

export default TotalRewardsTable;
