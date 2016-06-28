var gulp = require('gulp'),
    fs = require('fs'),
    through2 = require('through2'),
    plugins = require('gulp-load-plugins')({
        lazy: true
    }),
    chalk = require('chalk'),
    config = require('../gulp.config.js'),
    browserSync = require('browser-sync'),
    precompile = require('./precomp-pattern.js'),
    path = require('path');

var reload = browserSync.reload;

module.exports = {

    fsEvents: function(event, config) {

        var patternConfigPath = process.cwd() + '/' + config.patternConfig,
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
        var renamePatter = function(files) {

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
                relPath = path.relative(appPath, file);

            var newPattern = {
                title: filenameNoExt,
                description: '',
                filename: filenameNoExt,
                filepath: relPath
            };

            var curConfig = patternConfig.patterns;

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

            var curConfig = patternConfig.patterns,
                // Old file
                oldFile = path.basename(files.old),
                oldFilenameNoExt = trimExtension(oldFile),
                oldRelPath = path.relative(appPath, files.old),
                // renamed file
                newFile = path.basename(files.path),
                newFilenameNoExt = trimExtension(newFile),
                newRelPath = path.relative(appPath, files.path);

            var renamedPattern = selectPatternByPath(curConfig, oldRelPath);

            if (renamedPattern.length !== 0) {

                delete renamedPattern[0].deleted;
                renamedPattern[0].filename = newFile;
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

            var filename = path.basename(file),
                filenameNoExt = trimExtension(filename),
                relPath = path.relative(appPath, file),
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
            createPatternItem(file);
        };

        // pattern rename handler
        var renamed = function(files) {
            renamePatternItem(files);
        };

        // pattern delete handler
        var deleted = function(file) {
            deletePatternItem(file);
        };

        // pattern change handler
        var changed = function(file) {

            var filename = path.basename(file),
                filenameNoExt = trimExtension(filename),
                relPath = path.relative(appPath, file),
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

        switch (event.type) {
            case 'added':
                added(event.path);
                break;
            case 'changed':
                changed(event.path);
                break;
            case 'deleted':
                deleted(event.path);
                break;
            case 'renamed':
                renamed(event);
                break;
        }

    }

};