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
    Modernizr:
      '/app/bower_components/modernizr/custom',
    CssVwunit:
      '/app/bower_components/modernizr/feature-detects/css-vwunit',
    HeaderAnimation:
      'mobile__header-animation',
    MapAnimation:
      'mobile__map-animation',
    VwUnit:
      'all__vw-unit',
    HamburgerAnimation:
      'mobile__hamburger-animation',
  }
});

require(['Modernizr']);

require(['HeaderAnimation', 'MapAnimation', 'VwUnit'],
function(HeaderAnimation, MapAnimation, VwUnit) {
  'use strict';
  var header = new HeaderAnimation(0.5),
  map = new MapAnimation();
  header.init(new VwUnit());
  map.init();
});
