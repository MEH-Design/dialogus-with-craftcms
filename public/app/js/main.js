requirejs(['config'], function() {
  requirejs(['modernizr']);
  requirejs(['gsap'], function() {
    document.getElementsByClassName("header__hamburger")[0].onclick=function(){
      var elem = document.getElementsByClassName("header")[0];
      if(elem.classList.contains("expanded")){
        elem.classList.remove("expanded");
        TweenMax.to(elem, 1, {height:'22vw'});
      }
      else{
        elem.classList.add("expanded");
        TweenMax.to(elem, 1, {height:'70vw'});
      }
    }
  });
});
