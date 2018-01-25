// generated on <%= date %> using <%= name %> <%= version %>
/* GULP Configuration */
/* Coree engine */
const gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        lazy: true
    }),
    gulpif = require('gulp-if'),
    markdown = require('gulp-marked-json'),
    jsoncombine = require('gulp-jsoncombine'),
    del = require('del');

/* Core Simple Style Guide engine */
const ssgCore = require('./ssg-core-engine/ssg.core.precompile'),
    ssgCoreConfig = require('./ssg-core-engine/ssg.core.genConfig'),
    ssgCoreHelper = require('./ssg-core-engine/ssg.core.helpers');

/* Browser Sync */
const browserSync = require('browser-sync'),
    reload = browserSync.reload;

/* Configurations */
const config = require('./ssg.core.config');

<% if (includeTypeScript) { %>
/* Type Script */
const ts = require('gulp-typescript'),
    tslint = require('gulp-tslint');
<% } %>

/* Style Linter */
const gulpStylelint = require('gulp-stylelint');

// watchs on file system
let watches = () => {

    // watch all style changes in app/styles
    gulp.watch(config.watches.styles, ['sass:compile'], reload);

    <% 
if(includeTypeScript){ %>
    // watch for all typescript files in app/scripts
    gulp.watch(config.watches.scriptsTS, ['ts:compile'], reload);
    <%  
}

if(!includeTypeScript || includeJQuery){ %>
    // watch for all typescript files in app/scripts
    gulp.watch(config.watches.scriptsJS, reload);
    <% 
}
%>
    // Update configuration
    gulp.watch(config.watches.ssg)
        // item was changed
        .on('change', ssgCoreConfig.fsEvents);

    // Precompile all patterns
    gulp.watch(config.watches.ssg, ['ssg:precompile'], reload);

    // Watch for documentation changes
    gulp.watch(config.watches.documentation, ['doc:markdown'], reload);

    // Watch for configuration changes
    gulp.watch(config.watches.staticFiles)
        .on('change', reload);

    // waht everything else
    gulp.watch([
        'app/images/**/*',
        '.tmp/fonts/**/*'
    ]).on('change', reload);

};

// Generate index file for all pattern
gulp.task('ssg:config', () => {

    // Get pattern path
    var patternPath = config.ssg.path;

    var curConfig = {
        patterns: patternPath,
        configFile: config.ssg.config
    };

    // parse configuration and log
    gulp.src(patternPath)
        .pipe(ssgCoreConfig
            .createConfig(curConfig));

});

// Generate Dockumentation
gulp.task('doc:markdown', () => {

    return gulp.src(config.watches.documentation)
        .pipe(markdown({
            pedantic: true,
            smartypants: true
        }))
        .pipe(jsoncombine(config.documentation.path, function (data, meta) {

            var keys = [],
                name,
                newDocData = {};

            for (name in meta) {

                let current = meta[name];

                let key = ssgCoreHelper.mdGetKey(current);

                // create a new object property with normalized name
                newDocData[key] = {
                    title: data[name].title !== undefined ? data[name].title : '',
                    body: data[name].body
                }

            }

            // return new buffer in wrapped table
            return new Buffer("var ssgDoc = " + JSON.stringify(newDocData));

        }))
        .pipe(gulp.dest('.tmp/'))
        .pipe(reload({
            stream: true
        }));
});

// Precompile handle bar templates
gulp.task('ssg:precompile', ['ssg:config'], () => {
    return ssgCore(config.ssg);
});

<% 
    /* Begin of TypeScript */
    if (includeTypeScript) { 
%>
// Typescript Linting
gulp.task('ts:lint', () => {

    return gulp.src(config.watches.scriptsTS)
        .pipe(
            $.plumber()
        )
        .pipe(
            tslint({
                configuration: "tslint.json",
                formatter: "stylish"
            })
        )
        .pipe(tslint.report({
            emitError: false
        }));
    // .pipe(
    //     gulp.dest('app/scripts')
    // );
});

// General typescript compilation
gulp.task('ts:compile', ['ts:lint'], () => {

    var tsProject = ts.createProject(config.tsconfig);

    return gulp.src(config.watches.scriptsTS)
        .pipe(
            $.plumber()
        )
        .pipe(
            ts(config.tsconfig)
        )
        .pipe(
            gulp.dest(config.target.scripts)
        )
        .pipe(reload({
            stream: true
        }));

});
<%
    /* End of TypeScript */
    }
%>

<% 
    /* Begin of SASS */
    if (includeSASS) { 
%>
// SASS compilation
gulp.task('sass:compile', () => {

    var watches = config.watches.styles;

    return gulp.src(watches)
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
        }))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(config.target.styles))
        .pipe(reload({
            stream: true
        }));

});
<% 
    /* END of SASS */
    } 
%>


// cleans everythign up
gulp.task('clean', () => {
    return del.sync('dist');
});

// Gulp serve task
gulp.task('serve', ["ssg:precompile", "doc:markdown"
    <%
    if(includeSASS){
        %>, "sass:compile"
    <%
    }
    if(includeTypeScript){
        %>, 'ts:compile'
    <%
    }
%>
], () => {

    // start browser sync
    browserSync(config.server);

    // init all watches
    watches();

});

gulp.task('html:dist', () => {

    /**
     * Bundle prismJS Syntax highlighting
     */
    gulp.src('node_modules/prismjs/components/*.min.js')
        .pipe(gulp.dest('dist/prismjs/components'));
    /**
     * merge files together
     */

    return gulp.src('app/*.html')
        .pipe(
            $.useref({
                searchPath: ['', 'node_modules', 'ssg-core-engine', '.tmp', 'ssg-core/ui']
            })
        )
        // .pipe(gulpif('*.js', $.minify()))
        .pipe(gulp.dest('dist'));

});

// Gulp serve task
gulp.task('build', ['clean', 'html:dist', 'ssg:precompile', 'sass:compile', 'doc:markdown'], () => {

    gulp.src([
            './.tmp/**/*'
        ])
        .pipe(
            gulp.dest('dist')
        );

    gulp.src([
            './app/_config/*',
        ])
        .pipe(
            gulp.dest('dist/_config')
        );

    gulp.src([
            './app/_data/*',
        ])
        .pipe(
            gulp.dest('dist/_data')
        );

    gulp.src([
            './ssg-core/ui/**/*',
        ])
        .pipe(
            gulp.dest('dist/')
        );

});

// Server from distribution folder
gulp.task('serve:dist', ['build'], () => {
    browserSync.init({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['dist']
        }
    });
});