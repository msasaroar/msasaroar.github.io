document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Collect form data
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const zip = document.getElementById('zip').value;

    // Payment information
    const cardNumber = document.getElementById('card-number').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;

    // Display form data in console (for testing)
    console.log('Billing Information:');
    console.log(`Name: ${fullName}, Email: ${email}, Phone: ${phone}, Address: ${address}, City: ${city}, ZIP: ${zip}`);
    console.log('Payment Information:');
    console.log(`Card Number: ${cardNumber}, Expiry: ${expiry}, CVV: ${cvv}`);

    alert('Order placed successfully!');
});
