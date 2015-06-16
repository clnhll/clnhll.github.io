$(document).ready(function() { 
  
  $(function() {
    $( "#tabs" ).tabs();   //something about tab navigation
  });
  
  
   
  $(".searchAll").livesearch({
				searchCallback: searchFunction1,    
        queryDelay: 0,                        // took all this for livesearch from 
        minimumSearchLength: 0,               // http://jherrm.com/livesearch/
        innerText: ""                         
			});

			function searchFunction1(searchTerm) {
				  $("a[class*='username']").css("display","inline");
          if (searchTerm!=="") {
          $("a:not([class*='usera_"+ searchTerm.toLowerCase() + "'])[class*='username']").css("display","none");
          }
			}
  $("#searchOnline").livesearch({
				searchCallback: searchFunction2,
        queryDelay: 0,
        minimumSearchLength: 0,
        innerText: ""
			});
    $("#searchOffline").livesearch({
				searchCallback: searchFunction2,
        queryDelay: 0,
        minimumSearchLength: 0,
        innerText: ""
			});

			function searchFunction2(searchTerm) {
				  $("a[class*='username']").css("display","inline");
          if (searchTerm!=="") {
            $("a:not([class*='2usera_"+ searchTerm.toLowerCase() + "'])[class*='username']").css("display","none");
          }
			}
  
  
   var users=["freecodecamp", "storbeck", "terakilobyte", "habathcx", "medrybw", "comster404", "brunofin", "thomasballinger", "noobs2ninjas", "beohoff"];   // users (obvs)

  
  var twitchStreamAPI = "https://api.twitch.tv/kraken/streams/"; // need this for online status indicator
  var twitchUserAPI = "https://api.twitch.tv/kraken/channels/";  // this is for all other information
  
  users.forEach(function(user) {    // I did everything in here, probably should have just made an array
                                    // of the API returns in hindsight.
    
    $.ajax({                            // Couldn't figure out getJSON at first, went with this 
        url: twitchUserAPI + user,      // because I like the clarity.
        dataType: 'jsonp',
        success: function(data){
          
          if (data.logo==null) {
            data.logo="http://placeholdit.imgix.net/~text?txtsize=6&txt=50x50&w=50&h=50";  //stock user photo
          }
          
          // First, just make a list on the main screen
          // This contains all the API info except the online status indicator and string.
          $(".anything").append("<a href=\"" + data.url + "\" class=\"username usera_" + 
                                user +"\"><div class=\"user row user_" + user + " text-left\">" +
                                "<div class=\"col-xs-10 link_" + user + "\"><img class=\"userPic\" src=\"" + 
                                data.logo + "\">"+ data.display_name + "<br>" + "</div><div class=\"col-xs-1\"><i class=\"fa fa-exclamation offline ols_" + user + "\"></i></div></div></a>");
          
          // Construct hidden array full of username-specific classes of the same stuff as above
          // Later we'll put this item in the online/offline tabs using jQuery!
          $(".shhhh").append("<a href=\"" + data.url + "\" class=\"username 2usera_" + 
                             user +"\"><div class=\"user row 2user_" + user + " text-left\">" +
                             "<div class=\"link col-xs-10 link2_" + user + "\"><img class=\"userPic\" src=\"" + 
                             data.logo + "\">" + data.display_name + "</div><div class=\"col-xs-1\"><i class=\"fa fa-exclamation offline ols2_" + user + "\"></i></div></div></a>");  
          
          $(".peepsOffline").append($(".2usera_"+user));
        }
    });
   $.ajax({
       url: twitchStreamAPI + user,
       dataType: 'jsonp',
       success: function(onlineData){
    
          if (onlineData.stream !== null) {  // Checking if we're streaming
            
            // For the main tab: set status string for online users
            $(".link_" + user).append("<div class=\"status\">" + 
                                     onlineData.stream.channel.status.substring(0,33) + "...</div>");
            // Then add the cute status indicator icon
            $(".ols_"+ user).removeClass("fa-exclamation offline");
            $(".ols_"+ user).addClass("fa-check online");
            
            
            // Then do the same thing for the hidden user list item
            $(".link2_" + user).append("<div class=\"status\">" + 
                                     onlineData.stream.channel.status.substring(0,33) + "...</div>");
            
            $(".ols2_"+ user).removeClass("fa-exclamation offline");
            $(".ols2_"+ user).addClass("fa-check online");
            
            // Then put the hidden user in the Online tab
            $(".peepsOnline").append($(".2usera_"+user));
            }    
    }
    
  });
  


});
});