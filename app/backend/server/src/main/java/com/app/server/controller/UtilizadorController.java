package com.app.server.controller;

import java.util.List;
//import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.server.repository.UtilizadorRepository;
import com.app.server.model.Utilizador;

@RestController
@RequestMapping(value = "/api")
public class UtilizadorController {

	@Autowired
	UtilizadorRepository utilizadorRepository;
	
	@GetMapping("/user")
	public List<Utilizador> listUsers(){
		return utilizadorRepository.findAll();
	}
	
	@GetMapping("/user/{id_user}")
	public Utilizador listUsers(@PathVariable(value="id_user") long id_user){
		return utilizadorRepository.findById(id_user);
	}
	
	/*
	@GetMapping("/user/{id_user}")
	public Optional<Utilizador> listUsers(@PathVariable(value="id_user") long id_user){
		return utilizadorRepository.teste(id_user);
	}
	*/
	
	@PostMapping("/user")
	public Utilizador saveUser(@RequestBody Utilizador utilizador) {
		return utilizadorRepository.save(utilizador);
	}
	
	@DeleteMapping("/user")
	public void deleteUser(@RequestBody Utilizador user) {
		utilizadorRepository.delete(user);
	}
	
	@PutMapping("/user")
	public Utilizador updateUser(@RequestBody Utilizador user) {
		return utilizadorRepository.save(user);
	}
}