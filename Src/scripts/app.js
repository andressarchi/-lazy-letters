let players = []; // Almacenar jugadores
let currentPlayerIndex = 0; // Índice para saber qué jugador es el actual
let usedWords = new Set(); // Conjunto para almacenar las palabras usadas
let timer; // Variable para almacenar el temporizador
let currentPlayer; // Variable global para el jugador actual
let isTimeUp = false; // Variable para saber si el tiempo ha terminado
let timeUpModal = document.getElementById('timeUpModal'); // Modal
let timeUpMessage = document.getElementById('timeUpMessage'); // Mensaje del modal
let nextTurnBtn = document.getElementById('nextTurnBtn'); // Botón de siguiente turno

document.addEventListener('DOMContentLoaded', () => {
    const playerButtons = document.querySelectorAll('.player-btn');
    const playButton = document.getElementById('play-btn');
    const gameInterface = document.querySelector('.game-interface');
    const titleContainer = document.querySelector('.container-title2');
    const gameArea = document.querySelector('.game-area');
    const randomWordElement = document.getElementById('random-word');
    const timerElement = document.getElementById('timer');
    const wordInput = document.getElementById('word-input');
    const messageElement = document.getElementById('message');
    const winnerElement = document.getElementById('winner');
    let selectedPlayers = 2;

    playerButtons.forEach(button => {
        button.addEventListener('click', () => {
            playerButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            selectedPlayers = parseInt(button.dataset.players);
        });
    });

    playButton.addEventListener('click', () => {
        console.log(`Iniciando juego con ${selectedPlayers} jugadores`);
        gameInterface.style.display = 'none';
        gameArea.style.display = 'block';
        titleContainer.classList.add('fade-out');
        startGame(selectedPlayers);
    });

    wordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !isTimeUp) {
            submitWord(e);  // Pasar el evento al submitWord solo si el tiempo no ha terminado
        }
    });

    // Cerrar el modal cuando el usuario haga clic en la "X" o en el fondo
    document.querySelector('.close-btn').addEventListener('click', () => {
        timeUpModal.style.display = 'none';
    });

    // Pasar al siguiente turno al hacer clic en el botón del modal
    nextTurnBtn.addEventListener('click', () => {
        timeUpModal.style.display = 'none'; // Cerrar el modal
        nextTurn(); // Pasar al siguiente turno
    });
});

function startGame(numPlayers) {
    players = Array.from({ length: numPlayers }, (_, i) => ({
        name: `Jugador ${i + 1}`,
        letter: getRandomLetter(), // Letra aleatoria
        wordCount: 0, // Contador de palabras
        words: [] // Aquí se almacenarán las palabras de cada jugador
    }));

    currentPlayerIndex = 0; // Turno del primer jugador
    updateTurn(); // Iniciar el primer turno
}

function getRandomLetter() {
    let wordSTR = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Genera una letra aleatoria
    document.getElementById('random-word').textContent = wordSTR; // Muestra la letra aleatoria en la interfaz
    return wordSTR;
}

function startTimer() {
    let timeLeft = 60; // Tiempo inicial
    document.getElementById('timer').innerText = timeLeft; // Contador del tiempo
    clearInterval(timer); // Limpiar cualquier temporizador anterior

    // Iniciar el temporizador
    isTimeUp = false; // Reiniciar el estado de "tiempo agotado"
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;

        // Detener el temporizador cuando llegue a cero
        if (timeLeft <= 0) {
            clearInterval(timer);
            timeUpMessage.innerText = `¡Tiempo agotado para ${currentPlayer.name}!`; // Mensaje del modal
            timeUpModal.style.display = 'block'; // Mostrar el modal
            isTimeUp = true; // Marcar que el tiempo ha terminado
        }
    }, 1000); // Se actualiza cada segundo
}

function updateTurn() {
    if (currentPlayerIndex >= players.length) {
        determineWinner(); // Si no hay más jugadores, termina el juego
        return;
    }

    currentPlayer = players[currentPlayerIndex]; // Definir el jugador actual
    document.getElementById("current-player").innerText = currentPlayer.name; // Muestra el nombre del jugador
    document.getElementById("random-word").innerText = currentPlayer.letter; // Muestra la letra aleatoria del jugador
    document.getElementById("message").innerText = ""; // Limpia el mensaje
    document.getElementById("word-input").value = ""; // Limpia el campo de texto

    startTimer(); // Iniciar el temporizador
}
