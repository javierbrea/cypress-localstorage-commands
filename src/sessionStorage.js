export const setSessionItem = (key, value) => {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to sessionStorage', error);
  }
};

export const getSessionItem = (key) => {
  try {
    const item = window.sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error reading from sessionStorage', error);
    return null;
  }
};

export const removeSessionItem = (key) => {
  window.sessionStorage.removeItem(key);
};

export const clearSessionStorage = () => {
  window.sessionStorage.clear();
};
