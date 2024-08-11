document.addEventListener('DOMContentLoaded', function() {
    loadCustomers();

    document.getElementById('syncButton').addEventListener('click', async function() {
        const token = localStorage.getItem('token');
        const response = await fetch('https://qa.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const customers = await response.json();
            syncCustomers(customers);
        } else {
            alert('Failed to sync customers');
        }
    });
});

async function loadCustomers() {
    const response = await fetch('/customers', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (response.ok) {
        const customers = await response.json();
        populateCustomerTable(customers);
    } else {
        alert('Failed to load customers');
    }
}

function populateCustomerTable(customers) {
    const tableBody = document.querySelector('#customerTable tbody');
    tableBody.innerHTML = '';
    customers.forEach(customer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${customer.id}</td>
            <td>${customer.firstName}</td>
            <td>${customer.lastName}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td><button onclick="deleteCustomer(${customer.id})">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
}

async function syncCustomers(remoteCustomers) {
    const response = await fetch('/sync-customers', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(remoteCustomers)
    });

    if (response.ok) {
        loadCustomers();
    } else {
        alert('Failed to sync customers');
    }
}

async function deleteCustomer(id) {
    const response = await fetch(`/customers/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (response.ok) {
        loadCustomers();
    } else {
        alert('Failed to delete customer');
    }
}
