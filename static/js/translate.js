var tran = new Translater();

var userLang = navigator.language || navigator.userLanguage;

if (userLang.includes("fr")) {
  tran.setLang('fr');
} else if (userLang.includes("eo")) {
  tran.setLang('eo');
} else if (userLang.includes("es")) {
  tran.setLang('es');
} else if (userLang.includes("ka")) {
  tran.setLang('ka');
} else {
  tran.setLang("default");
}

function updateLang(lang) {
  tran.setLang(lang);
  toggleTranslationPanel()
}

toggled = false;

function toggleTranslationPanel() {
  if (toggled) {
    document.getElementById('translationContainer').style.display = 'none'
    toggled = !toggled
  } else {
    document.getElementById('translationContainer').style.display = 'block'
    toggled = !toggled;
  }
}
