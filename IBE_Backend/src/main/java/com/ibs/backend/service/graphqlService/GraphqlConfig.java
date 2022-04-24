package com.ibs.backend.service.graphqlService;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Component
public class GraphqlConfig {
    @Value("${graphql-api}")
    private String graphQlUrl;

    @Value("${AWS_APPSYNC_API_KEY}")
    private String graphQlApiKey;

    /**
     * @param query which will run in appsync.
     * @return WebClient.ResponseSpec object (response) which we get after running
     *         the
     *         query passed in the function.
     */
    public WebClient.ResponseSpec setConnection(String query) {
        WebClient.RequestBodySpec requestBodySpec = WebClient
                .builder()
                .codecs(codecs -> codecs.defaultCodecs().maxInMemorySize(16 * 1024 * 1024))
                .baseUrl(graphQlUrl)
                .defaultHeader("x-api-key", graphQlApiKey)
                .build()
                .method(HttpMethod.POST)
                .uri("/graphql");
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("query", query);
        WebClient.ResponseSpec response = requestBodySpec
                .body(BodyInserters.fromValue(requestBody))
                .accept(MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML)
                .acceptCharset(StandardCharsets.UTF_8)
                .retrieve();
        return response;
    }
}
