/*
 * Author: Alex P
 * Project Name: Giftastic JS
 * Version: 1
 * Date: 08.21.17
 * URL: itsokayitsofficial.github.com/Giftastic/
 */


// Function - On doucment load
$(document).ready(function () {
  // Variable - Array for subject topics
  var topics = [];
  // Variable - Define <div> to place class="gifArea" in
  var contentDiv = $("<div class='tab-pane fade active in'>");
  var gifArea = $("<div id='gifArea'>");

  // Function - Giphy API search return
  function displaySubjectShow() {
    // Variable - Search input definition for API
    var searchInput = $(this).data("search");
    console.log(searchInput);
    // Variable - Giphy API retreval, definition, and search
    var getAPI = $.get("https://api.giphy.com/v1/gifs/search?api_key=9f059d7c1c864a5284feb6125c4adbac&q=" + searchInput + "&limit=10&lang=en");


    // Promise - Run on response from Giphy API
    getAPI.done(function (response) {
      // Variable - Status of response from Giphy API
      var status = getAPI.statusText;
      console.log("API Pull: " + status);
      // Variable - Results of response from Giphy API
      var results = response.data;
      console.log("Results:", results);

      // Empty - Clears screen of current gifs
      gifArea.empty();

      // For Loop - To cull response results
      for (var i = 0; i < results.length; i++) {
        // Variable - Define <div> to place gif in
        var showDiv = $("<div class='col-sm-6 col-md-4'>");
        // Variable - Define <div> to place in showDiv
        var thumbnail = $("<div class='thumbnail'>");
        // Variable - Define <img> to display gif
        var showImage = $("<img>");
        // Variable - Define <div> to display caption
        var caption = $("<div class='caption'>");
        // Variable - Define gif rating
        var rating = results[i].rating;
        // Variable - Define <p> to display gif rating
        var p = $("<p>").text("Rating: " + rating);
        // Variable - Animated gif display
        var animatedSrc = results[i].images.fixed_height.url;
        // Variable - Static gif display
        var staticSrc = results[i].images.fixed_height_still.url;

        // Class to showImage - class="subjectGiphy"
        showImage.addClass("subjectGiphy");
        // Attribute to showImage - src="staticSrc[i]"
        showImage.attr("src", staticSrc);
        // Attribute to showImage - data-state="still"
        showImage.attr("data-state", "still");
        // Attribute to showImage - data-still="staticSrc[i]"
        showImage.attr("data-still", staticSrc);
        // Attribute to showImage - data-animate="animatedSrc[i]"
        showImage.attr("data-animate", animatedSrc);
        // Append to thumbnail - showImage
        thumbnail.append(showImage);
        // Append to thumbnail - caption
        thumbnail.append(caption);
        // Append to cpation - rating[i]
        caption.append(p);
        // Append to showDiv - thumbnail
        showDiv.append(thumbnail);
        // Prepend with showDiv - id="gifArea"
        gifArea.prepend(showDiv);
      }

    });
    // END - getAPI.done(function (response) 


    contentDiv.append(gifArea);

  };
  // END - function displaysubjectShow()


  // Function - Generates tabs of search input submitted
  function displayButtons() {
    // For Loop - To cull search results
    for (var i = 0; i < topics.length; i++) {
      // Variable - Define <div> to place class="gifArea" in
      contentDiv.attr("id", topics[i]);
      // Variable - Define <li> to generate input button
      var showButton = $('<li>');
      // Attribute to showButton - class="show"
      showButton.attr("class", "show");
      // Attribute to showButton - data-search="topics[i]"
      showButton.attr("data-search", topics[i]);

      // Variable - Define <a> to generate input result
      var showTab = $("<a data-toggle='tab' aria-expanded='true'>");
      // Attribute to showTab - href="#topics[i]"
      showTab.attr("href", "#" + topics[i]);
      // Text to showTab - displays search input on showTab
      showTab.text(topics[i]);
      // Append with showTab - id="myButtons"
      showButton.append(showTab);
    }

    // Append with showButton - id="myButtons"
    $("#myButtons").append(showButton);

    // Append with contentDiv - id="myTabContent"
    $("#myTabContent").append(contentDiv);

    // Billiance - On generation button self-clicks, triggering displaySubjectShow()
    showButton.click();

  };
  // END - function displayButtons()


  // Function - Checks if gif is 'static' or 'animated'
  function pausePlayGifs() {
    // Variable - Checks data-state="" of gif
    var state = $(this).attr("data-state");

    // If - Checks if data-state="still"
    if (state === "still") {
      // Attribute to gif - src="data-animate"
      $(this).attr("src", $(this).attr("data-animate"));
      // Attribute to gif - data-state="animate"
      $(this).attr("data-state", "animate");
      // Else
    } else {
      // Attribute to gif - src="data-still"
      $(this).attr("src", $(this).attr("data-still"));
      // Attribute to gif - data-state="still"
      $(this).attr("data-state", "still");
    }
  }
  // END - function pausePlayGifs()


  // onClick - Button id="addShow" runs function displayButtons and displaySubjectShow
  $("#addShow").on("click", function (event) {
    event.preventDefault();
    // Variable - Read text of input field id="subjectInput"
    var newShow = $("#subjectInput").val().trim();
    // Push - newShow into topics array
    topics.push(newShow);
    console.log("Search topics:", topics);
    // Clear text input of id="subjectInput"
    $("#subjectInput").val("");
    // Run Function - Displays search input as button
    displayButtons();
  });
  // END - $("#addShow").on("click", function (event)


  // onClick - Button class="show" runs function displaySubjectShow
  $(document).on("click", ".show", displaySubjectShow);

  // onClick - Image class="subjectGiphy" runs function pausePlayGif
  $(document).on("click", ".subjectGiphy", pausePlayGifs);

  // onClick - Button id="clear" clears displayed gifs
  $("#clear").on("click", gifArea.empty());

  // Selector - Because I broke Bootstrap?
  $("body").tooltip({
    selector: '[data-toggle=tooltip]'
  });

});
// END - $(document).ready(function ()