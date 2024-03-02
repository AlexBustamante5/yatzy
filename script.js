document.getElementById('roll-dice').addEventListener('click', function() {
    rollNotSelectedDice();
});

document.getElementById('reset-dice').addEventListener('click', function() {
    resetDice();
    resetSelections();
});

/*function to roll the dics */
function rollDice(numberOfDice, keep) {
    let rolls = [];
    for (let i = 0; i < numberOfDice; i++) {
        if (!keep[i]) {
            rolls.push(Math.floor(Math.random() * 6) + 1); // Rolls a single die
        } else {
            rolls.push(null); // Keeps the dice
        }
    }
    return rolls;
}

/*only roll not selected dice */
function rollNotSelectedDice() {
    const keep = [];
    for (let i = 1; i <= 5; i++) {
        const checkbox = document.getElementById(`keep-${i}`);
        keep.push(checkbox.checked);
    }
    let results = rollDice(5, keep);
    displayResults(results, keep);
}

function displayResults(rolls, keep) {
    rolls.forEach((result, index) => {
        if (result !== null) {
            const diceElement = document.getElementById(`dice-${index + 1}`);
            diceElement.firstChild.textContent = result; // Updates only the text node
        }
    });
}
/*clear all dice*/
function resetDice() {
    for (let i = 1; i <= 5; i++) {
        const diceElement = document.getElementById(`dice-${i}`);
        diceElement.firstChild.textContent = '0'; // Resets each dice display
    }
}
/*uncheck the checkboxes*/
function resetSelections() {
    for (let i = 1; i <= 5; i++) {
        const checkbox = document.getElementById(`keep-${i}`);
        checkbox.checked = false;
    }
}
