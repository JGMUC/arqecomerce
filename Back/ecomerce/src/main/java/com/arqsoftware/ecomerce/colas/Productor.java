package com.arqsoftware.ecomerce.colas;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/colas/producer")
public class Productor {

    @Autowired
    private JmsTemplate jmsTemplate;

    @GetMapping("/{message}")
    public void sendMessage(@PathVariable("message") String message) {
        jmsTemplate.convertAndSend("ecomerce", message);
    }
}
