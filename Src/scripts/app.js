// Juego basado en jugadores y temporizador

let players = [];
let currentPlayerIndex = 0;
let gameInterval;
let timer = 60; // 60 segundos por jugador

function startGame(playerCount) {
    players = Array(playerCount).fill(null);
    currentPlayerIndex = 0;

    document.querySelector(".game-interface").style.display = "none";
    document.querySelector(".game-area").style.display = "block";
    
    startTurn();
}

function startTurn() {
    let currentPlayer = `Jugador ${currentPlayerIndex + 1}`;
    document.getElementById('current-player').textContent = `Es tu turno, ${currentPlayer}`;
    document.getElementById('message').textContent = "¡Escribe una palabra!";
    document.getElementById('word-input').disabled = false;
    document.getElementById('word-input').focus();

    startTimer();
}

function startTimer() {
    let timerElement = document.getElementById('timer');
    
    gameInterval = setInterval(() => {
        if (timer > 0) {
            timer--;
            timerElement.textContent = `00:${timer < 10 ? '0' : ''}${timer}`;
        } else {
            clearInterval(gameInterval);
            alert("¡Tiempo agotado! El turno ha terminado.");
            nextTurn();
        }
    }, 1000);
}

function submitWord(event) {
    if (event.key === 'Enter') {
        let wordInput = document.getElementById('word-input');
        let word = wordInput.value.trim();
        
        if (word.length > 0) {
            document.getElementById('word-list').innerHTML += `<li>${word}</li>`;
            wordInput.value = ''; // Limpiar campo de texto

            nextTurn();
        } else {
            alert("Escribe una palabra válida.");
        }
    }
}

function nextTurn() {
    currentPlayerIndex++;
    if (currentPlayerIndex >= players.length) {
        currentPlayerIndex = 0; // Vuelve al primer jugador
    }

    startTurn(); // Inicia el siguiente turno
}
