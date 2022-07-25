const hiddenWord = document.getElementById('hidden-word');
const keyboard = document.getElementById('btn-keyboard');
const wrongLetters = document.getElementById('wrong-letters');
const hint = document.getElementById('hint');
const lives = document.getElementById('chances-left');
const results = document.getElementById('result');
const tagImgLives = document.getElementById('img-mistake');

const HIDE_LETTER = '_';

const imgWin = 'imgs/pexels-luna-lovegood-1172060.jpg';
const imgLose = 'imgs/pexels-musa-çolak-12738795.jpg';

const imgsLives = [
    'imgs/pexels-pixabay-39317.jpg',
    'imgs/pexels-karolina-grabowska-6958714.jpg',
    'imgs/pexels-helena-lopes-3705255.jpg',
    'imgs/pexels-pixabay-34504.jpg',
    'imgs/pexels-gantas-vaičiulėnas-5125837.jpg',
    'imgs/pexels-pixabay-532310.jpg',
];

let chancesLeft = imgsLives.length;

const alphabet = ['a','b','c','d','e','f','g','h',
'i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','y','z'];
// Starter img
tagImgLives.src = imgsLives[chancesLeft-1];

let chosenOption = '';

// The keyboard has no semantic value, so make it through code
let keyboardHtml = '';
alphabet.forEach((a)=>{
    keyboardHtml += 
    `<button class="btn-keyboard" onclick="guessLetter('${a}'); this.disabled=true;" type="button">${a.toUpperCase()}</button>`;
});

keyboard.innerHTML = keyboardHtml;

var trivias = [
    {
        word:"soccer",
        hint:"Brazil's favourite sport"
    },
    {
        word:"tim hortons",
        hint:"Popular Canadian cafe brand"
    }
];


function createTryAgain(){
    document.getElementById('container-try-again').innerHTML 
    = `<button id="btn-try-again" onclick="reset();" type="button">PLAY AGAIN</button>`;
}

function removeTryAgain(){
    document.getElementById('container-try-again').innerHTML 
    = '';
}

function gameOver(){
    tagImgLives.src = imgLose;
    const btns = document.getElementsByClassName('btn-keyboard');
    for (let index = 0; index < btns.length; index++) {
        btns[index].disabled = true;
    }
    
    createTryAgain();
    
    results.innerHTML = 'LOSE! There are no dogs in the picture, and that\'s sad';
}

function win(){
    tagImgLives.src = imgWin;
    const btns = document.getElementsByClassName('btn-keyboard');
    for (let index = 0; index < btns.length; index++) {
        btns[index].disabled = true;
    }

    createTryAgain();

    results.innerHTML = 'WIN! Now go pet a dog!';
}



function rndWord(){
    //reset();
    const rnd = Math.round(Math.random()*(trivias.length-1));
    chosenOption = trivias[rnd];
    hint.innerHTML = chosenOption['hint'];
}

rndWord();

function enableKeyboard(){
    const btns = document.getElementsByClassName('btn-keyboard');
    for (let index = 0; index < btns.length; index++) {
        btns[index].disabled = false;   
    }
}

function disableKeyboard(){
    const btns = document.getElementsByClassName('btn-keyboard');
    for (let index = 0; index < btns.length; index++) {
        btns[index].disabled = true;   
    }
}

// Choose random
//const rnd = Math.round(Math.random()*(trivias.length-1));

//const chosenOption = trivias[rnd];

//hint.innerHTML = chosenOption['hint'];


let guessedLetters = [];

const size = chosenOption['word'].length;
let lettersLeft = size;


let guessed = '';


function initGuesses(){
    for (let index = 0; index < chosenOption['word'].length; index++) {
        if(chosenOption['word'][index]===' '){
            --lettersLeft;
            guessed += ' ';
        }else{
            guessed += HIDE_LETTER;
        }
        
    }
}

// ignore spaces

initGuesses();

function addSpaces(word){
    return word.split('').join(' ');
}



function guessLetter(letter){
    if(guessedLetters.indexOf(letter)>=0){
        console.log('letter already guessed');
        return;
    }
    guessedLetters.push(letter);
    const cache = chosenOption['word'];
    let found = false;
    let newWord = '';
    
    for (let index = 0; index < cache.length; index++) {
        if(cache[index]===letter){
            found = true;
            --lettersLeft;
            newWord += cache[index];
        }else{
            newWord += guessed[index];
        }
    }

    guessed = newWord;
    
    if(!found){
        wrongLetters.innerHTML += letter;
        --chancesLeft;
        tagImgLives.src = imgsLives[chancesLeft-1];
        if(chancesLeft<=0){
            gameOver();
        }
        lives.innerHTML = chancesLeft;
    }
    
    if(lettersLeft===0){
        win();
    }
    
    updateHiddenWord(guessed);
}

// Update UIs
function updateLives(){
    tagImgLives.src = imgsLives[chancesLeft-1];
    lives.innerHTML = chancesLeft;
}

updateLives();

function updateHiddenWord(word){
    hiddenWord.innerHTML = addSpaces(word);    
}

updateHiddenWord(guessed);

function reset(){
    chancesLeft = imgsLives.length;
    updateLives();
    guessedLetters = [];
    hiddenWord.innerHTML = '';
    wrongLetters.innerHTML = '';
    guessed = '';
    initGuesses();
    updateHiddenWord(guessed);
    results.innerHTML = '';
    enableKeyboard();
    removeTryAgain();
    rndWord();
}

