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
        doSomething: function() {

            this.fs.copyTpl(

                this.templatePath('index.html'),
                this.destinationPath('public/index.html'), {
                    title: 'Templating with Yeoman'
                }
            );

        }

    }

});