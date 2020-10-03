
//fire.functions().useFunctionsEmulator('http://localhost:5001');
var database = fire.database();
var functions = fire.functions();
var sendMove = functions.httpsCallable('move');

var myTimer = document.getElementById("myTimer");
var opTimer = document.getElementById("opTimer");
var gameState = document.getElementById("gameState");

class ChessGame{
    board = [];
    movable = [];
    selected = null;
    gameOver = -1;
    turn = 1;
    state = "none";
    myUsername ="";
    opUsername ="";

    defaultTime = 10;
    defaultInc = 5;

    
    
    constructor(userId, gameId, player, size, startX, startY, demo){
        this.userId = userId;
        this.gameId = gameId;
        this.player = player;
        this.dem = demo;
        this.pMap = new Map();
        this.createMap();
        this.createBoard();
        this.view = new ChessView(player, size, startX, startY);
        this.logic = new ChessLogic();
        this.clock = new ChessClock(gameId, player, this.defaultTime, this.defaultInc);
        this.updateVisable();
        this.EventListener();
        this.setGlobalGameState();
    }

    setGlobalGameState(){
        if(this.state == "none"){
            gameState.textContent = "Game State: Waiting for other Player...";
        }
        else{
            gameState.textContent = "Game State: " + this.state;
        }
    }

    

    EventListener(){
        myTimer.addEventListener("timeOver", function(e){
            this.gameOverByTime(e.detail.player);
            console.log(e.detail);
        }.bind(this));
        opTimer.addEventListener("timeOver", function(e){
            this.gameOverByTime(e.detail.player);
            console.log(e.detail);
        }.bind(this));
    }

    gameOverByTime(player){
        if(player == "blackTimer"){
            this.gameOver = 5;
        }
        if(player == "whiteTimer"){
            this.gameOver = 4;
        }
        this.state = this.getState();
        console.log(this.getState());
        if(this.state.includes("Time") == true){
            this.sendBoard();
        }
        
    }

    

    resize = function(boardSize){
        this.view.resize(boardSize);
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

    copyBoard(boardF){
        var board = [];
        for(var i = 0; i < 8; i++){
			board[i] = new Array(8);
		}
        for(var row = 0; row < 8; row++){
            for(var col = 0; col < 8; col++){
                board[row][col] = boardF[row][col].figure;
            }
        }
        return board;
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
        var boardN = this.copyBoard(this.board);
        var vis = this.logic.getVisable(boardN, this.player);
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
            var boardN = this.copyBoard(this.board);
            this.movable = this.logic.select(boardN, row , col);
            this.movable.push([row,col]);
        }
        
    }

    deSelect = function(){
        this.selected = null;
        this.movable = [];
    }

    checkQueening = function(row, col){
        console.log(this.board[row][col].figure);
        if(this.board[row][col].figure == 5 && row == 7){
            this.board[row][col].figure = 1;
        }
        if(this.board[row][col].figure == 11 && row == 0){
            this.board[row][col].figure = 7;
        }
    }

    move = function(row, col){
        var fig = this.board[this.selected[0]][this.selected[1]].figure;
        this.board[this.selected[0]][this.selected[1]].figure = null;
        this.board[row][col].figure = fig;
        this.checkQueening(row, col);
        this.deSelect();
        this.updateVisable();
        this.turn++;
        var boardN = this.copyBoard(this.board);
        this.gameOver = this.logic.gameOver(boardN, this.turn);
        if(this.dem){
            this.demo();
        }
        this.sendBoard();
        console.log("move");
        this.clock.press(this.turn);
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

    getState = function(){
        var state = "playing";
        if(this.gameOver == 0 ){
            state = "White Won";
        }
        else if(this.gameOver == 1){
            state = "Black Won";
        }
        else if(this.gameOver == 3 || this.gameOver == 2){
            state = "Draw";
        }
        else if(this.gameOver == 4){
            state = "Black Won by Time";
        }
        else if(this.gameOver == 5){
            state = "White Won by Time";
        }
        return state;
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
        if(this.turn % 2 == this.player && this.state.includes("playing")){
            var playerFigure = this.checkFigure(row, col);
            var inMovable = this.inMovable(row, col);
            var sameFigure = this.isSameFig(row, col);

            if(this.selected == null && playerFigure == this.player){
                console.log("select1");
                this.select(row, col);
            }
            else if((!inMovable && playerFigure != this.player) || sameFigure){
                console.log("deselect");
                this.deSelect();
            }
            else if(playerFigure == this.player && !sameFigure){
                console.log("select2");
                this.select(row, col);
            }
            else if(inMovable){
                console.log("move");
                this.move(row, col); 
            }
        } 
    }

    sendBoard = function(){
        var br = this.boardToString();
        var state = this.getState();
        this.state = state;
        console.log(state);
        sendMove({
			gameId: this.gameId,
			userId: this.userId,
            board: br,
            state: state
		});
    }

    updateBoard = function(br, turn, state){
        this.stringToBoard(br);
        this.updateVisable();
        this.turn = turn;
        this.state = state;
        console.log(state);
        var boardN = this.copyBoard(this.board);
        this.setGlobalGameState();
        if(state.includes("Time")){
            return;
        }
        this.gameOver = this.logic.gameOver(boardN, this.turn);
        console.log(this.gameOver);
        if(this.gameOver == -1){
            this.clock.press(this.turn);
        }
        
    }

    draw = function(){
        this.view.draw(this.movable, this.board);
    }

    
}