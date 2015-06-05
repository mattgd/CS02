// Declare the variables
var title = "Seven Day Tour";
var gameStarted = false;
var money = 7000;

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

// Set the variables
$(document).ready(function() {
    balance = $('#balance');
    balance.text("Money: " + currencySymbol + money);
    textIn = $('#input');
    textOut = $('#output');
    textOut.val("Are you ready to begin? Type 'yes' or 'no' in the text box below.\n\n");
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
            + name.substr(1, name.indexOf(" "))
            + name.substr(name.indexOf(" ") + 1, 1).toUpperCase() + name.substr(name.indexOf(" ") + 2);
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
            price = availableDestinations[i].substr(4, 5);
            time = availableDestinations[i].substr(9);
            break;
        }
    }

    selectingFlight = false;
    time = parseInt(time.substr(0, time.indexOf("h"))) * 60
         + parseInt(time.substr(time.indexOf("h") + 1, time.indexOf("m")));
    return pay(price) + " You arrive in " + getCity(airport) + " " + timelapse(time) + ".";
}

function isAvailableFlight(airport) {
    for (var i = 0; i < availableDestinations.length; i++) {
        if (availableDestinations[i].substr(0, 3).toLowerCase() == airport) {
            return true;
        }
    }
    return false;
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

afAirports = [ "JNB", "CAI", "CPT" ];
asAirports = [ "PEK", "HND", "DXB" ];
auAirports = [ "SYD", "MEL", "BNE" ];
euAirports = [ "LHR", "CDG", "FRA" ];
saAirports = [ "GRU", "BOG", "GIG" ];

// Africa
afFlights = [ "JNB-PEK:0678:18h50m", "JNB-HND:1481:19h40m", "JNB-DXB:0428:10h45m",
              "JNB-SYD:0667:11h50m", "JNB-MEL:0673:15h25m", "JNB-BNE:0675:15h25m",
              "JNB-LHR:1278;10h45m", "JNB-CDG:1071:10h30m", "JNB-FRA:0779:10h40m",
              "JNB-GRU:1196:08h40m", "JNB-BOG:2738:27h10m", "JNB-GIG:1332:12h31m",
              "CAI-PEK:0628:13h20m", "CAI-HND:1088:26h05m", "CAI-DXB:0334:09h15m",
              "CAI-SYD:0761:19h00m", "CAI-MEL:0701:18h25m", "CAI-BNE:0756:20h20m",
              "CAI-LHR:0729:04h50m", "CAI-CDG:0563:04h20m", "CAI-FRA:0467:04h05m",
              "CAI-GRU:2279:19h25m", "CAI-BOG:2470:17h30m", "CAI-GIG:1532:17h40m",
              "CPT-PEK:0760:22h05m", "CPT-HND:1518:23h25m", "CPT-DXB:0899:09h35m",
              "CPT-LHR:1629:11h25m", "CPT-CDG:0802:26h40m", "CPT-FRA:0885:14h35m",
              "CPT-BOG:1936:33h45m" ];
// Asia
asFlights = [ "PEK-SYD:1189:20h10m", "PEK-MEL:1361:15h50m", "PEK-BNE:1240:21h10m",
              "PEK-LHR:0978:10h00m", "PEK-CDG:0960:10h05m", "PEK-FRA:0896:09h15m",
              "PEK-GRU:1263:23h45m", "PEK-BOG:1420:27h28m", "PEK-GIG:1271:24h24m",
              "HND-SYD:0975:21h20m", "HND-MEL:1466:19h15m", "HND-BNE:0784:24h15m",
              "HND-LHR:0956:11h40m", "HND-CDG:0768:11h55m", "HND-FRA:1124:11h25m",
              "HND-GRU:1705:27h05m", "HND-BOG:1573:25h20m", "HND-GIG:1646:28h45m",
              "DXB-SYD:1829:13h55m", "DXB-MEL:1633:13h20m", "DXB-BNE:1916:13h45m",
              "DXB-LHR:0538:07h00m", "DXB-CDG:1124:11h25m", "DXB-FRA:0411:06h25m",
              "DXB-GRU:2385:21h20m", "DXB-BOG:1644:24h00m", "DXB-GIG:1128:22h36m" ];
// Europe
euFlights = [ "LHR-SYD:1201:22h50m", "LHR-MEL:1084:22h50m", "LHR-BNE:1224:26h20m",
              "LHR-GRU:1548:14h35m", "LHR-BOG:1243:15h50m", "LHR-GIG:1549:14h00m",
              "CDG-SYD:1448:23h05m", "CDG-MEL:1315:22h30m", "CDG-BNE:1212:23h00m",
              "CDG-GRU:1573:11h10m", "CDG-BOG:0949:20h00m", "CDG-GIG:1574:10h50m",
              "FRA-SYD:1145:22h40m", "FRA-MEL:1229:21h35m", "FRA-BNE:1241:27h40m",
              "FRA-GRU:1702:13h50m", "FRA-BOG:1721:11h10m", "FRA-GIG: 1554:13h40m" ];
// North America
naFlights = [ "ATL-JNB:2182:15h31m", "ATL-CAI:1466:16h05m", "ATL-CPT:2220:19h36m",
              "ATL-PEK:1543:17h55m", "ATL-HND:1674:23h25m", "ATL-DXB:2545:14h35m",
              "ATL-LHR:2223:08h10m", "ATL-CDG:2168:08h17m", "ATL-FRA:1596:09h10m",
              "ATL-GRU:0790:09h41m", "ATL-BOG:1095:04h56m", "ATL-GIG:2015:09h35m",
              "LAX-JNB:1600:25h45m", "LAX-CAI:1504:17h30m", "LAX-CPT:1633:29h30m",
              "LAX-PEK:1876:12h40m", "LAX-HND:1955:11h50m", "LAX-DXB:2990:15h50m",
              "LAX-LHR:1600:10h35m", "LAX-CDG:2751:10h50m", "LAX-FRA:2053:11h00m",
              "LAX-GRU:1171:12h05m", "LAX-BOG:0522:15h24m", "LAX-GIG:1009:15h30m",
              "ORD-JNB:1176:32h10m", "ORD-CAI:1404:14h04m", "ORD-CPT:1372:35h55m",
              "ORD-PEK:1360:13h30m", "ORD-HND:1655:19h25m", "ORD-DXB:2694:13h40m",
              "ORD-LHR:1306:07h55m", "ORD-CDG:2003:08h20m", "ORD-FRA:1883:08h30m",
              "ORD-GRU:0857:10h30m", "ORD-BOG:0442:07h57m", "ORD-GIG:1194:12h46m" ];
// South America
saFlights = [ "GRU-SYD:1337:26h35m", "GRU-MEL:2673:22h45m", "GRU-BNE:1541:30h45m",
              "BOG-SYD:1371:32h10m", "BOG-MEL:1646:31h45m", "BOG-BNE:1531:32h40m",
              "GIG-SYD:1338:27h35m", "GIG-MEL:1541:32h54m", "GIG-BNE:1549:33h24m" ];

/*Africa: JNB (Johannesburg, 0), CAI (Cairo, 1), CPT (Cape Town, 2)
Asia: PEK (Beijing, 3), HND (Tokyo, 4), DXB (Dubai, 5)
Australia: SYD (Sydney, 6), MEL (Melbourne, 7), BNE (Brisbane, 8)
Europe: LHR (London, 9), CDG (Paris, 10), FRA (Frankfurt, 11)
North America: ATL (Atlanta, 12), LAX (Los Angeles, 13), ORD (Chicago, 14)
South America: GRU (São Paulo, 16), BOG (Bogotá, 17), GIG (Rio de Janeiro, 18)*/
