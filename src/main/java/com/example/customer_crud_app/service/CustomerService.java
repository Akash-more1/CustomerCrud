package com.example.customer_crud_app.service;


import com.example.customer_crud_app.model.Customer;
import com.example.customer_crud_app.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public List<Customer> getAllCustomers(Integer page, Integer size, String sort, String search) {
        Pageable pageable = PageRequest.of(page != null ? page : 0, size != null ? size : 10,
                Sort.by(Sort.Order.asc(sort != null ? sort : "id")));
        if (search != null && !search.isEmpty()) {
            Page<Customer> customerPage = customerRepository.findByFirstNameContainingIgnoreCase(search, pageable);
            return customerPage.getContent();
        } else {
            return customerRepository.findAll(pageable).getContent();
        }
    }

    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id).orElse(null);
    }

    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public Customer updateCustomer(Long id, Customer customer) {
        if (customerRepository.existsById(id)) {
            customer.setId(id);
            return customerRepository.save(customer);
        } else {
            return null;
        }
    }

    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }
}

