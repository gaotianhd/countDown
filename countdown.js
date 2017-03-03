var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

const endTime = new Date(2017,2,5,18,47,52);
// var curShowTimeSeconds = 0;
var curTime = new Date();
var curHours = curTime.getHours();
var curMinutes = curTime.getMinutes();
var curSeconds = curTime.getSeconds();

var balls = [];
const colors = [
  "#33b5e5",
  "#0099cc",
  "#ac6",
  "#93c",
  "#9c0",
  "#690",
  "#fb3",
  "#f80",
  "#f44",
  "#c00"
];

window.onload = function(){

  WINDOW_WIDTH = document.body.clientWidth;
  WINDOW_HEIGHT = document.body.clientHeight;

  MARGIN_LEFT = Math.round( WINDOW_WIDTH / 10 );
  RADIUS = Math.round( WINDOW_WIDTH * 4 / 5 / 108 ) - 1;

  MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);



  var canvas = document.getElementById('canvas');
  canvas.width = WINDOW_WIDTH;
  canvas.height = WINDOW_HEIGHT;

  var context = canvas.getContext('2d');
  // curShowTimeSeconds = getCurrentShowTimeSeconds();
  window.onresize = function(){

    WINDOW_WIDTH = document.body.clientWidth;
    WINDOW_HEIGHT = document.body.clientHeight;

    MARGIN_LEFT = Math.round( WINDOW_WIDTH / 10 );
    RADIUS = Math.round( WINDOW_WIDTH * 4 / 5 / 108 ) - 1;

    MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);
    context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
  }
  setInterval(
    function(){
      render(context);
      update();
    }
    ,
    50
  );
}

function update(){
  var nextShowTimeSeconds = new Date();
  var nextHours = nextShowTimeSeconds.getHours();
  var nextMinutes = nextShowTimeSeconds.getMinutes();
  var nextSeconds = nextShowTimeSeconds.getSeconds();

  if(nextSeconds != curSeconds){

    if( parseInt(curHours/10) != parseInt(nextHours/10) ){
        addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(nextHours/10) );
    }
    if( parseInt(curHours%10) != parseInt(nextHours%10) ){
        addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(nextHours/10) );
    }

    if( parseInt(curMinutes/10) != parseInt(nextMinutes/10) ){
        addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(nextMinutes/10) );
    }
    if( parseInt(curMinutes%10) != parseInt(nextMinutes%10) ){
        addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(nextMinutes%10) );
    }

    if( parseInt(curSeconds/10) != parseInt(nextSeconds/10) ){
        addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(nextSeconds/10) );
    }
    if( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
        addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(nextSeconds%10) );
    }
    // curShowTimeSeconds = nextShowTimeSeconds;
    curHours = nextHours;
    curMinutes = nextMinutes;
    curSeconds = nextSeconds;
  }
  updateBalls();
}

function updateBalls(){
  for(var i = 0; i < balls.length; i++){
    balls[i].x += balls[i].vx;
    balls[i].y += balls[i].vy;
    balls[i].vy += balls[i].g;

    if(balls[i].y >= canvas.height - RADIUS){
      balls[i].y = canvas.height - RADIUS;
      balls[i].vy = -balls[i].vy*0.75;
    }
  }

  var cnt = 0;
  for(var i = 0; i < balls.length; i++){
    if(balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH);
      balls[cnt++] = balls[i];
  }
  while(balls.length > cnt){
    balls.pop();
  }
}

function addBalls(x,y,num){
  for(var i = 0; i < digit[num].length; i++){
    for(var j = 0; j < digit[num][i].length; j++){
      if(digit[num][i][j] == 1){
        var aBall = {
          x: x+j*2*(RADIUS+1)+(RADIUS+1),
          y: y+i*2*(RADIUS+1)+(RADIUS+1),
          g: 1.5+Math.random(),
          vx: Math.pow(-1,Math.ceil(Math.random()*1000)) * 4,
          vy: -5,
          color: colors[Math.floor(Math.random()*colors.length)]
        };
        balls.push(aBall);
      }
    }
  }
}

function render(ctx){

  ctx.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
  var curShowTimeSeconds = new Date();
  var hours = curShowTimeSeconds.getHours();
  var minutes = curShowTimeSeconds.getMinutes();
  var seconds = curShowTimeSeconds.getSeconds();

  renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),ctx);
  renderDigit(MARGIN_LEFT + 15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),ctx);
  renderDigit(MARGIN_LEFT + 30*(RADIUS+1),MARGIN_TOP,10,ctx);
  renderDigit(MARGIN_LEFT + 39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),ctx);
  renderDigit(MARGIN_LEFT + 54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),ctx);
  renderDigit(MARGIN_LEFT + 69*(RADIUS+1),MARGIN_TOP,10,ctx);
  renderDigit(MARGIN_LEFT + 78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),ctx);
  renderDigit(MARGIN_LEFT + 93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),ctx);

  for(var i = 0; i < balls.length; i++){
    ctx.fillStyle = balls[i].color;

    ctx.beginPath();
    ctx.arc(balls[i].x , balls[i].y , RADIUS , 0 , 2*Math.PI , true);
    ctx.closePath();

    ctx.fill();
  }
}

function renderDigit(x,y,num,ctx){
  ctx.fillStyle = "rgb(0,102,153)";
  for(var i = 0; i < digit[num].length; i++){
    for(var j = 0; j < digit[num][i].length; j++){
      if(digit[num][i][j] == 1){
        ctx.beginPath();
        ctx.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI);
        ctx.closePath();

        ctx.fill();
      }
    }
  }
}
