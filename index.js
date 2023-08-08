function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;

}

function UI() {
    UI.prototype.addToList= function(book) {
        const list = document.getElementById("book-list");
        let row = document.createElement("tr");
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X<a></td>
        `;
        list.appendChild(row);

    }

    UI.prototype.showAlert = function(message, className) {
        const div = document.createElement("div");
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container");
        const form = document.getElementById("book-form");
        container.insertBefore(div, form);

        setTimeout(function() {
            document.querySelector(".alert").remove()
        }, 3000)

    }

    UI.prototype.delete = function(target) {
        if(target.className === "delete") {
            target.parentElement.parentElement.remove();
        }
    }

    
    UI.prototype.clearField = function () {
        document.getElementById("title").value = "";
        document.getElementById('author').value = "";
        document.getElementById("isbn").value = "";
    }
    
}

const btn = document.querySelector("form");
btn.addEventListener("submit", function(e) {
    const title = document.getElementById("title").value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById("isbn").value;

    const book = new Book(title, author, isbn);

    const ui = new UI();
    if(title == "" || author == "" || isbn == "") {
        ui.showAlert("Fill in all the inputs", "error");
    }
    else {
        ui.addToList(book)

        ui.clearField();
        ui.showAlert("Book Added", "success")
    }

    
    
e.preventDefault();
})
document.getElementById("book-list").addEventListener("click", function(e) {
    const ui = new UI();
    ui.delete(e.target);
    ui.showAlert("Deleted", "success");
    e.preventDefault();
});