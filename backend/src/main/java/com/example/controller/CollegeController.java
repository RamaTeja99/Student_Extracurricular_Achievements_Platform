package com.example.controller;

import com.example.entity.Student;
import com.example.entity.User;
import com.example.service.StudentService;
import com.example.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/colleges")
@CrossOrigin
public class CollegeController {
    @Autowired
    private StudentService studentService;
    
    @Autowired
    private UserService userService;

    @PostMapping("/{collegeId}/students")
    public Student addStudent(@PathVariable Long collegeId, @RequestBody Student student) {
    	 return studentService.save(collegeId, student);
    }
    
    @PostMapping("/addstudentuser")
    public User addCollegeUser(@RequestBody User user) {
    	  return userService.save(user);
    }
   

    @GetMapping("/{collegeId}/students")
    public List<Student> getStudents(@PathVariable Long collegeId) {
        return studentService.findByCollegeId(collegeId); // Modify to return students for specific college
    }
    @PutMapping("/students/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student student) {
        return studentService.update(id, student);
    }

    // Delete Student
    @DeleteMapping("/students/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentService.delete(id);
    }

}
