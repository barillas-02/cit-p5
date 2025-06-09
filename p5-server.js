const express = require('express');
const app = express();
const path = require('path');

const { addPlayer, getPlayers, makeGuess, resetGame } = require('./p5-game');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/players', (req, res) => {
    res.json(getPlayers());
});

app.get('/api/reset', (req, res) => {
    res.json(resetGame());
});

app.post('/api/add-player', (req, res) => {
    const { name } = req.body;
    const player = addPlayer(name);
    res.json(player.getSummary());
});

app.post('/api/guess', (req, res) => {
    const { name, guess } = req.body;
    res.json(makeGuess(name, parseInt(guess)));
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
