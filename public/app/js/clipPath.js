define('clipPath', ['polyfill'], function() {
  var rectVals, rectElements,
  polyfill = new Polyfill({
      declarations: ['clip-path:*']
  });

  //converts % to px
  var toPx = function(value, ref) {
    //ref is either width or height
    if ((value + '').indexOf('%') > -1) {
      return parseInt(value.replace('%')) / 100 * ref + 'px';
    } else {
      return value;
    }
  };

  var setRectOnElements = function() {
    var len = rectElements.length;

    for (var i = 0; i < len; i++) {
      //calculate the values relative to the element
      var currentElement = rectElements[i],
      elemHeight = currentElement.offsetHeight,
      elemWidth = currentElement.offsetWidth,
      //calculate clip-path to clip values
      top = rectVals[0],
      left = elemWidth - parseInt(toPx(rectVals[1], elemWidth)
        .replace('px', '')) + 'px',
      bottom = rectVals[0] + rectVals[2],
      right = rectVals[3],
      relTop = toPx(top, elemHeight),
      relLeft = toPx(left, elemWidth),
      relBottom = toPx(bottom, elemHeight),
      relRight = toPx(right, elemWidth),
      d =  ', ',
      rectString = (relTop + d + relLeft + d + relBottom + d + relRight);

      currentElement.style.clip = 'rect(' + rectString  + ')';
    }
  };

  var convertRule = function(rule) {
    //read properties
    var prop = rule.getDeclaration()['clip-path'];
    if (prop.indexOf('inset') > -1) {
      prop = prop.replace('inset(', '').replace(')', '');
      rectVals = prop.split(' ');
    }

    //iterate over all matching elements
    rectElements = document.querySelectorAll(rule.getSelectors());
    setRectOnElements();
  };

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

});
