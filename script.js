const addButton = document.querySelector(".add-book");
const form = document.querySelector(".form");
const todolist = document.querySelector(".todo-list");


document.addEventListener('DOMContentLoaded', viewBooks);
document.addEventListener('DOMContentLoaded', author);
document.addEventListener('DOMContentLoaded', publisher);

addButton.addEventListener("click", addBook);
// deleted.addEventListener("click", viewBooks);


/// --- -------------------- add Newbook --------------------

function addBook(event) {

    let book = document.querySelector(".book");
    let author = document.querySelector(".author");
    let publisher = document.querySelector(".publisher");
    let date = document.querySelector(".date");
    if (book.value == "" || author.value == "" || publisher.value == "" || date.value == "") {
        alert(" you Missed something");
    }
    else {
        let data = {
            Name: book.value,
            author: author.value,
            publisher: publisher.value,
            date: date.value
        }
        saveLocallibrary(data);
        book.value = null;
        book.placeholder = "Book Name";
        author.value = null;
        author.placeholder = "Author Name";
        publisher.value = null;
        publisher.placeholder = "Publisher Name";
        date.value = null;
        date.placeholder = "yyyy-mm-dd";
    }

}

///            -------- save to local storage ----------

function saveLocallibrary(data) {
    let library;
    if (localStorage.getItem('library') === null) {
        library = [];
    } else {
        library = JSON.parse(localStorage.getItem('library'));
    }
    library.push(data);
    localStorage.setItem("library", JSON.stringify(library));
    alert("Book saved successfully");
}



// ---------------------- index view books ---------------


function viewBooks() {

    let library;
    if (localStorage.getItem('library') === null) {
        library = [];
    } else {
        library = JSON.parse(localStorage.getItem('library'));
    }

    let a = 1;

    library.forEach(function (x) {
        // console.log(x["author"]);

        const todoDiv = document.createElement('tr');
        todoDiv.classList.add("todo");

        const newTodo = document.createElement("td");
        newTodo.innerText = a;
        a++;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const newTodo1 = document.createElement("td");
        //newTodo1.innerText =x["Name"];
        newTodo1.classList.add("todo-item");
        const nameview = document.createElement("input");
        nameview.type = "text";
        nameview.readOnly = "true";
        nameview.value = x["Name"];
        newTodo1.appendChild(nameview);
        todoDiv.appendChild(newTodo1);

        const newTodo2 = document.createElement("td");
        // newTodo2.innerText =x["author"];
        newTodo2.classList.add("todo-item");

        const authorview = document.createElement("input");
        authorview.type = "text";
        authorview.readOnly = "true";
        authorview.value = x["author"];
        newTodo2.appendChild(authorview);

        todoDiv.appendChild(newTodo2);

        const newTodo3 = document.createElement("td");
        // newTodo3.innerText =x["publisher"];
        newTodo3.classList.add("todo-item");
        const publisherview = document.createElement("input");
        publisherview.type = "text";
        publisherview.readOnly = "true";
        publisherview.value = x["publisher"];
        newTodo3.appendChild(publisherview);
        todoDiv.appendChild(newTodo3);

        const newTodo4 = document.createElement("td");
        // newTodo4.innerText =x["date"];
        newTodo4.classList.add("todo-item");
        const dateview = document.createElement("input");
        dateview.type = "text";
        dateview.readOnly = "true";
        dateview.value = x["date"];
        newTodo4.appendChild(dateview);
        todoDiv.appendChild(newTodo4);


        const newTodo5 = document.createElement("td");

        const bookDelete = document.createElement('button');
        bookDelete.innerText = "Delete";
        bookDelete.classList.add("delete");

 /*  -------------------Delete Book --------------------- */

        bookDelete.addEventListener("click", function (e) {
            const item = e.target;
            const todo = item.parentElement;
            const todo1 = todo.parentElement;
            const todoIndex = todo1.children[0].innerText;
            let library;
            if (localStorage.getItem('library') === null) {
                library = [];
            } else {
                library = JSON.parse(localStorage.getItem('library'));
            }
            library.splice((todoIndex - 1), 1);
            console.log(library);
            localStorage.setItem('library', JSON.stringify(library));
            todo1.remove();



        });

        newTodo5.appendChild(bookDelete);

        const Update = document.createElement('button');
        Update.innerText = "Update";
        Update.classList.add("update");




        /*------------------- update book-----------------*/

        Update.addEventListener("click", function (e) {
            const item = e.target;
            const todo = item.parentElement;
            const todo1 = todo.parentElement;

            if (todo1.id != "editable") {
                todo1.id = "editable";
                bookDelete.style.display = "none";
                Update.style.display = "none";
                nameview.readOnly = 0;
                authorview.readOnly = 0;
                publisherview.readOnly = 0;
                dateview.readOnly = 0;


                const Updatenow = document.createElement('button');
                Updatenow.innerText = "Update Now";
                newTodo5.appendChild(Updatenow);
                Updatenow.addEventListener("click", function () {

                    const todoIndex = todo1.children[0].innerText;
                    let library;
                    if (localStorage.getItem('library') === null) {
                        library = [];
                    } else {
                        library = JSON.parse(localStorage.getItem('library'));
                    }

                    library[todoIndex - 1]["Name"] = nameview.value;
                    library[todoIndex - 1]["author"] = authorview.value;
                    library[todoIndex - 1]["publisher"] = publisherview.value;
                    library[todoIndex - 1]["date"] = dateview.value;

                    console.log(library);
                    localStorage.setItem('library', JSON.stringify(library));

                    todo1.id = "noteditable";
                    bookDelete.style.display = "inline";
                    Update.style.display = "inline";
                    Updatenow.style.display = "none";
                    cancelnow.style.display = "none";
                });

                const cancelnow = document.createElement('button');
                cancelnow.innerText = "Cancel";

                cancelnow.addEventListener("click", function () {
                    todo1.id = "noteditable";
                    bookDelete.style.display = "inline";
                    Update.style.display = "inline";
                    Updatenow.style.display = "none";
                    cancelnow.style.display = "none";
                });


                newTodo5.appendChild(cancelnow);



            } else if (todo1.id === 'editable') {
                todo1.id = "noteditable";

            }


        });
        newTodo5.appendChild(Update);
        todoDiv.appendChild(newTodo5);

        todolist.appendChild(todoDiv);
    });
}





/*   -------------- author ------------------------*/

function author() {

    let library;
    if (localStorage.getItem('library') === null) {
        library = [];
    } else {
        library = JSON.parse(localStorage.getItem('library'));
    }
    // console.log(library);

    var counts = library.reduce((m, c) => {
        if (c.author in m) m[c.author].count += 1;
        else m[c.author] = { author: c.author, count: 1 };
        return m;
    }, {});

    let authorArray = Object.values(counts).sort((a, b) => b.count - a.count);

    // console.log(authorArray);
    const aTable = document.querySelector(".a-table");

    authorArray.forEach(function (x) {
        const trow = document.createElement('tr');
        trow.classList.add("p-row");

        const newTodo = document.createElement("td");
        newTodo.innerText = x["author"];
        newTodo.classList.add("todo-item");
        trow.appendChild(newTodo);
        const newTodo1 = document.createElement("td");
        newTodo1.innerText = x["count"];
        newTodo1.classList.add("todo-item");
        trow.appendChild(newTodo1);
        const newTodo2 = document.createElement("td");
        const pDelete = document.createElement('button');
        pDelete.innerText = "Delete";
        pDelete.classList.add("delete");
        pDelete.addEventListener("click", function (e) {
            const item = e.target;
            const todo = item.parentElement;
            const todo1 = todo.parentElement;
            const todoIndex = todo1.children[0].innerText;
            console.log(todoIndex);
            let library;
            if (localStorage.getItem('library') === null) {
                library = [];
            } else {
                library = JSON.parse(localStorage.getItem('library'));
            }
            let newLibrary = library.filter(x => { return x.author != todoIndex });
            localStorage.setItem('library', JSON.stringify(newLibrary));
            todo1.remove();

        });

        newTodo2.appendChild(pDelete);

        newTodo2.classList.add("todo-item");
        trow.appendChild(newTodo2);
        aTable.appendChild(trow);
    });

}




/*     ------------- Publisher --------*///////

function publisher() {

    let library;
    if (localStorage.getItem('library') === null) {
        library = [];
    } else {
        library = JSON.parse(localStorage.getItem('library'));
    }

    var counts = library.reduce((m, c) => {

        // console.log(c);
        if (c.publisher in m) m[c.publisher].count += 1;
        else m[c.publisher] = { publisher: c.publisher, count: 1 };
        return m;
    }, {});

    let publisherArray = Object.values(counts).sort((a, b) => b.count - a.count);

    // console.log(publisherArray);
    const pTable = document.querySelector(".p-table");

    publisherArray.forEach(function (x) {
        const trow = document.createElement('tr');
        trow.classList.add("p-row");

        const newTodo = document.createElement("td");
        newTodo.innerText = x["publisher"];
        newTodo.classList.add("todo-item");
        trow.appendChild(newTodo);
        const newTodo1 = document.createElement("td");
        newTodo1.innerText = x["count"];
        newTodo1.classList.add("todo-item");
        trow.appendChild(newTodo1);
        const newTodo2 = document.createElement("td");
        const pDelete = document.createElement('button');
        pDelete.innerText = "Delete";
        pDelete.classList.add("delete");
        pDelete.addEventListener("click", function (e) {
            const item = e.target;
            const todo = item.parentElement;
            const todo1 = todo.parentElement;
            const todoIndex = todo1.children[0].innerText;
            console.log(todoIndex);
            let library;
            if (localStorage.getItem('library') === null) {
                library = [];
            } else {
                library = JSON.parse(localStorage.getItem('library'));
            }
            let newLibrary = library.filter(x => { return x.publisher != todoIndex });
            localStorage.setItem('library', JSON.stringify(newLibrary));
            todo1.remove();

        });
        newTodo2.appendChild(pDelete);

        newTodo2.classList.add("todo-item");
        trow.appendChild(newTodo2);
        pTable.appendChild(trow);
    });
}

