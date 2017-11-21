import json

# Africa
afFlights = [ 
     "JNB-BNE:0675:15h25m",
    "JNB-LHR:1278:10h45m", "JNB-CDG:1071:10h30m", "JNB-FRA:0779:10h40m",
    "JNB-GRU:1196:08h40m", "JNB-BOG:2738:27h10m", "JNB-GIG:1332:12h31m",
    "CAI-PEK:0628:13h20m", "CAI-HND:1088:26h05m", "CAI-DXB:0334:09h15m",
    "CAI-SYD:0761:19h00m", "CAI-MEL:0701:18h25m", "CAI-BNE:0756:20h20m",
    "CAI-LHR:0729:04h50m", "CAI-CDG:0563:04h20m", "CAI-FRA:0467:04h05m",
    "CAI-GRU:2279:19h25m", "CAI-BOG:2470:17h30m", "CAI-GIG:1532:17h40m",
    "CPT-PEK:0760:22h05m", "CPT-HND:1518:23h25m", "CPT-DXB:0899:09h35m",
    "CPT-LHR:1629:11h25m", "CPT-CDG:0802:26h40m", "CPT-FRA:0885:14h35m",
    "CPT-BOG:1936:33h45m" ]
# Asia
asFlights = [ "PEK-SYD:1189:20h10m", "PEK-MEL:1361:15h50m", "PEK-BNE:1240:21h10m",
    "PEK-LHR:0978:10h00m", "PEK-CDG:0960:10h05m", "PEK-FRA:0896:09h15m",
    "PEK-GRU:1263:23h45m", "PEK-BOG:1420:27h28m", "PEK-GIG:1271:24h24m",
    "HND-SYD:0975:21h20m", "HND-MEL:1466:19h15m", "HND-BNE:0784:24h15m",
    "HND-LHR:0956:11h40m", "HND-CDG:0768:11h55m", "HND-FRA:1124:11h25m",
    "HND-GRU:1705:27h05m", "HND-BOG:1573:25h20m", "HND-GIG:1646:28h45m",
    "DXB-SYD:1829:13h55m", "DXB-MEL:1633:13h20m", "DXB-BNE:1916:13h45m",
    "DXB-LHR:0538:07h00m", "DXB-CDG:1124:11h25m", "DXB-FRA:0411:06h25m",
    "DXB-GRU:2385:21h20m", "DXB-BOG:1644:24h00m", "DXB-GIG:1128:22h36m" ]
# Europe
euFlights = [ "LHR-SYD:1201:22h50m", "LHR-MEL:1084:22h50m", "LHR-BNE:1224:26h20m",
    "LHR-GRU:1548:14h35m", "LHR-BOG:1243:15h50m", "LHR-GIG:1549:14h00m",
    "CDG-SYD:1448:23h05m", "CDG-MEL:1315:22h30m", "CDG-BNE:1212:23h00m",
    "CDG-GRU:1573:11h10m", "CDG-BOG:0949:20h00m", "CDG-GIG:1574:10h50m",
    "FRA-SYD:1145:22h40m", "FRA-MEL:1229:21h35m", "FRA-BNE:1241:27h40m",
    "FRA-GRU:1702:13h50m", "FRA-BOG:1721:11h10m", "FRA-GIG: 1554:13h40m" ]
# North America
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
    "ORD-GRU:0857:10h30m", "ORD-BOG:0442:07h57m", "ORD-GIG:1194:12h46m" ]
# South America
saFlights = [ "GRU-SYD:1337:26h35m", "GRU-MEL:2673:22h45m", "GRU-BNE:1541:30h45m",
    "BOG-SYD:1371:32h10m", "BOG-MEL:1646:31h45m", "BOG-BNE:1531:32h40m",
    "GIG-SYD:1338:27h35m", "GIG-MEL:1541:32h54m", "GIG-BNE:1549:33h24m" ]

airports = {
    "Africa": {
        "JNB": "Johannesburg",
        "CAI": "Cairo",
        "CPT": "Cape Town"
    },
    "Asia": {
        "PEK": "Beijing",
        "HND": "Tokyo",
        "DXB": "Dubai"
    },
    "Australia": {
        "SYD": "Sydney",
        "MEL": "Melbourne",
        "BNE": "Brisbane"
    },
    "Europe": {
        "LHR": "London",
        "CDG": "Paris",
        "FRA": "Frankfurt"
    },
    "North America": {
        "ATL": "Atlanta",
        "LAX": "Los Angeles",
        "ORD": "Chicago"
    },
    "South America": {
        "GRU": "São Paulo",
        "BOG": "Bogotá",
        "GIG": "Rio de Janeiro"
    }
}

airports_json = {
    "Africa": {
        "Johannesburg": {
            "code": "JNB",
            "flights": []
        },
        "Cairo": {
            "code": "CAI",
            "flights": []
        },
        "Cape Town": {
            "code": "CPT",
            "flights": []
        }
    },
    "Asia": {
        "Beijing": {
            "code": "PEK",
            "flights": []
        },
        "Tokyo": {
            "code": "HND",
            "flights": []
        },
        "Dubai": {
            "code": "DXB",
            "flights": []
        }
    },
    "Australia": {
        "Sydney": {
            "code": "SYD",
            "flights": []
        },
        "Melbourne": {
            "code": "MEL",
            "flights": []
        },
        "Brisbane": {
            "code": "BNE",
            "flights": []
        }
    },
    "Europe": {
        "London": {
            "code": "LHR",
            "flights": []
        },
        "Paris": {
            "code": "CDG",
            "flights": []
        },
        "Frankfurt": {
            "code": "FRA",
            "flights": []
        }
    },
    "North America": {
        "Atlanta": {
            "code": "ATL",
            "flights": []
        },
        "Los Angeles": {
            "code": "LAX",
            "flights": []
        },
        "Chicago": {
            "code": "ORD",
            "flights": []
        }
    },
    "South America": {
        "São Paulo": {
            "code": "GRU",
            "flights": []
        },
        "Bogotá": {
            "code": "BOG",
            "flights": []
        },
        "Rio de Janeiro": {
            "code": "GIG",
            "flights": []
        }
    }
}

def convert_arrays():
    arrays = [ afFlights, asFlights, euFlights, naFlights, saFlights ]

    for arr in arrays:
        for flight in arr:
            flight = flight.split(":")
            airport = None
            region = None
            departure = flight[0].split("-")[0]
            destination = flight[0].split("-")[1]

            for continent in airports:
                if departure in airports[continent]:
                    region = continent
                    airport = airports[continent][departure]
            
            cost = int(flight[1])
            duration = flight[2]

            airports_json[region][airport].setdefault("flights", []).append(
                {
                    destination: {
                        "cost": cost,
                        "duration": duration
                    }
                }
            )

    print(json.dumps(airports_json, indent=4))

convert_arrays()