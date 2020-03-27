package com.app.server.model;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Entity(name = "user")
@Table(name = "user")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long userId;

	@NotBlank
	private String username;

	@NotBlank
	@Size(max = 100)
	private String password;

	@Temporal(TemporalType.DATE)
	private Date birthDate;

	@NotBlank
	private String nationality;

	@NotBlank
	private String address;

	@NotBlank
	private String location;

	private String name;

	@NotBlank
	private String photo;

	private int contact;

	@Email
	private String email;

	@ManyToOne
	@JoinColumn(name = "prisonId", referencedColumnName = "prisonId", nullable = true)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Prison prison;

	@ManyToOne
	@JoinColumn(name = "createdBy", referencedColumnName = "userId", nullable = true)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private User createdBy;

	@CreationTimestamp
	private LocalDateTime createdTimestamp;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "userRole", joinColumns = @JoinColumn(name = "userId"), inverseJoinColumns = @JoinColumn(name = "roleId"))
	private Set<Role> roles = new HashSet<>();

	@Column(nullable = true)
	@Temporal(TemporalType.TIMESTAMP)
	private Date lastLogin;

	public User() {
	}

	public User(Long userId, String username, String password, Date birthDate, String nationality, String address,
			String location, String name, String photo, int contact, String email, Prison prison, User createdBy,
			LocalDateTime createdTimestamp, Set<Role> roles, Date lastLogin) {
		super();
		this.userId = userId;
		this.username = username;
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String hashedPassword = passwordEncoder.encode(password);
		this.password = hashedPassword;
		this.birthDate = birthDate;
		this.nationality = nationality;
		this.address = address;
		this.location = location;
		this.name = name;
		this.photo = photo;
		this.contact = contact;
		this.email = email;
		this.prison = prison;
		this.createdBy = createdBy;
		this.createdTimestamp = createdTimestamp;
		this.roles = roles;
		this.lastLogin = lastLogin;
	}

	public Long getUserId() {
		return userId;
	}

	public String getUsername() {
		return username;
	}

	public String getPassword() {
		return password;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public String getNationality() {
		return nationality;
	}

	public String getAddress() {
		return address;
	}

	public String getLocation() {
		return location;
	}

	public String getName() {
		return name;
	}

	public String getPhoto() {
		return photo;
	}

	public int getContact() {
		return contact;
	}

	public String getEmail() {
		return email;
	}

	public Prison getPrison() {
		return prison;
	}

	public User getCreatedBy() {
		return createdBy;
	}

	public LocalDateTime getCreatedTimestamp() {
		return createdTimestamp;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public Date getLastLogin() {
		return lastLogin;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String hashedPassword = passwordEncoder.encode(password);
		this.password = hashedPassword;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public void setNationality(String nationality) {
		this.nationality = nationality;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public void setContact(int contact) {
		this.contact = contact;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setPrison(Prison prison) {
		this.prison = prison;
	}

	public void setCreatedBy(User createdBy) {
		this.createdBy = createdBy;
	}

	public void setCreatedTimestamp(LocalDateTime createdTimestamp) {
		this.createdTimestamp = createdTimestamp;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public void setLastLogin(Date lastLogin) {
		this.lastLogin = lastLogin;
	}

}