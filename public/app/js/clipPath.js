define(['polyfill'], function() {
  var rectVals, rectElements, //read by setRectOnElements, set by init
  polyfill = new Polyfill({
      declarations: ['clip-path:*']
  });

  //converts % to px
  var toPx = function(value, ref) {
    //ref is either width or height
    if ((value + '').indexOf('%') > -1) {
      return parseInt(value.replace('%')) / 100 * ref + 'px';
    } else {
      //for auto 0 or a px value
      return value;
    }
  };

  /*
  * loops through all elements affected by clip-path
  * and gives them a valid clip
  */
  var setRectOnElements = function() {
    var len = rectElements.length;

    for (var i = 0; i < len; i++) {

      //calculate the values relative to the element
      var currentElement = rectElements[i],
      elemHeight = currentElement.offsetHeight,
      elemWidth = currentElement.offsetWidth,

      //calculate clip values from clip-path
      top = rectVals[0],
      left = elemWidth - parseInt(toPx(rectVals[1], elemWidth)
        .replace('px', '')) + 'px',
      bottom = rectVals[0] + rectVals[2],
      right = rectVals[3],

      //convert %-values to px
      relTop = toPx(top, elemHeight),
      relLeft = toPx(left, elemWidth),
      relBottom = toPx(bottom, elemHeight),
      relRight = toPx(right, elemWidth),

      //delimiter
      d =  ', ',

      //let's put everything together
      rectString = (relTop + d + relLeft + d + relBottom + d + relRight);
      currentElement.style.clip = 'rect(' + rectString  + ')';
    }
  };

  //sets rectVals and rectElements to be used by setRectOnElements
  var init = function(rule) {
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

  //registers the polyfill handler
  var register = function() {
    polyfill.doMatched(function(rules) {
      rules.each(function(rule) {
        init(rule);
      });
    });
  };

  return function ClipPath() {
    this.register = register;
    this.rerun = setRectOnElements;
  };

});
