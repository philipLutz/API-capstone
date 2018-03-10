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

function getDataFromIG() {

}

function renderWeather() {
}

function renderPosts() {}

function displayWeather(url) {
	const tempRaw = Object.values(url.current_observation.temperature_string);
	const tempString = tempRaw.toString();
	const temp = tempString.replace(/,\s?/g, "");
	$('.weather-content').html(`<section>${temp}</section>`);
}

function displayPosts() {}

function createSearchLocation(queryCity, querySC) {
	const location = `${queryCity}, ${querySC}`;
	$('.search-location').html(`<div>${location}</div>`);
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
		getDataFromIG(queryCity, querySC, displayPosts);
		createSearchLocation(queryCity, querySC);
	});
}

$(watchSubmit);