class Piramide {
    constructor(canvasElement, options = {}) {
        // Instellingen
        this.canvas = canvasElement;
        this.ctx = this.canvas.getContext('2d');
        this.options = {
            x: options.x || 0,
            y: options.y || 0,
            vertexScale: options.vertexScale || 1,
            color: options.color || "black",
            lineWidth: options.lineWidth || 2,
            radius: options.radius || 5,
            ball: {
                x: options.ball?.x || 0,
                y: options.ball?.y || 0,
                color: options.ball?.color || "red",
                radius: options.ball?.radius || 50,
            },
            background: {
                radius: options.background?.radius || 0,
                color: options.background?.color || "rgba(255,255,255,0)",
            },
        };

        // Piramidepunten en lijnen
        this.points3D = {
            A: { x: -100, y: 100, z: 0 },
            B: { x: 100, y: 100, z: 0 },
            C: { x: 0, y: -100, z: 0 },
            D: { x: 0, y: 0, z: 150 },
        };

        this.lines = [
            ["A", "B"], ["B", "C"], ["C", "A"], // Basis
            ["A", "D"], ["B", "D"], ["C", "D"], // Zijden
        ];

        // Bal in het midden
        this.ball = {
            x: this.options.ball.x,
            y: this.options.ball.y,
            z: options.radius,
            radius: this.options.ball.radius,
            color: this.options.ball.color,
        };

        this.background = {
            radius: this.options.background.radius,
            color: this.options.background.color,
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
        this.ctx.arc(200, 200, this.background.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.background.color ? this.background.color : this.ball.color;
        this.ctx.fill();
    }

    drawBall() {
        const { x, y } = this.project(this.ball);
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.ball.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.ball.color;
        this.ctx.fill();
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
        const center = this.calculateCenter(this.points3D);
        for (const key in this.points3D) {
            let point = this.points3D[key];
    
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
    
        // Teken de vertices
        for (const key in this.points3D) {
            const point = this.points3D[key];
            const projected = projectedPoints[key];
    
            this.ctx.beginPath();
            this.ctx.arc(projected.x, projected.y, (this.lineWidth / 2) * this.vertexScale, 0, 2 * Math.PI);
            this.ctx.fillStyle = this.strokeStyle;
            this.ctx.fill();
        }

        // Teken de bal
        this.drawBall();
    
    
        for (const key in this.points3D) {
            const point = this.points3D[key];
            const projected = projectedPoints[key];
            if (point.z > this.ball.radius) {
                this.ctx.beginPath();
                this.ctx.arc(projected.x, projected.y, (this.lineWidth / 2) * this.vertexScale, 0, 2 * Math.PI);
                this.ctx.fillStyle = this.strokeStyle;
                this.ctx.fill();
            }
        }

        // Optioneel: Lijnen opnieuw tekenen die boven de bal moeten liggen
        this.lines.forEach(([p1, p2]) => {
            const startPoint = this.points3D[p1];
            const endPoint = this.points3D[p2];
            const avgZ = (startPoint.z + endPoint.z) / 2;
            
            // Herteken de lijn alleen als de lijn voor de bal ligt (z-waarde groter dan de bal)
            if ((avgZ > this.ball.radius) || startPoint.z > this.ball.radius && endPoint.z > this.ball.radius) {
                this.drawLine(projectedPoints[p1], projectedPoints[p2]);
            }
        });
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
