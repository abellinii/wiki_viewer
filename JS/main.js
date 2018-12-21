$(document).ready(function() {
  console.log('we in')
  var searchTerm = "";
  var page = [];
  var wiki = "https://en.wikipedia.org/wiki/";
  var url = "";
  var urlLink = "";
  var wikiPage = [];

  //Hide once page is loaded
  $("#results").hide();

  //call JSON with the search term
  function ajax() {
    $.getJSON(url, function(data) {

      //get a list of the page ID's to use
      wikiPage = Array.from(data.query.pageids);
 console.log(data)
      //Iterate through the wiki data and if it contains the field add to the new block div, if not not continue to the next field
      for (var i = 0; i < 9; i++) {
        $("#addedResults").append(
          "<div class =' block' id = 'block" + i + "'" + ">" + "</div>" + "<br>"
        );

        var result = "#block" + i;
        var text = "#" + result + "text";
        var image = "#" + result + "image";

        $(result).append(
          "<h1 class='title'>" + data["query"]["pages"][wikiPage[i]]["title"] + "</h1>"
        );

        if (data["query"]["pages"][wikiPage[i]]["description"] != undefined)
          $(result).append(
            "<p class='description'>" + data["query"]["pages"][wikiPage[i]]["description"] + "</p>"
          );

        if (data["query"]["pages"][wikiPage[i]]["extract"] != undefined) {
          $(result).append(
              data["query"]["pages"][wikiPage[i]]["extract"] 
          );
        }

        // page.push(wiki + data["query"]["pages"][wikiPage[i]]["title"]);
      }
    });
  }

  //When a term is typed, grab value and add it to the url for the API call and call Ajax function.
  $("#btn").on("click", function() {
    searchTerm = $("#search").val();
    url =
      "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cdescription%7Cextracts&indexpageids=1&pageids=10&generator=search&piprop=thumbnail%7Cname&exsentences=1&exintro=1&excontinue=2&gsrsearch=" +
      searchTerm +
      "&callback=?";

    //Hide the form inputs and show the recieved API data.
    $("#search").val("");
    ajax();
   $("#form").hide('slow');
    $("#results").show('slow');
    
    
  });

  $(".closebutton").on("hover", function() {
    $(this).css("cursor", "pointer");
  });

  //On close empty results and show form ready for the next input.
  $(".closebutton").on("click", function() {
    $("#form").show();
    $("#results").hide();
    $("#addedResults").empty();
  });

  //If a result is clinked forward me o the wikipedia page.
  $("#results").on("click", ".block", function() {
    urlLink = page[this.id.toString().substring(5)];
    window.open(urlLink);
  });

  //When a result is clicked determine its ID
  $("#container").on("click", ".added_element", function() {
    var id = $(this).attr("id");
    alert(id);
  });

  //If random button is clicked open a random wiki article.
  $("#randombtn").on("click", function() {
    window.open("https://en.wikipedia.org/wiki/Special:Random");
  });


$('#randombtn').hover(function(){
  $('#randombtn').css('background-color','red')
  $('.fa-random').css('color','#e2e2e2')
},function(){
  $('#randombtn').css('background-color','#ec7063')
  $('.fa-random').css('color','white')
})

$('#btn').hover(function(){
  $('#btn').css('background-color','#010101')
  $('.fa-arrow-circle-right').css('color','#e2e2e2')
  
}, function(){
  $('#btn').css('background-color','#494949')
  $('.fa-arrow-circle-right').css('color','white')
})



$(window).resize(function(){
 if($(window).width()<800){
  console.log('should be done')
  $('i').removeClass('fa-2x');
 }else if($(window).width()>800){
  console.log('should be done')
  $('i').addClass('fa-2x');
 }



});
});