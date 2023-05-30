package com.arqsoftware.ecomerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.arqsoftware.ecomerce.model.Comentario;

public interface ComentarioRepository extends JpaRepository<Comentario,Long> {
    @Query("SELECT c FROM Comentario c WHERE c.idproducto = :idproducto order by c.fecha desc")
    List<Comentario> findByProductoId(@Param("idproducto") Long idproducto);   
}
