package com.example.controller;

import com.example.entity.Achievement;
import com.example.service.AchievementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
@CrossOrigin
public class StudentController {
	@Autowired
    private AchievementService achievementService;

    // Get Achievements by Student
    @GetMapping("/{studentId}/achievements")
    public List<Achievement> getAchievementsByStudent(@PathVariable Long studentId) {
        return achievementService.findByStudentId(studentId);
    }

    // Add Achievement
    @PostMapping("/achievements")
    public Achievement addAchievement(@RequestBody Achievement achievement) {
        return achievementService.save(achievement);
    }

    // Update Achievement
    @PutMapping("/achievements/{id}")
    public Achievement updateAchievement(@PathVariable Long id, @RequestBody Achievement achievement) {
        return achievementService.update(id, achievement);
    }

    // Delete Achievement
    @DeleteMapping("/achievements/{id}")
    public void deleteAchievement(@PathVariable Long id) {
        achievementService.delete(id);
    }
}
