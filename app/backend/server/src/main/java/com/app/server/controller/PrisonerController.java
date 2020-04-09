package com.app.server.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;
//import java.util.Optional;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.server.model.CriminalRecord;
import com.app.server.model.MedicalPrescription;
import com.app.server.model.Prison;
import com.app.server.model.Prisoner;
import com.app.server.model.PrisonerLog;
import com.app.server.model.Role;
import com.app.server.model.RoleName;
import com.app.server.model.User;
import com.app.server.payload.request.UpdatePrisonerAsGuard;
import com.app.server.payload.request.UpdatePrisonerAsManager;
import com.app.server.payload.response.ApiResponse;
import com.app.server.repository.PrisonerLogRepository;
import com.app.server.repository.PrisonerRepository;
import com.app.server.repository.UserLogRepository;
import com.app.server.repository.UserRepository;
import com.app.server.security.CurrentUser;
import com.app.server.security.UserPrincipal;

@RestController
@RequestMapping(value = "/api")
public class PrisonerController {

	@Autowired
	PrisonerRepository prisonerRepository;

	@Autowired
	PrisonerLogRepository prisonerLogRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	UserLogRepository userLogRepository;

	@PreAuthorize("hasRole('MANAGER') or hasRole('NETWORKMAN')")
	@GetMapping("/users/identifier-exists/{username}")
	public boolean existsByUsername(@PathVariable(value = "username") String identifierId) {
		return prisonerRepository.existsByIdentifierId(identifierId);
	}

	@PreAuthorize("hasRole('MANAGER') or hasRole('NETWORKMAN')")
	@GetMapping("/prisoners")
	public List<Prisoner> listPrisoner() {
		return prisonerRepository.findAllByOrderByCreatedTimestampAsc();
	}

	@PreAuthorize("hasRole('GUARD')")
	@GetMapping("/prisoners/by-guards")
	public List<Prisoner> listPrisoner(@CurrentUser UserPrincipal currentUser) {
		User userLogged = userRepository.findByUserId(currentUser.getId());
		return prisonerRepository.findByPrisonOrderByCreatedTimestampAsc(userLogged.getPrison());
	}

	@PreAuthorize("hasRole('MANAGER') or hasRole('NETWORKMAN')")
	@GetMapping("/prisoners/{prisonerId}")
	public Prisoner listPrisoner(@PathVariable(value = "prisonerId") Long prisonerId) {
		return prisonerRepository.findByPrisonerId(prisonerId);
	}

	@PreAuthorize("hasRole('GUARD')")
	@GetMapping("/prisoners/by-guards/{prisonerId}")
	public Optional<Prisoner> listPrisoner(@PathVariable(value = "prisonerId") Long prisonerId,
			@CurrentUser UserPrincipal currentUser) {
		User userLogged = userRepository.findByUserId(currentUser.getId());
		return prisonerRepository.findByUserLoggedPrison(prisonerId, userLogged.getPrison());
	}

	@PreAuthorize("hasRole('MANAGER') or hasRole('NETWORKMAN')")
	@PostMapping("/prisoners")
	public ResponseEntity<ApiResponse> savePrisoner(@Valid @RequestBody Prisoner prisoner,
			@CurrentUser UserPrincipal currentUser) {
		try {
			// Prisoner Attributes
			Long prisonerId = prisoner.getPrisonerId();
			String identifierId = prisoner.getIdentifierId().trim();
			Date birthDate = prisoner.getBirthDate();
			String nationality = prisoner.getNationality().trim();
			String name = prisoner.getName().trim();
			String photo = prisoner.getPhoto();
			String contact = prisoner.getContact();
			String alternativeContact = prisoner.getAlternativeContact();
			String cell = prisoner.getCell();
			int threatLevel = prisoner.getThreatLevel();
			Prison prison = prisoner.getPrison();
			String bracelhertzId = prisoner.getBraceletId();
			int maxHB = prisoner.getMaxHB();
			int minHB = prisoner.getMinHB();
			boolean alertOff = prisoner.isAlertOff();
			User createdBy = userRepository.findByUserId(currentUser.getId());
			LocalDateTime createdTimestamp = prisoner.getCreatedTimestamp();
			boolean deleted = prisoner.isDeleted();
			Set<CriminalRecord> criminalRecord = prisoner.getCriminalRecord();
			Set<MedicalPrescription> medicalPrescription = prisoner.getMedicalPrescription();
			// End of Attributes

			// Get User Logged
			User userLogged = userRepository.findByUserId(currentUser.getId());
			Set<Role> roleUserLogged = userLogged.getRoles();

			// Get Permissions
			// !(prison.toString().equals(userLogged.getPrison().toString()))
			if (String.valueOf(roleUserLogged).equals("[Role [id=1]]")) {
				if (!(prison.getPrisonId() == userLogged.getPrison().getPrisonId())) {
					return new ResponseEntity<ApiResponse>(
							new ApiResponse(false, "A manager can only create prisoners inside their prison"),
							HttpStatus.BAD_REQUEST);
				}
			}
			// End of Permissions

			Prisoner newPrisoner = new Prisoner(prisonerId, identifierId, birthDate, nationality, name, photo, contact,
					alternativeContact, cell, threatLevel, prison, bracelhertzId, maxHB, minHB, alertOff, createdBy,
					createdTimestamp, deleted, criminalRecord, medicalPrescription);

			// Create User
			prisonerRepository.save(newPrisoner);
			//

			// Prisoner Log
			String description = "Novo recluso criado.";
			PrisonerLog prisonerLog = new PrisonerLog(null, userLogged, newPrisoner, description, null);
			prisonerLogRepository.save(prisonerLog);
			//
			return new ResponseEntity<ApiResponse>(
					new ApiResponse(true, "Prisoner created", newPrisoner.getPrisonerId()), HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Invalid data format"),
					HttpStatus.BAD_REQUEST);
		}
	}

	@PreAuthorize("hasRole('MANAGER') or hasRole('NETWORKMAN')")
	@PutMapping("/prisoners")
	public ResponseEntity<ApiResponse> UpdatePrisonerAsManager(@Valid @RequestBody UpdatePrisonerAsManager prisoner,
			@CurrentUser UserPrincipal currentUser) {
		try {
			// Prisoner Attributes
			Long prisonerId = prisoner.getPrisonerId();
			String identifierId = prisoner.getIdentifierId().trim();
			Date birthDate = prisoner.getBirthDate();
			String nationality = prisoner.getNationality().trim();
			String name = prisoner.getName().trim();
			String contact = prisoner.getContact();
			String alternativeContact = prisoner.getAlternativeContact();
			String cell = prisoner.getCell();
			int threatLevel = prisoner.getThreatLevel();
			Long prisonId = prisoner.getPrisonId();
			String bracelhertzId = prisoner.getBraceletId();
			int maxHB = prisoner.getMaxHB();
			int minHB = prisoner.getMinHB();
			boolean alertOff = prisoner.isAlertOff();
			// Get User Logged
			User userLogged = userRepository.findByUserId(currentUser.getId());
			Set<Role> roleUserLogged = userLogged.getRoles();
			//

			// Validations
			// Get Permissions

			if (String.valueOf(roleUserLogged).equals("[Role [id=1]]")) {
				if (!(prisonId == userLogged.getPrison().getPrisonId())) {
					return new ResponseEntity<ApiResponse>(
							new ApiResponse(false, "A manager can only create prisoners inside their prison"),
							HttpStatus.BAD_REQUEST);
				}
			}

			// Update Prisoner
			prisonerRepository.updatePrisonerAsManager(identifierId, birthDate, nationality, name, contact,
					alternativeContact, cell, threatLevel, prisonId, bracelhertzId, maxHB, minHB, alertOff, prisonerId);
			//

			// Prisoner Log
			String description = "Um ou mais atributos do recluso foram atualizados.";
			PrisonerLog prisonerLog = new PrisonerLog(null, userLogged, prisonerRepository.findByPrisonerId(prisonerId),
					description, null);
			prisonerLogRepository.save(prisonerLog);
			//
			return new ResponseEntity<ApiResponse>(new ApiResponse(true, "Prisoner updated successfully", prisonerId),
					HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Invalid data format"),
					HttpStatus.BAD_REQUEST);
		}
	}

	@PreAuthorize("hasRole('GUARD')")
	@PutMapping("/prisoners/by-guards")
	public ResponseEntity<ApiResponse> updatePrisonerAsGuard(@Valid @RequestBody UpdatePrisonerAsGuard prisoner,
			@CurrentUser UserPrincipal currentUser) {
		try {
			Long prisonerId = prisoner.getPrisonerId();
			String cell = prisoner.getCell();
			String braceletId = prisoner.getBraceletId();
			int maxHB = prisoner.getMaxHB();
			int minHB = prisoner.getMinHB();
			boolean alertoff = prisoner.isAlertOff();

			prisonerRepository.updatePrisonerAsGuard(cell, braceletId, maxHB, minHB, alertoff, prisonerId);

			Prisoner logPrisoner = prisonerRepository.findByPrisonerId(prisonerId);

			User userLogged = userRepository.findByUserId(currentUser.getId());
			String description = "Um ou mais atributos do recluso foram atualizados.";
			PrisonerLog prisonerLog = new PrisonerLog(null, userLogged, logPrisoner, description, null);
			prisonerLogRepository.save(prisonerLog);
			return new ResponseEntity<ApiResponse>(new ApiResponse(true, "Prisoner updated successfully", prisonerId),
					HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Invalid data format"),
					HttpStatus.BAD_REQUEST);
		}
	}

	@PreAuthorize("hasRole('MANAGER') or hasRole('NETWORKMAN')")
	@PutMapping(value = "/prisoners/upload-photos/{prisonerId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<ApiResponse> updatePrisonerProfilePhoto(@PathVariable(value = "prisonerId") Long prisonerId,
			@RequestParam("file") MultipartFile file) {
		try {
			// File Validations
			String fileType = file.getContentType();
			Long fileSize = file.getSize();

			if (!((fileType.equals("image/png")) || (fileType.equals("image/jpeg")))) {
				return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Image can only be png or jpg"),
						HttpStatus.BAD_REQUEST);
			}

			if (fileSize >= 5000000) {
				return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Image can't exceeds 4.99MB"),
						HttpStatus.BAD_REQUEST);
			}
			// End of Validations

			// File Name
			Date date = new Date();
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss-z");
			String strDate = formatter.format(date);
			String id = Long.toString(prisonerId);
			String fileName = ".\\src\\main\\java\\com\\app\\server\\image\\" + "prisonerPhoto-" + id + "-" + strDate
					+ ".png";
			System.out.println(fileName);
			/*
			 * String path = System.getProperty("user.dir"); String fileName = path +
			 * "\\src\\main\\java\\com\\app\\server\\image\\" + "
			 * prisonPhoto-" + id + "-" + strDate + ".png";
			 */
			//

			// Upload File
			File convertFile = new File(fileName);
			convertFile.createNewFile();
			FileOutputStream fout = new FileOutputStream(convertFile);
			fout.write(file.getBytes());
			fout.close();
			//

			// Update Prison
			prisonerRepository.updatePrisonerPhoto(fileName, prisonerId);
			//
			return new ResponseEntity<ApiResponse>(new ApiResponse(true, "Image updated successfully", prisonerId),
					HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Invalid data format"),
					HttpStatus.BAD_REQUEST);
		}
	}

	@PreAuthorize("hasRole('MANAGER') or hasRole('NETWORKMAN')")
	@DeleteMapping("/prisoners/{prisonerId}")
	public ResponseEntity<ApiResponse> deletePrisoner(@PathVariable(value = "prisonerId") long prisonerId,
			@CurrentUser UserPrincipal currentUser) {
		try {

			// Validations
			// Get Permissions
			Prisoner logPrisoner = prisonerRepository.findByPrisonerId(prisonerId);

			User userLogged = userRepository.findByUserId(currentUser.getId());
			Set<Role> roleUserLogged = userLogged.getRoles();

			if (String.valueOf(roleUserLogged).equals("[Role [id=1]]")) {
				if (!(logPrisoner.getPrison().getPrisonId() == userLogged.getPrison().getPrisonId())) {
					return new ResponseEntity<ApiResponse>(
							new ApiResponse(false, "A manager can only delete prisoners inside their prison"),
							HttpStatus.BAD_REQUEST);
				}
			}

			for (Role userRole : roleUserLogged) {
				if (userRole.getName() == RoleName.ROLE_GUARD) {
					return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Failed to delete Prisoner"),
							HttpStatus.UNAUTHORIZED);
				}
			}
			// End of Validations
			prisonerRepository.deletePrisonerAsManager(prisonerId);

			String description = "O recluso foi eliminado.";
			PrisonerLog prisonerLog = new PrisonerLog(null, userLogged, logPrisoner, description, null);
			prisonerLogRepository.save(prisonerLog);
			return new ResponseEntity<ApiResponse>(new ApiResponse(true, "Prisoner deleted successfully", prisonerId),
					HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Invalid data format"),
					HttpStatus.BAD_REQUEST);
		}
	}
}
