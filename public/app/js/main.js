//cut the mustard - http://responsivenews.co.uk/post/18948466399/cutting-the-mustard
var supports = !!document.querySelector && !!window.addEventListener;
if (!supports) {
  document.documentElement.className += 'no-js';
  throw new Error('Browser doesn\'t support modern Javascript APIs!');
}

require.config({
   paths: {
     TweenLite:
     '/app/bower_components/gsap/src/uncompressed/TweenLite',
     CSSPlugin:
     '/app/bower_components/gsap/src/uncompressed/plugins/CSSPlugin',
     CSSRulePlugin:
     '/app/bower_components/gsap/src/uncompressed/plugins/CSSRulePlugin',
     EasePack:
     '/app/bower_components/gsap/src/uncompressed/easing/EasePack',
     modernizr:
     '/app/bower_components/modernizr/modernizr'
   }
});

require(['modernizr']);

require(['HeaderAnimation'], function(HeaderAnimation) {
  'use strict';
  var header = new HeaderAnimation(0.5);
  header.init();
});
