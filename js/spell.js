

// Which buttons have been clicked
var ps = [0,0,0,0,0]

// Which ones have been guessed
var os = [0,0,0,0,0]

// Which have been guessed correct
var rs = [0,0,0,0,0]

// Variable of which button was clicked last
let a = 0;

var stats_are_set = 0;

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
var stats_week = [0,0,0,0,0,0,0];
var stats_all = [0,0];

N = getDay();
$.getJSON("https://s3.amazonaws.com/test.bucket.hahn/"+N+"/"+N+"_fivewords.json", function(data){
    words = data;

    stats_all[0] = Number(getCookie("spellingbeedle.alltime.correct"));
    stats_all[1] = Number(getCookie("spellingbeedle.alltime.attempted"));
    stats_all[2] = Number(getCookie("spellingbeedle.streak"));

    for (let i = 0; i < 7; i++) {
        x = getCookie("spellingbeedle.day" + (i+1).toString());
        if (x != null){
            stats_week[i] = Number(x);
        }
    };

    // Cookies
    guesses = [null, null, null, null, null];
    for (let i = 0; i < 5; i++) {
        guesses[i] = getCookie("spellingbeedle.guess" + (i+1).toString())
        if ((guesses[i] != null) & (guesses[i] != '')){
            ps[i] = 1;
            $("#enter" + (i+1).toString()).val(guesses[i]);
            check(i);
        };
    };

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


// Some other buttons
document.getElementsByTagName("ij")[0].addEventListener("click", function(){
        $("#popup-stats").hide();
    });

document.getElementById("chartbutton").addEventListener("click", function(){
        if ($("#popup-stats").is(":visible")){
            $("#popup-stats").hide();
        } else{
            setStats();
        }
    });

document.getElementById("chartbutton1").addEventListener("click", function(){
        $("#popup-question").toggle();
    });

document.getElementById("close-question").addEventListener("click", function(){
        $("#popup-question").hide();
    });