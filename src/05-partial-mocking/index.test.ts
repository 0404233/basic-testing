// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule = jest.requireActual<typeof import('./index')>('./index');

  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();

    expect(mockOne).toHaveBeenCalled();
    expect(mockTwo).toHaveBeenCalled();
    expect(mockThree).toHaveBeenCalled();

    const mockConsole = jest.spyOn(console, 'log');
    expect(mockConsole).not.toHaveBeenCalledWith('foo');
    expect(mockConsole).not.toHaveBeenCalledWith('bar');
    expect(mockConsole).not.toHaveBeenCalledWith('baz');
    mockConsole.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    const mockConsole = jest.spyOn(console, 'log');

    unmockedFunction();

    expect(mockConsole).toHaveBeenCalledWith('I am not mocked');
    mockConsole.mockRestore();
  });
});
