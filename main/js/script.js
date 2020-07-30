var moonPath = 'M71 125.5C71 194.536 125.611 250.5 125.611 250.5C56.5754 250.5 0.610977 194.536 0.610977 125.5C0.610977 56.4644 56.5754 0.5 125.611 0.5C125.611 0.5 71 56.4644 71 125.5Z';
var sunPath = 'M250 125C250 194.036 194.036 250 125 250C55.9644 250 0 194.036 0 125C0 55.9644 55.9644 0 125 0C194.036 0 250 55.9644 250 125Z';
let toggle = false;

var cookieValue = $.cookie("night");
if (cookieValue == 1) {
  darkMode();
}

$("#darkMode").click(function() {
  darkMode();
});

function darkMode(){
  const timeline = anime.timeline({
    duration: 500,
    easing: "easeOutExpo"
  });

  timeline.add({
      targets: ".sun",
      d: [{
        value: toggle ? sunPath : moonPath
      }]
    })
    .add({
      targets: "#darkMode",
      rotate: 320
    }, "-= 100")
    .add({
      targets: "body",
      backgroundColor: toggle ? "#fff" : "#111"
    })
    .add({
      targets: ".card",
      backgroundColor: toggle ? "#fff" : "#151515"
    }, "-= 600")
    .add({
      targets: ".center p, .twocards p, .card a",
      color: toggle ? "#454545" : "#f1f1f1"
    }, "-= 600")
    .add({
      targets: ".cursor",
      borderColor: toggle ? "#000" : "#fff"
    }, "-= 600")
    .add({
      targets: "header h1",
      color: toggle ? "#64505A" : "#fff"
    }, "-= 600")
    .add({
      targets: "img",
      update: function(){
        $("img:not(header img, .projects_body .card img)").css("filter", toggle ? 'invert(100%)' : 'invert(0%)');
      }
    }, "-= 600");

    $.cookie("night",toggle ? 0 : 1);
    var cookieValue = $.cookie("night");

    if (!!cookieValue) {
      console.log("cookie_set");
    } else {
      alert("Oh, it seems that your browser does not support cookies, if you do not activate them, the night mode may not work properly... Don't worry, no tracking cookies will be set !")
    }

  toggle =! toggle;
};

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
