package com.ibs.backend.repository;

import com.ibs.backend.entity.Promotions;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PromotionsRepository extends JpaRepository<Promotions, String> {
}