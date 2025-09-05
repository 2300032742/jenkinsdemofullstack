package com.practice.cicd.service;

import java.util.List;

import com.practice.cicd.model.Book;

public interface BookService
{
	public String addbook(Book b);
	public String updatebook(Book b);
	public String deletebook(int bid);
	public List<Book> viewallbooks();
	public Book viewbookbyid(int bid);

}
