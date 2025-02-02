package com.example.FrontOffice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class FrontOfficeApplication {

	public static void main(String[] args) {
		SpringApplication.run(FrontOfficeApplication.class, args);
	}

}


