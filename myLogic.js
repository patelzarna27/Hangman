// Code goes here
$(document).ready(function() {
    // Here we are provided an initial array of letters.
    // Use this array to dynamically create buttons on the screen.
    var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];


    // MAJOR TASK #1: DYNAMICALLY CREATE BUTTONS
    // =================================================================================
    //var buttons = $(document).getElementById('buttons');
    //$("#buttons").html("<h1>Hello world!</h1>");

    for (var i = 0; i < letters.length; i++) {

        var letterBtn = $("<button class='btnLetter btn-default'>");
        //letterBtn.addClass("letter-button letter letter-button-color");
        letterBtn.attr("data-letter", letters[i]);
        letterBtn.text(letters[i]);
        $("#buttons").append(letterBtn);
    }




    var rand = 0;
    var word = "";
    var selectedWord = "";
    var clicked = "";
    var lives = 8;
    var guessWord = "";
    var winner = false;
    var badGuesses = 0;

    initialize();

    function initialize() {
        //Randomle select the word from the word array list;
        rand = Math.floor(Math.random() * phrases.length);
        word = phrases[rand];
        console.log(word);

        //create new the guessword array with length of selected the word
        guessWord = word;

        updatephrase();
        fillDashInGuess();

        showWinner(false);
        showLooser(false);
        showReload(false);

        drawHangman();
    }

    function fillDashInGuess() {
        //fill the guess word with _
        for (var iguess = 0; iguess < guessWord.length; iguess++) {

            var currentChar = guessWord[iguess];
            if (currentChar == " ") {
                guessWord = setCharAt(guessWord, iguess, currentChar);
            } else {
                guessWord = setCharAt(guessWord, iguess, '_');
            }
            displayWord(guessWord);
        }

    }

    function updatephrase() {
        //update the text with number of letter in word to guess;
        $("#phrase").text("You have " + lives + " lives to guess this " + word.length + " letter phrase");
    }


    function displayWord(paramWord) {
        $("#selWord").text(paramWord);
    }

    function setCharAt(str, index, chr) {
        if (index > str.length - 1) return str;
        return str.substr(0, index) + chr + str.substr(index + 1);
    }

    function showWinner(displayFlag) {
        if (displayFlag === false)
            $("#winner").hide();
        if (displayFlag === true)
            $("#winner").show();
    }

    function showLooser(displayFlag) {
        if (displayFlag === false)
            $("#looser").hide();
        if (displayFlag === true)
            $("#looser").show();
    }

    function showReload(displayFlag){
        if(displayFlag === false)
            $("#reload").hide();
        if(displayFlag === true)
            $("#reload").show();
    }

    function showHangman(displayFlag){
        if(displayFlag === false)
            $("#Hangman").hide();
        if(displayFlag === true)
            $("Hangman").show();
    }

    function processClick(clickChar) {
        var isFound = false;
        for (var iclicked = 0; iclicked < word.length; iclicked++) {
            if (clickChar.toUpperCase() === word[iclicked].toUpperCase()) {
                guessWord = setCharAt(guessWord, iclicked, clickChar);
                displayWord(guessWord);
                isFound = true;
            }
        }

        if (isFound != true) {
            lives = lives - 1;
            badGuesses = badGuesses + 1;
            updatephrase();
            if (lives === 0) {
                showLooser(true);
                showWinner(false);
                showReload(true);
                //Addbutton(false);
            }
            drawHangman();
        }

        if (guessWord.toUpperCase() === word.toUpperCase()) {
            winner = true;
            showWinner(true);
            showLooser(false);
            showReload(true);
            showHangman(false);
            //Addbutton(true);
        }

    }

    $(".btnLetter").click(function() {
        //alert($(this).text());
        if (lives != 0) {
            $(this).hide();
            processClick($(this).text());
        }
    });

    $("#btnReload").click(function(){
        //alert("hi");
        location.reload();
    });


    // Draw the canvas
    function drawHangman() {
        var canvas = document.getElementById("stage");
        var c = canvas.getContext('2d');
        // reset the canvas and set basic styles
        canvas.width = canvas.width;
        c.lineWidth = 10;
        c.strokeStyle = 'green';
        c.font = 'bold 24px Optimer, Arial, Helvetica, sans-serif';
        c.fillStyle = 'red';
        // draw the ground
        drawLine(c, [0, 200], [200, 200]);
        // start building the gallows if there's been a bad guess
        if (badGuesses > 0) {
            // create the upright
            c.strokeStyle = '#A52A2A';
            drawLine(c, [0, 200], [0, 0]);
            if (badGuesses > 1) {
                // create the arm of the gallows
                //c.lineTo(150, 10);
                //c.stroke();
                drawLine(c, [0, 0], [100, 0]);
            }
            if (badGuesses > 2) {
                c.strokeStyle = 'black';
                c.lineWidth = 3;
                // draw rope
                drawLine(c, [100, 0], [100, 20]);
                // draw head
                c.beginPath();
                // c.moveTo(100, 30);
                c.arc(100, 35, 15, 0, (Math.PI / 180) * 360);
                c.stroke();
            }
            if (badGuesses > 3) {
                // draw body
                drawLine(c, [100, 50], [100, 100]);
            }
            if (badGuesses > 4) {
                // draw left arm
                drawLine(c, [100, 75], [130, 55]);
            }
            if (badGuesses > 5) {
                // draw right arm
                drawLine(c, [100, 75], [70, 55]);
            }
            if (badGuesses > 6) {
                // draw left leg
                drawLine(c, [100, 100], [70, 135]);
            }
            if (badGuesses > 7) {
                // draw right leg and end game
                drawLine(c, [100, 100], [125, 135]);
            }
        }
    }

    function drawLine(context, from, to) {
        context.beginPath();
        context.moveTo(from[0], from[1]);
        context.lineTo(to[0], to[1]);
        context.stroke();
    }
});
