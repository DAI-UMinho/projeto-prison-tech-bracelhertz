package com.app.server.model;

import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name="utilizador")
public class Utilizador {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_user;
	
	@NotNull
	private Long id_tipo;
	
	@NotBlank
	private String username;
	
    @NotBlank
    @Size(max = 100)
	private String password;
	
    @Temporal(TemporalType.DATE)
	private Date data_nascimento;
    
    @NotBlank
    private String nacionalidade;
    
    @NotBlank
    private String morada;
    
    @NotBlank
    private String localidade;
    
    @NotBlank
    private String primeiro_nome;
    
    @NotBlank
    private String ultimo_nome;
    
    @NotBlank
    private String foto;
    
    private int contacto;
    
    @Email
    private String email;

	private Long id_instituicao;
	
	private Long created_by;
	
	@CreationTimestamp
	private LocalDateTime created_timestamp;
    
    
    public Utilizador() {
    }

	public Utilizador(Long id_user, @NotNull Long id_tipo, @NotBlank String username,
			@NotBlank @Size(max = 100) String password, Date data_nascimento, @NotBlank String nacionalidade,
			@NotBlank String morada, @NotBlank String localidade, @NotBlank String primeiro_nome,
			@NotBlank String ultimo_nome, @NotBlank String foto, int contacto, String email, Long id_instituicao,
			Long created_by, LocalDateTime created_timestamp) {
		super();
		this.id_user = id_user;
		this.id_tipo = id_tipo;
		this.username = username;
		this.password = password;
		this.data_nascimento = data_nascimento;
		this.nacionalidade = nacionalidade;
		this.morada = morada;
		this.localidade = localidade;
		this.primeiro_nome = primeiro_nome;
		this.ultimo_nome = ultimo_nome;
		this.foto = foto;
		this.contacto = contacto;
		this.email = email;
		this.id_instituicao = id_instituicao;
		this.created_by = created_by;
		this.created_timestamp = created_timestamp;
	}


	public Long getId_user() {
		return id_user;
	}


	public void setId_user(Long id_user) {
		this.id_user = id_user;
	}


	public Long getId_tipo() {
		return id_tipo;
	}


	public void setId_tipo(Long id_tipo) {
		this.id_tipo = id_tipo;
	}


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public Date getData_nascimento() {
		return data_nascimento;
	}


	public void setData_nascimento(Date data_nascimento) {
		this.data_nascimento = data_nascimento;
	}


	public String getNacionalidade() {
		return nacionalidade;
	}


	public void setNacionalidade(String nacionalidade) {
		this.nacionalidade = nacionalidade;
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


	public String getPrimeiro_nome() {
		return primeiro_nome;
	}


	public void setPrimeiro_nome(String primeiro_nome) {
		this.primeiro_nome = primeiro_nome;
	}


	public String getUltimo_nome() {
		return ultimo_nome;
	}


	public void setUltimo_nome(String ultimo_nome) {
		this.ultimo_nome = ultimo_nome;
	}


	public String getFoto() {
		return foto;
	}


	public void setFoto(String foto) {
		this.foto = foto;
	}


	public int getContacto() {
		return contacto;
	}


	public void setContacto(int contacto) {
		this.contacto = contacto;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public Long getId_instituicao() {
		return id_instituicao;
	}


	public void setId_instituicao(Long id_instituicao) {
		this.id_instituicao = id_instituicao;
	}


	public Long getCreated_by() {
		return created_by;
	}


	public void setCreated_by(Long created_by) {
		this.created_by = created_by;
	}


	public LocalDateTime getCreated_timestamp() {
		return created_timestamp;
	}


	public void setCreated_timestamp(LocalDateTime created_timestamp) {
		this.created_timestamp = created_timestamp;
	}
	
}
