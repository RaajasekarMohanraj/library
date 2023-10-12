onAddNewBook = function(oEvent) {  
    (document.getElementById("newBookDialog")).show();
}
onCloseDialog = function(){
    (document.getElementById("newBookDialog")).close();   
}


function Book(bookTitle, authorName, pages, isRead) {
    this.bookTitle = bookTitle;
    this.authorName = authorName;
    this.pageCount = pages;
    this.isRead = isRead;
}

var bookPool = [];


addToBookList = function(oBook) {
    let oDiv = document.createElement('div');
    let attr = document.createAttribute("class");
    attr.value = "card";
    oDiv.setAttributeNode(attr);
    oDiv.appendChild(document.createElement("h3").appendChild(document.createTextNode(oBook.bookTitle)))
    oDiv.appendChild(document.createElement("h5").appendChild(document.createTextNode(oBook.authorName)))
    oDiv.appendChild(document.createElement("h5").appendChild(document.createTextNode(oBook.pageCount)))

    document.getElementById("bookList").appendChild(oDiv);
}


onSubmitNewBook= function(){
    let oInputArray = Array.from(document.querySelectorAll("#newBookForm input"));
    let obj = oInputArray.reduce((p, i) =>{
        p[i.id] = i.value;
        return p;
    }, {})
    console.log(obj);
    let oBook = new Book(obj.bookName, obj.authorName, obj.pageNumber, obj, obj.isBookRead);
    bookPool.push(oBook);
    this.addToBookList(oBook);
    this.onCloseDialog();
}

