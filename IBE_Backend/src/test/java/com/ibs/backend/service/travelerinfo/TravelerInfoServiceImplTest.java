package com.ibs.backend.service.travelerinfo;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ibs.backend.controller.TravelerInfoControllerTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;


@SpringBootTest
@AutoConfigureMockMvc
public class TravelerInfoServiceImplTest implements Runnable{
    @Autowired
    private MockMvc mockMvc;

    private String token;

    public TravelerInfoServiceImplTest(MockMvc mockMvc, String token){
        this.mockMvc=mockMvc;
        this.token=token;
    }

    /**
     * When an object implementing interface {@code Runnable} is used
     * to create a thread, starting the thread causes the object's
     * {@code run} method to be called in that separately executing
     * thread.
     * <p>
     * The general contract of the method {@code run} is that it may
     * take any action whatsoever.
     *
     * @see Thread#run()
     */
    @Override
    public void run() {
        try {
            System.out.println("ThreadNumber: "+Thread.currentThread().getId());
            MvcResult mvcResult=  mockMvc.perform(MockMvcRequestBuilders.post("/travelerInfo").contentType(MediaType.APPLICATION_JSON)
                    .content("{\"travelerInfoDto\":{\"phone\":\"7982357345\",\"firstName\":\"Vivek\",\"lastName\":\"Tiwari\",\"middleName\":\"\",\"emailId\":\"vivek.tiwari@kickdrumtech.com\",\"phoneCode\":\"\",\"bookingId\":\"\",\"billingInfo\":{\"id\":\"\",\"firstName\":\"Vivek\",\"lastName\":\"Tiwari\",\"middleName\":\"\",\"mailingAddress1\":\"Add1\",\"mailingAddress2\":\"\",\"country\":\"AU\",\"state\":\"New South Wales\",\"city\":\"Faridabad\",\"zip\":\"22110\"}},\"paymentDto\":{\"cardNumber\":\"6\",\"payExpiryMM\":\"6\",\"payExpiryYY\":\"31\",\"cvvCode\":0},\"bookingDto\":{\"id\":-1,\"adultCount\":2,\"checkInDate\":\"\\\"2022-04-12T18:30:00.000Z\\\"\",\"checkOutDate\":\"\\\"2022-04-21T18:30:00.000Z\\\"\",\"guestId\":-1,\"promotionName\":\"Long weekend discount\",\"propertyId\":1,\"amountDueAtResort\":0,\"childCount\":2,\"statusId\":-1,\"totalCost\":627,\"roomTypeID\":33,\"numberOfRoom\":0}}")
                    .header("Authorization", token)
                    .accept(MediaType.APPLICATION_JSON)).andReturn();
            ObjectMapper mapper=new ObjectMapper();
            String content = mvcResult.getResponse().getContentAsString();
            System.out.println("Result "+content+ " ThreadNumber: "+Thread.currentThread().getId());

        }catch (Exception e){
            e.printStackTrace();
        }
    }
}