function updateTimer(deadline){
	var time = deadline - new Date();//new Date gets created every time we call this function so, every second
	return {//returns an object from this function to the startTimer function
		'days': Math.floor(time/(1000*60*60*24)),//floor never rounds up, always down
		'hours': Math.floor((time/(1000*60*60)) % 24),//4.2 = 4, 4.8 = 4
		'minutes': Math.floor((time/1000/60) % 60),
		'seconds': Math.floor((time/1000) % 60),
		'total': time
	};
}

function animateClock(span){ //takes the span tag that we're adding (which is different every time) and we're giving a class called 'turn'. We're going to use this class for 
	span.className = "turn"; //the CSS animations 
	setTimeout(function(){
		span.className = "";//After 700ms, it calls this bit and it removes that class name
	},700);
}


function startTimer(id, deadline){
	var timerInterval = setInterval(function(){
		var clock = document.getElementById(id);//grabs element and stores a reference to it
		var timer = updateTimer(deadline);


		clock.innerHTML = '<span>' + timer.days + '</span>'
						+ '<span>' + timer.hours + '</span>'
						+ '<span>' + timer.minutes + '</span>'
						+ '<span>' + timer.seconds + '</span>';


		//animating the cards!
		var spans = clock.getElementsByTagName("span");//grabs the span above ^ because they've been injected into the clock 
		animateClock(spans[3]);
		if(timer.seconds == 59) animateClock(spans[2]);//animate the clock when it reaches the last second
		if(timer.minutes == 59 && timer.seconds == 59) animateClock(spans[1]);
		if(timer.hours == 23 && timer.minutes == 50 && timer.seconds == 59) animateClock(spans[0]);				

		//we have to check for the end of the timer!
		if(timer.total < 1){
			clearInterval(timerInterval);
			clock.innerHTML = '<span>0</span><span>0</span><span>0</span><span>0</span><span>TWERK AWAY!</span>';
		}

	}, 1000);//function is fired every 1000ms
}


window.onload = function(){ //when the window loads, fire this function
	var deadline = new Date ("April 1, 2018 01:00:00");
	startTimer("clock", deadline); //"clock" refers to the div of the same name
}