package com.example.service;

import com.example.entity.User;
import com.example.repository.UserRepository;

import java.util.Optional;

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
    public void updateCollegeCredentialsByAdmin(int collegeId, String newUsername, String newPassword) {
        Optional<User> userOptional = userRepository.findByRoleSpecificIdAndRole(collegeId, "college");
        
        if (userOptional.isPresent()) {
            User collegeUser = userOptional.get();
            collegeUser.setUsername(newUsername);
            collegeUser.setPassword(newPassword);
            userRepository.save(collegeUser);
        } else {
            throw new IllegalArgumentException("College not found with ID: " + collegeId);
        }
    }
    public User getCollegeUserByCollegeId(int collegeId) {
        Optional<User> userOptional = userRepository.findByRoleSpecificIdAndRole(collegeId, "college");

        if (userOptional.isPresent()) {
            return userOptional.get(); // Return the college user
        } else {
            throw new IllegalArgumentException("College not found with ID: " + collegeId);
        }
    }
    public void deleteCollegeUserByCollegeId(int collegeId) {
        Optional<User> userOptional = userRepository.findByRoleSpecificIdAndRole(collegeId, "college");
        
        if (userOptional.isPresent()) {
            userRepository.delete(userOptional.get());
        } else {
            throw new IllegalArgumentException("No user found with college ID: " + collegeId);
        }
    }


}
