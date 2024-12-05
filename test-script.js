document.addEventListener("DOMContentLoaded", () => {
    const orderNumber = Math.floor(Math.random() * 100000);
    const totalAmount = 59.99; // Replace with actual value
    const items = 3;          // Replace with actual value

    document.querySelector(".order-details").innerHTML = `
        <h2>Order Details</h2>
        <p><strong>Order Number:</strong> #${orderNumber}</p>
        <p><strong>Items:</strong> ${items}</p>
        <p><strong>Total Amount:</strong> $${totalAmount.toFixed(2)}</p>
        <p><strong>Payment Method:</strong> Credit Card</p>
    `;
});
