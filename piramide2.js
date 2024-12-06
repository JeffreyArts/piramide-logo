
const canvas2 = document.createElement("canvas")
canvas2.width = 400
canvas2.height = 400
canvas2.id = "pyramidCanvas1"
document.body.appendChild(canvas2)
const piramide2 = new Piramide(canvas2, {
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
piramide2.setRotation({ x: .5, y: 0.25, z: .5 }); // Stel de rotatiehoek in
gsap.to(piramide2.ball, {
    duration: 4, // Adjust the duration as needed for the speed of the circle
    repeat: -1,  // Infinite loop
    rotation: 360, // Rotate the ball 360 degrees
    ease: "none",  // No easing so that the motion remains constant
    onUpdate: () => {
        const time = gsap.getProperty(piramide2.ball, "rotation");
        const radius =16; // Set the radius for the circle
        const centerX = 0; // Set the center point for x-axis
        const centerY = 25; // Set the center point for y-axis

        // Use sine and cosine to calculate the new x and y positions based on rotation
        piramide2.ball.x = centerX + radius * Math.cos(time * Math.PI / 180); // x position based on cosine
        piramide2.ball.y = centerY + radius * Math.sin(time * Math.PI / 180); // y position based on sine

        // Optionally redraw the pyramid with the updated ball position
        piramide2.drawPyramid();
    }
});
