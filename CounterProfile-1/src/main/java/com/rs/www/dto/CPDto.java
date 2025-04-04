// src/main/java/com/rs/www/dto/CPDto.java
package com.rs.www.dto;

import org.springframework.web.multipart.MultipartFile;

public class CPDto {
    private Long id;
    private String counterName;
    private String owner;
    private String mobileNumber;
    private MultipartFile image;
    private String imageUrl;
    private String email;
    private String status;

    public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	// Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getCounterName() {
        return counterName;
    }
    public void setCounterName(String counterName) {
        this.counterName = counterName;
    }
    public String getOwner() {
        return owner;
    }
    public void setOwner(String owner) {
        this.owner = owner;
    }
    public String getMobileNumber() {
        return mobileNumber;
    }
    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }
    public MultipartFile getImage() {
        return image;
    }
    public void setImage(MultipartFile image) {
        this.image = image;
    }
    public String getImageUrl() {
        return imageUrl;
    }
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
}
