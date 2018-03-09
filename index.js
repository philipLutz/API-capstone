function getDataFromWU() {
	const apiCall = 'http://api.wunderground.com/api/5e8b8ca34238674d/conditions/q/CA/San_Francisco.json'
	$.getJSON()
}

function getDataFromIG() {

}

function renderWeather() {}

function renderPosts() {}

function displayWeather() {}

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