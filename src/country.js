'use strict';
import Notiflix from 'notiflix';

const BASE_URL = 'https://restcountries.com/v3.1';
const filter = '?fields=name,capital,population,languages,flags';

export const fetchCountry = country => {
  return fetch(BASE_URL + '/name/' + country + filter).then(response => {
    if (!response.ok) {
      console.log('error');
      throw Notiflix.Notify.failure('Oops, there is no country with that name');
    }
    return response.json();
  });
};
