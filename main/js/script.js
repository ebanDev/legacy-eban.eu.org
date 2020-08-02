var tran = new Translater({
    lang:"fr"
});

var language = window.navigator.userLanguage || window.navigator.language;

if (language == "fr") {
  tran.setLang('fr');
  $(".back").css("padding-bottom", "2.5vw");
  $(".back3").css("padding-bottom", "3vw");
  $(".back2").css("padding-top", "1vw");
  $(".cards button").css("width", "55%");
  $(".cards button").css("height", "13%");
} else {
  tran.setLang('default');
}

$(".moon").click() {
  $("body").removeClass("night")
}

$(".sun").click() {
  $("body").addClass("night")
}

$(".fr").click() {
  tran.setLang('fr');
}

$(".en").click() {
  tran.setLang('en');
}
