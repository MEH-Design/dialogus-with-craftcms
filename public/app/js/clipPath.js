define('clipPath', ['polyfill'], function() {
  //converts % to px
  var toPx = function(value, ref) {
    //ref is either width or height
    if((value+'').indexOf('%') > -1) {
      return parseInt(value.replace('%')) / 100 * ref + 'px';
    } else {
      return value;
    }
  };

  var rectVals, rectElements;
  var setRectOnElements = function() {
    var len = rectElements.length;

    for (var i = 0; i < len; i++) {
      //calculate the values relative to the element
      var currentElement = rectElements[i];
      var relTop = toPx(rectVals[0], currentElement.offsetHeight),
      relLeft = toPx(currentElement.offsetWidth - parseInt(toPx(rectVals[1], currentElement.offsetWidth).replace('px', '')) + 'px', currentElement.offsetWidth),
      relBottom = toPx(rectVals[0] + rectVals[2], currentElement.offsetHeight),
      relRight = toPx(rectVals[3], currentElement.offsetWidth);
      currentElement.style.clip = 'rect('+ relTop + ', ' + relLeft + ', '
                                  + relBottom + ', '  + relRight  +')';
    }
  }

  var convertRule = function(rule) {
    //read properties
    var prop = rule.getDeclaration()['clip-path'];
    if(prop.indexOf('inset') > -1) {
      prop = prop.replace('inset(', '').replace(')', '');
      rectVals = prop.split(' ');
    }

    //iterate over all matching elements
    rectElements = document.querySelectorAll(rule.getSelectors());
    setRectOnElements()
  };

  var polyfill = new Polyfill({ declarations: ['clip-path:*'] });

  var register = function() {
    polyfill.doMatched(function(rules) {
      rules.each(function(rule) {
        convertRule(rule);
      });
    });
  };

  return function ClipPath() {
    this.register = register;
    this.rerun = setRectOnElements;
  };

})
