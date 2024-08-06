function reflex_agent(location, state) {
    if (state == "DIRTY") return "CLEAN";
    if (location == "A") return "RIGHT";
    if (location == "B") return "LEFT";
}

function updateState(location, action, states) {
    if (action == "CLEAN") {
        if (location == "A") states[1] = "CLEAN";
        if (location == "B") states[2] = "CLEAN";
    } else if (action == "RIGHT") {
        states[0] = "B";
    } else if (action == "LEFT") {
        states[0] = "A";
    }
}

function resetStates(states) {
    if (states[3] >= 4) {
        states[3] = 0;
        states[1] = "DIRTY";
        states[2] = "DIRTY";
    } else if (states[3] == 1) {
        states[1] = "CLEAN";
        states[2] = "DIRTY";
    } else if (states[3] == 2) {
        states[1] = "DIRTY";
        states[2] = "CLEAN";
    } else if (states[3] == 3) {
        states[1] = "CLEAN";
        states[2] = "CLEAN";
    }
}

function checkAndReset(states) {
    if (states[1] == "CLEAN" && states[2] == "CLEAN") {
        if (states[3] == undefined) {
            states[3] = 0;
        }
        states[3]++;
        resetStates(states);
    }
}

function logAction(location, action_result) {
    document.getElementById("log").innerHTML += "<br>Location: ".concat(location).concat(" | Action: ").concat(action_result);
}

function test(states) {
    var location = states[0];
    var state = location == "A" ? states[1] : states[2];
    var action_result = reflex_agent(location, state);
    logAction(location, action_result);
    updateState(location, action_result, states);
    checkAndReset(states);
    setTimeout(function() { test(states); }, 2000);
}

var states = ["A", "DIRTY", "DIRTY"];
test(states);
