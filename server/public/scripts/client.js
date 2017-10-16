console.log( 'js' );
$( document ).ready( readyNow );

var x = 'what?';
var y = 'hellNawww';
var type = 'denebermind';

function readyNow(){
    console.log( 'JQ' );
    $( '#equalsButton' ).on( 'click', equalsButtonClick );
    $( '.numberButton' ).on( 'click', numberButtonClick );
    $( '.typeButton' ).on( 'click', typeButtonClick );
} // end readyNow

function equalsButtonClick(){
    // assemble object to send 
    var objectToSend = {
        x: x,
        y: Number( $( '#currentNumber' ).text() ),
        type: type
    }; // end objectToSend
    console.log( 'sending:', objectToSend );
    // make ajax call to server
    $.ajax({
        type: 'POST',
        url: '/calculate',
        data: objectToSend
    }).done( function( response ){
        // handle response
        console.log( 'back from server with:', response );
        $( '#output' ).empty();
        // loop through response.history
        for( var i=0; i< response.history.length; i++ ){
            var outputString = '<li>';
            outputString += response.history[ i ].x;
            // convert type
            if( response.history[ i ].type === 'Add'){
                outputString += ' + ';
            }
            else if( response.history[ i ].type === 'Subtract'){
                outputString += ' - ';
            }
            else if( response.history[ i ].type === 'Multiply'){
                outputString += ' * ';
            }
            else if( response.history[ i ].type === 'Divide'){
                outputString += ' / ';
            }
            outputString += response.history[ i ].y;
            outputString += ' = ';
            outputString += response.history[ i ].answer;
            outputString += '</li>';
            $( '#output' ).append( outputString );
        } // end for
        // reset inital values
        x = 'what?';
    }); // end ajax
}

function numberButtonClick(){
    // get this number & append to current number output
    $( '#currentNumber' ).append( $( this ).data().number );
} // end numberButtonClick

function typeButtonClick(){
    console.log( 'typeButton clicked:', $( '#currentNumber' ).text() );
   
    if( x === 'what?' ){
        x = Number( $( '#currentNumber' ).text() );
        $( '#currentNumber' ).empty();
    }
    type = $( this ).data().type;
    console.log( 'x:', x, 'type:', type );
} // end typeButtonClick