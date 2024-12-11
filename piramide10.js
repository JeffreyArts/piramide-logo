
const canvas10 = document.createElement("canvas")
canvas10.id = "pyramidCanvas10"
document.body.appendChild(canvas10)


const piramide10 = new Piramide(canvas10, {
    x: 0,
    y: 0,
    width: 400,
    height: 400,
    size: 96,
    color: "#ced3f2",
    lineWidth: 4,
    vertexScale: 3.2,
    ball: { 
        color: "#e85a4f",
        radius: 32,
    },
        background: {
        radius: 128,
        color: "#22253d",
        strokeStyle: "#ced3f2",
        // lineWidth: 10,
    }
});

// Rotatie instellen

gsap.to(piramide10, {
    duration: 8, // Adjust the duration as needed for the speed of the circle
    repeat: -1,  // Infinite loop
    angleX: 360, // Rotate the ball 360 d/egrees
    angleY: 360, // Rotate the ball 360 d/egrees
    angleZ: 360, // Rotate the ball 360 d/egrees
    ease: "none",  // No easing so that the motion remains constant
});

gsap.to(piramide10.ball, {
    duration: 1.5, // Adjust the duration as needed for the speed of the circle
    repeat: -1,  // Infinite loop
    rotation: 360, // Rotate the ball 360 degrees
    yoyo: true,
    radius: 36,
    ease: "circle.inOut",  // No easing so that the motion remains constant
});


