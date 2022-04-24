package com.ibs.backend.repository.GraphQlRepo;

import com.ibs.backend.entityDto.*;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Repository
public interface GraphQlRepository {
    /**
     * @return List that contains all RoomRatesEntity with the room price associated
     *         with it
     *         from graphQl.
     */
    List<RoomRatesEntity> getAllRoomRate();

    /**
     * @return an Object of ListRoomWrapper that have all the details of all
     *         the roomType Available.
     */
    ListRoomWrapper getRoomTypeDetails();

    /**
     * @return an object of ListPromotionsDto that contains the list of
     *         promotions fetched from the GraphQl.
     */
    ListPromotionsDto getAllPromotions();

    GuestDto createGuest(String name);

    Integer createManyBookings(Integer adultCount, Integer amountDueAtResort, String checkInDate,
                               String checkOutDate, Integer childCount, Integer guestId,
                               Integer promotionId, Integer propertyId, Integer statusId, Integer totalCost);



    Integer createPromotions(String promoTitle,  String promoDescription,
                             Boolean isDeactivated, Integer minDaysOfStay, Double priceFactor);

    Integer updateRoomAvailability(Integer bookingId, Integer availabilityId);

    List<AvailabilityIdDto> availabilityIdForABookingId(Integer bookingId);

    Integer updateBookingStatusForCancel(Integer bookingId);
}
