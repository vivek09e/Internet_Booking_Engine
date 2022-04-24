package com.ibs.backend.mapper;

import com.ibs.backend.entity.Review;
import com.ibs.backend.entityDto.ReviewDto;
import com.ibs.backend.repository.BookingRepository;
import com.ibs.backend.repository.ReviewRepository;
import com.ibs.backend.repository.RoomTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class ReviewMapper {

    @Autowired
    private ReviewRepository reviewRepository;


    public ReviewDto fromEntity(Review review){
        ReviewDto reviewDto= new ReviewDto();
        reviewDto.setReviewId(review.getReviewId());
        reviewDto.setBookingId(review.getBooking().getId());
        reviewDto.setAmenitiesRating(review.getAmenitiesRating());
        reviewDto.setCleanlinessRating(review.getCleanlinessRating());
        reviewDto.setServiceRating(review.getServiceRating());
        reviewDto.setFacilitiesRating(review.getFacilitiesRating());
        reviewDto.setOverAllRating(review.getOverAllRating());
        reviewDto.setRoomComfortAndQualityRating(review.getRoomComfortAndQualityRating());
        reviewDto.setValueForMoneyRating(review.getValueForMoneyRating());
        reviewDto.setRoomTypeId(Integer.parseInt(review.getRoomType().getId()));
        reviewDto.setGuestComment(review.getGuestComment());

        return reviewDto;
    }

    public Review toEntity(ReviewDto reviewDto){
        Review review= reviewRepository.getById(reviewDto.getReviewId());
        review.setAmenitiesRating(reviewDto.getAmenitiesRating());
        review.setCleanlinessRating(reviewDto.getCleanlinessRating());
        review.setServiceRating(reviewDto.getServiceRating());
        review.setFacilitiesRating(reviewDto.getFacilitiesRating());
        review.setOverAllRating(reviewDto.getOverAllRating());
        review.setRoomComfortAndQualityRating(reviewDto.getRoomComfortAndQualityRating());
        review.setValueForMoneyRating(reviewDto.getValueForMoneyRating());
        review.setGuestComment(reviewDto.getGuestComment());
        return review;
    }

}
