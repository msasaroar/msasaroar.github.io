document.addEventListener("DOMContentLoaded", () => {
    const cartItems = document.querySelector(".cart-items");
    const totalItems = document.getElementById("total-items");
    const totalPrice = document.getElementById("total-price");

    // Function to update cart summary
    function updateCartSummary() {
        const items = cartItems.querySelectorAll(".cart-item");
        let total = 0;

        items.forEach(item => {
            const price = parseFloat(item.querySelector(".item-price").textContent.replace("$", ""));
            total += price;
        });

        totalItems.textContent = items.length;
        totalPrice.textContent = total.toFixed(2);
    }

    // Event listener for removing items
    cartItems.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-item")) {
            e.target.closest(".cart-item").remove();
            updateCartSummary();
        }
    });

    // Initial update
    updateCartSummary();
});
