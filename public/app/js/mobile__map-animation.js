define('MapAnimation', ['TweenLite', 'EasePack', 'CSSPlugin'], function() {
  var icon = document.querySelector('.map .callout-block__hamburger'),
  block = document.querySelector('.map .callout-block'), // FIXME: select by class
  map = document.getElementsByClassName('map')[0],
  time = 0.5,
  ease = Back.easeInOut;

  var close = function() {
    TweenLite.to(block, time, {
      opacity: 0,
      ease: ease
    });
  };

  var registerEvents = function() {
    icon.onclick = close;
    map.onclick = close;
  };

  return function MapAnimation() {
    this.init = registerEvents;
  };

});
