var twitter = require('twitter');
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
		twitter_search();
		break;
	case 'spotify-this-song':
		spotify_search();
		break;
	case 'movie-this':
		omdb_search();
		break;
	case 'do-what-it-says':

		break;
	default:
		console.log('Invalid input');
		break;
}

function twitter_search() {
//  GET https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=developer_jeff&count=20
}

function spotify_search() {
  GET 
} 

function omdb_search() {

}

