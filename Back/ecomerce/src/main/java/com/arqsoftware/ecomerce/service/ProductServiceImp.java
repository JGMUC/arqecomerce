package com.arqsoftware.ecomerce.service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.arqsoftware.ecomerce.model.Product;
import com.arqsoftware.ecomerce.repository.ProductRepository;

@Service
public class ProductServiceImp implements ProductService{

    @Autowired
    private ProductRepository pRepository;
    

    @Override
    public List<Product> getProducts() {
        
        return pRepository.findAll();
        
    }


    @Override
    public Product creaProduct(Product product) {
        return pRepository.save(product);
    }


    @Override
    public Product getProduct(Long id) {
        Optional<Product> product=pRepository.findById(id);
        if (product.isPresent()){
            return product.get();
        }
        throw new RuntimeException("No se encontró el producto con id:" + id); 

    }


    @Override
    public void deleteProduct(Long id) {
        pRepository.deleteById(id);
    }


    @Override
    public Product updateProduct(Product product) {
        return pRepository.save(product);
    }
    
}
