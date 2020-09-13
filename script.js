/* global collideRectRect, frameRate, noFill, round, sqrt, windowWidth, windowHeight, keyCode, keyIsDown, keyIsPressed, SHIFT, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, collideRectCircle, collideCircleCircle, random, mouseIsPressed, clear, textSize, createCanvas, strokeWeight, rect, background, colorMode, HSB, noStroke, backgroundColor, color, fill, ellipse, text, stroke, line, width, height, mouseX, mouseY */

let backgroundColor, playerSnake, currentApple, score;

function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  frameRate(12); //b/c don't want as smooth and want to be able to control
  playerSnake = new Snake();
  currentApple = new Apple();
  score = 0;
}

function draw() {
  background(backgroundColor);
  // The snake performs the following four methods:
  playerSnake.moveSelf();
  playerSnake.showSelf();
  playerSnake.checkCollisions();
  playerSnake.checkApples();
  // The apple needs fewer methods to show up on screen.
  currentApple.showSelf();
  // We put the score in its own function for readability.
  displayScore();
}

function displayScore() {
  fill(0);
  text(`Score: ${score}`, 20, 20);
  noFill();
}

class Snake {
  constructor() {
    this.size = 10;
    this.x = width / 2;
    this.y = height - 10;
    this.direction = "N";
    this.speed = 12;
  }

  moveSelf() {
    if (this.direction === "N") {
      this.y -= this.speed;
    } else if (this.direction === "S") {
      this.y += this.speed;
    } else if (this.direction === "E") {
      this.x += this.speed;
    } else if (this.direction === "W") {
      this.x -= this.speed;
    } else {
      console.log("Error: invalid direction");
    }
  }

  showSelf() {
    stroke(240, 100, 100);
    noFill();
    rect(this.x, this.y, this.size, this.size);
    noStroke();
  }

  checkApples() {
    //see if we're colliding with an apple
    let hit = collideRectRect(
      this.x,
      this.y,
      this.size,
      this.size,
      currentApple.x,
      currentApple.y,
      currentApple.size,
      currentApple.size
    );

    //increment the score
    if (hit) {
      score++;

      //make a new random apple
      currentApple = new Apple();
      
      //extend the tail
    }
  }

  checkCollisions() {}

  extendTail() {
    this.tail.push(new TailSegment(this.x, this.y));
  }
}

class TailSegment{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.size = 10;
    this.color = color(240, 100, 100); //to do: make snake colorful
  }
  
  showSelf(){
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
    noFill();
  }
}
class Apple {
  constructor() {
    this.size = 10;
    this.x = random(width - 10);
    this.y = random(height - 10);
    this.color = color(0, 80, 80);
  }

  showSelf() {
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
    noFill();
  }
}

function keyPressed() {
  console.log("key pressed: ", keyCode);
  if (keyCode === UP_ARROW && playerSnake.direction != "S") {
    playerSnake.direction = "N";
  } else if (keyCode === DOWN_ARROW && playerSnake.direction != "N") {
    playerSnake.direction = "S";
  } else if (keyCode === RIGHT_ARROW && playerSnake.direction != "W") {
    playerSnake.direction = "E";
  } else if (keyCode === LEFT_ARROW && playerSnake.direction != "E") {
    playerSnake.direction = "W";
  } else if(keyCode === SHIFT){
    playerSnake.extendTail();
  }else {
    console.log("wrong key");
  }
}

function restartGame() {}

function gameOver() {}
