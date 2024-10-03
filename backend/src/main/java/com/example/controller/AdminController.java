package com.example.controller;

import com.example.entity.College;
import com.example.entity.Student;
import com.example.entity.Achievement;
import com.example.service.CollegeService;
import com.example.service.StudentService;
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

    // Add College
    @PostMapping("/colleges")
    public College addCollege(@RequestBody College college) {
        return collegeService.save(college);
    }

    // Get All Colleges
    @GetMapping("/colleges")
    public List<College> getColleges() {
        return collegeService.findAll();
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

    // Delete College
    @DeleteMapping("/colleges/{id}")
    public void deleteCollege(@PathVariable Long id) {
        collegeService.delete(id);
    }
}
