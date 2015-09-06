module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            dist: ['public/dist'],
            js: [
                "public/dist/js/*.js",
                "!public/dist/js/*.min.js"
            ],
            css: [
                'public/dist/css'
            ]
        },

        concat: {
            dist: {
                src: [
                    'public/js/app.js',
                    'public/js/appRoute.js',
                    'public/js/controllers/**/*.js',
                    'public/js/services/**/*.js'
                ],
                dest: 'public/dist/js/app.js'
            }
        },

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                },
            },
            beforeconcat: [
                'public/js/app.js',
                'public/js/appRoute.js',
                'public/js/controllers/**/*.js'
            ],
            afterconcat: ['public/dist/js/<%= pkg.name %>.js']
        },

        autoprefixer: {
            core: {
                options: {
                    map: true
                },
                src: 'public/dist/css/<%= pkg.name %>.css'
            }
        },

        csscomb: {
            dist: {
                expand: true,
                cwd: 'public/dist/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'public/dist/css/'
            }
        },

        sass: {
            dist: {
                options: { // Target options
                    style: 'expanded'
                },
                files: [{
                    'public/dist/css/<%= pkg.name %>.css': 'public/scss/site.scss',
                }]
            }
        },

        compass: {
            dist: {
                options: {
                    sassDir: 'assets/scss',
                    cssDir: 'assets/dist/css',
                    environment: 'production'
                }
            },
            dev: { // Another target 
                options: {
                    config: 'config.rb',
                    sassDir: 'assets/scss',
                    cssDir: 'assets/dist/css',
                }
            }
        },

        csslint: {
            dist: [
                'assets/dist/css/<%= pkg.name %>.css'
            ]
        },
        cssmin: {
            options: {
                compatibility: 'ie8',
                keepSpecialComments: '*',
                advanced: false
            },
            minifyCore: {
                src: 'assets/dist/css/<%= pkg.name %>.css',
                dest: 'assets/dist/css/<%= pkg.name %>.min.css'
            }
        },

        uglify: {
            options: {
                compress: {
                    drop_console: true
                }
            },
            dist: {
                files: {
                    'public/dist/js/all.min.js': ['public/js/app.js', 'public/js/appRoute.js', 'public/js/controllers/**/*.js']
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-csscomb');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-compass');


    grunt.registerTask('sass-compile', ['sass:dist']);
    grunt.registerTask('sass-css', ['sass-compile', 'autoprefixer:core', 'csscomb:dist']);

    grunt.registerTask('compass-css', ['compass:dev', 'autoprefixer:core', 'csscomb:dist']);


    grunt.registerTask('angular', ['clean:js', 'concat']);
    grunt.registerTask('js', ['clean:js', 'concat']);

    grunt.registerTask('css', ['clean:css', 'sass-css']);

    grunt.registerTask('dist', ['clean:dist', 'sass-css', 'concat']);

    grunt.registerTask('compas', ['clean:dist', 'compass-css']);

    grunt.registerTask('product', ['clean:dist', 'dist-css', 'cssmin:minifyCore']);

};