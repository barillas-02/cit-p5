let currentPlayer = '';

function addPlayer() {
    const name = document.getElementById('player-name').value;
    if (!name) return alert('Please enter your name.');

    fetch('/api/add-player', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    })
    .then(res => res.json())
    .then(data => {
        currentPlayer = data.name;
        document.getElementById('guess-section').style.display = 'block';
        loadPlayers();
    });
}

function submitGuess() {
    const guess = document.getElementById('guess').value;

    fetch('/api/guess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: currentPlayer, guess })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('result').innerText = data.result;
        loadPlayers();
    });
}

function resetGame() {
    fetch('/api/reset')
        .then(res => res.json())
        .then(data => {
            document.getElementById('result').innerText = data.message;
            loadPlayers();
        });
}

function loadPlayers() {
    fetch('/api/players')
        .then(res => res.json())
        .then(data => {
            const list = data.map(p => `${p.name}: ${p.guesses.join(', ') || 'No guesses yet'} (${p.attempts} attempts)`);
            document.getElementById('players').innerText = list.join('\n');
        });
}