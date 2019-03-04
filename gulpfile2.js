var gulp = require('gulp')
var sourcemaps = require('gulp-sourcemaps')
var rollup = require('gulp-better-rollup')
var babel = require('rollup-plugin-babel')

gulp.task('watch', function() {
    gulp.watch('src/assert/scripts/**/*', ['rollup'])
})
gulp.task('rollup', function() {
    return gulp.src('src/assert/scripts/*.js')
        .pipe(sourcemaps.init())
        .pipe(rollup({
            // There is no `input` option as rollup integrates into the gulp pipeline
            plugins: [babel({
                exclude: 'node_modules/**',
                presets: [
                    [
                        'es2015',
                        {
                            'modules': false
                        }
                    ]
                ],
                plugins: [
                    'external-helpers'
                ],
                babelrc: false
            })]
        }))
        // inlining the sourcemap into the exported .js file
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'))
})