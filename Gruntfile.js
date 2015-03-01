/*
#  Gruntfile
#  Provides configuration for tasks and Grunt extensions
#
#  Copyright © Michael O'Rourke (@caleorourke)
#  Code and documentation licensed under MIT
*/

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    site: grunt.file.readYAML('_config.yml'),
    banner: '/* \n' +
            ' * \n' +
            ' * <%= pkg.name %>, Built on <%= grunt.template.today(\'mm-dd-yyyy\') %>\n' +
            ' * Copyright © <%= grunt.template.today(\'yyyy\') %> <%= site.github.owner %>. All rights reserved.\n' +
            ' * Code and documentation licensed under the <%= site.github.license %> license.\n' +
            ' * \n' +
            ' */\n\n',

    shell: {
      gems: {
        command: ['gem update --system --no-document',
                  'gem install github-pages',
                  'gem install wdm'].join('&&'),
        options: {
          stdout: true
        }
      }
    },

    clean: {
      assets: ['css/main.css',
               'js/main.js']
    },

    concat: {
      main: {
        options: {
          banner: '<%= banner %>'
        },
        src: ['plugins/github.js'],
        dest: 'js/main.js'
      }
    },

    uglify: {
      main: {
        options: {
          banner: '<%= banner %>',
          report: 'min'
        },
        src: '<%= concat.main.dest %>',
        dest: 'js/main.js'
      }
    },

    recess: {
      unminify: {
        options: {
          compile: true,
          compress: false,
          banner: '<%= banner %>'
        },
        src: ['less/@import.less'],
        dest: 'css/main.css'
      },
      minify: {
        options: {
          compile: true,
          compress: true,
          banner: '<%= banner %>'
        },
        src: ['<%= recess.unminify.src %>'],
        dest: '<%= recess.unminify.dest %>'
      }
    },

    pages: {
      start: {
        options: {
          watch: true,
          serve: true,
          baseurl: ['\'\'']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jekyll-pages');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('build',   ['recess:unminify']);
  grunt.registerTask('install', ['shell:gems']);
  grunt.registerTask('preview', ['pages:start']);
  grunt.registerTask('serve',   ['build', 'pages:start']);
};
