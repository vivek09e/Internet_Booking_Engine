package com.ibs.backend.repository;

import com.ibs.backend.entity.Filters;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FiltersRepository extends JpaRepository<Filters, String> {
}