import calculateRewards from "./rewardCalculation";

describe('calculateRewards', () => {
    test('calculates rewards correctly for price over $100', () => {
      expect(calculateRewards(120)).toBe(90);
      expect(calculateRewards(150)).toBe(150);
    });
  
    test('calculates rewards correctly for price between $50 and $100', () => {
      expect(calculateRewards(80)).toBe(30);
      expect(calculateRewards(100)).toBe(50);
    });
  
    test('calculates rewards correctly for price below $50', () => {
      expect(calculateRewards(40)).toBe(0);
      expect(calculateRewards(50)).toBe(0);
    });
  
    test('handles fractional points correctly', () => {
      expect(calculateRewards(100.2)).toBe(50);
      expect(calculateRewards(100.4)).toBe(50);
    });
  });
  