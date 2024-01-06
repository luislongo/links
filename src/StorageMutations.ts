export const getObjectFromItem = <T>(key: string) => {
  const value = localStorage.getItem(key);
  if (!value) return undefined;
  return JSON.parse(value) as T;
};

export const setObjectToItem = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};
