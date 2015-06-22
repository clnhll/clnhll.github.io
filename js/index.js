var counter=0;
var colors=['rgb(256,140,150)','#f0ad4e'];
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