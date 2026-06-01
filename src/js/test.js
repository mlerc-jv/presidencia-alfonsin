import { preguntas } from "../services/servicesTest.js";

const contadorPregunta = document.querySelector("#contador-pregunta");
const preguntaTexto = document.querySelector("#pregunta");
const opcionesContenedor = document.querySelector("#opciones");
const btnSiguiente = document.querySelector("#btn-siguiente");
const resultado = document.querySelector("#resultado");

let indicePregunta = 0;
let puntaje = 0;
let respuestaSeleccionada = "";

const mostrarPregunta = () => {
    respuestaSeleccionada = "";
    resultado.innerHTML = "";
    opcionesContenedor.innerHTML = "";

    const preguntaActual = preguntas[indicePregunta];

    contadorPregunta.textContent = `Pregunta ${indicePregunta + 1} de ${preguntas.length}`;
    preguntaTexto.textContent = preguntaActual.pregunta;

    preguntaActual.opciones.forEach((opcion) => {
        const boton = document.createElement("button");
        boton.textContent = opcion;
        boton.classList.add("opcion");

        boton.addEventListener("click", () => {
            const botones = document.querySelectorAll(".opcion");

            botones.forEach((btn) => {
                btn.classList.remove("seleccionada");
            });

            boton.classList.add("seleccionada");
            respuestaSeleccionada = opcion;
        });

        opcionesContenedor.appendChild(boton);
    });

    if(indicePregunta === preguntas.length - 1){
        btnSiguiente.textContent = "Ver resultado";
    }else{
        btnSiguiente.textContent = "Siguiente";
    }
};

btnSiguiente.addEventListener("click", () => {
    if(respuestaSeleccionada === ""){
        resultado.innerHTML = `<p class="advertencia">Seleccioná una respuesta antes de continuar.</p>`;
        return;
    }

    if(respuestaSeleccionada === preguntas[indicePregunta].correcta){
        puntaje++;
    }

    indicePregunta++;

    if(indicePregunta < preguntas.length){
        mostrarPregunta();
    }else{
        mostrarResultado();
    }
});

const mostrarResultado = () => {
    contadorPregunta.textContent = "Resultado final";
    preguntaTexto.textContent = "";
    opcionesContenedor.innerHTML = "";
    btnSiguiente.style.display = "none";

    let mensaje = "";

    if(puntaje <= 4){
        mensaje = "Necesitás repasar un poco más el contenido.";
    }else if(puntaje <= 7){
        mensaje = "Buen trabajo, comprendiste varios puntos importantes.";
    }else{
        mensaje = "¡Excelente! Comprendiste muy bien el tema.";
    }

    resultado.innerHTML = `
        <div class="resultado-final">
            <h3>Obtuviste ${puntaje} de ${preguntas.length} respuestas correctas</h3>
            <p>${mensaje}</p>
            <button class="btn-test" onclick="location.reload()">Reintentar</button>
        </div>
    `;
};

mostrarPregunta();