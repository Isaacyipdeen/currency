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

    async function detectNumber() {
        Tesseract.recognize(
            cameraPreview,
            'eng', // Language code, e.g., 'eng' for English
            { logger: info => console.log(info) }
        ).then(({ data: { text } }) => {
            // Display the detected number on the overlay
            overlay.textContent = "Detected Number: " + text.trim();
        });
    }
});
