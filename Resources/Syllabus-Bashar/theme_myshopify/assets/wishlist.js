// Function to update wishlist count
function updateWishlistCount() {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const wishlistCountEl = document.getElementById("wishlist-count");
  const wishlistCount = wishlist.length;

  wishlistCountEl.textContent = wishlistCount;

  // Hide wishlist count element if count is zero
  if (wishlistCount === 0) {
    wishlistCountEl.style.display = "none";
  } else {
    wishlistCountEl.style.display = "";
  }
}

// Select elements with the classes .wishlist-icon and .pdp-wishlist-btn
document.querySelectorAll(".wishlist-icon, #pdp-wishlist-btn").forEach(element => {
  
  const variantHandle = element.getAttribute("data-variant-handle");
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  
  let icon; // To store the SVG element

  // Check if element is a .wishlist-icon (an SVG) or a .pdp-wishlist-btn (a button containing an SVG)
  if (element.classList.contains('wishlist-icon')) {
    icon = element; // If it's an SVG, we can assign it directly
  } else {
    // Otherwise, if it's a button, we need to find the SVG inside it
    icon = element.querySelector('svg');
  }

  // Check if this variant is already in the wishlist
  if (wishlist.includes(variantHandle)) {
    icon.classList.add("filled");
    icon.classList.remove("heart");
    icon.setAttribute("fill", "currentColor");
  }

  // Add or remove from wishlist on click
  element.addEventListener("click", function(event) {
    
    // Prevent default behavior
    event.preventDefault();
  
    wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const index = wishlist.indexOf(variantHandle);

    if (index === -1) {
      wishlist.push(variantHandle);
      icon.classList.add("filled");
      icon.classList.remove("heart");
      icon.setAttribute("fill", "currentColor");
    } else {
      wishlist.splice(index, 1);
      icon.classList.remove("filled");
      icon.classList.add("heart");
      icon.setAttribute("fill", "none");
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    // Update wishlist count
    updateWishlistCount();
  });
});

// Call updateWishlistCount on page load to set the initial count
document.addEventListener('DOMContentLoaded', updateWishlistCount);
