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
class TenantControllerTest {
        @Autowired
        private MockMvc mockMvc;

        private String token;

        @Test
        public void getAllTenant() throws Exception {
                MvcResult tokenResult = mockMvc
                                .perform(MockMvcRequestBuilders.post("/authenticate")
                                                .contentType(MediaType.APPLICATION_JSON)
                                                .content("{\n" +
                                                                "    \"username\": \"KDU2022\",\n" +
                                                                "        \"password\": \"KDU2022\"\n" +
                                                                "}"))
                                .andReturn();
                token = tokenResult.getResponse().getContentAsString();
                token = token.substring(10, token.length() - 2);
                mockMvc.perform(MockMvcRequestBuilders.get("/api/tenant/").header("Authorization", token)
                                .accept(MediaType.APPLICATION_JSON))
                                .andExpect(status().isOk());
        }

        @Test
        public void addNewTenant() throws Exception {
                MvcResult tokenResult = mockMvc
                                .perform(MockMvcRequestBuilders.post("/authenticate")
                                                .contentType(MediaType.APPLICATION_JSON)
                                                .content("{\n" +
                                                                "    \"username\": \"KDU2022\",\n" +
                                                                "        \"password\": \"KDU2022\"\n" +
                                                                "}"))
                                .andReturn();
                token = tokenResult.getResponse().getContentAsString();
                token = token.substring(10, token.length() - 2);
                mockMvc.perform(MockMvcRequestBuilders.post("/api/tenant/").contentType(MediaType.APPLICATION_JSON)
                                .content("{\n" +
                                                "    \"id\":\"t1\",\n" +
                                                "    \"name\":\"Casino Casino\",\n" +
                                                "    \"contactInfo\":\"9192\",\n" +
                                                "    \"languagesList\":[\n" +
                                                "        {\n" +
                                                "            \"id\":1,\n" +
                                                "            \"language\":\"EN\",\n" +
                                                "            \"currency\":\"$ USD\"\n" +
                                                "        }\n" +
                                                "    ]\n" +
                                                "}")
                                .header("Authorization", token)
                                .accept(MediaType.APPLICATION_JSON))
                                .andExpect(status().isOk());
        }

        @Test
        public void getTenantByID() throws Exception {
                MvcResult tokenResult = mockMvc
                                .perform(MockMvcRequestBuilders.post("/authenticate")
                                                .contentType(MediaType.APPLICATION_JSON)
                                                .content("{\n" +
                                                                "    \"username\": \"KDU2022\",\n" +
                                                                "        \"password\": \"KDU2022\"\n" +
                                                                "}"))
                                .andReturn();
                token = tokenResult.getResponse().getContentAsString();
                token = token.substring(10, token.length() - 2);
                mockMvc.perform(MockMvcRequestBuilders.get("/api/tenant/1").header("Authorization", token)
                                .accept(MediaType.APPLICATION_JSON))
                                .andExpect(status().isOk());
        }
}