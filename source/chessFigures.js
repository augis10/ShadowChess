class Figure {
    static checkSquare = function(Row, Col){
		if(Row >= 0 && Row <= 7 && Col >=0  && Col <= 7){
			return true;
		}
		return false;
    }

    static getOccupation = function(figure){
        if(figure < 6 && figure >= 0){
            return 2; //black
        }
        if(figure >=6 && figure <= 11){
            return 1; //white
        }
        if(figure == null){
            return 0; //empty
        }
        return -1;
    }

    static isEnemy = function(figure, figure2){
        sq1 = this.getOccupation(figure);
        sq2 = this.getOccupation(figure2);
        if(sq2 == 0){
            return 0;// empty
        }
        if(sq1 == sq2){
            return 1;// friendly
        }
        if(sq1 != sq2) {
            return 2;// enemy
        }
        return -1;
    }

    static getMoves = function(moves, board, row, col, visable, movable){
        for(var i = 0; i < moves.length; i++){
            r = row + this.moves[i][0];
            c = col + this.moves[i][1];
            if(this.checkSquare(r,c)){
                visable.push([r,c]);
                if(this.isEnemy(board[row][col], board[r][c]) != 1) {
                    movable.push([r,c]);
                }
                else{
                    break;
                }
            }
            else{
                break;
            } 
        }
    }
}

class Pawn extends Figure {
    up = [[1,0],[2,0]];
    cut = [[1,1],[1,-1]];

    static cutCheck = function(board, row, col, visable, movable){
        for(var i = 0; i < 2; i ++){
            if(board[row][col] == 11){
                r = row + this.cut[i][0] * -1;
            }
            else{
                r = row + this.cut[i][0];
            }
            
            c = col + this.cut[i][1];
            if(this.checkSquare(r,c)){
                visable.push([r,c]);
                if(this.isEnemy(board[row][col], board[r][c]) == 2) {
                    movable.push([r,c]);
                }
            }  
        }
    }

    static upCheck = function(board, row, col, visable, movable){
        if(board[row][col] == 11){
            r = row + this.cut[i][0] * -1;
        }
        else{
            r = row + this.cut[i][0];
        }
        c = col + this.up[0][1];
        if(this.checkSquare(r,c)){
            visable.push([r,c]);
            if(this.isEnemy(board[row][col], board[r][c]) == 0) {
                movable.push([r,c]);
                if(board[row][col] == 11){
                    r = row + this.cut[i][0] * -1;
                }
                else{
                    r = row + this.cut[i][0];
                }
                c = col + this.up[1][1];
                if(this.checkSquare(r,c)){
                    visable.push([r,c]);
                    if(this.isEnemy(board[row][col], board[r][c]) == 0 && (row == 6 || row == 1)) {
                        movable.push([r,c]);
                    }
                }
            }
        }
    }

    static pawnCtr = function(board, row, col, visable, movable){
        if(board[row][col].Figure == 5 || board[row][col].Figure == 11){
            this.upCheck(board, row, col, visable, movable);
            this.cutCheck(board, row, col, visable, movable);
        }
    }
}

class King extends Figure {
    static kingCtr = function(board, row, col, visable, movable){
        mov = [[1,1],[1,0],[1,-1],[0,1],[0,-1],[-1,1],[-1,0],[-1,-1]];

        if(board[row][col] == 0  || board[row][col] == 6){
            for(i = 0; i < this.mov.length; i++){
                r = row + this.mov[i][0];
                c = col + this.mov[i][1];
                if(this.checkSquare(r,c)){
                    visable.push([r,c]);
                    if(this.isEnemy(board[row][col], board[r][c]) != 1) {
                        movable.push([r,c]);
                    }
                }    
            }
        }
    }
}

class Queen extends Figure {
    downRight = [[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7]];
    downLeft = [[1,-1],[2,-2],[3,-3],[4,-4],[5,-5],[6,-6],[7,-7]];
    upRight = [[-1,1],[-2,2],[-3,3],[-4,4],[-5,5],[-6,6],[-7,7]];
    upLeft = [[-1,-1],[-2,-2],[-3,-3],[-4,-4],[-5,-5],[-6,-6],[-7,-7]];
    down = [[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0]];
    up = [[-1,0],[-2,0],[-3,0],[-4,0],[-5,0],[-6,0],[-7,0]];
    right = [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7]];
    left = [[0,-1],[0,-2],[0,-3],[0,-4],[0,-5],[0,-6],[0,-7]];

    static queenCtr = function(board, row, col, visable, movable){
        if(board[row][col] == 1  || board[row][col] == 7){
            this.getMoves(this.down, board, row, col, visable, movable);
            this.getMoves(this.up, board, row, col, visable, movable);
            this.getMoves(this.right, board, row, col, visable, movable);
            this.getMoves(this.left, board, row, col, visable, movable);
            this.getMoves(this.downRight, board, row, col, visable, movable);
            this.getMoves(this.downLeft, board, row, col, visable, movable);
            this.getMoves(this.upRight, board, row, col, visable, movable);
            this.getMoves(this.upLeft, board, row, col, visable, movable);
        }
    }
}

class Rook extends Figure {
    down = [[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0]];
    up = [[-1,0],[-2,0],[-3,0],[-4,0],[-5,0],[-6,0],[-7,0]];
    right = [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7]];
    left = [[0,-1],[0,-2],[0,-3],[0,-4],[0,-5],[0,-6],[0,-7]];

    static rookCtr = function(board, row, col, visable, movable){
        if(board[row][col] == 2  || board[row][col] == 8){
            this.getMoves(this.down, board, row, col, visable, movable);
            this.getMoves(this.up, board, row, col, visable, movable);
            this.getMoves(this.right, board, row, col, visable, movable);
            this.getMoves(this.left, board, row, col, visable, movable);
        }
    }
}
class Knight extends Figure {
    mov = [[1,2],[2,1],[2,-1],[1,-2],[-1,2],[-2,1],[-2,-1],[-1,-2]];

    static knightCtr = function(board, row, col, visable, movable){
        if(board[row][col] == 4  || board[row][col] == 10){
            for(i = 0; i < this.mov.length; i++){
                r = row + this.mov[i][0];
                c = col + this.mov[i][1];
                if(this.checkSquare(r,c)){
                    visable.push([r,c]);
                    if(this.isEnemy(board[row][col], board[r][c]) != 1) {
                        movable.push([r,c]);
                    }
                }    
            }
        }
    }
}

class Bishop extends Figure {
    downRight = [[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7]];
    downLeft = [[1,-1],[2,-2],[3,-3],[4,-4],[5,-5],[6,-6],[7,-7]];
    upRight = [[-1,1],[-2,2],[-3,3],[-4,4],[-5,5],[-6,6],[-7,7]];
    upLeft = [[-1,-1],[-2,-2],[-3,-3],[-4,-4],[-5,-5],[-6,-6],[-7,-7]];

    static bishopCtr = function(board, row, col, visable, movable){
        if(board[row][col] == 3  || board[row][col] == 9){
            this.getMoves(this.downRight, board, row, col, visable, movable);
            this.getMoves(this.downLeft, board, row, col, visable, movable);
            this.getMoves(this.upRight, board, row, col, visable, movable);
            this.getMoves(this.upLeft, board, row, col, visable, movable);
        }
    }
}

