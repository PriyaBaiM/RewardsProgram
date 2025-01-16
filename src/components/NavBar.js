import React from 'react';
import PropTypes from 'prop-types';

const NavBar = ({ setView }) => (
  <nav className="navbar">
    <ul>
      <li onClick={() => setView('transactions')}>Transactions</li>
      <li onClick={() => setView('monthlyRewards')}>Monthly Rewards</li>
      <li onClick={() => setView('totalRewards')}>Total Rewards</li>
    </ul>
  </nav>
);

NavBar.propTypes = {
  setView: PropTypes.func.isRequired,
};

export default NavBar;
