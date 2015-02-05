requirejs.config({
   paths: {
     gsap: '/app/bower_components/gsap/src/uncompressed/TweenLite',
     modernizr: '/app/bower_components/modernizr/modernizr',
     polyfill: '/app/bower_components/polyfill.js/dist/polyfill',
     browserdetect: '/app/bower_components/browserdetect/browserdetect'
   },
   shim: {
    'libs/gsap/TweenLite': {
        deps:    ['/app/bower_components/gsap/src/uncompressed/TweenLite'],
        exports: 'TweenLite'
    }
   }
});
