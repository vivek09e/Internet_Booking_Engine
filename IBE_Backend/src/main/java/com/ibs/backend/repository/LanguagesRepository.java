package com.ibs.backend.repository;

import com.ibs.backend.entity.Languages;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LanguagesRepository extends JpaRepository<Languages, Long> {
}