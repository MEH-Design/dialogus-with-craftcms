Vagrant LAMP with Craft CMS and NPM ![build](https://api.travis-ci.org/MiniXC/vagrant-lamp-craft-npm.svg)
===================================
Just [MiniXC/vagrant-lamp-craft](https://github.com/MiniXC/vagrant-lamp-craft) with a bunch of frontend tools.

Commands
--------
* `npm test` / `grunt test`
  * scsslint - tests scss for style or code errors
  * jscs - validates javascript code style
  * jshint - tests javascript for errors
* `grunt styles`
  * sassdown - generates styleguide
  * sass - compiles sass to css
  * autoprefixer - prefixes css
* `grunt server`
  * watch - automatically runs `grunt styles` when scss files change
