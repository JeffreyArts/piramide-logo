
const canvas1 = document.createElement("canvas")
canvas1.width = 400
canvas1.height = 400
canvas1.id = "pyramidCanvas1"
document.body.appendChild(canvas1)
const piramide1 = new Piramide(canvas1, {
    x: 0,
    y: 0,
    color: "black",
    lineWidth: 4,
    vertexScale: 1,
    ball: { 
        color: "#ef3488",
        radius: 32,
        y: 25
    },
});


// Rotatie instellen
piramide1.setRotation({ x: .5, y: 0.25, z: .5 }); // Stel de rotatiehoek in
gsap.to(piramide1.ball, {
    duration: 4, // Adjust the duration as needed for the speed of the circle
    repeat: -1,  // Infinite loop
    rotation: 360, // Rotate the ball 360 degrees
    ease: "none",  // No easing so that the motion remains constant
    onUpdate: () => {
        const time = gsap.getProperty(piramide1.ball, "rotation");
        const radius =16; // Set the radius for the circle
        const centerX = 0; // Set the center point for x-axis
        const centerY = 25; // Set the center point for y-axis

        // Use sine and cosine to calculate the new x and y positions based on rotation
        piramide1.ball.x = centerX + radius * Math.cos(time * Math.PI / 180); // x position based on cosine
        piramide1.ball.y = centerY + radius * Math.sin(time * Math.PI / 180); // y position based on sine
    }
});
