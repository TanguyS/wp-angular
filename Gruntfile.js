module.exports = function(grunt) {

    // Config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        coffee: {
            compileJoined: {
                options: {
                  join: true
                },
                files: {
                  'js/vendor/coffee.js': ['coffee/*.coffee', 'coffee/**/*.coffee'] // concat then compile into single file
                }
            },
            compileAdmin: {
                options: {
                  join: true
                },
                files: {
                  'js/admin.js': ['coffee/admin/*.coffee'] // concat then compile into single file
                }
            },
        },

        concat: {   
            dist: {
                src: [
                    ['js/vendor/angular/*.js', 'js/vendor/angular-modules/*.js', 'js/vendor/*.js']
                ],
                dest: 'js/production.js',
            }
        },

        uglify: {
            build: {
                src: 'js/production.js',
                dest: 'js/production.min.js'
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/production.css': 'sass/main.scss'
                }
            } 
        },

        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ['coffee/*.js', 'coffee/*.coffee', 'coffee/admin/*.coffee', 'coffee/**/*.coffee'],
                tasks: ['coffee', 'concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['sass/*.scss', 'sass/vendor/bootstrap/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                }
            },
        }

    });

    // Tasks loaded
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // "Grunt" actions
    grunt.registerTask('default', ['coffee', 'concat', 'uglify', 'sass']);

};