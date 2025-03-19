const cameraFeed = document.getElementById('cameraFeed');
const mosaicCanvas = document.getElementById('mosaicCanvas');
const ctx = mosaicCanvas.getContext('2d');

let tileImages = [];

async function fetchTileImages() {
    const response = await fetch('https://api.unsplash.com/photos/random?count=30&client_id=Pf61kvU2Leo1UxVFW1phlNpYSlN2WVzHHt5jYk5LB74');
    const data = await response.json();
    tileImages = data.map(photo => {
        const img = new Image();
        img.src = photo.urls.small;
        return img;
    });

    await Promise.all(tileImages.map(img => new Promise(resolve => img.onload = resolve)));
    console.log('Tile images loaded');
}

function startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            cameraFeed.srcObject = stream;
            cameraFeed.play();
            fetchTileImages().then(() => {
                requestAnimationFrame(updatePhotomosaic);
            });
        })
        .catch(err => {
            console.error('Error accessing camera: ', err);
        });
}

function getAverageColor(image) {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = image.width;
    tempCanvas.height = image.height;
    tempCtx.drawImage(image, 0, 0, image.width, image.height);
    const imageData = tempCtx.getImageData(0, 0, image.width, image.height).data;

    let r = 0, g = 0, b = 0;
    for (let i = 0; i < imageData.length; i += 4) {
        r += imageData[i];
        g += imageData[i + 1];
        b += imageData[i + 2];
    }

    const pixelCount = imageData.length / 4;
    return [r / pixelCount, g / pixelCount, b / pixelCount];
}

function findClosestTileColor(targetColor) {
    let closestTile = null;
    let closestDistance = Infinity;

    tileImages.forEach(tile => {
        const tileColor = getAverageColor(tile);
        const distance = Math.sqrt(
            Math.pow(targetColor[0] - tileColor[0], 2) +
            Math.pow(targetColor[1] - tileColor[1], 2) +
            Math.pow(targetColor[2] - tileColor[2], 2)
        );

        if (distance < closestDistance) {
            closestDistance = distance;
            closestTile = tile;
        }
    });

    return closestTile;
}

function updatePhotomosaic() {
    const tileWidth = 20;
    const tileHeight = 20;
    const rows = Math.floor(cameraFeed.videoHeight / tileHeight);
    const cols = Math.floor(cameraFeed.videoWidth / tileWidth);

    mosaicCanvas.width = cameraFeed.videoWidth;
    mosaicCanvas.height = cameraFeed.videoHeight;

    ctx.drawImage(cameraFeed, 0, 0, cameraFeed.videoWidth, cameraFeed.videoHeight);
    const targetImageData = ctx.getImageData(0, 0, cameraFeed.videoWidth, cameraFeed.videoHeight).data;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = col * tileWidth;
            const y = row * tileHeight;
            const pixelIndex = (y * cameraFeed.videoWidth + x) * 4;
            const targetColor = [
                targetImageData[pixelIndex],
                targetImageData[pixelIndex + 1],
                targetImageData[pixelIndex + 2]
            ];

            const closestTile = findClosestTileColor(targetColor);
            ctx.drawImage(closestTile, x, y, tileWidth, tileHeight);
        }
    }

    requestAnimationFrame(updatePhotomosaic);
}