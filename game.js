window.onload = init;

var gCanvas, g2d;
var gameState = 0;
var width = 640;
var height = 480;
var title = "CS02";
var characterName = '';

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
                    enterState(1);
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
