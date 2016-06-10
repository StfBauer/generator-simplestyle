'use strict';
var fs = require('fs'),
    chalk = require('chalk'),
    helper = require('./helpers'),
    welcome = require('./welcome')();

var generators = require('yeoman-generator');


module.exports = generators.Base.extend({
    // The name `constructor` is important here
    constructor: function() {
        // Calling the super constructor is important so our generator is correctly set up
        generators.Base.apply(this, arguments);

        var sourceRoot = this.sourceRoot();

        this.log(welcome.welcome);

    },
    // Ask user for input
    prompting: function() {

        return this.prompt([{
                type: 'input',
                name: 'name',
                message: 'Your project name',
                default: this.appname // Default to current folder name
            },
            // Create style folders
            {
                type: 'confirm',
                name: 'atomic',
                message: 'Should folders for atomic design be created?',
                default: true
            }, {
                type: 'confirm',
                name: 'https',
                message: 'Should web server configure to use HTTPS?',
                default: true
            }, {
                type: 'confirm',
                name: 'sass',
                message: 'Should SASS support be enabled?',
                default: true
            }
        ]).then(function(answers) {

            this.options['ssgSettings'] = answers;

        }.bind(this));

    },
    // Write tempaltes to destination
    writing: {

        baseFolder: function() {

            // In your generator
            var baseFolder = ['app', 'app/styles'];

            helper.createFolder(baseFolder);

            if (this.options.ssgSettings && this.options.ssgSettings.atomic) {

                var atomicFolder = ['app/styles/atoms',
                    'app/styles/molecules',
                    'app/styles/templates',
                    'app/styles/pages',
                    'app/patterns/atoms',
                    'app/patterns/molecules',
                    'app/patterns/templates',
                    'app/patterns/pages'
                ];
                helper.createFolder(atomicFolder);
            }
        },
        copyHtmlFiles: function() {

            this.fs.copyTpl(

                this.templatePath('index.html'),
                this.destinationPath('app/index.html'), {
                    title: 'Templating with Yeoman'
                }
            );

        },
        copyStyles: function() {

            if (this.options.ssgSettings.sass) {

                this.fs.copyTpl(
                    this.templatePath('main.css'),
                    this.destinationPath('app/styles/main.scss'), {
                        bowerComponents: '// bower:scss\r\n// endbower'
                    }
                );

            } else {

                this.fs.copyTpl(
                    this.templatePath('main.css'),
                    this.destinationPath('app/styles/main.css'), {
                        bowerComponents: ''
                    }
                );

            }
        },
        copyLibraries: function() {

            this.fs.copyTpl(
                this.templatePath('ssgCore.templates.js'),
                this.destinationPath('libs/ssgCore.templates.js'), {}
            );

            this.fs.copyTpl(
                this.templatePath('ssgCoreLib.js'),
                this.destinationPath('libs/scripts/ssgCoreLib.js'), {}
            );

            this.fs.copyTpl(
                this.templatePath('ssgCore.css'),
                this.destinationPath('libs/styles/ssgCore.css'), {}
            );

            this.fs.copyTpl(
                this.templatePath('corev15.css'),
                this.destinationPath('libs/styles/corev15.css'), {}
            );


        },
        copyCore: function() {

            this.fs.copyTpl(
                this.templatePath('gulp.config'),
                this.destinationPath('gulp.config.js'), {}
            );

            this.fs.copyTpl(
                this.templatePath('gulpfile.txt'),
                this.destinationPath('gulpfile.js'), {
                    contents: '<%= contents %>'
                }
            );

            this.fs.copyTpl(
                this.templatePath('package.json'),
                this.destinationPath('package.json'), {}
            );

        }

    },
    install: function() {
        this.installDependencies();
    }

});