module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                options: {
                    //loadPath: require('node-neat').includePaths
                },
                files: [{
                    expand: true,
                    cwd: 'sass',
                    src: ['*.scss'],
                    dest: 'build/css',
                    ext: '.css'
                }]
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 version']
            },
            multiple_files: {
                expand: true,
                flatten: true,
                src: 'build/css/*.css',
                dest: 'build/css'
            }
        },

        cssmin: {
            combine: {
                options: {
                    keepSpecialComments: 0
                },
                files: {
                    'build/css/global.css': ['build/css/*.css']
                }
            }
        },

        jshint: {
            beforeconcat: ['js/*.js']
        },

        concat: {
            dist: {
                options: {
                    sourceMap: true,
                },
                src: [
                    'js/vendor/*.js',
                    'js/*.js'
                ],
                dest: 'build/js/production.min.js'
            }
        },

        uglify: {
            options: {
                //sourceMap: true,
                //sourceMapIncludeSources: true,
                //sourceMapIn: 'build/js/production.min.js',
            },
            build: {
                src: 'build/js/production.min.js',
                dest: 'build/js/production.min.js'
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'build/img/'
                }]
            }
        },

        copy: {
            main: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['js/vendor/modernizr-2.7.1.min.js', 'js/vendor/smooth-scroll.js'],
                    dest: 'build/js',
                    filter: 'isFile'
                }]
            }
        },

        font: {
            all: {
                // SVG files to read in
                src: ['svg/*.svg'],

                // Location to output CSS variables
                destCss: 'sass/partials/_icons.scss',

                // Location to output fonts (expanded via brace expansion)
                destFonts: 'fonts/icons.{svg,woff,eot,ttf}',
                fontFamily: 'iconfont',
            }
        },

        watch: {
            options: {
                livereload: true,
            },
            html: {
                files: ['index.html'],
                options: {
                    spawn: false,
                }
            },
            scripts: {
                files: ['js/**/*.js'],
                tasks: ['concat', 'jshint', 'copy'],
                options: {
                    spawn: false,
                }
            },
            css: {
                files: ['sass/**/*.scss'],
                tasks: ['font', 'sass', 'autoprefixer'],
                options: {
                    spawn: false,
                }
            },
            images: {
                files: ['img/**/*.{png,jpg,gif}', 'img/*.{png,jpg,gif}'],
                tasks: ['imagemin'],
                options: {
                    spawn: false,
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 8000,
                    base: './'
                }
            }
        },

    });

    require('load-grunt-tasks')(grunt);

    // Default Task is basically a rebuild
    grunt.registerTask('default', ['concat', 'uglify', 'sass', 'autoprefixer', 'cssmin', 'imagemin', 'copy']);

    grunt.registerTask('dev', ['connect', 'watch']);

};
