package com.arqsoftware.ecomerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.arqsoftware.ecomerce.model.Comentario;
import com.arqsoftware.ecomerce.service.ComentarioService;

@RestController
public class ComentarioController {
    @Autowired
    private ComentarioService cService;

    @GetMapping("/comentarios")
    public List<Comentario> getComentarios(){
        return cService.getComentarios();
    }
    @PostMapping("/comentarios")    
    public Comentario createComentario (@RequestBody Comentario comentario){
        return cService.creaComentario(comentario);
    }
}
