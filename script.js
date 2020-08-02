function playSound(file) {

	var audio1 = new Audio(file);
	audio1.play();

}

function settings_clicked(){
	
	document.getElementById("settings").style.display = "block";
	document.getElementById("menu").style.display = "none";
	document.getElementById("time_passed").style.display = "none";
	document.getElementById("status").style.display = "none";
	document.getElementById("Headline").style.display = "none";

	console.log("yes")

}

function darkmode(){
	document.getElementById("darkmode").style.display = "none";
	document.getElementById("time_passed").style.color = "black";
	document.getElementById("status").style.color = "black";
	document.getElementById("brightmode").style.display = "block";
}

function brightmode(){
	document.getElementById("darkmode").style.display = "block";
	document.getElementById("time_passed").style.color = "white";
		document.getElementById("status").style.color = "white";
	document.getElementById("brightmode").style.display = "none";
}




function apply_settings(){
	document.getElementById("settings").style.display = "none";
	document.getElementById("menu").style.display = "block";
	document.getElementById("time_passed").style.display = "block";
	document.getElementById("status").style.display = "block";
	document.getElementById("Headline").style.display = "block";

}

function secondsToOutputFormat(seconds) {

	minutes = 0

	while (seconds >= 60)
		{ minutes +=1 
	      seconds -=60
		}

	if (seconds<10) {seconds="0"+seconds}
	output = minutes+":"+seconds

	return output

}


function printStatus(message){

	document.getElementById("status").innerHTML = message
}

function run_session(){
	document.getElementById("Headline").style.color = "black";
	document.getElementById("button_1").style.display = "none";
	document.getElementById("button_2").style.display = "none";
	brightmode()

	playSound("sounds/ticktock.wav")
	
	duration_total_session = document.getElementById("duration_total_session").value*60;
	global_passed_time = 0
	duration_phase_current = 3
	duration_phase_1 = document.getElementById("duration_phase_1").value*60;
	duration_phase_2 = document.getElementById("duration_phase_2").value*60;
	duration_phase_3 = 2

	current_phase = 1
	duration_phase_current = duration_phase_1
	global_timestamp = new Date()

	run_current_phase()

	function run_current_phase() {
		time_left_phase = duration_phase_current
		phase_timestamp = new Date()


			var run_phase = setInterval(function(){
				printStatus("Phase "+current_phase)
				timedelta = 10
				var current_timestamp = new Date()
				var timedelta = Math.round((current_timestamp-phase_timestamp)/1000)
				var time_left_phase = duration_phase_current-timedelta


				document.getElementById("time_passed").innerHTML = secondsToOutputFormat(global_passed_time+1);
			//	document.getElementById("time_left").innerHTML = (global_passed_time-duration_total_session)*(-1);

				
				console.log("vergangene zeit: ",timedelta,"time_left_phase: ", time_left_phase,
							"phase:",current_phase, 
							"duration_phase",duration_phase_current,
							"global_passed_time=",global_passed_time)

				global_passed_time +=1
				
				if (global_passed_time == duration_total_session) {

				clearInterval(run_phase)
				playSound("sounds/finish.wav")
				printStatus("&nbsp")
				document.getElementById("time_passed").innerHTML = "Done!"
				document.getElementById("time_left").innerHTML = "&nbsp"



				return

				}

				if (time_left_phase<=0){

					clearInterval(run_phase);

					if (current_phase == 1) {current_phase =2 ;duration_phase_current = duration_phase_2
					}
					else {					 current_phase =1; duration_phase_current = duration_phase_1}
					playSound("sounds/switch.wav")

					//if (global_passed_time <= duration_total_session){
					run_current_phase()
				
					 }

			

				

			},1000);

		}

	

}












