require.config({
   paths: {
     TweenLite: '/app/bower_components/gsap/src/uncompressed/TweenLite',
     CSSPlugin: '/app/bower_components/gsap/src/uncompressed/plugins/CSSPlugin',
     EasePack: '/app/bower_components/gsap/src/uncompressed/easing/EasePack',
     modernizr: '/app/bower_components/modernizr/modernizr'
   }
});

require(['modernizr']);

require(['HeaderAnimation'], function(HeaderAnimation) {
  'use strict';
  var header = new HeaderAnimation();
  header.init();
});
