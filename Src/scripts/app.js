document.addEventListener('DOMContentLoaded', () => {
    const playerButtons = document.querySelectorAll('.player-btn');
    const playButton = document.getElementById('play-btn');
    const gameInterface = document.querySelector('.game-interface');
    const titleContainer = document.querySelector('.container-title2');

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
        gameInterface.classList.add('slide-left');
        titleContainer.classList.add('fade-out');
    });
});