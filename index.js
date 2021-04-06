"use strict";

(function() {
    /**
     * Constructor of Book
     */
    const Book = function(name, author, publishedDate, isbn) {
        this.name = name;
        this.author = author;
        this.publishedDate = publishedDate;
        this.isbn = isbn;
    }

    /**
     * Constructor of UI
     */
    const UI = function() {

    }

    UI.prototype.displayBooks = function() {
        const books = store.getBooks()

        books.forEach(book => this.addBookToList(book))
    }

    UI.prototype.addBookToList = function(book) {
        /**
         * Create a row
         */
        const row = document.createElement("tr");

        /**
         * Create and append Name
         */
        const nameCol = document.createElement("td");
        nameCol.textContent = book.name;
        row.appendChild(nameCol);
        
        /**
         * Create and append Author
         */
        const authorCol = document.createElement("td");
        authorCol.textContent = book.author;
        row.appendChild(authorCol)
        
        /**
         * Create and append Published date
         */
        const publishedDateCol = document.createElement("td");
        publishedDateCol.textContent = book.publishedDate;
        row.appendChild(publishedDateCol);
        
        /**
         * Create and append ISBN
         */
        const isbnCol = document.createElement("td");
        isbnCol.textContent = book.isbn;
        row.appendChild(isbnCol);
        
        /**
         * Append Book Row
         */
        document.querySelector(".book-list").appendChild(row);
    }

    UI.prototype.clearFields = function() {
        document.querySelector("#bookName").value = '';
        document.querySelector("#author").value = '';
        document.querySelector("#publishedDate").value = '';
        document.querySelector("#isbn").value = '';
    }

    /**
     * Constructor of Store
     */
    const Store = function() {

    }

    Store.prototype.getBooks = function() {
        let books;
        if(!localStorage.getItem("books")) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"))
        }

        return books;
    }

    Store.prototype.addBookToStore = function(book) {
        const books = this.getBooks();
        books.push(book);
        
        localStorage.setItem("books", JSON.stringify(books))
    }

    /**
     * Add a book
     */
    document.querySelector(".form").addEventListener("submit", (evt) => {
        evt.preventDefault();

        /**
         * Get form values
         */
        const bookName = document.querySelector("#bookName").value;
        const author = document.querySelector("#author").value;
        const publishedDate = document.querySelector("#publishedDate").value;
        const isbn = document.querySelector("#isbn").value;

        /**
         * Check validation
         */
        if(bookName === '' || author === '' || publishedDate === '' || isbn === '') {
            alert("Please fill all of the fields!")
            return;
        }

        /**
         * Instatiate Book
         */
        const book = new Book(bookName, author, publishedDate, isbn);

        /**
         * Add Book to UI
         */
        ui.addBookToList(book);

        /**
         * Add Book to Store
         */
        store.addBookToStore(book);
       
        /**
         * Clear input fields
         */
        ui.clearFields();

         /**
         * Hide Modal
         */
        const modal = document.querySelector("#addBookModal");
        modal.classList.remove("show", "modal-zIndex")
        modal.style.display = "none";
        modal.style.paddingRight = "0px";
        
        document.querySelector(".modal-backdrop").classList.remove("show", "fade", "modal-backdrop");
    })

     /**
     * Create an instance of UI
     */

    const ui = new UI();

    /**
     * Create an instance of Store
     */
    let store = new Store();

    /**
     * Display Books
     */
    document.addEventListener("DOMContentLoaded", ui.displayBooks())
})()