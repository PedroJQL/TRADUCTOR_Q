// Espera a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', function() {
    // Selecciona el elemento con la clase 'combo'
    const combo = document.querySelector('.combo');

    // Verifica si el elemento 'combo' existe en el DOM
    if (!combo) {
        console.error('Error: No se encontró el elemento .combo');
        return;
    }

    // Agrega un listener para el evento 'change' en el elemento 'combo'
    combo.addEventListener('change', async function() {
        // Obtiene el valor seleccionado del combo
        const selectedValue = this.value;
        console.log(`Valor seleccionado: ${selectedValue}`);

        // Si el valor seleccionado es 'Select', muestra una alerta y termina la ejecución
        if (selectedValue === 'Select') {
            alert('Por favor, selecciona una opción válida.');
            return;
        }

        try {
            // Construye la URL para la solicitud al servidor
            const url = new URL('http://localhost:3000/obtenerDatos');
            url.searchParams.append('coleccion', selectedValue);

            console.log(`URL solicitada: ${url.toString()}`);

            // Realiza la solicitud fetch al servidor
            const response = await fetch(url);
            // Verifica si la respuesta no es OK (estado 200)
            if (!response.ok) {
                throw new Error('Error al obtener los documentos. Estado de respuesta: ' + response.status);
            }

            // Convierte la respuesta a JSON
            const data = await response.json();
            // Verifica si la respuesta no contiene los datos esperados
            if (!Array.isArray(data.valores) || !Array.isArray(data.espanol)) {
                throw new Error('Respuesta incorrecta del servidor');
            }

            // Obtiene los elementos textarea del DOM
            const textoQ = document.getElementById("texto-q");
            const textoE = document.getElementById("texto-e");

            // Verifica si los elementos textarea existen en el DOM
            if (!textoQ || !textoE) {
                console.error('Error: No se encontraron los elementos texto-q o texto-e');
                return;
            }

            // Limpia los textareas antes de mostrar los nuevos datos
            textoQ.value = '';
            textoE.value = '';

            // Itera sobre los valores y los agrega al textarea con índices
            data.valores.forEach((valor, index) => {
                textoQ.value += `${index + 1}. ${valor}\n`;
            });

            // Itera sobre las palabras en español y las agrega al textarea con índices
            data.espanol.forEach((palabra, index) => {
                textoE.value += `${index + 1}. ${palabra}\n`;
            });

        } catch (error) {
            // Manejo de errores: muestra un mensaje en la consola y una alerta al usuario
            console.error('Error al obtener los documentos:', error);
            alert('Error al obtener los documentos. Por favor, inténtalo de nuevo más tarde.');
        }
    });
});
