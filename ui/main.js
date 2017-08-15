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
    console.log(text);
    document.getElementById("Hi").innerHTML = text;
}

var img = document.getElementById("img");
var marginLeft = 0;

function moveRight() {
    marginLeft += 5;
    img.style.marginLeft = marginLeft + "px";
    
    if (marginLeft > 1000) marginLeft = 0;
}

img.onclick = function() {
    var interval = setInterval(moveRight, 50);
}