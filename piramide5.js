
const canvas5 = document.createElement("canvas")
canvas5.id = "pyramidCanvas5"
document.body.appendChild(canvas5)


const piramide5 = new Piramide(canvas5, {
    x: 0,
    y: 0,
    width: 256,
    height: 256,
    size: 96,
    color: "#333",
    lineWidth: 4,
    vertexScale: 3.2,
    ball: { 
        color: "#000",
        radius: 24,
    },
        background: {
        radius: 124,
        color: "#eee",
        strokeStyle: "#ddd",
        // lineWidth: 10,
    }
});

// Rotatie instellen
piramide5.setRotation({ x: 90, y: 0, z: 0 }); // Stel de rotatiehoek in

gsap.to(piramide5, {
    duration: 8, // Adjust the duration as needed for the speed of the circle
    repeat: -1,  // Infinite loop
    angleX: 360 - 90, // Rotate the ball 360 d/egrees
    angleY: 360, // Rotate the ball 360 d/egrees
    angleZ: 360, // Rotate the ball 360 d/egrees
    ease: "none",  // No easing so that the motion remains constant
});

gsap.to(piramide5.ball, {
    duration: 1.5, // Adjust the duration as needed for the speed of the circle
    repeat: -1,  // Infinite loop
    rotation: 360, // Rotate the ball 360 degrees
    yoyo: true,
    radius: 36,
    ease: "circle.inOut",  // No easing so that the motion remains constant
});


