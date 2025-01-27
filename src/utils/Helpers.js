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
  const userMonthlyTransactions = transactions.reduce((acc, transaction) => {
    const { customerId, date } = transaction;
    const transactionDate = new Date(date);
    if (isNaN(transactionDate)) {
      console.error(`Invalid date: ${date}`);
      return acc;
    }
    const month = transactionDate.getMonth() + 1;
    const year = transactionDate.getFullYear();
    const key = `${customerId}-${month}-${year}`;

    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(transaction);

    return acc;
  }, {});

  const monthlyRewards = Object.keys(userMonthlyTransactions).map(key => {
    const transactions = userMonthlyTransactions[key];
    const sortedTransactions = transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    const recentTransactions = sortedTransactions.slice(0, 3);

    const totalPoints = recentTransactions.reduce((total, transaction) => {
      return total + transaction.rewardPoints;
    }, 0);

    const [customerId, month, year] = key.split('-');
    return {
      customerId: parseInt(customerId, 10),
      name: recentTransactions[0].name,
      month: parseInt(month, 10),
      year: parseInt(year, 10),
      currency: recentTransactions[0].currency,
      points: totalPoints
    };
  });

  return monthlyRewards;
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
      points: totalPoints,
      currency:recentTransactions[0].currency
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