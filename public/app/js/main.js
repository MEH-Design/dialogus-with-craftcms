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
require(['clipPath', 'browserdetect'], function(clipPath) {
  if (BrowserDetect.browser != 'Chrome') {
    var clip = new clipPath();
    clip.register();
    window.onresize = function() {
      clip.rerun();
    };
  }
});
require(['TweenLite', 'EasePack', 'CSSPlugin'], function(TweenLite) {
  var expanded = false;
  document.getElementsByClassName('header__hamburger')[0].onclick =
  function() {
    var header = document.getElementsByClassName('header')[0];
    if (expanded) {
      TweenLite.to(header, 1, {height:'22vw'});
    } else {
      TweenLite.to(header, 1, {height:'80vw'});
    }
    expanded=!expanded;
  };

  function VWtoPX(vw) {
    return isNaN(window.innerWidth) ? window.clientWidth : window.innerWidth /
    100 * vw;
  }
});
