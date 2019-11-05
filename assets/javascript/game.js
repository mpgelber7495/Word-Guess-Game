// JSON structure for the data below
characters = [
  {
    name: "Red Balloons",
    Description: "Gold Finger",
    link: "https://open.spotify.com/embed/track/0rOTMSSa6yscfOrGnzfheM"
  },
  {
    name: "My Own Worst Enemy",
    Description: "Kitty Kitty",
    link: "https://open.spotify.com/embed/track/33iv3wnGMrrDugd7GBso1z"
  },
  {
    name: "Mr Brightside",
    Description: "Kitty Kitty",
    link: "https://open.spotify.com/embed/track/7oK9VyNzrYvRFo7nQEYkWN"
  },
  {
    name: "All The Small Things",
    Description: "Kitty Kitty",
    link: "https://open.spotify.com/embed/track/2m1hi0nfMR9vdGC8UcrnwU"
  }
];
// End data

//Array of valid keys to press
validKeys = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
  " "
];

// create variables
var wins = 0;
var losses = 0;

// create function that will allow us to refresh variables
function instantiateVariables() {
  remainingGuesses = 8;
  lettersGuessed = [];
  lettersGuessedCorrect = [];
  randomCharacter = characters[Math.floor(Math.random() * characters.length)];
  randomCharacterName = randomCharacter["name"].toLowerCase();
  lettersInCharacter = randomCharacterName.split("");
  lettersGuessedCorrectCount = 0;
  return [
    remainingGuesses,
    lettersGuessed,
    lettersGuessedCorrect,
    randomCharacter,
    randomCharacterName,
    lettersInCharacter,
    lettersGuessedCorrectCount
  ];
}

// run the instantiation function and assign the variable
var instant = instantiateVariables();
var remainingGuesses = instant[0];
var lettersGuessed = instant[1];
var lettersGuessedCorrect = instant[2];
var randomCharacter = instant[3];
var randomCharacterName = instant[4];
var lettersInCharacter = instant[5];
var lettersGuessedCorrectCount = instant[6];

// Refresh the remaining guesses value on the DOM
document.getElementById("remaining-guesses").innerHTML = remainingGuesses;

// Function to insert a correctly guessed letter into the DOM
function resetCharacter() {
  document.getElementById("guessing-holder").innerHTML = "";
  for (i = 0; i < lettersInCharacter.length; i++) {
    document.getElementById("guessing-holder").innerHTML =
      document.getElementById("guessing-holder").innerHTML +
      "<span class = 'px-1' id = 'letter-" +
      i +
      "'>_</span>";
  }
}

// First reset function to start off the game
resetCharacter();

// Event listener to pickup when a key is pressed (and therefore a guess is being made)
document.addEventListener("keydown", function(event) {
  for (i = 0; i < lettersInCharacter.length; i++) {
    // check to see if 1. the guessed letter's in the character 2. the key being pressed is valid 3. the letter hasn't already been guessed correctly, which would've allowed for hacking
    if (
      lettersInCharacter[i] === event["key"] &&
      validKeys.includes(event["key"]) &&
      lettersGuessedCorrect.includes(event["key"]) === false
    ) {
      console.log(event["key"]);
      // inserting the correctly guessed letter into the DOM
      var elementID = "letter-" + i;
      document.getElementById(elementID).innerHTML = event["key"];
      lettersGuessedCorrectCount++;
    }
  }
  // Add the correctly guessed character to the array so that it can't be counted again
  if (
    lettersInCharacter.includes(event["key"]) &&
    validKeys.includes(event["key"])
  ) {
    lettersGuessedCorrect += event["key"];
  }
  // check to see if the song has been fully guessed correctly by comparing the length of character to the number of letters correctly guessed
  if (lettersGuessedCorrectCount === lettersInCharacter.length) {
    wins++;

    // code to embed spotify iframe
    songIframe =
      '<div class="row"><div class="col-12 d-flex justify-content-center py-2"><iframe src="' +
      randomCharacter.link +
      '" width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> </div></div>';
    document.getElementById("spotify-holder").innerHTML += songIframe;

    // Reset all of the relevant variables for a new round
    document.getElementById("wins").innerHTML = wins;
    instant = instantiateVariables();
    remainingGuesses = instant[0];
    lettersGuessed = instant[1];
    lettersGuessedCorrect = instant[2];
    randomCharacter = instant[3];
    randomCharacterName = instant[4];
    lettersInCharacter = instant[5];
    lettersGuessedCorrectCount = instant[6];
    resetCharacter();
  }
  // If a letter is guessed incorrect
  if (
    lettersGuessed.includes(event["key"]) === false &&
    lettersInCharacter.includes(event["key"]) === false &&
    validKeys.includes(event["key"])
  ) {
    // add it to the letters guessed array
    lettersGuessed.push(event["key"]);
    // Display this in the DOM
    document.getElementById("letters-guessed").innerHTML = lettersGuessed;
    // Decrease remaining guesses
    remainingGuesses--;
    document.getElementById("remaining-guesses").innerHTML = remainingGuesses;
    // cause loss of game if the remaining guesses are zero
    if (remainingGuesses === 0) {
      losses++;
      document.getElementById("losses").innerHTML = losses;
      instant = instantiateVariables();
      remainingGuesses = instant[0];
      lettersGuessed = instant[1];
      lettersGuessedCorrect = instant[2];
      randomCharacter = instant[3];
      randomCharacterName = instant[4];
      lettersInCharacter = instant[5];
      lettersGuessedCorrectCount = instant[6];
      resetCharacter();
    }
  }
});
