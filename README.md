Dialogus with Craft CMS and NPM
===============================

[![build](https://api.travis-ci.org/MEH-Design/dialogus-with-craftcms.svg)](https://travis-ci.org/MEH-Design/dialogus-with-craftcms.svg?branch=master)
![npm](https://img.shields.io/badge/npm-v2.2.0-blue.svg?style=flat)

Based on [MiniXC/vagrant-lamp-craft-npm](https://github.com/MiniXC/vagrant-lamp-craft.npm).

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
