var tran = new Translater();
var is_opened = false;
var pane = document.getElementById("pane");
var menu_icon = document.getElementById("menu_icon")
var page = document.getElementById("page")
var body = document.getElementById("body")
var mouse = document.getElementsByClassName("scroll-downs")[0]

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
  mouse.style.display = 'none';
  if (window.innerWidth < 800) {
    menu_icon.style.display = 'none';
    pane.style.width = "70%";
  } else {
    pane.style.width = "384px";
    menu_icon.style.marginRight = "calc(384px + 50px)";
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
  menu_icon.style.display = 'inherit';
  is_opened = false;
  mouse.style.display = 'inherit';
}

var userLang = navigator.language || navigator.userLanguage;

if (document.cookie == "") {
  if (userLang == "fr") {
    tran.setLang('fr');
  } else if (userLang == "fr-FR") {
    tran.setLang('fr');
  } else if (userLang == "fr-BE") {
    tran.setLang('fr');
  } else if (userLang == "eo") {
    tran.setLang('eo');
  } else {
    updateBtnSize();
    tran.setLang("default");
  }
}

document.getElementById("en").onclick = function() {
  tran.setLang('default');
  closeNav();
};

document.getElementById("fr").onclick = function() {
  tran.setLang('fr');
  closeNav();
};

document.getElementById("eo").onclick = function() {
  tran.setLang('eo');
  closeNav();
};
