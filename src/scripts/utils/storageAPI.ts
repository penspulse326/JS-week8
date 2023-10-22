export const setStorageItem = (key: string, value: string) =>
  window.localStorage.setItem(key, value);

export const getStorageItem = (key: string): string => {
  const value = window.localStorage.getItem(key);
  return value || "";
};

export const clearStorage = () => window.localStorage.clear();
