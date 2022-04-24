package com.ibs.backend.repository.GraphQlRepo;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ibs.backend.constant.GraphQlConstants;
import com.ibs.backend.constant.Mutation;
import com.ibs.backend.entityDto.*;
import com.ibs.backend.service.graphqlService.GraphqlConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;

@Component
public class GraphQlRepositoryImpl implements GraphQlRepository {
    private static ListRoomWrapper listRoomWrapper;
    private static List<RoomRatesEntity> roomRates;
    @Autowired
    GraphqlConfig graphqlConfig;
    @Value("${graphql-api}")
    private String graphQlUrl;

    @Value("${AWS_APPSYNC_API_KEY}")
    private String graphQlApiKey;

    @Autowired
    Mutation mutation;

    @Override
    public List<RoomRatesEntity> getAllRoomRate() {
        if (roomRates != null)
            return roomRates;
        WebClient.ResponseSpec response = graphqlConfig.setConnection(GraphQlConstants.allRoomRate);
        String properties = response.bodyToMono(JsonNode.class)
                .map(s -> s.path("data"))
                .map(s -> s.path("listRoomTypes"))
                .block().toString();
        try {
            roomRates = Arrays.asList(new ObjectMapper().readValue(properties, RoomRatesEntity[].class));
        } catch (JsonProcessingException e) {
            System.out.println(" ERROR : " + e.getMessage());
        }
        return roomRates;
    }

    @Override
    public ListRoomWrapper getRoomTypeDetails() {
        if (listRoomWrapper != null)
            return listRoomWrapper;
        WebClient.ResponseSpec response = graphqlConfig.setConnection(GraphQlConstants.getRoomDetails);

        String properties = response.bodyToMono(JsonNode.class)
                .map(s -> s.path("data"))
                .block().toString();
        try {
            listRoomWrapper = new ObjectMapper().readValue(properties, ListRoomWrapper.class);
        } catch (JsonProcessingException e) {
            System.out.println(" ERROR : " + e.getMessage());
        }
        return listRoomWrapper;
    }

    @Override
    public ListPromotionsDto getAllPromotions() {
        WebClient.ResponseSpec response = graphqlConfig.setConnection(GraphQlConstants.getAllPromotions);
        String promotionsData = response.bodyToMono(JsonNode.class)
                .map(s -> s.path("data"))
                .map(s -> s.path("listPromotions"))
                .block().toString();
        List<PromotionDto> promotionDtos = new ArrayList<>();
        ListPromotionsDto listPromotionsDto = new ListPromotionsDto();
        try {
            promotionDtos = Arrays.asList(new ObjectMapper().readValue(promotionsData, PromotionDto[].class));
        } catch (JsonProcessingException e) {
            System.out.println(" ERROR : " + e.getMessage());
        }
        listPromotionsDto.setPromotions(promotionDtos);

        return listPromotionsDto;
    }

    @Override
    public GuestDto createGuest(String name) {
        WebClient.ResponseSpec response = graphqlConfig.setConnection(mutation.createGuest(name));
        String guestFromGraphql = response.bodyToMono(JsonNode.class)
                .map(s -> s.path("data"))
                .map(s -> s.path("createGuest"))
                .block().toString();
        GuestDto guestDto = new GuestDto();
        try {
            guestDto = new ObjectMapper().readValue(guestFromGraphql, GuestDto.class);
        } catch (JsonProcessingException e) {
            System.out.println(" ERROR: " + e.getMessage());
        }
        return guestDto;
    }

    @Override
    public Integer createManyBookings(Integer adultCount, Integer amountDueAtResort, String checkInDate,
            String checkOutDate, Integer childCount, Integer guestId, Integer promotionId, Integer propertyId,
            Integer statusId, Integer totalCost) {
        WebClient.ResponseSpec response = graphqlConfig
                .setConnection(mutation.createManyBookings(adultCount, amountDueAtResort, checkInDate, checkOutDate,
                        childCount, guestId, promotionId, propertyId, statusId, totalCost));
        String bookingFromGraphql = response.bodyToMono(JsonNode.class)
                .map(s -> s.path("data"))
                .map(s -> s.path("createManyBookings"))
                .map(s -> s.path("count"))
                .block().toString();
        Integer bookingId = -1;
        BookingDto bookingDto = new BookingDto();
        if (bookingFromGraphql.equals("1")) {
            WebClient.ResponseSpec responseSpec = graphqlConfig.setConnection(
                    mutation.getBookingId(adultCount, checkInDate, checkOutDate, guestId, promotionId, propertyId));
            String bookingIdList = responseSpec.bodyToMono(JsonNode.class)
                    .map(s -> s.path("data"))
                    .map(s -> s.path("listBookings"))
                    .block().toString();

            List<ListBookings> bookingDtoList = new ArrayList<>();
            try {
                bookingDtoList = Arrays.asList(new ObjectMapper().readValue(bookingIdList, ListBookings[].class));
                bookingId = bookingDtoList.get(0).getBookingId();

            } catch (JsonProcessingException e) {
                System.out.println(" ERROR : " + e.getMessage());
            }

        }
        return bookingId;
    }

    @Override
    public Integer createPromotions(String promoTitle, String promoDescription, Boolean isDeactivated,
            Integer minDaysOfStay, Double priceFactor) {
        WebClient.ResponseSpec response = graphqlConfig.setConnection(
                mutation.createPromotion(promoTitle, promoDescription, isDeactivated, minDaysOfStay, priceFactor));
        Integer promoId = Integer.parseInt(response.bodyToMono(JsonNode.class)
                .map(s -> s.path("data"))
                .map(s -> s.path("createPromotion"))
                .map(s -> s.path("promotion_id"))
                .block().toString());
        return promoId;
    }

    @Override
    public Integer updateRoomAvailability(Integer bookingId, Integer availabilityId) {
        WebClient.ResponseSpec response = graphqlConfig
                .setConnection(mutation.updateRoomAvailability(bookingId, availabilityId));
        Integer bookingID = Integer.parseInt(response.bodyToMono(JsonNode.class)
                .map(s -> s.path("data"))
                .map(s -> s.path("updateRoomAvailability"))
                .map(s -> s.path("booking_id"))
                .block().toString());
        return bookingID;
    }

    @Override
    public List<AvailabilityIdDto> availabilityIdForABookingId(Integer bookingId) {
        WebClient.ResponseSpec response = graphqlConfig.setConnection(mutation.getRoomAvailablityIds(bookingId));
        String data = response.bodyToMono(JsonNode.class)
                .map(s -> s.path("data"))
                .map(s -> s.path("getBooking"))
                .map(s -> s.path("room_booked"))
                .block().toString();
        List<AvailabilityIdDto> availabilityIdDtoList = new ArrayList<>();
        try {
            availabilityIdDtoList = Arrays.asList(new ObjectMapper().readValue(data, AvailabilityIdDto[].class));
        } catch (JsonProcessingException e) {
            System.out.println(" ERROR : " + e.getMessage());
        }
        return availabilityIdDtoList;
    }

    @Override
    public Integer updateBookingStatusForCancel(Integer bookingId) {
        WebClient.ResponseSpec response = graphqlConfig.setConnection(mutation.updateBookingStatusForCancel(bookingId));
        Integer statusId = Integer.parseInt(response.bodyToMono(JsonNode.class)
                .map(s -> s.path("data"))
                .map(s -> s.path("updateBooking"))
                .map(s -> s.path("status_id"))
                .block().toString());
        return statusId;
    }

}