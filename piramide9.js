
const canvas9 = document.createElement("canvas")
canvas9.id = "pyramidCanvas9"
document.body.appendChild(canvas9)


const piramide9 = new Piramide(canvas9, {
    x: 0,
    y: 0,
    width: 256,
    height: 256,
    size: 96,
    color: "#333",
    lineWidth: 4,
    vertexScale: 3.2,
    ball: { 
        color: "#b0e07c",
        radius: 24,
    },
});

// Rotatie instellen
piramide9.setRotation({ x: 0, y: 90, z: 0 }); // Stel de rotatiehoek in

gsap.to(piramide9, {
    duration: 8, // Adjust the duration as needed for the speed of the circle
    repeat: -1,  // Infinite loop
    angleX: 360, // Rotate the ball 360 d/egrees
    angleY: 360 + 90, // Rotate the ball 360 d/egrees
    angleZ: 360, // Rotate the ball 360 d/egrees
    ease: "none",  // No easing so that the motion remains constant
});

gsap.to(piramide9.ball, {
    duration: 1.5, // Adjust the duration as needed for the speed of the circle
    repeat: -1,  // Infinite loop
    rotation: 360, // Rotate the ball 360 degrees
    yoyo: true,
    radius: 32,
    ease: "circle.inOut",  // No easing so that the motion remains constant
});


