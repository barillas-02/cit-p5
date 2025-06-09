const { Player } = require('./p5-class');

let players = [];
let targetNumber = Math.floor(Math.random() * 100) + 1;

function addPlayer(name) {
    const player = new Player(name);
    players.push(player);
    return player;
}

function getPlayers() {
    return players.map(p => p.getSummary());
}

function makeGuess(name, guess) {
    const player = players.find(p => p.name === name);
    if (!player) return { error: 'Player not found' };

    player.addGuess(guess);
    if (guess < targetNumber) return { result: 'Too low' };
    if (guess > targetNumber) return { result: 'Too high' };
    return { result: 'Correct!', attempts: player.attempts };
}

function resetGame() {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    players.forEach(p => p.reset());
    return { message: 'Game has been reset' };
}

module.exports = {
    addPlayer,
    getPlayers,
    makeGuess,
    resetGame
};
