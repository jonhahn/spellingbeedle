// Functions for spell.js

info = function(i){
        document.getElementsByTagName("i")[a].style.opacity=".7";
        document.getElementsByTagName("i")[i].style.opacity="1";
        $("#popup" + (a+1).toString()).hide();
        a = i;
        $("#enter" + (i+1).toString()).focus();
        ps[i] = 1;
        $("#popup" + (i+1).toString()).show();

};

play = function(i){
        document.getElementsByTagName("i")[a].style.opacity=".7";
        document.getElementsByTagName("audio")[i].play();
        document.getElementsByTagName("i")[i].style.opacity="1";
        if (a != i){
            $("#popup" + (a+1).toString()).hide();
        };
        a = i;
        $("#enter" + (i+1).toString()).focus();
        ps[i] = 1;
};

close = function(i){
        $("#popup" + (a+1).toString()).hide();
};

check = function(num){
    num_str = (num + 1).toString()
    guess = document.getElementById("enter" + num_str).value.toLowerCase();

    // Make sure pronunciation has been heard and guess is entered
    if ((os[num] == 0) & (guess != "") & ps[num] == 1){
        $("#popup" + (a+1).toString()).hide();
        os[num] = 1
        $("#enter" + num_str).prop('disabled', true);
        if (guess == words[num]){
            $("#o" + num_str).html('<oo class="fa-solid fa-check-circle fa-2x correct"></oo>')
            rs[num] = 1
         } else{
            $("#o" + num_str).html('<oo class="fa-solid fa-circle-xmark fa-2x incorrect"></oo>')
            $('#answer' + num_str).html(words[num])
            $('#answer' + num_str).show()
        }
    } else{
        play(num);
        if (a != num){
            $("#popup" + (a+1).toString()).hide();
        };
    }

    if (Math.min(...os) == 1){
        finish()
    }
};

finish = function(){
    success1 = ["Excellent!", "Amazing!", "Incredible!", "You're a rock star!", "Perfect!"]
    success2 = ["Nice job!", "Great!", "Nearly perfect!", "Almost!", "You missed one."]
    success3 = ["Well done!", "You did alright!", "Could be better.", "A passing attempt.", "You spelled three correctly!"]
    success4 = ["Two out of five today!", "Okay!", "Could be worse!"]
    success5 = ["Better than my dog.", "At least you got one!", "Welp!", "One is better than none!"]
    success6 = ["Better luck tomorrow!", "Oof.", "Must have been difficult today.", "Oh, my."]

    success = [success6, success5, success4, success3, success2, success1];
    pct = ['0%', '20%', '40%', '60%', '80%', '100%'];

    total = rs[0] + rs[1] + rs[2] + rs[3] + rs[4];

    response = success[total];
    response = response[Math.floor(Math.random() * response.length)];

    var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

    color = colorArray[Math.floor(Math.random() * colorArray.length)];

    time = timetomidnight();

    $("#resultword").css("color", color);
    $("#resultword").html(response);
    $("#resultpct").html(pct[total]);
    $("#result").show();
};


function doDate()
{
    time = timetomidnight();
    $("#timing").html(time);
};

function setAudio(){
    for (let i = 0; i < 5; i++){
        num = (i+1).toString();
        N = getDay();
        $("#audio"+num).html('<source src="https://s3.amazonaws.com/test.bucket.hahn/'+N+'/'+N+'_'+num+'.mp3" type="audio/mp3">');
    }
};

timetomidnight = function(){
    var date = new Date();
    var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
                    date.getUTCDate(), date.getUTCHours(),
                    date.getUTCMinutes(), date.getUTCSeconds());
    var now_utc2 = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
                    date.getUTCDate(), 24,
                    15, 0);
    d1 = new Date(now_utc2);
    d2 = new Date(now_utc);
    var diff =  d1 - d2;

    hours = Math.floor(diff/60/60/1000);
    minutes = Math.floor(diff/60/1000 - hours*60);
    seconds = Math.floor(diff/1000 - hours*60*60 - minutes*60);

    minstring = minutes.toString();
    if (minutes < 10){
        minstring = "0" + minstring;
    };

    secstring = seconds.toString();
    if (seconds < 10){
        secstring = "0" + secstring;
    };

    return hours.toString() + ":" + minstring + ":" + secstring;
}

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
};


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