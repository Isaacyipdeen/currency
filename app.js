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