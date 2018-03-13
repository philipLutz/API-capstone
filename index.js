function getDataFromWU(queryCity, querySC) {
	$.ajax({
		url: `http://api.wunderground.com/api/5e8b8ca34238674d/conditions/q/${querySC}/${queryCity}.json`,
		dataType: 'json',
		success: function(url) {
			console.log(url);
			displayWeather(url);
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

function renderWeather() {
}

function displayWeather(url) {
	const tempRaw = Object.values(url.current_observation.temperature_string);
	const tempString = tempRaw.toString();
	const temp = tempString.replace(/,\s?/g, "");
	$('.weather-content').html(`<section>${temp}</section>`);
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
	//I could make this more random by making the placement of the numbers in the RGB random
	const colorRGB = `rgb(${latNum},${longNum},${randomNum})`;
	getColorScheme(colorRGB);
}

function getColorScheme(colorRGB) {
	$.ajax({
		url: `http://thecolorapi.com/scheme?rgb=${colorRGB}&mode=analogic&count=6`,
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
	$(".color1").css("background-color", `${color1}`);
	$(".color2").css("background-color", `${color2}`);
	$(".color3").css("background-color", `${color3}`);
	$(".color4").css("background-color", `${color4}`);
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