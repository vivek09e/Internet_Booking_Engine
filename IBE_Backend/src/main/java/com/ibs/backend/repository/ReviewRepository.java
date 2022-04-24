package com.ibs.backend.repository;

import com.ibs.backend.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByRoomTypeId(String roomTypeId);
}