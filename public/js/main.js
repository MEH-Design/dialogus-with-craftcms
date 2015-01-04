var requirejs = require('requirejs');

requirejs.config({
  nodeRequire: function (deps, callback, errback, optional) {

        //Find the right context, use default
        var context, config,
            contextName = defContextName;

        // Determine if have config object in the call.
        if (!isArray(deps) && typeof deps !== 'string') {
            // deps is a config object
            config = deps;
            if (isArray(callback)) {
                // Adjust args if there are dependencies
                deps = callback;
                callback = errback;
                errback = optional;
            } else {
                deps = [];
            }
        }

        if (config && config.context) {
            contextName = config.context;
        }

        context = getOwn(contexts, contextName);
        if (!context) {
            context = contexts[contextName] = req.s.newContext(contextName);
        }

        if (config) {
            context.configure(config);
        }

        return context.require(deps, callback, errback);
    },
  paths: {
    gsap: 'bower_components/gsap/src/uncompressed/TweenMax',
    jquery: 'bower_components/jquery/dist/jquery',
    modernizr: 'bower_components/modernizr/modernizr'
  },
  packages: [

  ]
});
