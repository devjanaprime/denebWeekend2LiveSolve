// requires
var express = require( 'express' );
var app = express();
var bodyParser = require( 'body-parser' );

// global
var port = 7237;

// uses
app.use( bodyParser.urlencoded( {extended: true } ) );
app.use(  express.static( 'server/public' ) );

// spin up server
app.listen( port, function(){
    console.log( 'server up on:', port );
}); //end server up

// POST route