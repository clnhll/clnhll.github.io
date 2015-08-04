
  angular.module('MyApp',['swipe','snapscroll']).
    controller('MainCtrl', MainCtrl);
  
  function MainCtrl($scope, $timeout) {
    $scope.skipTimeout=false;
    WebFont.load({google: {families: ['Asar']}});
    var ready = true;
    $scope.scrollDown=function(){
      $scope.skipTimeout=true;
      if ($scope.snapIndex < $scope.projectData.length+3) {
        $scope.snapIndex = $scope.snapIndex + 1;
      }
    }
    $scope.beforeCallback = function() {
      if ($scope.skipTimeout) {
        $scope.skipTimeout = false;
        return true;
      }
      if (!ready) {
        return false;
      } 
    }
    $scope.afterCallback = function() {
      ready=false;
      $timeout(function(){ready=true},600);
    }
    
    
    $scope.projectData=[
      {
        title: "Angular Material Todo",
        link: "http://clnhll.com/todo/",
        img: "http://clnhll.com/todo.png",
        snippet: "I used this project to learn Angular Material, various JavaScript libraries, app caching and local storage. It features offline availability, multiple lists separated with Angular Material's dynamic tabs, drag-and-drop reordering of list items and persistent browser storage of list data.",
        git: "https://github.com/clnhll/clnhll.github.io/tree/master/todo"  
      },
      {
        title: "Pollarama",
        link: "http://polltastic.herokuapp.com/",
        img: "http://clnhll.com/polls.png",
        snippet: "My first MEAN full-stack project is a polling platform, and while aesthetically a little rough around the edges the groundwork is incredibly solid. Featuring Google charts, custom APIs, user authentication and persistent storage.",
        git: "https://github.com/clnhll/polltastic" 
      },
      {
        title: "Plans tonight?",
        link: "http://whatsgoinontonight.herokuapp.com/",
        img: "http://clnhll.com/tonight.png",
        snippet: "My second MEAN full-stack project is a simple social nightlife platform. Utilizes API keys from YELP to display a list of bars at your location, allows Twitter OAuth authenticated users to indicate whether they are attending or not, shows number of attendees, remembers authenticated users' last searched location.",
        git: "https://github.com/clnhll/whatstonight" 
      },
      {
        title: "StockStream",
        link: "http://stockstream.herokuapp.com/",
        img: "http://clnhll.com/stocks.png",
        snippet: "My third MEAN full-stack project is a collaborative stock charting platform. It pulls stock information from Quandl and utilizes Socket.io to live-update the stock list across multiple clients without requiring a browser refresh.",
        git: "https://github.com/clnhll/stockstream" 
      },
      {
        title: "BookJump",
        link: "http://bookjump.herokuapp.com/",
        img: "http://clnhll.com/books.png",
        snippet: "My fourth MEAN full-stack project is a social book-sharing app. It allows users to share their libraries easily with one-another, and utilizes the Google Books API and the Google API Node.js client to get cover and title information.",
        git: "https://github.com/clnhll/bookjump" 
      },
      {
        title: "Angular Material Twitch.tv Buddy List",
        link: "twitch/",
        img: "http://clnhll.com/twitch.png",
        snippet: "This project was an introduction to using a JSON API, which I later went and re-did using AngularJS and Angular Material for practice. It fetches a list of Twitch.tv usernames and displays some information about them.",
        git: "https://github.com/clnhll/clnhll.github.io/tree/master/twitch" 
      },
      {
        title: "Angular Emoji Tic-Tac-Toe",
        link: "tic-tac-toe/",
        img: "http://clnhll.com/tic-tac-toe.png",
        snippet: "A totally unfair game of tic-tac-toe with an unbeatable AI written with AngularJS. The graphics in this game are emoji so for an optimal experience you should use Safari on a Mac. you may want to use an emoji-friendly browser. Computer lets you play first if you lose, computer plays first if you tie.",
        git: "https://github.com/clnhll/clnhll.github.io/tree/master/tic-tac-toe" 
      },
      {
        title: "Wikipedia Live Search",
        link: "wiki/",
        img: "http://clnhll.com/wiki.png",
        snippet: "A live-updating article title search using the Wikipedia JSON API, AngularJS and BootStrap. Clicking the random button will also display a random article on command.",
        git: "https://github.com/clnhll/clnhll.github.io/tree/master/wiki" 
      },
      {
        title: "Local Weather",
        link: "weather/",
        img: "http://clnhll.com/weather.png",
        snippet: "A little weather applet, again practicing JSON requests, uses your IP address to estimate your location, allows switching between imperial and metric. Displays different graphics based on temperature.",
        git: "https://github.com/clnhll/clnhll.github.io/tree/master/weather" 
      },
      {
        title: "Retro Calculator",
        link: "calc/",
        img: "http://clnhll.com/calc.png",
        snippet: "This retro-style calculator is super cute and just as functional as any other calculator from the seventies. Allows chaining of operations just like a real calculator would. Is not solar powered, unfortunately.",
        git: "https://github.com/clnhll/clnhll.github.io/tree/master/calc" 
      },
       {
        title: "Pomodoro Timer",
        link: "pomodoro/",
        img: "http://clnhll.com/pomo.png",
        snippet: "A cute timer for the pomodoro scheduling program. Input work time and break time and watch as the circle fills up with seconds of your life you'll never get back. Bonus: plays an annoying noise when it gets to zero!",
        git: "https://github.com/clnhll/clnhll.github.io/tree/master/pomodoro" 
      },
      {
        title: "Random Twitter API Abuser",
        link: "twitter/",
        img: "http://clnhll.com/tweets.png",
        snippet: "A rough and dirty hacked-together way of working around Twitter's API auth tokens and tweet display requirements and reading a user's tweets. Pushes an RSS feed of my friend @adamjk's tweets through an RSS to JSON filter and displays a random one at the press of a button.",
        git: "https://github.com/clnhll/clnhll.github.io/tree/master/twitter" 
      }
    ];
 
  }