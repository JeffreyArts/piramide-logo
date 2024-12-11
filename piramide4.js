
const canvas4 = document.createElement("canvas")
canvas4.id = "pyramidCanvas4"
document.body.appendChild(canvas4)


const piramide4 = new Piramide(canvas4, {
    x: 0,
    y: 0,
    width: 200,
    height: 200,
    size: 96,
    color: "#fff",
    lineWidth: 4,
    vertexScale: 3.2,
    ball: { 
        color: "#ffee64",
        radius: 32,
    },
        background: {
        radius: 128,
        color: "#111",
        strokeStyle: "#fff",
        // lineWidth: 10,
    }
});

piramide4.points3D = {
    A: { x: -100, y: 100, z: 0 },
    B: { x: 100, y: 100, z: 0 },
    C: { x: 0, y: -100, z: 0 },
    D: { x: 0, y: 0, z: 150 },
};

// Rotatie instellen

gsap.to(piramide4, {
    duration: 8, // Adjust the duration as needed for the speed of the circle
    repeat: -1,  // Infinite loop
    angleX: 360, // Rotate the ball 360 d/egrees
    angleY: 360, // Rotate the ball 360 d/egrees
    angleZ: 360, // Rotate the ball 360 d/egrees
    ease: "none",  // No easing so that the motion remains constant
});

gsap.to(piramide4.ball, {
    duration: 1.5, // Adjust the duration as needed for the speed of the circle
    repeat: -1,  // Infinite loop
    rotation: 360, // Rotate the ball 360 degrees
    yoyo: true,
    radius: 36,
    ease: "circle.inOut",  // No easing so that the motion remains constant
});


