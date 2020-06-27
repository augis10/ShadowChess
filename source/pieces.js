// Sotilas
function Pawn(square,col) {
 this.x = square.x+25;
  this.y = square.y+25;
  this.col = col;
  
  this.show = function() {
   push();
    if(this.col==1) {
      stroke(255);
    fill(0);
    } else {
      stroke(0);
      fill(255);
    }
    ellipse(this.x,this.y,30);
    pop();
  }
}

// Torni
function Rook(square,col) {
 this.x = square.x+25;
  this.y = square.y+25;
  this.col = col;
  
  this.show = function() {
   push();
    if(this.col==1) {
      stroke(255);
    fill(0);
    } else {
      stroke(0);
      fill(255);
    }
    ellipse(this.x,this.y,30);
    pop();
  }
}

// Ratsu
function Knight(square,col) {
 this.x = square.x+25;
  this.y = square.y+25;
  this.col = col;
  
  this.show = function() {
   push();
    if(this.col==1) {
      stroke(255);
    fill(0);
    } else {
      stroke(0);
      fill(255);
    }
    ellipse(this.x,this.y,30);
    pop();
  }
}

// Lähetti
function Bishop(square,col) {
 this.x = square.x+25;
  this.y = square.y+25;
  this.col = col;
  
  this.show = function() {
   push();
    if(this.col==1) {
      stroke(255);
    fill(0);
    } else {
      stroke(0);
      fill(255);
    }
    ellipse(this.x,this.y,30);
    pop();
  }
}

// Kuningatar
function Queen(square,col) {
 this.x = square.x+25;
  this.y = square.y+25;
  this.col = col;
  
  this.show = function() {
   push();
    if(this.col==1) {
      stroke(255);
    fill(0);
    } else {
      stroke(0);
      fill(255);
    }
    ellipse(this.x,this.y,30);
    pop();
  }
}
// Kuningas
function King(square,col) {
 this.x = square.x+25;
  this.y = square.y+25;
  this.col = col;
  
  this.show = function() {
   push();
    if(this.col==1) {
      stroke(255);
    fill(0);
    } else {
      stroke(0);
      fill(255);
    }
    ellipse(this.x,this.y,30);
    pop();
  }
}