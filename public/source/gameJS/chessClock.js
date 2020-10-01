var database = fire.database();
var functions = fire.functions();
var getClock = functions.httpsCallable('getClock');
var setTimer = functions.httpsCallable('setTimer');

timeToStr = function(timeMs){
    var minutes = (timeMs / 60) | 0;
    var seconds = (timeMs % 60) | 0;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    var display = minutes + ":" + seconds;
    return display;
}

class Timer{
    
    
    
    constructor(gameId, duration, increment, timerE, playerN){
        this.timer = null;
        this.diff = -1;
        this.player = playerN;
        this.gameId = gameId;
        this.increment = increment;
        this.diff = duration;
        this.duration = duration;
        this.startG = Date.now();
        this.timerE = document.getElementById(timerE);
        this.display = timeToStr(this.duration);
        this.changeTime();
        console.log(this.player +"");
    }

    start = function(){
        this.startG = Date.now();
        console.log(this.player +"s1");
        if(this.timer == null){
            console.log(this.player +"s2");
            this.timer = setInterval(this.tick.bind(this), 1000);
        }
        
    }

    stop = function(){
        console.log(this.player +"t1");
        if(this.timer != null){
            console.log(this.player +"t2");
            clearInterval(this.timer);  
        }
        
        this.timer = null;
        if(this.diff > 0){
            this.duration = this.diff + this.increment;
        }
        else {
            this.duration = this.diff;
        }
        this.duration = this.diff + this.increment;
        this.display = timeToStr(this.duration);
        this.changeTime();
        this.setTime(this.duration);
    }

    changeTime = function(){
        this.timerE.textContent = this.display;
    }

    setTime(diff){
        setTimer({
            gameId: this.gameId,
            player: this.player,
            time: diff
        });
    }

    

    tick(){
        this.diff = this.duration - (((Date.now() - this.startG) / 1000) | 0);

        //this.display = timeToStr(this.diff);

        if (this.diff <= 0) {
            this.diff = 0;
            this.increment = 0;
            this.stop();
            this.dispatch();
            return;
        }
        this.display = timeToStr(this.diff);
        console.log(this.display);
        this.changeTime();
        this.setTime(this.diff);
    }

    dispatch(){
        var event = new CustomEvent("timeOver", {
            detail: {
              player: this.player
            }
        });

        this.timerE.dispatchEvent(event);
    }




    
}

class ChessClock{

    constructor(gameId, player, duration, increment){
        this.actOnce = 0;
        this.gameId = gameId;
        this.player = player;
        this.turn = 1;
        this.myClock;
        this.oppClock;
        var self = this;
        getClock({
            gameId: this.gameId,
            blackTimer: duration,
            whiteTimer: duration,
            increment: increment
        }).then(function(result){
            console.log(result.data);
            if(player == 1){
                self.myClock = new Timer(gameId, result.data.whiteTimer, result.data.increment, "myTimer", "whiteTimer");
                self.oppClock = new Timer(gameId, result.data.blackTimer, result.data.increment, "opTimer", "blackTimer");
            }
            else{
                self.myClock = new Timer(gameId, result.data.blackTimer, result.data.increment, "myTimer", "blackTimer");
                self.oppClock = new Timer(gameId, result.data.whiteTimer, result.data.increment, "opTimer", "whiteTimer");
            }
            if(self.actOnce != 0){
                self.press(self.actOnce);
            }
        });
        
    }

    press(turn){
        if(this.myClock == null || this.oppClock == null){
            
            this.actOnce = turn;
            return;
        }
        console.log("1");
        if(turn > this.turn){
            this.turn = turn;
            if(turn % 2 == this.player){
                if(this.myClock.diff > 0 && this.oppClock.diff > 0){
                    this.myClock.start();
                }
                if(this.oppClock.timer != null){
                    this.oppClock.stop();
                }
            }
            else{
                if(this.oppClock.diff > 0 && this.myClock.diff > 0){
                    this.oppClock.start();
                }
                if(this.myClock.timer != null){
                    this.myClock.stop();
                }
            }
            
        }
    }

    

}