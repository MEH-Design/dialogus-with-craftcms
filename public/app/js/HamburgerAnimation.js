define('HamburgerAnimation', ['TweenLite', 'EasePack', 'CSSPlugin', 'CSSRulePlugin'], function() {
  var icon = document.getElementsByClassName('header__hamburger__icon')[0],
  before = CSSRulePlugin.getRule('.header__hamburger__icon:before'),
  after = CSSRulePlugin.getRule('.header__hamburger__icon:after'),
  time = 0.5,
  ease = Back.easeInOut,
  leftOffset = 5;

  var showX = function() {
    TweenLite.to(icon, time, {backgroundColor: 'rgba(120,190,32,0)', ease:ease});
    TweenLite.to(before, time, {cssRule:{transformOrigin:"left top", rotation: 45, marginLeft: '1.5vw', top: '-0.9vw'}, ease:ease});
    TweenLite.to(after, time, {cssRule:{transformOrigin:"left bottom", rotation: -45, marginLeft: '1.5vw', top: '0.9vw'}, ease:ease});
  };

  var showList = function() {
    TweenLite.to(icon, time, {backgroundColor: 'rgba(120,190,32,1)', ease:ease});
    TweenLite.to(before, time, {cssRule:{transformOrigin:"left top", rotation: 0, marginLeft: 0, top: 0}, ease:ease});
    TweenLite.to(after, time, {cssRule:{transformOrigin:"left bottom", rotation: 0, marginLeft: 0, top: 0}, ease:ease});
  }

  return function HamburgerAnimation() {
    this.showX = showX;
    this.showList = showList;
  };
});
