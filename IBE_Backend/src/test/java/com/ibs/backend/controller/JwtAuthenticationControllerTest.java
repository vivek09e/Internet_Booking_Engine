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
class JwtAuthenticationControllerTest {

        @Autowired
        private MockMvc mockMvc;

        @Test
        public void testJwtToken() throws Exception {
                mockMvc.perform(MockMvcRequestBuilders.post("/authenticate").contentType(MediaType.APPLICATION_JSON)
                                .content("{\n" +
                                                "    \"username\": \"KDU2022\",\n" +
                                                "        \"password\": \"KDU2022\"\n" +
                                                "}")
                                .accept(MediaType.APPLICATION_JSON))
                                .andExpect(status().isOk());

        }

        @Test
        public void testJwtTokenUnAuth() throws Exception {
                mockMvc.perform(MockMvcRequestBuilders.post("/authenticate").contentType(MediaType.APPLICATION_JSON)
                                .content("{\n" +
                                                "    \"username\": \"KDU2022\",\n" +
                                                "        \"password\": \"KDU2021\"\n" +
                                                "}")
                                .accept(MediaType.APPLICATION_JSON))
                                .andExpect(status().isUnauthorized());
        }

}