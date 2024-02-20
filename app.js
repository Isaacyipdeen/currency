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
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    var facingMode = "environment";

    openCameraBtn.addEventListener('click', async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: facingMode } });
            cameraPreview.srcObject = stream;
            cameraPreview.style.display = 'block';

            // Start tracking numbers in the camera feed
            tracking.track('#cameraPreview', new tracking.NumberColorTracker()).on('track', function (event) {
                if (event.data.length === 0) return;

                // Assuming the first detected number is the amount to convert
                const amount = event.data[0].color;

                // Call the currency conversion function
                convertCurrency(amount);

            });

        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    });

    async function convertCurrency(amount) {
        var apiKey = 'bf1df8288cbc2ed7c94bb1ce'; // Replace with your actual API key from Open Exchange Rates

        try {
            const response = await fetch(`https://open.er-api.com/v6/latest/THB?apikey=${apiKey}`);
            const data = await response.json();

            // Replace 'SGD' with the desired target currency code
            var rate = data.rates['SGD'];

            var convertedAmount = amount * rate;

            var convertedAmountDiv = document.getElementById("converted-amount");
            convertedAmountDiv.textContent = amount + " THB is approximately " + convertedAmount.toFixed(2) + " SGD";
        } catch (error) {
            console.error('Error fetching conversion data:', error);
        }
    }
});
