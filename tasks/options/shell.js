(function() {
  'use strict';

  module.exports = {
    generate_data: {
      command: [
        'cd data',
        './dl_cardlist.sh',
        './mtg_lookup.py',
        'cd ..'
      ].join(' && '),
      options: {
        stdout: true,
        failOnError: true
      }
    }
  };
})();
