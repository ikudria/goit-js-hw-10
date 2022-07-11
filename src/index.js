import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import './css/styles.css';
import countriesList from './templates/countries-list.hbs';
import countryCard from './templates/country-card.hbs';
import { fetchCountry } from './country';

const DEBOUNCE_DELAY = 300;

const infoContainer = document.querySelector('.country-info');
const list = document.querySelector('.country-list');
const searchBox = document.querySelector('#search-box');
searchBox.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY));

function onSearchInput(e) {
  const reqCountry = e.target.value.trim();

  if (reqCountry === '') {
    list.innerHTML = '';
    infoContainer.innerHTML = '';
    return;
  }

  fetchCountry(reqCountry)
    .then(countries => {
      if (countries.length > 10) {
        return Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length >= 2 && countries.length <= 10) {
        console.log(countries);
        const countryList = countries.map(country => countriesList(country));
        list.innerHTML = countryList.join('');
        infoContainer.innerHTML = '';

        console.log(countryList);
      } else if (countries.length === 1) {
        console.log(countries);

        const info = countries.map(country => countryCard(country));

        infoContainer.innerHTML = info;
        list.innerHTML = '';
      }
    })
    .catch(error => console.log(error));
}
