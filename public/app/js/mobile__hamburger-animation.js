/*
SCSS Equivalents
  .header__hamburger__icon__before {
    transform-origin: left top;
    transform: rotate(45deg);
    margin-left: 1.5vw;
    top: -1vw;
  }
  .header__hamburger__icon__after {
    transform-origin: left bottom;
    transform: rotate(-45deg);
    margin-left: 1.5vw;
    top: 1vw;
  }
  .header__hamburger__icon{
    background-color: rgba(0,0,0,0);
  }
*/

define('mobile__hamburger-animation',
  ['TweenLite', 'EasePack', 'CSSPlugin', 'VwUnit'],
  function(VwUnit) {
  var icon =
  document.getElementsByClassName('header__hamburger__icon')[0],
  before =
  document.getElementsByClassName('header__hamburger__icon__before')[0],
  after =
  document.getElementsByClassName('header__hamburger__icon__after')[0],
  time = 0.5,
  ease = Back.easeInOut,
  leftOffset = 5,
  vw;

  var showX = function() {
    TweenLite.to(icon, time, {
        backgroundColor: 'rgba(120,190,32,0)',
        ease: ease
      }
    );
    TweenLite.to(before, time, {
        transformOrigin: 'left top',
        rotation: 45,
        marginLeft: vw.fallback(1.5),
        top: vw.fallback(-1),
        ease: ease
      }
    );
    TweenLite.to(after, time, {
        transformOrigin: 'left bottom',
        rotation: -45,
        marginLeft: vw.fallback(1.5),
        top: vw.fallback(1),
        ease: ease
      }
    );
  };

  var showList = function() {
    TweenLite.to(icon, time, {
        backgroundColor: 'rgba(120,190,32,1)',
        ease: ease
      }
    );
    TweenLite.to(before, time, {
        transformOrigin: 'left top',
        rotation: 0,
        marginLeft: 0,
        top: 0,
        ease: ease
      }
    );
    TweenLite.to(after, time, {
        transformOrigin: 'left bottom',
        rotation: 0,
        marginLeft: 0,
        top: 0,
        ease:ease
      }
    );
  };

  var init = function(VwUnit) {
    vw = VwUnit;
  };

  return function HamburgerAnimation() {
    this.showX = showX;
    this.showList = showList;
    this.init = init;
  };
});
