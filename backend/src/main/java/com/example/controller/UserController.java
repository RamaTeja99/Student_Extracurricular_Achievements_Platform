package com.example.controller;

import com.example.entity.User;
import com.example.service.UserService;
import com.example.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import io.jsonwebtoken.Claims;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    
    

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginData) {
        User authenticatedUser = userService.authenticate(loginData.getUsername(), loginData.getPassword());

        if (authenticatedUser != null) {
            String token = jwtUtil.generateToken(
                authenticatedUser.getUsername(),
                String.valueOf(authenticatedUser.getRole()),
                String.valueOf(authenticatedUser.getRoleSpecificId())  // Add missing third parameter
            );

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("username", authenticatedUser.getUsername());
            response.put("role", authenticatedUser.getRole());
            response.put("roleSpecificId", authenticatedUser.getRoleSpecificId());

            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    @PostMapping("/validate-token")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String token) {
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            try {
                if (jwtUtil.validateToken(token)) {
                    Claims claims = jwtUtil.getClaims(token);
                    Map<String, Object> response = new HashMap<>();
                    response.put("valid", true);
                    response.put("username", claims.getSubject());
                    response.put("role", claims.get("role"));
                    response.put("roleSpecificId", claims.get("roleSpecificId"));
                    return ResponseEntity.ok(response);
                }
            } catch (Exception e) {
                // Token validation failed
            }
        }
        return ResponseEntity.status(401).body(Map.of("valid", false));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return ResponseEntity.ok("Logged out successfully");
    }
}
