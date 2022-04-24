package com.ibs.backend.repository;

import com.ibs.backend.entity.TenantRoomGuestLimit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TenantRoomGuestLimitRepository extends JpaRepository<TenantRoomGuestLimit, Integer> {

    List<TenantRoomGuestLimit> findByTenantId(String id);
}