var counter=0;
var colors=['#f0ad4e','rgb(256,140,150)'];
function changeColor(){
  if (counter>colors.length-1) 
  {counter=0;}
  less.modifyVars({
      '@accent': colors[counter]   
    });
  counter++; 
  less.refreshStyles();
  console.log(counter);
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}