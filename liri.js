var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var keys = require('./keys.js');
var fs = require('fs');

var keyArray = keys.twitterKeys;

var params = process.argv;
var command = params[2];
var search = params[3];
console.log('command ' + command);
console.log('search ' + search);

switch(command) {
	case 'my-tweets':
		console.log('my-tweets called');
		twitter_search();
		break;
	case 'spotify-this-song':
		spotify_search(search);
		break;
	case 'movie-this':
		omdb_search(search);
		break;
	case 'do-what-it-says':

		break;
	default:
		console.log('Invalid input');
		break;
}

function twitter_search() {
	console.log('twitter_search called');
	var client = new Twitter({
		consumer_key: keyArray.consumer_key,
		consumer_secret: keyArray.consumer_secret,
		access_token_key: keyArray.access_token_key,
		access_token_secret: keyArray.access_token_secret
	});
	console.log(client);
	var params = {screen_name: 'developer_jeff'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		console.log(response);
		if (!error) {
			console.log(tweets.statuses.text);
		}
	});
}

function spotify_search(search) {
	if (search == null) {
		search = "The Sign Ace of Base";
	}
	spotify.search({ type: 'track', query: search }, function(err, data) {
		if (err) {
			console.log('Error occurred: ' + err);
			return;
		}
		console.log('Name: ' + data.tracks.items[0].name);
		console.log('Artist: ' + data.tracks.items[0].album.artists[0].name);
		console.log('Preview: ' + data.tracks.items[0].preview_url);
		console.log('Album: ' + data.tracks.items[0].album.name);
	});
} 

function omdb_search(search) {
	if (search == null) {
		search = "Mr Nobody";
	}
	var searchString = 'http://www.omdbapi.com/?';
	var searchTemp = search.split(' ');
	var searchTemp2 = '';
	for (var i = 0; i < searchTemp.length-1; i++) {
		searchTemp2 += searchTemp[i] + '+';
	}
	searchTemp2 += searchTemp[searchTemp.length-1];
	searchString += 't=' + searchTemp2 + '&type=movie&y=&plot=short&tomatoes=true&r=json';
	request(searchString, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('Title: ' + JSON.parse(body).Title);
			console.log('Year: ' + JSON.parse(body).Year);
			console.log('IMDB Rating: ' + JSON.parse(body).imdbRating);
			console.log('Country: ' + JSON.parse(body).Country);
			console.log('Language: ' + JSON.parse(body).Language);
			console.log('Plot: ' + JSON.parse(body).Plot);
			console.log('Actors: ' + JSON.parse(body).Actors);
			console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).tomatoUserMeter);
			console.log('Rotten Tomatoes URL: ' + JSON.parse(body).tomatoURL);

		}
	});

}

