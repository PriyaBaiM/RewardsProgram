import calculateRewards from './rewardCalculation';

const aggregateRewards = (transactions) => {
    return transactions.reduce((acc, transaction) => {
      const { customerId, name, date, price } = transaction;
      const month = new Date(date).getMonth() + 1;
      const year = new Date(date).getFullYear();
      const points = calculateRewards(price);
  
      // Monthly rewards
      const monthKey = `${customerId}-${month}-${year}`;
      if (!acc.monthly[monthKey]) {
        acc.monthly[monthKey] = { customerId, name, month, year, points: 0 };
      }
      acc.monthly[monthKey].points += points;
  
      // Total rewards
      if (!acc.total[customerId]) {
        acc.total[customerId] = { name, points: 0 };
      }
      acc.total[customerId].points += points;
  
      return acc;
    }, { monthly: {}, total: {} });
  };

  export default aggregateRewards;
  