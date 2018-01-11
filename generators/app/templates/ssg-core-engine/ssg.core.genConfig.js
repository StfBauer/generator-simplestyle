var gulp = require('gulp'),
    fs = require('fs'),
    through2 = require('through2'),
    plugins = require('gulp-load-plugins')({
        lazy: true
    }),
    config = require('../ssg.core.config.js'),
    chalk = require('chalk'),
    browserSync = require('browser-sync'),
    precompile = require('./ssg.core.precompile.js'),
    path = require('path');

var reload = browserSync.reload;

module.exports = {

    createConfig: function(options) {

        var patternsData = [];
        var folder = [];

        var statistics = 0;

        var handleDuplicates = function(data) {

            var found = patternsData.filter(function(obj) {

                return obj.filepath === data.filepath;

            });

            var filepath = data.filepath.split('/')[0];

            if (found.length === 0) {

                patternsData.push(data);

            }

        };

        var updateConfig = function(event) {
            console.log('Update Config:::');
            if (event.type === 'deleted') {
                console.log(event.path);
            }
        };

        var createItem = function(file, enc, callback) {

            // console.log('Create Item:::');

            var path = require('path');

            // init pattern configs
            var filename = path.basename(file.relative),
                extension = path.extname(file.relative),
                basename = filename.replace(extension, ''),
                patternpath = path.dirname(file.relative),
                title = basename.indexOf('_') === 0 ? basename.substr(1) : basename;

            // create pattern object
            var data = {
                title: title,
                description: '',
                filename: basename,
                filepath: file.relative
            };

            this.push(data);

            callback();

        };

        var writeConfigToFile = function() {

            patternsData = patternsData.sort(function(a, b) {
                if (a.filepath < b.filepath)
                    return -1;
                else if (a.filepath > b.filepath)
                    return 1;
                else
                    return 0;
            });

            var patternConfig = {
                patterns: patternsData,
                folder: [{
                    'name': 'atoms',
                    'description': 'Contains all atom elements'
                }, {
                    'name': 'molecules',
                    'description': 'Contains all molecule elements'
                }, {
                    'name': 'organism',
                    'description': 'Contains all organism elements'
                }, {
                    'name': 'templates',
                    'description': 'Contains all templates elements'
                }, {
                    'name': 'pages',
                    'description': 'Contains all pages elements'
                }]
            };

            var patterns = JSON.stringify(patternConfig, null, 4);

            // Fixing w32 path names
            if (patterns.indexOf('\\') !== -1) {
                patterns = patterns.replace(new RegExp('\\\\', 'g'), '/');
                patterns = patterns.replace(new RegExp('//', 'g'), '/');
            }

            fs.writeFile(options.configFile, patterns, function(err) {

                if (err) {
                    return plugins.util.log(
                        plugins.util.colors.red(err)
                    );
                }

                plugins.util.log(
                    plugins.util.colors.green('Configuration saved!')
                );

                precompile(config.ssg);

            });
        };

        var logData = function() {

            console.log(
                plugins.util.colors.green('Patterns before: '), statistics);
            console.log(
                plugins.util.colors.green('Patterns after:  '), patternsData.length);

            writeConfigToFile();
        };

        var loadConfig = (function() {

            plugins.util.log('... Loading current configuration');

            var curConfigPath = options.configFile;

            var exists;

            try {

                exists = fs.statSync(curConfigPath);

            } catch (err) {

                exists = null;
                return;

            }

            try {

                // Loading old configuration
                var config = fs.readFileSync(options.configFile);

                // parse json config
                var configData = JSON.parse(config);

                // check if configuration data exits
                patternsData = configData !== undefined &&
                    configData.patterns !== undefined ? configData.patterns : [];

                // Pattern Data
                // console.log(patternsData);

                plugins.util.log(
                    'Found',
                    patternsData.length,
                    'pattern(s) in current configuration.');

                statistics = patternsData.length;

            } catch (err) {

                plugins.util.log(plugins.util.colors.red(err));

            }
        }());

        return gulp.src(options.patterns, {
                read: false
            })
            .pipe(plugins.plumber())
            // .pipe(plugins.print())
            .pipe(through2.obj(createItem))
            .on('data', handleDuplicates)
            .on('end', logData);
    },

    fsEvents: function(event) {

        var patternConfigPath = process.cwd() + '/app/_config/pattern.conf.json',
            patternConfig = require(patternConfigPath),
            appPath = process.cwd() + '/app/_patterns/';

        var patternPrecompile = function() {

            plugins.util.log(
                plugins.util.colors.green('Precompile Patterns')
            );

            precompile(config.ssg)
                .on('error', function(a, b, c) {

                    plugins.util.log(
                        plugins.util.colors.green('Precompilation failed.')
                    );

                })
                .on('end', function() {

                    plugins.util.log(
                        plugins.util.colors.green('Precompilation finished.')
                    );

                    reload();

                });

        };

        // mark file in config as deleted
        var markDeleted = function(filename) {

        };

        // renames files in pattern config
        var renamePattern = function(files) {
            console.log('Rename Item:::');
        };

        var trimExtension = function(file) {
            var extension = path.extname(file);
            return file.replace(extension, '');
        };

        var selectPatternByPath = function(patterns, filepath) {
            return patterns.filter(function(object) {
                return object.filepath === filepath;
            });
        }

        var invertedPatternByPath = function(patterns, filepath) {
            return patterns.filter(function(object) {
                return object.filepath !== filepath;
            });
        }

        var saveConfig = function(curConfig) {

            var patterns = JSON.stringify(curConfig, null, 4);

            fs.writeFile(patternConfigPath, patterns, function(err) {

                if (err) {
                    return plugins.util.log(
                        plugins.util.colors.red(err)
                    );
                }

                plugins.util.log(
                    plugins.util.colors.green('Configuration updated')
                );

                patternPrecompile();

            });
        };

        // create pattern item
        var createPatternItem = function(file) {

            var filename = path.basename(file),
                filenameNoExt = trimExtension(filename),
                relPath = normalizeFilePath(path.relative(appPath, file));

            var newPattern = {
                title: filenameNoExt,
                description: '',
                filename: filenameNoExt,
                filepath: relPath
            };

            var curConfig = patternConfig.patterns;

            // Fixing w32 path names
            if (relPath.indexOf('\\') !== -1) {
                relPath = relPath.replace(new RegExp('\\\\', 'g'), '/');
                relPath = relPath.replace(new RegExp('//', 'g'), '/');
            }


            var patternExists = selectPatternByPath(curConfig, relPath);

            if (patternExists.length === 0) {
                curConfig.push(newPattern);
                curConfig.sort(function(a, b) {
                    if (a.filepath < b.filepath) return -1;
                    if (a.filepath > b.filepath) return 1;
                    return 0;
                });
                patternConfig.patterns = curConfig;
            }

            plugins.util.log(
                plugins.util.colors.green('Pattern ') +
                filename +
                plugins.util.colors.green(' was added')
            );

            saveConfig(patternConfig);

        };

        var renamePatternItem = function(files) {

            console.log('Rename Pattern Item:::');

            var curConfig = patternConfig.patterns,
                // Old file
                oldFile = path.basename(files.old),
                oldFilenameNoExt = trimExtension(oldFile),
                oldRelPath = normalizeFilePath(path.relative(appPath, files.old)),
                // renamed file
                newFile = path.basename(files.path),
                newFilenameNoExt = trimExtension(newFile),
                newRelPath = normalizeFilePath(path.relative(appPath, files.path));

            var renamedPattern = selectPatternByPath(curConfig, oldRelPath);

            if (renamedPattern.length !== 0) {

                delete renamedPattern[0].deleted;
                renamedPattern[0].filename = newFilenameNoExt;
                renamedPattern[0].filepath = newRelPath;

                patternConfig.patterns = curConfig;

                plugins.util.log(
                    plugins.util.colors.cyan('Pattern file ') +
                    oldFile +
                    plugins.util.colors.cyan(' was renamed to ') +
                    newFile
                );

                saveConfig(patternConfig);

            }

        };

        var deletePatternItem = function(file) {

            console.log('Delete Pattern Item:::');

            var filename = path.basename(file),
                filenameNoExt = trimExtension(filename),
                relPath = normalizeFilePath(path.relative(appPath, file)),
                curConfig = patternConfig.patterns;

            var deletedPattern = selectPatternByPath(curConfig, relPath);

            if (deletedPattern.length !== 0) {

                deletedPattern[0].deleted = true;

                plugins.util.log(
                    plugins.util.colors.yellow('Pattern ') +
                    deletedPattern[0].title +
                    plugins.util.colors.yellow(' was marked for deletetion')
                );

                saveConfig(patternConfig);

            }

        };

        /*
            Handle all file events
        */
        var added = function(file) {
            console.log('File added');
            try {
                createPatternItem(file);
            } catch (Exception) {
                console.log(Exception)
            }
        };

        // pattern rename handler
        var renamed = function(files) {
            console.log('File rename');
            try {
                renamePatternItem(files);
            } catch (Exception) {
                console.log(Exception)
            }
        };

        // pattern delete handler
        var deleted = function(file) {
            console.log('File delete');
            try {
                deletePatternItem(file);
            } catch (Exception) {
                console.log(Exception)
            }
        };

        // pattern change handler
        var changed = function(file) {

            console.log('Rename Pattern Item:::');

            var filename = path.basename(file),
                filenameNoExt = trimExtension(filename),
                relPath = normalizeFilePath(path.relative(appPath, file)),
                changedItem = patternConfig.patterns.filter(function(object) {
                    return object.filepath === relPath;
                });

            // Check if pattern exists otherwise add it as new pattern
            if (changedItem.length === 1) {

                plugins.util.log(
                    plugins.util.colors.cyan('Pattern ') +
                    changedItem[0].title +
                    plugins.util.colors.cyan(' was changed')
                );

                patternPrecompile();

                // reload();
            } else {
                added(file);
            }

        };

        // filepath
        var normalizeFilePath = function(filepath) {
            if (filepath.indexOf('\\') !== -1) {
                filepath = filepath.replace(new RegExp('\\\\', 'g'), '/');
                filepath = filepath.replace(new RegExp('//', 'g'), '/');
            }

            return filepath;
        }


        console.log("Current Page ::: ", event.path);
        // Check if path exists just in case 
        if (fs.existsSync(event.path)) {
            // Getting file stats
            var file = fs.statSync(event.path);

            if(file.isDirectory()){
                console.log('Directory added');
                return;
            }
        }

        console.log('EVENT TYPE ::: ', event.type);

        switch (event.type) {
            case 'added':
                console.log('ADDED Pattern Item:::');
                added(event.path);
                break;
            case 'changed':
                console.log('CHANGED Pattern Item:::');
                changed(event.path);
                break;
            case 'deleted':
                console.log('DELETED Pattern Item:::');
                deleted(event.path);
                break;
            case 'renamed':
                console.log('RENAMED Pattern Item:::');
                renamed(event);
                break;
        }

    }

};