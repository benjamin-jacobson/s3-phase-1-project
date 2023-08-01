import {API_KEY_MEME} from "./config.js";

export function getMemeList() {
  // Uses url, GET request to API with key, gets image list, calls updateSelectMemeList to update select list
  const urlImageList = 'https://ronreiter-meme-generator.p.rapidapi.com/images';
  
  fetch(urlImageList, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': API_KEY_MEME,
      "x-rapidapi-host": 'ronreiter-meme-generator.p.rapidapi.com'
    }
  })
    .then(res => res.json())
    .then(data => updateSelectMemeList(data))
}

export function updateSelectMemeList(memeObject) {
  //This function modifies the selection list, for all possible memes
    let selectList = document.getElementById("select-list")
    for (let i in memeObject) {

        // Creating elements, add to select element
        let iterationText = memeObject[i];
        let option = document.createElement("option");
        option.text = iterationText;
        option.value = iterationText;
        selectList.add(option);}
    }

export function getData() {
  // Getting json.db meme data, runs showsData
    let url = 'http://localhost:4000/memes'
    fetch(url)
    .then(res => res.json())
    .then(data =>showData(data))
  };

export function showData(data) {
  // Create DOM tiles for existing database db.json memes and their data
  // EventListener on click, does likeAction function (+1) updating data and site
  let memeBox = document.getElementById('meme-container')

  for (let item of data.slice().reverse()) {
    let newDiv = document.createElement('div')
    newDiv.classList.add("card")

    // text
    let p = document.createElement('p')
    p.innerText = item.name
    newDiv.append(p)
    // image
    let i = document.createElement('img')
    i.src = item.image //this is the url key
    i.classList.add("meme-avatar")
    newDiv.append(i)
    // text
    let p2 = document.createElement('p')
    p2.innerText = `${item.likes} likes!` // number of likes
    newDiv.append(p2)
    // Like button
    let p3 = document.createElement('button')
    p3.setAttribute('likesCount', item.likes)
    p3.id = item.id
    p3.innerText = `Like`
    p3.classList.add("button")
    p3.addEventListener("click", likeAction) // likeAction event listener on click, does likeAction function
    newDiv.append(p3)
    memeBox.append(newDiv)
  }
}

export function likeAction(e){
  // Gets current like count, and call updateLikeCount to update count via PATCH
  e.preventDefault()

  // Existing count
  let currentCount = fetch(`http://localhost:4000/memes/${e.target.id}`)
  .then(res => res.json())
  .then(data => updateLikeCount(data))
}
  
 export function updateLikeCount(e) {
    // This function updates the like count in the database db.json via PATCH
    let newData = {'likes': parseInt(`${e.likes + 1}`)}
    fetch(`http://localhost:4000/memes/${e.id}`, 
    {
      method:'PATCH',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(newData)
    })
  };

export function createGenerateMemeUrl() {
  ///This function generates the API required URL format based on the user input

  // Getting data from the Dom
  let memeSelected = document.getElementById("select-list").value
  let topText = document.getElementById('top-text-input').value
  let bottomText = document.getElementById('bottom-text-input').value
  globalThis.newMemeName = document.getElementById('new-memes-name').value // global var for access elsewhere

  // Generating the URL if sufficient user input, else alert box
  if (memeSelected === "none"|| topText === "" || bottomText === "" || newMemeName === ""){
      console.log("ALERT Initiated")
      alert("Please complete selection of meme, top text, bottom text and meme name.")
  } else {
      // Generating url for the GET request
      let url = `https://ronreiter-meme-generator.p.rapidapi.com/meme?top=${topText}&bottom=${bottomText}&meme=${memeSelected}&font_size=50&font=Impact`;
      console.log(url)

      // Running API GET Request, Adding Requested Meme to DOM, and POST request to JSON server
      fetchImage(url)
  }
}

function fetchImage(memeUrl) {
  // Uses url, GET request to API with key, returns blob, calls 1. addMemeToDom and 2. converAndPostBlob
  fetch(memeUrl, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': API_KEY_MEME,
      "x-rapidapi-host": 'ronreiter-meme-generator.p.rapidapi.com'
    }
  })
    .then(response => response.blob())
    .then(blob => {
      addMemeToDom(blob);
      convertAndPostBlob(blob);
    })}

function addMemeToDom(input){
  // Briefly shows the meme generated and adds 

  // Creates image and add to DOM for display
  const imageUrl = URL.createObjectURL(input);

  const imageElement = document.createElement("img");
  imageElement.src = imageUrl;
  console.log(imageUrl)
  const container = document.getElementById("image-container");
  container.appendChild(imageElement); // tagging to the DOM
}

function convertAndPostBlob(input) {
let out = readFile(input)
}

async function readFile(input) {

  let reader = new FileReader()
  reader.readAsDataURL(input)
  await new Promise(resolve => reader.onload = () => resolve())
  let dataUrl = reader.result
  console.log(dataUrl)  //Data URL

  let newPostData = {'name': `${newMemeName}`,
  'image': `${dataUrl}`,
  'likes': parseInt(0)}

  // Posting data to database
  postDbMemes(newPostData)
}

function postDbMemes(newPostData) {
  // Using the json.db server to POST to meme
  fetch(`http://localhost:4000/memes`, 
  {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(newPostData)
  });
}

export function postEmail(e) {
  // Using the json.db server to POST user email data
  fetch(`http://localhost:4000/emails`, 
  {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(
      {"email":e.name.value}
    )
  });
}

// Unused functions
function showImage(src, width=100, height=100, alt="blah blah",angle) {
  ```Fun show image function, currently unused ```
      let img = document.createElement("img");
      img.src = src;
      img.width = width;
      img.height = height;
      img.alt = alt;
  
      // This next line will add it to dom element
      document.getElementById("the-unstoppable-troll-container").appendChild(img);
  }