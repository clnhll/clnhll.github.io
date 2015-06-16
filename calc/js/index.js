$(document).ready(function(){
  var a = "";
  var b = "";
  var operation = "";
  var justSolved = false;


  $(".num").click(function() {
    if (justSolved) {
      $(".screen").text("0");
      a="";
      justSolved=false;
    }
    if ($(this).attr('id')!=='=') {
      justSolved = false;
    }
    if (operation == "") {
      a+=$(this).attr('id');
      $(".screen").text(a);
      
    } else {
      b+=$(this).attr('id');
      $(".screen").text(b);
    }  
  });
  $(".op").click(function() {
    if (a !== "" && b == "") {
      operation=$(this).attr('id');
      $(".screen").text('0');
      justSolved=false;
    } 
    if (a !== "" && b !== "" && operation !=="") {
      var sol = eval(parseFloat(a),parseFloat(b),operation);
      $(".screen").text(sol);
      a=sol.toString();
      operation=$(this).attr('id');
      b="";
    }
  });
  
  $(".ac").click(function() {
    operation="";
    a="";
    b="";
    $(".screen").text('0');
  });
  $(".ce").click(function() {
    if (operation!=="") {
      b="";
      $(".screen").text('0');
    } 
    else {
      a="";
      $(".screen").text('0');
    }
    
  });
  $(".dec").click(function() {
    if (operation=="" && a.indexOf(".")==-1) {
      a+=".";
      $(".screen").text(a);
    } else if (operation!=="" && b.indexOf(".")==-1) {
      b+=".";
      $(".screen").text();
    }
  });
  
 
  
  $(".eq").click(function() {
    if (a!=="" && b!== "" && operation!=="") {
      var sol = eval(parseFloat(a),parseFloat(b),operation);
      $(".screen").text(sol);
      a=sol.toString();
      operation="";
      b="";
      justSolved=true;
    }

  })
  
  function eval(a, b, operation) {
    switch(operation) {
      case '+': 
        return a+b;
        break;
      case 'div': 
        return a/b;
        break;
      case('-'):
        return a-b;
        break;
      case('x'):
        return a*b;
        break;
      case('mod'):
        return a%b;
        break;
    }
  }
  
  
  
})