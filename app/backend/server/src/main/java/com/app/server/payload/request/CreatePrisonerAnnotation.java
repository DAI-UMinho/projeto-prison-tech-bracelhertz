package com.app.server.payload.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class CreatePrisonerAnnotation {

	@NotNull(message = "Can't be blank")
	private Long prisonerDestId;

	@NotBlank(message = "Can't be blank")
	private String title;

	@NotBlank(message = "Can't be blank")
	private String description;

	public CreatePrisonerAnnotation(Long prisonerDestId, String title, String description) {
		super();
		this.prisonerDestId = prisonerDestId;
		this.title = title;
		this.description = description;
	}

	public Long getPrisonerDestId() {
		return prisonerDestId;
	}

	public void setPrisonerDestId(Long prisonerDestId) {
		this.prisonerDestId = prisonerDestId;
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
