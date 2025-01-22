const { createCanvas } = require('canvas');
const fs = require('fs');

// Function to calculate the Weibull distribution
function weibullDistribution(x, shape, scale) {
    return (shape / scale) * Math.pow(x / scale, shape - 1) * Math.exp(-Math.pow(x / scale, shape));
}

// Generate data points for plotting
function generateDataPoints(shape, scale, step) {
    const dataPoints = [];
    for (let x = 0; x <= scale * 3; x += step) {
        dataPoints.push({
            x: x,
            y: weibullDistribution(x, shape, scale)
        });
    }
    return dataPoints;
}

// Plot Weibull distribution
function plotWeibull(shape, scale, step) {
    const canvasWidth = 800;
    const canvasHeight = 600;
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext('2d');

    const data = generateDataPoints(shape, scale, step);

    // Plotting
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw axes
    ctx.strokeStyle = '#000000';
    ctx.beginPath();
    ctx.moveTo(50, canvasHeight - 50); // bottom-left
    ctx.lineTo(50, 50); // top-left
    ctx.lineTo(canvasWidth - 50, 50); // top-right
    ctx.stroke();

    // Draw x-axis ticks
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    for (let i = 0; i <= scale * 3; i++) {
        ctx.beginPath();
        ctx.moveTo(50 + i * (canvasWidth - 100) / (scale * 3), canvasHeight - 50);
        ctx.lineTo(50 + i * (canvasWidth - 100) / (scale * 3), canvasHeight - 55);
        ctx.stroke();
        ctx.fillText(i, 50 + i * (canvasWidth - 100) / (scale * 3), canvasHeight - 40);
    }

    // Draw y-axis ticks
    for (let i = 0; i <= 1; i += 0.1) {
        ctx.beginPath();
        ctx.moveTo(45, canvasHeight - 50 - i * (canvasHeight - 100));
        ctx.lineTo(50, canvasHeight - 50 - i * (canvasHeight - 100));
        ctx.stroke();
        ctx.fillText(i.toFixed(1), 30, canvasHeight - 50 - i * (canvasHeight - 100) + 4);
    }

    // Plot the Weibull distribution
    ctx.strokeStyle = 'rgba(75, 192, 192, 1)';
    ctx.beginPath();
    data.forEach((point, index) => {
        if (index === 0) {
            ctx.moveTo(50 + point.x * (canvasWidth - 100) / (scale * 3), canvasHeight - 50 - point.y * (canvasHeight - 100));
        } else {
            ctx.lineTo(50 + point.x * (canvasWidth - 100) / (scale * 3), canvasHeight - 50 - point.y * (canvasHeight - 100));
        }
    });
    ctx.stroke();

    // Save canvas to file
    const out = fs.createWriteStream(__dirname + '/weibull_distribution.png');
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', () => console.log('The PNG file was created.'));
}

// Parameters for Weibull distribution
const shape = 2; // Shape parameter
const scale = 1; // Scale parameter
const step = 0.1; // Step for data generation

// Plot Weibull distribution
plotWeibull(shape, scale, step);
