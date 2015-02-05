require.config({
   paths: {
     TweenLite: '/app/bower_components/gsap/src/uncompressed/TweenLite',
     CSSPlugin: '/app/bower_components/gsap/src/uncompressed/plugins/CSSPlugin',
     EasePack: '/app/bower_components/gsap/src/uncompressed/easing/EasePack',
     modernizr: '/app/bower_components/modernizr/modernizr',
     polyfill: '/app/bower_components/polyfill.js/dist/polyfill',
     browserdetect: '/app/bower_components/browserdetect/browserdetect'
   }
});

require(['modernizr']);

require(['ClipPath', 'browserdetect'], function(ClipPath) {
  'use strict';
  if (BrowserDetect.browser != 'Google') {
    var clip = new ClipPath();
    clip.register();
    window.onresize = function() {
      clip.rerun();
    };
  }
});

require(['HeaderAnimation'], function(HeaderAnimation) {
  'use strict';
  var header = new HeaderAnimation();
  header.init();
});
