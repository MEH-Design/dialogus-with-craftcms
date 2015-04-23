define('mobile__map-animation', ['TweenLite', 'EasePack', 'CSSPlugin'], function() {
  var icon = document.getElementsByClassName('callout-block__hamburger')[0],
  block = icon.parentNode.parentNode, //Leichter Pfusch
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
