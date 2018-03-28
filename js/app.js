/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector(".deck");

const arrayOfCards = [
    "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
    "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb",
    "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"
];

let nrOfMoves = document.querySelector("span");
const stars = document.querySelector(".stars");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(arrayOfCards) {
    var currentIndex = arrayOfCards.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = arrayOfCards[currentIndex];
        arrayOfCards[currentIndex] = arrayOfCards[randomIndex];
        arrayOfCards[randomIndex] = temporaryValue;
    }

    return arrayOfCards;
    //in case you want to check the shuffeled arrayOfCards
    //console.log(arrayOfCards);
}

function addToDom() {
    shuffle(arrayOfCards);
    handleCards.displayStars();
    handleCards.displayNrOfLegalEvents();

    for (let i = 0; i <= arrayOfCards.length - 1; i++) {
        const card = document.createElement("li");
        card.className = ("card");
        card.id = i;
        deck.appendChild(card);
        let icon = document.createElement("i");
        icon.className = arrayOfCards[i];
        card.appendChild(icon);
    }
}

document.addEventListener('DOMContentLoaded', addToDom);

 //- display the card's symbol (put this functionality
 //in another function that you call from this one)
const openCards = [];
let clickedCard;
const matchedCards = [];
const nrOfLegalEvents = [];
const audioError = document.getElementById("audioError");
const audioEnd = document.getElementById("audioEnd");
const audioDone = document.getElementById("audioDone");
let t; // for timer

const handleCards = {
    displaySymbol: function(z) {
        z.classList.add("show", "open");
    },
    checkIfMatch: function(x, y) {
        console.log(x.innerHTML, y.innerHTML);
        if (x.innerHTML === y.innerHTML) {
            this.lockCards(x, y);
        } else {
            return;
        }
    },
    lockCards: function(x, y) {
        x.classList.toggle("open");
        x.classList.toggle("match");
        y.classList.toggle("open");
        y.classList.toggle("match");
        matchedCards.push(x.id, y.id);
        this.checkIfAllMatced();
    },
    turnBack: function(x, y) {
        x.classList.toggle("open");
        x.classList.toggle("show");
        y.classList.toggle("open");
        y.classList.toggle("show");
    },
    displayStars: function() {
        let nrOfStars;
        if (nrOfLegalEvents.length <= 23) {
            nrOfStars = 3;
        } else if (nrOfLegalEvents.length > 23 && nrOfLegalEvents.length <= 35) {
            nrOfStars = 2;
        } else {
            nrOfStars = 1;
        }
        while (stars.hasChildNodes()) {
            stars.removeChild(stars.childNodes[0]);
          };
        for (let i = 1; i <= nrOfStars ; i++) {
            const star = document.createElement("li");
            const starIcon = document.createElement("i");
            starIcon.className = "fa fa-star";
            stars.appendChild(star);
            star.id = i;
            star.appendChild(starIcon);
        }
    },
    displayNrOfLegalEvents: function() {
        nrOfMoves.textContent = nrOfLegalEvents.length + " Moves";
    },
    checkIfAllMatced: function() {
        if (matchedCards.length === 16) {
            this.end();
        } else {
            this.playAudioDone();
        }
    },
    end: function() {
        clearTimeout(t);
        this.playAudioEnd();
        const endMessage = document.createElement("div");
        endMessage.id = "end";
        deck.appendChild(endMessage);
        endMessage.textContent = nrOfLegalEvents.length + " Moves in time rating";
    },
    playAudioError: function() {
        audioError.play();
    },
    playAudioEnd: function() {
        audioEnd.play();
    },
    playAudioDone: function() {
        audioDone.play();
    }
};

let seconds = 0;
let mints = 0;
var startchron = 0;

function chronometer() {
    if(startchron == 1) {
        seconds += 1;
    }
    if(seconds > 59) {
        seconds = 0;
        mints += 1;
      }
    const timer = document.getElementById("Timer");
    timer.textContent = (mints ? (mints > 9 ? mints : "0" + mints)
     : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
     time();
}
function time() {
    t = setTimeout(chronometer, 1000);
}
function startChr() {
    startchron = 1; chronometer();
}
 //  - add the card to a *list* of "open" cards
 // (put this functionality in another function that you call from this one)
 //  - if the list already has another card, check to see if the two cards match
 //    + if the cards do match, lock the cards in the open position
 // (put this functionality in another function that you call from this one)
 //    + if the cards do not match,
 //  remove the cards from the list and hide the card's symbol
 // (put this functionality in another function that you call from this one)
 //    + increment the move counter and display it on the page
 //  (put this functionality in another function that you call from this one)
 //    + if all cards have matched, display a message with the final score 
 // (put this functionality in another function that you call from this one)
 
// set up the event listener for a card. If a card is clicked:
deck.addEventListener("click", function(event){
    console.log(event.target);
    clickedCard = event.target;
    if (openCards.length === 0 && matchedCards.length === 0) {
        startChr();
        openCards.push(clickedCard);
        nrOfLegalEvents.push(clickedCard.id);
        console.log(nrOfLegalEvents);
        handleCards.displayNrOfLegalEvents();
        handleCards.displayStars();
        handleCards.displaySymbol(clickedCard);
    } else if (clickedCard.className === "card show open" ||
        clickedCard.className === "card show match" || clickedCard.tagName === "I") {
        handleCards.playAudioError();
        return;
    } else if (openCards.length === 2) {
        handleCards.turnBack(openCards[0], openCards[1]);
        openCards.splice(0, 2);
        openCards.push(clickedCard);
        nrOfLegalEvents.push(clickedCard.id);
        handleCards.displayNrOfLegalEvents();
        handleCards.displayStars();
        console.log(nrOfLegalEvents);
        handleCards.displaySymbol(clickedCard);
    } else {
        openCards.push(clickedCard);
        nrOfLegalEvents.push(clickedCard.id);
        console.log(nrOfLegalEvents);
        handleCards.displayNrOfLegalEvents();
        handleCards.displayStars();
        handleCards.displaySymbol(clickedCard);
        console.log(openCards);
        handleCards.checkIfMatch(openCards[0], openCards[1]);
    }
});