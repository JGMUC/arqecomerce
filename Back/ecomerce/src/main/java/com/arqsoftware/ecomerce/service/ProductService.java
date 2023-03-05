package com.arqsoftware.ecomerce.service;

import java.util.List;

import com.arqsoftware.ecomerce.model.Product;

public interface ProductService {
    
    List <Product> getProducts();
    Product creaProduct(Product product);
    Product getProduct(Long id);

    void deleteProduct(Long id);
    Product updateProduct(Product product);

}
