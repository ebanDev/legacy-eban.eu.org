var is_opened = false;

document.getElementById("menu_icon").onclick = function() {
  if (is_opened) {
    document.getElementById("pane").style.display = 'none';
    document.getElementById("menu_icon").style.marginRight = '50px';
    is_opened = false;
  } else {
    document.getElementById("pane").style.display = 'block';
    document.getElementById("menu_icon").style.marginRight = '23%';
    is_opened = true;
  }
};
