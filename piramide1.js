
const canvas1 = document.createElement("canvas")
canvas1.id = "pyramidCanvas1"
document.body.appendChild(canvas1)
const piramide1 = new Piramide(canvas1, {
    x: 0,
    y: 0,
    width: 400,
    height: 400,
    size: 128,
    color: "black",
    lineWidth: 4,
    vertexScale: 5,
    ball: { 
        color: "#ef3488",
        radius: 32,
        y: 25
    },
});


// Rotatie instellen
piramide1.setRotation({ x: 180, y: 280, z: -90 }); // Stel de rotatiehoek in
// piramide1.setRotation({ x: 180, y: 292.5, z: 900 }); // Stel de rotatiehoek in
// gsap.to(piramide1, {
//     duration: 4, // Adjust the duration as needed for the speed of the circle
//     repeat: -1,  // Infinite loop
//     // delay: 1,
//     // angleY: 360 - 292.5, // Rotate the ball 360 degrees
//     angleX: -180, // Rotate the ball 360 degrees
//     angleZ: 360 - 90, // Rotate the ball 360 d/egrees
//     // yoyo: true,
//     ease: "none",  // No easing so that the motion remains constant
// });
// gsap.to(piramide1.ball, {
//     duration: 4, // Adjust the duration as needed for the speed of the circle
//     repeat: -1,  // Infinite loop
//     // delay: 1,
//     rotation: 360, // Rotate the ball 360 degrees
//     ease: "none",  // No easing so that the motion remains constant
//     onUpdate: () => {
//         const time = gsap.getProperty(piramide1.ball, "rotation");
//         const radius = 16; // Set the radius for the circle
//         const offset = 5;
//         const centerX = 0; // Set the center point for x-axis
//         const centerY = 0; // Set the center point for y-axis

//         // Use sine and cosine to calculate the new x and y positions based on rotation
//         piramide1.ball.x = centerX + (offset + radius) * Math.cos((time + 90) * Math.PI / 180); // x position based on cosine
//         piramide1.ball.y = centerY + (offset + radius) * Math.sin((time + 90) * Math.PI / 180); // y position based on sine
//     }
// });
