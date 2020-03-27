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

import com.app.server.model.CriminalRecord;
import com.app.server.repository.CriminalRecordRepository;


@RestController
@RequestMapping(value = "/api")
public class CriminalRecordController {

	@Autowired
	CriminalRecordRepository criminalRecordRepository;
	
	@GetMapping("/registocriminal")
	public List<CriminalRecord> listCriminalRecord(){
		return criminalRecordRepository.findAll();
	}
	
	@GetMapping("/registocriminal/{criminalRecordId}")
	public CriminalRecord listCriminalRecord(@PathVariable(value="criminalRecordId") long criminalRecordId){
		return criminalRecordRepository.findById(criminalRecordId);
	}
	
	@PostMapping("/registocriminal")
	public CriminalRecord saveCriminalRecord(@RequestBody CriminalRecord criminalRecord) {
		return criminalRecordRepository.save(criminalRecord);
	}
	
	@PutMapping("/registocriminal")
	public CriminalRecord updateCriminalRecord(@RequestBody CriminalRecord criminalRecord) {
		return criminalRecordRepository.save(criminalRecord);
	}
	
	@DeleteMapping("/registocriminal/{criminalRecordId}")
	public void deleteCriminalRecord(@PathVariable(value="criminalRecordId") long criminalRecordId){
		criminalRecordRepository.deleteById(criminalRecordId);
	}
}