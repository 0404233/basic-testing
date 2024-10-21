// Uncomment the code below and write your tests
import { getBankAccount, InsufficientFundsError, TransferFailedError, SynchronizationFailedError } from './index';

describe('BankAccount', () => {
  const accountA = getBankAccount(100);
  const accountB = getBankAccount(300);
  test('should create account with initial balance', () => {
    expect(accountA.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => accountA.withdraw(101)).toThrow(InsufficientFundsError);
    expect(() => accountA.withdraw(101)).toThrow(
      `Insufficient funds: cannot withdraw more than ${accountA.getBalance()}`
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => accountA.withdraw(101)).toThrow(InsufficientFundsError);

    expect(() => accountA.withdraw(101)).toThrow(
      `Insufficient funds: cannot withdraw more than ${accountA.getBalance()}`
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => accountA.transfer(90, accountA)).toThrow(TransferFailedError);
    expect(() => accountA.transfer(90, accountA)).toThrow(
      'Transfer failed'
    );
  });

  test('should deposit money', () => {
    expect(accountA.deposit(10).getBalance()).toBe(110);
  });

  test('should withdraw money', () => {
    expect(accountA.withdraw(10).getBalance()).toBe(100);
  });

  test('should transfer money', () => {
    accountA.transfer(10, accountB);
    expect(accountA.getBalance()).toBe(90);
    expect(accountB.getBalance()).toBe(310);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    accountA.fetchBalance = async () => 4;
    const result = await accountA.fetchBalance();
    expect(typeof result).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    accountA.fetchBalance = async () => 400;
    await accountA.synchronizeBalance();
    expect(accountA.getBalance()).toBe(400);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    accountA.fetchBalance = async () => null;
    await expect(accountA.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);
  });
});
