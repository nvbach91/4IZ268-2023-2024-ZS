
const appContainer = $('#app');


const weightInLabel = $('<label>Weight in kg:</label>');
const weightInput = $('<input type="number" class="grid-item"  name="weight" min="40" max="130" step="1" placeholder="kg" />');
$(weightInput).keypress(function (evt) {
	evt.preventDefault();
});
const heightInLabel = $('<label>Height in cm:</label>');
const heightInput = $('<input type="number" class="grid-item"  name="height" min="150" max="200" step="1" placeholder="cm"  />');
$(heightInput).keypress(function (evt) {
	evt.preventDefault();
});
const genderDecs = $('<p >Gender: </p><br>')
const genderInputMale = $('<label>Male</label><input type="radio" name="radio" id="radioMale" value="Male" placeholder="checked" />')
const genderInputFemale = $('<label>Female</label><input type="radio" name="radio" id="radioFemale" value="Female" placeholder="checked"/>')
const ageInLabel = $('<label>Age in years:</label>');
const ageInput = $('<input type="number" class="grid-item"  name="age" min="0" max="80" step="1" placeholder="years"  />');
$(ageInput).keypress(function (evt) {
	evt.preventDefault();
});
const spin = $(`<div class = "spinner"></div>`);

const activitySelect = $(`<select id = 'levelSelect' title='Select your actvity level:' ></select>`);
const actvityInLabel = $('<label>Please select your activity level:</label>')


var levels = ["Sedentary: little or no exercise",
	"Exercise 1-3 times/week", "Exercise 4-5 times/week",
	"Daily exercise or intense exercise 3-4 times/week",
	"Intense exercise 6-7 times/week",
	"Very intense exercise daily, or physical job"];

const levelOptions = levels.map((level) => {
	return `<option>${level}</option>`;
});


activitySelect.append(levelOptions.join(''));






const AllDesc = $('<p><strong>If you changed any information in the form, please click on the Calculate All button, in order to get accurate results.</strong></p>');

const AllSubmitButton = $('<button type="button" title="Calculate all fitness values.">');
AllSubmitButton.text('Calculate all');

const BMIsubmitButton = $('<button type="button" title="Calculate BMI.">');
BMIsubmitButton.text('Calculate BMI');
const BMIOutput = $('<p id=BMIOutput>');

const IWsubmitButton = $('<button type="button" title="Calculate ideal weight.">');
IWsubmitButton.text('Calculate ideal weight');

const calorieSubmitButton = $('<button  type="button" title="Calculate daily recomended calorie intake.">');
calorieSubmitButton.text('Calculate daily recomended calorie intake');


const grid = $('<form class="grid-container">');
const formLabel = $('<label><strong>Before submitting, make sure all inputs fields are filled.</strong></label>')




grid.append(weightInLabel, weightInput, heightInLabel, heightInput, ageInLabel, ageInput, genderDecs, genderInputMale, genderInputFemale, actvityInLabel, activitySelect)

const leftContainer = $('<div class="leftPart">');
const rightContainer = $('<div class="rightPart">');
const statusOutput = $('<p id="status">');
const idealweightOutput = $('<p id="idealWeight">');
const calorieOutput = $('<p id="calorieOutput">');

leftContainer.append(formLabel, grid, BMIsubmitButton, BMIOutput, IWsubmitButton, idealweightOutput, AllDesc, AllSubmitButton);
rightContainer.append(calorieSubmitButton, calorieOutput, statusOutput);

const summary = $('<p>');

appContainer.append(leftContainer, rightContainer);


window.onload = function () {

	// Check for LocalStorage support.
	if (localStorage) {
		var weight = localStorage.getItem('weight');
		var height = localStorage.getItem('height');
		var age = localStorage.getItem('age');
		var gender = localStorage.getItem('gender');
		var level = localStorage.getItem('level');

		if (weight != "undefined" || weight != "null") { // kdyz neco je v local storage

			weightInput.prop("value", weight);
		}
		if (height != "undefined" || height != "null") { // kdyz neco je v local storage

			heightInput.prop("value", height);
		}
		if (age != "undefined" || age != "null") { // kdyz neco je v local storage

			ageInput.prop("value", age);
		}
		if (gender != "undefined" || gender != "null") { // kdyz neco je v local storage

			if (gender == "male") {
				genderInputMale.prop("checked", true);
			}
			genderInputFemale.prop("checked", true);
		}
		if (level != "undefined" || level != "null") { // kdyz neco je v local storage

			if (level == "level_1") {
				activitySelect.val("Sedentary: little or no exercise").change();
			}
			if (level == "level_2") {
				activitySelect.val("Exercise 1-3 times/week").change();
			}
			if (level == "level_3") {
				activitySelect.val("Exercise 4-5 times/week").change();
			}
			if (level == "level_4") {
				activitySelect.val("Daily exercise or intense exercise 3-4 times/week").change();
			}
			if (level == "level_5") {
				activitySelect.val("Intense exercise 6-7 times/week").change();
			}
			if (level == "level_6") {
				activitySelect.val("Very intense exercise daily, or physical job").change();
			}

		}


	};

}



const getLevel = () => {
	if ($(activitySelect).val() == "Sedentary: little or no exercise") {
		var level = 'level_1';
	}
	else if ($(activitySelect).val() == "Exercise 1-3 times/week") {
		var level = 'level_2';
	}
	else if ($(activitySelect).val() == "Exercise 4-5 times/week") {
		var level = 'level_3';
	}
	else if ($(activitySelect).val() == "Daily exercise or intense exercise 3-4 times/week") {
		var level = "level_4";
	}
	else if ($(activitySelect).val() == "Intense exercise 6-7 times/week") {
		var level = "level_5";
	}
	else if ($(activitySelect).val() == "Very intense exercise daily, or physical job") {
		var level = "level_6";
	}
	return level
}





const getGender = () => {

	if ($("#radioMale").is(":checked")
	) {
		var gender = "male";
	}
	else {
		gender = "female";
	}
	return gender;
}

const getValues = () => {

	var weightLS = localStorage.getItem('weight');
	var weight = weightLS;

	var weightIN = weightInput.val();
	weightIN = Math.floor(weightIN);


	if (weightLS !== weightIN) {
		weight = weightIN;   //update the value

	}

	localStorage.setItem('weight', weight);  //update the local storege



	var heightLS = localStorage.getItem('height');
	var height = heightLS;
	var heightIN = heightInput.val();

	heightIN = Math.floor(heightIN);

	if (heightLS !== heightIN) {
		height = heightIN;   //update the value

	}

	localStorage.setItem('height', height);  //update the local storege



	var ageLS = localStorage.getItem('age');
	var age = ageLS;
	var ageIN = ageInput.val();

	heightIN = Math.floor(ageIN);
	if (ageLS !== ageIN) {
		age = ageIN;   //update the value

	}
	localStorage.setItem('age', age);  //update the local storege



	var genderLS = localStorage.getItem('gender');
	var gender = genderLS;
	var genderIN = getGender();

	if (genderLS !== genderIN) {
		gender = genderIN;   //update the value

	}
	localStorage.setItem('gender', gender);  //update the local storege



	var levelLS = localStorage.getItem('level');
	var level = levelLS;
	var levelIN = getLevel();

	if (levelLS !== levelIN) {
		level = levelIN;   //update the value

	}
	localStorage.setItem('level', level);  //update the local storege



	// return as an array
	return [weight, height, age, gender, level];
}



const getBMI = () => {

	var inputs = getValues();
	var weight = inputs[0];
	var height = inputs[1];
	var age = inputs[2];


	if (weight == 'null' || weight == 'undefined' || height == 'null' || height == 'undefined' || age == 'null' || age == 'undefined') {
		alert('please fill out the form');
		return;

	}
	else {
		leftContainer.append(spin);
	}





	//deletion of datapoint in case of new data submittion

	d3.selectAll('circle').remove();

	const urlBMI = `https://fitness-calculator.p.rapidapi.com/bmi?age=${age}&weight=${weight}&height=${height}`;
	const settings = {
		async: true,
		crossDomain: true,
		url: urlBMI,
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '1cd0ac31c3mshb7b6fbabf077865p10f3acjsnab6c136ff942',
			'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
		}
	};

	$.ajax(settings).done(function (response) {
		spin.remove();
		$("#BMIOutput").html(`
		
	<div>
	<p> Your BMI is:  ${response.data.bmi}.</p>
	</div>
	`);
		$("#status").html(`
		
	<div>
	<p> Your overall health status is: <strong> ${response.data.health}.</strong></p>
	</div>
	`);
	});

	//determine the coordinates on the chart 
	var corX = (((height - 150) / 50) * 501);
	var corY = 310 - ((weight / 130) * 310);
	var margin = 10;

	//display datapoint
	tempCircle = svg.append("circle")
		.attr("transform", function () {
			return "translate(" + margin + "," + margin + ")";

		})
		.attr("cx", corX)
		.attr("cy", corY)
		.attr("fill", "black")
		.attr("r", 5);
}

const getIdealWeight = () => {
	var inputs = getValues();
	if (inputs == 'null' || inputs == 'undefined') {
		alert('please fill out the form');
	}
	else {
		leftContainer.append(spin);
	}

	var weight = inputs[0];
	var height = inputs[1];
	var gender = inputs[3];

	const urlIW = `https://fitness-calculator.p.rapidapi.com/idealweight?gender=${gender}&height=${height}`;

	const settings = {
		async: true,
		crossDomain: true,
		url: urlIW,
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '1cd0ac31c3mshb7b6fbabf077865p10f3acjsnab6c136ff942',
			'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
		}
	};

	$.ajax(settings).done(function (response) {

		spin.remove();
		var calculatedWeight = response.data.Devine;
		var diff = calculatedWeight - weight;
		diff = diff.toFixed(2);


		if (diff > 0) {
			$("#idealWeight").html(`

			<div>
			<p> Your ideal weight is:  ${response.data.Devine} kg, which is ${diff} kg more than your current weight. </p>
			</div>
			`);
		}
		else if (diff <= 0) {
			$("#idealWeight").html(`
			<div>
			<p>  Your ideal weight is: ${response.data.Devine} kg, which is ${Math.abs(diff)} kg less than your current weight. </p>
			</div>
			`);
		}
	});
}


const getCalories = () => {


	var inputs = getValues();

	if (inputs == 'null' || inputs == 'undefined') {
		alert('please fill out the form');
	}
	else {
		leftContainer.append(spin);
	}

	var weight = inputs[0];
	var height = inputs[1];
	var age = inputs[2];
	var gender = inputs[3];
	var level = inputs[4];




	urlCalories = `https://fitness-calculator.p.rapidapi.com/dailycalorie?age=${age}&gender=${gender}&height=${height}&weight=${weight}&activitylevel=${level}`;
	const settings = {
		async: true,
		crossDomain: true,
		url: urlCalories,
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '1cd0ac31c3mshb7b6fbabf077865p10f3acjsnab6c136ff942',
			'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
		}
	};

	$.ajax(settings).done(function (response) {

		spin.remove();
		var calories = response.data.goals['maintain weight'].toFixed(2);



		$("#calorieOutput").html(`
		
			<div>
			
			<p> Your recomended daily intake of calories is:  ${calories} kcal. </p>
			<p> Your basic metabolic rate is:  ${response.data.BMR} kcal. </p>
			</div>
			`);

	});
}



// calling API

BMIsubmitButton.on('click', (e) => {
	getBMI();

});

IWsubmitButton.on('click', (e) => {
	getIdealWeight();

});

calorieSubmitButton.on('click', (e) => {
	getCalories();
});

AllSubmitButton.on('click', (e) => {
	getBMI();
	getIdealWeight();
	getCalories();


});


//BMI chart 


var legend = d3.select("#app").append("svg");
var height = 300, width = 150
legend.append("rect").attr("x", 40).attr("y", 30).attr("width", 10).attr("height", 10).style("fill", "LightCoral")
legend.append("rect").attr("x", 40).attr("y", 60).attr("width", 10).attr("height", 10).style("fill", "gold")
legend.append("rect").attr("x", 40).attr("y", 90).attr("width", 10).attr("height", 10).style("fill", "Chartreuse")
legend.append("rect").attr("x", 40).attr("y", 120).attr("width", 10).attr("height", 10).style("fill", "LightSkyBlue")
legend.append("text").attr("x", 60).attr("y", 40).text("obese").style("font-size", "15px").attr("alignment-baseline", "end")
legend.append("text").attr("x", 60).attr("y", 70).text("overweight").style("font-size", "15px").attr("alignment-baseline", "end")
legend.append("text").attr("x", 60).attr("y", 100).text("normal weight").style("font-size", "15px").attr("alignment-baseline", "end")
legend.append("text").attr("x", 60).attr("y", 130).text("underweight").style("font-size", "15px").attr("alignment-baseline", "end")





var data = [{
	height: 150, underweight: 44, normal: 14,
	overweight: 10, obese: 62
},
{
	height: 160, underweight: 48, normal: 16,
	overweight: 14, obese: 52
},
{
	height: 170, underweight: 53, normal: 20,
	overweight: 15, obese: 42
},
{
	height: 180, underweight: 60, normal: 21,
	overweight: 16, obese: 33
},
{
	height: 190, underweight: 68, normal: 22,
	overweight: 19, obese: 21
},
{
	height: 200, underweight: 73, normal: 27,
	overweight: 20, obese: 10
}];

var width = 600, height = 400, spacing = 90;
var margin = { top: 40, right: 40, bottom: 40, left: 40 }


var xScale = d3.scaleLinear()
	.domain([d3.min(data, function (d) {
		return d.height;
	}), d3.max(data, function (d) { return d.height; })])
	.range([0, width - spacing]);


var yScale = d3.scaleLinear()
	.range([height - spacing, 0]);



var svg = d3.select("#app").append("svg")
	.attr("width", width).attr("height", height)
	.append("g").attr("transform", "translate(" +
		spacing / 2 + "," + spacing / 2 + ")");

svg.append("g")
	.attr("transform", "translate(0," + (height - spacing)
		+ ") ")

	.call(d3.axisBottom(xScale).ticks(12).tickFormat(d3.format("d")));


var stack = d3.stack().keys(["underweight", "normal",
	"overweight", "obese"]);
var colors = ["LightSkyBlue", "Chartreuse", "gold", "LightCoral"];
var stackedData = stack(data);




yScale.domain([0, 130]);

svg.append("g")
	.call(d3.axisLeft(yScale))

var area = d3.area()
	.x(function (d) { return xScale(d.data.height); })
	.y0(function (d) { return yScale(d[0]); })
	.y1(function (d) { return yScale(d[1]); });
var series = svg.selectAll("g.series")
	.data(stackedData)
	.enter().append("g")
	.attr("class", "series");





svg.append("text")
	.attr("transform", "translate(" + (width / 2) + " ," + (height - 55) + ")")
	.style("text-anchor", "end")
	.text("Height in cm");


svg.append("text")
	.attr("transform", "rotate(-90)")
	.attr("x", -(height / 2))
	.attr("y", -25)
	.style("text-anchor", "begginning")
	.text("Weight in kg");



series.append("path")
	.style("fill", function (d, i) { return colors[i]; })
	.attr("d", function (d) { return area(d); });





