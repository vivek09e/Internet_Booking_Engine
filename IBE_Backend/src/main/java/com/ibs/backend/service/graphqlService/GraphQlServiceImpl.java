package com.ibs.backend.service.graphqlService;

import com.ibs.backend.entity.RoomType;
import com.ibs.backend.entityDto.*;
import com.ibs.backend.mapper.*;
import com.ibs.backend.repository.GraphQlRepo.GraphQlRepository;
import com.ibs.backend.repository.PromotionsRepository;
import com.ibs.backend.repository.PropertyRepository;
import com.ibs.backend.repository.RoomTypeRepository;
import com.ibs.backend.service.Review.ReviewService;
import com.ibs.backend.utilities.DateFormatter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@Transactional
public class GraphQlServiceImpl implements GraphQlService {

    @Autowired
    RoomTypeGraphMapper roomTypeGraphMapper;
    @Autowired
    RoomTypeRepository roomTypeRepository;
    @Autowired
    RoomTypeDateCountMapper roomTypeDateCountMapper;
    @Autowired
    RoomRateMapper roomRateMapper;
    @Autowired
    GraphqlConfig graphqlConfig;
    @Value("${graphql-api}")
    private String graphQlUrl;

    @Value("${AWS_APPSYNC_API_KEY}")
    private String graphQlApiKey;
    @Autowired
    GraphQlRepository graphQlRepository;

    @Autowired
    PropertyRepository propertyRepository;

    @Autowired
    PromotionsRepository promotionsRepository;

    @Autowired
    PromotionsMapper promotionsMapper;

    @Autowired
    RoomTypeMapper roomTypeMapper;

    @Autowired
    ReviewService reviewService;

    @Override
    public TreeMap<String, Integer> getMinRate() {
        List<RoomRatesEntity> roomRates = graphQlRepository.getAllRoomRate();
        return roomRateMapper.fromData(roomRates);
    }

    @Override
    public List<RoomTypeGraphDto> getRoomsDetails(String startDate, String endDate, Integer roomCount) {
        List<RoomTypeDataDto> res = roomTypeDateCountMapper.fromWrapper(graphQlRepository.getRoomTypeDetails());
        List<RoomTypeGraphDto> result = new ArrayList<>();
        Double propertyTax = propertyRepository.findById("1").get().getPropertyTax();

        try {
            for (RoomTypeDataDto roomTypeDataDto : res) {
                DateTimeFormatter op = DateTimeFormatter.ofPattern("dd-MM-yyyy", Locale.ENGLISH);
                LocalDate date1 = LocalDate.parse(startDate, op);
                LocalDate date2 = LocalDate.parse(endDate, op);
                int flag = 0;
                Integer nightCharge = 0;
                int count = 0;
                List<DateWisePrice> dateWisePrices = new ArrayList<>();
                date2 = date2.plusDays(1);
                for (LocalDate start = date1; start.isBefore(date2); start = start.plusDays(1)) {

                    String check = start.toString().substring(8) + "-"
                            + start.toString().substring(5, 7) + "-"
                            + start.toString().substring(0, 4);

                    count++;
                    if (!roomTypeDataDto.getPriceCountData()
                            .containsKey(check)
                            || roomTypeDataDto.getPriceCountData()
                                    .get(check).getRoomCount() < roomCount) {
                        flag = 1;
                        break;
                    } else {
                        String formattedDate = start.format(DateTimeFormatter
                                .ofLocalizedDate(FormatStyle.FULL));
                        DateWisePrice dateWisePrice = new DateWisePrice();
                        dateWisePrice.setDate(formattedDate);
                        dateWisePrice.setPrice(roomTypeDataDto.getPriceCountData().get(check)
                                .getNightRate());
                        dateWisePrices.add(dateWisePrice);
                        nightCharge += roomTypeDataDto.getPriceCountData().get(check)
                                .getNightRate();
                    }
                }

                if (flag == 0) {
                    RoomType roomType = roomTypeRepository.getById((roomTypeDataDto.getRoomTypeId()).toString());
                    RoomTypeGraphDto roomTypeGraphDto = roomTypeGraphMapper.fromEntity(roomTypeDataDto, roomType,
                            nightCharge / count);
                    roomTypeGraphDto.setDateWisePrices(dateWisePrices);
                    roomTypeGraphDto.setPropertyTax(propertyTax);
                    roomTypeGraphDto.setAmenities(roomTypeRepository.findById(roomTypeGraphDto.getRoomTypeId()
                            .toString()).map(roomTypeMapper::fromEntity).orElse(new RoomTypeDto()).getAmenities());
                    roomTypeGraphDto
                            .setReviewDto(reviewService.getByRoomTypeId(roomTypeGraphDto.getRoomTypeId().toString()));
                    result.add(roomTypeGraphDto);

                }
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return result;
    }

    @Override
    public HashMap<Integer, List<Integer>> getRoomAvailability(String startDate, String toDate, Integer numberOfRoom,
            Integer roomTypeID) {
        ListRoomWrapper listRoomWrapper = graphQlRepository.getRoomTypeDetails();
        HashMap<Integer, List<Integer>> result = new HashMap<>();
        try {
            for (ListRoomTypesDto listRoomTypesDto : listRoomWrapper.getListRoomTypesDtos()) {
                if (listRoomTypesDto.getRoomTypeId() == roomTypeID) {
                    DateTimeFormatter op = DateTimeFormatter.ofPattern("dd-MM-yyyy", Locale.ENGLISH);
                    LocalDate date1 = LocalDate.parse(startDate, op);
                    LocalDate date2 = LocalDate.parse(toDate, op);
                    date2 = date2.plusDays(1);
                    for (LocalDate start = date1; start.isBefore(date2); start = start.plusDays(1)) {
                        String check = start.toString().substring(8) + "-"
                                + start.toString().substring(5, 7) + "-"
                                + start.toString().substring(0, 4);
                        for (RoomDto roomDto : listRoomTypesDto.getRoomDto()) {
                            for (RoomAvailable roomAvailable : roomDto.getRoomsAvailable()) {
                                if (DateFormatter.dateConverter(roomAvailable.getDate()).equals(check)) {
                                    if (result.containsKey(roomAvailable.getRoomID())) {
                                        result.get(roomAvailable.getRoomID()).add(roomAvailable.getAvailabilityId());
                                    } else {
                                        result.put(roomAvailable.getRoomID(),
                                                new ArrayList<>(roomAvailable.getAvailabilityId()));
                                    }
                                }
                            }

                        }
                    }

                }
            }
        } catch (DateTimeException e) {
            System.out.println(e.getMessage());
        }

        return result;
    }

    @Override
    public List<PromotionDto> getAllPromotions() {
        List<PromotionDto> graphQLPromoList = graphQlRepository.getAllPromotions().getPromotions();
        List<PromotionDto> temp = new ArrayList<>();

        for (PromotionDto promotionDto : graphQLPromoList) {
            if (promotionDto.getPromoId() <= 5) {
                promotionDto.setCategory("Standard");
                promotionDto.setMinimumRooms(1);
                temp.add(promotionDto);
            }
        }
        List<PromotionDto> result = new ArrayList<>();
        Map<String, PromotionDto> graphQLMap = temp.stream()
                .collect(Collectors.toMap(PromotionDto::getPromoTitle,
                        Function.identity()));

        List<PromotionDto> tenantPromotions = promotionsRepository.findAll()
                .stream().map(promotionsMapper::fromEntity)
                .collect(Collectors.toList());

        for (PromotionDto promotionDto : tenantPromotions) {
            graphQLMap.put(promotionDto.getPromoTitle(), promotionDto);
        }
        for (String promoName : graphQLMap.keySet()) {
            result.add(graphQLMap.get(promoName));
        }

        return result;
    }
}
