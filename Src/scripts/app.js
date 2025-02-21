let players = []; // Almacenar jugadores
const message = document.getElementById(`message`);
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
            alert (`¡Tiempo agotado para ${currentPlayer.name}!`)
             // Mostrar el modal
            isTimeUp = true; // Marcar que el tiempo ha terminado
            nextTurn();
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

function nextTurn() {
    if (isTimeUp) {
        currentPlayerIndex++; // Pasa al siguiente jugador
        if (currentPlayerIndex < players.length) {
        message.style.display="none"
            updateTurn(); // Iniciar el turno del siguiente jugador
        } else {
            determineWinner(); // Si se acaban los jugadores, termina el juego
        }
    }
}

function determineWinner() {
    clearInterval(timer); // Detener el temporizador

    // Verificar si hay jugadores antes de intentar determinar un ganador
    if (players.length === 0) {
        document.getElementById("winner").innerText = "No hay jugadores en el juego.";
        return;
        
        document.getElementById("winner").innerText = `Juego terminado! Empate entre: ${tiedNames} con ${winner.wordCount} palabras.`;
        document.getElementById("message").style.display="none"
        document.getElementById("timer").style.display="none"
        document.getElementById("random-wprd").style.display="none"
        document.getElementById("word-input").style.display="none"
        document.getElementById("word-list").style.display="none"
        document.getElementById("current-player").style.display="none"
    }

    // Obtener al jugador con más palabras
    const winner = players.reduce((max, player) => (player.wordCount > max.wordCount ? player : max));

    // Filtrar los jugadores empatados
    const tiedPlayers = players.filter(player => player.wordCount === winner.wordCount);

    if (tiedPlayers.length > 1) {
        let tiedNames = tiedPlayers.map(player => player.name).join(", ");
        
        document.getElementById("winner").innerText = `Juego terminado! Empate entre: ${tiedNames} con ${winner.wordCount} palabras.`;
        document.getElementById("message").style.display="none"
        document.getElementById("timer").style.display="none"
        document.getElementById("random-wprd").style.display="none"
        document.getElementById("word-input").style.display="none"
        document.getElementById("word-list").style.display="none"
        document.getElementById("current-player").style.display="none"
    } else {
        message.style.display="none"
        document.getElementById("winner").innerText = `Juego terminado! Ganador: ${winner.name} con ${winner.wordCount} palabras. Las palabras son: ${winner.words.join(", ")}`;

        
        document.getElementById("winner").innerText = `Juego terminado! Empate entre: ${tiedNames} con ${winner.wordCount} palabras.`;
        document.getElementById("message").style.display="none"
        document.getElementById("timer").style.display="none"
        document.getElementById("random-wprd").style.display="none"
        document.getElementById("word-input").style.display="none"
        document.getElementById("word-list").style.display="none"
        document.getElementById("current-player").style.display="none"
    }
}

function submitWord(e) {
    if (e.key === 'Enter' && !isTimeUp) { // Verificar si el tiempo aún no ha terminado
        const wordInput = document.getElementById("word-input");
        const word = wordInput.value.trim().toUpperCase(); // Convertir la palabra a mayúsculas
        if (!word) {
            message.style.display="block"
            message.innerText = "Debe ingresar una palabra antes de enviar.";
            return;
        }
        if (!word.startsWith(currentPlayer.letter)) {
            message.style.display="block"
            message.innerText = "La palabra no empieza con la letra asignada.";
            return;
        }
        if (usedWords.has(word)) {
            message.style.display="block"
            message.innerText = "Esta palabra ya ha sido usada.";
            
            return;
        }
        // Guardar la palabra en el array del jugador
        currentPlayer.words.push(word);
        usedWords.add(word);
        currentPlayer.wordCount++;
        
        let listIndex = document.getElementById("word-list");
        
        // Limpiar el campo de texto
        wordInput.value = "";
        
        // Mostrar las palabras que el jugador ha ingresado
        listIndex.innerHTML = `${currentPlayer.name} ha ingresado las siguientes palabras: ${currentPlayer.words.join(", ")}`;

        // Mostrar el contenedor solo si hay palabras
        if (currentPlayer.words.length > 0) {
            listIndex.style.display = "block"; // Mostrar el recuadro de las palabras
        } else {
            listIndex.style.display = "none"; // Ocultar el recuadro si no hay palabras
        }
    }
}
