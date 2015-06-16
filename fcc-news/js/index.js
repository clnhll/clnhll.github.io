$(document).ready(function(){
  $.ajax({
        url: "http://www.freecodecamp.com/stories/hotStories", 
        dataType: 'json',
        success: function(data){
          for (var i = 0; i< data.length;i++) {
            var storyName=data[i].storyLink.split(" ");
            var storyURL="http://www.freecodecamp.com/news/";
            for (var j = 0; j < storyName.length; j++) {
              storyURL += storyName[j] + "-";
            }
            storyURL=storyURL.substring(0,storyURL.length-1);            
            
           $("#posts").append("<div class=\"post\"><a href=\"" + data[i].link + "\"><img class=\"img-responsive\" src=\""+ data[i].author.picture + "\">" + 
                              "<div class=\"headline\">" + data[i].headline +"</div></a>" + 
                              "<div class=\"comments\"><a href=\"" + storyURL + "\">" + 
                              data[i].comments.length + 
                              " Comments, " + data[i].upVotes.length + 
                                " Upvotes</a></div></div>");
          
            //console.log(data[i].headline);


          }
        }
  });
 // $.getJSON("",function(res) {
 //       $(".container").append(JSON.stringify(res, null, 4));
 // });
})