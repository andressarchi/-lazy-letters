document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('play-btn');
    const gameInterface = document.querySelector('.game-interface');
    const titleContainer = document.querySelector('.container-title2');
    const gameArea = document.querySelector('.game-area');
    const randomWordElement = document.getElementById('random-word');
    const timerElement = document.getElementById('timer');

    let selectedPlayers = 4;
    let timerInterval;
   



    //Funcion del boton play
    playButton.addEventListener('click', () => {
        console.log(`Iniciando juego con ${selectedPlayers} jugadores`);
        gameInterface.classList.add('slide-left');
        titleContainer.classList.add('fade-out');
        
        setTimeout(() => {
            gameArea.style.display = 'block';
            gameArea.classList.add('fade-in');
            generateRandomWord();
            startTimer();
        }, 1000);
    });

    //Funcion que genera una letra aleatoria
    function generateRandomWord() {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let word = '';
        for (let i = 0; i < 1; i++) {
            word += alphabet[Math.floor(Math.random() * alphabet.length)];
        }
        randomWordElement.textContent = word;
    }


    //Funcion para el temporizador
    function startTimer() {
        clearInterval(timerInterval);
        seconds = 60; // Reinicio a 60 segundos
        updateTimerDisplay();
        timerInterval = setInterval(() => {
            seconds--;
            updateTimerDisplay();
            if (seconds <= 0) {
                clearInterval(timerInterval);
                generateRandomWord(); // Generamos una nueva letra
                startTimer(); // Reinicio del temporizador
            }
        }, 1000);
    }

    //Funcion para actualizar el temporizador
    function updateTimerDisplay() {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timerElement.textContent = `${padNumber(minutes)}:${padNumber(remainingSeconds)}`;
    }

    function padNumber(number) {
        return number.toString().padStart(2, '0');
    }

});