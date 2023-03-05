package com.arqsoftware.ecomerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.arqsoftware.ecomerce.model.Product;

public interface  ProductRepository extends JpaRepository<Product,Long> {
    
}
