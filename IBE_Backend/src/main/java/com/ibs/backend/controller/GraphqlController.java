package com.ibs.backend.controller;

import com.ibs.backend.entityDto.PromotionDto;
import com.ibs.backend.entityDto.RoomTypeGraphDto;
import com.ibs.backend.service.graphqlService.GraphQlService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@Component
public class GraphqlController {

    @Autowired
    GraphQlService graphQlService;

    @Value("${spring.application.name}")
    private static String applicationName;

    private final Logger logger = LoggerFactory.getLogger(GraphqlController.class);

    /**
     * @return Response Entity that contains all the minimum
     * rates of rooms that are fetched from GraphQl and cleaned in the
     * backend
     */
    @CrossOrigin
    @GetMapping("/GetMinRate")
    public ResponseEntity<TreeMap<String, Integer>> getMinRate() {
        return Optional.ofNullable(new ResponseEntity(graphQlService.getMinRate(), HttpStatus.OK))
                .orElse(new ResponseEntity(null, HttpStatus.NOT_FOUND));
    }

    /**
     * @param fromDate from when the available rooms should be looked.
     * @param capacity minimum number of rooms required.
     * @param toDate   to when the available rooms should be looked.
     * @return ResponseEntity that contains the list of RoomTypeGraphDto
     * that gives the details of all the room type available in the
     * particular
     * date range with minimum number of required room.
     */
    @CrossOrigin
    @GetMapping("/GetByDate")
    public ResponseEntity<List<RoomTypeGraphDto>> getDataByDate(@RequestHeader("fromDate") String fromDate,
                                                                @RequestHeader("capacity") Integer capacity,
                                                                @RequestHeader("toDate") String toDate) {
        logger.info("Received request for {} and {} and {} ", fromDate, toDate, capacity);
        return Optional
                .ofNullable(
                        new ResponseEntity(graphQlService.getRoomsDetails(fromDate, toDate, capacity), HttpStatus.OK))
                .orElse(new ResponseEntity(null, HttpStatus.NOT_FOUND));
    }

    /**
     * @return ResponseEntity that have a list of PromotionDto
     * that contains all the promotion info from GraphQl and from
     * the backend database.
     */
    @CrossOrigin
    @GetMapping("/GetAllPromotions")
    public ResponseEntity<List<PromotionDto>> getAllPromo() {
        logger.info("Received request to get All Request");
        return Optional.ofNullable(new ResponseEntity(graphQlService.getAllPromotions(), HttpStatus.OK))
                .orElse(new ResponseEntity(null, HttpStatus.NOT_FOUND));
    }

}
