'use strict';

// Script for home page to handle footer year

// Footer Year
const currentYear = new Date().getFullYear();
let year = document.querySelector('.year');

year.innerText = currentYear;
