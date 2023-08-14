const API_KEY_MEME = 'insertkeyhere' // runs via explorer.exe index.hmtl , no live-server required

// ---- DOM Load Event Listener
document.addEventListener("DOMContentLoaded", () => {
  console.log("Loading the DOM...")

  // Getting the meme list, and adding to the selection in html
  getMemeList()

  function getMemeList() {
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
  
  function updateSelectMemeList(memeObject) {
    
      let selectList = document.getElementById("select-list")
      for (let i in memeObject) {
  
          let iterationText = memeObject[i];
          let option = document.createElement("option");
          option.text = iterationText;
          option.value = iterationText;
          selectList.add(option);}
      }
  
  // Email Form
  const emailForm = document.querySelector('.get-a-surprise')

  // Adding email form event listener, and showImage() function
  emailForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let email = event.target.name.value
    postEmail(email)
    displayEmailFiveSeconds(email)
    })

  function postEmail(email) {
    return fetch(`http://localhost:4000/emails`, 
    {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(
        {"email":email}
      )
    });
  }

  function displayEmailFiveSeconds(email) {
    let h5Content = document.getElementById("added-email-message")
    let originalContent = h5Content.innerHTML
    h5Content.innerHTML = `Email ${email} was added to the email list.`
    setTimeout(function() {
      h5Content.innerHTML = originalContent
    }, 5000)
  }

  // Event listener for the "generate Meme" button
  let generateMemeButton = document.getElementById('generate-meme-button');
  generateMemeButton.addEventListener('click',createGenerateMemeUrl)

  function createGenerateMemeUrl() {

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
        displayImageThreeSeconds(blob);
        convertAndPostBlob(blob);

        createTempMemeTile(blob)
      })}

      function createTempMemeTile(blob) {

        let memeBox = document.getElementById('meme-container')
            
        let newDiv = document.createElement('div')
        newDiv.classList.add("card")
      
        let h = document.createElement("HEADER");
        var h2 = document.createElement("H6");
        var txt = document.createTextNode(`${newMemeName}`);
        h2.appendChild(txt);
        h.appendChild(h2)
        newDiv.append(h)
      
        const imageUrl = URL.createObjectURL(blob);
        let i = document.createElement('img')
        i.src = imageUrl //this is the url key
        i.classList.add("meme-avatar")
        newDiv.append(i)
      
        let p2 = document.createElement('p')
        p2.innerText = `0 likes!` // number of likes
        p2.setAttribute('id', "p2-text")
        newDiv.append(p2)
      
        let p3 = document.createElement('button')
        p3.setAttribute('likesCount', 0)
        //p3.id = item.id
        p3.innerText = `Like`
        p3.classList.add("button")
        p3.addEventListener("click", likeAction) // likeAction event listener on click, does likeAction function
        newDiv.append(p3)
        memeBox.prepend(newDiv)
      }
      
  function displayImageThreeSeconds(input){
  
    const imageUrl = URL.createObjectURL(input);
  
    const imageElement = document.createElement("img");
    imageElement.src = imageUrl;
    imageElement.id = "temporary-image"
    const container = document.getElementById("image-container");
    container.appendChild(imageElement);
    setTimeout(function() {
      document.getElementById("temporary-image").remove();
    }, 3000)
  }

  // Getting local db.json data and displaying in the DOM (memes already created)
  getData()

  function getData() {
    let url = 'http://localhost:4000/memes'
    fetch(url)
    .then(res => res.json())
    .then(data =>showData(data))
  };

  function showData(data) {
    let memeBox = document.getElementById('meme-container')
    let allData = data.slice().reverse()
    allData.forEach(createMemeTile)
    }

}) // end of DOM listener

function createMemeTile(item) {

  let memeBox = document.getElementById('meme-container')
      
  let newDiv = document.createElement('div')
  newDiv.classList.add("card")
  newDiv.setAttribute('id',`meme-tile-${item.id}`)

  let h = document.createElement("HEADER");
  var h2 = document.createElement("H6");
  var txt = document.createTextNode(`${item.name}`);
  h2.appendChild(txt);
  h.appendChild(h2)
  newDiv.append(h)

  let i = document.createElement('img')
  i.src = item.image //this is the url key
  i.classList.add("meme-avatar")
  newDiv.append(i)

  let p2 = document.createElement('p')
  p2.innerText = `${item.likes} likes!` // number of likes
  p2.setAttribute('id', "p2-text")
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

function likeAction(e){
  e.preventDefault()

  let currentCount = fetch(`http://localhost:4000/memes/${e.target.id}`)
  .then(res => res.json())
  .then(data => updateLikeCountUpsert(data))
  .then(x =>console.log(x))
}
  
 function updateLikeCountUpsert(data) {

  let newData = {'likes': parseInt(`${data.likes + 1}`)}
 
  // Udpating dom
  var p = document.querySelector(`#meme-tile-${data.id} p`);
  console.log(p.textContent)
  p.textContent = `${parseInt(`${data.likes + 1}`)}  likes!`

  // Updating database
    return fetch(`http://localhost:4000/memes/${data.id}`, 
    {
      method:'PATCH',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(newData)
    })
  };

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