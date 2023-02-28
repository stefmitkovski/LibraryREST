# LibraryREST

A digital library that can be access through a API and offers basic CRUD operations

## Intructions and paths
------------------------------------------------------------------------------------------
To be able to use the API you first need to register or if you already have an account to login to the API using the instruction below.

```
// Login 
// Required parameters: email and password 

POST /api/users/login

// Register a new user
// Required parameters: name,email and password

POST /api/users/register

// Logout

DELETE /api/users/logout
```
------------------------------------------------------------------------------------------

When you successfully manage to login or register an account you will be given a bearer token with you can use to access the following functions 

```
// Get all the available books

GET /api/books

// Create a book
// Required parameters: title, author and pages

POST /api/books/create

// Borrow a book 

POST /api/books/lend/:id

// Return a book 

PUT /api/books/:id

// Delete a book

DELETE /api/books/:id

// Return only my books 

GET /api/users/me
```