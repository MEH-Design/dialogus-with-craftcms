define(['VwUnit', 'HamburgerAnimation', 'TweenLite', 'EasePack', 'CSSPlugin'],
function(VwUnit, HamburgerAnimation) {
  var expanded = false,
  body = document.body,
  header = document.getElementsByClassName('header')[0],
  hamburger = document.getElementsByClassName('header__hamburger')[0],
  div = document.createElement('div'),
  nav = document.getElementsByClassName('header__menu')[0],
  ul = nav.getElementsByTagName('ul')[0],
  time = 0.5,
  ease = Circ.easeInOut,
  initialHeight,
  hamburgerAnimation,
  vw;

  var collapse = function() {
    TweenLite.to(header, time, {
        height: vw.fallback(initialHeight),
        ease: ease
      }
    );
    TweenLite.to(div, time, {
        opacity: 0,
        ease: ease,
        onComplete: function() {
          body.removeChild(div);
        }
      }
    );
    hamburgerAnimation.showList();
  };

  var expand = function() {
    var height = initialHeight + vw.PXtoVW(ul.offsetHeight) + 3;
    body.appendChild(div);
    TweenLite.to(header, time, {
        height: vw.fallback(height),
        ease: ease
      }
    );
    TweenLite.to(div, time, {
        opacity: time,
        ease: ease
      }
    );
    hamburgerAnimation.showX();
  };

  var registerEvents = function() {
    hamburger.onclick = function() {
      if (expanded) {
        collapse();
      } else {
        expand();
      }
      expanded = !expanded;
    };

    div.onclick = function() {
      expanded = false;
      collapse();
    };
  };

  var init = function() {
    vw = new VwUnit();
    hamburgerAnimation = new HamburgerAnimation();
    initialHeight = vw.PXtoVW(header.offsetHeight);
    div.style.opacity = 0;
    div.style.position = 'fixed';
    div.style.top = 0;
    div.style.left = 0;
    div.style.width = '100%';
    div.style.height = '150%';
    div.style.zIndex = 10;
    div.style.backgroundColor = 'black';
    registerEvents();
  };

  return function HeaderAnimation() {
    this.init = init;
  };
});
