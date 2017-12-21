// Enemies our player must avoid

var Enemy = function(x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';

  //Initializing x and y coordinates
  this.x = x;
  this.y = y;

  //Initializing speed of the enemies
  this.speed = Math.floor((Math.random() * 200) + 100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if (this.x <= 505) { //canvas.width = 505
    this.x = this.x + this.speed * dt;
  } else {
    this.x = -10;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-horn-girl.png'; //Adding player image

  //Putting player position coordinates on the screen
  this.x = 300;
  this.y = 400;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

  // Prevent player from going out of canvas
  var playerCheck = this;

  //Up movement
  if (this.pressedKey === 'up' && this.y > 0) {
    this.y = this.y - 90;
  }
  if (this.pressedKey === 'keyW' && this.y > 0) {
    this.y = this.y - 90;
  }

  //Down movement
  if (this.pressedKey === 'down' && this.y < 400) {
    this.y = this.y + 90;
  }
  if (this.pressedKey === 'keyS' && this.y < 400) {
    this.y = this.y + 90;
  }

  //Left movement
  if (this.pressedKey === 'left' && this.x > 0) {
    this.x = this.x - 100;
  }
  if (this.pressedKey === 'keyA' && this.y > 0) {
    this.x = this.x - 100;
  }

  //Right movement
  if (this.pressedKey === 'right' && this.x < 400) {
    this.x = this.x + 100;
  }
  if (this.pressedKey === 'keyD' && this.x < 400) {
    this.x = this.x + 100;
  }

//Movement of player - one spot at a time
  this.pressedKey = null;

  //Reset position
  if (this.y < 0) {
    this.reset();
  }

  // Now instantiate your objects.
  // Place all enemy objects in an array called allEnemies
  // Place the player object in a variable called player

  allEnemies.forEach(function(enemy) {
    if (playerCheck.x >= enemy.x - 25 && playerCheck.x <= enemy.x + 25) {
      if (playerCheck.y >= enemy.y - 25 && playerCheck.y <= enemy.y + 25) {
        playerCheck.reset();
      }
    }
  });
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y); // draws image
};

//Handling input
Player.prototype.handleInput = function(e) {
  this.pressedKey = e;
};

Player.prototype.reset = function() {
  //On collision puts player back to original location
  this.x = 300;
  this.y = 400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

// Position "y" where the enemies will are created
(function displayEnemies() {
  allEnemies.push(new Enemy(0, 60)); //Enemy 1 with coordinates
  allEnemies.push(new Enemy(0, 140)); //Enemy 2 with coordinates
  allEnemies.push(new Enemy(0, 230)); //Enemy 3 with coordinates
}());

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    38: 'up',
    87: 'keyW',
    37: 'left',
    65: 'keyA',
    39: 'right',
    68: 'keyD',
    40: 'down',
    83: 'keyS'

  };

  player.handleInput(allowedKeys[e.keyCode]);
});
