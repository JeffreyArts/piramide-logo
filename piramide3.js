
const canvas3 = document.createElement("canvas")
canvas3.width = 400
canvas3.height = 400
canvas3.id = "pyramidCanvas1"
document.body.appendChild(canvas3)

const ctx3 = canvas3.getContext('2d');


const piramide3 = new Piramide(canvas3, {
    x: 0,
    y: 0,
    color: "#ffffff",
    lineWidth: 4,
    vertexScale: 1,
    ball: { 
        color: "#c9ff22",
        radius: 32,
        y: 10
    },
    background: {
        radius: 150,
        color: "#111"
    }
});

// Rotatie instellen
piramide3.setRotation({ x: 0, y: 0, z: 2 }); // Stel de rotatiehoek in

