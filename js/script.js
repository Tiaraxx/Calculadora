// Selecciona elementos importantes del DOM
const display = document.querySelector('.display');
const calculator = document.querySelector('.calculator'); // Contenedor de la calculadora
const themeToggleButton = document.getElementById('theme-toggle'); // Botón para cambiar el tema
let currentInput = '0';
let previousInput = '';
let operator = '';

// Función para actualizar el display
function updateDisplay() {
    display.textContent = currentInput;
}

// Función para manejar clics en botones de número
function handleNumber(number) {
    if (currentInput === '0') {
        currentInput = number; // Reemplaza el 0 inicial
    } else {
        currentInput += number; // Agrega el número al final del input actual
    }
    updateDisplay();
}

// Función para manejar clics en operadores (+, -, ×, ÷)
function handleOperator(op) {
    if (operator) calculate(); // Si ya hay un operador, calcula antes de asignar otro
    operator = op;
    previousInput = currentInput;
    currentInput = '0';
}

// Función para realizar el cálculo
function calculate() {
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (operator === '+') currentInput = (prev + current).toString();
    if (operator === '-') currentInput = (prev - current).toString();
    if (operator === '×') currentInput = (prev * current).toString();
    if (operator === '÷') currentInput = (prev / current).toString();

    operator = '';
    previousInput = '';
    updateDisplay();
}

// Función para manejar acciones especiales (AC, +/- y %)
function handleAction(action) {
    if (action === 'AC') { // Reinicia la calculadora
        currentInput = '0';
        previousInput = '';
        operator = '';
    } else if (action === '+/-') { // Cambia signo
        currentInput = (parseFloat(currentInput) * -1).toString();
    } else if (action === '%') { // Convierte a porcentaje
        currentInput = (parseFloat(currentInput) / 100).toString();
    }
    updateDisplay();
}

// Función para manejar clic en el botón igual
function handleEqual() {
    if (operator) calculate();
}

// Asigna eventos a cada botón
document.querySelector('.buttons').addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('number')) {
        handleNumber(target.textContent);
    } else if (target.classList.contains('operator')) {
        if (target.textContent === '=') {
            handleEqual();
        } else {
            handleOperator(target.textContent);
        }
    } else if (target.classList.contains('special')) {
        handleAction(target.textContent);
    }
});

// Cambia el tema entre claro y oscuro
themeToggleButton.addEventListener('click', () => {
    if (calculator.classList.contains('dark-theme')) {
        calculator.classList.remove('dark-theme');
        calculator.classList.add('light-theme');
    } else {
        calculator.classList.remove('light-theme');
        calculator.classList.add('dark-theme');
    }
});
