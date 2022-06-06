import { debounce } from '../../src/debounce';
import { jest } from '@jest/globals';

jest.useFakeTimers();

describe('Name of the group', () => {
  const callback = jest.fn();

  beforeEach(() => {
    //* Reset in case there are more test cases depending on the same mock
    callback.mockReset();
  });

  test('debounce', () => {
    const debouncedCallback = debounce(callback, 10);

    for (let i = 0; i < 20; i++) {
      debouncedCallback();
    }

    //* Should not have been called yet since 10ms is not passed
    expect(callback).not.toHaveBeenCalled();

    //* Fast forward time => 10ms will be passed
    jest.runAllTimers();

    //* Now the callback should have been called exactly once
    expect(callback).toBeCalledTimes(1);
  });
});
