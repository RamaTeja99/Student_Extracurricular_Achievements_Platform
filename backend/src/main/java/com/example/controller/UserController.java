package com.example.controller;

import com.example.entity.User;
import com.example.service.UserService;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;
    
    
    

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User loginData, HttpSession session) {
        String username = loginData.getUsername();
        String password = loginData.getPassword();
        User authenticatedUser = userService.authenticate(username, password);

        if (authenticatedUser != null) {
        	System.out.println(authenticatedUser.getRole());
            session.setAttribute("username", authenticatedUser.getUsername());
            session.setAttribute("role", authenticatedUser.getRole());
            session.setAttribute("roleSpecificId", authenticatedUser.getRoleSpecificId());
            return ResponseEntity.ok(authenticatedUser);
        } else {
            return ResponseEntity.status(401).body(null);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logged out successfully");
    }

    @GetMapping("/check-session")
    public ResponseEntity<String> checkSession(HttpSession session) {
    	
        if (session.getAttribute("username") != null) {
            return ResponseEntity.ok("Session active");
        } else {
            return ResponseEntity.status(401).body("Session expired");
        }
    }
}
