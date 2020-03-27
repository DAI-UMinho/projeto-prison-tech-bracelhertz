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

import com.app.server.repository.UserLogRepository;
import com.app.server.model.UserLog;

@RestController
@RequestMapping(value = "/api")
public class UserLogController {

	@Autowired
	 UserLogRepository userLogRepository;
	
	@GetMapping("/user-logs")
	public List<UserLog> listUserLog(){
		return userLogRepository.findAll();
	}
	
	@GetMapping("/user-logs/{userLogId}")
	public UserLog listUserLog(@PathVariable(value="userLogId") long userLogId){
		return userLogRepository.findById(userLogId);
	}
	
	
	@PostMapping("/user-logs")
	public UserLog saveUserLog(@RequestBody UserLog userLog) {
		return userLogRepository.save(userLog);
	}
	
	
	@PutMapping("/user-logs")
	public UserLog updateUserLog(@RequestBody UserLog userLog) {
		return userLogRepository.save(userLog);
	}
	
	@DeleteMapping("/user-logs/{userLogId}")
	public void deleteUserLog(@PathVariable(value="userLogId") long userLogId){
		userLogRepository.deleteById(userLogId);
	}
}