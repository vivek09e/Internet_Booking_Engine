package com.ibs.backend.repository;

import com.ibs.backend.entity.Theme;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ThemeRepository extends JpaRepository<Theme, String> {
    Theme findByTenantId(String id);
}