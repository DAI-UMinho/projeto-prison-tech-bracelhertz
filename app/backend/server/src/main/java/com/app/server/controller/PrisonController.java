package com.app.server.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.server.repository.PrisonRepository;
import com.app.server.model.Prison;
import com.app.server.payload.response.ApiResponse;

@RestController
@RequestMapping(value = "/api")
public class PrisonController {

	@Autowired
	PrisonRepository prisonRepository;

	@PreAuthorize("hasRole('GUARD') or hasRole('MANAGER') or hasRole('NETWORKMAN')")
	@GetMapping("/prisons")
	public List<Prison> listPrison() {
		return prisonRepository.findAllByOrderByPrisonIdAsc();
	}

	@PreAuthorize("hasRole('GUARD') or hasRole('MANAGER') or hasRole('NETWORKMAN')")
	@GetMapping("/prisons/{prisonId}")
	public Prison listPrison(@PathVariable(value = "prisonId") long prisonId) {
		return prisonRepository.findByPrisonId(prisonId);
	}

	@PreAuthorize("hasRole('NETWORKMAN')")
	@PostMapping("/prisons")
	public ResponseEntity<ApiResponse> savePrison(@Valid @RequestBody Prison prison) {
		try {
			if (prisonRepository.existsByPrisonId(prison.getPrisonId())) {
				return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Can't update a prison from this route"),
						HttpStatus.BAD_REQUEST);
			}
			prisonRepository.save(prison);
			return new ResponseEntity<ApiResponse>(new ApiResponse(true, "Prison created", prison.getPrisonId()),
					HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Invalid data format"),
					HttpStatus.BAD_REQUEST);
		}
	}

	@PreAuthorize("hasRole('NETWORKMAN')")
	@PutMapping("/prisons")
	public ResponseEntity<ApiResponse> updatePrison(@Valid @RequestBody Prison prison) {
		try {
			if (!(prisonRepository.existsByPrisonId(prison.getPrisonId()))) {
				return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Can't create a prison from this route"),
						HttpStatus.BAD_REQUEST);
			}
			prisonRepository.save(prison);
			return new ResponseEntity<ApiResponse>(
					new ApiResponse(true, "Prison updated successfully", prison.getPrisonId()), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Invalid data format"),
					HttpStatus.BAD_REQUEST);
		}
	}

	@PreAuthorize("hasRole('NETWORKMAN')")
	@PutMapping(value = "/prisons/upload-photos/{prisonId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<ApiResponse> updatePrisonProfilePhoto(@PathVariable(value = "prisonId") Long prisonId,
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
			String id = Long.toString(prisonId);
			String fileName = ".\\src\\main\\java\\com\\app\\server\\image\\" + "prisonPhoto-" + id + "-" + strDate
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
			prisonRepository.updatePrisonPhoto(fileName, prisonId);
			//
			return new ResponseEntity<ApiResponse>(new ApiResponse(true, "Image updated successfully", prisonId),
					HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Invalid data format"),
					HttpStatus.BAD_REQUEST);
		}
	}

	/*
	 * @DeleteMapping("/prisons/{prisonId}") public void
	 * deletePrison(@PathVariable(value="prisonId") long prisonId) {
	 * prisonRepository.deleteById(prisonId); }
	 */
}