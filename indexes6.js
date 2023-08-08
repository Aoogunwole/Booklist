class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}



class Store {
    static getBook () {
        let books;
        if(localStorage.getItem("books") === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }
    static displayBook() {
        const books = Store.getBook();
        books.forEach(function(book) {
            const ui = new UI();
            ui.addToList(book);
        })
    }
    static addBook(book) {
        const books = Store.getBook();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));

    }
    static removeBook(isbn) {
        const books = Store.getBook();
        books.forEach(function(book, index) {
            if (book.isbn == isbn) {
                books.splice(index, 1);
            }
        })
        localStorage.setItem("books", JSON.stringify(books));
    }
}




class UI {
    addToList(book) {
        const list = document.getElementById("book-list");
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X<a></td>
        `;
        list.appendChild(row);
        
    }
    clearField() {
        document.getElementById('title').value = "";
        document.getElementById('author').value = "";
        document.getElementById('isbn').value = "";
    }
    showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        
        setTimeout(function () {
            document.querySelector(".alert").remove() 
        }, 3000);

    }
    delete(e) {
        if(e.className == "delete") {
            e.parentElement.parentElement.remove();
        }
    }

}



document.addEventListener("DOMContentLoaded", Store.displayBook);
document.getElementById('book-form').addEventListener("submit", function(e) {

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    const book = new Book(title, author, isbn);
    // console.log(book);

    const ui = new UI();
    if (title == "" || author == "" || isbn == "") {
        // ui.showAlert("Fill the form", "error");
        ui.showAlert('Please fill in all fields', 'error');
    }
    else {
        ui.addToList(book);
        Store.addBook(book);


        ui.clearField();
        ui.showAlert('Added', 'success');
    }

    


    e.preventDefault();
})

document.getElementById("book-list").addEventListener("click", function(e) {
    const ui = new UI();
    ui.delete(e.target);

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    ui.showAlert("Book removed", "success")
})