// Declare the variables
var title = "Seven Day Tour";
var gameStarted = false;
var money = 7000;

// I/O
var balance, textarea, textIn, textOut;

// Location
var currentTransport, nextLocation, transportationType;
var playerLocation = "North America";
var atAirport = false;
var atPort = false;
var atCarRental = false;
var airportName = "Seattle-Tacoma International Airport"; //TODO Make a list of all of the airport names
var currencySymbol = "$";

//TODO Ask if male or female

// Generate a random index for North America starting location
var startingLocation = getRandom(0, 2);

var afCities = [ "Johannesburg", "Cairo", "Cape Town" ];
var asCities = [ "Beijing", "Tokyo", "Dubai" ];
var auCities = [ "Sydney", "Melbourne", "Brisbane" ];
var euCities = [ "London", "Paris", "Frankfurt" ];
var naCities = [ "Atlanta", "Los Angeles", "Chicago" ];
var saCities = [ "São Paulo", "Bogotá", "Rio de Janeiro" ]; //TODO Get rid of the accents if the user has to type these in

// Time
var date = new Date();
var day = 1;
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
var gameDate = monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
var time = 0;
var timer;

/* Transportation Types
    0 - plane
    1 - boat
    2 - car
    3 - not moving
*/

// Set the variables
$(document).ready(function() {
    balance = $('#balance');
    balance.text("Money: " + currencySymbol + money);
    textIn = $('#input');
    textOut = $('#output');
    textOut.val("Are you ready to begin? Type 'yes' or 'no' in the text box below.\n\n");
    textarea = document.getElementById("output");
    timer = $('#timer');
    startingLocation = naCities[startingLocation];
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
                //TODO Help based on current location
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
                s = formatName(s);
                if (nextLocation == s) {
                    s = "The ticket agent hands you a ticket to " + s + ". " + pay();
                } else {
                    setNextLocation(s);
                    s += ". Awesome! How would you like to get there? " + getValidTransportation();
                }
                break;
            case "australia":
                if (!lastStop) {
                    s = "You have to visit the other continents first.";
                }
                break;
            case "plane":
                if (isValidTransportation(s)) {
                    currentTransport = s;
                    atAirport = true;
                    s = timelapse(10) + "airport. " + pay(15, "taxi driver");
                } else {
                    s = "There are no flights available to " + nextLocation + ".";
                }
                break;
            case "boat":
                if (isValidTransportation(s)) {
                    currentTransport = s;
                    atPort = true;
                    s = timelapse(10) + "port. " + pay(30, "taxi driver");
                } else {
                    s = "There are no boat rides available to " + nextLocation + ".";
                }
                break;
            case "car":
                if (isValidTransportation(s)) {
                    currentTransport = s;
                    atCarRental = true;
                    s = timelapse(10) + "car rental. " + pay(20, "taxi driver");
                } else {
                    s = "You cannot drive to " + nextLocation + ".";
                }
                break;
            case "check in":
                switch (currentTransport) {
                    case "plane":
                        s = "Hello! Where will you be heading today?";
                        break;
                    default:
                        s = "There doesn't seem to be a check in desk.";
                }
                if (currentTransport == "plane" || currentTransport == "boat" || currentTransport == "car") {

                } else {

                }
                break;
            default:
                s = "I'm afraid '" + s + "' is not allowed.";
        }
    } else {
        if (s == "yes" || s == "y") {
            gameStarted = true;
            startTimer();
            s = "Day " + getDay() + " - " + startingLocation + ":\nYou call a taxi. The taxi driver asks you where you're headed.";
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

function startTimer() {
    var days, hours, minutes, timerText;
    setInterval(function() {
        time++;

        minutes = time;
        hours = Math.floor(minutes / 60);
        minutes = minutes % 60;
        days = Math.floor(hours / 24);
        hours = hours % 24;

        if (hours < 1) {
            timerText = minutes + " minutes";
        } else {
            if (days < 1) {
                timerText = hours + " hours and " + minutes + " minutes";
            } else {
                this.days = days;
                timerText = days + " days, " + hours + " hours, and " + minutes + " minutes";
            }
        }

        timer.text("Time: " + timerText);
    }, 1000);
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
    var allOptions = s + ", boat, or car.";
    var normalOptions = s + " or by boat.";

    switch (nextLocation) {
        case "Africa":
            if (playerLocation == "Asia") {
                s = allOptions;
            } else {
                s = normalOptions;
            }
            break;
        case "Asia":
            if (playerLocation == "Africa" || playerLocation == "Europe") {
                s = allOptions;
            } else {
                s = normalOptions;
            }
            break;
        case "Europe":
            if (playerLocation == "Asia") {
                s = allOptions;
            } else {
                s = normalOptions;
            }
            break;
        case "South America":
            if (playerLocation == "North America") {
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
            if (playerLocation == "Asia") {
                valid = 1;
            } else {
                valid = 0;
            }
            break;
        case "Asia":
            if (playerLocation == "Africa" || playerLocation == "Europe") {
                valid = 1;
            } else {
                valid = 0;
            }
            break;
        case "Europe":
            if (playerLocation == "Asia") {
                valid = 1;
            } else {
                valid = 0;
            }
            break;
        case "South America":
            if (playerLocation == "North America") {
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

    if (playerLocation == "Africa") {

        if (type == 2) {
            s = "Sorry, you cannot drive to "
        } else if (type == 0) {
            s = "I'll drive you to the airport to fly to ";
        } else if (type == 1) {
            s = "I'll drive you to the port to sail to ";
        } else {
            s = "I'm sorry, you can't travel that way to ";
        }
    } else if (playerLocation == "North America") {
        if (type == 2) {
            s = "Sorry, you cannot drive to "
        } else if (type == 0) {
            s = "I'll drive you to the airport to fly to ";
        } else if (type == 1) {
            s = "I'll drive you to the port to sail to ";
        } else {
            s = "I'm sorry, you can't travel that way to ";
        }
    } else if (playerLocation == "North America") {
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

    return s;
}

function setNextLocation(playerLocation) {
    nextLocation = playerLocation;
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

function timelapse(minutes) {
    time += minutes;
    return minutes + " minutes later, you arrive at the ";
}

function pay(amount, recipient) {
    money -= amount;
    balance.text("Money: " + currencySymbol + money);
    return "You pay the " + recipient + " " + currencySymbol + amount + ".";
}

function getDay() {
    var hours = Math.floor(timer / 60);
    var days = Math.floor(hours / 24);
    hours = Math.floor(days % 24);
    if (hours >= 1) {
        day++;
    }
    return day;
}

function getRandom(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

// Plane travel information

// Africa
jnb = [ "PEK:0678:18h50m", "HND:1481:19h40m", "DXB:0428:10h45m",
        "SYD:", "MEL:", "BNE:",
        "LHR:", "CDG:", "FRA:",
        "GRU:", "BOG:", "GIG:" ];
cai = [ "PEK:0628:13h20m", "HND:1088:26h05m", "DXB:0334:09h15m",
        "SYD:", "MEL:", "BNE:",
        "LHR:", "CDG:", "FRA:",
        "GRU:", "BOG:", "GIG:" ];
cpt = [ "PEK:0760:22h05m", "HND:1518:23h25m", "DXB:0899:09h35m",
        "SYD:", "MEL:", "BNE:",
        "LHR:", "CDG:", "FRA:",
        "GRU:", "BOG:", "GIG:" ];
// Asia
pek = [ "JNB:1200:18h50m", "CAI:1481:19h40m", "CPT:0428:10h45m",
        "SYD:", "MEL:", "BNE:",
        "LHR:", "CDG:", "FRA:",
        "GRU:", "BOG:", "GIG:" ];

/*Africa: JNB (Johannesburg, 0), CAI (Cairo, 1), CPT (Cape Town, 2)
Asia: PEK (Beijing, 3), HND (Tokyo, 4), DXB (Dubai, 5)
Australia: SYD (Sydney, 6), MEL (Melbourne, 7), BNE (Brisbane, 8)
Europe: LHR (London, 9), CDG (Paris, 10), FRA (Frankfurt, 11)
North America: ATL (Atlanta, 12), LAX (Los Angeles, 13), ORD (Chicago, 14)
South America: GRU (São Paulo, 16), BOG (Bogotá, 17), GIG (Rio de Janeiro, 18)*/
