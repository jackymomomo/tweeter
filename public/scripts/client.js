/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {


   //By default, error messages are hidden.
   $("#empty-error-message").hide();
   $("#error-message-tooLong").hide();


 const data = []

 const escape = str => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
 };


 const renderTweets = function(tweets) {
  $('#tweets-container').empty();
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
};


const createTweetElement = function(tweetData) {
  let $tweet = $(`
<article class="tweet">
      <header class="tweet-header">
        <div class="user-profile">
          <img class="user-icon" src="${tweetData.user.avatars}"></img> 
          <h4 class="user-name">${tweetData.user.name}</h4>
        </div>
          <h4 class="user-handle">${tweetData.user.handle}</h4>
      </header>
      <div class="tweet-text">
      ${escape(tweetData.content.text)}
      </div>
      <footer class="tweet-footer">
        <span class="tweet-date">${timeago.format(tweetData.created_at)}</span>
        <div class="tweet-response">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>`);
  return $tweet;
};

const loadTweets = function() {
  $.ajax("/tweets/", {method: "GET", dataType: "json",})
  .then((newTweet) => {
    renderTweets(newTweet);
  });
};

loadTweets();

$("#new-tweet-form").submit(function(event) {
  event.preventDefault();
  const maxChar = 140;
  const inputLength = $(this).find("#tweet-text").val().length;

  $("#empty-error-message").slideUp("slow");
  $("#error-message-tooLong").slideUp("slow");

  if (!inputLength) {
    $("#empty-error-message").slideDown("slow");
    $("#error-message-tooLong").hide();
  } else if (inputLength - maxChar > 0) {
    $("#error-message-tooLong").slideDown("slow");
    $("#empty-error-message").hide();
  } else {
    const newTweet = $(this).serialize();
    $.post("/tweets/", newTweet, () => {
      $(this).find("#tweet-text").val("");
      $(this).find(".counter").val(maxChar);
      loadTweets();
    });
  }
});
});

  