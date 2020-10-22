var tran = new Translater();
var is_opened = false;
var pane = document.getElementById("pane");
var menu_icon = document.getElementById("menu_icon")

menu_icon.onclick = function() {
  console.log(is_opened);

  if (is_opened) {
    pane.style.animation = "closepane 0.5s";
    pane.style.width = "0%";
    pane.style.display = 'none';
    menu_icon.style.marginRight = '50px';
    is_opened = false;
  } else {
    pane.style.display = 'block';
    pane.style.animation = "openpane 0.5s";
    pane.style.width = "20%";

    if (window.innerWidth < 800) {
      menu_icon.style.display = 'none';
    } else {
      menu_icon.style.marginRight = '23%';
    }
    is_opened = true;
  }
};

document.getElementById("page").onclick = function() {
  pane.style.animation = "closepane 0.5s";
  pane.style.width = "0%";
  pane.style.display = 'none';
  menu_icon.style.display = 'block';
  menu_icon.style.marginRight = '50px';
  is_opened = false;
};

if (tran.getLang() ==="eo") {
  var all = document.getElementsByClassName('btn');
  for (var i = 0; i < all.length; i++) {
    all[i].style.width = '91px';
  }
} else {
  var all = document.getElementsByClassName('btn');
  for (var i = 0; i < all.length; i++) {
    all[i].style.width = '87px';
  }
}

document.getElementById("en").onclick = function() {
  tran.setLang('default');
};

document.getElementById("fr").onclick = function() {
  tran.setLang('fr');
};

document.getElementById("eo").onclick = function() {
  tran.setLang('eo');
};

var userLang = navigator.language || navigator.userLanguage;

if (userLang == "fr") {
  tran.setLang('fr');
} else if (userLang == "fr-FR") {
  tran.setLang('fr');
} else if (userLang == "fr-BE") {
  tran.setLang('fr');
} else if (userLang == "eo") {
  tran.setLang('eo');
}
