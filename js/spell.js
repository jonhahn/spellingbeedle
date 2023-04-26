
// Which buttons have been clicked
var ps = [0,0,0,0,0]
var os = [0,0,0,0,0]
var rs = [0,0,0,0,0]

// Variable of which button was clicked last
let a = 0;

//Play Buttons
for (let i = 0; i < 5; i++) {
    document.getElementsByTagName("i")[i].addEventListener("click", function(){
        play(i);
    });
}

//X Buttons
for (let i = 0; i < 5; i++) {
    document.getElementsByTagName("ii")[i].addEventListener("click", function(){
        close(i);
    });
}

// Info Buttons
for (let i = 0; i < 5; i++) {
    document.getElementsByTagName("j")[i].addEventListener("click", function(){
        info(i);
    });
}

// Check buttons
for (let i = 0; i < 5; i++){
    $("#form" + (i+1).toString()).submit(function() {
        check(i);
        return false;
    });
}


// Get Todays Words
var words = []
N = getDay();
$.getJSON("https://s3.amazonaws.com/test.bucket.hahn/"+N+"/"+N+"_fivewords.json", function(data){
  words = data
  return;
});

var wordinfo = {}
$.getJSON("https://s3.amazonaws.com/test.bucket.hahn/"+N+"/"+N+"_pron.json", function(data){
  wordinfo = data
  for (let i = 0; i < 5; i++) {
    $("#pron" + (i+1).toString()).html("<p>" + wordinfo[i]['pronunciation'] +"</p><p>" + wordinfo[i]['definition']  + "</p>")
  }
  return;
});

// Set timer
setInterval(doDate, 1000);

// Set audio files
setAudio();