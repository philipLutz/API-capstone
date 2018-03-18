function getDataFromWU(queryCity, querySC) {
	$.ajax({
		url: `http://api.wunderground.com/api/5e8b8ca34238674d/conditions/q/${querySC}/${queryCity}.json`,
		dataType: 'json',
		success: function(url) {
			if(url['current_observation']){
			console.log(url);
			displayWeather(url);
			displayWeatherIcon(url);
			} else { alert("Error: Invalid location and/or weather information does not exist.  A color scheme may still be generated."); }
		}
	});
}

function getLocationGoogle(queryCity, querySC) {
	const key = 'AIzaSyBVxNqgsyP40WcRQlRW8D4HYyUQFF3D3dc';
	$.ajax({
		url: `https://maps.googleapis.com/maps/api/geocode/json?address=${queryCity},+${querySC}&key=${key}`,
		dataType: 'json',
		success: function(results) {
			console.log(results);
			renderLocationGoogle(results);
		}
	})
}

function renderLocationGoogle(results) {
	const array = Object.values(results);
	const object = array[0];
	const object2 = Object.values(object);
	const latLocation = (object2[0]['geometry']['location']['lat']);
	const longLocation = (object2[0]['geometry']['location']['lng']);
	const latRound = Math.round(latLocation);
	const longRound = Math.round(longLocation);
	createColor(longRound, latRound);
}

function displayWeatherIcon(url) {
	const weatherIconRaw = Object.values(url.current_observation.icon_url);
	const weatherIconString = weatherIconRaw.toString();
	const weatherIcon = weatherIconString.replace(/,\s?/g, "");
	const forecastLinkRaw = Object.values(url.current_observation.forecast_url);
	const forecastLinkString = forecastLinkRaw.toString();
	const forecastLink = forecastLinkString.replace(/,\s?/g, "");

	$('.weather-icon').html(`<a href="${forecastLink}" target="_blank" role="link"><img src="${weatherIcon}" alt="weather icon" role="img"></a>`);
}

function displayWeather(url) {
	const tempRaw = Object.values(url.current_observation.feelslike_string);
	const tempString = tempRaw.toString();
	const temp = tempString.replace(/,\s?/g, "");
	const conditionsRaw = Object.values(url.current_observation.weather);
	const conditionsString = conditionsRaw.toString();
	const conditions = conditionsString.replace(/,\s?/g, "");
	const precipRaw = Object.values(url.current_observation.precip_today_string);
	const precipString = precipRaw.toString();
	const precip = precipString.replace(/,\s?/g, "");
	const windRaw = Object.values(url.current_observation.wind_gust_mph);
	const windString = windRaw.toString();
	const wind = windString.replace(/,\s?/g, "");
	const windDirRaw = Object.values(url.current_observation.wind_dir);
	const windDirString = windDirRaw.toString();
	const windDir = windDirString.replace(/,\s?/g, "");
	const humidityRaw = Object.values(url.current_observation.relative_humidity);
	const humidityString = humidityRaw.toString();
	const humidity = humidityString.replace(/,\s?/g, "");
	const forecastLinkRaw = Object.values(url.current_observation.forecast_url);
	const forecastLinkString = forecastLinkRaw.toString();
	const forecastLink = forecastLinkString.replace(/,\s?/g, "");


	$('.button3').removeAttr('hidden');

	$('.weather-content').html(`
		<div>${conditions}</div>
		<div>Feels like : ${temp}</div>
		<div>Today's Precipitation : ${precip}</div>
		<div>Wind : Up to ${wind}mph from the ${windDir}</div>
		<div>Relative Humidity : ${humidity}</div>
		<div>More details at <a href="${forecastLink}" target="_blank" role="link">Wunderground.com</a></div>
		<a href="${forecastLink}" target="_blank" role="link"><img src="http://icons-ak.wxug.com/graphics/wu2/logo_130x80.png" alt="WU logo" class="WU-logo" role="img"></a>
		`);
}

function createSearchLocation(queryCity, querySC) {
	const location = `${queryCity}, ${querySC}`;
	$('.search-location').html(`<div>${location}</div>`);
}

function createColor(longRound, latRound) {
	function correctSignLong(longRound) {
		if (Math.sign(longRound) === -1) {
			return -longRound;
		}
		else {
			return longRound;
		}
	}

	function correctSignLat(latRound) {
		if (Math.sign(latRound) === -1) {
			return -latRound;
		}
		else {
			return latRound;
		}
	}

	function getRandomInt(min, max) {
  		min = Math.ceil(min);
  		max = Math.floor(max);
  		return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
	}

	const longNum = (correctSignLong(longRound));
	const latNum = (correctSignLat(latRound));
	const randomNum = (getRandomInt(0, 256));
	makeMoreRandom(latNum, longNum, randomNum);
}

function makeMoreRandom(latNum, longNum, randomNum) {
	
	let inputArray = [latNum, longNum, randomNum];

	function pickRandom(inputArray) {
		let ranNum = Math.floor(Math.random() * 3);
		let first = inputArray[ranNum];
		inputArray.splice(ranNum, 1);
		let rAgain = Math.floor(Math.random() * 2);
		let second = inputArray[rAgain];
		inputArray.splice(rAgain, 1);
		let third = inputArray[0];
		let newArray = [first, second, third];
		return newArray;
	}
	const randomizedArray = pickRandom(inputArray)
	const newFirst = randomizedArray[0];
	const newSecond = randomizedArray[1];
	const newThird = randomizedArray[2];
	const randomizedColor = `rgb(${newFirst},${newSecond},${newThird})`;
	getColorScheme(randomizedColor);
}

function getColorScheme(randomizedColor) {
	$.ajax({
		url: `http://thecolorapi.com/scheme?rgb=${randomizedColor}&mode=quad&count=6`,
		dataType: 'jsonp',
		success: function(scheme) {
			console.log(scheme);
			extractColorsFromScheme(scheme);
		}
	})
}

function extractColorsFromScheme(scheme) {
	const array = Object.values(scheme.colors)
	const color0 = (array[0]['hex']['value']);
	const color1 = (array[1]['hex']['value']);
	const color2 = (array[2]['hex']['value']);
	const color3 = (array[3]['hex']['value']);
	const color4 = (array[4]['hex']['value']);
	const color5 = (array[5]['hex']['value']);
	displayCSS(color0, color1, color2, color3, color4, color5);
}

function displayCSS(color0, color1, color2, color3, color4, color5) {
	$(".color0").css("background-color", `${color0}`);
	$(".color1").css("background-color", `${color3}`);
	$(".color2").css("background-color", `${color1}`);
	$(".color3").css("background-color", `${color4}`);
	$(".color4").css("background-color", `${color2}`);
	$(".color5").css("background-color", `${color5}`);
}

function watchSubmit() {
	$('.js-search-form').submit(function(event) {
		event.preventDefault();
		const queryTargetCity = $(event.currentTarget).find('#js-query-city');
		const queryCity = queryTargetCity.val();
		queryTargetCity.val("");
		const queryTargetSC = $(event.currentTarget).find('#js-query-state_country');
		const querySC = queryTargetSC.val();
		queryTargetSC.val("");
		getDataFromWU(queryCity, querySC, displayWeather);
		createSearchLocation(queryCity, querySC);
		getLocationGoogle(queryCity, querySC);
	});
}

$(watchSubmit);