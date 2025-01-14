var textElement = document.getElementById('rollingHeroText');
var states = ['Programmer', 'Craftsman', 'Designer'];
var currentStateIndex = 0;

function rollText() {
    var currentText = states[currentStateIndex];
    var rolledText = '';

    for (var i = 0; i < currentText.length; i++) {
        rolledText += '<span class="rollingEffect">' + currentText[i] + '</span>';
    }

    textElement.innerHTML = rolledText;

    currentStateIndex = (currentStateIndex + 1) % states.length;
}

// Call the rollText function at an interval
setInterval(rollText, 3000); // Adjust the interval as needed