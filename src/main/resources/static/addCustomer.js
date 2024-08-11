document.getElementById('addCustomerForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const customer = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        street: document.getElementById('street').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    };

    const response = await fetch('/customers', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
    });

    if (response.ok) {
        window.location.href = 'customerList.html'; // Redirect to the customer list
    } else {
        alert('Failed to add customer');
    }
});
