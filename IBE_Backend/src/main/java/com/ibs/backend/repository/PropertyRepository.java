package com.ibs.backend.repository;

import com.ibs.backend.entity.Property;
import com.ibs.backend.entity.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, String> {

    List<Property> findByTenantId(String id);
}