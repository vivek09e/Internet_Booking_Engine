package com.ibs.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ReviewControllerTest {
        @Autowired
        private MockMvc mockMvc;

        private String token;

        @Test
        public void updateReview() throws Exception {
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
                mockMvc.perform(MockMvcRequestBuilders.post("/Review").contentType(MediaType.APPLICATION_JSON)
                                .content("{\n" +
                                                "    \"reviewId\" :136, \n" +
                                                "    \"overAllRating\" :5,\n" +
                                                "    \"amenitiesRating\" :5,\n" +
                                                "    \"cleanlinessRating\" :5,\n" +
                                                "    \"facilitiesRating\" :5,\n" +
                                                "    \"roomComfortAndQualityRating\" :5,\n" +
                                                "    \"serviceRating\" :5,\n" +
                                                "    \"valueForMoneyRating\" :5\n" +
                                                "}}")
                                .header("Authorization", token)
                                .accept(MediaType.APPLICATION_JSON))
                                .andExpect(status().isOk());
        }

}