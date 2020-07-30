$(".search-icon").click(function() {
  window.location = "./report.html?s=" + $("#input").val();
});

$(document).on('keypress',function(e) {
    if(e.which == 13) {
      window.location = "./report.html?s=" + $("#input").val();
      }
});

var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};

var services = ['Whatsapp', 'Messenger', 'Snapchat', 'Session', 'Briar', 'Telegram', 'Signal', 'Bitwarden', 'KeePass'];

$('#input').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'services',
  source: substringMatcher(services)
});
