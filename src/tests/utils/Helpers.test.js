import { calculateRewards, aggregateMonthlyRewards ,aggregateTotalRewards ,getMonthName} from "../../utils/Helpers";

describe('calculateRewards', () => {
  test('calculates reward points correctly for prices over 100', () => {
    const transactions = [{ price: 150 }];
    const result = calculateRewards(transactions);
    expect(result[0].rewardPoints).toBe(150);
  });

  test('calculates reward points correctly for prices between 50 and 100', () => {
    const transactions = [{ price: 75 }];
    const result = calculateRewards(transactions);
    expect(result[0].rewardPoints).toBe(25);
  });

  test('calculates reward points as 0 for prices 50 or below', () => {
    const transactions = [{ price: 50 }];
    const result = calculateRewards(transactions);
    expect(result[0].rewardPoints).toBe(0);
  });
});

describe('aggregateMonthlyRewards', () => {
  test('aggregates rewards correctly by month and year', () => {
    const transactions = [
      { customerId: '1', name: 'Alice', rewardPoints: 100, date: '2023-01-01' },
      { customerId: '1', name: 'Alice', rewardPoints: 50, date: '2023-01-15' },
      { customerId: '2', name: 'Bob', rewardPoints: 200, date: '2023-02-01' },
    ];
    const result = aggregateMonthlyRewards(transactions);
    expect(result['1-1-2023'].points).toBe(150);
    expect(result['2-2-2023'].points).toBe(200);
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

