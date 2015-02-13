define(['Modernizr'], function() {

  //returns vw if supported, elsewise returns px
  var fallback = function(number) {
    if(!Modernizr.cssvwunit) {
      return number + 'vw';
    } else {
      return VWtoPX(number) + 'px';
    }
  }

  var VWtoPX = function(vw) {
    return (isNaN(window.innerWidth) ? window.clientWidth :
    window.innerWidth) / 100 * vw;
  }

  var PXtoVW = function(px) {
    return 100 / (isNaN(window.innerWidth) ? window.clientWidth :
    window.innerWidth) * px;
  };


  return function VwUnit() {
    this.fallback = fallback;
    this.VWtoPX = VWtoPX;
    this.PXtoVW = PXtoVW;
  }
});
