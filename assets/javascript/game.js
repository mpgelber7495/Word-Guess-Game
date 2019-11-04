// JSON structure for the data below
characters = [
  {
    name: "99 Red Balloons",
    Description: "Gold Finger"
  },
  {
    name: "My Own Worst Enemy",
    Description: "Kitty Kitty"
  },
  {
    name: "I Want You Back",
    Description: "Definitely sassy"
  },
  {
    name: "Whats My Age Again",
    Description: "BSG, Mose"
  },
  {
    name: "Sweet Home Alabama",
    Description: "Art"
  },
  {
    name: "Basket Case",
    Description: "Really great with numbers"
  },
  {
    name: "Andy",
    Description: "Ivy league"
  },
  {
    name: "Toby",
    Description: "Michael's favorite... not"
  },
  {
    name: "Erin",
    Description: "Pams follow up"
  },
  {
    name: "Creed",
    Description: "Probably the sketchiest"
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

var wins = 0;
var losses = 0;
var remainingGuesses;
var lettersGuessed;
var lettersGuessedCorrect;
var randomCharacter;
var randomCharacterName;
var lettersInCharacter;

function instantiateVariables() {
  remainingGuesses = 8;
  lettersGuessed = [];
  lettersGuessedCorrect = [];
  randomCharacter = characters[Math.floor(Math.random() * characters.length)];
  randomCharacterName = randomCharacter["name"].toLowerCase();
  lettersInCharacter = randomCharacterName.split("");
  return [
    remainingGuesses,
    lettersGuessed,
    lettersGuessedCorrect,
    randomCharacter,
    randomCharacterName,
    lettersInCharacter
  ];
}

var instant = instantiateVariables();
var remainingGuesses = instant[0];
var lettersGuessed = instant[1];
var lettersGuessedCorrect = instant[2];
var randomCharacter = instant[3];
var randomCharacterName = instant[4];
var lettersInCharacter = instant[5];

document.getElementById("remaining-guesses").innerHTML = remainingGuesses;

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

resetCharacter();

document.addEventListener("keydown", function(event) {
  for (i = 0; i < lettersInCharacter.length; i++) {
    if (
      lettersInCharacter[i] === event["key"] &&
      validKeys.includes(event["key"])
    ) {
      lettersGuessedCorrect += event["key"];
      var elementID = "letter-" + i;
      document.getElementById(elementID).innerHTML = event["key"];
      if (lettersGuessedCorrect.length === lettersInCharacter.length) {
        wins++;
        document.getElementById("wins").innerHTML = wins;
        instant = instantiateVariables();
        remainingGuesses = instant[0];
        lettersGuessed = instant[1];
        lettersGuessedCorrect = instant[2];
        randomCharacter = instant[3];
        randomCharacterName = instant[4];
        lettersInCharacter = instant[5];
        resetCharacter();
      }
    }
  }

  if (
    lettersGuessed.includes(event["key"]) === false &&
    lettersInCharacter.includes(event["key"]) === false &&
    validKeys.includes(event["key"])
  ) {
    lettersGuessed.push(event["key"]);
    document.getElementById("letters-guessed").innerHTML = lettersGuessed;
    remainingGuesses--;
    document.getElementById("remaining-guesses").innerHTML = remainingGuesses;
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
      resetCharacter();
    }
  }
});
