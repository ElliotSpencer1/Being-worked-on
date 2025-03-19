const openCameraButton = document.getElementById('openCamera');
const cameraFeed = document.getElementById('cameraFeed');
const context = cameraFeed.getContext('2d');

openCameraButton.addEventListener('click', async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    openCameraButton.style.display = 'none';
    cameraFeed.style.display = 'block';

    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();

    function drawPixelArt() {
        context.drawImage(video, 0, 0, cameraFeed.width, cameraFeed.height);
        let imageData = context.getImageData(0, 0, cameraFeed.width, cameraFeed.height);
        let data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg; // Red
            data[i + 1] = avg; // Green
            data[i + 2] = avg; // Blue
        }

        context.putImageData(imageData, 0, 0);
        requestAnimationFrame(drawPixelArt);
    }

    video.addEventListener('loadeddata', () => {
        cameraFeed.width = window.innerWidth;
        cameraFeed.height = window.innerHeight;
        drawPixelArt();
    });
});