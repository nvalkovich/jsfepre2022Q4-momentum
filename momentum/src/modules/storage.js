const NAME_KEY = 'name';
const CITY_KEY = 'city';
const IMG_SRC_KEY = 'source';

export const getUserName = () => localStorage.getItem(NAME_KEY);

export const setUserName = (name) => localStorage.setItem(NAME_KEY, name);

export const getCity = () => localStorage.getItem(CITY_KEY);

export const setCity = (city) => localStorage.setItem(CITY_KEY, city);

export const deleteCity = (city) => localStorage.removeItem(CITY_KEY);

export const setImageSource = (source) => localStorage.setItem(IMG_SRC_KEY, source);

export const getImageSource = () => localStorage.getItem(IMG_SRC_KEY) ?? 'gitHub';

