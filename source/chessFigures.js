class figure {
    static checkSquare = function(Row, Col){
		if(Row >= 0 && Row <= 7 && Col >=0  && Col <= 7){
			return true;
		}
		return false;
    }

    static getOccupation = function(board, row, col){
        if(board[row][col].figure < 6 || board[row][col].figure >= 0){
            return 1; //black
        }
        if(board[row][col].figure >=6 || board[row][col].figure <= 11){
            return 2; //white
        }
        if(board[row][col].figure == null){
            return 0; //empty
        }
        return -1;
    }

    static isEnemy = function(board, row1, col1, row2, col2){
        sq1 = this.getOccupation(board, row1, col1);
        sq2 = this.getOccupation(board, row2, col2);
        if(sq2 == 0){
            return 0;// empty
        }
        if(sq1 = sq2){
            return 1;// friendly
        }
        else {
            return 2;// enemy
        }
    }
}

class pawn extends figure {
    up = [[1,0],[2,0]];
    cut = [[1,1],[1,-1]];
}

class king extends figure {
    moves = [[1,1],[1,0],[1,-1],[0,1],[0,-1],[-1,1],[-1,0],[-1,-1]];
}

class queen extends figure {
    downRight = [[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7]];
    downLeft = [[1,-1],[2,-2],[3,-3],[4,-4],[5,-5],[6,-6],[7,-7]];
    upRight = [[-1,1],[-2,2],[-3,3],[-4,4],[-5,5],[-6,6],[-7,7]];
    upLeft = [[-1,-1],[-2,-2],[-3,-3],[-4,-4],[-5,-5],[-6,-6],[-7,-7]];
    down = [[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0]];
    up = [[-1,0],[-2,0],[-3,0],[-4,0],[-5,0],[-6,0],[-7,0]];
    right = [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7]];
    left = [[0,-1],[0,-2],[0,-3],[0,-4],[0,-5],[0,-6],[0,-7]];
}

class rook extends figure {
    down = [[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0]];
    up = [[-1,0],[-2,0],[-3,0],[-4,0],[-5,0],[-6,0],[-7,0]];
    right = [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7]];
    left = [[0,-1],[0,-2],[0,-3],[0,-4],[0,-5],[0,-6],[0,-7]];
}
class knight extends figure {
    moves = [[1,2],[2,1],[2,-1],[1,-2],[-1,2],[-2,1],[-2,-1],[-1,-2]];
    static visable = [];
    static movable = [];
    
    static knightCtr(board, row, col){
        this.visable = [];
        this.movable = [];
        if(board[row][col].figure == 4 ){
            for(i = 0; i < moves.length; i++){
                r = row + mov[i][0];
                c = col + mov[i][1];
                if(this.checkSquare(r,c)){
                    visable.push([r,c]);
                    switch(this.isEnemy(board, row, col, r, c)) {
                        case 1: // friend
                            break;
                        case 2: // enemy
                            movable.push([r,c]);
                            break;
                        case 0: // empty
                            movable.push([r,c]);
                            break;
                    }
                }    
            }
        }
    }
}

class bishop extends figure {
    downRight = [[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7]];
    downLeft = [[1,-1],[2,-2],[3,-3],[4,-4],[5,-5],[6,-6],[7,-7]];
    upRight = [[-1,1],[-2,2],[-3,3],[-4,4],[-5,5],[-6,6],[-7,7]];
    upLeft = [[-1,-1],[-2,-2],[-3,-3],[-4,-4],[-5,-5],[-6,-6],[-7,-7]];
}

