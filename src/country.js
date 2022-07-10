'use strict';

const BASE_URL = 'https://restcountries.com/v3.1';
const filter = '?fields=name,capital,population,languages';

const fetchCountry = country => {
  return fetch(BASE_URL + '/name/' + reqCountry + filter).then(response => {
    if (!response.ok) {
      throw Notiflix.Notify.failure('Oops, there is no country with that name');
    }
    return response.json();
  });
};
