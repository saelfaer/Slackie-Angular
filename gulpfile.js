var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    jshint = require('gulp-jshint'),
    wiredep = require('wiredep').stream,
    developmentRoot = 'development';

// Web Server
gulp.task('webserver', function() {
    gulp.src(developmentRoot)
        .pipe(webserver({
            livereload: {
                enable: true,
                port: 1339
            },
            port: 8500,
            directoryListing: false,
            open: true,
            host: '0.0.0.0',
            fallback: 'index.html'
        }));
});

// JS Linting task
gulp.task('lint', function() {
    return gulp.src([developmentRoot + '/app/**/*.js', '!' + developmentRoot + '/app/bower_components/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// Bower integration
gulp.task('bower', function() {
    gulp.src(developmentRoot + '/index.html')
        .pipe(wiredep({
            directory: developmentRoot + '/app/bower_components',
            fileTypes: {
                html: {
                    block: /(([ \t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
                    detect: {
                        js: /<script.*src=['"]([^'"]+)/gi,
                        css: /<link.*href=['"]([^'"]+)/gi
                    },
                    replace: {
                        js: '<script src="{{filePath}}"></script>',
                        css: '<link rel="stylesheet" href="/{{filePath}}" />'
                    }
                },
            }
        }))
        .pipe(gulp.dest(developmentRoot));
});

gulp.task('watch', function() {
    // WATCH STYLES
    gulp.watch(developmentRoot + '/assets/scss/**/*.scss', function() {
        gulp.run('styles');
    });

    // WATCH SCRIPTS
    gulp.watch(developmentRoot + '/app/**/*.js', function() {
        gulp.run('lint');
    });

});

gulp.task('dev', ['webserver', 'lint', 'bower', 'watch'], function() {});

gulp.task('default', ['dev'], function() {});