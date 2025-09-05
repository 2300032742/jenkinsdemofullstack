package com.practice.cicd;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class PracticeworkspaceApplication extends SpringBootServletInitializer
{

	public static void main(String[] args) {
		SpringApplication.run(PracticeworkspaceApplication.class, args);
		System.out.println("My Practice...!!!");
	}

}
