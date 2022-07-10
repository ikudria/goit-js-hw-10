import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import './css/styles.css';
import countriesList from './templates/countries-list.hbs';
import countryCard from './templates/country-card.hbs';
console.log(countriesList());

const DEBOUNCE_DELAY = 300;

// start of my script
const BASE_URL = 'https://restcountries.com/v3.1';

const infoContainer = document.querySelector('.country-info');
const list = document.querySelector('.country-list');
const searchBox = document.querySelector('#search-box');
searchBox.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY));

function onSearchInput(e) {
  const reqCountry = e.target.value.trim();
  console.log(reqCountry);

  const filter = '?fields=name,capital,population,languages,flags';

  fetch(BASE_URL + '/name/' + reqCountry + filter)
    .then(response => {
      if (!response.ok) {
        throw Notiflix.Notify.failure(
          'Oops, there is no country with that name'
        );
      }
      return response.json();
    })
    .then(countries => {
      if (countries.length > 10) {
        return Notiflix.Notify.failure(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length >= 2 && countries.length <= 10) {
        console.log(countries);
        const countryList = countries.map(country => countriesList(country));
        list.innerHTML = countryList.join('');
        console.log(countryList);
        return;
      } else if (countries.length === 1) {
        console.log(countries);

        const info = countries.map(country => countryCard(country));

        infoContainer.innerHTML = info;
      }
    })
    .catch(error => console.log(error));
}
