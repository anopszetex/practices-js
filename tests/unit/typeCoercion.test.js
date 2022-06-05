import { item, itemWithSymbol } from '../../src/typeCoercion';

describe('type coercion', () => {
  test('toString', () => {
    expect(String(item)).toBe('Name: John age: 30');
  });

  test('valueOf', () => {
    expect(Number(item)).toBe(999);
  });

  describe('Symbol.toPrimitive', () => {
    test('should convert to string', () => {
      expect(String(itemWithSymbol)).toBe('{"name":"John","age":30}');
    });

    test('should convert to number', () => {
      expect(Number(itemWithSymbol)).toBe(222);
    });

    test('call the convert default', () => {
      expect(itemWithSymbol + 0 + '_any').toBe('{"name":"John","age":30}0_any');
    });

    test('is valid string', () => {
      expect(!!itemWithSymbol).toBe(true);
    });

    test('implicit + explicit coercion using (==)', () => {
      expect(itemWithSymbol == String(itemWithSymbol)).toBe(true);
    });
  });
});
