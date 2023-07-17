'use strict';

const contentContainer = document.querySelector('.content-container');
const overlay = document.querySelector('.overlay');
const resultBox = document.querySelector('.result-box');

const filmUrl = `https://swapi.dev/api/films/`;

async function fetchFilm() {
  overlay.style.visibility = 'visible';
  try {
    // call API
    const filmResponse = await fetch(filmUrl);
    if (!filmResponse.ok) {
      alert('Unable to access API data');
    }

    // Return API data in JSON format
    const filmResult = await filmResponse.json();

    let films = filmResult.results;

    // Declare output data
    let filmOutput = '';

    // loop through each film result array
    films.forEach((item) => {
      filmOutput += `<div class="result-box"> 
      <h2 class="film-title"> ${item.title} </h2>
      <p class="film-release"><strong>Movie Released:</strong> ${item.release_date}</p>
      <p class="film-director"><strong>Director:</strong> ${item.director}</p>
      <p class="film-producer"><strong>Producer(s):</strong> ${item.producer}</p>
      <p class="film-opening"><strong>Opening Crawl:</strong> ${item.opening_crawl}</p>
      </div>`;
    });

    overlay.style.visibility = 'hidden';
    contentContainer.innerHTML = filmOutput;
  } catch (error) {
    alert('There was an error retrieving data');
  }
}

fetchFilm();
