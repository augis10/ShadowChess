
const myTimer = document.getElementById("myTimer");
const opTimer = document.getElementById("opTimer");


timeToStr = function(timeMs){
    var minutes = (timeMs / 60) | 0;
    var seconds = (timeMs % 60) | 0;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    var display = minutes + ":" + seconds;
    return display;
}

class timer{
    
    timer;
    diff;
    
    constructor(duration, increment, timerE){
        this.increment = increment;
        this.diff = duration;
        this.duration = duration;
        this.startG = Date.now();
        this.timerE = document.getElementById(timerE);
        this.display = timeToStr(this.duration);
        this.changeTime();
    }

    start = function(){
        this.startG = Date.now();
        this.timer = setInterval(this.tick.bind(this), 1000);
    }

    stop = function(){
        clearInterval(this.timer);
        this.duration = this.diff + this.increment;
        this.display = timeToStr(this.duration);
        this.changeTime();
    }

    changeTime = function(){
        this.timerE.textContent = this.display;
    }

    

    tick(){
        console.log(this.diff);
        console.log(this.duration);
        this.diff = this.duration - (((Date.now() - this.startG) / 1000) | 0);

        this.display = timeToStr(this.diff);

        if (this.diff <= 0) {
            this.startG = Date.now() + 1000;
        }
        console.log(this.diff);
        console.log(this.duration);
        this.changeTime();
    }


    
}

class ChessClock{

    constructor(player, duration, increment){
        this.player = player;
        this.turn = 1;
        this.myClock = new timer(duration, increment, "myTimer");
        this.oppClock = new timer(duration, increment, "opTimer");
    }

    press = function(turn){
        if(turn > this.turn){
            this.turn = turn;
            if(this.turn % 2 == this.player){
                
                this.myClock.start();
                this.oppClock.stop();
            }
            else{
                this.oppClock.start();
                this.myClock.stop();
            }
            
        }
    }
}