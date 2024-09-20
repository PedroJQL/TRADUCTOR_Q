// Variable global 'estado' para verificar si se ha presionado el botón de cambiar lenguaje
let estado = false;

// Función asíncrona para traducir texto
async function traducirTexto() {
    // Obtiene el valor del campo de entrada y lo convierte a minúsculas y sin espacios alrededor
    const textoEspañol = document.getElementById("palabra").value.trim().toLowerCase();

    if (!estado) {
        // Traducción de palabras en español a Qeqchi
        try {
            const url = new URL('http://localhost:3000/traductor');
            url.searchParams.append('palabraEspañol', textoEspañol);

            const response = await fetch(url);
            // Verifica si la respuesta no es OK (estado 200)
            if (!response.ok) {
                throw new Error('Error al traducir la palabra. Estado de respuesta: ' + response.status);
            }
            
            const data = await response.json();
            // Verifica si la respuesta contiene la traducción
            if (!data || !data.Traduccion) {
                throw new Error('Respuesta incorrecta del servidor');
            }
            // Asigna la traducción al campo correspondiente
            document.getElementById("texto_qeqchi").value = data.Traduccion;
        } catch (error) {
            console.error('Error al obtener la traducción:', error);
            // Maneja el error mostrando un mensaje al usuario
            alert('Error al obtener la traducción, no deje espacios al final de la palabra o ingrese únicamente palabras en español.');
        }
    } else {
        // Traducción de palabras en Qeqchi a español
        try {
            const url = new URL('http://localhost:3000/traductor');
            url.searchParams.append('palabraQeqchi', textoEspañol);

            const response = await fetch(url);
            // Verifica si la respuesta no es OK (estado 200)
            if (!response.ok) {
                throw new Error('Error al traducir la palabra. Estado de respuesta: ' + response.status);
            }
            
            const data = await response.json();
            // Verifica si la respuesta contiene la traducción
            if (!data || !data.Traduccion2) {
                throw new Error('Respuesta incorrecta del servidor');
            }
            // Asigna la traducción al campo correspondiente
            document.getElementById("texto_qeqchi").value = data.Traduccion2;
        } catch (error) {
            console.error('Error al obtener la traducción:', error);
            // Maneja el error mostrando un mensaje al usuario
            alert('Error al obtener la traducción, no deje espacios al final de la palabra o ingrese únicamente palabras en español.');
        }
    }
}

// Añade un listener al documento para ejecutar el código cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    var boton = document.getElementById('miBoton');
    // Añade un evento click al botón para ejecutar la función traducirTexto
    boton.addEventListener('click', traducirTexto);
    console.log("Se hizo clic en el botón 'Buscar'");
});

// Función para cambiar el texto del botón y vaciar los campos de entrada y resultado
function cambiarTexto() {
    const texto1 = document.getElementById('texto1');
    const texto2 = document.getElementById('texto2');
    const vacio1 = document.getElementById('palabra');
    const vacio2 = document.getElementById('texto_qeqchi');

    if (!estado) {
        texto1.textContent = 'Qeqchi';
        texto2.textContent = 'Español';
        vacio1.value = '';
        vacio2.value = '';
        estado = true;
    } else {
        texto1.textContent = 'Español';
        texto2.textContent = 'Qeqchi';
        vacio1.value = '';
        vacio2.value = '';
        estado = false;
    }
}

// Añade un listener al documento para vaciar los campos de entrada y resultado cuando se hagan clic en botones específicos
document.addEventListener('DOMContentLoaded', function() {
    const inputPalabra = document.getElementById('palabra');
    const getTexto = document.getElementById('texto_qeqchi');

    const botones = [document.getElementById('miBoton3'), document.getElementById('miBoton4')];

    botones.forEach(boton => {
        boton.addEventListener('click', function() {
            inputPalabra.value = '';
            getTexto.value = '';
        });
    });
});

// Añade un listener al documento para ejecutar la función cambiarTexto cuando se haga clic en el botón de cambiar idioma
document.addEventListener('DOMContentLoaded', function() {
    var botonC = document.getElementById('miBoton2');
    botonC.addEventListener('click', cambiarTexto);
    console.log("Se hizo clic en el botón 'intercambiarPosiciones'");
});

document.addEventListener('DOMContentLoaded', function() {
    const quizQuestions = [
        {
            question: "¿Cómo se dice 'Pecho' en Q'eqchi'?",
            options: ["Saqariik", "Usilal", "Kaa", "Re ch'ool"],
            answer: 3
        },
        {
            question: "¿Qué significa 'Xolb'?",
            options: ["Amor", "Flauta", "Perro", "Comida"],
            answer: 1
        },
        {
            question: "¿Cómo se dice 'Vaya con cuidado' en Q'eqchi'?",
            options: ["Ani laak'ab'a'", "Kim arin", "Ayu sa' xyaalal", "Toj wulaj chik"],
            answer: 2
        },
        {
            question: "¿Qué significa 'Sa' xsutam'?",
            options: ["Alrededor de", "En medio de", "Dentro de", "Al lado de"],
            answer: 0
        },
        {
            question: "¿Cómo se dice 'Seis (6)' en Q'eqchi?",
            options: ["Waqxaqib'", "Oxib'", "Waqib'", "Lajeeb'"],
            answer: 2
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    function loadQuestion() {
        const currentQuestion = quizQuestions[currentQuestionIndex];
        document.getElementById('question').textContent = currentQuestion.question;
        document.getElementById('option0').textContent = currentQuestion.options[0];
        document.getElementById('option1').textContent = currentQuestion.options[1];
        document.getElementById('option2').textContent = currentQuestion.options[2];
        document.getElementById('option3').textContent = currentQuestion.options[3];

        document.getElementById('option0').onclick = function() { checkAnswer(0); };
        document.getElementById('option1').onclick = function() { checkAnswer(1); };
        document.getElementById('option2').onclick = function() { checkAnswer(2); };
        document.getElementById('option3').onclick = function() { checkAnswer(3); };
    }

    function checkAnswer(selectedOption) {
        const currentQuestion = quizQuestions[currentQuestionIndex];
        if (selectedOption === currentQuestion.answer) {
            score++;
            alert('¡Correcto!');
        } else {
            alert('Incorrecto. La respuesta correcta es: ' + currentQuestion.options[currentQuestion.answer]);
        }
        document.getElementById('score').textContent = `Puntuación: ${score}`;
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            loadQuestion();
        } else {
            alert('¡Quiz terminado! Tu puntuación final es: ' + score);
            currentQuestionIndex = 0;
            score = 0;
            loadQuestion();
        }
    }

    
    document.getElementById('nextButton').addEventListener('click', nextQuestion);

    loadQuestion();
});