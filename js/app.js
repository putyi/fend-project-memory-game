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


const handleCards = {
    displaySymbol: function(z) {
        z.classList.add("show", "open");
    },
    //displaySymbol2: function(z) {
    //    z.classList.add("show", "open");
    //},
    checkIfMatch: function(x, y) {
        console.log(x.innerHTML, y.innerHTML);
        if (x.innerHTML === y.innerHTML) {
            this.lockCards(x, y);
        } else {
            //openCards.splice(0, 2);
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
    displayNrOfLegalEvents: function() {
        nrOfMoves.textContent = nrOfLegalEvents.length + " Moves";
    },
    checkIfAllMatced: function() {
        if (matchedCards.length = 16) {
            this.end();
        }
    },
    end: function() {
        // stop timer
        // start music
        // alert you found all pairs
        // stars
    }
};

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
        //start timer   
        openCards.push(clickedCard);
        nrOfLegalEvents.push(clickedCard.id);
        console.log(nrOfLegalEvents);
        handleCards.displayNrOfLegalEvents();
        handleCards.displaySymbol(clickedCard); 
    } else if (clickedCard.id === openCards[0].id || clickedCard.id === openCards[1].id) {
        alert("Watch out, you've already clicked this shit!");
        // or remove event listener?
        return;
    } else if (openCards.length === 2) {
        handleCards.turnBack(openCards[0], openCards[1]);
        openCards.splice(0, 2);
        openCards.push(clickedCard);
        nrOfLegalEvents.push(clickedCard.id);
        handleCards.displayNrOfLegalEvents();
        console.log(nrOfLegalEvents);
        handleCards.displaySymbol(clickedCard);
    } /*else if (openCards.length === 0) {
        openCards.push(clickedCard);
        nrOfLegalEvents.push(number);
        console.log(nrOfLegalEvents);
        handleCards.displaySymbol(clickedCard);
    }*/ else {
        openCards.push(clickedCard);
        nrOfLegalEvents.push(clickedCard.id);
        console.log(nrOfLegalEvents);
        handleCards.displayNrOfLegalEvents();
        handleCards.displaySymbol(clickedCard);
        console.log(openCards);
        //let time = setInterval(handleCards.checkIfMatch(clickedCard1, clickedCard2), 3000);
        handleCards.checkIfMatch(openCards[0], openCards[1]);
    }
});


