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


  setTimeout(
    function()
    {
      timeline.add({
          targets: ".sun",
          d: [{
            value: toggle ? sunPath : moonPath
          }]
        }, "-= 200")
        .add({
          targets: "#darkMode",
          rotate: 320
        }, "-= 200")
        .add({
          targets: "body",
          backgroundColor: toggle ? "#eee" : "#111"
        })
        .add({
          targets: ".card",
          backgroundColor: toggle ? "#fff" : "#151515"
        }, "-= 600")
        .add({
          targets: "p, .report h4, h2, .report h3",
          color: toggle ? "#000" : "#f1f1f1"
        }, "-= 600")
        .add({
          targets: "header, .report, .popup, .specs div:not(.card-wrap), .input, .app-card",
          backgroundColor: toggle ? "#fff" : "#000"
        }, "-= 600")
        .add({
          targets: "header h1 a, .specs h5, .app-card h5, .app-card .percent, h4, #input",
          color: toggle ? "#000" : "#fff"
        }, "-= 600")
        .add({
          targets: "img",
          update: function(){
            $(".input img").css("filter", toggle ? 'invert(100%)' : 'invert(0%)');
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
    }, 300);
  };
