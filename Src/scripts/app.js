let players = []; // Almacenar jugadores
let currentPlayerIndex = 0; // Índice para saber qué jugador es el actual
let usedWords = new Set(); // Conjunto para almacenar las palabras usadas
let timer; // Variable para almacenar el temporizador
let currentPlayer; // Variable global para el jugador actual
let isTimeUp = false; // Variable para saber si el tiempo ha terminado
let timeUpModal = document.getElementById('timeUpModal'); // Modal
let timeUpMessage = document.getElementById('timeUpMessage'); // Mensaje del modal
let nextTurnBtn = document.getElementById('nextTurnBtn'); // Botón de siguiente turno

