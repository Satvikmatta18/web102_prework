// Assuming GAMES_DATA is fetched or imported correctly
import GAMES_DATA from './games.js';

const GAMES_JSON = JSON.parse(GAMES_DATA);

// Function to remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// Function to add game data as cards to the games-container
function addGamesToPage(games) {
    const gamesContainer = document.getElementById("games-container");
    deleteChildElements(gamesContainer); // Clear existing cards first

    games.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');
        gameCard.innerHTML = `
            <img src="${game.img}" alt="${game.name}" class="game-img" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Pledged: $${game.pledged.toLocaleString()} / Goal: $${game.goal.toLocaleString()}</p>
            <p>Backers: ${game.backers.toLocaleString()}</p>
        `;
        gamesContainer.appendChild(gameCard);
    });
}

// Calculate summary statistics and display them
function displaySummaryStatistics() {
    const totalContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0);
    const totalPledged = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);
    const totalGames = GAMES_JSON.length;

    document.getElementById("num-contributions").textContent = totalContributions.toLocaleString();
    document.getElementById("total-raised").textContent = `$${totalPledged.toLocaleString()}`;
    document.getElementById("num-games").textContent = totalGames;
}

// Filter functions
function filterUnfundedOnly() {
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    addGamesToPage(unfundedGames);
}

function filterFundedOnly() {
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    addGamesToPage(fundedGames);
}

function showAllGames() {
    addGamesToPage(GAMES_JSON);
}

// Event listeners
document.getElementById("unfunded-btn").addEventListener("click", filterUnfundedOnly);
document.getElementById("funded-btn").addEventListener("click", filterFundedOnly);
document.getElementById("all-btn").addEventListener("click", showAllGames);

// Displaying the top 2 games
function displayTopGames() {
    const sortedGames = [...GAMES_JSON].sort((a, b) => b.pledged - a.pledged);
    const [mostFunded, secondMostFunded] = sortedGames;

    const firstGameContainer = document.getElementById('first-game');
    const secondGameContainer = document.getElementById('second-game');

    // Clear previous content
    deleteChildElements(firstGameContainer);
    deleteChildElements(secondGameContainer);

    let firstGameNameElement = document.createElement('p');
    firstGameNameElement.textContent = mostFunded.name;
    firstGameContainer.appendChild(firstGameNameElement);

    let secondGameNameElement = document.createElement('p');
    secondGameNameElement.textContent = secondMostFunded.name;
    secondGameContainer.appendChild(secondGameNameElement);
}

// Initial display of games and statistics
document.addEventListener('DOMContentLoaded', () => {
    showAllGames();
    displaySummaryStatistics();
    displayTopGames();
});
