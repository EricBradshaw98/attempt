$(document).ready(function() {

  const maxCharCount = 140;

  $('#new-tweet-button').on('submit', function(event) {
    event.preventDefault();

    //  tweet content
    const tweetContent = $('#new-tweet-button textarea').val();

    // tweet content is empty
    
    if (!tweetContent.trim()) {
      showError('🛑 ⚠️ Tweet content cannot be empty! ⚠️ 🛑');
      return;
    }

    //  exceeds the character limit
    if (tweetContent.length > maxCharCount) {
      showError('🛑 ⚠️ Tweet content should not exceed 140 characters! ⚠️ 🛑');
      return;
    }
    hideError();
    //post to send tweet and load tweeets
    const formData = $(this).serialize();
  
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: formData,
      success: function(response) {
        loadTweets();
        $('#new-tweet-button textarea').val("");
        
        const formFind = $('#new-tweet-button');
        const countTarget = formFind.find("output");
        countTarget.text("140");
      },
      error: function(error) {
        console.error("Error:", error);
        showError("An error occurred. Please try again.");
      }
      
    });
  });

  // function to show error messages
  function showError(message) {
    const $errorContainer = $('#error-container');
    $errorContainer.text(message);
    $errorContainer.show();
  }

  // function to hide error messages
  function hideError() {
    const $errorContainer = $('#error-container');
    $errorContainer.hide();
  }

  //get request to load tweets
  function loadTweets() {
    
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: function(tweets) {
        
        

        
        renderTweets(tweets);
      },
      error: function(error) {
        console.error("Error fetching tweets:", error);
        
      }
    });
  }
  

  loadTweets();

});


//create tweet element to prepend with info ====================================

function createTweetElement(tweet) {
 
  
  const $tweet = $(`
  <article class="tweet"> 
  <header class="user-info">
  <img src="${tweet.user.avatars}" class="avatar" alt="User Avatar">
  <h2>${(tweet.user.name)}</h2>
  <p>${(tweet.user.handle)}</p>
</header>
<div class="line"></div>
      <div class="tweet-content">
  <p>${escapeHtml(tweet.content.text)}</p>
</div>
<div class="line"></div>
<footer>
  <span class="timestamp"> ${timeago.format(tweet.created_at)}</span>
  <div class="icons">
  <i class="fa-regular fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fa-regular fa-heart"></i>
  </div>
</footer>
<div class="line" style="background-color: black; height: 3px; margin: 10px 0;"></div></article>`).addClass("tweet");
  // ============================================================================
  // Function to escape HTML entities
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  return $tweet;
}

// render tweet function================================================
function renderTweets(tweets) {
  
  const $tweetsContainer = $("#tweets-container");
  $tweetsContainer.empty();

 

  // loops through tweets
  for (const tweet of tweets) {
    console.log(tweet);
    // calls createTweetElement for each tweet
    const $tweetElement = createTweetElement(tweet);
    console.log($tweetElement);
    // takes return value and appends it to the tweets container
    $tweetsContainer.prepend($tweetElement);
  }
  
}
//=====================================================================




