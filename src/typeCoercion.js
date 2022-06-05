const item = {
  name: 'John',
  age: 30,
  /**
   * string: if is not primitive, call the valueOf
   */
  toString() {
    return `Name: ${this.name} age: ${this.age}`;
  },
  /**
   * number: if is not primitive, call the toString
   */
  valueOf() {
    return 999;
  },
};

const itemWithSymbol = {
  ...item,
  /**
   * it's called first
   * has priority over toString and valueOf
   */
  [Symbol.toPrimitive](coercionType) {
    const types = {
      string: JSON.stringify(this),
      number: 222,
    };

    return types[coercionType] || types.string;
  },
};

export { item, itemWithSymbol };
