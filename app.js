// Initial array of actors
var actorsArray = ['Scarlett Johansson', 'James Franco', 'Leonardo Di Caprio'];



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
        console.log(response.data[0]);
        for(var i = 0; i < response.data.length; i++) {
            var actorDiv = $('<div>');
            var h6 = $('<h6>').text('Rating: ' + response.data[i].rating);
            var actorImg = $('<img>');

            actorImg.attr('src', response.data[i].images.fixed_width.url);
            actorImg.addClass('');
            actorDiv.append(actorImg);
            actorDiv.append(h6);
            $('#gifs-area').prepend(actorDiv);
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
        newButton.attr('data-actor', actorsArray[i]);
        newButton.text(actorsArray[i]);

        $('#buttons-area').append(newButton);
    } 
}

// This function handles events when add actor button is clicked
$('#add-actor-button').on('click', function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var actorAdded = $("#actor-imput").val().trim();

    // Adding actor from the textbox to our array
    actorsArray.push(actorAdded);
    renderButtons();
})

// Adding a click event listener to all elements with a class of "actor-button"
$(document).on('click', '.actor-button', displayMovieInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();




