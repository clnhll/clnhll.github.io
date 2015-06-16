$(document).ready(function() {
  
  $(".btn").click(function() {
    $(".results").empty();
    $.ajax({
      url: 'https://en.wikipedia.org/w/api.php',
      data: { action: 'query',
              list: 'random',
              rnnamespace: '0',
              continue: '', 
              format: 'json'
      },
      dataType: 'jsonp',
      success: function (x) {
        $.ajax({
                  url: '//en.wikipedia.org/w/api.php',
                  data: { action: 'query', 
                    prop: 'info|pageprops', 
                    titles: x.query.random[0].title, 
                    //srinfo: 'suggestion', 
                    prop: 'info|pageterms',
                    inprop: 'url',
                    wbptterms: 'description',
                    format: 'json'},
                  dataType: 'jsonp',
            success: function (y) { 
              var keys = Object.keys(y.query.pages);
              
              var url = y.query.pages[keys[0]].fullurl;
              var title = y.query.pages[keys[0]].title;
              
              $.ajax({
            url: '//en.wikipedia.org/w/api.php',
            data: { action: 'query', 
                    list: 'search', 
                    srsearch: title, 
                    srinfo: 'suggestion', 
                    continue: '', 
                    format: 'json'},
            dataType: 'jsonp',
            success: function (z) {
              
              
              console.log(z)
              var snippet=z.query.search[0].snippet;
              
              $(".results").append("<div class=\"aresult divr" + "\" style=\"display:none\"><a href=\"" + url + "\">" + title + "</a><br>" + snippet + "<br></div>");
                    $('.divr').fadeIn('medium');
              
            }
              })
            }
        })
      }
    });
  });
  
  
  
  $(".search").livesearch({
				searchCallback: searchFunction,    
        queryDelay: 0,                        // took all this for livesearch from 
        minimumSearchLength: 0,               // http://jherrm.com/livesearch/
        innerText: "Search Wikipedia"                         
  });

  function searchFunction(searchTerm) {
    
    $.ajax({
            url: '//en.wikipedia.org/w/api.php',
            data: { action: 'query', 
                    list: 'search', 
                    srsearch: searchTerm, 
                    srinfo: 'suggestion', 
                    continue: '', 
                    format: 'json'},
            dataType: 'jsonp',
            success: function (x) {
               $(".results").empty();
                var titles="";
                var snippets=[];

               for (var i = 0; i < x.query.search.length; i++) {
                  var title=x.query.search[i].title;
                  titles+="|"+title;
                  snippets.push(x.query.search[i].snippet)
               }
               titles=titles.substring(0,titles.length);
                $.ajax({
                  url: '//en.wikipedia.org/w/api.php',
                  data: { action: 'query', 
                    prop: 'info|pageprops', 
                    titles: titles, 
                    //srinfo: 'suggestion', 
                    prop: 'info|pageterms',
                    inprop: 'url',
                    wbptterms: 'description',
                    format: 'json'},
                  dataType: 'jsonp',
            success: function (y) { 
               
               var pageKeys = Object.keys(y.query.pages);
               $(".results").empty();
               for (var i = 0; i < pageKeys.length-1; i++) {
                    var url=y.query.pages[pageKeys[i]].fullurl;
                    var title = y.query.pages[pageKeys[i]].title;
                    var snippet = x.query.search.filter(function(item) {
                      return item.title==title;
                    })[0].snippet;
                    //$("#title"+ i).empty();
                    $(".results").append("<div class=\"aresult div" + i + "\" style=\"display:none\"><a href=\"" + url + "\">" + title + "</a><br>" + snippet + "<br></div>");
                    $('.div'+i).fadeIn('medium');
                    //$("#title" + i).append("<a href=\"" + url + "\">" + title + "</a>");
               }
            
            }
                });
                

                
              
            }
    });
	}


			
  

});