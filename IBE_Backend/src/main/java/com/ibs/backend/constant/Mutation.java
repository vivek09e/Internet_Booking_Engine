package com.ibs.backend.constant;

import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class Mutation {
    public String createGuest(String guestName) {
        return "mutation MyMutation {\n" +
                "  createGuest(data: {guest_name: \"" + guestName +
                "\"}) {\n" +
                "    guest_id\n" +
                "    guest_name\n" +
                "  }\n" +
                "}";
    }

    public String createPromotion(String promoTitle, String promoDescription,
                                  Boolean isDeactivated, Integer minDaysOfStay, Double priceFactor) {
        return "mutation MyMutation {\n" +
                "  createPromotion(data: {is_deactivated: " + isDeactivated +
                ", minimum_days_of_stay:" + minDaysOfStay + ", price_factor:" +
                priceFactor + ", promotion_description: \"" + promoDescription +
                "\", promotion_title: \"" + promoTitle + "\"}) {\n" +
                "    is_deactivated\n" +
                "    minimum_days_of_stay\n" +
                "    price_factor\n" +
                "    promotion_description\n" +
                "    promotion_id\n" +
                "    promotion_title\n" +
                "  }\n" +
                "}";
    }

    public String createManyBookings(Integer adultCount, Integer amountDueAtResort,
                                     String checkInDate, String checkOutDate, Integer childCount,
                                     Integer guestId, Integer promotionId, Integer propertyId,
                                     Integer statusId, Integer totalCost) {
        return "mutation MyMutation {\n" +
                "  createManyBookings(data: {adult_count: " + adultCount +
                ", amount_due_at_resort: " + amountDueAtResort +
                ", check_in_date: " + checkInDate + ", check_out_date: " +
                checkOutDate + ", child_count: " + childCount + ", guest_id: " +
                guestId + ", promotion_id: " + promotionId + ", property_id: " +
                propertyId + ", status_id: " + statusId + ", total_cost: " + totalCost + "}) {\n" +
                "    count\n" +
                "  }\n" +
                "}";
    }

    public String updateRoomAvailability(Integer bookingId, Integer availabilityId) {
        return "mutation MyMutation {\n" +
                "  updateRoomAvailability(data: {booking_id: " + bookingId +
                "}, where: {availability_id: " + availabilityId + "}) {\n" +
                "    booking_id\n" +
                "  }\n" +
                "}";
    }

    public String getBookingId(Integer adultCount, String checkInDate, String checkOutDate,
                               Integer guestId, Integer promotionId, Integer propertyId) {
        return "query MyQuery {\n" +
                "  listBookings(where: {adult_count: {equals: " +
                adultCount + "}, check_in_date: {equals: " + checkInDate +
                "}, check_out_date: {equals: " + checkOutDate + "}, guest_id: {equals: " +
                guestId + "}, promotion_id: {equals: " + promotionId + "}, property_id: {equals: "
                + propertyId + "}}) {\n" +
                "    booking_id\n" +
                "    status_id\n" +
                "  }\n" +
                "}";
    }

    public String getRoomAvailablityIds(Integer bookingId) {
        return "query MyQuery {\n" +
                "  getBooking(where: {booking_id: " + bookingId + "}) {\n" +
                "    room_booked {\n" +
                "      availability_id\n" +
                "    }\n" +
                "  }\n" +
                "}";
    }

    public String updateBookingStatusForCancel(Integer bookingId) {
        return "mutation MyMutation {\n" +
                "  updateBooking(data: {status_id: 2}, where: {booking_id: " + bookingId + "}) {\n" +
                "    status_id\n" +
                "  }\n" +
                "}";
    }
}
