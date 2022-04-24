package com.ibs.backend.controller;

import com.ibs.backend.service.travelerinfo.TravelerInfoServiceImplTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc

public class TravelerInfoControllerTest {
        @Autowired
        private MockMvc mockMvc;

        private String token;

        @Test
        public void addNewTraveler() throws Exception {
                MvcResult tokenResult = mockMvc
                                .perform(MockMvcRequestBuilders.post("/authenticate")
                                                .contentType(MediaType.APPLICATION_JSON)
                                                .content("{\n" +
                                                                "    \"username\": \"KDU2022\",\n" +
                                                                "    \"password\": \"KDU2022\"\n" +
                                                                "}"))
                                .andReturn();
                token = tokenResult.getResponse().getContentAsString();
                token = token.substring(10, token.length() - 2);
                mockMvc.perform(MockMvcRequestBuilders.post("/travelerInfo").contentType(MediaType.APPLICATION_JSON)
                                .content("{\"travelerInfoDto\":{\"phone\":\"7982357345\",\"firstName\":\"Vivek\",\"lastName\":\"Tiwari\",\"middleName\":\"\",\"emailId\":\"vivek.tiwari@kickdrumtech.com\",\"phoneCode\":\"\",\"bookingId\":\"\",\"billingInfo\":{\"id\":\"\",\"firstName\":\"Vivek\",\"lastName\":\"Tiwari\",\"middleName\":\"\",\"mailingAddress1\":\"Add1\",\"mailingAddress2\":\"\",\"country\":\"AU\",\"state\":\"New South Wales\",\"city\":\"Faridabad\",\"zip\":\"22110\"}},\"paymentDto\":{\"cardNumber\":\"6\",\"payExpiryMM\":\"6\",\"payExpiryYY\":\"31\",\"cvvCode\":0},\"bookingDto\":{\"id\":-1,\"adultCount\":2,\"checkInDate\":\"\\\"2022-04-12T18:30:00.000Z\\\"\",\"checkOutDate\":\"\\\"2022-04-21T18:30:00.000Z\\\"\",\"guestId\":-1,\"promotionName\":\"Long weekend discount\",\"propertyId\":1,\"amountDueAtResort\":0,\"childCount\":2,\"statusId\":-1,\"totalCost\":627,\"roomTypeID\":33,\"numberOfRoom\":0}}")
                                .header("Authorization", token)
                                .accept(MediaType.APPLICATION_JSON))
                                .andExpect(status().isOk());
        }

        @Test
        public void cancelBooking() throws Exception {
                MvcResult tokenResult = mockMvc
                                .perform(MockMvcRequestBuilders.post("/authenticate")
                                                .contentType(MediaType.APPLICATION_JSON)
                                                .content("{\n" +
                                                                "    \"username\": \"KDU2022\",\n" +
                                                                "    \"password\": \"KDU2022\"\n" +
                                                                "}"))
                                .andReturn();
                token = tokenResult.getResponse().getContentAsString();
                token = token.substring(10, token.length() - 2);
                mockMvc.perform(MockMvcRequestBuilders.post("/travelerInfo/cancel")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("{\n" +
                                                "    \"bookingId\": 315,\n" +
                                                "    \"guestId\": 298,\n" +
                                                "    \"reviewId\": 185\n" +
                                                "}")
                                .header("Authorization", token)
                                .accept(MediaType.APPLICATION_JSON))
                                .andExpect(status().isOk());
        }

        @Test
        public void checkMultiThreading() throws Exception {
                MvcResult tokenResult = mockMvc
                                .perform(MockMvcRequestBuilders.post("/authenticate")
                                                .contentType(MediaType.APPLICATION_JSON)
                                                .content("{\n" +
                                                                "    \"username\": \"KDU2022\",\n" +
                                                                "    \"password\": \"KDU2022\"\n" +
                                                                "}"))
                                .andReturn();
                token = tokenResult.getResponse().getContentAsString();
                token = token.substring(10, token.length() - 2);

                Thread thread1 = new Thread(new TravelerInfoServiceImplTest(mockMvc, token));
                Thread thread2 = new Thread(new TravelerInfoServiceImplTest(mockMvc, token));
                thread1.start();
                thread2.start();
                thread1.join();
                thread2.join();
        }
}