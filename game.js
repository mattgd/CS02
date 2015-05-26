window.onload = init;

var gCanvas, g2d;
var gameState = 0;
var width = 640;
var height = 480;
var title = "Seven Day Tour";
var characterName = '';

var textIn = $('#input');
var textOut = $('#output');
var textarea = $('#output');

$( document ).ready(function() {
    textIn = $('#input');
    textOut = $('#output');
    textarea = $('#output');
});


function go() {

    console.log(textIn);

    var input = textIn.value; // Read the input string
    textIn.value = ""; // Reset textIn textbox
    var output = process(input); // Set output to the processed input
    textOut.value += " >> " + input + "\n" + output + "\n\n"; // Add output to the textarea

    // Scroll down the textarea to the most recent message
    if (textarea.selectionStart == textarea.selectionEnd) {
        textarea.scrollTop = textarea.scrollHeight;
    }
}

function process(input) {
    var punctuationless = input.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    s = punctuationless.replace(/\s{2,}/g, " ");
    s = s.toLowerCase();
    if (examine) {
        examine = false;
        if (i(["table"])) {
            return r(["The table is covered with a dried aerated sugar-flour-milk-eggs mixture commonly known as cake."]);
        } else if (i(["computer", "comp"])) {
            return r(["This computer has a game on it...the title says \"It's yo birthday: a game of not quite epic proportions.\" You, of course, begin playing this gripping game, and sink into it recursively ad infinitum. I guess this counts as a losing scenario? But you're stuck in an awesome game forever, so that's cool I guess. Just don't waste too much time on it."]);
        } else if (i(["floor"])) {
            return r(["There is colored paper everywhere, giant scraps and tiny pieces. Some blow in the gentle wind of the open window."]);
        }
    }
    examine = false;
    if (i(["help"])) {
        return r(["You shouldn't need help. Fool.", "I suppose you can type \"commands\" to get all possible commands.", "Use single words. I'm stupid.", "What, you want cheat codes?"]);
    } else if (i(["hello", "hi"])) {
        return r(["Hello to you too, player. Now go away.", "Hi. Have a pleasant childhood. Too late."]);
    } else if (i(["commands"])) {
        return r(["hello, hi, win, lose, eat, look, examine, exit, yo, quit, stop, help, commands, mitchell, justin, cory"]);
    } else if (i(["eat"])) {
        return r(["Eat what? The disgusting cake covering the table? Ew.", "You eat the birthday confetti. Oddly full-bodied, with hints of cherries and pine."]);
    } else if (i(["yo"])) {
        return r(["Yo is an English slang interjection, commonly associated with American English. It was highly popularized after being used commonly in Philadelphia, Pennsylvania since the 1940s.\n- Wikipedia", "Yo dawg. I yo'd your yo-yo so you can yo while you yo."]);
    } else if (i(["win"])) {
        return r(["Congratulations, you won. Wasn't that satisfying? I bet it wasn't. In fact, you didn't really win. This game is unwinnable. At least it's unlosable as well."]);
    } else if (i(["mitchell"])) {
        return r(["BOW DOWN BEFORE YOUR CREATOR, BUGGY JAVASCRIPT SCUM"]);
    } else if (i(["justin"])) {
        return r(["Happy birthday to you!\nHappy birthday tooo yooou!\nHappy birrrthdaaaay deeeaaar Jusssssstinnnnnnnnnn....\nHappy biiirrrthhddaaayyyyyyyy tooooooooooooo yooooooooouuuuuuuuuu!"]);
    } else if (i(["cory"])) {
        return r(["Let's be honest...we don't want to have to be honest."]);
    } else if (i(["lose"])) {
        return r(["Congratulations, you won. The only way to win is to lose...but you won...so you didn't lose...so you didn't win...so you1À1Ò1Éè$k\nSEGMENTATION FAULT"]);
    } else if (i(["look"])) {
        return r(["You look around and see a table with a mushy substance on it. There is a computer nearby. Also, everything is coated in tiny scraps of colored paper. Type the command \"examine\" to see things more closely."]);
    } else if (i(["examine"])) {
        examine = true;
        return r(["Examine what? table/computer/floor"]);
    } else if (i(["exit", "quit", "stop"])) {
        return r(["No.", "Absolutely not.", "Not for you."]);
    } else {
        return r(["I don't understand your jargon.", "What is that supposed to mean?", "Stop using fancy words. Pedant."]);
    }
}

function init() {
    gCanvas = document.getElementById("gameCanvas");
    gCanvas.width = window.width;
    gCanvas.height = window.height;

    g2d = gCanvas.getContext("2d");
    g2d.imageSmoothingEnabled = false;
    g2d.mozImageSmoothingEnabled = false;

    console.log("Game canvas initialized.");
    draw();
}

function draw() {
    if (gameState == 0) {
        g2d.font = "60px Courier New Bold";
        g2d.fillStyle = "#FFFFFF";
        g2d.fillText(title, (width / 2) - (g2d.measureText(title).width / 2), 140);

        g2d.font = "24px Courier New";
        g2d.fillStyle = "#CCCCCC";
        g2d.fillText("1. Play Game", (width / 2) - (g2d.measureText("1. Play Game").width / 2), 250);
        g2d.fillText("2. Exit Game", (width / 2) - (g2d.measureText("2. Exit Game").width / 2), 285);
    } else if (gameState == 1) {
        g2d.font = "40px Courier New Bold";
        g2d.fillStyle = "#FFFFFF";
        g2d.fillText("Thanks for playing!", (width / 2) - (g2d.measureText("Thanks for playing!").width / 2), 140);

        g2d.font = "24px Courier New";
        g2d.fillStyle = "#CCCCCC";
        g2d.fillText("Created by mattgd.", (width / 2) - (g2d.measureText("Created by mattgd.").width / 2), 250);
    } else if (gameState == 2) {
        g2d.font = "24px Courier New";
        g2d.fillStyle = "#CCCCCC";
        g2d.fillText("Please enter your character's name.", (width / 2) - (g2d.measureText("Please enter your character's name.").width / 2), 230);
    } else if (gameState == 3) {
        g2d.font = "24px Courier New";
        g2d.fillStyle = "#CCCCCC";
        g2d.fillText("Are you sure you want the name '" + characterName + "'?", (width / 2) - (g2d.measureText("Are you sure you want the name " + characterName + "?").width / 2), 230);
    } else if (gameState == 4) {
        g2d.font = "18px Courier New";
        g2d.fillStyle = "#CCCCCC";
        g2d.fillText("Day 1:\r\nYou get in a taxi. The cab driver asks you, \"Where can I take you today?\"", 8, height - 50);
    }

    var input = new CanvasInput({
        canvas: document.getElementById("gameCanvas"),
        y: this.height - 34,
        fontSize: 18,
        fontFamily: 'Courier New',
        fontColor: '#FFF',
        fontWeight: 'bold',
        width: this.width,
        padding: 8,
        borderWidth: 0,
        borderRadius: 0,
        backgroundColor: "#000",
        innerShadow: 'none',
        boxShadow: 'none',
        placeHolder: 'Enter a message here...',
        onsubmit: function() {
            var choice = input._value.toLowerCase();
            if (gameState == 0) {
                if (choice == "1") {
                    enterState(2);
                } else if (choice == "2") {
                    enterState(1);
                }
            } else if (gameState == 1) {
                if (choice == "reset" || choice == "play again") {
                    enterState(0);
                }
            } else if (gameState == 2) {
                if (choice != null) {
                    characterName = choice.substr(0, 1).toUpperCase() + choice.substr(1);
                    enterState(3);
                }
            } else if (gameState == 3) {
                if (choice == "yes" || choice == "1") {
                    enterState(4);
                } else if (choice == "no" || choice == "0") {
                    enterState(0);
                }
            }
        }
    });
    input.focus();

    console.log("GameState " + gameState + " drawn successfully.");
}

function enterState(state) {
    gameState = state;
    clearCanvas(g2d, gCanvas);
    draw();
}

function clearCanvas(context, canvas) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    var w = canvas.width;
    canvas.width = 1;
    canvas.width = w;
}

/*
System for text

Save last line height
Add [number] pixels
Post new text there
When text reaches the bottom, clear top one, move each up [number] pixels
*/
