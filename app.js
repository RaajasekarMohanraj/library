
var oDialog = null;
var isEditMode = false;
var subArray = [];
var noDataDiv = null;
function MyViewModel() {
    let self = this;

    self.title = ko.observable("");
    self.author = ko.observable("");
    self.pages = ko.observable(null);
    self.isRead = ko.observable(null);

    self.bookList = [/* new Book({
        author: "Raajasekar",
        title: "Book title",
        pages: 500,
        isRead: true,
    }) */];

    self.removeBook = function(index, a, b) {
        onRemoveBook(index);
    }

    self.books = ko.observableArray([...self.bookList]);

}
function Book(details){
    this.title = details.title;
    this.author = details.author;
    this.pages = details.pages;
    this.isRead = details.isRead;
}
function onAdd(){
    document.getElementsByClassName('book-grid')[0].appendChild(oDialog);
    oDialog.show();
}
function onSubmit(){
    // let details = {}; //Get details from the form...
    let newBook = new Book({title: oModel.title(), author: oModel.author(), pages: oModel.pages(), isRead: oModel.isRead() });
    oModel.books.push(newBook);
    oDialog.close();
    oModel.title(null);
    oModel.author(null);
    oModel.pages(null);
    oModel.isRead(null);
    displayNoItems();
    document.getElementsByClassName('book-grid')[0].removeChild(oDialog);
}
function onCancel(){
    displayNoItems();
    oDialog.close();
    document.getElementsByClassName('book-grid')[0].removeChild(oDialog);
}
function generateForm(){
    let oDialogNode = document.createElement("dialog");
    oDialogNode.setAttribute("class", "book-detail-dialog")
    let oForm = document.createElement("form");
    oDialogNode.appendChild(oForm);

    let oFieldSet = document.createElement("fieldset");
    oFieldSet.setAttribute("class", "form-fieldset");
    oForm.appendChild(oFieldSet);
    
    let oBookTitleDiv = document.createElement("div");
    let oLabel1 = document.createElement("label");
    oLabel1.textContent = "Book Title: "
    let oInput1 = document.createElement("input");
    oInput1.setAttribute("placeholder", "Crime and Punishment");
    oInput1.setAttribute("data-bind", "value: title");

    oBookTitleDiv.appendChild(oLabel1);
    oBookTitleDiv.appendChild(document.createElement("br"));
    oBookTitleDiv.appendChild(oInput1);    
    oFieldSet.appendChild(oBookTitleDiv);

    let oAuthorName = document.createElement("div");
    let oLabel2 = document.createElement("label");
    oLabel2.textContent = "Author: "
    let oInput2 = document.createElement("input");
    oInput2.setAttribute("placeholder", "Fyodor Dostoevsky");
    oInput2.setAttribute("data-bind", "value: author");
    oAuthorName.appendChild(oLabel2);
    oAuthorName.appendChild(document.createElement("br"));

    oAuthorName.appendChild(oInput2);
    oFieldSet.appendChild(oAuthorName);

    let oPagesDiv = document.createElement("div");
    let oLabel3 = document.createElement("label");
    oLabel3.textContent = "Total number of pages: "
    let oInput3 = document.createElement("input");
    oInput3.setAttribute("placeholder", "450");
    oInput3.setAttribute("type", "number");
    oInput3.setAttribute("data-bind", "value: pages");
    oPagesDiv.appendChild(oLabel3);
    oPagesDiv.appendChild(document.createElement("br"));
    oPagesDiv.appendChild(oInput3);
    oFieldSet.appendChild(oPagesDiv);


    let oDiv = document.createElement('div');
    let oSelect = document.createElement("select");
    oSelect.setAttribute("data-bind", "value: isRead")
    oSelect.setAttribute("class","status-selector")
    let option1 = document.createElement("option");
    option1.setAttribute("value", "Read");
    option1.textContent = "Read";
    let option2 = document.createElement("option");
    option2.setAttribute("value", "Not Read");
    option2.textContent = "Not Read";
    oSelect.appendChild(option1);
    oSelect.appendChild(option2);
    
    oDiv.appendChild(document.createElement("br"));
    let oLabel4 = document.createElement("label");
    oLabel4.textContent = "Status: "
    oDiv.appendChild(oLabel4);
    oDiv.appendChild(oSelect);

    oFieldSet.appendChild(oDiv);

    let oSubmit = document.createElement("button");
    oSubmit.setAttribute("onclick", "onSubmit()");
    oSubmit.textContent = "Submit";

    let oCancel = document.createElement("button");
    oCancel.setAttribute("onclick", "onCancel()");
    oCancel.textContent = "Cancel";

    oDialogNode.appendChild(oSubmit);
    oDialogNode.appendChild(oCancel);

    // <img class="planet-image-sun" src="./Images/—Pngtree—sun png vector realistic illustration_8091344.png" alt="">
    // let oImage = document.createElement("img");
    // oImage.setAttribute("class", "planet-image-sun");
    // oImage.setAttribute("src", "./Images/—Pngtree—sun png vector realistic illustration_8091344.png");
    // oDialogNode.appendChild(oImage);


    oDialog = oDialogNode;
    ko.applyBindings(oModel, oDialog);


}
function onRemoveBook(index) {
    oModel.books.splice(index, 1);
}
function onEdit() {
    isEditMode = true;
    subArray = oModel.books().map(a => a);
    switchButtons();
}
function onSave(){
    isEditMode = false;
    switchButtons();
    displayNoItems();
}
function onCancelEditted(){
    isEditMode = false;
    oModel.books(subArray);
    switchButtons();
    displayNoItems();
}
function switchButtons(){
    if(isEditMode) {
        document.getElementById("new-btn").style.display = "inline-block";
        document.getElementById("cancel-btn").style.display = "inline-block";
        document.getElementById("save-btn").style.display = "inline-block";
        document.getElementById("edit-btn").style.display = "none";
        Array.from(document.getElementsByClassName("status-selector")).forEach(element => {
            element.removeAttribute("disabled");
        })
        
    } else{
        document.getElementById("new-btn").style.display = "none";
        document.getElementById("cancel-btn").style.display = "none";
        document.getElementById("save-btn").style.display = "none";
        document.getElementById("edit-btn").style.display = "inline-block";
        Array.from(document.getElementsByClassName("status-selector")).forEach(element => {
            element.setAttribute("disabled", "");
        })
    }
    Array.from(document.getElementsByClassName("remove-book")).forEach(element => {
        element.classList.toggle("remove-book-no-display");
    });
}
function displayNoItems() {
    if(oModel.books().length == 0) {
        document.getElementsByClassName('book-grid')[0].appendChild(getNoDataItem());
    } else{
        document.getElementById("no-data").remove();
    }
}

function getNoDataItem() {
    if(noDataDiv) return noDataDiv;

    let oDiv = document.createElement("div");
    oDiv.setAttribute("id", "no-data");
    let oText = document.createElement("h1");
    oText.setAttribute("id", "no-data-text");
    oText.textContent = "No item available!";
    oDiv.appendChild(oText);
    noDataDiv = oDiv;
    return oDiv;
}



var oModel = new MyViewModel();
ko.applyBindings(oModel);
generateForm();
switchButtons();
displayNoItems();