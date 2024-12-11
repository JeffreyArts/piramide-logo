
const canvas11 = document.createElement("canvas")
canvas11.id = "pyramidCanvas11"
canvas11.style["grid-column"] = "1/6"
document.body.appendChild(canvas11)


const piramide11 = new Piramide(canvas11, {
    x: 0,
    y: 0,
    width: 1024,
    height: 1024,
    size: 400,
    color: "#ced3f2",
    lineWidth: 12,
    vertexScale: 3.2,
    ball: { 
        color: "#e85a4f",
        radius: 128,
    },
        background: {
        radius: 500,
        color: "#22253d",
        strokeStyle: "#ced3f2",
        // lineWidth: 11,
    }
});

// Rotatie instellen

gsap.to(piramide11, {
    duration: 8, // Adjust the duration as needed for the speed of the circle
    repeat: -1,  // Infinite loop
    angleX: 360, // Rotate the ball 360 d/egrees
    angleY: 360, // Rotate the ball 360 d/egrees
    angleZ: 360, // Rotate the ball 360 d/egrees
    ease: "none",  // No easing so that the motion remains constant
});

gsap.to(piramide11.ball, {
    duration: 1.5, // Adjust the duration as needed for the speed of the circle
    repeat: -1,  // Infinite loop
    rotation: 360, // Rotate the ball 360 degrees
    yoyo: true,
    radius: 96,
    ease: "circle.inOut",  // No easing so that the motion remains constant
});


