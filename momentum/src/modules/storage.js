const NAME_KEY = 'name';

export const getUserName = () => localStorage.getItem(NAME_KEY);

export const setUserName = (name) => localStorage.setItem(NAME_KEY, name);
