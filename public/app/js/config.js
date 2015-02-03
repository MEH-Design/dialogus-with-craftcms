requirejs.config({
   paths: {
     gsap: '/app/bower_components/gsap/src/uncompressed/TweenMax',
     modernizr: '/app/bower_components/modernizr/modernizr',
     polyfill: '/app/bower_components/polyfill.js/dist/polyfill'
   },
   shim: {
    'libs/gsap/TimelineLite': {
        deps:    ['/app/bower_components/gsap/src/uncompressed/TweenMax'],
        exports: 'TweenMax'
    }
   }
});
