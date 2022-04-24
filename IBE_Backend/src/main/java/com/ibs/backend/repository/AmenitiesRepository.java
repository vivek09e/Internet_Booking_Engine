package com.ibs.backend.repository;

import com.ibs.backend.entity.Amenities;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AmenitiesRepository extends JpaRepository<Amenities, String> {
}