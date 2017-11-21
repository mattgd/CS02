// Declare the variables
var title = "Seven Day Tour";
var gameStarted = false;
var money = 7000;

var gameState;

// I/O
var balance, textarea, textIn, textOut;

// Location
var currentTransport, nextLocation, transportationType;
var playerLocation = "North America";
var airportCode = "ATL";
var atAirport = false;
var atPort = false;
var atCarRental = false;
var currencySymbol = "$";
var selectingFlight = false;
var availableDestinations = new Array(3);

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

/**
 * All of the possible game states.
 */
var gameStates = [
    new GameState(0, "start"),
    new GameState(1, "pause"),
    new GameState(2, "end"),
    new GameState(3, "taxi"),
    new GameState(4, "airport"),
    new GameState(5, "port"),
    new GameState(6, "driving")
]

/**
 * Returns the current game state.
 */
var getGameState = function() {
    return gameState;
}

var newGame = function() {
    gameState = new GameState(0, "start");
}

/*
 * Appends output to the text area.
*/
var prompt = function(msg) {
    textOut.val(textOut.val() + msg + "\n\n");
}

// Set the variables
$(document).ready(function() {
    balance = $('#balance');
    balance.text("Money: " + currencySymbol + money);
    textIn = $('#input');
    textOut = $('#output');
    prompt("Are you ready to begin? Type 'yes' or 'no' in the text box below.");
    textarea = document.getElementById("output");
    timer = $('#timer');

    // Set starting airport/port
    if (startingLocation == 1) {
        airportCode = "LAX";
    } else if (startingLocation == 2) {
        airportCode = "ORD";
    }

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
        prompt("You don't seem to want to do anything.");
    } else {
        textIn.val(""); // Reset textIn textbox
        var output = process(input); // Set output to the processed input
        prompt(">> " + input + "\n" + output);
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
            case "asia":
            case "europe":
            case "south america":
                s = formatName(s);
                if (nextLocation == s) {
                    if (atAirport) {
                        s = "The following flights are available to " + s + ":\n" + getFlights(airportCode, nextLocation);
                    } else {
                        s = "The ticket agent hands you a ticket to " + s + ". " + pay();
                    }
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
                    s = timelapse(10) + " later you arrive at the airport. " + pay(15, "taxi driver");
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
                        selectingFlight = true;
                        s = "Welcome! Where will you be heading today?";
                        break;
                    default:
                        s = "There doesn't seem to be a check in desk here.";
                }
                break;
            case "jnb":
            case "cai":
            case "cpt":
            case "pek":
            case "hnd":
            case "dxb":
            case "syd":
            case "mel":
            case "bne":
            case "lhr":
            case "cdg":
            case "fra":
            case "gru":
            case "bog":
            case "gig":
                if (selectingFlight) {
                    if (isAvailableFlight(s)) {
                        s = fly(s);
                    }
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

/**
 * Returns an array of all
 * of the command options.
 */
function getCommandOptions() {

}

/**
 * Reset's the game to its default state.
 */ 
function reset() {
    money = 7000;
    prompt("");

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
            + name.substr(1, name.indexOf(" "))
            + name.substr(name.indexOf(" ") + 1, 1).toUpperCase() + name.substr(name.indexOf(" ") + 2);
    }
    return name;
}

var timelapse = function(minutes) {
    time += minutes;
    return convertTime(minutes);
}

var pay = function(amount, recipient) {
    money -= amount;
    balance.text("Money: " + currencySymbol + money);
    return "You pay the " + recipient + " " + currencySymbol + amount + ".";
}

var getDay = function() {
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

function getCost(from, to) {
    var price = 0;
    var identifiers = [ from + "-" + to, to + "-" + from ];
    var lists = [ afFlights, asFlights, euFlights, naFlights, saFlights ];

    for (var i = 0; i < lists.length; i++) {
        price = searchForCost(lists[i], identifiers);
        if (price != 0) break; // Stop once it finds a valid price
    }

    return price;
}

function searchForCost(list, identifiers) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].substr(0, 7) == identifiers[0] || list[i].substr(0, 7) == identifiers[1]) {
            return parseInt(list[i].substr(8, 5));
        }
    }
    return 0;
}

function getTime(from, to) {
    var time = 0;
    var identifiers = [ from + "-" + to, to + "-" + from ];
    var lists = [ afFlights, asFlights, euFlights, naFlights, saFlights ];

    for (var i = 0; i < lists.length; i++) {
        time = searchForTime(lists[i], identifiers);
        if (time != 0) break; // Stop once it finds a valid price
    }
    return time;
}

function searchForTime(list, identifiers) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].substr(0, 7) == identifiers[0] || list[i].substr(0, 7) == identifiers[1]) {
            return list[i].substr(13, 6);
        }
    }
    return 0;
}

function getFlights(from, to) {
    var flightCount = 0;
    var cost, time;
    var flights = "";
    var list = afAirports;
    switch (to) {
        case "Africa":
            break;
        case "Asia":
            list = asAirports;
            break;
        case "Australia":
            list = auAirports;
            break;
        case "Europe":
            list = euAirports;
            break;
        default:
            list = saAirports;
    }

    for (var i = 0; i < list.length; i++) {
        cost = getCost(from, list[i]);
        time = getTime(from, list[i]);

        flights += "To " + getCity(list[i]) + " (" + list[i] + "): "
            + currencySymbol + cost + " (" + time + ")\n";

        // Add the destination to the available destinations
        availableDestinations[flightCount] = list[i] + ":" + cost + ":" + time;
        flightCount++;
    }
    return flights;
}

function getCity(airport) {
    airport = airport.toUpperCase();
    switch (airport) {
        case "JNB":
            airport = "Johannesburg";
            break;
        case "CAI":
            airport = "Cairo";
            break;
        case "CPT":
            airport = "Cape Town";
            break;
        case "PEK":
            airport = "Beijing";
            break;
        case "HND":
            airport = "Tokyo";
            break;
        case "DXB":
            airport = "Dubai";
            break;
        case "SYD":
            airport = "Sydney";
            break;
        case "MEL":
            airport = "Melbourne";
            break;
        case "BNE":
            airport = "Brisbane";
            break;
        case "LHR":
            airport = "London";
            break;
        case "CDG":
            airport = "Paris";
            break;
        case "FRA":
            airport = "Frankfurt";
            break;
        case "GRU":
            airport = "Sao Paulo";
            break;
        case "BOG":
            airport = "Bogota";
            break;
        case "GIG":
            airport = "Rio de Janeiro";
            break;
    }
    return airport;
}

function fly(airport) {
    var price, time;

    for (var i = 0; i < availableDestinations.length; i++) {
        if (availableDestinations[i].substr(0, 3).toLowerCase() == airport) {
            price = availableDestinations[i].substr(4, 4);
            time = availableDestinations[i].substr(9);
            break;
        }
    }

    selectingFlight = false;
    // Add 60 minutes plus the time for the flight to the game time
    time = parseInt(time.substr(0, time.indexOf("h"))) * 60
         + parseInt(time.substr(time.indexOf("h") + 1, time.indexOf("m")) + 60);
    return pay(price, "ticket agent") + getDelay("air")
        + " You arrive in " + getCity(airport) + " in " + timelapse(time) + ".";
}

function isAvailableFlight(airport) {
    for (var i = 0; i < availableDestinations.length; i++) {
        if (availableDestinations[i].substr(0, 3).toLowerCase() == airport) {
            return true;
        }
    }
    return false;
}

function convertTime(time) {
    minutes = time;
    hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    days = Math.floor(hours / 24);
    hours = hours % 24;

    if (hours < 1) {
        time = minutes + " minutes";
    } else {
        if (days < 1) {
            time = hours + " hours and " + minutes + " minutes";
        } else {
            time = days + " days, " + hours + " hours, and " + minutes + " minutes";
        }
    }

    return time;
}

function getDelay(type) {
    var delay = getRandom(0, 3);

    if (delay > 1) {
        delay = getRandom(0, 3);

        switch (delay) {
            case 1:
                delay = "180";
                break;
            case 2:
                delay = "300";
                break;
            case 3:
                delay = "420";
                break;
            default:
                delay = "60";
        }

        if (type == "air") {
            delay = " There was a " + timelapse(delay) + " flight delay due to the weather.";
        } else if (type == "sea") {
            delay = " There was a " + timelapse(delay) + " sailing delay due to the weather.";
        } else {
            delay = " There was a " + timelapse(delay) + " driving delay due to the traffic.";
        }
        return delay;
    }
    return "";
}
// Air travel information
// Variable name is departure/arrival airport

/*
AF <-> AS
AF --> AU
AF <-> EU
AF <-> SA

AS --> AU
AS <-> EU
AS <-> SA

EU --> AU
EU <-> SA

NA --> AF
NA --> AS
NA --> EU
NA --> SA

SA --> AU
*/


/*Africa: JNB (Johannesburg, 0), CAI (Cairo, 1), CPT (Cape Town, 2)
Asia: PEK (Beijing, 3), HND (Tokyo, 4), DXB (Dubai, 5)
Australia: SYD (Sydney, 6), MEL (Melbourne, 7), BNE (Brisbane, 8)
Europe: LHR (London, 9), CDG (Paris, 10), FRA (Frankfurt, 11)
North America: ATL (Atlanta, 12), LAX (Los Angeles, 13), ORD (Chicago, 14)
South America: GRU (São Paulo, 16), BOG (Bogotá, 17), GIG (Rio de Janeiro, 18)*/
