package com.app.server.model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity(name="prison")
@Table(name="prison")
public class Prison {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long prisonId;
	
	@NotBlank
	private String name;
	
	private String description;
	
	@NotBlank
	private String address;
	
	@NotBlank
	private String location;
	
	@NotBlank
	private String photo;
	
	@NotNull
	@Email
	private String email;
	
	@NotNull
	private int contact;
	

	public Prison() {
	}
	
	
	




	public Prison(Long prisonId,String name, String description, String address,
			String location,String photo, String email, int contact) {
		super();
		this.prisonId = prisonId;
		this.name = name;
		this.description = description;
		this.address = address;
		this.location = location;
		this.photo = photo;
		this.email = email;
		this.contact = contact;
	}







	public Long getPrisonId() {
		return prisonId;
	}


	public void setPrisonId(Long prisonId) {
		this.prisonId = prisonId;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public String getAddress() {
		return address;
	}


	public void setAddress(String address) {
		this.address = address;
	}


	public String getLocation() {
		return location;
	}


	public void setLocation(String location) {
		this.location = location;
	}


	public String getPhoto() {
		return photo;
	}


	public void setPhoto(String photo) {
		this.photo = photo;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public int getContact() {
		return contact;
	}


	public void setContact(int contact) {
		this.contact = contact;
	}

	
	
}