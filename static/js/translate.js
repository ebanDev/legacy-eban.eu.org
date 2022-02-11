var tran = new Translater();

var userLang = navigator.language || navigator.userLanguage;

if (userLang.includes("fr")) {
  tran.setLang('fr');
} else if (userLang == "eo") {
  tran.setLang('eo');
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
