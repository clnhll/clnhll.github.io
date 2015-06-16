$(document).ready(function() {

  $.get("http://ipinfo.io", function (res) {
    res.loc = res.loc.split(",");
    $("#details").append(res.city + ", " + res.region + ", " + res.postal + ": ");
    
    $.get("http://api.openweathermap.org/data/2.5/weather?lat=" +
        res.loc[0] + "&lon=" + res.loc[1] + "&units=imperial", 
        function(response) {
          $("#imperial").append(response.main.temp + " <span id=\"units\">Fahrenheit</span>" + tempFIcon(response.main.temp) + ", " + response.weather[0].description + ", " + response.wind.speed + " mph " + getCardinal(response.wind.deg));
        }, "jsonp");
    $.get("http://api.openweathermap.org/data/2.5/weather?lat=" +
        res.loc[0] + "&lon=" + res.loc[1] + "&units=metric", 
        function(response) {
          $("#metric").append(response.main.temp + " <span id=\"units\">Celcius</span>" + tempCIcon(response.main.temp) + ", " + response.weather[0].description + ", " + response.wind.speed + " m/s " + getCardinal(response.wind.deg));
        }, "jsonp");
    $(".btn").click(function() {
      $("#imperial").toggleClass("hidden");
      $("#metric").toggleClass("hidden");
      
    })
  }, "jsonp");                       
});

function tempFIcon(temp) {
  if (temp<50) {
    setBG("cold");
    return " <span class=\"glyphicon glyphicon-tree-conifer cold\" aria-hidden=\"true\"></span>";
  } else if (temp >= 80 ) {
    setBG("hot");
    return " <span class=\"glyphicon glyphicon-fire hot\" aria-hidden=\"true\"></span>";
  } else {
    setBG("");
    return " <span class=\"glyphicon glyphicon-leaf green\" aria-hidden=\"true\"></span>";
  }
}
function tempCIcon(temp) {
  if (temp<10) {
    return " <span class=\"glyphicon glyphicon-tree-conifer cold\" aria-hidden=\"true\"></span>";
  } else if (temp >= 26.6667) {
    return " <span class=\"glyphicon glyphicon-fire hot\" aria-hidden=\"true\"></span>";
  } else {
    return " <span class=\"glyphicon glyphicon-leaf green\" aria-hidden=\"true\"></span>";
  }
}
function setBG(bg) {
  if (bg=="cold") {
    $("body").css("background","url(http://upload.wikimedia.org/wikipedia/commons/d/d6/Field-with-snow-champ-enneige.jpg) ");
    $("body").css("background-size","cover");
  } else if (bg=="hot") {
    $("body").css("background","url(http://www.kalapanaculturaltours.com/Blog/wp-content/uploads/2013/09/IMG_2096.jpg) no-repeat");
    $("body").css("background-size","cover");
  } else {
    $("body").css("background","url(http://www.theconstantrambler.com/wp-content/uploads/2013/08/Hawaii-Pic.jpg)");
    $("body").css("background-size","cover");
  }
  
}
function getCardinal(deg) {
  if (deg <11.25 && deg > 348.75) {
    return "NNE";
  } else if (deg >=11.25 && deg < 33.75) {
    return "NE";
  } else if (deg >= 33.75 && deg < 56.25) {
    return "ENE";
  } else if (deg >=56.25 && deg < 78.25) {
    return "E";
  } else if (deg >= 78.75 && deg <101.25) {
    return "ESE";
  } else if (deg >=101.25 && deg < 123.75) {
    return "SE";
  } else if (deg >=123.75 && deg<146.25) {
    return "SSE";
  } else if (deg >= 146.25 && deg< 168.75) {
    return "S";
  } else if (deg >=168.75 && deg <191.25) {
    return "SSW";
  } else if (deg >= 191.25 && deg < 213.75) {
    return "SW";
  } else if (deg >= 213.75 && deg < 236.25) {
    return "WSW";
  } else if (deg >= 236.25 && deg < 258.75) {
    return "W";
  } else if (deg >= 258.75 && deg< 281.25) {
    return "WNW";
  } else if (deg >= 281.25 && deg < 303.75) {
    return "NW";
  } else if (deg >= 303.75 && deg< 326.25) {
    return "NNW";
  }
}