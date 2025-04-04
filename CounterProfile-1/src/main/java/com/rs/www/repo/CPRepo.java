// src/main/java/com/rs/www/repo/CPRepo.java
package com.rs.www.repo;

import com.rs.www.model.CPModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CPRepo extends JpaRepository<CPModel, Long> {
}
