package com.example.service;

import com.example.entity.User;
import com.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User findByUsernameandPassword(String username,String password) {
        return userRepository.findByUsernameAndPassword(username,password);
    }
    public User save(User user) {
    	System.out.println(user.toString());
        User singleUser= userRepository.save(user);
        System.out.println(singleUser.toString());
        return singleUser;
    }
    public User authenticate(String username, String password) {
        User user = findByUsernameandPassword(username,password);
        return (user != null && user.getPassword().equals(password)) ? user : null;
    }
}
