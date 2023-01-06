/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for(let i = 0; i < games.length; i++){

        var div = document.createElement('div')
        div.classList.add("game-card")
        div.innerHTML = `<h1>${games[i].name}</h1> <p>${games[i].description}</p> <img class="game-img" src = ${games[i].img} />`

        gamesContainer.append(div)
    }
}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);

// later, we'll call this function using a different list of games

const totalGames = GAMES_JSON.length;

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
// use reduce() to count the number of total contributions by summing the backers
const totalContributors =  GAMES_JSON.reduce( (num, games) => {
    return num + games.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributors}`


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce( (num, games) => {
    return num + games.pledged;
}, 0);
// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised}`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length}`


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let listUnfunded = GAMES_JSON.filter( (games) => {
        return games.goal > games.pledged;
    });
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(listUnfunded);

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let listFunded = GAMES_JSON.filter( (games) => {
        return games.goal < games.pledged;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(listFunded);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    
    addGamesToPage(GAMES_JSON);

    // add all games from the JSON data to the DOM

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numUnfunded = GAMES_JSON.reduce( (num, games) => {
    if(games.goal > games.pledged) {
        return num + 1;
    }
    else return num;
},0);


//console.log("num", numUnfunded);
// create a string that explains the number of unfunded games using the ternary operator

const displayStr = `A total of $${totalRaised.toLocaleString()} has been raised for 
                    ${totalGames} ${totalGames == 1 ? "game" : "games"}. 
                    Currently, ${numUnfunded} ${numUnfunded == 1 ? "game remains" : "games remain"} unfunded.
                    We need your help to fund these amazing games!`

// create a new DOM element containing the template string and append it to the description container

let paragraph = document.createElement('p');
paragraph.innerHTML = `${displayStr}`;
descriptionContainer.appendChild(paragraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let first_game = sortedGames[0].name;
let second_game = sortedGames[1].name;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGame = document.createElement('p');
firstGame.innerHTML = `${first_game}`;
firstGameContainer.appendChild(firstGame);

const secondGame = document.createElement('p');
secondGame.innerHTML = `${second_game}`;
secondGameContainer.appendChild(secondGame);
// do the same for the runner up item

function search(){
    var input = document.getElementById('input');
    input = input.value.toUpperCase();
    //console.log(input);

    deleteChildElements(gamesContainer);

    let listSearch = GAMES_JSON.filter( (games) => {
        return games.name.toUpperCase().indexOf(input) != - 1; 
    })

    addGamesToPage(listSearch);
}

const searchBox = document.querySelector('input').addEventListener("input", search)