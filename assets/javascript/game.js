// JSON structure for the data below
var characters = [
  {
    name: "Red Balloons",
    artist: "Gold Finger",
    link: "https://open.spotify.com/embed/track/0rOTMSSa6yscfOrGnzfheM"
  },
  {
    name: "My Own Worst Enemy",
    artist: "Lit",
    link: "https://open.spotify.com/embed/track/33iv3wnGMrrDugd7GBso1z"
  },
  {
    name: "Mr Brightside",
    artist: "The Killers",
    link: "https://open.spotify.com/embed/track/7oK9VyNzrYvRFo7nQEYkWN"
  },
  {
    name: "All The Small Things",
    artist: "Blink 182",
    link: "https://open.spotify.com/embed/track/2m1hi0nfMR9vdGC8UcrnwU"
  },
  {
    name: "Basket Case",
    artist: "Green Day",
    link: "https://open.spotify.com/embed/track/6L89mwZXSOwYl76YXfX13s"
  },
  {
    name: "American Girl",
    artist: "Tom Petty",
    link: "https://open.spotify.com/embed/track/7MRyJPksH3G2cXHN8UKYzP"
  },
  {
    name: "The Middle",
    artist: "Jimmy Eat World",
    link: "https://open.spotify.com/embed/track/3mcG2NI5G5vhrQtRda1YnA"
  },
  {
    name: "Stacys Mom",
    artist: "Fountains of Youth",
    link: "https://open.spotify.com/embed/track/27L8sESb3KR79asDUBu8nW"
  },
  {
    name: "The Anthem",
    artist: "Good Charlotte",
    link: "https://open.spotify.com/embed/track/0BRHnOFm6sjxN1i9LJrUDu"
  },
  {
    name: "SemiCharmed Life",
    artist: "Third Eye Blind",
    link: "https://open.spotify.com/embed/track/42et6fnHCw1HIPSrdPprMl"
  },
  {
    name: "September",
    artist: "Earth, Wind and Fire",
    link: "https://open.spotify.com/embed/track/7Cuk8jsPPoNYQWXK9XRFvG"
  }
];
// End data

var validKeys = [
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

// Function to reset the array of underscores, remainingGuesses and lettersGuessed
function resetCharacter() {
  document.getElementById("guessing-holder").innerHTML = "";
  for (i = 0; i < lettersInCharacter.length; i++) {
    document.getElementById("guessing-holder").innerHTML =
      document.getElementById("guessing-holder").innerHTML +
      "<span class = 'px-1' id = 'letter-" +
      i +
      "'>_</span>";
  }
  document.getElementById("remaining-guesses").innerHTML = remainingGuesses;
  document.getElementById("letters-guessed").innerHTML = lettersGuessed;
}

// Function to spin the bumperSticker object
function spinBumperSticker(counter) {
  if (counter === 73) {
    return;
  }
  bumperSticker = document.querySelector("#bumper-sticker");
  bumperSticker.style.transform = "rotate(" + counter * 10 + "deg)";
  setTimeout(spinBumperSticker, 10, ++counter);
}

// Function to display the next button
function nextButtonDisplay() {
  document.getElementById("next-button").style.display = "inline";
}

// Call the instantiateVariables function and assign the returned array to variables, also reset the DOM elements
function nextButtonRefresh() {
  instant = instantiateVariables();
  remainingGuesses = instant[0];
  lettersGuessed = instant[1];
  lettersGuessedCorrect = instant[2];
  randomCharacter = instant[3];
  randomCharacterName = instant[4];
  lettersInCharacter = instant[5];
  lettersGuessedCorrectCount = instant[6];
  document.getElementById("next-button").style.display = "none";
  document.querySelector(".highlight").style.fontSize = "15px";
  document.querySelector(".hint-holder").innerHTML = "";
  resetCharacter();
}

// Preliminary run of functions
nextButtonRefresh();
resetCharacter();
spinBumperSticker(0);

// Event listener to pickup when a key is pressed (and therefore a guess is being made)
document.addEventListener("keydown", function(event) {
  if (
    remainingGuesses > 0 &&
    lettersGuessedCorrectCount !== lettersInCharacter.length
  ) {
    for (i = 0; i < lettersInCharacter.length; i++) {
      // check to see if 1. the guessed letter's in the character 2. the key being pressed is valid 3. the letter hasn't already been guessed correctly, which would've allowed for hacking
      if (
        lettersInCharacter[i] === event["key"] &&
        validKeys.includes(event["key"]) &&
        lettersGuessedCorrect.includes(event["key"]) === false
      ) {
        // if above met, correct guess was made
        // inserting the correctly guessed letter into the DOM
        var elementID = "letter-" + i;
        document.getElementById(elementID).innerHTML = event["key"];
        lettersGuessedCorrectCount++;
      }
    }
    // Add the correctly guessed character to the array so that it can't be counted again (this has to be outside of the For loop so that double letters are identified)
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

      var newInnerHTML =
        songIframe + document.getElementById("spotify-holder").innerHTML;
      document.getElementById("spotify-holder").innerHTML = newInnerHTML;
      nextButtonDisplay();
      spinBumperSticker(0);
      // display the new wins value
      document.getElementById("wins").innerHTML = wins;
    }

    // If a letter is guessed incorrectly
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
        nextButtonDisplay();
        document.getElementById("losses").innerHTML = losses;
      }
    }
  }
  spaceBarWarning();
  displayArtistHint();
});

// Warning for if guesses are low and space bar hasn't been guessed
// Currently a bug because the " " isn't stored in the lettersGuessed array even though the event properly logs it
function spaceBarWarning() {
  if (remainingGuesses < 3 && lettersGuessed.includes(" ") === false) {
    document.querySelector(".highlight").style.fontSize = "30px";
  }
}

// Display the artist as a hint
function displayArtistHint() {
  if (remainingGuesses < 4) {
    document.querySelector(".hint-holder").innerHTML =
      "<h4> Hint<br>Artist is: " + randomCharacter.artist + "</h4>";
  }
}
