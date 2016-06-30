"use strict";

setTimeout(function () {

  var state = {
    currentPage: 0,
    loadedItems: [],
    projectData: [{
      title: "Angular Material Todo",
      link: "http://clnhll.com/todo/",
      img: "http://clnhll.com/todo.png",
      snippet: "I used this project to learn Angular Material, various JavaScript libraries, app caching and local storage. It features offline availability, multiple lists separated with Angular Material's dynamic tabs, drag-and-drop reordering of list items and persistent browser storage of list data.",
      src: "https://github.com/clnhll/clnhll.github.io/tree/master/todo"
    }, {
      title: "Pollarama",
      link: "http://polltastic.herokuapp.com/",
      img: "http://clnhll.com/polls.png",
      snippet: "My first MEAN full-stack project is a polling platform featuring Google charts, custom APIs, user authentication and persistent storage.",
      src: "https://github.com/clnhll/polltastic"
    }, {
      title: "Plans tonight?",
      link: "http://whatsgoinontonight.herokuapp.com/",
      img: "http://clnhll.com/tonight.png",
      snippet: "My second MEAN full-stack project is a simple social nightlife platform. Utilizes API keys from YELP to display a list of bars at your location, allows Twitter OAuth authenticated users to indicate whether they are attending or not, shows number of attendees, remembers authenticated users' last searched location.",
      src: "https://github.com/clnhll/whatstonight"
    }, {
      title: "StockStream",
      link: "http://stockstream.herokuapp.com/",
      img: "http://clnhll.com/stocks.png",
      snippet: "My third MEAN full-stack project is a collaborative stock charting platform. It pulls stock information from Quandl and utilizes Socket.io to live-update the stock list across multiple clients without requiring a browser refresh.",
      src: "https://github.com/clnhll/stockstream"
    }, {
      title: "BookJump",
      link: "http://bookjump.herokuapp.com/",
      img: "http://clnhll.com/books.png",
      snippet: "My fourth MEAN full-stack project is a social book-sharing app. It allows users to share their libraries easily with one-another, and utilizes the Google Books API and the Google API Node.js client to get cover and title information.",
      src: "https://github.com/clnhll/bookjump"
    }, {
      title: "Angular Material Twitch.tv Buddy List",
      link: "http://codepen.io/cln/pen/xGmLaq",
      img: "http://clnhll.com/twitch.png",
      embed: "xGmLaq",
      snippet: "This project was an introduction to using a JSON API, which I later went and re-did using AngularJS and Angular Material for practice. It fetches a list of Twitch.tv usernames and displays some information about them.",
      src: "http://codepen.io/cln/pen/xGmLaq"
    }, {
      title: "Angular Emoji Tic-Tac-Toe",
      link: "http://codepen.io/cln/pen/eNbRxo",
      img: "http://clnhll.com/tic-tac-toe.png",
      embed: "eNbRxo",
      snippet: "A totally unfair game of tic-tac-toe with an unbeatable algorithm written with AngularJS. The graphics in this game are emoji so for an optimal experience you should use Safari on a Mac. Computer lets you play first if you lose, computer plays first if you tie.",
      src: "http://codepen.io/cln/pen/eNbRxo"
    }, {
      title: "Wikipedia Live Search",
      link: "http://codepen.io/cln/pen/ZGVXee",
      img: "http://clnhll.com/wiki.png",
      embed: "ZGVXee",
      snippet: "A live-updating article title search using the Wikipedia API, AngularJS and BootStrap. Clicking the random button will also display a random article on command.",
      src: "http://codepen.io/cln/pen/ZGVXee"
    }, {
      title: "Local Weather",
      link: "http://codepen.io/cln/pen/vOmxJY",
      img: "http://clnhll.com/weather.png",
      embed: "vOmxJY",
      snippet: "A little weather applet, uses your browser's geolocation to retrieve your location, allows switching between imperial and metric. Displays different graphics based on temperature.",
      src: "http://codepen.io/cln/pen/vOmxJY"
    }, {
      title: "Retro Calculator",
      link: "http://codepen.io/cln/pen/GJmYKN",
      img: "http://clnhll.com/calc.png",
      embed: "GJmYKN",
      snippet: "This retro-style calculator is super cute and just as functional as any other calculator from the seventies. Allows chaining of operations just like a real calculator would. Is not solar powered, unfortunately.",
      src: "http://codepen.io/cln/pen/GJmYKN"
    }, {
      title: "Pomodoro Timer",
      link: "http://codepen.io/cln/pen/zGwWQp",
      img: "http://clnhll.com/pomo.png",
      embed: "zGwWQp",
      snippet: "A cute timer for the pomodoro scheduling program. Input work time and break time and watch as the circle fills up with seconds of your life you'll never get back. Bonus: plays an annoying noise when it gets to zero!",
      src: "http://codepen.io/cln/pen/zGwWQp"
    }],
    getSrc: getSrc
  };

  var view = Monkberry.render(me, document.body);
  view.update(state);

  window.onscroll = function () {
    var nextPage = Math.ceil(scrollY / innerHeight);
    if (nextPage > state.currentPage) {
      if (state.loadedItems.length < state.projectData.length && state.projectData[nextPage - 1] && state.loadedItems.indexOf(state.projectData[nextPage - 1]) == -1) {
        setTimeout(function () {
          state.loadedItems.push(state.projectData[nextPage - 1]);
          var temp = Monkberry.render(project, document.querySelector("#pages"));
          temp.update({ getSrc: getSrc, p: state.loadedItems[state.loadedItems.length - 1] });
        }, 210);
      }
    }
    if (nextPage < 0) {
      state.currentPage = 0;
      view.update({ currentPage: 0 });
    } else {
      state.currentPage = nextPage;
      view.update({ currentPage: nextPage });
    }
  };
  document.onkeydown = function (e) {
    if (!e.shiftKey && e.keyCode == 32 || e.keyCode == 74) {
      e.preventDefault();
      scrollDown();
    } else if (e.shiftKey && e.keyCode == 32 || e.keyCode == 75) {
      scrollUp();
    }
    if (e.keyCode == 91 || e.keyCode == 93) {
      state.commandPressed = true;
    }
  };
  document.onkeyup = function (e) {
    if (e.keyCode == 91 || e.keyCode == 93) {
      commandPressed = false;
    }
  };
  WebFont.load({ google: { families: ['Lato:400,900'] } });

  function scrollTo(element, to, duration) {
    var start = element.scrollTop,
        change = to - start,
        increment = 20;
    var animateScroll = function animateScroll(elapsedTime) {
      elapsedTime += increment;
      var position = easeInOut(elapsedTime, start, change, duration);
      element.scrollTop = position;
      if (elapsedTime < duration) {
        setTimeout(function () {
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

  function getSrc(item) {
    if (!item) {
      return "";
    };
    return "//codepen.io/cln/embed/preview/" + item + "/?height=400&theme-id=0&default-tab=result";
  }

  function scrollToTop() {
    scrollTo(document.body, 0, 200);
  }
  function scrollDown() {
    console.log('scrolldown');
    scrollTo(document.body, Math.ceil((1 + scrollY) / innerHeight) * innerHeight, 200);
  }
  function scrollUp() {
    scrollTo(document.body, Math.ceil(scrollY / innerHeight - 1) * innerHeight, 200);
  }
  function scrollToAbout() {
    scrollTo(document.body, innerHeight, 200);
  }
  function scrollToProjects() {
    scrollTo(document.body, innerHeight * 2, 200);
  }

  view.on('click', '#top-button', scrollToTop);
  view.on('click', '.pagenum', scrollDown);
  view.on('click', '#about-button', scrollToAbout);
  view.on('click', '.projects-button', scrollToProjects);

  // view.update(state);
}, 0);