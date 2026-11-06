import { setSessionItem, getSessionItem, removeSessionItem, clearSessionStorage } from '../src/sessionStorage';

describe('sessionStorage utilities', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  test('should set and get item', () => {
    setSessionItem('testKey', { a: 1 });
    expect(getSessionItem('testKey')).toEqual({ a: 1 });
  });

  test('should remove item', () => {
    setSessionItem('testKey', 'value');
    removeSessionItem('testKey');
    expect(getSessionItem('testKey')).toBeNull();
  });

  test('should clear storage', () => {
    setSessionItem('k1', 'v1');
    clearSessionStorage();
    expect(getSessionItem('k1')).toBeNull();
  });
});
