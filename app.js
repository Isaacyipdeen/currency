/*async function convertCurrency() {
    var amount = document.getElementById("amount").value;
    var apiKey = 'bf1df8288cbc2ed7c94bb1ce'; // Replace with your actual API key from Open Exchange Rates

    try {
        const response = await fetch(`https://open.er-api.com/v6/latest/THB?apikey=${apiKey}`);
        const data = await response.json();

        // Replace 'THB' with the desired target currency
        var rate = data.rates['SGD'];

        var convertedAmount = amount * rate;

        var convertedAmountDiv = document.getElementById("converted-amount");
        convertedAmountDiv.textContent = amount + " THB is approximately " + convertedAmount.toFixed(2) + " SGD";
    } catch (error) {
        console.error('Error fetching conversion data:', error);
    }
}


document.addEventListener('DOMContentLoaded', function () {
    const openCameraBtn = document.getElementById('openCameraBtn');
    const cameraPreview = document.getElementById('cameraPreview');

    var facingMode = "environment";

    openCameraBtn.addEventListener('click', async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: {facingMode: facingMode }});
            cameraPreview.srcObject = stream;
            cameraPreview.style.display = 'block';
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    });
});
*/

document.addEventListener('DOMContentLoaded', function () {
    const openCameraBtn = document.getElementById('openCameraBtn');
    const cameraPreview = document.getElementById('cameraPreview');
    const overlay = document.getElementById('overlay');

    var facingMode = "environment";

    openCameraBtn.addEventListener('click', async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: facingMode } });
            cameraPreview.srcObject = stream;
            cameraPreview.style.display = 'block';

            // Wait for the video to be loaded and start processing frames
            cameraPreview.addEventListener('loadeddata', function () {
                setInterval(() => {
                    detectNumber();
                }, 1000); // Adjust the interval as needed
            });

        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    });

    function detectNumber() {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = cameraPreview.videoWidth;
        canvas.height = cameraPreview.videoHeight;

        // Draw the current frame on the canvas
        context.drawImage(cameraPreview, 0, 0, canvas.width, canvas.height);

        // Extract pixel data
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        // Simple example: Sum all pixel values (brightness)
        const sum = pixels.reduce((acc, value) => acc + value, 0);

        // Display the detected number on the overlay
        overlay.textContent = "Detected Number: " + sum;

        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
});
