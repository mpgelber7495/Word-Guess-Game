// JSON structure for the data below
characters = [
  {
    name: "Jim",
    Description: "Floppy Hair"
  },
  {
    name: "Angela",
    Description: "Kitty Kitty"
  },
  {
    name: "Stanely",
    Description: "Definitely sassy"
  },
  {
    name: "Dwight",
    Description: "BSG, Mose"
  },
  {
    name: "Pamela",
    Description: "Art"
  },
  {
    name: "Kevin",
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

var wins = 0;
var remainingGuesses = 8;
var lettersGuessed = [];
var lettersGuessedCorrect = [];
var randomCharacter = characters[Math.floor(Math.random() * characters.length)];
var randomCharacterName = randomCharacter["name"].toLowerCase();
var lettersInCharacter = randomCharacterName.split("");

document.getElementById("remaining-guesses").innerHTML = remainingGuesses;

for (i = 0; i < lettersInCharacter.length; i++) {
  document.getElementById("guessing-holder").innerHTML =
    document.getElementById("guessing-holder").innerHTML +
    "<span class = 'px-1' id = 'letter-" +
    i +
    "'>_</span>";
}

console.log(lettersInCharacter);

document.addEventListener("keydown", function(event) {
  for (i = 0; i < lettersInCharacter.length; i++) {
    if (lettersInCharacter[i] === event["key"]) {
      lettersGuessedCorrect += event["key"];
      var elementID = "letter-" + i;
      document.getElementById(elementID).innerHTML = event["key"];
      if (lettersGuessedCorrect.length === lettersInCharacter.length) {
        wins++;
        document.getElementById("wins").innerHTML = wins;
      }
    }
  }

  if (
    lettersGuessed.includes(event["key"]) === false &&
    lettersInCharacter.includes(event["key"]) === false
  ) {
    lettersGuessed.push(event["key"]);
    document.getElementById("letters-guessed").innerHTML = lettersGuessed;
    remainingGuesses--;
  }
});
// } if (lettersGuessed.includes(event["key"]) === false) {
//   lettersGuessed.push(event["key"]);
//   console.log(lettersGuessed);
//   remainingGuesses--;
// }
