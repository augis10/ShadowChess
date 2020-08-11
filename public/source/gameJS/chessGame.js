
//fire.functions().useFunctionsEmulator('http://localhost:5001');
var database = fire.database();
var functions = fire.functions();
var sendMove = functions.httpsCallable('move');


class ChessGame{
    board = [];
    movable = [];
    selected = null;
    gameOver = -1;
    turn = 1;
    
    constructor(userId, gameId, player, size, startX, startY, demo){
        this.userId = userId;
        this.gameId = gameId;
        this.player = player;
        this.dem = demo;
        this.pMap = new Map();
        this.createMap();
        this.createBoard();
        this.initBoardFigures();
        this.view = new ChessView(player, size, startX, startY);
        this.logic = new ChessLogic();
        this.updateVisable();
    }
    createMap = function(){
        var pieces = ['k','q','r','b','n','p','K','Q','R','B','N','P'];
        for(var i = 0; i < 12; i++){
            this.pMap.set(pieces[i], i);
        }
    }

    boardToString = function(){
        var pieces = ['k','q','r','b','n','p','K','Q','R','B','N','P'];
        var sb = "";
        for(var row = 0; row < 8; row++){
            for(var col = 0; col < 8; col++){
                var p = this.board[row][col].figure;
                if(p != null){
                    sb = sb + pieces[p];
                }
                else{
                    sb = sb + "0";
                }
            }
        }
        return sb;
    }

    stringToBoard = function(sb){
        for(var row = 0; row < 8; row++){
            for(var col = 0; col < 8; col++){
                var s = sb[col+row*8];
                if(s == 0){
                    this.board[row][col].figure = null;
                }
                else{
                    this.board[row][col].figure = this.pMap.get(s);
                }
            }
        }
    }


    createBoard = function(){
		for(var i = 0; i < 8; i++){
			this.board[i] = new Array(8);
		}
		for(var row = 0; row < 8; row++) {
			for(var col = 0; col < 8; col++) {
				this.board[row][col] = new Square();
			}
		}
    }

    initBoardFigures = function(){
        var initRow1 = [2,4,3,1,0,3,4,2];
        var initRow2 = [8,10,9,7,6,9,10,8];
		for(var i = 0; i < 8; i++){
			this.board[0][i].figure = initRow1[i];
			this.board[1][i].figure = 5;
			this.board[7][i].figure = initRow2[i];
			this.board[6][i].figure = 11;
		}
    }
    resetVisable = function(){
        for(var row = 0; row < 8; row++){
            for(var col = 0; col < 8; col++){
                this.board[row][col].blackVisable = false;
                this.board[row][col].whiteVisable = false;
                if(Figure.getOccupation(this.board[row][col].figure) == 0){
                    this.board[row][col].blackVisable = true;
                }
                if(Figure.getOccupation(this.board[row][col].figure) == 1){
                    this.board[row][col].whiteVisable = true;
                }
            }
        }
    }

    updateVisable = function(){
        this.resetVisable();
        var vis = this.logic.getVisable(this.board, this.player);
        for(var i = 0; i < vis.length; i++){
            if(this.player == 0){
                this.board[vis[i][0]][vis[i][1]].blackVisable = true;
            }
            else if(this.player == 1) {
                this.board[vis[i][0]][vis[i][1]].whiteVisable = true;
            }
        }
    }

    checkInput = function(row, col){
        if((row < 8 && row >= 0 && col < 8 && col >= 0)){
            return true;
        }
        return false;
    }

    checkFigure = function(row, col){
        if(this.board[row][col].figure != null){
            if(this.board[row][col].figure >= 0 && this.board[row][col].figure < 6){
                return 0;
            }
            if(this.board[row][col].figure >= 6 && this.board[row][col].figure <=11){
                return 1;
            }
        }
        
        return null;
    }

    inMovable = function(row, col){
        for(var i = 0; i < this.movable.length; i++){
            if(this.movable[i][0] == row && this.movable[i][1] == col){
                return true;
            }
        }
        return false;
    }

    isSameFig = function(row, col){
        if(this.selected != null){
            if(this.selected[0] == row && this.selected[1] == col){
                return true;
            }
        }
        return false;
    }

    select = function(row, col){
        if(this.checkFigure(row, col) == this.player){
            this.selected = [row, col];
            this.movable = this.logic.select(this.board, row , col);
            this.movable.push([row,col]);
        }
        
    }

    deSelect = function(){
        this.selected = null;
        this.movable = [];
    }

    move = function(row, col){
        var fig = this.board[this.selected[0]][this.selected[1]].figure;
        this.board[this.selected[0]][this.selected[1]].figure = null;
        this.board[row][col].figure = fig;
        this.deSelect();
        //this.turn++;
        //this.gameOver = this.logic.gameOver(this.board, this.turn);
        
        if(this.dem){
            this.demo();
        }
        //this.updateVisable();
        this.sendBoard();
    }

    demo = function(){
        if(this.player == 1){
            this.player = 0;
            this.view.player = 0;
        }
        else {
            this.player = 1;
            this.view.player = 1;
        }
    }

    input = function(row, col){
        if(!this.checkInput(row, col)){
            return;
        }
        if(this.player == 0){
            row = 7-row;
            col = 7-col;
        }
        if(this.gameOver != -1 || this.turn % 2 != this.player){
            return;
        }
        if(this.turn % 2 == this.player){
            if(this.selected == null && this.checkFigure(row, col) == this.player){
                this.select(row, col);
            }
            else if((!this.inMovable(row, col) && this.checkFigure(row, col) != this.player) || this.isSameFig(row, col)){
                this.deSelect();
            }
            else if(this.checkFigure(row, col) == this.player && !this.isSameFig(row, col)){
                this.select(row, col);
            }
            else if(this.inMovable(row, col)){
                console.log("move");
                this.move(row, col); 
            }
        }
        
    }
    sendBoard = function(){
        var br = this.boardToString();
        sendMove({
			gameId: this.gameId,
			userId: this.userId,
            board: br
		});
    }

    listenChange = function(br, turn){
            this.stringToBoard(br);
            this.updateVisable();
            this.turn = turn;
            this.gameOver = this.logic.gameOver(this.board, this.turn);
            console.log("here");
    }

    draw = function(){
        this.view.draw(this.movable, this.board);
        
    }
}