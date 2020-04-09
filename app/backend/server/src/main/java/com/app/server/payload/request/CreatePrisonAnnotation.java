package com.app.server.payload.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class CreatePrisonAnnotation {

	@NotNull(message = "Can't be blank")
	private Long prisonDestId;

	@NotBlank(message = "Can't be blank")
	private String title;

	@NotBlank(message = "Can't be blank")
	private String description;

	public CreatePrisonAnnotation(Long prisonDestId, String title, String description) {
		super();
		this.prisonDestId = prisonDestId;
		this.title = title;
		this.description = description;
	}

	public Long getPrisonDestId() {
		return prisonDestId;
	}

	public void setPrisonDestId(Long prisonDestId) {
		this.prisonDestId = prisonDestId;
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
