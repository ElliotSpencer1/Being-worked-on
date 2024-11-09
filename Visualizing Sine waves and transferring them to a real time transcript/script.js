const canvas = document.getElementById("visualizer");
const canvasContext = canvas.getContext("2d");
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// Set up audio processing
async function setupAudioProcessing() {
  try {
    // Request access to the microphone
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
    // Create a new AudioContext and source
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(stream);

    // Create an analyser node for audio data processing
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048; // Sets the number of data points in the frequency data
    source.connect(analyser);

    // Data array for storing audio data
    const dataArray = new Uint8Array(analyser.fftSize);
    
    // Function to draw the waveform
    function draw() {
      requestAnimationFrame(draw);

      // Get audio data and clear canvas
      analyser.getByteTimeDomainData(dataArray);
      canvasContext.clearRect(0, 0, WIDTH, HEIGHT);

      // Style the waveform
      canvasContext.lineWidth = 2;
      canvasContext.strokeStyle = '#00ff00';

      // Begin drawing path
      canvasContext.beginPath();
      const sliceWidth = WIDTH / analyser.fftSize;
      let x = 0;

      for (let i = 0; i < analyser.fftSize; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * HEIGHT) / 2;

        if (i === 0) {
          canvasContext.moveTo(x, y);
        } else {
          canvasContext.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasContext.lineTo(WIDTH, HEIGHT / 2);
      canvasContext.stroke();
    }

    draw(); // Start the drawing loop

  } catch (err) {
    console.error("Error accessing audio:", err);
  }
}

// Call the function to set up audio processing
setupAudioProcessing();