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
import org.hibernate.annotations.UpdateTimestamp;

@Entity(name = "alertLog")
@Table(name = "alertLog")
public class AlertLog {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long alertLogId;

	@ManyToOne
	@JoinColumn(name = "prisonerId", referencedColumnName = "prisonerId", nullable = true)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Prisoner prisonerId;

	private String title;

	private String description;

	@CreationTimestamp
	private LocalDateTime createdTimestamp;

	@UpdateTimestamp
	private LocalDateTime lastUpdatedTimestamp;

	public AlertLog() {
	}

	public AlertLog(Long alertLogId, Prisoner prisonerId, String title, String description,
			LocalDateTime createdTimestamp, LocalDateTime lastUpdatedTimestamp) {
		super();
		this.alertLogId = alertLogId;
		this.prisonerId = prisonerId;
		this.title = title;
		this.description = description;
		this.createdTimestamp = createdTimestamp;
		this.lastUpdatedTimestamp = lastUpdatedTimestamp;
	}

	public Long getAlertLogId() {
		return alertLogId;
	}

	public void setAlertLogId(Long alertLogId) {
		this.alertLogId = alertLogId;
	}

	public Prisoner getPrisonerId() {
		return prisonerId;
	}

	public void setPrisonerId(Prisoner prisonerId) {
		this.prisonerId = prisonerId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDateTime getCreatedTimestamp() {
		return createdTimestamp;
	}

	public void setCreatedTimestamp(LocalDateTime createdTimestamp) {
		this.createdTimestamp = createdTimestamp;
	}

	public LocalDateTime getLastUpdatedTimestamp() {
		return lastUpdatedTimestamp;
	}

	public void setLastUpdatedTimestamp(LocalDateTime lastUpdatedTimestamp) {
		this.lastUpdatedTimestamp = lastUpdatedTimestamp;
	}
}