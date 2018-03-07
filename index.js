function getDataFromWU(query) {}

function getDataFromIG(query) {}

function renderWeather() {}

function renderPosts() {}

function displayWeather() {}

function displayPosts() {}

function displaySearchLocation() {}

function watchSubmit() {
	$('.js-search-form').submit(function(event) {
		event.preventDefault();
		const queryTarget = $(event.currentTarget).find('.js-query');
		const query = queryTarget.val();
		queryTarget.val("");
		getDataFromWU(query, displayWeather);
		getDataFromIG(query, displayPosts);
	});
}

$(watchSubmit);