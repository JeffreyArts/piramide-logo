
const canvasPreview = document.createElement("canvas")
canvasPreview.id = "pyramidCanvasPreview"
// canvasPreview.style["grid-column"] = "1/6"
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
    },
});

// Rotatie instellen
piramidePreview.angleY = 180
piramidePreview.angleZ = 180
piramidePreview.angleX = 180

// gsap.to(piramidePreview, {
//     duration: 8, // Adjust the duration as needed for the speed of the circle
//     repeat: -1,  // Infinite loop
//     angleX: 360, // Rotate the ball 360 d/egrees
//     // angleZ: 360, // Rotate the ball 360 d/egrees
//     ease: "none",  // No easing so that the motion remains constant
// });

// gsap.to(piramidePreview, {
//     duration: 90, // Adjust the duration as needed for the speed of the circle
//     repeat: -1,  // Infinite loop
//     angleY: 360 + 115, // Rotate the ball 360 d/egrees
//     ease: "none",  // No easing so that the motion remains constant
// });




