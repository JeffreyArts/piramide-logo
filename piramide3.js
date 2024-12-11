
const canvas3 = document.createElement("canvas")
canvas3.width = 400
canvas3.height = 400
canvas3.id = "pyramidCanvas1"
document.body.appendChild(canvas3)

const ctx3 = canvas3.getContext('2d');


const piramide3 = new Piramide(canvas3, {
    x: 0,
    y: 0,
    color: "#ffffe5",
    lineWidth: 4,
    vertexScale: 4,
    ball: { 
        color: "#d6052c",
        radius: 32,
    },
    background: {
        radius: 150,
        color: "#111",
        strokeStyle: "#111",
        lineWidth: 4,
    }
});

// Rotatie instellen
piramide3.setRotation({ x: 0.1, y: 0.1, z: 0 }); // Stel de rotatiehoek in

gsap.to(piramide3.ball, {
    duration: 1, // Adjust the duration as needed for the speed of the circle
    repeat: -1,  // Infinite loop
    rotation: 360, // Rotate the ball 360 degrees
    yoyo: true,
    radius: 40,
    ease: "circle.inOut",  // No easing so that the motion remains constant
});


