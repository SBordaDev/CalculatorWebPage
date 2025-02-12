document.addEventListener('DOMContentLoaded', function() {
    let resultado = document.getElementById('resultado');
    let historial = document.getElementById('historial');
    let currentInput = ''; // Aquí se guardará el texto que está acumulando

    function agregarNumero(digit) {
        if (currentInput === '0' && digit !== '.') {
            currentInput = digit; // Si el primer número es 0, lo reemplazamos con el número presionado
        } else {
            currentInput += digit; // Si ya hay un número, agregamos el siguiente
        }
        resultado.textContent = currentInput; // Actualizamos el contenido del párrafo
    }

    // Agregar eventos a los botones de números
    let botonesNumero = document.querySelectorAll('#numeros button');
    botonesNumero.forEach(function(boton) {
        boton.addEventListener('click', function() {
            agregarNumero(boton.textContent);
        });
    });

    // Evento para el botón de igual (esto es opcional si quieres hacer una calculadora)
    document.getElementById('igual').addEventListener('click', function() {
        try {
            let resultadoOperacion = eval(currentInput); // Evaluamos el string como expresión matemática
            resultado.textContent = resultadoOperacion; // Mostramos el resultado de la operación
            historial.innerHTML += `<p>${currentInput} = ${resultadoOperacion}</p>`; // Guardamos el historial
            currentInput = '' + resultadoOperacion; // Actualizamos la entrada para poder seguir calculando
        } catch (error) {
            resultado.textContent = 'Error';
        }
    });
});
