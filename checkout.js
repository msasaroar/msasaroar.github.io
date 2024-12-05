document.getElementById("checkout-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const fullName = document.getElementById("full-name").value;
    const email = document.getElementById("email").value;

    if (fullName && email) {
        alert(`Thank you, ${fullName}! Your order has been placed successfully.`);
    } else {
        alert("Please fill in all required fields.");
    }
});
