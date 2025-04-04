
package com.rs.www.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "counter_profiles")
public class CPModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String counterName;
    private String owner;
    private String email;
    private String mobileNumber;
    private String image;
    private String status;

    public CPModel() {
		super();
		// TODO Auto-generated constructor stub
	}
	public CPModel(Long id, String counterName, String owner, String email, String mobileNumber, String image,
			String status) {
		super();
		this.id = id;
		this.counterName = counterName;
		this.owner = owner;
		this.email = email;
		this.mobileNumber = mobileNumber;
		this.image = image;
		this.status = status;
	}
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
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getMobileNumber() {
        return mobileNumber;
    }
    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }
    public String getImage() {
        return image;
    }
    public void setImage(String image) {
        this.image = image;
    }
}
