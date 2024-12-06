const video = document.getElementById('video');
const ascii = document.getElementById('ascii');

const asciiChars = ['@', '#', 'S', '%', '?', '*', '+', ';', ':', ',', '.'];

async function setupCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    video.addEventListener('loadeddata', () => {
        drawAscii();
        setInterval(drawAscii, 33);  // Updates around 30 times per second for smoother output
    });
}

function drawAscii() {
    const width = window.innerWidth / 6;
    const height = window.innerHeight / 12;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let asciiImage = '';

    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            const offset = (y * canvas.width + x) * 4;
            const r = imageData.data[offset];
            const g = imageData.data[offset + 1];
            const b = imageData.data[offset + 2];
            const avg = (r + g + b) / 3;
            const charIndex = Math.floor((avg / 255) * (asciiChars.length - 1));
            asciiImage += asciiChars[charIndex];
        }
        asciiImage += '\n';
    }

    ascii.textContent = asciiImage;
}

setupCamera();
