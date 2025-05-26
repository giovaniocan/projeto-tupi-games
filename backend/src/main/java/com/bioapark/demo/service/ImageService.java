package com.bioapark.demo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class ImageService {

    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

    @Value("${server.port:8080}")
    private String serverPort;

    // Buscar imagem como Resource
    public Resource getImageResource(String filename) throws IOException {
        Path filePath = Paths.get(uploadDir).resolve(filename);
        Resource resource = new UrlResource(filePath.toUri());

        if (resource.exists() && resource.isReadable()) {
            return resource;
        } else {
            throw new IOException("Arquivo não encontrado ou não legível: " + filename);
        }
    }

    // Detectar tipo MIME da imagem
    public String getImageContentType(String filename) throws IOException {
        Path filePath = Paths.get(uploadDir).resolve(filename);
        String contentType = Files.probeContentType(filePath);
        return contentType != null ? contentType : "image/jpeg";
    }
}