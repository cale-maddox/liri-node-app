var tweets = require("./keys.js");

// console.log(tweets.twitterKeys);

var ck = tweets.twitterKeys.consumer_key
var cs = tweets.twitterKeys.consumer_secret
var tk = tweets.twitterKeys.access_token_key
var ts = tweets.twitterKeys.access_token_secret

// console.log(cs);

var nodeArg = process.argv 


if (nodeArg[2]==="movie-this") {
	
	var movArr =[];

	var movieTitle = "";

	for (i=3; i<nodeArg.length; i++){
		movArr.push(nodeArg[i]);
	};


	movieTitle = movArr.join('+');
	// console.log(movieTitle);

	var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&r=json";

	var request = require("request");

	request( queryUrl, function(error, response, body) {

		if (!error && response.statusCode === 200) {
		// console.log("The Release Year is " + JSON.parse(body).Year);
		// console.log(JSON.parse(body));
		console.log("**********************"+"\nTitle: "+JSON.parse(body).Title+"\n**********************"+"\nYear: "+JSON.parse(body).Year+"\n**********************"+"\nIMDB Rating: "+JSON.parse(body).imdbRating+
			"\n**********************"+"\nCountry of Origin: "+JSON.parse(body).Country+"\n**********************"+"\nLanguage: "+JSON.parse(body).Language+"\n**********************"+"\nPlot: "+JSON.parse(body).Plot+
			"\n**********************"+"\nActors: "+JSON.parse(body).Actors+"\n**********************"+"\nRotten Tomatoes Rating: "+JSON.parse(body).Ratings[1].Value+"\n**********************");
			
		};

	});

}
else if (nodeArg[2]==="spotify-this-song") {
	console.log("yay!");

	var SpotifyWebApi = require('spotify-web-api-node');

	var songArr =[];

	var songTitle = "";

	for (i=3; i<nodeArg.length; i++){
		songArr.push(nodeArg[i]);
	};


	songTitle = songArr.join('+');
	console.log(songTitle);

	var spotify = require('spotify');
 
	spotify.search({ type: 'track', query: songTitle }, function(err, data) {
    	if ( err ) {
        	console.log('Error occurred: ' + err);
        	return;
    	}
 		
 		console.log(data.tracks.items[0]);
    	// Do something with 'data' 
	});


}
else if (nodeArg[2]==="my-tweets") {
	console.log("yay!");

	var Twitter = require('twitter');

	var client = new Twitter({
  		consumer_key: ck,
  		consumer_secret: cs,
  		access_token_key: tk,
  		access_token_secret: ts
	});	

	client.get('statuses/user_timeline', {screen_name: 'CaleMaddox', count: 20,  exclude_replies: true}, function(error, tweets, response) {
  		if(error) throw error;
  		// console.log(tweets[0].created_at);  // The favorites.
  		// console.log(tweets[0].text);  // Raw response object.

  		for(var i=0; i<tweets.length; i++){
  			console.log("************"+"\nTweet: "+tweets[i].text+"\nPosted: "+tweets[i].created_at);
  		}

	});	

}
else if (nodeArg[2]==="do-what-it-says") {
	console.log("yay!");
}
else{
	console.log("command Invalid");
};
