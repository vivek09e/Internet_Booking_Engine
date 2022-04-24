package com.ibs.backend.service.Review;

import com.ibs.backend.entity.Review;
import com.ibs.backend.entityDto.ReviewDto;
import com.ibs.backend.mapper.ReviewMapper;
import com.ibs.backend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ReviewServiceImpl implements ReviewService{

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    ReviewMapper reviewMapper;
    @Override
    public ReviewDto getByRoomTypeId(String roomTypeId) {
        List<Review> reviews= reviewRepository.findByRoomTypeId(roomTypeId);
        ReviewDto reviewDto = new ReviewDto();
        reviewDto.setAmenitiesRating(0);
        reviewDto.setCleanlinessRating(0);
        reviewDto.setServiceRating(0);
        reviewDto.setFacilitiesRating(0);
        reviewDto.setOverAllRating(0);
        reviewDto.setRoomComfortAndQualityRating(0);
        reviewDto.setValueForMoneyRating(0);
        int count=reviews.size();
        if(count ==0)
            return reviewDto;
        else
            count=0;
        for(Review review:reviews){
            if(review.getIncludeFlag()){
                reviewDto.setAmenitiesRating(review.getAmenitiesRating()+reviewDto.getAmenitiesRating());
                reviewDto.setCleanlinessRating(review.getCleanlinessRating()+reviewDto.getCleanlinessRating());
                reviewDto.setServiceRating(review.getServiceRating()+ reviewDto.getServiceRating());
                reviewDto.setFacilitiesRating(review.getFacilitiesRating() +reviewDto.getFacilitiesRating());
                reviewDto.setOverAllRating(review.getOverAllRating() + reviewDto.getOverAllRating() );
                reviewDto.setRoomComfortAndQualityRating(review.getRoomComfortAndQualityRating()+
                        reviewDto.getRoomComfortAndQualityRating());
                reviewDto.setValueForMoneyRating(review.getValueForMoneyRating()+reviewDto.getValueForMoneyRating());
                reviewDto.setGuestComment(review.getGuestComment());
                count++;
            }

        }
        reviewDto.setAmenitiesRating(reviewDto.getAmenitiesRating()/count);
        reviewDto.setCleanlinessRating(+reviewDto.getCleanlinessRating()/count);
        reviewDto.setServiceRating(reviewDto.getServiceRating()/count);
        reviewDto.setFacilitiesRating(reviewDto.getFacilitiesRating()/count);
        reviewDto.setOverAllRating( reviewDto.getOverAllRating()/count);
        reviewDto.setRoomComfortAndQualityRating(reviewDto.getRoomComfortAndQualityRating()/count);
        reviewDto.setValueForMoneyRating(reviewDto.getValueForMoneyRating()/count);
        reviewDto.setNumberOfReview(count);
        return reviewDto;
    }

    @Override
    public ReviewDto saveReview(ReviewDto reviewDto) {
        Review review= reviewMapper.toEntity(reviewDto);
        review.setIncludeFlag(true);
        reviewRepository.save(review);
        return reviewDto;
    }
}

