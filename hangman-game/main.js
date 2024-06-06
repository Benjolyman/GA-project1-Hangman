//todo

//set win con (set win message)
//set lose con (block functions when game is lost)
//expand word bank
//display lives left
//create reset button
//show hint `maybe`
//log already selected incorrect words and show 




//variables

let winner;
let incorrectGuesses = 0;
let onScreenWord = [];

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

console.log(selectedWord);

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


const checkWin = () => {
    if (onScreenWord.join('') === selectedWord.join('')) {
        gameMsg.innerText = 'Nice!'
    }   
}

const checkLoss = () => {
    if (incorrectGuesses === 5){
        console.log('loser');
    }
};

const disableKeyboard = () => {
    keyboard.forEach((element) => {
        element.disabled = true;
    });
}


//event listeners

// window.onload = () => {
//     init();
// }

keyboard.forEach((key) => {
    key.addEventListener('click', event => {
        let clickedLetter = event.target.innerText;
        
        if (selectedWord.includes(clickedLetter)) {
            selectedWord.forEach((element, index) => {
                if (element === clickedLetter) {
                    onScreenWord[index] = element;
                    let li = blankLetter.querySelectorAll('li');
                    li[index].textContent = element;
                }
            })
        } else if (!selectedWord.includes(clickedLetter) && incorrectGuesses < 5) {
            incorrectGuesses += 1;
            // gameMsg.innerHTML = (`You have used ${incorrectGuesses}/6 chances`);
            chances.src = `heart assets/heart ${incorrectGuesses}.png`
            
        } else { 
            gameMsg.innerHTML = (`The correct word was ${selectedWord.join('')}`);
            chances.src = `heart assets/heart 6.png`;
            
        };
        checkWin();
        checkLoss();
    })
});




resetBtn.addEventListener('click', resetGame)



