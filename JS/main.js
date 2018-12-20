$(document).ready(function() {
  var urlLink = "";
  var url = "";
  var url2 = "";
  page = [];
  var k = 0;
  var kblock = "";
  var json = {};
  var lastChannel="";
 
  
    var twitch = {
    width: 0,
    height: 0,
    channel: ""
  };



  var resizeTimer;

$(window).on('resize', function(e) {

  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {

    
 
 if(window.innerWidth <600){
 twitch.width = window.innerWidth ;
   twitch.height= window.innerHeight  ;
}else{
    twitch.width = window.innerWidth * 0.77;
    twitch.height= window.innerHeight * 0.77 ;
}

$('#linked-page').empty();
openTwitch(); 
  }, 250);

});




  //List of Twitch accounts to pull data from.
  var twitchAccounts = [
    "ESL_SC2",
    "OgamingSC2",
    "cretetion",
    "freecodecamp",
    "storbeck",
    "habathcx",
    "RobotCaleb",
    "noobs2ninjas"
  ];
  //Iterate through twitch accounts and create a url to get image/name and a url to check the streaming status.
  twitchAccounts.forEach(function(account) {
    
    //image/name url.
    url =
      "https://wind-bow.gomix.me/twitch-api/channels/" +
      account +
      "?callback=?";

    //Streaming url.
    url2 = "https://wind-bow.glitch.me/twitch-api/streams/" + account;

    // object to manipulate the data
    var json = {
      //JSON call to find out if the channel is currently streaming.
      addProp: $.getJSON(url2, function(data) {}),

      //JSON call to create html content and append it to page.
      buildBlock: $.getJSON(url, function(data) {
        console.log();
        // Create a div containing the channel info.
        $("#blocks").append(
          '<div class ="block" id ="block' +
            k +
            '"><img class="image" src=' +
            data.logo +
            ' >' +
            '<p class="name">' +
            data.name.toUpperCase() +
            "</p></div><br>"
        );

        //Make stream data an object and check. Color accordinly, red= offline, Green= online.
        var myObj = JSON.parse(json.addProp.responseText);
        console.log(kblock);
        kblock = "#block" + k;
        if (myObj.stream === null) {
          $(kblock).css("background-color", "#6441a5");
          $(kblock).addClass("offline");
        } else {
          $(kblock).css("background-color", "#82a541");
          $(kblock).addClass("online");
        }
        // Keep track of the channel ID for manipulation.
        k++;
        kblock = "#block" + k;

        page.push(data.url);
      })
    };
  });

  //Open stream once channel is clicked
  $("#content").on("click", ".block", function() {
    urlLink = page[this.id.toString().substring(5)];
    //window.open(urlLink)
    var a = "#" + this.id;
   $('#linked-page').empty();
    twitch.channel = urlLink.substring(22);
    lastChannel = twitch.channel;
     if(window.innerWidth <600){
 twitch.width = window.innerWidth ;
   twitch.height= window.innerHeight  ;
}else{
    twitch.width = window.innerWidth * 0.77;
    twitch.height= window.innerHeight * 0.77 ;
}
    openTwitch();
    
    $(".block").css("margin-left", "3px");
    $(a).css("margin-left", "25px");
  });

  //When online buttons are clicked show the corresponding channels and color the button to show the current status
  $("#online").click(function() {
    $("#off").css("text-shadow", "none");
    $("#bo").css("text-shadow", "none");
    $(".online").show();
    $(".offline").hide();
    
    $(".block").css("margin-left", "3px");
    $("#on").css(
      "text-shadow",
      " 0 0 20px #82a54#82a541"
    );
  });

  $("#offline").click(function() {
    $("#on").css("text-shadow", "none");
    $("#bo").css("text-shadow", "none");
    $(".online").hide();
    $(".offline").show();
   
    $(".block").css("margin-left", "3px");
    $("#off").css(
      "text-shadow",
       " 0 0 20px #82a541, 0 0 20px #82a541"
    );
  });

  $("#both").click(function() {
    $("#off").css("text-shadow", "none");
    $("#on").css("text-shadow", "none");
    $(".online").show();
    $(".offline").show();
    
    $(".block").css("margin-left", "3px");
    $("#bo").css(
      "text-shadow",
       " 0 0 20px #82a541, 0 0 20px #82a541"
    );
  });

  //Twitch stream link
  function openTwitch() {
    new Twitch.Embed("linked-page", twitch);
  }
  
  $('#logo').click(function(){
    window.open('https://www.twitch.tv')
  })
});
