
const canvas12 = document.createElement("canvas")
canvas12.id = "pyramidCanvas12"
// canvas12.style["grid-column"] = "1/6"
document.body.appendChild(canvas12)


const piramide12 = new Piramide(canvas12, {
    x: 0,
    y: 0,
    width: 1024,
    height: 1024,
    size: 400,
    color: "#111424",
    lineWidth: 20,
    vertexScale: 3.2,
    ball: { 
        color: "#e85a4f",
        radius: 96,
    },
    //     background: {
    //     radius: 500,
    //     color: "#22253d",
    //     strokeStyle: "#ced3f2",
    //     // lineWidth: 12,
    // }
});

// Rotatie instellen
piramide12.angleY = 115
piramide12.angleZ = 90
// piramide12.angleX = 90
gsap.to(piramide12, {
    duration: 8, // Adjust the duration as needed for the speed of the circle
    repeat: -1,  // Infinite loop
    angleX: 360, // Rotate the ball 360 d/egrees
    // angleZ: 360, // Rotate the ball 360 d/egrees
    ease: "none",  // No easing so that the motion remains constant
});

gsap.to(piramide12, {
    duration: 90, // Adjust the duration as needed for the speed of the circle
    repeat: -1,  // Infinite loop
    angleY: 360 + 115, // Rotate the ball 360 d/egrees
    ease: "none",  // No easing so that the motion remains constant
});




