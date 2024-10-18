package com.example.controller;

import com.example.entity.College;
import com.example.entity.Student;
import com.example.entity.User;
import com.example.entity.Achievement;
import com.example.service.CollegeService;
import com.example.service.StudentService;
import com.example.service.UserService;
import com.example.service.AchievementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {
	@Autowired
    private CollegeService collegeService;
	@Autowired
    private StudentService studentService;
	@Autowired
    private AchievementService achievementService;
	@Autowired
	private UserService userService;

    // Add College
    @PostMapping("/colleges")
    public College addCollege(@RequestBody College college) {
        return collegeService.save(college);
        
    }
    @PostMapping("/addcollegeuser")
    public User addCollegeUser(@RequestBody User user) {
    	  System.out.println("Admin "+user);
    	  return userService.save(user);
    }

    // Get All Colleges
    @GetMapping("/colleges")
    public List<College> getColleges() {
        return collegeService.findAll();
        
    }
    @GetMapping("/colleges/{id}")
    public College getCollegeById(@PathVariable Long id) {
        return collegeService.findById(id);
    }
    @GetMapping("/college-user/{collegeId}")
    public User getCollegeUserByCollegeId(@PathVariable int collegeId) {
        return userService.getCollegeUserByCollegeId(collegeId);
    }

    

    // Get All Students
    @GetMapping("/students")
    public List<Student> getStudents() {
        return studentService.findAll();
    }

    // Get All Achievements
    @GetMapping("/achievements")
    public List<Achievement> getAllAchievements() {
        return achievementService.findAll();
    }

    // Update College
    @PutMapping("/colleges/{id}")
    public College updateCollege(@PathVariable Long id, @RequestBody College college) {
        return collegeService.update(id, college);
    }
    @PutMapping("/update-college-credentials/{collegeId}")
    public String updateCollegeCredentials(@PathVariable int collegeId,
                                           @RequestParam String newUsername,
                                           @RequestParam String newPassword) {
        userService.updateCollegeCredentialsByAdmin(collegeId, newUsername, newPassword);
        return "College credentials updated successfully";
    }

    // Delete College
    @DeleteMapping("/colleges/{id}")
    public void deleteCollege(@PathVariable Long id) {
        collegeService.delete(id);
    }
}
