package com.ibs.backend.repository;

import com.ibs.backend.entity.PromoCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PromoCodeRepository extends JpaRepository<PromoCode, String> {

    List<PromoCode> findByTenantIdAndPropertyId(String tenantId,String propertyId);
}