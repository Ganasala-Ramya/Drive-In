
package com.rs.www.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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

import com.rs.www.dto.CPDto;
import com.rs.www.dto.StatusDto;
import com.rs.www.model.CPModel;
import com.rs.www.model.Login;
import com.rs.www.service.CPService;

@CrossOrigin(origins = "*") 
@RestController
@RequestMapping("/api/cp")
public class CPController {

    @Autowired
    private CPService service;
    
    @GetMapping("/check")
    public ResponseEntity<String> check() {
        return service.check();
    }
    
    // Returns all counter profiles
    @GetMapping("/all")
    public ResponseEntity<List<CPModel>> getAllProfiles() {
        List<CPModel> profiles = service.getAllProfiles();
        return ResponseEntity.ok(profiles);
    }
    
    // Create new counter profile
    @PostMapping("/save")
    public ResponseEntity<String> save(
            @RequestParam("counterName") String counterName,
            @RequestParam("owner") String owner,
            @RequestParam("mobileNumber") String mobileNumber,
            @RequestParam("email") String email,
            @RequestParam("image") MultipartFile image) {
        
        CPDto dto = new CPDto();
        dto.setCounterName(counterName);
        dto.setOwner(owner);
        dto.setMobileNumber(mobileNumber);
        dto.setEmail(email);
        dto.setImage(image);
        
        return service.save(dto);
    }
    @GetMapping("/fetchavailability")
    public List<StatusDto> counterStatus()
    {
    	return service.counterStatus();
    }
    @PutMapping("/updateAvailability/{id}")
    public String updateAvailability(@PathVariable long id,@RequestParam String status)
    {
    	return service.updateAvailability(id,status);
    }
    @GetMapping("/findById/{id}")
    public ResponseEntity<?> findById(@PathVariable long id) {
        return service.findById(id);
    }
    
    // Update an existing counter profile
    @PutMapping("/update/{id}")
    public ResponseEntity<String> update(
            @PathVariable Long id,
            @RequestParam("counterName") String counterName,
            @RequestParam("owner") String owner,
            @RequestParam("mobileNumber") String mobileNumber,
            @RequestParam("email") String email,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        CPDto dto = new CPDto();
        dto.setId(id);
        dto.setCounterName(counterName);
        dto.setOwner(owner);
        dto.setMobileNumber(mobileNumber);
        dto.setEmail(email);
        dto.setImage(image);
        
        return service.update(dto);
    }
    
    // Delete a counter profile
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        return service.delete(id);
    }
    
    @PostMapping("/login")
	public  ResponseEntity<String> addlogin(@RequestBody Login login)
	{
		return service.addLogin(login);
	}
	
	@GetMapping("/login/{username}")
	public ResponseEntity<?> getlogin(@PathVariable String Username)
	{
		return service.getlogin(Username);
	}
	@GetMapping("/category")
	public ResponseEntity<?> getcategory()
	{
		return service.getcategory();
	}
}
