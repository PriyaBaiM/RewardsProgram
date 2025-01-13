import aggregateRewards from "./totalRewardCalculation";

describe('aggregateRewards', () => {
    const transactions = [
      { id: 1, customerId: 1, name: 'John Doe', date: '2023-12-15', price: 120 },
      { id: 2, customerId: 1, name: 'John Doe', date: '2024-01-20', price: 80 },
      { id: 3, customerId: 2, name: 'Jane Smith', date: '2024-01-25', price: 150 },
      { id: 4, customerId: 2, name: 'Jane Smith', date: '2024-02-10', price: 200 },
    ];
  
    test('aggregates rewards correctly by month and year', () => {
      const result = aggregateRewards(transactions);
      expect(result.monthly['1-12-2023'].points).toBe(90);
      expect(result.monthly['1-1-2024'].points).toBe(30);
      expect(result.monthly['2-1-2024'].points).toBe(150);
      expect(result.monthly['2-2-2024'].points).toBe(250);
    });
  
    test('aggregates total rewards correctly', () => {
      const result = aggregateRewards(transactions);
      expect(result.total[1].points).toBe(120);
      expect(result.total[2].points).toBe(400);
    });
  });
  
  