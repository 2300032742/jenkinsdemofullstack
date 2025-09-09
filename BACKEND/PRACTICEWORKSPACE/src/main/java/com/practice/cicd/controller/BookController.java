package com.practice.cicd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.practice.cicd.model.Book;
import com.practice.cicd.service.BookService;

@RestController
@RequestMapping("/springbootbookapi")
@CrossOrigin("*")
public class BookController
{
	   @Autowired
	   private BookService service;
	   
	   @GetMapping("/")
	   public String home() 
	   {
		   return "Book Demo";
	   }
	   
	   @GetMapping("/viewall")
	   public List<Book> viewallbooks()
	   {
		   return service.viewallbooks();
	   }
	   
	   @PostMapping("/add")
	   public String addbook(@RequestBody Book b)
	   {
		   return service.addbook(b);
	   }
	   
	   @PutMapping("/update")
	   public String updatebook(@RequestBody Book b)
	   {
		   return service.updatebook(b);
	   }
	   
	   @DeleteMapping("/delete/{bid}")
	   public String deletebook(@PathVariable int bid)
	   {
		   return service.deletebook(bid);
	   }
	   
	   @GetMapping("/display")
	   public ResponseEntity<?> displaybookbyid(@RequestParam int bid)
	   {
		   
		  Book b = service.viewbookbyid(bid);
		  
		  if(b!=null)
		  {
			  return ResponseEntity.ok(b);
		  }
		  else
		  {
			  return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Book ID Not Found");
		  }
	   }

}
