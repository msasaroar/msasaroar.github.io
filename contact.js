document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form from submitting

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (name && email) {
        alert(`Thank you, ${name}! We have received your message.`);
    } else {
        alert('Please fill out all required fields.');
    }
});
