var counter=0;
var colors=['rgb(170,216,176)','rgb(255,204,92)','rgb(140,190,215)'];
colors.push('rgb(256,140,150)');
function changeColor(){
  if (counter>colors.length-1) 
  {counter=0;}
  less.modifyVars({
      '@accent': colors[counter]   
    });
  counter++; 
  less.refreshStyles();
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}