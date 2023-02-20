const NAME_KEY = 'name';
const CITY_KEY = 'city';

export const getUserName = () => localStorage.getItem(NAME_KEY);

export const setUserName = (name) => localStorage.setItem(NAME_KEY, name);

export const getCity = () => localStorage.getItem(CITY_KEY);

export const setCity = (city) => localStorage.setItem(CITY_KEY, city);

export const deleteCity = (city) => localStorage.removeItem(CITY_KEY);
