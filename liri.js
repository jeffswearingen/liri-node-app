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

}

