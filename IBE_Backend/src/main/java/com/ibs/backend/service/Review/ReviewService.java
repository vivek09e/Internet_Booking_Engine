package com.ibs.backend.service.Review;

import com.ibs.backend.entityDto.ReviewDto;

import java.util.List;

public interface ReviewService {

    ReviewDto getByRoomTypeId(String roomTypeId);
    ReviewDto saveReview(ReviewDto reviewDto);
}
