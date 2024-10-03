package com.example.service;

import com.example.entity.User;
import com.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User findByUsernameAndRole(String username, String role) {
        return userRepository.findByUsernameAndRole(username, role);
    }

    public User save(User user) {
        return userRepository.save(user);
    }
    public User authenticate(String username, String password, String role) {
        User user = findByUsernameAndRole(username, role);
        return (user != null && user.getPassword().equals(password)) ? user : null;
    }
}
