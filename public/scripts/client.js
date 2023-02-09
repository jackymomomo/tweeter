/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

 const data = []

  $("#new-tweet-form").submit(function(event) {
    event.preventDefault();
    const maxChar = 140;
    const inputLength = $(this).find('#tweet-text').val().length

    if(!inputLength) { 
      return alert("please enter text before submitting a tweet!")
    } 
    
    if (inputLength - maxChar > 0) {
      return alert("Your message is exceeding the maximum 140 letters")
    } 
    
      const newTweet = $(this).serialize();
      $.post("/tweets/", newTweet);
  });

  const renderTweets = function(tweets) {
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
          ${tweetData.content.text}
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


  const loadTweets = () => {
    $.get("/tweets/", newTweet => {
      renderTweets(newTweet);
    });
  };
  
  loadTweets();
});