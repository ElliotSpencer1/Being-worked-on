let xData = [];
let yData = [];
let chart;

// Function to add X and Y values using the input fields
document.getElementById("addXValue").addEventListener("click", () => {
    const xInput = document.getElementById("xValueInput");
    const xVal = xInput.value;
    if (xVal) {
        xData.push(Number(xVal));
        xInput.value = '';  // Clear input field
        updateDataDisplay();
    }
});

document.getElementById("addYValue").addEventListener("click", () => {
    const yInput = document.getElementById("yValueInput");
    const yVal = yInput.value;
    if (yVal) {
        yData.push(Number(yVal));
        yInput.value = '';  // Clear input field
        updateDataDisplay();
    }
});

// Function to update the displayed data
function updateDataDisplay() {
    document.getElementById("xValues").innerText = `X Values: ${xData.join(", ")}`;
    document.getElementById("yValues").innerText = `Y Values: ${yData.join(", ")}`;
}

// Set canvas size based on window dimensions
function resizeCanvas() {
    const canvas = document.getElementById("chartCanvas");
    canvas.width = window.innerWidth * 0.5;
    canvas.height = window.innerHeight * 0.5;
}

// Plotting function
document.getElementById("plotButton").addEventListener("click", () => {
    const graphType = document.getElementById("graphType").value;
    const xLabel = document.getElementById("xLabel").value + ' (' + document.getElementById("xUnit").value + ')';
    const yLabel = document.getElementById("yLabel").value + ' (' + document.getElementById("yUnit").value + ')';

    // Destroy previous chart instance if exists
    if (chart) chart.destroy();

    // Resize canvas before creating chart
    resizeCanvas();

    // Initialize the chart with Chart.js
    const ctx = document.getElementById("chartCanvas").getContext("2d");
    chart = new Chart(ctx, {
        type: graphType,
        data: {
            labels: xData,
            datasets: [{
                label: `${yLabel} vs ${xLabel}`,
                data: yData,
                backgroundColor: graphType === 'bar' ? 'rgba(54, 162, 235, 0.6)' : 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                fill: false,
                tension: 0.3  // Add smoothing for line graph
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: xLabel }},
                y: { title: { display: true, text: yLabel }}
            }
        }
    });
});

// Resize canvas when window resizes
window.addEventListener("resize", resizeCanvas);
