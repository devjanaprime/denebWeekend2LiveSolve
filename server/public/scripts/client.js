console.log( 'js' );
$( document ).ready( readyNow );

function readyNow(){
    console.log( 'JQ' );
    $( '.typeButton' ).on( 'click', typeButtonClick );
} // end readyNow

function typeButtonClick(){
    console.log( 'typeButton clicked' );
    // assemble object to send with user input
    var objectToSend = {
        x: $( '#xIn' ).val(),
        y: $( '#yIn' ).val(),
        type: $( this ).data().type
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
        // display output
        $( '#output' ).empty();
        $( '#output' ).append( response.answer );
    }); // end ajax
} // end typeButtonClick