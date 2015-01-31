requirejs(['config'], function() {
  requirejs(['modernizr']);
  requirejs(['gsap'], function() {

  });
});

function buttonClick()
{
  var menu = document.getElementById("header__menu");
  TweenLight.to(menu, 1.5, {height:200});
}
