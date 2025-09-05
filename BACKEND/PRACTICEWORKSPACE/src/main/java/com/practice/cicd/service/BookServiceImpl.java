package com.practice.cicd.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.practice.cicd.model.Book;
import com.practice.cicd.repository.BookRepository;

@Service
public class BookServiceImpl implements BookService
{
		@Autowired
	   private BookRepository repository;
	   
		@Override
		public String addbook(Book b) 
		{
			repository.save(b);
			return "Book added successfully";
		}

		@Override
		public String updatebook(Book b) 
		{
			Optional<Book> object = repository.findById(b.getId());
			String msg = null;
				if(object.isPresent())
				{
					Book book = object.get();
					book.setName(b.getName());
					book.setAuthor(b.getAuthor());
					book.setEdition(b.getEdition());
				  
				  repository.save(book);
				  msg = "Book Updated Successfully";
				}
				else
				{
					msg = "Book Id Not Found To Update";
				}
				return msg;
	}

		@Override
		public String deletebook(int bid)
		{
		Optional<Book> object = repository.findById(bid);
		String msg = null;
			if(object.isPresent())
			{
				Book book = object.get();
				repository.delete(book);
				msg = "Book Deleted Successfully";
			}
			else
			{
				msg = "Book Id Not Found To Delete";
			}
			return msg;
		}

		@Override
		public List<Book> viewallbooks() 
		{
					return repository.findAll();
		}

		@Override
		public Book viewbookbyid(int bid)
		{
			return repository.findById(bid).orElse(null); 
		}

	

}
