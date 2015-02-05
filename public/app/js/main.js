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
  var header = document.getElementsByClassName('header')[0];
  var expanded = false;
  var div = document.createElement('div');
  var body = document.body;
  div.style.opacity = 0;
  div.style.position= 'fixed';
  div.style.top= 0;
  div.style.left= 0;
  div.style.backgroundColor = 'black';
  div.style.width= '100%';
  div.style.height= '150%';
  div.style.zIndex = 10;
  document.getElementsByClassName('header__hamburger')[0].onclick =
  function() {
    var nav = document.getElementsByClassName('header__menu')[0];
    var ul = nav.getElementsByTagName('ul')[0];
    var height = VWtoPX(24) + ul.offsetHeight;
    if (expanded) {
      TweenLite.to(header, .5, {height:'22vw', ease:Circ.easeInOut});
      TweenLite.to(div, .5, {opacity:0, onComplete:function() {body.removeChild(div);}});
    } else {
      TweenLite.to(header, .5, {height:height, ease:Circ.easeInOut});
      TweenLite.to(div, .5, {opacity:0.6});
      body.appendChild(div);
    }
    expanded=!expanded;
  };

  div.onclick = function() {
    TweenLite.to(header, .5, {height:'22vw', ease:Circ.easeInOut});
    TweenLite.to(div, .5, {opacity:0, onComplete:function() {body.removeChild(div);}});
    expanded=false;
  }

  function VWtoPX(vw) {
    return isNaN(window.innerWidth) ? window.clientWidth : window.innerWidth /
    100 * vw;
  }
});
