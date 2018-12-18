$(document).ready(function() {
  var urlLink = "";
  var url = "";
  var url2 = "";
  page = [];
  var k = 0;
  var kblock = "";
  var json = {};

  var twitch = {
    width: 970,
    height: 650,
    channel: ""
  };
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
            ' height="50px" width="50px">' +
            '<p class="name">' +
            data.name.toUpperCase() +
            "</p></div><br>"
        );

        //Make stream data an object and check. Color accordinly, red= offline, Green= online.
        var myObj = JSON.parse(json.addProp.responseText);
        console.log(kblock);
        kblock = "#block" + k;
        if (myObj.stream === null) {
          $(kblock).css("background-color", "#E86C60");
          $(kblock).addClass("offline");
        } else {
          $(kblock).css("background-color", "#2ECC71");
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
    $("#linked-page").empty();
    twitch.channel = urlLink.substring(22);
    openTwitch();
    console.log(twitch.channel);
    $(".block").css("margin-left", "3px");
    $(a).css("margin-left", "25px");
  });

  //When online buttons are clicked show the corresponding channels and color the button to show the current status
  $("#online").click(function() {
    $("#off").css("text-shadow", "none");
    $("#bo").css("text-shadow", "none");
    $(".online").show();
    $(".offline").hide();
    $("#linked-page").empty();
    $(".block").css("margin-left", "3px");
    $("#on").css(
      "text-shadow",
      " 0 0 10px rgba(255,255,255,1) , 0 0 20px rgba(255,255,255,1) , 0 0 30px rgba(255,255,255,1) , 0 0 40px #00ffff , 0 0 70px #00ffff , 0 0 80px #00ffff , 0 0 100px #00ffff "
    );
  });

  $("#offline").click(function() {
    $("#on").css("text-shadow", "none");
    $("#bo").css("text-shadow", "none");
    $(".online").hide();
    $(".offline").show();
    $("#linked-page").empty();
    $(".block").css("margin-left", "3px");
    $("#off").css(
      "text-shadow",
      " 0 0 10px rgba(255,255,255,1) , 0 0 20px rgba(255,255,255,1) , 0 0 30px rgba(255,255,255,1) , 0 0 40px #00ffff , 0 0 70px #00ffff , 0 0 80px #00ffff , 0 0 100px #00ffff "
    );
  });

  $("#both").click(function() {
    $("#off").css("text-shadow", "none");
    $("#on").css("text-shadow", "none");
    $(".online").show();
    $(".offline").show();
    $("#linked-page").empty();
    $(".block").css("margin-left", "3px");
    $("#bo").css(
      "text-shadow",
      " 0 0 10px rgba(255,255,255,1) , 0 0 20px rgba(255,255,255,1) , 0 0 30px rgba(255,255,255,1) , 0 0 40px #00ffff , 0 0 70px #00ffff , 0 0 80px #00ffff , 0 0 100px #00ffff "
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
