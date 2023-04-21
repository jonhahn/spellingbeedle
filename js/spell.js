
ps = [0,0,0,0,0]

let a = 0;

play = function(i){
        document.getElementsByTagName("i")[a].style.opacity=".7";
        document.getElementsByTagName("audio")[i].play();
        document.getElementsByTagName("i")[i].style.opacity="1";
        a = i;
        $("#enter" + (i+1).toString()).focus();
        ps[i] = 1;
};

for (let i = 0; i < 5; i++) {
    document.getElementsByTagName("i")[i].addEventListener("click", function(){
        play(i);
    });
}

info = function(i){
        document.getElementsByTagName("i")[a].style.opacity=".7";
        document.getElementsByTagName("i")[i].style.opacity="1";
        a = i;
        $("#enter" + (i+1).toString()).focus();
        ps[i] = 1;
};

for (let i = 0; i < 5; i++) {
    document.getElementsByTagName("j")[i].addEventListener("click", function(){
        info(i);
    });
}

$("#form1").submit(function() {
    check(0);
    return false;
});
$("#form2").submit(function() {
    check(1);
    return false;
});
$("#form3").submit(function() {
    check(2);
    return false;
});
$("#form4").submit(function() {
    check(3);
    return false;
});
$("#form5").submit(function() {
    check(4);
    return false;
});

var os = [0,0,0,0,0]
var rs = [0,0,0,0,0]

var words = []
$.getJSON("https://s3.amazonaws.com/test.bucket.hahn/fivewords.json", function(data){
  words = data;
  return;
});


check = function(num){
    num_str = (num + 1).toString()
    guess = document.getElementById("enter" + num_str).value.toLowerCase();

    // Make sure pronunciation has been heard and guess is entered
    if ((os[num] == 0) & (guess != "") & ps[num] == 1){
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
    }

    if (Math.min(...os) == 1){
        finish()
    }

}


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

    $("#result").html("<h5 style='color:" +color+ "'>" + response + "</h5><h3>" + pct[total] + "</h3><h5>Next spellingbeedle in: " + time + "<h5>");
    $("#result").show();
}

timetomidnight = function(){
    var date = new Date();
    var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
                    date.getUTCDate(), date.getUTCHours(),
                    date.getUTCMinutes(), date.getUTCSeconds());
    var now_utc2 = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
                    date.getUTCDate(), 24,
                    0, 0);
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