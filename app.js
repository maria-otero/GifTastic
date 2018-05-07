// Initial array of actors
var actorsArray = ['Scarlett Johansson', 'James Franco', 'Leonardo Di Caprio'];


var actorImg;


// use ajax to grab gifs of actors
function displayMovieInfo() {
    
    var actor = $(this).data('actor');
    console.log(actor);

    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + actor + '&api_key=dc6zaTOxFJmzC&limit=10'
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .then(function(response) {
        for(var i = 0; i < response.data.length; i++) {
            var actorDiv = $('<div>');
            var h6 = $('<h6>').text('Rating: ' + response.data[i].rating);
            
            actorImg = $('<img>');
            actorImg.attr('src', response.data[i].images.fixed_height_still
            .url);
            actorImg.attr('data-state', 'still');
            actorImg.attr('data-still', response.data[i].images.fixed_height_still
            .url);
            actorImg.attr('data-animate', response.data[i].images.fixed_height.url);
            actorDiv.append(actorImg);
            actorDiv.append(h6);
            $('#gifs-area').prepend(actorDiv);
          
        // If the user clicks one of the still GIPHY images, the gif animate. If the user clicks the gif again, it stop playing.
        $(actorImg).on('click', function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr('data-state');
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        if (state === 'still') {
            // Then, set the image's data-state to animate
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
            // Else set src to the data-still value  
            } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }     
    });
    }
});
};



// Creates buttoms
function renderButtons() {
    $('#buttons-area').empty();

    for (var i = 0; i < actorsArray.length; i++) {
        var newButton = $('<button>');
        newButton.addClass('actor-button');
        newButton.addClass('btn');
        newButton.addClass('btn-outline-dark');
        newButton.addClass('float-right');
        newButton.attr('data-actor', actorsArray[i]);
        newButton.text(actorsArray[i]);

        $('#buttons-area').append(newButton);
    } 
};


// This function handles events when add actor button is clicked
$('#add-actor-button').on('click', function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var actorAdded = $("#actor-imput").val().trim();

    // Adding actor from the textbox to our array
    actorsArray.push(actorAdded);
    renderButtons();
});




// Adding a click event listener to all elements with a class of "actor-button"
$(document).on('click', '.actor-button', displayMovieInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();




