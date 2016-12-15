// Copyright MizTech
// Licensed MikeZheng
// http: //mike-zheng.github.io/
//            _   _____         _     
//           (_) |_   _|       | |    
//  _ __ ___  _ ___| | ___  ___| |__  
// | '_ ` _ \| |_  / |/ _ \/ __| '_ \ 
// | | | | | | |/ /| |  __/ (__| | | |
// |_| |_| |_|_/___\_/\___|\___|_| |_|
//                mike-zheng.github.io

$(function() {
    var isDuplicate;
    var maxNumber = 0;
    var number = 0;
    var texts = [];
    var rdmArray = []; //儲存產生的陣列
    init();
    var Licensed = 1;

    function init() {
        number = 0;
        maxNumber = 0;
        isDuplicate = $("#isDuplicate").prop("checked");
        $("#resultsContent").empty();
        rdmArray = [];
        $("#confirmButton").css('display', 'block');
        $("#lotteryButton").css('display', 'none');
        $("#lotteryButton").attr("disabled", false);
        $("#lotteryButton").text("抽籤");

    }

    $("#reStart").on("click", function() {
        init();
        Licensed++;

        if (Licensed > 15) {
            alert("2016 Copyright MikeZheng");
            Licensed = 1;
        }
    });



    $("#confirmButton").on("click", function() {
        //檢查是否重複抽籤
        isDuplicate = $("#isDuplicate").prop("checked");
        var lines = $('#inputLists').val().split(/\n/);
        texts = [];

        lines.forEach(function(string, i) {
            if (/\S/.test(string)) {
                texts.push($.trim(string));
            }
        });
        maxNumber = texts.length;
        $("#confirmButton").css("display", "none");
        $("#lotteryButton").css("display", "block");
    });

    $("#lotteryButton").on("click", function() {
        //檢查是否重複抽籤
        isDuplicate = $("#isDuplicate").prop("checked");
        number++;
        var randomName = "";
        //重複抽籤
        if (isDuplicate) {
            var i = getRandom(0, maxNumber - 1);
            randomName = texts[i];
            $("#resultsContent").append(addNameCard(randomName, isDuplicate, number));

        } else {
            //不重複抽籤要加＃
            if (number > maxNumber) {
                // alert("null");
                $("#lotteryButton").attr("disabled", true);
                $("#lotteryButton").text("抽籤結束，請重新開始");
            } else {
                var i = getRandomArray(0, maxNumber - 1);

                randomName = texts[i];
                $("#resultsContent").append(addNameCard(randomName, isDuplicate, number));

            }
        }
        $("#resultsContent").scrollTop($("#resultsContent")[0].scrollHeight);
    });

    function getRandomArray(minNum, maxNum) {
        var rdm = 0;
        var end = false;
        do {
            var exist = false;
            rdm = getRandom(minNum, maxNum);
            if (rdmArray.indexOf(rdm) != -1) exist = true;
        } while (exist);
        rdmArray.push(rdm);
        return rdm;
    }

    function getRandom(minNum, maxNum) {
        return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    }

    function addNameCard(name, notNum, num) {
        var tagName = "";
        if (notNum)
            tagName = name;
        else
            tagName = "#" + num + "  " + name;

        var cardDiv = '<div class="card"><div class="name-card">' + tagName + '</div></div>';
        return cardDiv;

    }



})

const remote = require('electron').remote;

document.getElementById("min-btn").addEventListener("click", function(e) {
    var window = remote.getCurrentWindow();
    window.minimize();
});

// document.getElementById("max-btn").addEventListener("click", function (e) {
//      var window = remote.getCurrentWindow();
//      if (!window.isMaximized()) {
//          window.maximize();          
//      } else {
//          window.unmaximize();
//      }
// });

document.getElementById("close-btn").addEventListener("click", function(e) {
    var window = remote.getCurrentWindow();
    window.close();
});
