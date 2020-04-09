package com.app.server.payload.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class CreateUserAnnotation {

	@NotNull(message = "Can't be blank")
	private Long userDestId;

	@NotBlank(message = "Can't be blank")
	private String title;

	@NotBlank(message = "Can't be blank")
	private String description;

	public CreateUserAnnotation(Long userDestId, String title, String description) {
		super();
		this.userDestId = userDestId;
		this.title = title;
		this.description = description;
	}

	public Long getUserDestId() {
		return userDestId;
	}

	public void setUserDestId(Long userDestId) {
		this.userDestId = userDestId;
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
}
