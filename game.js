// Declare the variables
var title = "Seven Day Tour";
var location, money, nextLocation, textarea, textIn, textOut, transportationType;
var gameStarted = false;
/* Transportation Types
    0 - plane
    1 - boat
    2 - car
    3 - not moving
*/

// Set the variables
$(document).ready(function() {
    money = 7000;
    textIn = $('#input');
    textOut = $('#output');
    textOut.val("Are you ready to begin? Type 'yes' or 'no' in the text box below.\n\n");
    textarea = document.getElementById("output");
});

$(document).keypress(function(e) {
    if (e.which == 13) {
        console.log("HERE");
        $('#submit').click();
    }
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

    if (gameStarted) {
        switch (s) {
            case "yes":
                break;
            case "no":
                break;
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
            case "africa":
            case "antarctica":
            case "asia":
            case "europe":
            case "south america":
            case "antarctica":
                var location = s.substr(0, 1).toUpperCase() + s.substr(1);
                setNextLocation(location);
                s = location + ". Great! How would you like to get there?";
                break;
            case "plane":
            case "boat":
            case "car":
                s = getTransportation(s);
                break;
            default:
                s = "I'm afraid '" + s + "' is not allowed.";
        }
    } else {
        if (s == "yes" || s == "y") {
            gameStarted = true;
            s = "You call a taxi. The taxi driver asks you where you're headed.";
        } else if (s == "no" || s == "n") {
            s = "Alright, that's fine.";
        } else {
            s = "It's a simple yes or no question.";
        }
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
    switch (transportationType) {
        case 0:
            // Plane
            break;
        case 1:
            // Boat
            break;
        case 2:
            // Car
            break;
        default:
            // Not moving
    }
}

function convertTransportationType(type) {
    switch (type) {
        case "plane":
            type = 0;
            break;
        case "boat":
            type = 3;
            break;
        case "car":
            type = 2;
            break;
        default:
            type = 3;
    }
    return type;
}

function getTransportation(type) {
    var s;
    type = convertTransportationType(type);
    if (location == "North America") {
        if (type == 2) {
            s = "Sorry, you cannot drive to "
        } else if (type == 0) {
            s = "I'll drive you to the airport to fly to ";
        } else if (type == 1) {
            s = "I'll drive you to the port to sail to ";
        } else {
            s = "I'm sorry, you can't travel that way to ";
        }
    } else if {

    }

    return;
}

function setNextLocation(location) {
    nextLocation = location;
}
