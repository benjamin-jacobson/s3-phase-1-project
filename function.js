import {API_KEY_MEME} from "./config.js";

export function getMemeList() {
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
  
    let selectList = document.getElementById("select-list")
    for (let i in memeObject) {

        let iterationText = memeObject[i];
        let option = document.createElement("option");
        option.text = iterationText;
        option.value = iterationText;
        selectList.add(option);}
    }

export function getData() {
    let url = 'http://localhost:4000/memes'
    fetch(url)
    .then(res => res.json())
    .then(data =>showData(data))
  };

export function showData(data) {

  let memeBox = document.getElementById('meme-container')

  let allData = data.slice().reverse()

  allData.forEach(createMemeTile)
  }

export function createMemeTile(item) {

  let memeBox = document.getElementById('meme-container')
      
  let newDiv = document.createElement('div')
  newDiv.classList.add("card")

  let p = document.createElement('p')
  p.innerText = item.name
  newDiv.append(p)

  let i = document.createElement('img')
  i.src = item.image //this is the url key
  i.classList.add("meme-avatar")
  newDiv.append(i)

  let p2 = document.createElement('p')
  p2.innerText = `${item.likes} likes!` // number of likes
  newDiv.append(p2)

  let p3 = document.createElement('button')
  p3.setAttribute('likesCount', item.likes)
  p3.id = item.id
  p3.innerText = `Like`
  p3.classList.add("button")
  p3.addEventListener("click", likeAction) // likeAction event listener on click, does likeAction function
  newDiv.append(p3)
  memeBox.append(newDiv)
}

export function likeAction(e){
  
  e.preventDefault()

  let currentCount = fetch(`http://localhost:4000/memes/${e.target.id}`)
  .then(res => res.json())
  .then(data => updateLikeCount(data))
}
  
 export function updateLikeCount(e) {

    let newData = {'likes': parseInt(`${e.likes + 1}`)}
    fetch(`http://localhost:4000/memes/${e.id}`, 
    {
      method:'PATCH',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(newData)
    })
  };

export function createGenerateMemeUrl() {

  let memeSelected = document.getElementById("select-list").value
  let topText = document.getElementById('top-text-input').value
  let bottomText = document.getElementById('bottom-text-input').value
  globalThis.newMemeName = document.getElementById('new-memes-name').value // global var for access elsewhere

  if (memeSelected === "none"|| topText === "" || bottomText === "" || newMemeName === ""){
      console.log("ALERT Initiated")
      alert("Please complete selection of meme, top text, bottom text and meme name.")
  } else {

      let url = `https://ronreiter-meme-generator.p.rapidapi.com/meme?top=${topText}&bottom=${bottomText}&meme=${memeSelected}&font_size=50&font=Impact`;
      console.log(url)

      fetchImage(url)
  }
}

function fetchImage(memeUrl) {
 
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

  const imageUrl = URL.createObjectURL(input);

  const imageElement = document.createElement("img");
  imageElement.src = imageUrl;
  console.log(imageUrl)
  const container = document.getElementById("image-container");
  container.appendChild(imageElement);
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

  postDbMemes(newPostData)
}

function postDbMemes(newPostData) {

  fetch(`http://localhost:4000/memes`, 
  {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(newPostData)
  });
}

export function postEmail(e) {
  console.log("test_check this change")
  return fetch(`http://localhost:4000/emails`, 
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

      let img = document.createElement("img");
      img.src = src;
      img.width = width;
      img.height = height;
      img.alt = alt;
  
      document.getElementById("the-unstoppable-troll-container").appendChild(img);
  }