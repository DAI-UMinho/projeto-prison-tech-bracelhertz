package com.app.server.controller;

import java.util.List;
//import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.server.repository.UserRepository;
import com.app.server.model.User;

@RestController
@RequestMapping(value = "/api")
public class UserController {

	@Autowired
	UserRepository userRepository;
	
	//@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/users")
	public List<User> listUsers(){
		return userRepository.findAll();
	}
	
	/*
	@GetMapping("/utilizador/{idUtilizador}")
	public Optional<Utilizador> listUtilizadores(@PathVariable(value="idUtilizador") long idUtilizador){
		return utilizadorRepository.teste(idUtilizador);
	}
	*/
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/users/{userId}")
	public User listUsers(@PathVariable(value="userId") long userId){
		return userRepository.findById(userId);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/users")
	public User saveUser(@RequestBody User user) {
		return userRepository.save(user);
	}
	
	/*
	//@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/utilizador")
	public ResponseEntity<ApiResponse> saveUtilizador(@RequestBody Utilizador utilizador) {
	    try {
	        utilizadorRepository.save(utilizador);
	        return new ResponseEntity<ApiResponse>(new ApiResponse(true, "Email Address already in use!"), HttpStatus.CREATED);
	      } catch (Exception e) {
	        return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Email Address already in use!"), HttpStatus.BAD_REQUEST);
	      }
	    //return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Email Address already in use!"), HttpStatus.BAD_REQUEST);
		//return utilizadorRepository.save(utilizador);

	}
	 */
	
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/users")
	public User updateUser(@RequestBody User user) {
		return userRepository.save(user);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/users/{userId}")
	public void deleteUsers(@PathVariable(value="userId") long userId) {
		userRepository.deleteById(userId);
	}
}