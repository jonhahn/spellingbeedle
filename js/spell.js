
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







function doDate()
{
    time = timetomidnight();
    $("#timing").html(time);
}

function setAudio(){
    for (let i = 0; i < 5; i++){
        num = (i+1).toString();
        N = getDay();
        $("#audio"+num).html('<source src="https://s3.amazonaws.com/test.bucket.hahn/'+N+'/'+N+'_'+num+'.mp3" type="audio/mp3">');
    }
}

setInterval(doDate, 1000);


function getDay(){
    var date = new Date();
    var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
                    date.getUTCDate(), date.getUTCHours(),
                    date.getUTCMinutes(), date.getUTCSeconds());
    var now_utc2 = Date.UTC(2023, 3,
                    8, 0,
                    15, 0);
    d1 = new Date(now_utc2);
    d2 = new Date(now_utc);
    var diff =  d2 - d1;

    days = Math.floor(diff/24/60/60/1000);

    return days.toString();
}

setAudio();








// Setting cookies for tracking number of correct answers
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function setCookieUntil15(name,value) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
                    date.getUTCDate(), 24,
                    15, 0));
        expires = "; expires=" + date.toUTCString();
    }
    me = name + "=" + (value || "")  + expires + "; path=/";
    return me;
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}



//setCookie("spellingbeedle.totalcorrect",1,30);
//var xx = getCookie("spellingbeedle.totalcorrect");