//ref is either width or height
var toPx = function(value, ref) {
  if((value+'').indexOf('%') > -1) {
    return parseInt(value.replace('%')) / 100 * ref + 'px';
  } else {
    return value;
  }
};

requirejs(['config'], function() {
  requirejs(['modernizr']);
  requirejs(['polyfill'], function() {
    Polyfill({ declarations: ['clip-path:*'] })
      .doMatched(function(rules) {
        rules.each(function(rule) {
          //read properties
          var prop = rule.getDeclaration()['clip-path'];
          if(prop.indexOf('inset') > -1) {
            prop = prop.replace('inset(', '').replace(')', '');
            var rectVals = prop.split(' ');
          }

          //iterate over all matching elements
          var elements = document.querySelectorAll(rule.getSelectors());
          var len = elements.length;
          for (var i = 0; i < len; i++) {
            //calculate the values relative to the element
            var currentElement = elements[i];
            var relTop = toPx(rectVals[0], currentElement.offsetHeight),
            relLeft = toPx(currentElement.offsetWidth - parseInt(toPx(rectVals[1], currentElement.offsetWidth).replace('px', '')) + 'px', currentElement.offsetWidth),
            relBottom = toPx(rectVals[0] + rectVals[2], currentElement.offsetHeight),
            relRight = toPx(rectVals[3], currentElement.offsetWidth);
            currentElement.style.clip = 'rect('+ relTop + ', ' + relLeft + ', '
                                        + relBottom + ', '  + relRight  +')';
          }

        })
      })
      .undoUnmatched(function(rules) {
        rules.each(function(rule) {
          $(rule.getSelectors()).removeAttr('style')
        })
        localLinkPolyfill.getCurrentMatches().each(function(rule) {
          $(rule.getSelectors()).css(rule.getDeclaration())
        })
      })
  })
  requirejs(['gsap'], function() {
    document.getElementsByClassName('header__hamburger')[0].onclick =
    function() {
      var header = document.getElementsByClassName('header')[0];
      var nav = document.getElementsByClassName('header__menu')[0];
      if (header.classList.contains('header--expanded')) {
        header.classList.remove('header--expanded');
        TweenMax.to(header, 1, {height:'22vw'});
      } else {
        header.classList.add('header--expanded');
        TweenMax.to(header, 1, {height:'80vw'});
      }
    };

    function VWtoPX(vw) {
      return isNaN(window.innerWidth) ? window.clientWidth : window.innerWidth /
      100 * vw;
    }
  });
});
