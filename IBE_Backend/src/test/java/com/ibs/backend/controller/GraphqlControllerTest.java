package com.ibs.backend.controller;

import com.ibs.backend.service.graphqlService.GraphQlService;
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
class GraphqlControllerTest {
        @Autowired
        private MockMvc mockMvc;

        private String token;

        @Autowired
        GraphQlService graphQlService;

        @Test
        public void getMinRate() throws Exception {
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
                mockMvc.perform(MockMvcRequestBuilders.get("/GetMinRate").header("Authorization", token)
                                .accept(MediaType.APPLICATION_JSON))
                                .andExpect(status().isOk());
        }

        @Test
        public void getRoomDetailsByDate() throws Exception {
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
                mockMvc.perform(MockMvcRequestBuilders.get("/GetByDate").header("Authorization", token)
                                .header("fromDate", "12-03-2022")
                                .header("capacity", 5)
                                .header("toDate", "17-03-2022")
                                .accept(MediaType.APPLICATION_JSON))
                                .andExpect(status().isOk());
                assertEquals(graphQlService.getRoomsDetails("12-03-2022", "17-03-2022", 1).size() > 0, true);
        }

        @Test
        public void getAllPromo() throws Exception {
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
                mockMvc.perform(MockMvcRequestBuilders.get("/GetAllPromotions").header("Authorization", token)
                                .accept(MediaType.APPLICATION_JSON))
                                .andExpect(status().isOk());
        }
}