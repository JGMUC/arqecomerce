package com.arqsoftware.ecomerce.service;

import java.util.List;

import com.arqsoftware.ecomerce.model.Marca;

public interface MarcaService {
    List <Marca> getMarcas();
    Marca creaMarca(Marca marca);
    Marca getMarca(Long id);

    void deleteMarca(Long id);
    Marca updateMarca(Marca marca);
}
