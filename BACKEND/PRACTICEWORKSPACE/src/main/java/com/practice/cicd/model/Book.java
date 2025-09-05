package com.practice.cicd.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="book_table")
public class Book
{
		@Id
		@Column(name = "bid")
		private int id;
		@Column(name = "bname",length = 50,nullable = false)
		private String name;
		@Column(name = "bauthor",length=10,nullable = false)
		private String author;
		@Column(name = "bedition",length =20,nullable = false)
		private String edition;
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getAuthor() {
			return author;
		}
		public void setAuthor(String author) {
			this.author = author;
		}
		public String getEdition() {
			return edition;
		}
		public void setEdition(String edition) {
			this.edition = edition;
		}
		@Override
		public String toString() {
			return "BookController [id=" + id + ", name=" + name + ", author=" + author + ", edition=" + edition + "]";
		}
		

}
