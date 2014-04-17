$(document).ready(function(){ 
    $.CRUD.path = "api";
    var Book = new $.CRUD("book");

    Book.addEvent('on-show-load', function () {
        showSingleContentArea();
    });
    Book.addEvent('on-add-load', function () {
        showSingleContentArea();
    });
    Book.addEvent('on-edit-load', function () {
        showSingleContentArea();
    });
    


    Book.addEvent('on-list-load', function () {
        hideSingleContentArea();
    });
  


    Book.list();


    function showSingleContentArea() {

        $("#single-content-area").slideDown(500);
    }

    function hideSingleContentArea() {
        $("#single-content-area").slideUp(500);
    }





}); 