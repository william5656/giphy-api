$(document).ready(function() {
var buttons = $(".Topic-buttons");
var topics = ["One-Punch Man","Naruto","Fullmetal Alchemist: Brotherhood","Kimi no Na wa"];

$(".color").hide()

    function start(){
        buttons.empty();
       for(var i = 0; i < topics.length; i++){
           var a = $("<button>");
            a.addClass("anime ml-1 btn btn-info");
            a.attr("data-person", topics[i]);
            a.append(topics[i]);
            buttons.append(a);
        }
    }
    start();
    
    $(document).on("click", "button", function() {
        $(".color").show()
        var anime = $(this).attr("data-person");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        anime + "&api_key=G2hyapiogK4imKTBhzOkq1x0A3B3WSkf&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
          })
          .then(function(response) {
            var results = response.data;
  
            for (var i = 0; i < results.length; i++) {
              var gifDiv = $("<div class='item'>");
  
              var rating = results[i].rating;
              var p = $("<p>").text("Rating: " + rating);
              var animeImage = $("<img>");
              animeImage.addClass("gif ");
              animeImage.attr("data-state", "still");
              animeImage.attr("src", results[i].images.fixed_height_still.url);
              gifDiv.prepend(p);
              gifDiv.prepend(animeImage);
  
              $(".gifs").prepend(gifDiv);
            }
        });   
    })

    $(document).on('click', ".gif", function() {
        var src = $(this).attr("src");
         var state = $(this).attr("data-state");
         if(state === "still"){
            $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
             $(this).attr("data-state", "animate");
             
         }
         else{
             $(this).attr("src", src.replace(/\.gif/i, "_s.gif"));
             $(this).attr("data-state", "still");
         }
       });

       $(document).on("click","#add-anime", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var movie = $("#anime-input").val().trim();

        // The movie from the textbox is then added to our array
        topics.push(movie);

        // Calling renderButtons which handles the processing of our movie array
        start();
      });
})
