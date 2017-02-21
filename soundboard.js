// Fetch sounds list by scraping directory index of soundsUrl.
$.get(soundsUrl, (html) => {
  var sounds = [];

  // Find all sounds in sounds index.
  $(html).find('a[href$=".mp3"]').each(() => {
    sounds.push($(this).text().replace(/\.[^/.]+$/, ''));
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
  $('.sound-button').click(() => {
    var sound = $(this).data('sound');
    requestSound(sound);
  });
});
