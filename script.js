// Importing keys and functions
import {API_KEY_MEME} from "./config.js";
import {getData, showData, createGenerateMemeUrl, getMemeList ,updateSelectMemeList, postEmail} from "./function.js";

// ---- DOM Load Event Listener
document.addEventListener("DOMContentLoaded", () => {
  console.log("Loading the DOM...")

  // Getting the meme list, and adding to the selection in html
  getMemeList()

  // Event listener for the "generate Meme" button
  let generateMemeButton = document.getElementById('generate-meme-button');
  generateMemeButton.addEventListener('click',createGenerateMemeUrl)
  
  // Email Form
  const emailForm = document.querySelector('.container')

  // Adding email form event listener, and showImage() function
  emailForm.addEventListener('submit', event => {
    event.preventDefault();
    postEmail(event.target);
    })

  // Getting local db.json data and displaying in the DOM
  getData()

}) // end of DOM listener