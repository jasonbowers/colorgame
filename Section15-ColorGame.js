var numSquares = 6;
var colors = [];
var pickedColor;
var gameWon = false;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
  setupModeButtons();
  setupSquares();
  setupResetButton();
  reset();
}

function setupModeButtons(){
  for(var i = 0; i < modeButtons.length; i++){
    modeButtons[i].addEventListener("click", function(){
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
      reset();
    });
  }
}

function setupSquares(){
  for(i = 0; i < squares.length; i++){
    //add click listener to squares
    squares[i].addEventListener("click", function(){
      if(gameWon){
        reset();
      }else{
        var clickedColor = this.style.backgroundColor;
        messageDisplay.style.color = clickedColor;
        if(clickedColor === pickedColor){
          //win condition
          messageDisplay.textContent = "Correct!";
          changeColors(clickedColor);
          h1.style.backgroundColor = clickedColor;
          resetButton.textContent = "Play again?";
          gameWon = true;
        }else{
          //lose condition
          this.style.backgroundColor = "#232323";
          messageDisplay.textContent = "Try Again";
        }
      }
    });
  }
}

function setupResetButton(){
  resetButton.addEventListener("click", function(){
    reset();
  });
}

function reset(){
  gameWon = false;
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  messageDisplay.textContent = "";
  resetButton.textContent = "New Colors";
  h1.style.backgroundColor = "steelblue";
  for(var i = 0; i < squares.length; i++){
    if(colors[i]){
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    }else{
      squares[i].style.display = "none";
    }
  }
}

function changeColors(color){
  //change colors of all squares
  for(i = 0; i < squares.length; i++){
    squares[i].style.backgroundColor = color;
  }
}

function pickColor(){
  //pick a random color from 0 to colors length and return the value of that index
  var value = Math.floor(Math.random() * colors.length);
  return colors[value];
}

function generateRandomColors(val){
  var arr = [];
  for(var i = 0; i < val; i++){
    arr[i] = randomColor();
  }
  return arr;
}

function randomColor(){
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);

  return "rgb(" + r + ", " + g + ", " + b + ")";
}
