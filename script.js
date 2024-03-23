document.getElementById('roll-dice').addEventListener('click', function() {

    if(rolls_left >0){
        rollNotSelectedDice();
        updateScore();
    }
    
});

document.getElementById('reset-dice').addEventListener('click', function() {
    resetDice();
    resetSelections();
    resetScore();
});

let rolls_left = 3;
let score = 0;

/*function to roll the dice */
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
    rolls_left --;
    updateRollsLeftDisplay();
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
/* function to update the display of rolls left*/
function updateRollsLeftDisplay() {
    document.getElementById('rolls-left').textContent = `Rolls Left: ${rolls_left}`;
}
/*clear all dice*/
function resetDice() {
    for (let i = 1; i <= 5; i++) {
        const diceElement = document.getElementById(`dice-${i}`);
        diceElement.firstChild.textContent = '0'; // Resets each dice display
    }
    rolls_left = 3;
    updateRollsLeftDisplay();
}
/*uncheck the checkboxes*/
function resetSelections() {
    for (let i = 1; i <= 5; i++) {
        const checkbox = document.getElementById(`keep-${i}`);
        checkbox.checked = false;
    }
}

// Event listeners for each score type button
document.getElementById('ones').addEventListener('click', function() {
    calculateScore('ones');
});
document.getElementById('twos').addEventListener('click', () => calculateScore('twos'));
document.getElementById('threes').addEventListener('click', () => calculateScore('threes'));
document.getElementById('fours').addEventListener('click', () => calculateScore('fours'));
document.getElementById('fives').addEventListener('click', () => calculateScore('fives'));
document.getElementById('sixes').addEventListener('click', () => calculateScore('sixes'));
document.getElementById('three-of-a-kind').addEventListener('click', () => calculateScore('threeOfAKind'));
document.getElementById('four-of-a-kind').addEventListener('click', () => calculateScore('fourOfAKind'));
document.getElementById('full-house').addEventListener('click', () => calculateScore('fullHouse'));
document.getElementById('chance').addEventListener('click', () => calculateScore('chance'));
document.getElementById('yatzy').addEventListener('click', function() {
    calculateScore('yatzy');
});

function getCurrentRolls() {
    let rolls = [];
    for (let i = 1; i <= 5; i++) {
        const diceValue = parseInt(document.getElementById(`dice-${i}`).firstChild.textContent, 10);
        if (!isNaN(diceValue)) {
            rolls.push(diceValue);
        }
    }
    return rolls;
}
// Function to display the score
function displayScore(score) {
    document.getElementById('score').textContent = `Score: ${score}`;
}
// Function to calculate and display score based on the selected score type
function calculateScore(scoreType) {
    let currentRolls = getCurrentRolls();
    switch (scoreType) {
        case 'ones':
            updateScoreIfValid(currentRolls, 1, 2);
            break;
        case 'twos':
            updateScoreIfValid(currentRolls, 2, 4);
            break;
        case 'threes':
            updateScoreIfValid(currentRolls, 3, 6);
            break;
        case 'fours':
            updateScoreIfValid(currentRolls, 4, 8);
            break;
        case 'fives':
            updateScoreIfValid(currentRolls, 5, 10);
            break;
        case 'sixes':
            updateScoreIfValid(currentRolls, 6, 12);
            break;
        case 'threeOfAKind':
            score += calculateScoreBasedOnKind(currentRolls, 3);
            break;
        case 'fourOfAKind':
            score += calculateScoreBasedOnKind(currentRolls, 4);
            break;
        case 'fullHouse':
            score += 25;
            break;
        case 'chance':
            score = currentRolls.reduce((acc, val) => acc + val, 0);
            break;
        case 'yatzy':
            score += 50;
            break;
    }
    displayScore(score);

}
function updateScoreIfValid(rolls, number, pointsToAdd) {
    if (rolls.filter(roll => roll === number).length > 0) {
        score += pointsToAdd;
    }
}

// Simplified function to calculate the score based on the number of kind
function calculateScoreBasedOnKind(rolls, kind) {
    let counts = rolls.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
    }, {});
    for (let num in counts) {
        if (counts[num] >= kind) {
            return rolls.reduce((acc, val) => acc + val, 0);
        }
    }
    return 0; // Return 0 if the condition is not met
}


// Function to reset the score
function resetScore() {
    score = 0;
    displayScore(score);
}
