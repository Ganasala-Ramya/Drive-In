package com.rs.www.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rs.www.model.Category;

public interface CategoryRepo extends JpaRepository<Category,Long> {

}
