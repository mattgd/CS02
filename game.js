// Declare the variables
var title = "Seven Day Tour";
var money, textarea, textIn, textOut;

// Set the variables
$(document).ready(function() {
    money = 7000;
    textIn = $('#input');
    textOut = $('#output');
    textarea = document.getElementById("output");
});

// What happens when the user clicks "Submit"
function go() {
    var input = textIn.val(); // Read the input string

    if (input == "") {
        textOut.val(textOut.val() + "You don't seem to want to do anything." + "\n\n"); // Add output to the textarea
    } else {
        textIn.val(""); // Reset textIn textbox
        var output = process(input); // Set output to the processed input
        textOut.val(textOut.val() + ">> " + input + "\n" + output + "\n\n"); // Add output to the textarea
    }

    textarea.scrollTop = textarea.scrollHeight; // Keep scroll bar at bottom
}

// Input processing
function process(input) {
    var punctuationless = input.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, ""); // Remove punctuation
    s = punctuationless.replace(/\s{2,}/g, " ");
    s = s.toLowerCase();

    switch(s) {
        case "reset":
            reset();
            s = "Game reset.";
            break;
        case "help":
            s = "Here to help!";
            break;
        case "money":
            s = "You have $"  + money + ".";
            break;
        case "status":
            s = travelStatus();
            break;
        default:
            s = "I'm afraid that's not allowed.";
    }

    return s;
}

// Reset the game
function reset() {
    money = 7000;
    textOut.val("");

    textarea.scrollTop = 0; // Reset the textarea scroll
}

function travelStatus() {

}
