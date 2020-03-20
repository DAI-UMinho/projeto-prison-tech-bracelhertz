package com.app.server.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="instituicao")
public class Instituicao {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long id_instituicao;
	
	@NotNull
	@NotBlank
	private String nome;
	
	private String descricao;
	
	@NotNull
	@NotBlank
	private String morada;
	
	@NotNull
	@NotBlank
	private String localidade;
	
	@NotBlank
	private String foto;
	
	@NotNull
	@Email
	private String email;
	
	@NotNull
	@NotNull
	private int contacto;
	
    public Instituicao() {
    }

	public Instituicao(Long id_instituicao, @NotNull @NotBlank String nome, String descricao,
			@NotNull @NotBlank String morada, @NotNull @NotBlank String localidade, @NotBlank String foto,
			@NotNull @Email String email, @NotNull @NotNull int contacto) {
		super();
		this.id_instituicao = id_instituicao;
		this.nome = nome;
		this.descricao = descricao;
		this.morada = morada;
		this.localidade = localidade;
		this.foto = foto;
		this.email = email;
		this.contacto = contacto;
	}

	public Long getId_instituicao() {
		return id_instituicao;
	}

	public void setId_instituicao(Long id_instituicao) {
		this.id_instituicao = id_instituicao;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getMorada() {
		return morada;
	}

	public void setMorada(String morada) {
		this.morada = morada;
	}

	public String getLocalidade() {
		return localidade;
	}

	public void setLocalidade(String localidade) {
		this.localidade = localidade;
	}

	public String getFoto() {
		return foto;
	}

	public void setFoto(String foto) {
		this.foto = foto;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getContacto() {
		return contacto;
	}

	public void setContacto(int contacto) {
		this.contacto = contacto;
	}
    
}