$(document).ready(function() {  
  var totalTime = 60*parseInt($(".stime").text());
  var breakTime = 60*parseInt($(".btime").text());
  var currentSession = 0;
  var alert = new Audio('http://www.soundjay.com/button/button-13.mp3');
  var fillIncrements = 0;
  var bgOrig = -265;
  var bgPos = -265;
  
  $(".sup").click(function(){
    if ($(".time").attr('class').indexOf("active") == -1) {
      $(".stime").text(parseInt($(".stime").text())+1);
      totalTime+=60;
      currentSession=totalTime;
      bgPos = -265;
      $(".time").text(parseInt($(".stime").text()));
      $(".timer").removeClass("break");
      $(".status").text("Session");
      $(".fill").css("margin-top", bgPos + "px");
    }
    
  })
  $(".bup").click(function(){
    if ($(".time").attr('class').indexOf("active") == -1) {
      $(".btime").text(parseInt($(".btime").text())+1);
      breakTime+=60;
      currentSession=totalTime;
      bgPos = -265;
      $(".time").text(parseInt($(".stime").text()));
      $(".timer").removeClass("break");
      $(".status").text("Session");
      $(".fill").css("margin-top", bgPos + "px");
    }
  })
  $(".sdown").click(function(){
    if ($(".time").attr('class').indexOf("active") == -1) {
      if (parseInt($(".stime").text())>1) {
            $(".stime").text(parseInt($(".stime").text())-1);
            $(".time").text(parseInt($(".stime").text()));
            totalTime-=60;
            currentSession=totalTime;
            bgPos = -265;
            $(".time").text(parseInt($(".stime").text()));
            $(".timer").removeClass("break");
            $(".status").text("Session");
            $(".fill").css("margin-top", bgPos + "px");
      }
    }
  })
  $(".bdown").click(function(){
    if ($(".time").attr('class').indexOf("active") == -1) {
      if (parseInt($(".btime").text())>1) {
        $(".btime").text(parseInt($(".btime").text())-1);
        breakTime-=60;
        currentSession=totalTime;
        bgPos = -265;
        $(".timer").removeClass("break");
        $(".status").text("Session");
        $(".fill").css("margin-top", bgPos + "px");
      }
    }
  })


  $(".timer").click(function(){
    if ($(".time").attr('class').indexOf("active") == -1 && currentSession===0) {
      currentSession=totalTime;
      $(".time").text(num2time(currentSession));
    }
    $(".time").toggleClass("active");
    $(".status").toggleClass("astatus");
    //$(".fill").css("margin-top","-265px");
    fillIncrements = 285/totalTime;
  });
  
  var timer = window.setInterval(function () {
    if ($(".time").attr('class').indexOf("active") > -1 && currentSession > 0) {
      currentSession-=1;
      $(".active").text(num2time(currentSession));
      bgPos -= fillIncrements;
      $(".fill").css("margin-top", bgPos + "px");
      
    } else if ($(".time").attr('class').indexOf("active") > -1 && currentSession == 0) {     
      alert.play();
      if ($(".timer").attr('class').indexOf("break") > -1) {
        currentSession=totalTime;
        fillIncrements = 285/totalTime;
      } else {
        currentSession=breakTime;
        fillIncrements = 285/currentSession;
      }
        $(".timer").toggleClass("break");
      
      if ($(".status").text()=="Session") {
        $(".status").text("Break");
      } else {
        $(".status").text("Session");
      }
      $(".active").text(num2time(currentSession));
      bgPos = bgOrig;
      $(".fill").css("margin-top", bgPos + "px");
    }
  }, 1000);
  
  function num2time(time) {
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;
    var str="";
    if (minutes > 0) {
      if (seconds < 10) {
          str= minutes.toString() + ":0" + seconds.toString();      
      } else {
        str= minutes.toString() + ":" + seconds.toString();
      }
    } else {
      return seconds;
    }
    return str;
  }
  

  
  
  
})