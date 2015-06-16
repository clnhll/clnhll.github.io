  $(document).ready(function() {
    var tweetList=[];
  blockspring.runParsed("parse-rss-feed-to-json", { "feed_url": "http://queryfeed.net/twitter?q=from%3Aadamjk&geocode=", "num_items": 20}, { "api_key": "br_3328_3fddc96b0038923b46b1fd7496a44b5aea36c3a7" }, function(res){
    res.params.feed.forEach(function(tweet) {
      tweetList.push(tweet.summary);   
    });
  $('#hi').text('get random tweet! (' + tweetList.length + " loaded)");
  $("#hi").removeClass("btn-disabled").addClass("btn-primary");
    console.log(tweetList);
  })
  


    $("#hi").click(function(){
     if (tweetList.length > 0) {
       var thistweet=tweetList[getRandomInt(0,tweetList.length-1)];    
    $(".tweets").replaceWith("<div class=\"tweets\"><p>" + thistweet + "</p><a href=\"http://twitter.com/home?status=RT%20@adamjk%3A%20"+ encodeURIComponent(strip(thistweet)) + "\" target=\"new\"><button class='btn btn-primary'>Tweet this?</button></a></div>");
     } 
     
    
  });
  });
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function strip(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}