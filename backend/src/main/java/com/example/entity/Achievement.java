package com.example.entity;
import javax.persistence.*;

@Entity
public class Achievement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String activityName;
    private String activityDescription;
    private String activityCategory;
    private String firstPosition;
    private String secondPosition;
    private String thirdPosition;
    private String participation;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getActivityName() {
		return activityName;
	}
	public void setActivityName(String activityName) {
		this.activityName = activityName;
	}
	public String getActivityDescription() {
		return activityDescription;
	}
	public void setActivityDescription(String activityDescription) {
		this.activityDescription = activityDescription;
	}
	public String getActivityCategory() {
		return activityCategory;
	}
	public void setActivityCategory(String activityCategory) {
		this.activityCategory = activityCategory;
	}
	public String getFirstPosition() {
		return firstPosition;
	}
	public void setFirstPosition(String firstPosition) {
		this.firstPosition = firstPosition;
	}
	public String getSecondPosition() {
		return secondPosition;
	}
	public void setSecondPosition(String secondPosition) {
		this.secondPosition = secondPosition;
	}
	public String getThirdPosition() {
		return thirdPosition;
	}
	public void setThirdPosition(String thirdPosition) {
		this.thirdPosition = thirdPosition;
	}
	public String getParticipation() {
		return participation;
	}
	public void setParticipation(String participation) {
		this.participation = participation;
	}
	public Student getStudent() {
		return student;
	}
	public void setStudent(Student student) {
		this.student = student;
	}
	

    
}
