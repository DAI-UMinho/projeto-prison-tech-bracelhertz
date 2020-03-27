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

import com.app.server.model.Schedule;
import com.app.server.repository.ScheduleRepository;


@RestController
@RequestMapping(value = "/api")
public class ScheduleController {

	@Autowired
	ScheduleRepository scheduleRepository;
	
	@GetMapping("/schedules")
	public List<Schedule> listSchedule(){
		return scheduleRepository.findAll();
	}
	
	
	@GetMapping("/schedules/{scheduleId}")
	public Schedule listSchedule(@PathVariable(value="scheduleId") long scheduleId){
		return scheduleRepository.findById(scheduleId);
	}

	
	@PostMapping("/schedules")
	public Schedule saveSchedule(@RequestBody Schedule schedule) {
		return scheduleRepository.save(schedule);
	}
	
	@PutMapping("/schedules")
	public Schedule updateSchedule(@RequestBody Schedule schedule) {
		return scheduleRepository.save(schedule);
	}
	
	@DeleteMapping("/schedules/{scheduleId}")
	public void deleteSchedule(@RequestBody Schedule scheduleId) {
		scheduleRepository.delete(scheduleId);
	}
}