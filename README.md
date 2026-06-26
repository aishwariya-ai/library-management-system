# Library Management System API

A RESTful Library Management System API built using **AdonisJS v5**, **TypeScript**, and **PostgreSQL**. 
This project provides functionalities for managing authors, books, and library members with secure authentication and authorization mechanisms.


## Features

### Authentication & Authorization

* User Registration
* User Login
* JWT-based Authentication
* Role-based Authorization
* Librarian-only access for protected operations

### Author Management

* Create Author
* View All Authors
* View Author by ID
* Update Author
* Delete Author

### Book Management

* Create Book
* View All Books
* View Book by ID
* Update Book
* Delete Book

### Member Management

* View All Members
* View Member by ID
* Update Member
* Delete Member
* Member registration through Authentication API

### Validation

* Request validation using AdonisJS Validators
* Field validations for all resources
* Enum validations
* Unique field validations

### Middleware

* JWT Authentication Middleware
* Librarian Authorization Middleware
* Request Logger Middleware

### Hooks

* Automatic password hashing using Model Hooks

### Exception Handling

* Global Exception Handling
* Resource not found handling
* JWT error handling


#  Tech Stack

## Backend

* AdonisJS v5
* TypeScript
* Node.js

## Database

* PostgreSQL

## ORM

* Lucid ORM

## Authentication

* JSON Web Token (JWT)

## Password Hashing

* Adonis Hash Provider

## API Testing

* Thunder Client

## Version Control

* Git
* GitHub


#  Project Structure

app/
├── Controllers/
├── Middleware/
├── Models/
├── Validators/
├── Exceptions/

config/
database/
start/


#Database Schema

## Authors Table

| Column     | Type      |
| ---------- | --------- |
| id         | Integer   |
| name       | String    |
| country    | String    |
| email      | String    |
| created_at | Timestamp |
| updated_at | Timestamp |



## Books Table

| Column         | Type                  |
| -------------- | --------------------- |
| id             | Integer               |
| title          | String                |
| quantity       | Integer               |
| genre          | String                |
| price          | Float                 |
| publisher      | String                |
| isbn           | String                |
| published_year | Integer               |
| author_id      | Integer (Foreign Key) |
| created_at     | Timestamp             |
| updated_at     | Timestamp             |



## Members Table

| Column          | Type      |
| --------------- | --------- |
| id              | Integer   |
| name            | String    |
| email           | String    |
| phone           | String    |
| membership_type | String    |
| password        | String    |
| role            | String    |
| created_at      | Timestamp |
| updated_at      | Timestamp |


# Database Relationships

## One-to-Many Relationship

### Author → Books

* One Author can write many Books.
* One Book belongs to one Author.


### Relationship Methods
#### Author Model

@hasMany(() => Book)
public books: HasMany<typeof Book>

#### Book Model

@belongsTo(() => Author)
public author: BelongsTo<typeof Author>

# Authentication Flow

## Register
POST /register
Registers a new member or librarian.

## Login
POST /login
Returns a JWT token upon successful login.


# Roles

## Member
Can:
* Login
* View resources

## Librarian
Can:

* Create Authors
* Update Authors
* Delete Authors
* Create Books
* Update Books
* Delete Books

# API Endpoints

## Authentication

| Method | Endpoint  |
| ------ | --------- |
| POST   | /register |
| POST   | /login    |



## Authors

| Method | Endpoint     |
| ------ | ------------ |
| POST   | /authors     |
| GET    | /authors     |
| GET    | /authors/:id |
| PUT    | /authors/:id |
| DELETE | /authors/:id |



## Books

| Method | Endpoint   |
| ------ | ---------- |
| POST   | /books     |
| GET    | /books     |
| GET    | /books/:id |
| PUT    | /books/:id |
| DELETE | /books/:id |



## Members

| Method | Endpoint     |
| ------ | ------------ |
| GET    | /members     |
| GET    | /members/:id |
| PUT    | /members/:id |
| DELETE | /members/:id |




