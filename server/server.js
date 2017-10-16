// requires
var express = require( 'express' );
var app = express();
var bodyParser = require( 'body-parser' );

// global
var port = 7237;
var calcHistory = [];
// uses
app.use( bodyParser.urlencoded( {extended: true } ) );
app.use(  express.static( 'server/public' ) );

// spin up server
app.listen( port, function(){
    console.log( 'server up on:', port );
}); //end server up

// POST route
app.post( '/calculate', function( req, res ){
    console.log( 'in POST /calculate:', req.body );
    if( req.body.type === 'Add' ){
        var answer = Number( req.body.x ) + Number( req.body.y );
    }
    else if( req.body.type === 'Subtract' ){
        answer = Number( req.body.x ) - Number( req.body.y );
    }
    else if( req.body.type === 'Multiply' ){
        answer = Number( req.body.x ) * Number( req.body.y );
    }
    else if( req.body.type === 'Divide' ){
        answer = Number( req.body.x ) / Number( req.body.y );
    }
    // answer object for this calculation
    var calculationObject = {
        x: req.body.x,
        y: req.body.y,
        type: req.body.type,
        answer: answer
    }; //end calculation object
    // push into our array
    calcHistory.push( calculationObject );
    // send all to client
    var objectToSend = {
        history: calcHistory
    }; //end objectToSend
    res.send( objectToSend ); 
}); //end post /calculate