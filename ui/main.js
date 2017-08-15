console.log('Loaded!');

function makeText() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 20; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return "New String: " + text;
}

function changeText() {
    var text = makeText();
    document.getElementById("").innerHTML = "";
}