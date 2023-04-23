package com.arqsoftware.ecomerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.arqsoftware.ecomerce.model.Comentario;

public interface ComentarioRepository extends JpaRepository<Comentario,Long> {
    
}
