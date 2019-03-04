var rollup = require('gulp-rollup-mep')
var gulp = require('gulp');
var babel = require('rollup-plugin-babel')
var eslint = require('rollup-plugin-eslint')
var resolve = require('rollup-plugin-node-resolve')
var builtins = require('rollup-plugin-node-builtins')
var commonjs = require('rollup-plugin-commonjs')
var replace = require('rollup-plugin-replace')
var uglify = require('rollup-plugin-uglify')
var postcss = require('rollup-plugin-postcss')
var simplevars = require('postcss-simple-vars')
var nested = require('postcss-nested')
var sourcemaps = require('gulp-sourcemaps')
var cssnext = require('postcss-cssnext')
var cssnano = require('cssnano')
var cache = {}


process.on('unhandledRejection', error => {
    console.error('unhandledRejection', error);
    // process.exit(1) // To exit with a 'failure' code
});

gulp.task('watch', function() {
    gulp.watch('src/assert/scripts/**/*', ['rollup'])
})
gulp.task('rollup', function() {
    return gulp.src('src/assert/scripts/*.js')
        .pipe(sourcemaps.init())
        .pipe(
            rollup({
                onwarn: function(message) {
                    // Suppress this error message... there are hundreds of them. Angular team says to ignore it.
                    if (/The `this` keyword is equivalent to `undefined` at the top level of an ES module, and has been rewritten/.test(message)) {
                        return;
                    }
                    console.error(message);
                },
                plugins: [
                    builtins(),
                    postcss({
                        plugins: [
                            simplevars(),
                            nested(),
                            cssnext({ warnForDuplicates: false }),
                            cssnano()
                        ],
                        extensions: ['.css']
                    }),
                    resolve({
                        jsnext: true,
                        module: true,
                        main: true, // for commonjs modules that have an index.js
                        browser: true,
                        preferBuiltins: true
                    }),
                    eslint({
                        exclude: [
                            'src/assert/styles/**'
                        ]
                    }),
                    babel({
                        exclude: 'node_modules/**',
                        runtimeHelpers: true,
                        "presets": [
                            ["latest", {
                                "es2015": {
                                    "modules": false
                                }
                            }],
                            "stage-3",
                        ],
                        "plugins": [
                            "transform-runtime"
                        ],
                        babelrc: false
                    }),
                    commonjs({
                        include: 'node_modules/**',
                    }),
                    replace({
                        // exclude: 'node_modules/**',
                        ENV: JSON.stringify(process.env.NODE_ENV || 'development')
                    }),
                    (process.env.NODE_ENV === 'production' && uglify())
                ]
            }), cache,
            function(bundle, filePath) {
                // cache[filePath] = bundle
            })
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('src/public/js'))
})