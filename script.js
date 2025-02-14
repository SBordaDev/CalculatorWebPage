document.addEventListener('DOMContentLoaded', function() {
    let resultado = document.getElementById('resultado');
    let historial = document.getElementById('historial');
    var currentInput = ''; // Aquí se guardará el texto que está acumulando

    /* Botones de los Numeros */
    let botonesNumero = document.querySelectorAll('#numeros button');
    botonesNumero.forEach(function(boton) {
        boton.addEventListener('click', function() {
            agregarNumero(boton.textContent);
        });
    });

    function agregarNumero(digit) {
        let partes = currentInput.split(/[\+\-\x\/\%]/); // Divide la entrada en números usando operadores como separadores
    let ultimoNumero = partes[partes.length - 1]; // Toma el último número ingresado

    if (digit === '.' && ultimoNumero.includes('.')) {
        return; // Evita agregar más de un punto decimal dentro del mismo número
    }

    if (currentInput === '0' && digit !== '.') {
        currentInput = digit; // Reemplaza el 0 inicial si se ingresa otro número
    } else {
        currentInput += digit; // Agrega el dígito al número actual
    }

    resultado.textContent = currentInput; // Actualiza la pantalla de la calculadora
    }

    /* Botones de las Operaciones */
    let botonesOperacion = document.querySelectorAll("#operaciones button")
    botonesOperacion.forEach(function(boton) {
        boton.addEventListener("click", function() {
            agregarOperacion(boton.textContent);
        });
    });

    function agregarOperacion(digit){
        if (currentInput !== "0" && /[+\-x/%]/.test(currentInput) == false) {
            currentInput += " " + digit + " ";
            resultado.textContent = currentInput;
        }
    }

    /* funciones de los botones generales */
    document.getElementById('delate').addEventListener('click', function() {
        currentInput = "0";
        resultado.textContent = currentInput;
    });

    document.getElementById('igual').addEventListener('click', function() {
        try {
            let inputEvaluable = currentInput.replace(/x/g, '*'); // Reemplazamos "x" por "*"
            let resultadoOperacion = eval(inputEvaluable); // Evaluamos el string como expresión matemática
            resultado.textContent = resultadoOperacion; // Mostramos el resultado de la operación
    
            // Crear un nuevo párrafo para el historial
            let nuevoParrafo = document.createElement('p');
            nuevoParrafo.textContent = `${currentInput} = ${resultadoOperacion}`;
            document.getElementById('historial').appendChild(nuevoParrafo); // Agregarlo sin tocar el botón
            
            currentInput = '' + resultadoOperacion;
        } catch (error) {
            resultado.textContent = 'Error';
        }
    });
    
    document.getElementById('delhistory').addEventListener('click', function() {
        let parrafos = document.querySelectorAll('#historial p'); // Selecciona todos los párrafos dentro de historial
        parrafos.forEach(p => p.remove()); // Elimina solo los párrafos
    });
});
