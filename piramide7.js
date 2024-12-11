
const canvas7 = document.createElement("canvas")
canvas7.id = "pyramidCanvas7"
document.body.appendChild(canvas7)


const piramide7 = new Piramide(canvas7, {
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
});

// Rotatie instellen
piramide7.setRotation({ x: 0, y: 90, z: 0 }); // Stel de rotatiehoek in

gsap.to(piramide7, {
    duration: 8, // Adjust the duration as needed for the speed of the circle
    repeat: -1,  // Infinite loop
    angleX: 360, // Rotate the ball 360 d/egrees
    angleY: 360 + 90, // Rotate the ball 360 d/egrees
    angleZ: 360, // Rotate the ball 360 d/egrees
    ease: "none",  // No easing so that the motion remains constant
});

gsap.to(piramide7.ball, {
    duration: 1.5, // Adjust the duration as needed for the speed of the circle
    repeat: -1,  // Infinite loop
    rotation: 360, // Rotate the ball 360 degrees
    yoyo: true,
    radius: 32,
    ease: "circle.inOut",  // No easing so that the motion remains constant
});


