module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
      compile: {
        options: {
          mainConfigFile: 'app/js/main.js',
          include: 'app/js/main',
          out: 'app/js/<%= pkg.name %>.js',
          done: function(done, output) {
            var duplicates = require('rjs-build-analysis').duplicates(output);

            if (Object.keys(duplicates).length > 0) {
              grunt.log.subhead('Duplicates found in requirejs build:');
              for (var key in duplicates) {
                grunt.log.error(duplicates[key] + ': ' + key);
              }
              return done(
                new Error('r.js built duplicate modules,' +
                'please check the excludes option.'));
            } else {
              grunt.log.success('No duplicates found!');
            }

            done();
          }
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'app/js/*.js']
    },
    jscs: {
      app: 'app/js/*.js',
      gruntfile: 'Gruntfile.js',
      options: {
        preset: 'google'
      }
    },
    scsslint: {
      allFiles: ['app/sass/**/*.scss'],
      options: {
        config: '.scss-lint.yml'
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded',
          require: 'susy'
        },
        files: {
          'app/css/main.css': 'app/sass/main.scss'
        }
      }
    },
    sassdown: {
      defaultStyleguide: {
        options: {
          assets: [
            'app/css/*.css'
          ],
          scripts: [
            'node_modules/sassdown/tasks/data/scripts.js',
            'http://craft.dev:35729/livereload.js'
          ],
          highlight: 'github',
          excludeMissing: true
        },
        files: [{
          expand: true,
          cwd: 'app/sass',
          src: [
            '**/*.scss'
          ],
          dest: 'styleguide/'
        }]
      }
    },
    autoprefixer: {

      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9']
      },

      all: {
        flatten: true,
        src: 'app/css/*.css',
        dest: 'app/css/main.css'
      }
    },
    watch: {
      styles: {
        files: ['app/sass/**/*.scss'],
        tasks: ['styles'],
        options: {
          livereload: true
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-scss-lint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('sassdown');

  grunt.registerTask('default', [
    'scsslint',
    'jscs',
    'jshint',
    'sassdown',
    'sass',
    'autoprefixer'
  ]);

  grunt.registerTask('styles', [
    'sassdown',
    'sass',
    'autoprefixer'
  ]);

  grunt.registerTask('test', [
    'jscs',
    'jshint',
    'scsslint'
  ]);

  grunt.registerTask('server', [
    'watch'
  ]);
};
