var tran = new Translater();
var is_opened = false;
var pane = document.getElementById("pane");
var menu_icon = document.getElementById("menu_icon")
var page = document.getElementById("page")
var body = document.getElementById("body")

updateBtnSize();

menu_icon.onclick = function() {
  if (is_opened) {
    closeNav();
  } else {
    openNav();
  }
};

page.onclick = function() {
  if (is_opened) {
    closeNav();
  }
};

function openNav() {
  if (window.innerWidth < 800) {
    menu_icon.style.display = 'none';
    pane.style.width = "70%";
  } else {
    pane.style.width = "20%";
    menu_icon.style.marginRight = "calc(20% + 50px)";
  }
  setTimeout(function () {
    page.style.boxShadow = "inset 10px 10px 5px 1500px rgba(0,0,0,0.5)";
    page.style.filter = "brightness(30%)";
  }, 30);
  body.style.overflowY = "hidden";
  is_opened = true;
}

function closeNav() {
  pane.style.width = "0";
  setTimeout(function () {
    page.style.boxShadow = "inset 0px 0px 0px 0px rgba(0,0,0,0)";
    page.style.filter = "brightness(100%)";
  }, 30);
  menu_icon.style.marginRight = "50px";
  body.style.overflowY = "auto";
  menu_icon.style.display = 'block';
  is_opened = false;
}

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

function updateBtnSize() {
  if (tran.getLang() === "eo") {
    var all = document.getElementsByClassName('btn');
    for (var i = 0; i < all.length; i++) {
      all[i].style.width = '91px';
    }
  } else {
    var all = document.getElementsByClassName('btn');
    for (var i = 0; i < all.length; i++) {
      all[i].style.width = '81px';
    }
  }
}

document.getElementById("en").onclick = function() {
  tran.setLang('default');
  updateBtnSize();
  closeNav();
};

document.getElementById("fr").onclick = function() {
  tran.setLang('fr');
  updateBtnSize();
  closeNav();
};

document.getElementById("eo").onclick = function() {
  tran.setLang('eo');
  updateBtnSize();
  closeNav();
};
