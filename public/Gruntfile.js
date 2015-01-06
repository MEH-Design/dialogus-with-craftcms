module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      target: {
        rjsConfig: 'config.js',
        options: {
          baseUrl: './'
        }
      }
    },
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
      all: ['Gruntfile.js', 'app/js/**/*.js']
    },
    jscs: {
      app: 'app/js/**/*.js',
      gruntfile: 'Gruntfile.js',
      options: {
        preset: 'google'
      }
    },
    sassFormat: {
      options: {
        indentChar: ' ',
        indentStep: 4
      },
      files: {
        src: ['app/sass/**/*.scss']
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-requirejs');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-sass-format');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.registerTask('default', ['bower']);

};
