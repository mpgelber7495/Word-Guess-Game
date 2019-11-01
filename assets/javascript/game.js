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
var randomCharacter = characters[Math.floor(Math.random() * characters.length)];

var lettersInCharacter = randomCharacter["name"].split("");
console.log(lettersInCharacter);

for (i = 0; i < lettersInCharacter.length; i++) {
  document.getElementById("guessing-holder").innerHTML =
    document.getElementById("guessing-holder").innerHTML +
    "<span class = 'letter-holder'> &nbsp;</span>";
}
