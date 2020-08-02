var tran = new Translater({
    lang:"fr"
});

var language = window.navigator.userLanguage || window.navigator.language;

if (language == "fr") {
  tran.setLang('fr');
  $(".back").css("padding-bottom", "2.5vw");
  $(".back3").css("padding-bottom", "3vw");
  $(".back2").css("padding-top", "1vw");
  $(".card .button").css("width", "55%");
  $(".card   .button").css("height", "11%");
} else {
  tran.setLang('default');
}

$(".moon").click(function() {
  $("body").removeClass("night");
});

$(".sun").click(function() {
  $("body").addClass("night");
});

$(".fr").click(function() {
  tran.setLang('fr');
});

$(".en").click(function() {
  tran.setLang('default');
});

$(".settings_icon").click(function() {
  $(".settings_icon").hide();
  $(".hidden").show();
});
