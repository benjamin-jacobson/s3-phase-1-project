// Importing keys and secrets
import {API_KEY_MEME} from "./config.js";
import {getData, showData, createGenerateMemeUrl, updateSelectMemeList, postEmail} from "./function.js";

// Initial Data to avoid API calls in development
let memeList = ['10-Guy', '1950s-Middle-Finger', '1990s-First-World-Problems', '1st-World-Canadian-Problems', '2nd-Term-Obama', 'Aaaaand-Its-Gone', 'Ace-Primo', 'Actual-Advice-Mallard', 'Adalia-Rose', 'Admiral-Ackbar-Relationship-Expert', 'Advice-Dog', 'Advice-Doge', 'Advice-God', 'Advice-Peeta', 'Advice-Tam', 'Advice-Yoda', 'Afraid-To-Ask-Andy', 'Afraid-To-Ask-Andy-Closeup', 'Aint-Nobody-Got-Time-For-That', 'Alan-Greenspan', 'Alarm-Clock', 'Albert-Cagestein', 'Albert-Einstein-1', 'Alien-Meeting-Suggestion', 'Alright-Gentlemen-We-Need-A-New-Idea', 'Always-Has-Been', 'Alyssa-Silent-Hill', 'Am-I-The-Only-One-Around-Here', 'American-Chopper-Argument', 'Ancient-Aliens', 'And-everybody-loses-their-minds', 'And-then-I-said-Obama', 'Angry-Asian', 'Angry-Baby', 'Angry-Birds-Pig', 'Angry-Bride', 'Angry-Chef-Gordon-Ramsay', 'Angry-Chicken-Boss', 'Angry-Dumbledore', 'Angry-Koala', 'Angry-Rant-Randy', 'Angry-Toddler', 'Annoying-Childhood-Friend', 'Annoying-Facebook-Girl', 'Anri-Stares', 'Anti-Joke-Chicken', 'Apathetic-Xbox-Laser', 'Archer', 'Are-Your-Parents-Brother-And-Sister', 'Are-you-a-Wizard', 'Arrogant-Rich-Man', 'Art-Attack', 'Art-Student-Owl', 'Arthur-Fist', 'Asshole-Ref', 'Aunt-Carol', 'Austin-Powers-Honestly', 'Aw-Yeah-Rage-Face', 'Awkward-Moment-Sealion', 'Awkward-Olympics', 'BANE-AND-BRUCE', 'BM-Employees', 'Babushkas-On-Facebook', 'Baby-Cry', 'Baby-Godfather', 'Baby-Insanity-Wolf', 'Back-In-My-Day', 'Bad-Advice-Cat', 'Bad-Joke-Eel', 'Bad-Luck-Bear', 'Bad-Luck-Brian', 'Bad-Luck-Hannah', 'Bad-Pun-Anna-Kendrick', 'Bad-Pun-Dog', 'Bad-Wife-Worse-Mom', 'Bah-Humbug', 'Bane', 'Bane-Permission', 'Barack-And-Kumar-2013', 'Barba', 'Barbosa-And-Sparrow', 'Barney-Stinson-Win', 'Baromney', 'Baron-Creater', 'Bart-Simpson-Peeking', 'Batman-And-Superman', 'Batman-Slapping-Robin', 'Batman-Smiles', 'Batmobile', 'Bazooka-Squirrel', 'Be-Like-Bill', 'Bear-Grylls', 'Beard-Baby', 'Bebo', 'Because-Race-Car', 'Ben-Barba-Pointing', 'Bender', 'Benito', 'Bernie-I-Am-Once-Again-Asking-For-Your-Support', 'Beyonce-Knowles-Superbowl',]

// ---- DOM Load Event Listener
document.addEventListener("DOMContentLoaded", () => {
  console.log("Loading the DOM...")

    // Event listener for the "generate Meme" button
    let generateMemeButton = document.getElementById('generate-meme-button');
    //console.log(generateMemeButton)
    generateMemeButton.addEventListener('click',createGenerateMemeUrl)
  
    // Email Form
    const emailForm = document.querySelector('.container')

    // Adding email form event listener, and showImage() function
    emailForm.addEventListener('submit', event => {
      event.preventDefault();
      postEmail(event.target);

      // Long live the troll! Currently disabled
      // for (let i = 0; i < 1000; i++){
      //   showImage("img/troll-face.png", width= Math.floor(Math.random() * 250), 
      //   height=Math.floor(Math.random() * 250),angle = Math.floor(Math.random() * 360) + 1) // move into DOM initiation? or out
      //   }

    })
    // Updateing TODO
    updateSelectMemeList(memeList)

    // TODO
    getData()

}
  ) // end of DOM listener