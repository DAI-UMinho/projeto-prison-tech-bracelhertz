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

import com.app.server.model.Prisoner;
import com.app.server.repository.PrisonerRepository;



@RestController
@RequestMapping(value = "/api")
public class PrisonerController {

	@Autowired
	PrisonerRepository prisonerRepository;
	
	@GetMapping("/prisoner")
	public List<Prisoner> listPrisoner(){
		return prisonerRepository.findAll();
	}
	
	@GetMapping("/prisoner/{prisonerId}")
	public Prisoner listPrisoner(@PathVariable(value="prisonerId") long prisonerId){
		return prisonerRepository.findById(prisonerId);
	}

	@PostMapping("/prisoner")
	public Prisoner savePrisoner(@RequestBody Prisoner prisoner) {
		return prisonerRepository.save(prisoner);
	}
	@PutMapping("/prisoner")
	public Prisoner updatePrisoner(@RequestBody Prisoner prisoner) {
		return prisonerRepository.save(prisoner);
	}
	
	@DeleteMapping("/prisoner/{prisonerId}")
	public void deletePrisoner(@PathVariable(value="prisonerId") long prisonerId){
		prisonerRepository.deleteById(prisonerId);
	}
}