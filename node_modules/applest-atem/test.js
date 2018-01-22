var ATEM = require('./lib/atem.js');

var atem = new ATEM();
atem.connect('172.16.0.100'); // Replace your ATEM switcher. address.

atem.on('connect', function() {
  // atem.changeProgramInput(1);
  // atem.changePreviewInput(2);
  // atem.autoTransition();
  setTimeout(function() {
    atem.startRecordMacro(98, 'Test Macro', 'Hey! This is macroman.');
    // atem.sendAudioLevelNumber()
  }, 5000)

});

// atem.on('stateChanged', function(err, state) {
  // console.log(state.audio.master); // catch the ATEM state.
// });
// console.log(atem.state); // or use this.
