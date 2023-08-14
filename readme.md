# Project: Single Page Application: Javascript, HTML, CSS

![Hosted Site](https://github.com/benjamin-jacobson/se-phase-1-project/blob/main/img/Website1.JPG?raw=true)

- General project requirements here: https://github.com/learn-co-curriculum/phase-1-javascript-project-mode

# Basic Application Details
  - A Single Page Application (SPO) that allows the user to get and generate memes. Receives a list of memes, can generate one, can like memes, and then add memes to the database and as a result the website. Add their email to an email list.

![Hosted Site](https://github.com/benjamin-jacobson/se-phase-1-project/blob/main/img/Website2.JPG?raw=true)

# Running the local server, authentication
- Use live-server package to open index.html in VS Code
  - allows to type module, local WSL2 file access, avoid CORS
  - right click on file index.html, select "Open with Live Server"
- json-server -p 4000 --watch db.json
- explorer.exe index.html
- Store api key in config.js file at project root directory (note that this is .gitignored).

# Requires API key
  Follow instructions here as needed for getting an API key. Need to add to config.js for site use.
- http://apimeme.com/?ref=apilist.fun
- https://rapidapi.com/meme-generator-api-meme-generator-api-default/api/meme-generator

# Project Objective, Plan, Features & User Stories

- **The basic story of your application**
  - A Single Page Application (SPO) that allows the user to get and generate memes. Receives a list of memes, can generate one, can like memes, and then add memes to the database and as a result the website. Add their email to an email list, and there is some "easter-egg" functionality as well.

- **Core features of your MVP**
  - Upon SPA loading, see all the previously made memes by other users. 
  - Ability to "like" any of the displayed memes. Persists in the database.
  - Drop-down filter "list of memes" that can be used to generate a new meme.
  - Generate meme button with user input for text at top and bottom of image.
  - Returns the generated image with user text. 
  - Adds the returned meme to the persistant data storage.
  - User can add their email to an email list.

- **Event Listeners**
  - Three distinct listeners used: "DOMContentLoaded", "click" event, and "submit" event.

- **Functions**
  - getMemeList
    - Uses API URL, GET request to API with key, gets image list data, calls updateSelectMemeList.
  - updateSelectMemeList
    - This function modifies the selection list element, for all possible memes shown in DOM.
  - getData
    - Getting json.db meme data, runs showsData
  - showData
    - Create DOM tiles for existing database db.json memes and their data
  - createMemeTile
    -  Function creates the meme div element with image, texts, likes,...
  - likeAction
    - Gets current like count, and call updateLikeCount to update count via PATCH
  - updateLikeCount
    -  This function updates the like count in the database db.json via PATCH
  - createGenerateMemeUrl
    - This function generates the API required URL format based on the user input
  - fetchImage
    - Uses url, GET request to API with key, returns blob, calls 1. addMemeToDom and 2. converAndPostBlob
  - addMemeToDom
    - Briefly shows the meme generated and adds 
  - readFile
    - uses FileReader to take blob and save as a persistent format
  - postDbMemes
    - Using the json.db server to POST to meme
  - postEmail
    - Using the json.db server to POST user email data
  - showImage
    - unused function for displaying images

- **API, Data, And Use**
  - Local json-server database GET, POST and PATCH.
  - Using third-party API GET methods
    - The getImages/ endpoint to get a list of all images avaiable from the API.
    - The generateMeme/ endpoint to get a JSON image from the API.
    - https://rapidapi.com/meme-generator-api-meme-generator-api-default/api/meme-generator

- **Challenges**
  - Persisting images without a true backend database.
  - Protecting sensitive information.
  - Scope creep.

- **User Stories**
  - "As a new user, I want to be able to see a list of memes I can use".
  - "As a influencer, I want to be able to make memes with text, so I can get lots of likes and laughs".
  - "As a bored user, I want to be able to see memes other people have made".
  - "As a creative user, I want to have my meme on the website for others to see." 

- **API Interation & structure**
  - GET request to meme API for all available memes.
  - GET request to meme generator API to generate a meme.
  - GET request to local json database to show all existing memes already created.
  - POST request to local json database to add new meme (new record, update likes).
  - PATCH request to local json database to existing meme to update likes.

# Useful System, Browser, WSL, or Linux Commands
- Update security setting for chrome
  - **chrome://flags/#block-insecure-private-network-requests**
- To copy from windows 11, while in the WSL2 termina (run in linux) will copy to pwd
  - **sudo cp /mnt/c/Users/guy/Desktop/moroccan-flower.png .**
- To kill the JSON server if hanging
  - sudo lsof -i :4000
    - put the appropriate port number for 4000
  - sudo kill -9 PID
    - Put the PID number for placeholder PID above
 
# Project Video Walkthrough
- https://www.youtube.com/watch?v=A-lEbdV7QZw

# Resources
- https://rapidapi.com/guides/fetch-images-with-fetch-api
- https://rapidapi.com/meme-generator-api-meme-generator-api-default/api/meme-generator
- https://www.w3docs.com/learn-html/html-select-tag.html
- https://www.youtube.com/watch?v=cP5E0b21f_Y
- https://open-code.tech/en/post-1424/
- https://stackoverflow.com/questions/21518381/
- https://www.freecodecamp.org/news/gitignore-file-how-to-ignore-files-and-folders-in-git/#ignore-file
- https://stackoverflow.com/questions/5786851/define-a-global-variable-in-a-javascript-function
- https://stackoverflow.com/questions/66534759/cors-error-on-request-to-localhost-dev-server-from-remote-site 
- https://rapidapi.com/meme-generator-api-meme-generator-api-default/api/meme-generator 
- https://github.com/benjamin-jacobson/se-phase-1-project/blob/main/readme.md 
- https://www.freecodecamp.org/news/vscode-live-server-auto-refresh-browser/
- https://www.youtube.com/watch?v=nx8E5BF0XuE
- https://www.toptal.com/designers/subtlepatterns/
- https://24ways.org/2012/how-to-make-your-site-look-half-decent/
- https://kodekloud.com/blog/git-uncommit-last-commit/#
- https://www.makeuseof.com/how-to-import-and-export-functions-in-javascript/#:~:text=In%20order%20to%20import%20multiple,by%20a%20comma%20(%2C).&text=There%20is%20another%20way%20to,exports%20in%20a%20particular%20file