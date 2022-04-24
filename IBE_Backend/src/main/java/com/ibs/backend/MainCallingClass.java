package com.ibs.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class MainCallingClass {
    public static void main(String[] args) {
        final ConfigurableApplicationContext run = SpringApplication.run(MainCallingClass.class, args);
    }
}
