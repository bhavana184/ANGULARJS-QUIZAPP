var app = angular.module("myApp",[]);
var index;
var counter;
var score=0;
var questions=[];

var ques_receiver = randomques();
questions[0]={
				question : ques_receiver[0],
			//  imgSrc : "img/html.png",
				choiceA : ques_receiver[1][0],//ques_receiver[2],//ques_receiver[1][0],
				choiceB : ques_receiver[1][1],
				choiceC : ques_receiver[1][2],
				choiceD : ques_receiver[1][3],
				correct : ques_receiver[2]
		};
var ques_receiver = randomques();
questions[1]={
					question : ques_receiver[0],
					//imgSrc : "img/css.png",
					choiceA : ques_receiver[1][0],
					choiceB : ques_receiver[1][1],//ques_receiver[2],//ques_receiver[1][1],
					choiceC : ques_receiver[1][2],
					choiceD : ques_receiver[1][3],
					correct : ques_receiver[2]
			};
var ques_receiver = randomques();
questions[2]={
	question : ques_receiver[0],
//  imgSrc : "img/js.png",
	choiceA : ques_receiver[1][0],
	choiceB : ques_receiver[1][1],
	choiceC : ques_receiver[1][2],//ques_receiver[2],//
	choiceD : ques_receiver[1][3],
	correct : ques_receiver[2]
};

app.controller("quizctrl",['$scope','$interval',function($scope,$interval){
	$scope.myscore=0;
	$scope.qno=1;
	$scope.startQuiz = function(){
		// console.log("hello");
		$scope.showStart = false;
		$scope.showQuiz = true;
		setQues($scope,0);
		// $scope.question = "What is ur name?"
		$scope.timer_sec = 15;
		startTimer();
	}
	function startTimer(){
		// console.log("$scope.timer_sec",$scope.timer_sec);
		counter = $interval(timer, 1000);
		function timer(){
			$scope.timer_sec -=1;
			console.log("$scope.timer_sec",$scope.timer_sec);

			if($scope.timer_sec ==0){
				$interval.cancel(counter);
				$scope.showQuiz = false;
				$scope.gameOver = true;
				console.log("dhdjfg");
			}
		}
	}

	$scope.checkAnswer = function(answer,index){
		console.log("index",index, answer);
		console.log("questions[index].correct",questions[index].correct);
	    if( answer == questions[index].correct){
				index+=1;score++;
				$scope.myscore=score;
				if(index <3){
					setQues($scope,index);
				}else{
					$interval.cancel(counter);
					$scope.showQuiz = false;
					$scope.resultShow = true;
					showLeaderBoard();
				}
	    }else{
				$interval.cancel(counter);
				$scope.showQuiz = false;
				$scope.gameOver = true;
	    }
	}

	function showLeaderBoard(){
		$scope.showWinner = true;
		var t3=15 - $scope.timer_sec;//store time of current user "YOU"
		// alert(t3);


		var maximum=14;
		var minimum=1;
		var t2 = parseFloat(((Math.random() * (maximum - minimum + 1)) + minimum).toFixed(2));
		var t1 = parseFloat(((Math.random() * (maximum - minimum + 1)) + minimum).toFixed(2));

		//maximum=0.15;
		//minimum=t3;
		var t4 = parseFloat(((Math.random() * (maximum - minimum + 1)) + minimum).toFixed(2));
		var t5 = parseFloat(((Math.random() * (maximum - minimum + 1)) + minimum).toFixed(2));
		var t6 = parseFloat(((Math.random() * (maximum - minimum + 1)) + minimum).toFixed(2));

		var ut1= document.getElementById("user1_t1");
		var ut2=  document.getElementById("user2_t2");
		var ut3=  document.getElementById("user3_t3");
		var ut4=  document.getElementById("user4_t4");
		var ut5=  document.getElementById("user5_t5");
		var ut6= document.getElementById("user6_t6");
		ut1=t1;
		ut2=t2;
		ut3=t3;
		ut4=t4;
		ut5=t5;
		ut6=t6;

		var un1= document.getElementById("user1_name");
		var un2= document.getElementById("user2_name");
		var un3= document.getElementById("user3_name");
		var un4= document.getElementById("user4_name");
		var un5= document.getElementById("user5_name");
		var un6= document.getElementById("user6_name");
		un1="User1";
		un2="User2";
		un3="YOU";
		un4="User4";
		un5="User5"
		un6="User6";

		function sortByTime(arr) {
			arr.sort((a, b) => a.time - b.time);
		}

		var obj1 =  { name: un1, time: ut1};
		var obj2 =  { name: un2, time: ut2};
		var obj3 =  { name: un3, time: ut3};
		var obj4 =  { name: un4, time: ut4};
		var obj5 =  { name: un5, time: ut5};
		var obj6 =  { name: un6, time: ut6};
		var obj_arr = [ obj1,obj2,obj3,obj4,obj5,obj6];
		sortByTime(obj_arr);

		$scope.results = obj_arr;

		$scope.showWinner = function(){
			$scope.resultShow = false;
			$scope.showWinner = true;
			$scope.showCongrats = true;
			$scope.winner = obj_arr[0];


		}

		//alert(obj_arr[0].name);

		//TRAVERSE THOUGH EACH USER ID ELEMENT IN results.html
		// for(var i=0;i<6;i++){
		// 	document.getElementById("user"+(i+1)+"_t"+(i+1)).innerHTML=obj_arr[i].time + " secs";
		// }
		//TRAVERSE THOUGH EACH USER NAME ELEMENT IN results.html
		// for(var i=0;i<6;i++){
		// document.getElementById("user"+(i+1)+"_name").innerHTML=obj_arr[i].name;
		// }
	}



}])



function randomques(){
	var int1=Math.floor(Math.random()*10)-1;
  var int2=Math.floor(Math.random()*10)-1;

  var operators = ['+','-','*','/'];
  op=operators[Math.floor(Math.random()*4)];

  var ques=""+int1 + " " + op + " " + int2 + " = ? ";
  var qanswer = eval(int1 + op + int2);
  qanswer=parseFloat(qanswer.toFixed(2));

  // opt1=Math.floor(Math.random()*10)-1;
  // opt2=Math.floor(Math.random()*10)-1;
  // opt3=qanswer;
  // opt4=Math.floor(Math.random()*10)-1;
	opt1=qanswer+1;
  opt2=qanswer-1;
  opt3=qanswer;
  opt4=qanswer+5;
  var options =[opt1,opt2,opt3,opt4]; //for shuffling options each time
  options.sort(() => Math.random() - 0.5);//shuffle array
  var option_array=[options[0],options[1],options[2],options[3]];

  return [ques, option_array,qanswer];

}

function setQues($scope,index){
	$scope.qno=index+1;
	$scope.Ques = questions[index].question;
	$scope.Options = [questions[index].choiceA,questions[index].choiceB,questions[index].choiceC,questions[index].choiceD ];
	$scope.indexing = index;
}

// checkAnwer



// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
    quiz.style.display = "none";
    gameoverDiv.style.display = "block";
}

/*
// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");//time
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const resultDiv = document.getElementById("resultContainer");
const gameoverDiv = document.getElementById("gameoverContainer");


function randomques(){
	var int1=Math.floor(Math.random()*10)-1;
  var int2=Math.floor(Math.random()*10)-1;

  var operators = ['+','-','*','/'];
  op=operators[Math.floor(Math.random()*4)];

  var ques=""+int1 + " " + op + " " + int2 + " = ? ";
  var qanswer = eval(int1 + op + int2);
  qanswer=parseFloat(qanswer.toFixed(2));

  opt1=Math.floor(Math.random()*10)-1;
  opt2=Math.floor(Math.random()*10)-1;
  opt3=qanswer;
  opt4=Math.floor(Math.random()*10)-1;
  var options =[opt1,opt2,opt3,opt4]; //for shuffling options each time
  options.sort(() => Math.random() - 0.5);//shuffle array
  var option_array=[options[0],options[1],options[2],options[3]];

  return [ques, option_array,qanswer];

}

var questions=[];
// var ques_receiver = randomques();
// alert("question: "+ques_receiver[0]+" option1: "+ques_receiver[1]+" answer: "+ques_receiver[2]);
// alert("option1: "+ques_receiver[1][0] +" option2: "+ques_receiver[1][1]+"option3: "+ques_receiver[1][2]+"option4: "+ques_receiver[1][3])
var ques_receiver = randomques();
questions[0]={
        question : ques_receiver[0],
      //  imgSrc : "img/html.png",
        choiceA : ques_receiver[2],//ques_receiver[1][0],
        choiceB : ques_receiver[1][1],
        choiceC : ques_receiver[1][2],
        choiceD : ques_receiver[1][3],
        correct : "A"
    };
var ques_receiver = randomques();
questions[1]={
          question : ques_receiver[0],
          //imgSrc : "img/css.png",
          choiceA : ques_receiver[1][0],
          choiceB : ques_receiver[2],//ques_receiver[1][1],
          choiceC : ques_receiver[1][2],
          choiceD : ques_receiver[1][3],
          correct : "B"
      };
var ques_receiver = randomques();
questions[2]={
          question : ques_receiver[0],
        //  imgSrc : "img/js.png",
          choiceA : ques_receiver[1][0],
          choiceB : ques_receiver[1][1],
          choiceC : ques_receiver[2],//ques_receiver[1][2],
          choiceD : ques_receiver[1][3],
          correct : "C"
      };
//questions[0]={ques:ques_receiver[0],options:ques_receiver[1],ans:ques_receiver[2]};
// console.log("questions: "+questions)
// console.log("questions[0]: "+questions[0].options[0]);
//
// ques_receiver = randomques();
// questions[1]={ques:ques_receiver[0],options:ques_receiver[1],ans:ques_receiver[2]};
//
// ques_receiver = randomques();
// questions[2]={ques:ques_receiver[0],options:ques_receiver[1],ans:ques_receiver[2]};
// console.log(questions.length);
// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 15; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];

    question.innerHTML = "<p>"+ q.question +"</p>";
    // qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
    //console.log("watch TIMER:"+TIMER);
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
      console.log("count inside if renderCounter: "+count)
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
          console.log("count inside else renderCounter: "+count)
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            console.log("TIMER inside renderCounter: "+TIMER)
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    // count = 0;//to have common counter for all questions
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        console.log("TIMER inside renderCounter: "+TIMER)

        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
    quiz.style.display = "none";
    gameoverDiv.style.display = "block";
}

// score render
function scoreRender(){
    quiz.style.display = "none";
    resultDiv.style.display = "block";

  var t3=counter.innerText;//store time of current user "YOU"
	alert(t3);

  var maximum=14;
  var minimum=1;
  var t2 = parseFloat(((Math.random() * (maximum - minimum + 1)) + minimum).toFixed(2));
  var t1 = parseFloat(((Math.random() * (maximum - minimum + 1)) + minimum).toFixed(2));

  //maximum=0.15;
  //minimum=t3;
  var t4 = parseFloat(((Math.random() * (maximum - minimum + 1)) + minimum).toFixed(2));
  var t5 = parseFloat(((Math.random() * (maximum - minimum + 1)) + minimum).toFixed(2));
  var t6 = parseFloat(((Math.random() * (maximum - minimum + 1)) + minimum).toFixed(2));

	var ut1= document.getElementById("user1_t1");
  var ut2=  document.getElementById("user2_t2");
  var ut3=  document.getElementById("user3_t3");
  var ut4=  document.getElementById("user4_t4");
  var ut5=  document.getElementById("user5_t5");
  var ut6= document.getElementById("user6_t6");
  ut1=t1;
  ut2=t2;
  ut3=t3;
  ut4=t4;
  ut5=t5;
  ut6=t6;

  var un1= document.getElementById("user1_name");
  var un2= document.getElementById("user2_name");
  var un3= document.getElementById("user3_name");
  var un4= document.getElementById("user4_name");
  var un5= document.getElementById("user5_name");
  var un6= document.getElementById("user6_name");
  un1="User1";
  un2="User2";
  un3="YOU";
  un4="User4";
  un5="User5"
  un6="User6";

  function sortByTime(arr) {
    arr.sort((a, b) => a.time - b.time);
  }

  var obj1 =  { name: un1, time: ut1};
  var obj2 =  { name: un2, time: ut2};
  var obj3 =  { name: un3, time: ut3};
  var obj4 =  { name: un4, time: ut4};
  var obj5 =  { name: un5, time: ut5};
  var obj6 =  { name: un6, time: ut6};
  var obj_arr = [ obj1,obj2,obj3,obj4,obj5,obj6];
  sortByTime(obj_arr);
  //alert(obj_arr[0].name);

  //TRAVERSE THOUGH EACH USER ID ELEMENT IN results.html
  for(var i=0;i<6;i++){
    document.getElementById("user"+(i+1)+"_t"+(i+1)).innerHTML=obj_arr[i].time + " secs";
  }
  //TRAVERSE THOUGH EACH USER NAME ELEMENT IN results.html
  for(var i=0;i<6;i++){
  document.getElementById("user"+(i+1)+"_name").innerHTML=obj_arr[i].name;
  }
/*
  scoreDiv.style.display = "block";
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);

    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";

    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";

}
*/
