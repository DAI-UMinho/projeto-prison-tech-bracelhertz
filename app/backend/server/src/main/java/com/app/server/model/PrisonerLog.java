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


@Entity(name="prisonerLog")
@Table(name="prisonerLog")
public class PrisonerLog {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long prisonerLogId;
	
	@ManyToOne
    @JoinColumn(name = "updatedBy", referencedColumnName = "userId", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private User updatedBy;
	
	@ManyToOne
    @JoinColumn(name = "prisonerUpdated", referencedColumnName = "prisonerId", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Prisoner prisonerUpdated;
	
	private String description;
	
	@CreationTimestamp
	private LocalDateTime updatedTimestamp;
	
	
	public PrisonerLog() {
	}


	public PrisonerLog(Long prisonerLogId, User updatedBy, Prisoner prisonerUpdated, String description,
			LocalDateTime updatedTimestamp) {
		super();
		this.prisonerLogId = prisonerLogId;
		this.updatedBy = updatedBy;
		this.prisonerUpdated = prisonerUpdated;
		this.description = description;
		this.updatedTimestamp = updatedTimestamp;
	}


	public Long getPrisonerLogId() {
		return prisonerLogId;
	}


	public void setPrisonerLogId(Long prisonerLogId) {
		this.prisonerLogId = prisonerLogId;
	}


	public User getUpdatedBy() {
		return updatedBy;
	}


	public void setUpdatedBy(User updatedBy) {
		this.updatedBy = updatedBy;
	}


	public Prisoner getPrisonerUpdated() {
		return prisonerUpdated;
	}


	public void setPrisonerUpdated(Prisoner prisonerUpdated) {
		this.prisonerUpdated = prisonerUpdated;
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
