var throttle = function (callback, limit) {
      var wait = false;                  // Initially, we're not waiting
      return function () {               // We return a throttled function
        if (!wait) {                   // If we're not waiting
          callback.call();           // Execute users function
          wait = true;               // Prevent future invocations
          setTimeout(function () {   // After a period of time
            wait = false;          // And allow future invocations
          }, limit);
        }
      }
    }
var vm = new Vue({
  el: 'body',
  data: {
    year: new Date().getFullYear(),
    currentPage: 0,
    loadedItems: [],
    projectData: [
      {
        title: "Angular Material Todo",
        link: "https://clnhll.com/todo/",
        img: "https://clnhll.com/todo.png",
        snippet: "I used this project to learn Angular Material, various JavaScript libraries, app caching and local storage. It features offline availability, multiple lists separated with Angular Material's dynamic tabs, drag-and-drop reordering of list items and persistent browser storage of list data.",
        src: "https://github.com/clnhll/clnhll.github.io/tree/master/todo"  
      },
      {
        title: "Pollarama",
        link: "https://polltastic.herokuapp.com/",
        img: "https://clnhll.com/polls.png",
        snippet: "My first MEAN full-stack project is a polling platform featuring Google charts, custom APIs, user authentication and persistent storage.",
        src: "https://github.com/clnhll/polltastic" 
      },
      {
        title: "Plans tonight?",
        link: "https://whatsgoinontonight.herokuapp.com/",
        img: "https://clnhll.com/tonight.png",
        snippet: "My second MEAN full-stack project is a simple social nightlife platform. Utilizes API keys from YELP to display a list of bars at your location, allows Twitter OAuth authenticated users to indicate whether they are attending or not, shows number of attendees, remembers authenticated users' last searched location.",
        src: "https://github.com/clnhll/whatstonight" 
      },
      {
        title: "StockStream",
        link: "https://stockstream.herokuapp.com/",
        img: "https://clnhll.com/stocks.png",
        snippet: "My third MEAN full-stack project is a collaborative stock charting platform. It pulls stock information from Quandl and utilizes Socket.io to live-update the stock list across multiple clients without requiring a browser refresh.",
        src: "https://github.com/clnhll/stockstream" 
      },
      {
        title: "BookJump",
        link: "https://bookjump.herokuapp.com/",
        img: "https://clnhll.com/books.png",
        snippet: "My fourth MEAN full-stack project is a social book-sharing app. It allows users to share their libraries easily with one-another, and utilizes the Google Books API and the Google API Node.js client to get cover and title information.",
        src: "https://github.com/clnhll/bookjump" 
      },
      {
        title: "Angular Material Twitch.tv Buddy List",
        link: "https://codepen.io/cln/pen/xGmLaq",
        img: "https://clnhll.com/twitch.png",
        embed:"xGmLaq",
        snippet: "This project was an introduction to using a JSON API, which I later went and re-did using AngularJS and Angular Material for practice. It fetches a list of Twitch.tv usernames and displays some information about them.",
        src: "https://codepen.io/cln/pen/xGmLaq" 
      },
      {
        title: "Angular Emoji Tic-Tac-Toe",
        link: "https://codepen.io/cln/pen/eNbRxo",
        img: "https://clnhll.com/tic-tac-toe.png",
        embed: "eNbRxo",
        snippet: "A totally unfair game of tic-tac-toe with an unbeatable algorithm written with AngularJS. The graphics in this game are emoji so for an optimal experience you should use Safari on a Mac. Computer lets you play first if you lose, computer plays first if you tie.",
        src: "https://codepen.io/cln/pen/eNbRxo" 
      },
      {
        title: "Wikipedia Live Search",
        link: "https://codepen.io/cln/pen/ZGVXee",
        img: "https://clnhll.com/wiki.png",
        embed: "ZGVXee",
        snippet: "A live-updating article title search using the Wikipedia API, AngularJS and BootStrap. Clicking the random button will also display a random article on command.",
        src: "https://codepen.io/cln/pen/ZGVXee" 
      },
      {
        title: "Local Weather",
        link: "https://codepen.io/cln/pen/vOmxJY",
        img: "https://clnhll.com/weather.png",
        embed: "vOmxJY",
        snippet: "A little weather applet, uses your browser's geolocation to retrieve your location, allows switching between imperial and metric. Displays different graphics based on temperature.",
        src: "https://codepen.io/cln/pen/vOmxJY",
      }, 
      {
        title: "Retro Calculator",
        link: "https://codepen.io/cln/pen/GJmYKN",
        img: "https://clnhll.com/calc.png",
        embed: "GJmYKN",
        snippet: "This retro-style calculator is super cute and just as functional as any other calculator from the seventies. Allows chaining of operations just like a real calculator would. Is not solar powered, unfortunately.",
        src: "https://codepen.io/cln/pen/GJmYKN" 
      },
      {
        title: "Pomodoro Timer",
        link: "https://codepen.io/cln/pen/zGwWQp",
        img: "https://clnhll.com/pomo.png",
        embed: "zGwWQp",
        snippet: "A cute timer for the pomodoro scheduling program. Input work time and break time and watch as the circle fills up with seconds of your life you'll never get back. Bonus: plays an annoying noise when it gets to zero!",
        src: "https://codepen.io/cln/pen/zGwWQp" 
      // },
      // {
      //   title: "Random Twitter API Abuser",
      //   link: "https://codepen.io/cln/pen/NqjNZJ",
      //   img: "https://clnhll.com/tweets.png",
      //   embed: "NqjNZJ",
      //   snippet: "A rough and dirty hacked-together way of working around Twitter's API auth tokens and tweet display requirements and reading a user's tweets. Pushes an RSS feed of a twitter user of your choice's tweets through an RSS to JSON filter and displays a random one at the press of a button.",
      //   src: "https://codepen.io/cln/pen/NqjNZJ" 
      }
    ],
    commandPressed: false
  },
  created: function() {
    const wrapper = document.querySelector('.wrapper');
    wrapper.onscroll = function() {
      var nextPage = Math.ceil(wrapper.scrollTop/wrapper.clientHeight);
      if (nextPage > vm.currentPage) {
        if (vm.loadedItems.length < vm.projectData.length && 
            vm.projectData[nextPage-1] && 
            vm.loadedItems.indexOf(vm.projectData[nextPage-1]) == -1) {
          vm.loadedItems.push(vm.projectData[nextPage-1])
        }
      }
      if (nextPage < 0) {
        vm.currentPage = 0;
      } else {
        vm.currentPage = nextPage;
      }
    }
    document.onkeydown = function(e) {
      if ((!e.shiftKey && e.keyCode == 32) || e.keyCode == 74) {
        e.preventDefault();
        vm.scrollDown();
      } else if ((e.shiftKey && e.keyCode == 32) || e.keyCode == 75) {
        vm.scrollUp();
      }
      if (e.keyCode == 91 || e.keyCode == 93) {
        vm.commandPressed = true;
      }
    };
    document.onkeyup = function(e) {
      if (e.keyCode == 91 || e.keyCode == 93) {
        vm.commandPressed = false;
      }
    }
    WebFont.load({google: {families: ['Lato:400,900']}});
  },
  methods: {
    scrollTo: function(element, to, duration) {
      var start = element.scrollTop,
          change = to - start,
          increment = 20;
      var animateScroll = function(elapsedTime) {        
        elapsedTime += increment;
        var position = vm.easeInOut(elapsedTime, start, change, duration);                        
        element.scrollTop = position; 
        if (elapsedTime < duration) {
          setTimeout(function() {
            animateScroll(elapsedTime);
          }, increment);
        }
      };
      animateScroll(0);
    },
    easeInOut: function(currentTime, start, change, duration) {
      currentTime /= duration / 2;
      if (currentTime < 1) {
        return change / 2 * currentTime * currentTime + start;
      }
      currentTime -= 1;
      return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
    },
    getSrc: function(item) {
      if (!item) {return ""};
      return "//codepen.io/cln/embed/preview/" + item + "/?height=400&theme-id=0&default-tab=result";
    },
    scrollToTop: function() {
      vm.scrollTo(document.querySelector('.wrapper'),0,200);
    },
    scrollDown: throttle(function() {
      const wrapper = document.querySelector('.wrapper');
      vm.scrollTo(document.querySelector('.wrapper'),Math.ceil((1+ wrapper.scrollTop)/wrapper.clientHeight)*wrapper.clientHeight, 200)
    }, 300),
    scrollUp: throttle(function() {
      const wrapper = document.querySelector('.wrapper');
      vm.scrollTo(wrapper,Math.ceil(wrapper.scrollTop/wrapper.clientHeight - 1)*wrapper.clientHeight, 200)
    }, 300),
    scrollToAbout: function() {
      const wrapper = document.querySelector('.wrapper');
      vm.scrollTo(wrapper, wrapper.clientHeight, 200);
    },
    scrollToProjects: function() {
      const wrapper = document.querySelector('.wrapper');
      vm.scrollTo(wrapper, wrapper.clientHeight*2, 200);
    }
  }
});