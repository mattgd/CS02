// Declare the variables
var title = "Seven Day Tour";
var location = "North America";
var currentTransport, money, nextLocation, textarea, textIn, textOut, transportationType;
var gameStarted = false;
var timelapse = "Ten minutes later you arrive at the ";
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
                setNextLocation(formatName(s));
                s = formatName(s) + ". Great! How would you like to get there? " + getValidTransportation();
                break;
            case "australia":
                if (!lastStop) {
                    s = "You have to visit the other continents first.";
                }
                break;
            case "plane":
                if (isValidTransportation(s)) {
                    currentTransport = s;
                    s = timelapse + "airport.";
                } else {
                    s = "There are no flights available to " + nextLocation + ".";
                }
                break;
            case "boat":
                if (isValidTransportation(s)) {
                    currentTransport = s;
                    s = timelapse + "port.";
                } else {
                    s = "There are no boat rides available to " + nextLocation + ".";
                }
            case "car":
                if (isValidTransportation(s)) {
                    currentTransport = s;
                    s = timelapse + "car rental.";
                } else {
                    s = "You cannot drive to " + nextLocation + ".";
                }
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

function getValidTransportation() {
    var s = "You can travel by plane";
    var allOptions = s + ", boat, and car.";
    var normalOptions = s + " or boat.";

    switch (nextLocation) {
        case "Africa":
            if (location == "Asia") {
                s = allOptions;
            } else {
                s = normalOptions;
            }
            break;
        case "Asia":
            if (location == "Africa" || location == "Europe") {
                s = allOptions;
            } else {
                s = normalOptions;
            }
            break;
        case "Europe":
            if (location == "Asia") {
                s = allOptions;
            } else {
                s = normalOptions;
            }
            break;
        case "South America":
            if (location == "North America") {
                s = allOptions;
            } else {
                s = normalOptions;
            }
            break;
        default:
            s = normalOptions;
    }
    return s;
}

function isValidTransportation(type) {
    var valid;

    switch (nextLocation) {
        case "Africa":
            if (location == "Asia") {
                valid = 1;
            } else {
                valid = 0;
            }
            break;
        case "Asia":
            if (location == "Africa" || location == "Europe") {
                valid = 1;
            } else {
                valid = 0;
            }
            break;
        case "Europe":
            if (location == "Asia") {
                valid = 1;
            } else {
                valid = 0;
            }
            break;
        case "South America":
            if (location == "North America") {
                valid = 1;
            } else {
                valid = 0;
            }
            break;
        default:
            valid = 0;
    }

    if (valid == 1) {
        if (type == "plane" || type == "boat" || type == "car") return true;
    } else {
        if (type == "plane" || type == "boat") return true;
    }
    return false;
}

function getTransportation(type) {
    var s;
    type = convertTransportationType(type);

    if (location == "Africa") {

        if (type == 2) {
            s = "Sorry, you cannot drive to "
        } else if (type == 0) {
            s = "I'll drive you to the airport to fly to ";
        } else if (type == 1) {
            s = "I'll drive you to the port to sail to ";
        } else {
            s = "I'm sorry, you can't travel that way to ";
        }
    } else if (location == "North America") {
        if (type == 2) {
            s = "Sorry, you cannot drive to "
        } else if (type == 0) {
            s = "I'll drive you to the airport to fly to ";
        } else if (type == 1) {
            s = "I'll drive you to the port to sail to ";
        } else {
            s = "I'm sorry, you can't travel that way to ";
        }
    } else if (location == "North America") {
        if (type == 2) {
            s = "Sorry, you cannot drive to "
        } else if (type == 0) {
            s = "I'll drive you to the airport to fly to ";
        } else if (type == 1) {
            s = "I'll drive you to the port to sail to ";
        } else {
            s = "I'm sorry, you can't travel that way to ";
        }
    }

    return;
}

function setNextLocation(location) {
    nextLocation = location;
}

function formatName(name) {
    if (name.indexOf(" ") == -1) {
        name = name.substr(0, 1).toUpperCase() + name.substr(1);
    } else {
        name = name.substr(0, 1).toUpperCase()
            + name.substr(1, name.indexOf(" ") + 1)
            + name.substr(name.indexOf(" ") + 1, 1).toUpperCase() + s.substr(name.indexOf(" ") + 2);
    }
    return name;
}
