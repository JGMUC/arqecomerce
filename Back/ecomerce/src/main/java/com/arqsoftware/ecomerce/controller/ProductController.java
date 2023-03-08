package com.arqsoftware.ecomerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.arqsoftware.ecomerce.model.Product;
import com.arqsoftware.ecomerce.service.ProductService;

@RestController
public class ProductController {

    @Autowired
    private ProductService pService;

    @GetMapping("/productos")
    public List<Product> getProducts (){
        return pService.getProducts();
    }
    @GetMapping("/productos/{id}")
    public Product getProduct (@PathVariable("id") Long id){
        return pService.getProduct(id);
    }

    @DeleteMapping("/productos")    
    public void deleteProduct (@RequestParam("id") Long id){
      pService.deleteProduct(id);
    }

    @PostMapping("/productos")    
    public Product createProduct (@RequestBody Product product){
        return pService.creaProduct(product);
    }

    @PutMapping("/productos/{id}")    
    public Product updateProduct (@PathVariable("id") Long id,@RequestBody Product product){
        product.setId(id);
        return pService.updateProduct(product);
    }
}