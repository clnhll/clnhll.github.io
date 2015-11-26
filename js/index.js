(function(){
  'use strict';

  angular.module('MyApp',['ngAnimate']).
  controller('MainCtrl', MainCtrl).
  config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'http://codepen.io/**'
    ]);
  });
  function MainCtrl($scope, $timeout) {
    $scope.currentPage = 0;
    
    window.onscroll = function(){
      var nextPage = Math.ceil(window.scrollY/window.innerHeight);
      if (nextPage !== $scope.currentPage) {
        if ($scope.loadedItems.length < nextPage && $scope.projectData[nextPage-1]) {
           $scope.loadedItems.push($scope.projectData[nextPage-1])
        }
      } 
      if (nextPage < 0) {
        $scope.currentPage = 0;
      } else{
        $scope.currentPage = nextPage;
      }
      $scope.$apply()
    }
    document.onkeydown = function(e) {
      if ((!e.shiftKey && e.keyCode == 32) || e.keyCode == 74) {
        e.preventDefault();
        $scope.scrollDown();
      } else if ((e.shiftKey && e.keyCode == 32) || e.keyCode == 75) {
        $scope.scrollUp();
      }
      if (e.keyCode == 91 || e.keyCode == 93) {
        $scope.commandPressed = true;
        $scope.$apply();
      }
    };
  document.onkeyup = function(e) {
    if (e.keyCode == 91 || e.keyCode == 93) {
      $scope.commandPressed = false;
      $scope.$apply();
    }
  }
    function scrollTo(element, to, duration) {
      var start = element.scrollTop,
          change = to - start,
          increment = 20;

      var animateScroll = function(elapsedTime) {        
        elapsedTime += increment;
        var position = easeInOut(elapsedTime, start, change, duration);                        
        element.scrollTop = position; 
        if (elapsedTime < duration) {
          setTimeout(function() {
            animateScroll(elapsedTime);
          }, increment);
        }
      };

      animateScroll(0);
    }

    function easeInOut(currentTime, start, change, duration) {
      currentTime /= duration / 2;
      if (currentTime < 1) {
        return change / 2 * currentTime * currentTime + start;
      }
      currentTime -= 1;
      return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
    }
    function animate(elem,style,unit,from,to,time,prop) {
      if( !elem) return;
      var start = new Date().getTime(),
          timer = setInterval(function() {
            var step = Math.min(1,(new Date().getTime()-start)/time);
            if (prop) {
              elem[style] = (from+step*(to-from))+unit;
            } else {
              elem.style[style] = (from+step*(to-from))+unit;
            }
            if( step == 1) clearInterval(timer);
          },10);
      elem.style[style] = from+unit;
    }
    $scope.getSrc = function(item) {
      if (!item) {return ""};
      return "//codepen.io/cln/embed/preview/" + item + "/?height=450&theme-id=0&default-tab=result";
    }
    $scope.loadedItems=[];
    $scope.skipTimeout=false;
    WebFont.load({google: {families: ['Asar']}});
    var ready = true;
    $scope.scrollToTop = function() {
      scrollTo(document.body,0,200);
    }
    $scope.scrollDown = function() {
      scrollTo(document.body,(1+Math.ceil(window.scrollY/window.innerHeight))*window.innerHeight, 200)
    }
    $scope.scrollUp = function() {
      scrollTo(document.body,Math.ceil(window.scrollY/window.innerHeight - 1)*window.innerHeight, 200)
    }
    $scope.projectData=[
      {
        title: "Angular Material Todo",
        link: "http://clnhll.com/todo/",
        img: "http://clnhll.com/todo.png",
        snippet: "I used this project to learn Angular Material, various JavaScript libraries, app caching and local storage. It features offline availability, multiple lists separated with Angular Material's dynamic tabs, drag-and-drop reordering of list items and persistent browser storage of list data.",
        src: "https://github.com/clnhll/clnhll.github.io/tree/master/todo"  
      },
      {
        title: "Pollarama",
        link: "http://polltastic.herokuapp.com/",
        img: "http://clnhll.com/polls.png",
        snippet: "My first MEAN full-stack project is a polling platform, and while aesthetically a little rough around the edges the groundwork is incredibly solid. Featuring Google charts, custom APIs, user authentication and persistent storage.",
        src: "https://github.com/clnhll/polltastic" 
      },
      {
        title: "Plans tonight?",
        link: "http://whatsgoinontonight.herokuapp.com/",
        img: "http://clnhll.com/tonight.png",
        snippet: "My second MEAN full-stack project is a simple social nightlife platform. Utilizes API keys from YELP to display a list of bars at your location, allows Twitter OAuth authenticated users to indicate whether they are attending or not, shows number of attendees, remembers authenticated users' last searched location.",
        src: "https://github.com/clnhll/whatstonight" 
      },
      {
        title: "StockStream",
        link: "http://stockstream.herokuapp.com/",
        img: "http://clnhll.com/stocks.png",
        snippet: "My third MEAN full-stack project is a collaborative stock charting platform. It pulls stock information from Quandl and utilizes Socket.io to live-update the stock list across multiple clients without requiring a browser refresh.",
        src: "https://github.com/clnhll/stockstream" 
      },
      {
        title: "BookJump",
        link: "http://bookjump.herokuapp.com/",
        img: "http://clnhll.com/books.png",
        snippet: "My fourth MEAN full-stack project is a social book-sharing app. It allows users to share their libraries easily with one-another, and utilizes the Google Books API and the Google API Node.js client to get cover and title information.",
        src: "https://github.com/clnhll/bookjump" 
      },
      {
        title: "Angular Material Twitch.tv Buddy List",
        link: "http://codepen.io/cln/pen/xGmLaq",
        img: "http://clnhll.com/twitch.png",
        embed:"xGmLaq",
        snippet: "This project was an introduction to using a JSON API, which I later went and re-did using AngularJS and Angular Material for practice. It fetches a list of Twitch.tv usernames and displays some information about them.",
        src: "http://codepen.io/cln/pen/xGmLaq" 
      },
      {
        title: "Angular Emoji Tic-Tac-Toe",
        link: "http://codepen.io/cln/pen/eNbRxo",
        img: "http://clnhll.com/tic-tac-toe.png",
        embed: "eNbRxo",
        snippet: "A totally unfair game of tic-tac-toe with an unbeatable AI written with AngularJS. The graphics in this game are emoji so for an optimal experience you should use Safari on a Mac. you may want to use an emoji-friendly browser. Computer lets you play first if you lose, computer plays first if you tie.",
        src: "http://codepen.io/cln/pen/eNbRxo" 
      },
      {
        title: "Wikipedia Live Search",
        link: "http://codepen.io/cln/pen/ZGVXee",
        img: "http://clnhll.com/wiki.png",
        embed: "ZGVXee",
        snippet: "A live-updating article title search using the Wikipedia JSON API, AngularJS and BootStrap. Clicking the random button will also display a random article on command.",
        src: "http://codepen.io/cln/pen/ZGVXee" 
      },
      {
      title: "Local Weather",
      link: "http://codepen.io/cln/pen/vOmxJY",
      img: "http://clnhll.com/weather.png",
      embed: "vOmxJY",
      snippet: "A little weather applet, again practicing JSON requests, uses your browser's geolocation to retrieve your location, allows switching between imperial and metric. Displays different graphics based on temperature.",
      src: "http://codepen.io/cln/pen/vOmxJY",
    }, 
      {
        title: "Retro Calculator",
        link: "http://codepen.io/cln/pen/GJmYKN",
        img: "http://clnhll.com/calc.png",
        embed: "GJmYKN",
        snippet: "This retro-style calculator is super cute and just as functional as any other calculator from the seventies. Allows chaining of operations just like a real calculator would. Is not solar powered, unfortunately.",
        src: "http://codepen.io/cln/pen/GJmYKN" 
      },
      {
        title: "Pomodoro Timer",
        link: "http://codepen.io/cln/pen/zGwWQp",
        img: "http://clnhll.com/pomo.png",
        embed: "zGwWQp",
        snippet: "A cute timer for the pomodoro scheduling program. Input work time and break time and watch as the circle fills up with seconds of your life you'll never get back. Bonus: plays an annoying noise when it gets to zero!",
        src: "http://codepen.io/cln/pen/zGwWQp" 
      },
      {
        title: "Random Twitter API Abuser",
        link: "http://codepen.io/cln/pen/NqjNZJ",
        img: "http://clnhll.com/tweets.png",
        embed: "NqjNZJ",
        snippet: "A rough and dirty hacked-together way of working around Twitter's API auth tokens and tweet display requirements and reading a user's tweets. Pushes an RSS feed of a twitter user of your choice's tweets through an RSS to JSON filter and displays a random one at the press of a button.",
        src: "http://codepen.io/cln/pen/NqjNZJ" 
      }
    ];
}
})()