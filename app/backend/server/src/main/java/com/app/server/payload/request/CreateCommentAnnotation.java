package com.app.server.payload.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class CreateCommentAnnotation {

	@NotNull(message = "Can't be blank")
	private Long annotationDestId;

	@NotBlank(message = "Can't be blank")
	private String title;

	@NotBlank(message = "Can't be blank")
	private String description;

	public CreateCommentAnnotation(Long annotationDestId, String title, String description) {
		super();
		this.annotationDestId = annotationDestId;
		this.title = title;
		this.description = description;
	}

	public Long getAnnotationDestId() {
		return annotationDestId;
	}

	public void setAnnotationDestId(Long annotationDestId) {
		this.annotationDestId = annotationDestId;
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
