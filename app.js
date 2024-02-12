async function convertCurrency() {
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

    openCameraBtn.addEventListener('click', async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            cameraPreview.srcObject = stream;
            cameraPreview.style.display = 'block';
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    });
});


let startY;
let isRefreshing = false;

document.addEventListener('DOMContentLoaded', function () {
    const openCameraBtn = document.getElementById('openCameraBtn');
    const cameraPreview = document.getElementById('cameraPreview');

    openCameraBtn.addEventListener('click', async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            cameraPreview.srcObject = stream;
            cameraPreview.style.display = 'block';
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    });

    document.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
        isRefreshing = false;
    });

    document.addEventListener('touchmove', (e) => {
        const currentY = e.touches[0].clientY;

        if (currentY - startY > 100 && !isRefreshing) {
            isRefreshing = true;
            // Add your refresh logic here
            location.reload(); // For simplicity, just reload the page
        }
    });

    document.addEventListener('touchend', () => {
        isRefreshing = false;
    });
});