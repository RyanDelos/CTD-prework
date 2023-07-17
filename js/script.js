'use strict';

const contentContainer = document.querySelector('.char-content-container');
const characterResultBox = document.querySelector('.char-result-box');
const charPrevious = document.querySelector('.previous');
const homeWorld = document.querySelector('.home-world');
const charNext = document.querySelector('.next');
const overlay = document.querySelector('.overlay');
const currentYear = new Date().getFullYear();
let year = document.querySelector('.year');
let characterUrl = `https://swapi.dev/api/people/?page=1`;

// Next and previous variables
let nextCharacters;
let previousCharacters;

// Fetch Star Wars People
async function fetchCharacter() {
  overlay.style.visibility = 'visible';
  try {
    const charResponse = await fetch(characterUrl);
    if (!charResponse.ok) {
      alert('Unable to access API data');
    }
    const charResult = await charResponse.json();

    // contains next and previous page URL
    nextCharacters = charResult.next;
    previousCharacters = charResult.previous;

    let characters = charResult.results;
    let charOutput = '';

    characters.forEach((item) => {
      charOutput += ` <div class="char-result-box">
      <h2 class="character-name">${item.name}</h2>
      <p class="birth-year"><strong>Birth Year:</strong> ${item.birth_year}</p>
      <p class="height"><strong>Height:</strong> ${item.height} <span>cm</span></p>
      <p class="mass"><strong>Mass:</strong> ${item.mass} <span>kg</span></p>
      <p class="gender"><strong>Gender:</strong> ${item.gender}</p>
      <p class="hair-color"><strong>Hair Color:</strong> ${item.hair_color}</p>
      <p class="skin-color"><strong>Skin Color:</strong> ${item.skin_color}</p>
    </div>`;
    });
    overlay.style.visibility = 'hidden';
    contentContainer.innerHTML = charOutput;
  } catch (error) {
    alert('There was an error retrieving data');
    console.log(error);
  }
}

function nextChar() {
  if (nextCharacters) {
    // new URL() constructor
    characterUrl = new URL(nextCharacters);
  }
  fetchCharacter()
    .then((response) => {
      console.log(`Success`);
    })
    .catch((error) => {
      console.log(`error!`);
      console.error(error);
    });
}

function prevChar() {
  if (previousCharacters) {
    // new URL() constructor
    characterUrl = new URL(previousCharacters);
  }
  fetchCharacter()
    .then((response) => {
      console.log(`Success`);
    })
    .catch((error) => {
      console.log(`error!`);
      console.error(error);
    });
}

charPrevious.addEventListener('click', prevChar);
charNext.addEventListener('click', nextChar);

fetchCharacter();

year.innerText = currentYear;
