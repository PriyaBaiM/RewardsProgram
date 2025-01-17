import { getMonthName } from '../../utils/DateUtils';

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
