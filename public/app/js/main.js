requirejs(['config'], function() {
  requirejs(['modernizr']);
  requirejs(['gsap'], function() {
    document.getElementsByClassName("header__hamburger")[0].onclick=function(){
      var header = document.getElementsByClassName("header")[0];
      var nav = document.getElementsByClassName("header__menu")[0];
      if(header.classList.contains("header--expanded")){
        header.classList.remove("header--expanded");
        TweenMax.to(header, 1, {height:'22vw'});
      }
      else{
        header.classList.add("header--expanded");
        TweenMax.to(header, 1, {height:'80vw'});
      }
    }

    function VWtoPX(vw) {
      return isNaN(window.innerWidth) ? window.clientWidth : window.innerWidth / 100 * vw;
    }
  });
});
