
const canvas2 = document.createElement("canvas")
canvas2.width = 400
canvas2.height = 400
canvas2.id = "pyramidCanvas1"
document.body.appendChild(canvas2)
const piramide2 = new Piramide(canvas2, {
    x: 0,
    y: 0,
    color: "#a6dff4",
    lineWidth: 8,
    vertexScale: 2.4,
    ball: { 
        color: "#ca352b",
        radius: 25,
        y: 25
    },
});

// Rotatie instellen
piramide2.setRotation({ x: -.25, y: 0, z: .25 }); // Stel de rotatiehoek in

