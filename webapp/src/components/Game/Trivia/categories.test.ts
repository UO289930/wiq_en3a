import { getCategoryWithNumber, getCategoryColor, getCategoryColorWithNumber } from './categories'; 

describe('Test Category Functions', () => {
  test('getCategoryWithNumber should return correct category', () => {
    expect(getCategoryWithNumber(1)).toBe('Sports');
    expect(getCategoryWithNumber(2)).toBe('Science');
  });

  test('getCategoryWithNumber should return undefined for non-existent number', () => {
    expect(getCategoryWithNumber(6)).toBeUndefined();
  });

  test('getCategoryColor should return correct color', () => {
    expect(getCategoryColor('Sports')).toBe('#1f71b3');
    expect(getCategoryColor('Science')).toBe('#61a33a');
  });

  test('getCategoryColor should return undefined for non-existent category', () => {
    expect(getCategoryColor('Math')).toBeUndefined();
  });

  test('getCategoryColorWithNumber should return correct color for a number', () => {
    expect(getCategoryColorWithNumber(1)).toBe('#1f71b3');
    expect(getCategoryColorWithNumber(2)).toBe('#61a33a');
  });

  test('getCategoryColorWithNumber should return undefined for non-existent number', () => {
    expect(getCategoryColorWithNumber(6)).toBeUndefined();
  });
});