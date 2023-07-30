import {API_KEY_MEME} from "./config.js";
import {testFunction, getData} from "./function.js";
testFunction()
console.log("I ran third")
console.log(API_KEY_MEME)
// Initial Data to avoid API calls in development
let memeList = ['10-Guy', '1950s-Middle-Finger', '1990s-First-World-Problems', '1st-World-Canadian-Problems', '2nd-Term-Obama', 'Aaaaand-Its-Gone', 'Ace-Primo', 'Actual-Advice-Mallard', 'Adalia-Rose', 'Admiral-Ackbar-Relationship-Expert', 'Advice-Dog', 'Advice-Doge', 'Advice-God', 'Advice-Peeta', 'Advice-Tam', 'Advice-Yoda', 'Afraid-To-Ask-Andy', 'Afraid-To-Ask-Andy-Closeup', 'Aint-Nobody-Got-Time-For-That', 'Alan-Greenspan', 'Alarm-Clock', 'Albert-Cagestein', 'Albert-Einstein-1', 'Alien-Meeting-Suggestion', 'Alright-Gentlemen-We-Need-A-New-Idea', 'Always-Has-Been', 'Alyssa-Silent-Hill', 'Am-I-The-Only-One-Around-Here', 'American-Chopper-Argument', 'Ancient-Aliens', 'And-everybody-loses-their-minds', 'And-then-I-said-Obama', 'Angry-Asian', 'Angry-Baby', 'Angry-Birds-Pig', 'Angry-Bride', 'Angry-Chef-Gordon-Ramsay', 'Angry-Chicken-Boss', 'Angry-Dumbledore', 'Angry-Koala', 'Angry-Rant-Randy', 'Angry-Toddler', 'Annoying-Childhood-Friend', 'Annoying-Facebook-Girl', 'Anri-Stares', 'Anti-Joke-Chicken', 'Apathetic-Xbox-Laser', 'Archer', 'Are-Your-Parents-Brother-And-Sister', 'Are-you-a-Wizard', 'Arrogant-Rich-Man', 'Art-Attack', 'Art-Student-Owl', 'Arthur-Fist', 'Asshole-Ref', 'Aunt-Carol', 'Austin-Powers-Honestly', 'Aw-Yeah-Rage-Face', 'Awkward-Moment-Sealion', 'Awkward-Olympics', 'BANE-AND-BRUCE', 'BM-Employees', 'Babushkas-On-Facebook', 'Baby-Cry', 'Baby-Godfather', 'Baby-Insanity-Wolf', 'Back-In-My-Day', 'Bad-Advice-Cat', 'Bad-Joke-Eel', 'Bad-Luck-Bear', 'Bad-Luck-Brian', 'Bad-Luck-Hannah', 'Bad-Pun-Anna-Kendrick', 'Bad-Pun-Dog', 'Bad-Wife-Worse-Mom', 'Bah-Humbug', 'Bane', 'Bane-Permission', 'Barack-And-Kumar-2013', 'Barba', 'Barbosa-And-Sparrow', 'Barney-Stinson-Win', 'Baromney', 'Baron-Creater', 'Bart-Simpson-Peeking', 'Batman-And-Superman', 'Batman-Slapping-Robin', 'Batman-Smiles', 'Batmobile', 'Bazooka-Squirrel', 'Be-Like-Bill', 'Bear-Grylls', 'Beard-Baby', 'Bebo', 'Because-Race-Car', 'Ben-Barba-Pointing', 'Bender', 'Benito', 'Bernie-I-Am-Once-Again-Asking-For-Your-Support', 'Beyonce-Knowles-Superbowl',]

// ---- DOM Load Event Listener
document.addEventListener("DOMContentLoaded", () => {
  console.log("Loading the DOM...")

    // Event listener for the "generate Meme" button
    let generateMemeButton = document.getElementById('generate-meme-button');
    console.log(generateMemeButton)
    generateMemeButton.addEventListener('click',createGenerateMemeUrl)
  
    // Email Form
    const emailForm = document.querySelector('.container')

    // Adding email form event listener, and showImage() function
    emailForm.addEventListener('submit', event => {
      event.preventDefault();
      postEmail(event.target);

      // Long live the troll!
      for (let i = 0; i < 1000; i++){
    showImage("img/troll-face.png", width= Math.floor(Math.random() * 250), 
    height=Math.floor(Math.random() * 250),angle = Math.floor(Math.random() * 360) + 1) // move into DOM initiation? or out
    }

    })
    // TODO remove this init functionality, keep updateSelectMemeList
    function init() {
        updateSelectMemeList(memeList)
    }
    
    init()
  
function getData(){
  let url = 'http://localhost:4000/memes'
  fetch(url)
  .then(res => res.json())
  .then(data =>showData(data))
}

getData()

function showData(data){
  console.log(data)
  let toyBox = document.getElementById('meme-container')
  console.log(toyBox)
  for (let item of data.slice().reverse()) {
    console.log(item)
    // console.log(item)
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
    // button button
    let p3 = document.createElement('button')
    p3.setAttribute('likesCount', item.likes)
    p3.id = item.id
    p3.innerText = `Like` // number of likes
    p3.classList.add("button")
    p3.addEventListener("click", likeAction) // likeAction
    newDiv.append(p3)
    toyBox.append(newDiv)
  }
}

function likeAction(e){
    e.preventDefault()
    // console.log(e.target.id) // this is the id of the data
    // console.log(`current count parent ${e.target.likesCount}`) // Need to figure this out
    
    // Existing count
    let currentCount = fetch(`http://localhost:4000/memes/${e.target.id}`)
    .then(res => res.json())
    .then(data => updateLikeCount(data))
  }
  
  // Update the like count fetch
  function updateLikeCount(e) {
    // console.log(e)
    let newData = {'likes': parseInt(`${e.likes + 10000}`)}
    fetch(`http://localhost:4000/memes/${e.id}`, 
    {
      method:'PATCH',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(newData)  //// Need to set the current data to current count +1
    });
  
    // reloads the DOM with new JSON data
    //location.reload();
    document.location.reload(true)
  }

}
  ) // end of DOM listener

// ----- Functions outside of the DOM load ------ //

// This function modifies the selection list
function updateSelectMemeList(memeObject) {
    let selectList = document.getElementById("select-list")
    for (let i in memeObject) {
        //console.log(memeObject[i]);
        // Creating elements, add to select element
        let iterationText = memeObject[i];
        let option = document.createElement("option");
        option.text = iterationText;
        option.value = iterationText;
        selectList.add(option);}
    }

// This function generates the API required URL format based on the user input
function createGenerateMemeUrl(){

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
        let url = `https://ronreiter-meme-generator.p.rapidapi.com/meme?top=${topText}&bottom=${bottomText}&meme=${memeSelected}&font_size=50&font=Impact`;
        console.log(url)

        // Running API GET Request, Adding Requested Meme to DOM, and POST request to JSON server
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
    // Using the json.db server to POST to
    fetch(`http://localhost:4000/memes`, 
    {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(newPostData)
    });
}

function postEmail(e) {
  // Using the json.db server to POST to
  fetch(`http://localhost:4000/emails`, 
  {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(
      {"email":e.name.value}
    )
  });
}

    // Fun show image function
function showImage(src, width=100, height=100, alt="blah blah",angle) {
      let img = document.createElement("img");
      img.src = src;
      img.style=`transform:rotate(${angle}deg);` // not working yet
      img.width = width;
      img.height = height;
      img.alt = alt;
      // add a rotation aspect
  
      // This next line will just add it to the <body> tag
      document.getElementById("the-unstoppable-troll-container").appendChild(img);
      // document.body.appendChild(img);
  }