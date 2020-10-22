var tran = new Translater();
var is_opened = false;

document.getElementById("menu_icon").onclick = function() {
  console.log(is_opened);

  if (is_opened) {
    document.getElementById("pane").style.display = 'none';
    document.getElementById("menu_icon").style.marginRight = '50px';
    is_opened = false;
  } else {
    document.getElementById("pane").style.display = 'block';

    if (window.innerWidth < 800) {
      document.getElementById("menu_icon").style.display = 'none';
    } else {
      document.getElementById("menu_icon").style.marginRight = '23%';
    }
    is_opened = true;
  }
};

document.getElementById("page").onclick = function() {
  document.getElementById("pane").style.display = 'none';
  document.getElementById("menu_icon").style.display = 'block';
  document.getElementById("menu_icon").style.marginRight = '50px';
  is_opened = false;
};



if (tran.getLang() ==="eo") {
  var all = document.getElementsByClassName('btn');
  for (var i = 0; i < all.length; i++) {
    all[i].style.width = '91px';
  }
}
