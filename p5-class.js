class Player {
    constructor(name) {
        this.name = name;
        this.attempts = 0;
        this.guesses = [];
    }

    addGuess(guess) {
        this.attempts++;
        this.guesses.push(guess);
    }

    reset() {
        this.attempts = 0;
        this.guesses = [];
    }

    getSummary() {
        return {
            name: this.name,
            attempts: this.attempts,
            guesses: this.guesses
        };
    }
}

module.exports = { Player };
