package com.app.server.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;


@Entity(name="anotation")
@Table(name="anotation")
public class Anotation{
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long anotationId;
	
	
	@ManyToOne()
    @JoinColumn(name = "createdBy", referencedColumnName = "userId", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
	private User createdBy;
	
	@ManyToOne()
    @JoinColumn(name = "userDestId", referencedColumnName = "userId", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
	private User userDest;
	
	
	@ManyToOne()
    @JoinColumn(name = "prisonDestId", referencedColumnName = "prisonId", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
	private Prison prisonDest;
	
	
	@ManyToOne()
    @JoinColumn(name = "prisonerDestId", referencedColumnName = "prisonerId", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
	private Prisoner prisonerDest;
	
	@ManyToOne()
    @JoinColumn(name = "anotationDestId", referencedColumnName = "anotationId", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
	private Anotation anotationDest;
	
	@NotBlank
	private String title;
	
	
	@NotBlank
	private String description;
	
	@CreationTimestamp
	private Date createdTimestamp;
	
	@UpdateTimestamp
	private Date lastUpdatedTimestamp;

	public Anotation() {}

	public Anotation(Long anotationId, User createdBy, User userDest, Prison prisonDest, Prisoner prisonerDest,
			Anotation anotationDest, String title, String description, Date createdTimestamp,
			Date lastUpdatedTimestamp) {
		super();
		this.anotationId = anotationId;
		this.createdBy = createdBy;
		this.userDest = userDest;
		this.prisonDest = prisonDest;
		this.prisonerDest = prisonerDest;
		this.anotationDest = anotationDest;
		this.title = title;
		this.description = description;
		this.createdTimestamp = createdTimestamp;
		this.lastUpdatedTimestamp = lastUpdatedTimestamp;
	}

	public Long getAnotationId() {
		return anotationId;
	}

	public void setAnotationId(Long anotationId) {
		this.anotationId = anotationId;
	}

	public User getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(User createdBy) {
		this.createdBy = createdBy;
	}

	public User getUserDest() {
		return userDest;
	}

	public void setUserDest(User userDest) {
		this.userDest = userDest;
	}

	public Prison getPrisonDest() {
		return prisonDest;
	}

	public void setPrisonDest(Prison prisonDest) {
		this.prisonDest = prisonDest;
	}

	public Prisoner getPrisonerDest() {
		return prisonerDest;
	}

	public void setPrisonerDest(Prisoner prisonerDest) {
		this.prisonerDest = prisonerDest;
	}

	public Anotation getAnotationDest() {
		return anotationDest;
	}

	public void setAnotationDest(Anotation anotationDest) {
		this.anotationDest = anotationDest;
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

	public Date getCreatedTimestamp() {
		return createdTimestamp;
	}

	public void setCreatedTimestamp(Date createdTimestamp) {
		this.createdTimestamp = createdTimestamp;
	}

	public Date getLastUpdatedTimestamp() {
		return lastUpdatedTimestamp;
	}

	public void setLastUpdatedTimestamp(Date lastUpdatedTimestamp) {
		this.lastUpdatedTimestamp = lastUpdatedTimestamp;
	}


}