package com.arqsoftware.ecomerce.colas;

import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

@Component
public class Consumidor {
    
    @JmsListener(destination = "ecomerce")
    public void receiveMessage(String message) {
        // Procesar el mensaje recibido desde la cola
        System.out.println("Mensaje recibido: " + message);
    }
}
