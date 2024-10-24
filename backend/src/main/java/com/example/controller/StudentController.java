package com.example.controller;

import com.example.entity.Achievement;
import com.example.service.AchievementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin
public class StudentController {
	@Autowired
    private AchievementService achievementService;

    // Get Achievements by Student
	@GetMapping("/{studentId}/achievements")
	public List<Achievement> getAchievementsByStudent(@PathVariable Long studentId) {
	    System.out.println("Fetching achievements for student ID: " + studentId);
	    List<Achievement> achievements = achievementService.findByStudentId(studentId);
	    System.out.println("Achievements found: " + achievements);
	    return achievements;
	}

}
