package com.app.server.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.server.repository.PrisonerLogRepository;
import com.app.server.repository.UserRepository;
import com.app.server.security.CurrentUser;
import com.app.server.security.UserPrincipal;
import com.app.server.model.PrisonerLog;
import com.app.server.model.User;

@RestController
@RequestMapping(value = "/api")
public class PrisonerLogController {

	@Autowired
	PrisonerLogRepository prisonerLogRepository;

	@Autowired
	UserRepository userRepository;

	@PreAuthorize("hasRole('NETWORKMAN')")
	@GetMapping("/prisoner-logs")
	public List<PrisonerLog> listPrisonerLog() {
		return prisonerLogRepository.findAllByOrderByLogTimestampAsc();
	}

	@PreAuthorize("hasRole('MANAGER')")
	@GetMapping("/prisoner-logs/managers")
	public Optional<List<PrisonerLog>> listPrisonerLog(@CurrentUser UserPrincipal currentUser) {
		User userLogged = userRepository.findByUserId(currentUser.getId());
		return prisonerLogRepository.findByPrisonerLogPrisonId(userLogged.getPrison());
	}

	/*
	 * @PostMapping("/prisoner-logs") public PrisonerLog
	 * savePrisonerLog(@RequestBody PrisonerLog prisonerLog) { return
	 * prisonerLogRepository.save(prisonerLog); }
	 */

	/*
	 * @PutMapping("/prisoner-logs") public PrisonerLog
	 * updatePrisonerLog(@RequestBody PrisonerLog prisonerLog) { return
	 * prisonerLogRepository.save(prisonerLog); }
	 */

	/*
	 * @DeleteMapping("/prisoner-logs/{prisonerLogId}") public void
	 * deletePrisonerLog(@PathVariable(value="prisonerLogId") long prisonerLogId){
	 * prisonerLogRepository.deleteById(prisonerLogId); }
	 */
}