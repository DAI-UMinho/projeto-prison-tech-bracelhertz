package com.app.server.payload.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class UpdateAnnotation {

	@NotNull(message = "Can't be blank")
	private Long annotationId;

	@NotBlank(message = "Can't be blank")
	private String title;

	@NotBlank(message = "Can't be blank")
	private String description;

	public UpdateAnnotation(Long annotationId, String title, String description) {
		super();
		this.annotationId = annotationId;
		this.title = title;
		this.description = description;
	}

	public Long getAnnotationId() {
		return annotationId;
	}

	public void setAnnotationId(Long annotationId) {
		this.annotationId = annotationId;
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
