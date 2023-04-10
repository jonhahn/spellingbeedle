
ps = [0,0,0,0,0]

let a = 0;

play = function(i){
        document.getElementsByTagName("i")[a].style.opacity=".5";
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

    success = ['Better luck tomorrow!', 'At least you got one!', 'Woo!', 'Lit!', 'Salty!', 'Sublime!'];
    pct = ['0%', '20%', '40%', '60%', '80%', '100%'];

    total = rs[0] + rs[1] + rs[2] + rs[3] + rs[4];
    time = timetomidnight();
    $("#result").html("<h3>" + success[total] + "</h3><h3>" + pct[total] + "</h3><h5>Next spellingbeedle in: " + time + "<h5>");
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