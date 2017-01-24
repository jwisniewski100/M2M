'use strict';
module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-open');

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Show grunt task time
    require('time-grunt')(grunt);

    // Configurable paths for the app
    var appConfig = {
        app: 'app',
        dist: 'dist'
    };

    // Grunt configuration
    grunt.initConfig({

	//Producing json files
	yaml: {
	    your_target: {
	      options: {
		ignored: /^_/,
		space: 4,
		customTypes: {
		  '!include scalar': function(value, yamlLoader) {
		    return yamlLoader(value);
		  },
		  '!max sequence': function(values) {
		    return Math.max.apply(null, values);
		  },
		  '!extend mapping': function(value, yamlLoader) {
		    return _.extend(yamlLoader(value.basePath), value.partial);
		  }
		}
	      },
	      files: [
		{expand: true, cwd: '../doc', src: ['**/*.yaml'], dest: 'app/cdam-spec/res1/'}
	      ]
	    },
	},
	watch: {
      express: {
        files:  [ '**/*.js' ],
        tasks:  [ 'express:dev' ],
        options: {
          spawn: false
        }
      }
    },
    express: {
        options: {
            port: 3000
        },
        dev: {
            options: {
                script: 'server/server.js',
                debug: true
        }
      }
    },
	open: {
		dev: {
			path: 'http://localhost:<%= express.options.port%>'
		}
    },

        // Project settings
        m2m: appConfig,

        // The grunt server settings
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= m2m.dist %>'
                }
            }
        },
        // Compile less to css
        less: {
            development: {
                options: {
                    compress: true,
                    optimization: 2
                },
                files: {
                    "app/styles/style.css": "app/less/style.less"
                }
            }
        },
        // Watch for changes in live edit
        watch: {
            styles: {
                files: ['app/less/**/*.less'],
                tasks: ['less', 'copy:styles'],
                options: {
                    nospawn: true,
                    livereload: '<%= connect.options.livereload %>'
                },
            },
            js: {
                files: ['<%= m2m.app %>/scripts/{,*/}*.js'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= m2m.app %>/**/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= m2m.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        // If you want to turn on uglify you will need write your angular code with string-injection based syntax
        // For example this is normal syntax: function exampleCtrl ($scope, $rootScope, $location, $http){}
        // And string-injection based syntax is: ['$scope', '$rootScope', '$location', '$http', function exampleCtrl ($scope, $rootScope, $location, $http){}]
        uglify: {
            options: {
                mangle: false
            }
        },
        // Clean dist folder
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= m2m.dist %>/{,*/}*',
                        '!<%= m2m.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= m2m.app %>',
                        dest: '<%= m2m.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            '*.html',
                            'views/{,*/}*.html',
                            'styles/patterns/*.*',
                            'img/{,*/}*.*'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/fontawesome',
                        src: ['fonts/*.*'],
                        dest: '<%= m2m.dist %>'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/bootstrap',
                        src: ['fonts/*.*'],
                        dest: '<%= m2m.dist %>'
                    },
                ]
            },
            styles: {
                expand: true,
                cwd: '<%= m2m.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },
        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= m2m.dist %>/scripts/{,*/}*.js',
                    '<%= m2m.dist %>/styles/{,*/}*.css',
                    '<%= m2m.dist %>/styles/fonts/*'
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= m2m.dist %>',
                    src: ['*.html', 'views/{,*/}*.html'],
                    dest: '<%= m2m.dist %>'
                }]
            }
        },
        useminPrepare: {
            html: 'app/index.html',
            options: {
                dest: 'dist'
            }
        },
        usemin: {
            html: ['dist/index.html']
        }
    });
    
    /*grunt.registerTask('serve', [ 'express:dev', 'open:dev', 'watch' ]);
    
    grunt.task.run('serve');*/
    
    // Run live version of app
    grunt.registerTask('live', [
        'express:dev', 'open:dev',
        'clean:server',
        'copy:styles',
        'connect:livereload',
        'watch'
    ]);
    
    
};
