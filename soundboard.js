// Fetch sounds list by scraping directory index of soundsUrl.
$.get(soundsUrl, (html) => {
  var sounds = [];
  var self = this;

  // Find all sounds in sounds index.
  $(html).find('a[href$=".mp3"]').each((index, soundLink) => {
    sounds.push(soundLink.text.replace(/\.[^/.]+$/, ''));
  });

  // Generate buttons for sounds.
  sounds.forEach((sound) => {
    var $button = $('<button />').addClass('btn-default');
    $button.text(sound);
    $button.attr('data-sound', sound);
    $button.attr('type', 'button');
    $button.addClass('btn sound-button');
    $('.sounds').append($button);
  });

  // Attach sound request to click event of each button.
  $('.sound-button').click((event) => {
    requestSound($(event.target).data('sound'));
  });
});
