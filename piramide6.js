
const canvas6 = document.createElement("canvas")
canvas6.id = "pyramidCanvas6"
document.body.appendChild(canvas6)


const piramide6 = new Piramide(canvas6, {
    x: 0,
    y: 0,
    width: 256,
    height: 256,
    size: 96,
    color: "#333",
    lineWidth: 4,
    vertexScale: 3.2,
    ball: { 
        color: "#c8d0e5",
        radius: 24,
    },
        background: {
        radius: 124,
        // color: "#c8dae5",
        strokeStyle: "#333",
        lineWidth: 2,
    }
});

// Rotatie instellen
piramide6.setRotation({ x: 180, y: 0, z: 0 }); // Stel de rotatiehoek in

gsap.to(piramide6, {
    duration: 8, // Adjust the duration as needed for the speed of the circle
    repeat: -1,  // Infinite loop
    angleX: 360 + 180, // Rotate the ball 360 d/egrees
    angleY: 360, // Rotate the ball 360 d/egrees
    angleZ: 360, // Rotate the ball 360 d/egrees
    ease: "none",  // No easing so that the motion remains constant
});

gsap.to(piramide6.ball, {
    duration: 1.5, // Adjust the duration as needed for the speed of the circle
    repeat: -1,  // Infinite loop
    rotation: 360, // Rotate the ball 360 degrees
    yoyo: true,
    radius: 36,
    ease: "circle.inOut",  // No easing so that the motion remains constant
});


