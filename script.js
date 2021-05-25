let score1 = document.getElementById('score1');
let score2 = document.getElementById('score2');
let current1 = document.getElementById('current1');
let current2 = document.getElementById('current2');

let turn1 = true;
let dot1 = document.getElementById('dot1');
let dot2 = document.getElementById('dot2');


let diceRolls = [4];

let newGame = document.getElementById('newGame');
let rollDice = document.getElementById('rollDice');
let hold = document.getElementById('hold');


newGame.onclick = () => {

    if(confirm("Voulez-vous demarrer une nouvelle partie ?"))
    {
        turn(turn1);
        score1.textContent = '0';
        score2.textContent = '0';
        current1.textContent = '0';
        current2.textContent = '0';
    }
}


rollDice.onclick = () =>{
    for(let i =0;i<4;i++){
        diceRolls[i]= Math.floor(Math.random()*6);
        console.log(diceRolls[i]);
    }
}

function turn(turn1) {
    if(turn1){
        dot1.style.fillOpacity = '1';
        dot2.style.fillOpacity = '0';
    }
    else{
        dot1.style.fillOpacity = '0';
        dot2.style.fillOpacity = '1';
    }
}

turn(!turn1);