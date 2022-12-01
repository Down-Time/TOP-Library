let myLibrary=[];


function Book(title, author, pages, read){
    this.TITLE=title
    this.AUTHOR=author
    this.PAGES=pages
    this.READ=read
    this.index=myLibrary.length
}
/*add book to array*/
function addBookToLibrary(title, author, pages, read){
    let book=new Book(title, author, pages, read)
    myLibrary.push(book)
    /*new use of div for book*/
    addBookToPage(book)
}

// delet book from library
function deleteBookFromLibrary(index){
    myLibrary.splice(index,1);
    for (let i =index; i<myLibrary.length;i++){
        myLibrary[i].index=i;
    }
}

//THIS IS NOT USED, IS semi functional but is for a table view
/*table creation function*/
function addBooksToPage(){
    let table=document.querySelector('table');
    let data=Object.keys(myLibrary[0]);
    generateTable(table, myLibrary);
    generateTableHead(table, data);      
}

function addBookToPage(book){

    let library=document.querySelector('.library');
    const bookDiv=document.createElement("div");
    bookDiv.id=book.index;
    bookDiv.className='bookCard new-box';
    const bookTitle=document.createElement('h4');
    bookTitle.innerText=book.TITLE;
    const bookAuthor=document.createElement('p');
    bookAuthor.innerText=`by ${book.AUTHOR}`
    const bookPages=document.createElement('p');
    bookPages.innerText=`${book.PAGES} pages`;
    const bookRead=document.createElement('input');
    bookRead.type='checkbox';
    bookRead.id=book.index;
    bookRead.checked=book.READ;
    bookRead.addEventListener('change', updateReadStatus);
    const label=document.createElement('label');
    label.htmlFor=book.index;
    label.appendChild(document.createTextNode('Read? '));
    const imgDelete=document.createElement('img');
    imgDelete.src="delete_img.svg";
    imgDelete.alt="Delete Image";
    imgDelete.id=book.index;
    imgDelete.addEventListener('click', deleteBook);

    bookDiv.appendChild(bookTitle);
    bookDiv.appendChild(bookAuthor);
    bookDiv.appendChild(bookPages);
    label.appendChild(bookRead);
    bookDiv.appendChild(label);
    bookDiv.appendChild(imgDelete);
    library.appendChild(bookDiv);
    
}
//THIS IS NOT USED, IS semi functional but is for a table view
function generateTableHead(table, data){
    let thead=table.createTHead();
    let row=thead.insertRow();
    for (let key of data){
        let th=document.createElement('th');
        let text=document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}
//THIS IS NOT USED, IS semi functional but is for a table view
function generateTable(table, data){
    for (let element of data){
        let row=table.insertRow();
        for (key in element){
            let cell=row.insertCell();
            let text=document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

document.querySelector('.form-container').addEventListener('submit', function(evt){
    evt.preventDefault();
    addBookToLibrary(document.getElementById('frtitle').value, document.getElementById('frauthor').value, document.getElementById('frpages').value, document.getElementById('frread').checked );
    document.getElementById("form-container").reset();
    closeForm();
  });


function updateReadStatus(e){
    myLibrary[e.target.id].READ=e.target.checked;
    
}

function deleteBook(e){
    
    deleteBookFromLibrary(e.target.id);

    const books=document.getElementsByClassName('bookCard');
    while (books.length>0){
        books[0].remove();
    }

    for (let i =0; i<myLibrary.length;i++){
        addBookToPage(myLibrary[i]);
    }
}


addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 304,false);
addBookToLibrary("Project Hail Mary", "Andy Weir", 496,true);
/*old test call to add books to table*/
// addBooksToPage();
