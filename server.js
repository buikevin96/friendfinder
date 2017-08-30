// Dependencies, series of NPM packages that we will use to give our server useful functionality
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// Tells node that we are creating an express server
var app = express();

// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 8080

// bodyParser makes it easy for the back and the front easy for each other
var jsonParser = bodyParser.json();
app.use(urlencodedParser = bodyParser.urlencoded({ extended: false }));

// BodyParser makes it possible for our server to interpret data sent to it

// Parse various different  custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json'}));
//app.use(bodyParser.urlencoded({ extended: true }));

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type'}));

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }));

// Points our server to a series of "route" files
// These map gives our server a "map" of how to respond when users visit or request data from various URLs.
require("./routing/apiRoutes")(app);
require("./routing/htmlRoutes")(app);

// Listener to effectively start our server
app.listen(PORT, function() {
	console.log("APP LISTENING ON PORT: " + PORT);
})