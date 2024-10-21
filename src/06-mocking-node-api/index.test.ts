// // Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from './index';

import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockFunc = jest.fn();
    doStuffByTimeout(mockFunc, 1000);
    jest.advanceTimersByTime(1000);
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const mockFunc = jest.fn();
    doStuffByTimeout(mockFunc, 1000);
    jest.advanceTimersByTime(999);
    expect(mockFunc).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const mockFunc = jest.fn();
    doStuffByInterval(mockFunc, 1000);
    jest.advanceTimersByTime(1000);
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockFunc = jest.fn();
    doStuffByInterval(mockFunc, 1000);
    jest.advanceTimersByTime(1000 * 10);
    expect(mockFunc).toHaveBeenCalledTimes(10);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    await readFileAsynchronously('some.txt');
    expect(join).toHaveBeenCalledWith(__dirname, 'some.txt');
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);
    expect(await readFileAsynchronously('some.txt')).toBeNull();
  });

  test('should return file content if file exists', async () => {
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(Buffer.from('some content'));
    expect(await readFileAsynchronously('some.txt')).toBe('some content');
  });
});
