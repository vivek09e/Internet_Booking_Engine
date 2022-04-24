package com.ibs.backend.repository;

import com.ibs.backend.entity.TravelerInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelerInfoRepository extends JpaRepository<TravelerInfo, Integer> {
    TravelerInfo findByBookingId(Integer bookingId);
}