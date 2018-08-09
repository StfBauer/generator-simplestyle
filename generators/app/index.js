'use strict';
const Generator = require('yeoman-generator');

const fs = require('fs'),
    chalk = require('chalk'),
    helper = require('./helpers'),
    updateNotifier = require('update-notifier'),
    commandExists = require('command-exists'),
    pkg = require('../../package.json'),
    mkdirp = require('mkdirp'),
    welcome = require('./assets/welcome')();

const generators = require('yeoman-generator');

/* Generalt options */
const ssgGen = {
    skipWelcome: 'skip-welcome-message',
    skipInstall: 'skip-install-message'
}

module.exports = class extends Generator {

    constructor(args, opts) {

        super(args, opts);

        this.option(ssgGen.skipWelcome, {
            desc: 'Skips the welcome message',
            type: Boolean
        });

        this.option(ssgGen.skipInstall, {
            desc: 'Skips the message after the installation of dependencies',
            type: Boolean
        });

    }

    initializing() {
        this.pkg = require('../../package.json');
        // this.composeWith(
        //     require.resolve('/generators/app'), {
        //         'skip-install': this.options['skip-install']
        //     }
        // );
    }

    promting() {

        if (!this.option[ssgGen.skipWelcome]) {
            this.log(welcome.welcome);
        }

        const prompts = [{
                type: 'input',
                name: 'name',
                message: 'Your project name',
                default: this.appname // Default to current folder name
            },
            // Create style folders
            // {
            //     type: 'confirm',
            //     name: 'atomic',
            //     message: 'Should folders for atomic design be created?',
            //     default: true
            // },
            {
                type: 'checkbox',
                name: 'features',
                message: 'Which additional features would you like to include?',
                choices: [{
                        name: 'Sass',
                        value: 'includeSASS',
                        checked: true
                    },
                    {
                        name: 'TypeScript',
                        value: 'includeTypeScript',
                        checked: true
                    },
                    {
                        name: 'jQuery',
                        value: 'includeJQuery',
                        checked: false
                    }
                ]
            }
        ];

        return this.prompt(prompts).then(answers => {
            // manually deal with the response, get back and store the results.
            // we change a bit this way of doing to automatically do this in the self.prompt() method.
            this.name = answers.name;
            // this.useAtomic = answers.atomic;

            // check if any of the features was selected
            const features = answers.features;

            const hasFeature = feat => features && features.indexOf(feat) !== -1;

            this.includeSASS = hasFeature('includeSASS');
            this.includeTypeScript = hasFeature('includeTypeScript');
            this.includeJQuery = hasFeature('includeJQuery');

        })
    }

    writing() {
        this._debug();
        this._writeGulpFile();
        this._writePackageJSON();
        this._writeGit();
        this._writeEditorConfig();
        this._writeSSGEngine();
        this._writeSSGUI();
        this._writeSSGConfig();
        this._writeStyles();
        this._writeScripts();
        this._createAppFolders();
        this._addSampleData();
        this._writeHtml();
    }

    _debug() {
        // console.log(this.name);
        // console.log(this.includeSASS);
        // console.log(this.includeTypeScript);
        // console.log(this.includeJQuery);
        // console.log(this.useAtomic);
    }

    /**
     * Writing gulpfile.js
     */
    _writeGulpFile() {

        this.fs.copyTpl(
            this.templatePath('gulpfile.js'),
            this.destinationPath('gulpfile.js'), {
                date: (new Date).toISOString().split('T')[0],
                name: this.pkg.name,
                version: this.pkg.version,
                includeSASS: this.includeSASS,
                includeTypeScript: this.includeTypeScript,
                includeJQuery: this.includeJQuery
            }
        );
    }
    /**
     * Write package.json
     */
    _writePackageJSON() {

        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'), {
                name: this.name,
                version: this.pkg.version,
                includeSASS: this.includeSASS,
                includeTypeScript: this.includeTypeScript,
                includeJQuery: this.includeJQuery
            });
    }
    /**
     * Write .gitignore and .gitattribute
     */
    _writeGit() {

        this.fs.copyTpl(
            this.templatePath('gitignore'),
            this.destinationPath('.gitignore')
        )

        this.fs.copyTpl(
            this.templatePath('gitattributes'),
            this.destinationPath('.gitattributes')
        )

    }
    /**
     * Write the core style guide engine to folder
     */
    _writeSSGEngine() {

        const coreEngineFolder = 'ssg-core-engine',
            coreEnginePath = this.templatePath() + '/' + coreEngineFolder;

        // Read all files in directory
        fs.readdir(coreEnginePath, (err, files) => {
            files.forEach(file => {
                // check if file is js file
                if (file.endsWith('.js')) {
                    this.fs.copy(
                        this.templatePath(coreEnginePath + '/' + file),
                        this.destinationPath(coreEngineFolder + '/' + file)
                    )
                }
            });
        });

    }
    /**
     * Write the core style guide style assets
     */
    _writeSSGUI() {

        const coreEngineFolder = 'ssg-core/ui/',
            coreEnginePath = this.templatePath() + '/' + coreEngineFolder;

        const regExEndJS = new RegExp('^(.*\.(?=(js|map)$))?[^.]*$'),
            regExEndCSS = new RegExp('^(.*\.(?=(css|map)$))?[^.]*$');

        // Write all script
        fs.readdir(coreEnginePath + '/scripts', (err, files) => {
            files.forEach(file => {
                // check if file is js file
                if (file.match(regExEndJS)) {

                    this.fs.copy(
                        this.templatePath(coreEnginePath + '/scripts/' + file),
                        this.destinationPath(coreEngineFolder + '/scripts/' + file)
                    )
                }
            });
        });
        // Write all styles
        fs.readdir(coreEnginePath + '/styles', (err, files) => {
            files.forEach(file => {
                // check if file is js file
                if (file.match(regExEndCSS)) {

                    this.fs.copy(
                        this.templatePath(coreEnginePath + '/styles/' + file),
                        this.destinationPath(coreEngineFolder + '/styles/' + file)
                    )
                }
            });
        });

    }
    /**
     * Save base configuration to project
     */
    _writeSSGConfig() {
        this.fs.copyTpl(
            this.templatePath('ssg.core.config.js'),
            this.destinationPath('ssg.core.config.js'), {
                name: this.name,
                version: this.pkg.version,
                includeSASS: this.includeSASS,
                includeTypeScript: this.includeTypeScript,
                includeJQuery: this.includeJQuery
            }
        )
    }
    /**
     * Create base app folder
     */
    _createAppFolders() {

        /* Base folder */
        mkdirp('app/fonts');
        mkdirp('app/images');
        mkdirp('app/scripts');
        mkdirp('app/styles');

        /* Folder for enginge */
        mkdirp('app/_documentation');
        mkdirp('app/_config');
        mkdirp('app/_patterns');
        mkdirp('app/_data');

    }

    /**
     * Adds sample data to the current aplication folder
     */
    _addSampleData() {
        // Copy add atoms
        this.fs.copy(
            this.templatePath('sample/hbs/01-atom.hbs'),
            this.destinationPath('app/_patterns/atoms/01-atom.hbs')
        );
        // Copy add molecule
        this.fs.copy(
            this.templatePath('sample/hbs/01-molecule.hbs'),
            this.destinationPath('app/_patterns/molecules/01-molecule.hbs')
        );
        // Copy add template
        this.fs.copy(
            this.templatePath('sample/hbs/01-template.hbs'),
            this.destinationPath('app/_patterns/templates/01-template.hbs')
        );
        // Copy add organism
        this.fs.copy(
            this.templatePath('sample/hbs/01-organism.hbs'),
            this.destinationPath('app/_patterns/organism/01-organism.hbs')
        );
        // Copy add page
        this.fs.copy(
            this.templatePath('sample/hbs/01-page.hbs'),
            this.destinationPath('app/_patterns/pages/01-page.hbs')
        );


        // Copy add atom documentation
        this.fs.copy(
            this.templatePath('sample/md/01-atom.md'),
            this.destinationPath('app/_documentation/atoms/01-atom.md')
        );
        // Copy add molecule documentation
        this.fs.copy(
            this.templatePath('sample/md/01-molecule.md'),
            this.destinationPath('app/_documentation/molecules/01-molecule.md')
        );
        // Copy add organism documentation
        this.fs.copy(
            this.templatePath('sample/md/01-organism.md'),
            this.destinationPath('app/_documentation/organism/01-organism.md')
        );
        // Copy add page documentation
        this.fs.copy(
            this.templatePath('sample/md/01-template.md'),
            this.destinationPath('app/_documentation/templates/01-template.md')
        );
        // Copy add page documentation
        this.fs.copy(
            this.templatePath('sample/md/01-page.md'),
            this.destinationPath('app/_documentation/pages/01-page.md')
        );

        // Copy sample js
        this.fs.copy(
            this.templatePath('sample/data/ssg.data.js'),
            this.destinationPath('app/_data/ssg.data.js')
        );

    }

    /**
     * Write default styles to app/styles
     */
    _writeStyles() {

        let filename = 'main';
        if (this.includeSASS) {
            filename += '.scss';
        } else {
            filename += '.css';
        }

        /** Style Linter Disable Research needed
        this.fs.copy(
            this.templatePath('.stylelintrc'),
            this.destinationPath('.stylelintrc')
        );
         */

        this.fs.copy(
            this.templatePath('main.scss'),
            this.destinationPath('app/styles/' + filename)
        );

    }
    /**
     * Write default styles to app/scripts
     */
    _writeScripts() {

        let filename = 'main';

        if (this.includeTypeScript) {
            filename += '.ts';
        } else {
            filename += '.js';
        }

        this.fs.copy(
            this.templatePath('main.js'),
            this.destinationPath('app/scripts/' + filename)
        );
    }
    /**
     * Write TypeScript configuration
     */
    _writeEditorConfig() {

        var files = [
            'tsconfig.json',
            'tslint.json',
            'typings.json',
            '.editorconfig'
        ]

        files.forEach(file => {
            this.fs.copyTpl(
                this.templatePath('configs/', file),
                this.destinationPath(file), {
                    includeJQuery: this.includeJQuery
                }
            );
        });

    }
    /** 
     * Write HTML
     */
    _writeHtml() {

        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('app/index.html'), {
                includeJQuery: this.includeJQuery,
                appname: this.appname

            }
        );

    }


    install() {
        const hasYarn = commandExists('yarn');
        this.installDependencies({
            npm: !hasYarn,
            bower: false,
            yarn: hasYarn,
            skipMessage: this.options['skip-install-message'],
            skipInstall: this.options['skip-install']
        });
        // install typings
        this.spawnCommand('typings', ['install']);
    }

}