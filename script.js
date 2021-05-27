
//Variable html
//texte
let score1 = document.getElementById('score1');
let score2 = document.getElementById('score2');
let current1 = document.getElementById('current1');
let current2 = document.getElementById('current2');
let dice = document.getElementById('dice');
let dot1 = document.getElementById('dot1');
let dot2 = document.getElementById('dot2');
let modal = document.getElementById('modal');
let modalok = document.getElementById('modalok');


//les images
let diceImg = [];
for (let i = 0; i < 6; i++) {
    diceImg[i] = './ressources/De'+ (i+1) + '.png';
}

//les son
let diceSounds = [4];
diceSounds[0] = new Audio('./ressources/dice1.mp3');
diceSounds[1] = new Audio('./ressources/dice2.wav');
diceSounds[2] = new Audio('./ressources/dice3.wav');
diceSounds[3] = new Audio('./ressources/dice4.wav');
oneSound = new Audio('./ressources/false.wav');
newGameSound = new Audio('./ressources/new-game.wav');
holdSound = new Audio('./ressources/take.wav');
winSound = new Audio('./ressources/win.mp3');


//les boutons
let newGame = document.getElementById('newGame');
let rollDice = document.getElementById('rollDice');
let hold = document.getElementById('hold');

//variable javascript
let diceRolls = [4];

//les fonctiones


function newTurn() {
    if(dot1.style.fillOpacity ==1){
        dot1.style.fillOpacity = 0;
        dot2.style.fillOpacity = 1;
    }
    else{
        dot1.style.fillOpacity = 1;
        dot2.style.fillOpacity = 0;
    }
    current1.textContent = 0;
    current2.textContent = 0;

}

function startNewGame() {
    newGameSound.play();
    score1.textContent = 0;
    score2.textContent = 0;
    newTurn();
}

function playDice() {
    let i = Math.floor(Math.random()*5);
    diceSounds[i].play();
}



//initialisation du jeu
startNewGame()


//les boutons : intéractions
newGame.onclick = () => {
    if(confirm("Voulez-vous demarrer une nouvelle partie ?"))
    {
        startNewGame()
    }
}

rollDice.onclick = () =>{
    playDice();
    for(let i =0;i<4;i++){
        diceRolls[i]= Math.floor(Math.random()*6);
    }

    let lastDice = diceRolls[diceRolls.length-1];
    dice.src = diceImg[lastDice];

    if(lastDice ==0){
        if(dot1.style.fillOpacity ==1)
        {
            current1.textContent = 0;
        }
        else{
            current2.textContent = 0;
        }
        modal.classList.add('is-active') ;   //modifier par un pop-up
        newTurn();
    }
    else{
        if(dot1.style.fillOpacity ==1)
        {
            current1.textContent = parseInt(current1.textContent) + lastDice + 1;
        }
        else{
            current2.textContent = parseInt(current2.textContent) + lastDice + 1;
        }
    }
}

hold.onclick = () =>{
    if(dot1.style.fillOpacity ==1){
        score1.textContent = parseInt(score1.textContent) + parseInt(current1.textContent);
        if(parseInt(score1.textContent) >= 10){
            
            alert("Joueur 1 à gagné !!")
            winSound.play();
            return;
        }
    }
    else{
        score2.textContent = parseInt(score2.textContent) + parseInt(current2.textContent);
        if(parseInt(score2.textContent) >= 10){
            alert("Joueur 2 à gagné !!")
            winSound.play();
            return;
        }
    }
    holdSound.play();
    newTurn();
    
}

modalok.onclick = () =>{
    modal.classList.remove('is-active');
}