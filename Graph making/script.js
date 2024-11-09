// Set up variables for storing data and chart instance
let xData = [];
let yData = [];
let chart;

// Function to add X and Y values
document.getElementById("addXValue").addEventListener("click", () => {
    const xVal = prompt("Enter X value:");
    if (xVal) {
        xData.push(xVal);
        updateDataDisplay();
    }
});

document.getElementById("addYValue").addEventListener("click", () => {
    const yVal = prompt("Enter Y value:");
    if (yVal) {
        yData.push(yVal);
        updateDataDisplay();
    }
});

// Function to update displayed data
function updateDataDisplay() {
    document.getElementById("xValues").innerText = `X Values: ${xData.join(", ")}`;
    document.getElementById("yValues").innerText = `Y Values: ${yData.join(", ")}`;
}

// Plot Graph based on the selected type and data
document.getElementById("plotButton").addEventListener("click", () => {
    const graphType = document.getElementById("graphType").value;
    const xLabel = document.getElementById("xLabel").value + ' (' + document.getElementById("xUnit").value + ')';
    const yLabel = document.getElementById("yLabel").value + ' (' + document.getElementById("yUnit").value + ')';

    // Destroy previous chart instance
    if (chart) chart.destroy();

    // Initialize the chart
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
                fill: false
            }]
        },
        options: {
            scales: {
                x: { title: { display: true, text: xLabel }},
                y: { title: { display: true, text: yLabel }}
            }
        }
    });
});
