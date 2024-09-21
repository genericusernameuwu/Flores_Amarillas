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

function DibujarPetalo(x, y, radioX, radioY, rotacion, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotacion);
    ctx.beginPath();
    ctx.ellipse(0, 0, radioX, radioY, 0, 0, Math.PI * 2);
    ctx.fillStyle = color;
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
                const radioRandom = Math.random() * 5 + 25; // Variación en el tamaño
                const colorRandom = `hsl(${Math.random() * 360}, 100%, 50%)`; // Color aleatorio
                DibujarPetalo(x, y + 100, radioRandom, radioRandom * 0.6, angulo, colorRandom);
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

    // Espaciado
    const espacioX = canvas.width / 4;
    const espacioY = canvas.height / 3;

    for (let i = 0; i < numFlores; i++) {
        const fila = Math.floor(i / 4);
        const columna = i % 4;
        const x = espacioX * columna + espacioX / 2;
        const y = espacioY * fila + espacioY / 2;

        DibujarFlor(x, y, 8, 30, 80, 200);
    }
}

