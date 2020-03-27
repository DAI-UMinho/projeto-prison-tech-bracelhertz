package com.app.server.model;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;


@Entity
@Table(name="userLog")
public class UserLog {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userLogId;
	
	@ManyToOne
    @JoinColumn(name = "updatedBy", referencedColumnName = "userId", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private User updatedBy;
	
	@ManyToOne
    @JoinColumn(name = "userUpdated", referencedColumnName = "userId", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private User userUpdated;
	
	private String description;
	
	
	@CreationTimestamp
	private LocalDateTime updatedTimestamp;


	public UserLog() {}


	public UserLog(Long userLogId, User updatedBy, User userUpdated, String description,
			LocalDateTime updatedTimestamp) {
		super();
		this.userLogId = userLogId;
		this.updatedBy = updatedBy;
		this.userUpdated = userUpdated;
		this.description = description;
		this.updatedTimestamp = updatedTimestamp;
	}


	public Long getUserLogId() {
		return userLogId;
	}


	public void setUserLogId(Long userLogId) {
		this.userLogId = userLogId;
	}


	public User getUpdatedBy() {
		return updatedBy;
	}


	public void setUpdatedBy(User updatedBy) {
		this.updatedBy = updatedBy;
	}


	public User getUserUpdated() {
		return userUpdated;
	}


	public void setUserUpdated(User userUpdated) {
		this.userUpdated = userUpdated;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public LocalDateTime getUpdatedTimestamp() {
		return updatedTimestamp;
	}


	public void setUpdatedTimestamp(LocalDateTime updatedTimestamp) {
		this.updatedTimestamp = updatedTimestamp;
	}




}