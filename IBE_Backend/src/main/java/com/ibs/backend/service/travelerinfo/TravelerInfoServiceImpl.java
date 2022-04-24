package com.ibs.backend.service.travelerinfo;

import com.ibs.backend.entity.*;
import com.ibs.backend.entityDto.*;
import com.ibs.backend.mapper.*;
import com.ibs.backend.repository.*;
import com.ibs.backend.repository.GraphQlRepo.GraphQlRepository;

import com.ibs.backend.service.graphqlService.GraphQlService;
import com.ibs.backend.utilities.DateFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Service
@Transactional
public class TravelerInfoServiceImpl implements TravelerInfoService {

    @Autowired
    TravelerInfoRepository travelerInfoRepository;

    @Autowired
    BillingInfoRepository billingInfoRepository;

    @Autowired
    GuestMapper guestMapper;

    @Autowired
    TravelerInfoMapper travelerInfoMapper;

    @Autowired
    GuestRepository guestRepository;

    @Autowired
    PromoCodeRepository promoCodeRepository;

    @Autowired
    PromoCodeMapper promoCodeMapper;

    @Autowired
    GraphQlRepository graphQlRepository;

    @Autowired
    PromotionsRepository promotionsRepository;

    @Autowired
    PromotionsMapper promotionsMapper;

    @Autowired
    PaymentRepository paymentRepository;

    @Autowired
    GraphQlService graphQlService;

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    BookingInfoMapper bookingInfoMapper;

    @Autowired
    RoomTypeRepository roomTypeRepository;

    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    RoomTypeMapper roomTypeMapper;

    @Autowired
    PaymentMapper paymentMapper;

    /**
     * @param bookingDtoPromotionName Name of the Promotion of which promotion Id is
     *                                need to be fetched.
     * @return Integer that is the promotion Id of the promotion name.
     */
    public Integer createPromotionHelper(String bookingDtoPromotionName) {
        Integer promoId = -1;
        List<PromotionDto> graphQLPromoList = graphQlRepository.getAllPromotions().getPromotions();
        if (!graphQLPromoList.stream().anyMatch(p -> p.getPromoTitle().equals(bookingDtoPromotionName))) {
            PromotionDto promotionDto = promotionsRepository.findAll()
                    .stream().map(promotionsMapper::fromEntity).filter(p -> p.getPromoTitle()
                            .equals(bookingDtoPromotionName))
                    .findAny().orElse(null);
            if (promotionDto != null) {
                promoId = graphQlRepository.createPromotions(promotionDto.getPromoTitle(),
                        promotionDto.getPromoDescription(), promotionDto.getIsDeactivated(),
                        promotionDto.getMinimumDaysOfStay(), promotionDto.getPriceFactor());
            }
        } else {
            promoId = graphQLPromoList.stream().filter(p -> p.getPromoTitle().equals(bookingDtoPromotionName)).findAny()
                    .orElse(null).getPromoId();
        }
        return promoId;
    }

    public void changeAvailability(Map<Integer, List<Integer>> availabilityIds, Integer numberOfRoom, Integer bookingID,
            Long duration) {
        int i = 0;
        for (Integer roomId : availabilityIds.keySet()) {
            if (i == numberOfRoom)
                break;
            if (availabilityIds.get(roomId).size() >= duration) {
                i++;
                for (Integer availabilityId : availabilityIds.get(roomId)) {
                    int id = graphQlRepository.updateRoomAvailability(bookingID, availabilityId);
                }
            }
        }
    }

    public Integer createPromotionFromPromoCode(String promoName){
        Integer promoId = -1;
        List<PromotionDto> graphQLPromoList = graphQlRepository.getAllPromotions().getPromotions();
        if (!graphQLPromoList.stream().anyMatch(p -> p.getPromoTitle().equals(promoName))) {
            PromoCodeDto promoCodeDto = promoCodeRepository.findAll()
                    .stream().map(promoCodeMapper::fromEntity).filter(p -> p.getCode()
                            .equals(promoName))
                    .findAny().orElse(null);
            if (promoCodeDto != null) {
                promoId = graphQlRepository.createPromotions(promoCodeDto.getCode(),
                        "PromoCode", false,
                        promoCodeDto.getMinStay(), promoCodeDto.getPriceFactor());
            }
        } else {
            promoId = graphQLPromoList.stream().filter(p -> p.getPromoTitle().equals(promoName)).findAny()
                    .orElse(null).getPromoId();
        }
        return promoId;
    }

    @Override
    public synchronized BookingGuestDto addTraveler(TravelerPayBookingDto travelerPayBookingDto) {
        Guest guest;
        if (travelerPayBookingDto.getBookingDto().getGuestId() == -1) {
            String guestName = travelerPayBookingDto.getTravelerInfoDto().getFirstName()
                    + " " + travelerPayBookingDto.getTravelerInfoDto().getLastName();
            GuestDto guestDto = graphQlRepository.createGuest(guestName);
            guestDto.setGuestEmail(travelerPayBookingDto.getTravelerInfoDto().getEmailId());
            guest = guestMapper.toEntity(guestDto);
        } else {
            guest = guestRepository.getById(travelerPayBookingDto.getBookingDto().getGuestId());
        }
        BookingDto bookingDto = travelerPayBookingDto.getBookingDto();
        Integer promoId=-1;
        if(bookingDto.getPromoType().equals("PROMO")){
            promoId=createPromotionFromPromoCode(bookingDto.getPromotionName());
        }else{
            promoId = createPromotionHelper(bookingDto.getPromotionName());
        }
        Integer bookingId = graphQlRepository.createManyBookings(
                bookingDto.getAdultCount(), bookingDto.getAmountDueAtResort(),
                bookingDto.getCheckInDate(), bookingDto.getCheckOutDate(),
                bookingDto.getChildCount(), guest.getId(), promoId,
                bookingDto.getPropertyId(), 3, bookingDto.getTotalCost());
        bookingDto.setPropertyId(1);
        travelerPayBookingDto.getTravelerInfoDto().setBookingId(bookingId);
        TravelerInfo travelerInfo = travelerInfoMapper.toEntity(travelerPayBookingDto.getTravelerInfoDto());
        String checkInDate = bookingDto.getCheckInDate().substring(1, bookingDto.getCheckInDate().length() - 1);
        String checkOutDate = bookingDto.getCheckOutDate().substring(1, bookingDto.getCheckOutDate().length() - 1);
        Map<Integer, List<Integer>> availabilityIds = graphQlService.getRoomAvailability(
                DateFormatter.dateConverter(checkInDate),
                DateFormatter.dateConverter(checkOutDate), 4, bookingDto.getRoomTypeID());
        Long duration = DateFormatter.difference(DateFormatter.dateConverter(checkInDate),
                DateFormatter.dateConverter(checkOutDate));
        changeAvailability(availabilityIds, bookingDto.getNumberOfRoom(), bookingId, duration);

        long reviewID = -1;
        if (bookingId != -1) {
            bookingDto.setId(bookingId);
            Booking booking = bookingInfoMapper.toEntity(bookingDto);
            booking.setGuest(guest);
            travelerInfo.setBooking(booking);
            travelerInfoRepository.save(travelerInfo);
            billingInfoRepository.save(travelerInfo.getBillingInfo());
            Review review = new Review();
            review.setEmailOfTraveler(travelerInfo.getEmailId());
            DateTimeFormatter op = DateTimeFormatter.ofPattern("dd-MM-yyyy", Locale.ENGLISH);
            LocalDate date1 = LocalDate.parse(DateFormatter.dateConverter(checkOutDate), op);
            review.setCheckOutDate(date1);
            booking.setStatusId(3);
            review.setEmailSent(false);
            review.setIncludeFlag(false);
            review.setRoomType(roomTypeRepository.getById(bookingDto.getRoomTypeID().toString()));
            review.setBooking(booking);
            reviewRepository.save(review);
            Payment payment = new Payment();
            payment.setBooking(booking);
            payment.setGuest(guest);
            payment.setCardNumber(travelerPayBookingDto.getPaymentDto().getCardNumber());
            payment.setPayExpiryMM(travelerPayBookingDto.getPaymentDto().getPayExpiryMM());
            payment.setPayExpiryYY(travelerPayBookingDto.getPaymentDto().getPayExpiryYY());
            paymentRepository.save(payment);
            reviewID = review.getReviewId();
        }
        BookingGuestDto bookingGuestDto = new BookingGuestDto(bookingId, guest.getId(), reviewID, 3);
        return bookingGuestDto;
    }

    @Override
    public BookingGuestDto cancelBooking(BookingGuestDto bookingGuestDto) {
        List<AvailabilityIdDto> availabilityIdDtoList = graphQlRepository
                .availabilityIdForABookingId(bookingGuestDto.getBookingId());
        for (AvailabilityIdDto availabilityIdDto : availabilityIdDtoList) {
            graphQlRepository.updateRoomAvailability(0, availabilityIdDto.getId());
        }
        graphQlRepository.updateBookingStatusForCancel(bookingGuestDto.getBookingId());
        Booking booking = bookingRepository.getById(bookingGuestDto.getBookingId());
        booking.setStatusId(2);
        bookingRepository.save(booking);
        return bookingGuestDto;
    }

    @Override
    public ConfirmationPageDto getTravelerInfoFromBookingId(Integer bookingId) {
        ConfirmationPageDto confirmationPageDto = new ConfirmationPageDto();
        Booking booking = bookingRepository.getById(bookingId);
        confirmationPageDto.setBookingDto(bookingInfoMapper.fromEntity(booking));
        RoomType roomType = roomTypeRepository.getById(booking.getRoomType().getId());
        confirmationPageDto.setRoomTypeDto(roomTypeMapper.fromEntity(roomType));
        ListPromotionsDto promotionDtos = graphQlRepository.getAllPromotions();
        for (PromotionDto promotionDto : promotionDtos.getPromotions()) {
            if (promotionDto.getPromoTitle().toLowerCase().contains(booking.getPromotionName().toLowerCase())) {
                confirmationPageDto.setPromotionDto(promotionDto);
                break;
            }
        }
        confirmationPageDto.setPaymentDto(paymentMapper
                .fromEntity(paymentRepository.findByBookingId(bookingId)));
        TravelerInfo travelerInfo = travelerInfoRepository.findByBookingId(bookingId);
        confirmationPageDto.setTravelerInfoDto(travelerInfoMapper.fromEntity(travelerInfo));
        return confirmationPageDto;
    }
}