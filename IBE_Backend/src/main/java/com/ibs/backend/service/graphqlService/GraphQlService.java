package com.ibs.backend.service.graphqlService;

import com.ibs.backend.entityDto.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

public interface GraphQlService {
    /**
     * @return a TreeMap that contains all the dates as Key and minimum price
     *         associated
     *         with it as value.
     */
    TreeMap<String, Integer> getMinRate();

    /**
     * @param startDate from when we need to find the roomDetails
     * @param endDate   to when we need to find
     * @param roomCount minimum number of rooms required.
     * @return List of RoomTypeGraphDto that contains the all the roomType Details
     *         which
     *         satisfy the given parameters.
     */
    List<RoomTypeGraphDto> getRoomsDetails(String startDate, String endDate, Integer roomCount);

    /**
     * @return List of all the PromotionDto which are fetched from the graphQl.
     */
    List<PromotionDto> getAllPromotions();

    HashMap<Integer,List<Integer>> getRoomAvailability(String startDate, String toDate, Integer numberOfRoom,Integer roomTypeId);

}
