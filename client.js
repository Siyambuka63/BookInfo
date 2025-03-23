const API_URL = "http://localhost:3000";
const tableBody = document.getElementById("table-body");

// 🔹 Add book
function addBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const price = document.getElementById("price").value;

    fetch(`${API_URL}/addBook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, price })
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            getBooks();
        })
        .catch(error => console.error("Error:", error));
}

// 🔹 Get all books
function getBooks() {
    tableBody.innerHTML = "";

    fetch(`${API_URL}/getBooks`)
        .then(response => response.json())
        .then(books => {
            books.forEach(book => {
                let row = `<tr>
                            <td>${book.title}</td>
                            <td>${book.author}</td>
                            <td>${book.price}</td>
                        </tr>`;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error("Error:", error));
}

// 🔹 Delete book
function deleteBook() {
    const title = document.getElementById("title").value;

    fetch(`${API_URL}/deleteBook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        getBooks();
    })
    .catch(error => console.error("Error:", error));
}

// 🔹 Update book
function updateBook() {
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;

    fetch(`${API_URL}/updateBook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price, title })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        getBooks();
    })
    .catch(error => console.error("Error:", error));
}

// Load books on page load
getBooks();