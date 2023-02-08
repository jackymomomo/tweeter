$(document).ready(function() {
  const textArea = $("#tweet-text") 
  const counter = $(".counter") 

  textArea.on('input', function(){
    let remaining = 140 - textArea.val().length
    counter.text(remaining)
    if (remaining < 0){
      counter.css("color", 'red')
    } else {
      counter.css("color", "inherit")
    }
  })
});