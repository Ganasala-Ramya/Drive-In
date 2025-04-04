package com.rs.www.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class Category {
	@Id
	private Long id;
	private String name;
//	private Long counterno;
	
	
	@OneToMany(mappedBy="category")
	@JsonIgnore
	    private List<Items> items;
	
	

}
