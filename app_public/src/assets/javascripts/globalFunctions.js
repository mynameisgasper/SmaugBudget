function getValueById (id) {
    return document.getElementById(id).value;
}

function setValueById (id, value) {
    document.getElementById(id).value = value;
}

function getInnerTextById (id) {
    return document.getElementById(id).innerText;
}

function setInnerTextById (id, value) {
    document.getElementById(id).innerText = value;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

function rgbToHex(rgb) {
    var match = rgb.match(/^rgb\(([0-9]*), ([0-9]*), ([0-9]*)\)$/);
    return "#" + componentToHex(parseInt(match[1])) + componentToHex(parseInt(match[2])) + componentToHex(parseInt(match[3]));
}