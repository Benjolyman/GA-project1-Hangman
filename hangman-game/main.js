//variables

let winner;
let incorrectGuesses = 0;
let onScreenWord = [];
const wordList = ["Cow", "Sheep", "Pig", "Chicken", "Horse", "Goat", "Duck", "Turkey", "Donkey", "Rabbit"]

//query selectors

const keyboard = document.querySelectorAll('.key');

const blankLetter = document.querySelector('#wording');

const resetBtn = document.querySelector('#reset-button');

const gameMsg = document.querySelector('#game-message');

const chances = document.querySelector('#chances');

const letters = document.querySelectorAll('.letters')


//functions


//word is picked and pushed empty slots are pushed to screen
const randomWord = () => {
    ranIndex = Math.floor(Math.random() * wordList.length);
    return wordList[ranIndex];
}

const selectedWord = randomWord().split('');

selectedWord.forEach((element) => {
    onScreenWord.push('_');
});

onScreenWord.forEach((element) => {
    let li = document.createElement('li');
    li.textContent = element;
    li.classList.add('letters');
    blankLetter.appendChild(li);

});


//resets game
const resetGame = () => {
    location.reload();
};

//disables keyboard which is used for checkwin and checkloss
const disableKeyboard = () => {
    keyboard.forEach((element) => {
        element.disabled = true;
    });
}

const checkWin = () => {
    if (onScreenWord.join('') === selectedWord.join('')) {
        gameMsg.innerText = 'Nice!'
        disableKeyboard();
    }
}

const checkLoss = () => {
    if (incorrectGuesses === 6) {
        
        gameMsg.innerText = `The correct word was ${selectedWord.join('')}`;
        disableKeyboard();
    }
};



//event listeners

//determines whether the selected key matches the selected word or not and lets the user know whether or not the chosen letter is right or wrong
keyboard.forEach((key) => {
    key.addEventListener('click', event => {
        let clickedLetter = event.target.innerText;
        if (key.disabled) return;

        if (selectedWord.includes(clickedLetter)) {
            selectedWord.forEach((element, index) => {
                if (element === clickedLetter) {
                    onScreenWord[index] = element;
                    let li = blankLetter.querySelectorAll('li');
                    li[index].textContent = element;
                    event.target.style.backgroundColor = 'green';
                    event.target.style.color = 'white';
                }
            })
        } else if (!selectedWord.includes(clickedLetter) && incorrectGuesses <= 5) {
            incorrectGuesses += 1;
            chances.src = `heart assets/heart ${incorrectGuesses}.png`
            event.target.style.backgroundColor = 'red';
            event.target.style.color = 'white';
        }
        event.target.disabled = true;
        checkWin();
        checkLoss();
    })
});




resetBtn.addEventListener('click', resetGame)



