package com.ibs.backend.repository;

import com.ibs.backend.entity.BillingInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BillingInfoRepository extends JpaRepository<BillingInfo, Integer> {
    BillingInfo findByTravelerInfoId(Integer travelerId);
}