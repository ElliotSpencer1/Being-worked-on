let xData = [];
let yData = [];
let chart;

// Function to add X and Y values using the input fields
document.getElementById("addXValue").addEventListener("click", () => {
    const xInput = document.getElementById("xValueInput");
    const graphType = document.getElementById("graphType").value;
    let xVal = xInput.value.trim();

    if (graphType === "line" && isNaN(xVal) && xVal) {
        let proceed = confirm("You entered a string value for the X-axis, which is typically numeric for a line graph. Do you want to proceed?");
        if (proceed) {
            xData.push(xVal);
        } else {
            return;
        }
    } else if (graphType === "bar" && xVal) {
        xData.push(xVal);
    } else if (graphType === "line" && !isNaN(xVal) && xVal) {
        xData.push(Number(xVal));
    }

    if (xVal) {
        xInput.value = '';
        xInput.placeholder = "Enter X value";
        updateDataDisplay();
    }
});

document.getElementById("addYValue").addEventListener("click", () => {
    const yInput = document.getElementById("yValueInput");
    const yVal = yInput.value;
    if (yVal) {
        yData.push(Number(yVal));
        yInput.value = '';
        yInput.placeholder = "Enter Y value";
        updateDataDisplay();
    }
});

// Function to update the displayed data
function updateDataDisplay() {
    document.getElementById("xValues").innerText = `X Values: ${xData.join(", ")}`;
    document.getElementById("yValues").innerText = `Y Values: ${yData.join(", ")}`;
}

// Resize canvas once when creating the chart
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

    // Destroy previous chart instance if it exists
    if (chart) {
        chart.destroy();
    }

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
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                x: { 
                    title: { display: true, text: xLabel },
                    type: graphType === "bar" ? "category" : "linear"
                },
                y: { title: { display: true, text: yLabel }}
            }
        }
    });
});
