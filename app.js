const audio1 = document.getElementById('audio');
function mostrarCirculo(event) {
    const circulo = document.getElementById('circulo');
    circulo.style.display = 'block';

    const x = event.clientX;
    const y = event.clientY;

    circulo.style.left = x + 'px';
    circulo.style.top = y + 'px';

    setTimeout(() => {
        circulo.style.display = 'none';
    }, 500); // Oculta el círculo después de 500 milisegundos (ajusta según sea necesario)
}


const game = {
    buttonOrder: [], // Almacenará la secuencia de botones generada por el juego
    playerOrder: [], // Almacenará la secuencia de botones ingresada por el jugador// Puntaje del jugador
    level: 1,
    position: 0, // Nivel actual
    buttons: document.querySelectorAll(".button"),
    startButton: document.getElementById("start-button"),

    init() {
        this.startButton.addEventListener("click", () => this.startGame());
        // Agregamos el oyente de eventos a cada botón una vez.
        this.buttons.forEach((button) =>
            button.addEventListener("click", (event) =>
                this.checkButton(event.target.id)
            )
        );
    },

    startGame() {
        this.startButton.disabled = true;
        this.startButton.style.backgroundColor = 'green';
        this.playRound();
    },

    playRound() {
        this.playerOrder.length = 0; // Reinicia la secuencia del jugador
        this.showOrder();
    },

    showOrder() {
            const randomButton = this.buttons[Math.floor(Math.random() * this.buttons.length)];
            this.buttonOrder.push(randomButton.id);
        console.log(`SECUENCIAS DE BOTONES DEL NIVEL ${this.level}: ${this.buttonOrder}`)
        let i = 0;
        const intervalId = setInterval(() => {
            if (i < this.buttonOrder.length) {
                const button = this.buttonOrder[i];
                this.highlightButton(button);
                i++;
            } else {
                clearInterval(intervalId);
            }
        }, 1200);
    },

    highlightButton(buttonId) {
        const button = document.getElementById(buttonId);

        // Desactivar pointer-events para evitar hover mientras se ejecuta la función
        if (button) {
            const originalPointerEvents = button.style.pointerEvents;
            button.style.pointerEvents = 'none';

            // Realizar la animación de resaltado
            button.style.border = "5px solid white";
            button.style.outline = "3 px solid black";
            audio1.play();
            setTimeout(() => {
                // Restaurar pointer-events después de la animación
                button.style.border = "3px solid transparent";
                button.style.pointerEvents = originalPointerEvents;
            }, 600);
        }
    },

    checkButton(clickedButtonId) {
        if (this.isButtonCorrect(clickedButtonId)) {
            this.position++;
            if (this.isLevelCompleted()) {
                this.nextLevel();
            }
        } else {
            console.log("HAS LLEGADO AL NIVEL " + this.level);
            console.log("HAS CONSEGUIDO COMPLETAR " + this.level - 1 + " NIVELES");
            console.log("GAME OVER :(");
            this.startButton.style.backgroundColor = 'red';
            this.endGame();
        }
    },

    isButtonCorrect(clickedButtonId) {
        const checkButton = this.buttonOrder[this.position];
        const buttonRegex = /^(red|blue|green|yellow)$/i;
        console.log("EL BOTÓN CORRECTO: " + checkButton);
        console.log("EL BOTÓN QUE PULSÓ: " + clickedButtonId);
        console.log("---------------------------------------");
        if (buttonRegex.test(clickedButtonId)) {
            return clickedButtonId === checkButton;
        }
    },

    isLevelCompleted() {
        return this.position === this.buttonOrder.length;
    },

    nextLevel() {
        document.getElementById('counter').textContent = this.level;
        this.level++;
        this.position = 0;
        this.playRound();
    },

    endGame() {
        alert(`¡Juego terminado! Has conseguido completar: ${this.level - 1} niveles`);
        this.buttonOrder.length = 0;
        this.playerOrder.length = 0;
        this.level = 1; // Reinicia el nivel
        this.position = 0;
        this.startButton.disabled = false;
    },
};

game.init();
