let Titulo = document.title;

window.addEventListener('blur', () => {
    Titulo = document.title;
    document.title = "No te vallas, regresa :(";
});

window.addEventListener('focus', () => {
    document.title = Titulo;
});

let h1 = document.getElementById("Titulo");
let Boton1 = document.getElementById("B1");

Boton1.addEventListener('click', function() {
    const ContenedorBotones = document.querySelector(".Con");
    document.querySelector(".Texto").style.display = "block";
    ContenedorBotones.style.display = "none";
    DibujarFlor(500, 100, 6, 30, 100, 200);
    h1.remove();
});

document.getElementById("B12").addEventListener('click', function() {
    const ContenedorBotones = document.querySelector(".Con");
    ContenedorBotones.style.display = "none";
    document.querySelector(".Texto").style.display = "block";
    CrearVarias();
    h1.remove();
});

const canvas = document.getElementById('Flor');
const ctx = canvas.getContext('2d');

function DibujarPetalo(x, y, radioX, radioY, rotacion) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotacion);
    ctx.beginPath();
    ctx.ellipse(0, 0, radioX, radioY, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'yellow'; // Color amarillo para los pétalos
    ctx.fill();
    ctx.restore();
}

function DibujarFlor(x, y, numPetalos, radioXPetalo, radioYPetalo, altoTrazo) {
    // Tallos
    const pasosTallo = 50;
    const altoTallo = altoTrazo / pasosTallo;
    let nuevaY = y;

    const dibujarTallo = () => {
        if (nuevaY < y + altoTrazo) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, nuevaY);
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'green';
            ctx.stroke();
            nuevaY += altoTallo;
            setTimeout(dibujarTallo, 100);
        } else {
            // Dibuja los pétalos
            const anguloIncrement = (Math.PI * 2) / numPetalos;
            for (let i = 0; i < numPetalos; i++) {
                const angulo = i * anguloIncrement;
                DibujarPetalo(x, y + 100, radioXPetalo, radioYPetalo, angulo);
            }

            // Dibuja el centro de la flor
            ctx.beginPath();
            ctx.arc(x, y, 15, 0, Math.PI * 2);
            ctx.fillStyle = 'gold';
            ctx.fill();
        }
    };
    dibujarTallo();
}

function CrearVarias() {
    const numFlores = 12;
    const floresPorFila = 4; // Número de flores por fila

    // Espaciado
    const espacioX = canvas.width / floresPorFila;
    const espacioY = canvas.height / (numFlores / floresPorFila + 1); // Ajusta la altura

    for (let i = 0; i < numFlores; i++) {
        const fila = Math.floor(i / floresPorFila);
        const columna = i % floresPorFila;
        const x = espacioX * columna + espacioX / 2;
        const y = espacioY * (fila + 1); // Asegúrate de que no se salgan

        DibujarFlor(x, y, 8, 30, 80, 200);
    }
}
