textIn  = document.getElementById("input");
textOut = document.getElementById("output");

function process(input) {
    if (input == "hi") {
        return "Hi to you too, player.";
    } else if (input == "exit") {
        return "No.";
    }
}

function submit() {
    var input = textIn.value;
    textIn.value = "";
    var output = process(input);
    textOut.value += output + "\n";
}
