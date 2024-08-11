package com.example.customer_crud_app.repository;

import com.example.customer_crud_app.model.Customer;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer,Long>{
    Page<Customer> findByFirstNameContainingIgnoreCase(String search, Pageable pageable);

    Optional<Customer> findByFirstName(String username);
}
