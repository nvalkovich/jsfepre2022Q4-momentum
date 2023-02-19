import { getRandomNum } from './helper.js';

export const getQuotes = (quoteELement, authorElement, quotes) => {
  const random = getRandomNum(quotes.length, 0);
  quoteELement.textContent = quotes[random].quote;
  authorElement.textContent = quotes[random].author;
}
