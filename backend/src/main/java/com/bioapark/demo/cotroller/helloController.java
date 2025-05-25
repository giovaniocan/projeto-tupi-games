package com.bioapark.demo.cotroller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController  // ✅ Mudei para @RestController (retorna JSON)
@RequestMapping("/api/hello")  // ✅ Adicionei /api no path
public class helloController {

    @GetMapping
    public String hello() {
        return "hello worl, esta merda está funcionando";
    }

}
