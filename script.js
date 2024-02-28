document.getElementById('roll-dice').addEventListener('click', function() {
    let results = rollDice(5); // Rolls 5 dice
    displayResults(results);
});

document.getElementById('reset-dice').addEventListener('click', function() {
    resetDice(); // resets dice when the reset-dice button is clicked
});

function rollDice(numberOfDice) {
    let rolls = [];
    for (let i = 0; i < numberOfDice; i++) {
        rolls.push(Math.floor(Math.random() * 6) + 1); // Rolls a single die and adds result to rolls array
    }
    return rolls;
}

function displayResults(rolls) {
    rolls.forEach((result, index) => {
        const diceElement = document.getElementById(`dice-${index + 1}`);
        diceElement.textContent = result; // Updates each dice display
    });
}

function resetDice() {
    for (let i = 1; i <= 5; i++) {
        const diceElement = document.getElementById(`dice-${i}`);
        diceElement.textContent = ''; // Clears each dice display
    }
}