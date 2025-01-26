export const calculateRewards = (transactions) => {
  return transactions.map(transaction => {
    const { price } = transaction;
    let points = 0;
    if (!isNaN(price)) {
    if (price > 100) {
      points = Math.floor(2 * (price - 100) + 50);
    } else if (price > 50) {
      points = Math.floor(price - 50);
    }
  }
    return { ...transaction, rewardPoints: points };
  });
};

export const aggregateMonthlyRewards = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    const { customerId, name, rewardPoints, date } = transaction;
    const month = new Date(date).getMonth() + 1;
    const year = new Date(date).getFullYear();
    const key = `${customerId}-${month}-${year}`;

    if (!acc[key]) {
      acc[key] = { customerId, name, month, year, points: 0 };
    }
    acc[key].points += rewardPoints;

    return acc;
  }, {});
};

export const aggregateTotalRewards = (transactions) => {
  const userTransactions = transactions.reduce((acc, transaction) => {
    const { customerId } = transaction;
    if (!acc[customerId]) {
      acc[customerId] = [];
    }
    acc[customerId].push(transaction);
    return acc;
  }, {});

  const totalRewards = Object.keys(userTransactions).reduce((acc, customerId) => {
    const sortedTransactions = userTransactions[customerId].sort((a, b) => new Date(b.date) - new Date(a.date));
    const recentTransactions = sortedTransactions.slice(0, 3);

    const totalPoints = recentTransactions.reduce((total, transaction) => {
      return total + transaction.rewardPoints;
    }, 0);

    acc.push({
      customerId: parseInt(customerId, 10),
      name: recentTransactions[0].name,
      points: totalPoints
    });

    return acc;
  }, []);

  return totalRewards;
};

export const getMonthName = (monthNumber) => {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString('default', { month: 'long' });
};