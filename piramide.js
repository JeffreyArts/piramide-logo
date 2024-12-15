class Piramide {
    constructor(canvasElement, options = {}) {
        // Instellingen
        this.canvas = canvasElement;
        this.ctx = this.canvas.getContext('2d');
        this.options = {
            x: options.x || 0,
            y: options.y || 0,
            size: options.size || 200,
            width: options.width || 400,
            height: options.height || 400,
            vertexScale: options.vertexScale || 1,
            color: options.color || "black",
            lineWidth: options.lineWidth || 2,
            ball: {
                x: options.ball?.x || 0,
                y: options.ball?.y || 0,
                color: options.ball?.color || "red",
                radius: options.ball?.radius || 50,
                emoji: options.ball?.emoji, // Voeg de emoji-optie toe
            },
            background: {
                radius: options.background?.radius || 0,
                color: options.background?.color || "rgba(255,255,255,0)",
                strokeStyle: options.background?.strokeStyle || "",
                lineWidth: options.background?.lineWidth || 0,
            },
        };

        this.canvas.width = this.options.width
        this.canvas.height = this.options.height
        const basePoints = this.calculateIsoscelesTriangle(this.options.size)

        // Piramidepunten en lijnen
        this.createPyramid(this.options.size)
        this.points3D = {...this.originPoints3D};

        this.lines = [
            ["A", "B"], ["B", "C"], ["C", "A"], // Basis
            ["A", "D"], ["B", "D"], ["C", "D"], // Zijden
        ];

        // Bal in het midden
        this.ball = {
            x: 0,
            y: 0,
            z: (this.points3D.A.z + this.points3D.D.z) / 2,
            radius: this.options.ball.radius,
            color: this.options.ball.color,
            emoji: this.options.ball.emoji,
        };

        this.background = {
            radius: this.options.background.radius,
            color: this.options.background.color,
            lineWidth: this.options.background.lineWidth,
            strokeStyle: this.options.background.strokeStyle,
        };

        // Piramide styling
        this.vertexScale = this.options.vertexScale;
        this.lineWidth = this.options.lineWidth;
        this.strokeStyle = this.options.color;

        // Rotatiehoeken
        this.angleX = 0;
        this.angleY = 0;
        this.angleZ = 0;
        
        this.animate();
    }

    createPyramid(size) {
        const height = (Math.sqrt(3) / 2) * size;
        // Bereken de basisdriehoek in het xy-vlak
        this.originPoints3D = {
            A: { x: size * Math.cos(0), y: size * Math.sin(0), z: 0 },
            B: { x: size * Math.cos((2 * Math.PI) / 3), y: size * Math.sin((2 * Math.PI) / 3), z: 0 },
            C: { x: size * Math.cos((4 * Math.PI) / 3), y: size * Math.sin((4 * Math.PI) / 3), z: 0 },
            D: { x: 0, y: 0, z: height }, // Top van de piramide
        };
    
        // // Definieer de lijnen (kanten van de piramide)
        // this.lines = [
        //     ["A", "B"], ["B", "C"], ["C", "A"], // Basis
        //     ["A", "D"], ["B", "D"], ["C", "D"], // Zijden
        // ];
    
        // return { originPoints3D, lines };
    }
    
    calculateIsoscelesTriangle(size) {
        const points = [];
        const angleIncrement = (2 * Math.PI) / 3; // 120 graden in radialen
        for (let i = 0; i < 3; i++) {
            const angle = i * angleIncrement; // Hoeken: 0, 120, 240 graden
            const x = size * Math.cos(angle);
            const y = size * Math.sin(angle);
            points.push({ x, y });
        }
        return points;
    }
    
    // Rotatiefuncties
    rotateX(point, angle) {
        const rad = angle * (Math.PI / 180);
        const { x, y, z } = point;
        return {
            x,
            y: y * Math.cos(rad) - z * Math.sin(rad),
            z: y * Math.sin(rad) + z * Math.cos(rad),
        };
    }

    rotateY(point, angle) {
        const rad = angle * (Math.PI / 180);
        const { x, y, z } = point;
        return {
            x: x * Math.cos(rad) + z * Math.sin(rad),
            y,
            z: -x * Math.sin(rad) + z * Math.cos(rad),
        };
    }

    rotateZ(point, angle) {
        const rad = angle * (Math.PI / 180);
        const { x, y, z } = point;
        return {
            x: x * Math.cos(rad) - y * Math.sin(rad),
            y: x * Math.sin(rad) + y * Math.cos(rad),
            z,
        };
    }

    project(point) {
        return {
            x: point.x + this.canvas.width / 2 + this.options.x,
            y: point.y + this.canvas.height / 2 + this.options.y,
        };
    }

    drawLine(p1, p2) {
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = this.strokeStyle;
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();
    }

    drawBackground() {
        this.ctx.beginPath();
        this.ctx.arc(this.canvas.width/2, this.canvas.height/2, this.background.radius, 0, 2 * Math.PI);
        if (this.background.color) {
            this.ctx.fillStyle = this.background.color
            this.ctx.fill();
        }
        if (this.background.lineWidth) {
            this.ctx.lineWidth = this.background.lineWidth
        }
        if (this.background.strokeStyle) {
            this.ctx.strokeStyle = this.background.strokeStyle
            this.ctx.stroke();
        }
    }

    drawBall() {
        const { x, y } = this.project(this.ball);
        const { emoji, radius } = this.ball;

        if (emoji) {
            const fontSize = radius * 2; // Emoji grootte gebaseerd op straal
            this.ctx.font = `${fontSize}px Arial`;
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillText(emoji, x, y);
        } else {
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
            this.ctx.fillStyle = this.ball.color;
            this.ctx.fill();
        }
    }

    sortLines(lines, points) {
        return lines.sort(([p1, p2]) => {
            const avgZ = (points[p1].z + points[p2].z) / 2;
            return avgZ - this.ball.z;
        });
    }

    calculateCenter(points) {
        const values = Object.values(points);
        const avg = (key) => values.reduce((sum, p) => sum + p[key], 0) / values.length;
        return { x: avg('x'), y: avg('y'), z: avg('z') };
    }

    updateRotation() {
        const center = this.calculateCenter(this.originPoints3D);
        for (const key in this.originPoints3D) {
            let point = this.originPoints3D[key];
    
            // Verplaats naar origin (midden)
            point.x -= center.x;
            point.y -= center.y;
            point.z -= center.z;
    
            // Toepassen van rotaties
            point = this.rotateX(point, this.angleX);
            point = this.rotateY(point, this.angleY);
            point = this.rotateZ(point, this.angleZ);
    
            // Verplaats terug naar oorspronkelijke locatie
            point.x += center.x;
            point.y += center.y;
            point.z += center.z;
    
            this.points3D[key] = point; // Update het punt
        }
    }
    
    drawPyramid() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
        if (this.background.radius) {
            this.drawBackground()
        }



        const projectedPoints = {};
        for (const key in this.points3D) {
            projectedPoints[key] = this.project(this.points3D[key]);
        }
    
        // Teken eerst alle lijnen
        this.lines.forEach(([p1, p2]) => {
            this.drawLine(projectedPoints[p1], projectedPoints[p2]);
        });
    
        // Teken de 1e laag vertices
        for (const key in this.points3D) {
            const point = this.points3D[key];
            const projected = projectedPoints[key];
            // if ((point.x < this.ball.x - this.ball.radius || point.x > this.ball.x + this.ball.radius) || 
            //     point.y < this.ball.y - this.ball.radius || point.y > this.ball.y + this.ball.radius
            // ) {
                this.ctx.beginPath();
                this.ctx.arc(projected.x, projected.y, (this.lineWidth / 2) * this.vertexScale, 0, 2 * Math.PI);
                this.ctx.fillStyle = this.strokeStyle;
                this.ctx.fill();
            // }
        }

        // Teken de bal
        this.drawBall();
    
    
        for (const key in this.points3D) {
            const point = this.points3D[key];
            const projected = projectedPoints[key];
            if (point.z > this.ball.z) {
                this.ctx.beginPath();
                this.ctx.arc(projected.x, projected.y, (this.lineWidth / 2) * this.vertexScale, 0, 2 * Math.PI);
                this.ctx.fillStyle = this.strokeStyle;
                this.ctx.fill();
            }
        }
        // throw new Error("")

        // Optioneel: Lijnen opnieuw tekenen die boven de bal moeten liggen
        this.lines.forEach(([p1, p2]) => {
            const startPoint = this.points3D[p1];
            const endPoint = this.points3D[p2];
            const avgZ = (startPoint.z + endPoint.z) / 2;
            
            // Herteken de lijn alleen als de lijn voor de bal ligt (z-waarde groter dan de bal)
            if (this.doesLineIntersectSphere(startPoint, endPoint, this.ball)) {

                this.drawLine(projectedPoints[p1], projectedPoints[p2]);
            }
        });
    }
    doesLineIntersectSphere(lineStart, lineEnd, ball) {
        // Vectoren berekenen
        const d = {
            x: lineEnd.x - lineStart.x,
            y: lineEnd.y - lineStart.y,
            z: lineEnd.z - lineStart.z,
        };
        const v = {
            x: ball.x - lineStart.x,
            y: ball.y - lineStart.y,
            z: ball.z - lineStart.z,
        };
        
        // Projectie van v op d
        const dDotD = d.x * d.x + d.y * d.y + d.z * d.z;
        const vDotD = v.x * d.x + v.y * d.y + v.z * d.z;
        let t = vDotD / dDotD;
        
        // Beperk t tot het bereik [0, 1]
        t = Math.max(0, Math.min(1, t));
        
        // Bereken het dichtstbijzijnde punt op de lijn
        const closestPoint = {
            x: lineStart.x + t * d.x,
            y: lineStart.y + t * d.y,
            z: lineStart.z + t * d.z,
        };
        
        // Bereken de afstand van het dichtstbijzijnde punt tot het middelpunt van de bol
        const distSquared = 
        (closestPoint.x - ball.x) ** 2 +
        (closestPoint.y - ball.y) ** 2 +
        (closestPoint.z - ball.z) ** 2;
        // Controleer of de afstand kleiner is dan of gelijk aan de straal van de bol
        return distSquared <= (ball.radius*2) ** 2;
    }

    // Methode om de rotatiehoeken bij te werken
    setRotation({ x, y, z }) {
        this.angleX = x;
        this.angleY = y;
        this.angleZ = z;
    }
    
    animate() {
        this.updateRotation();
        this.drawPyramid();
        requestAnimationFrame(() => this.animate());
    }
}
