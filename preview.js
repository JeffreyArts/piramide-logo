
const canvasPreview = document.createElement("canvas")
canvasPreview.id = "pyramidCanvasPreview"
document.body.appendChild(canvasPreview)


const piramidePreview = new Piramide(canvasPreview, {
    x: 0,
    y: 0,
    width: 1024,
    height: 1024,
    size: 400,
    color: "#111424",
    lineWidth: 20,
    vertexScale: 3.2,
    ball: { 
        color: "#f2403f",
        radius: 96,
        // emoji: "🌏"
    },
});

// Rotatie instellen
piramidePreview.angleY = 180
piramidePreview.angleZ = 180
piramidePreview.angleX = 180
