
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
let winmodal = document.getElementById('winmodal');
let winmodalok = document.getElementById('winmodalok');
let player1 = document.getElementById('player1');
let player2 = document.getElementById('player2');
let P1 = document.getElementById('P1');
let P2 = document.getElementById('P2');

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
let turn1 = true;

//les fonctions

function changeDisplay(){
    if(turn1 && window.innerWidth <= 680)
    {
         P2.style.display = 'none';
         P1.style.display = 'block';
    }
    else{
         P1.style.display = 'none';
         P2.style.display = 'block';
    }
    if(window.innerWidth > 680)
    {
     P1.style.display = 'block';
     P2.style.display = 'block';
    }
 
 }

function newTurn() {
    if(dot1.style.fillOpacity ==1){
        turn1 = false;
        dot1.style.fillOpacity = 0;
        dot2.style.fillOpacity = 1;
    }
    else{
        dot1.style.fillOpacity = 1;
        dot2.style.fillOpacity = 0;
        turn1 = true;
    }
    current1.textContent = 0;
    current2.textContent = 0;
    changeDisplay();
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
        modal.classList.add('is-active');   //modifier par un pop-up
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
        if(parseInt(score1.textContent) >= 100){
            
            win(1);
            winSound.play();
            return;
        }
    }
    else{
        score2.textContent = parseInt(score2.textContent) + parseInt(current2.textContent);
        if(parseInt(score2.textContent) >= 100){
            win(2);
            winSound.play();
            return;
        }
    }
    holdSound.play();
    newTurn();
    
}



function win(player)
{
    winner = document.getElementById('winner');
    if(player ==1)
    {
        winner.textContent = "BRAVO " + player1.textContent + " !";
    }
    else
    {
        winner.textContent = "BRAVO " + player2.textContent + " !";
    }
    winmodal.classList.add('is-active');
}


modalok.onclick = () =>{
    modal.classList.remove('is-active');
}

winmodalok.onclick = () =>{
    winmodal.classList.remove('is-active');
    startNewGame();
}