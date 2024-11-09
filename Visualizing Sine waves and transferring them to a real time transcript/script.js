const canvas = document.getElementById("visualizer");
const canvasContext = canvas.getContext("2d");
const transcriptDiv = document.getElementById("transcript");
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// Set up audio processing for visualizer
async function setupAudioProcessing() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
    // Create audio context and connect stream
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    source.connect(analyser);
    const dataArray = new Uint8Array(analyser.fftSize);

    function draw() {
      requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray);
      canvasContext.clearRect(0, 0, WIDTH, HEIGHT);
      canvasContext.lineWidth = 2;
      canvasContext.strokeStyle = '#00ff00';
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

    draw();

  } catch (err) {
    console.error("Error accessing audio:", err);
  }
}

// Set up speech recognition for live transcription
function setupSpeechRecognition() {
  // Check for SpeechRecognition support
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    transcriptDiv.innerHTML = "Speech Recognition not supported in this browser.";
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = true; // Keep listening for continuous transcription
  recognition.interimResults = true; // Show interim results for live updates

  recognition.onresult = (event) => {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = 0; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript + ' ';
      } else {
        interimTranscript += transcript;
      }
    }

    // Update the transcript div with final and interim results
    transcriptDiv.innerHTML = finalTranscript + '<em>' + interimTranscript + '</em>';
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
  };

  recognition.onend = () => {
    // Restart recognition if needed for continuous listening
    recognition.start();
  };

  recognition.start();
}

// Initialize the audio visualizer and speech recognition
setupAudioProcessing();
setupSpeechRecognition();
