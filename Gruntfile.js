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
            ],
            adminjs: [
                "public/dist/js/admin.js",
                "!public/dist/js/admin.min.js"
            ],
            admincss: [
                'public/dist/css/admin.css'
            ],
            homecss: [
                'public/dist/css/home.css'
            ],
            homejs: [
                "public/dist/js/home.js",
                "!public/dist/js/home.min.js"
            ]
        },

        concat: {
            dist: {
                src: [
                    'public/js/admin/app.js',
                    'public/js/admin/appRoute.js',
                    'public/js/admin/controllers/**/*.js',
                    'public/js/admin/services/**/*.js'
                ],
                dest: 'public/dist/js/admin.js'
            },
            home: {
                src: [
                    'public/js/home/app.js',
                    'public/js/home/appRoute.js',
                    'public/js/home/controllers/**/*.js',
                    'public/js/home/services/**/*.js'
                ],
                dest: 'public/dist/js/home.js'
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
                'public/js/admin/app.js',
                'public/js/admin/appRoute.js',
                'public/js/admin/controllers/**/*.js',
                'public/js/admin/services/**/*.js'
            ],
            afterconcat: ['public/dist/js/admin.js']
        },

        autoprefixer: {
            core: {
                options: {
                    map: true
                },
                src: 'public/dist/css/admin.css'
            },
            home: {
                options: {
                    map: true
                },
                src: 'public/dist/css/home.css'
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
                    'public/dist/css/admin.css': 'public/scss/admin/site.scss',
                }]
            },
            home: {
                options: { // Target options
                    style: 'expanded'
                },
                files: [{
                    'public/dist/css/home.css': 'public/scss/home/site.scss',
                }]
            }
        },

        cssmin: {
            options: {
                compatibility: 'ie8',
                keepSpecialComments: '*',
                advanced: false
            },
            minifyCore: {
                src: 'public/dist/css/<%= pkg.name %>.css',
                dest: 'public/dist/css/<%= pkg.name %>.min.css'
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
        },

        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            strict: {
                options: {
                    import: 2
                },
                src: ['public/css/*.css']
            },
            lax: {
                options: {
                    import: false
                },
                src: ['path/to/**/*.css']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-csscomb');
    grunt.loadNpmTasks('grunt-autoprefixer');


    grunt.registerTask('sass-compile', ['sass:dist']);
    grunt.registerTask('sass-css', ['sass-compile', 'autoprefixer:core', 'csscomb:dist']);

    grunt.registerTask('angular', ['clean:js', 'concat']);

    grunt.registerTask('css', ['clean:css', 'sass-css']);

    grunt.registerTask('admin-js', ['clean:adminjs', 'concat:dist']);
    grunt.registerTask('admin-css', ['clean:admincss', 'sass:dist', 'autoprefixer:core', 'csscomb:dist']);

    grunt.registerTask('home-css', ['clean:homecss', 'sass:home', 'autoprefixer:home', 'csscomb:dist']);
    grunt.registerTask('home-js', ['clean:homejs', 'concat:home']);


    grunt.registerTask('home', ['home-css', 'home-js']);
    grunt.registerTask('admin', ['admin-css', 'admin-js']);

    grunt.registerTask('dist', ['home', 'admin']);

    grunt.registerTask('product', ['clean:dist', 'dist-css', 'cssmin:minifyCore']);

};