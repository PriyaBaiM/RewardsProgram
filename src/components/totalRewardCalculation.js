import calculateRewards from '../utils/helpers';
import logger from 'react-logger'; 

const formatDate = (date) => {
  const d = new Date(date);
  return {
    month: d.getMonth() + 1,
    year: d.getFullYear(),
  };
};

const aggregateRewards = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    const { customerId, name, date, price } = transaction;
    const { month, year } = formatDate(date);
    const points = calculateRewards(price);

    // Monthly rewards
    const monthKey = `${customerId}-${month}-${year}`;
    if (!acc.monthly[monthKey]) {
      acc.monthly[monthKey] = { customerId, name, month, year, points: 0 };
    }
    acc.monthly[monthKey].points += points;
    logger.log('info', `Aggregated ${points} points for ${name} in month ${month}-${year}`);
    
    // Total rewards
    if (!acc.total[customerId]) {
      acc.total[customerId] = { name, points: 0 };
    }
    acc.total[customerId].points += points;
    logger.log('info', `Aggregated ${points} total points for ${name}`);
    
    return acc;
  }, { monthly: {}, total: {} });
};

  export default aggregateRewards;
  