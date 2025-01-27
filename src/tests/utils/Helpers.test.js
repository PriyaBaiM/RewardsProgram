import { calculateRewards, aggregateMonthlyRewards ,aggregateTotalRewards ,getMonthName} from "../../utils/Helpers";

describe('calculateRewards', () => {
  test('calculates reward points correctly for prices over 100', () => {
    const transactions = [{ price: 150.00 }];
    const result = calculateRewards(transactions);
    expect(result[0].rewardPoints).toBe(150.00);
  });

  test('calculates reward points correctly for prices between 50 and 100', () => {
    const transactions = [{ price: 75.00 }];
    const result = calculateRewards(transactions);
    expect(result[0].rewardPoints).toBe(25.00);
  });

  test('calculates reward points as 0 for prices 50 or below', () => {
    const transactions = [{ price: 50.00 }];
    const result = calculateRewards(transactions);
    expect(result[0].rewardPoints).toBe(0.00);
  });
});

describe('aggregateMonthlyRewards', () => {
  test('aggregates rewards correctly by month and year for the last three transactions', () => {
    const transactions = [
      { customerId: '1', name: 'Alice', rewardPoints: 100.00, date: '2023-01-01' },
      { customerId: '1', name: 'Alice', rewardPoints: 50.00, date: '2023-01-15' },
      { customerId: '1', name: 'Alice', rewardPoints: 30.00, date: '2023-01-20' },
      { customerId: '1', name: 'Alice', rewardPoints: 20.00, date: '2023-01-25' },
      { customerId: '2', name: 'Bob', rewardPoints: 200.00, date: '2023-02-01' },
      { customerId: '2', name: 'Bob', rewardPoints: 150.00, date: '2023-02-10' },
      { customerId: '2', name: 'Bob', rewardPoints: 100.00, date: '2023-02-15' },
      { customerId: '2', name: 'Bob', rewardPoints: 50.00, date: '2023-02-20' },
    ];
    const result = aggregateMonthlyRewards(transactions);
    expect(result.find(r => r.customerId === 1 && r.month === 1 && r.year === 2023).points).toBe(100.00);
    expect(result.find(r => r.customerId === 2 && r.month === 2 && r.year === 2023).points).toBe(300.00);
  });
});


describe('aggregateTotalRewards', () => {
  test('aggregates total rewards correctly for recent transactions', () => {
    const transactions = [
      { customerId: '1', name: 'Alice', rewardPoints: 100, date: '2023-01-01' },
      { customerId: '1', name: 'Alice', rewardPoints: 50, date: '2023-01-15' },
      { customerId: '1', name: 'Alice', rewardPoints: 200, date: '2023-02-01' },
      { customerId: '1', name: 'Alice', rewardPoints: 300, date: '2023-03-01' },
    ];
    const result = aggregateTotalRewards(transactions);
    expect(result[0].points).toBe(550); // Sum of the last three transactions
  });
});

describe('getMonthName', () => {
  test('returns correct month name for January', () => {
    expect(getMonthName(1)).toBe('January');
  });

  test('returns correct month name for December', () => {
    expect(getMonthName(12)).toBe('December');
  });

  test('returns correct month name for a middle month', () => {
    expect(getMonthName(6)).toBe('June');
  });

  test('handles invalid month numbers gracefully', () => {
    expect(getMonthName(0)).toBe('December'); // December of the previous year
    expect(getMonthName(13)).toBe('January'); // January of the next year
  });
});

