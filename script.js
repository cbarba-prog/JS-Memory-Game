//get ID of game from HTML
const gameContainer = document.getElementById("game");

//Set selected cards 1 and 2 to have no value. 
let card1 = null;
let card2 = null;

//set total number of cards flipped to 0. This tells us how many matches we have
let cardsFlipped = 0;

//set number of clicks to 0
let noClicks = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(e) {
  
  if (noClicks) return;

  if (e.target.classList.contains("flipped")) return;

  // you can use event.target to see which element was clicked
  console.log("you just clicked", e.target);

  //when clicked, changes clicked card into color
  let currentCard = e.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  //If no cards are clicked, assign class of color flipped
  if (!card1 || !card2) {
    currentCard.classList.add("flipped");

  //set value of card1 to card1 or current card
    card1 = card1 || currentCard;
  
  //set value of card2 to currentcard if it matches card1, else card2 is null
    card2 = currentCard === card1 ? null : currentCard;
  }
  //set noClicks to true if both cards are clicked.
  if (card1 && card2) {
    noClicks = true;
    // debugger
    let gif1 = card1.className;
    let gif2 = card2.className;
  
//if cards match, reset card1, card2 to null, noClicks to false. This is implemented after 2 cards are chosen
  if (gif1 === gif2) {
    cardsFlipped += 2;
    card1.removeEventListener("click", handleCardClick);
    card2.removeEventListener("click", handleCardClick);
    card1 = null;
    card2 = null;
    noClicks = false;
  }
  //Timer is set for 1/2 second. This occurs if cards do not match. Resets all values to empty ones 
  else {
    setTimeout(function() {
      card1.style.backgroundColor = "";
      card2.style.backgroundColor = "";
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1 = null;
      card2 = null;
      noClicks = false;
    }, 500);
  }
}
if (cardsFlipped === COLORS.length) alert("game over!");
}

// when the DOM loads
createDivsForColors(shuffledColors);
