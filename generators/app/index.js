'use strict';
const Generator = require('yeoman-generator');

const fs = require('fs'),
    chalk = require('chalk'),
    helper = require('./helpers'),
    updateNotifier = require('update-notifier'),
    pkg = require('../../package.json'),
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
            {
                type: 'confirm',
                name: 'atomic',
                message: 'Should folders for atomic design be created?',
                default: true
            },
            {
                type: 'checkbox',
                name: 'features',
                message: 'Which additional features would you like to include?',
                choices: [{
                        name: 'Sass',
                        value: 'includeSass',
                        checked: true
                    },
                    {
                        name: 'TypeScript',
                        value: 'includeTypeScript',
                        checked: true
                    }
                ]
            }
        ];

        return this.prompt(prompts).then(answers => {
            // manually deal with the response, get back and store the results.
            // we change a bit this way of doing to automatically do this in the self.prompt() method.
            this.name = answers.name;
            this.useAtomic = answers.atomic;

            // check if any of the features was selected
            const features = answers.features;

            const hasFeature = feat => features && features.indexOf(feat) !== -1;
            this.includeSASS = hasFeature('includeSass');
            this.includeTypeScript = hasFeature('includeTypeScript');

        })
    }

    writing() {
        // this._debug();
        this._writeGulpFile();
        this._writePackageJSON();
        this._writeGit();
        this._writeSSGEngine();
        this._writeSSGUI();
    }

    _debug() {
        console.log(this.name);
        console.log(this.includeSASS);
        console.log(this.includeTypeScript);
        console.log(this.useAtomic);
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
                includeSASS: this.includeSass,
                includeTypeScript: this.includeTypeScript
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
                includeTypeScript: this.includeTypeScript
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
}

// module.exports = generators.Base.extend({
//     // The name `constructor` is important here
//     constructor: function () {
//         // Calling the super constructor is important so our generator is correctly set up
//         generators.Base.apply(this, arguments);

//         var sourceRoot = this.sourceRoot();

//         this.log(welcome.welcome);

//         var update = updateNotifier({
//             pkg
//         });
//         update.notify({
//             defer: false
//         }); // turns defer to false

//     },
//     // Ask user for input
//     prompting: function () {

//         return this.prompt([{
//                 type: 'input',
//                 name: 'name',
//                 message: 'Your project name',
//                 default: this.appname // Default to current folder name
//             },
//             // Create style folders
//             {
//                 type: 'confirm',
//                 name: 'atomic',
//                 message: 'Should folders for atomic design be created?',
//                 default: true
//             }
//         ]).then(function (answers) {

//             this.options['ssgSettings'] = answers;

//         }.bind(this));

//     },
//     // Write tempaltes to destination
//     writing: {

//         core: function () {

//             this.fs.copyTpl(
//                 this.templatePath('gitignore'),
//                 this.destinationPath('.gitignore'), {}
//             );

//         },
//         baseFolder: function () {

//             // In your generator
//             var baseFolder = ['app', 'app/styles'];

//             helper.createFolder(baseFolder);

//             if (this.options.ssgSettings && this.options.ssgSettings.atomic) {

//                 var atomicFolder = [
//                     'app/_patterns/atoms',
//                     'app/_patterns/molecules',
//                     'app/_patterns/organism',
//                     'app/_patterns/templates',
//                     'app/_patterns/pages'
//                 ];
//                 helper.createFolder(atomicFolder);
//             }

//         },
//         html: function () {

//             this.fs.copyTpl(

//                 this.templatePath('index.html'),
//                 this.destinationPath('app/index.html'), {
//                     appname: this.appname,
//                 }
//             );

//         },
//         copyStyles: function () {

//             this.fs.copyTpl(
//                 this.templatePath('main.css'),
//                 this.destinationPath('app/styles/main.scss')
//             );

//         },
//         copyLibraries: function () {

//             this.fs.copyTpl(
//                 this.templatePath('ssgCore.templates.js'),
//                 this.destinationPath('libs/scripts/ssgCore.templates.js'), {}
//             );

//             this.fs.copyTpl(
//                 this.templatePath('ssgCoreLib.js'),
//                 this.destinationPath('libs/scripts/ssgCoreLib.js'), {}
//             );

//             this.fs.copyTpl(
//                 this.templatePath('ssgCore.css'),
//                 this.destinationPath('libs/styles/ssgCore.css'), {}
//             );

//             this.fs.copyTpl(
//                 this.templatePath('corev15.css'),
//                 this.destinationPath('libs/styles/corev15.css'), {}
//             );

//         },
//         copyLibs: function () {

//             this.fs.copy(
//                 this.templatePath('helper.js'),
//                 this.destinationPath('libs/helper.js'), {
//                     contents: '<%= contents %>'
//                 }
//             );

//             this.fs.copy(
//                 this.templatePath('main.js'),
//                 this.destinationPath('app/scripts/main.js')
//             );

//             this.fs.copy(
//                 this.templatePath('precomp-pattern.js'),
//                 this.destinationPath('libs/precomp-pattern.js')
//             );

//             this.fs.copy(
//                 this.templatePath('gen-config.js'),
//                 this.destinationPath('libs/gen-config.js')
//             );

//             this.fs.copy(
//                 this.templatePath('ssgCore.templates.js'),
//                 this.destinationPath('libs/scripts/ssgCore.templates.js')
//             );

//             this.fs.copy(
//                 this.templatePath('ssgCore.css'),
//                 this.destinationPath('libs/styles/ssgCore.css')
//             );

//             this.fs.copy(
//                 this.templatePath('pattern.conf.json'),
//                 this.destinationPath('app/_config/pattern.conf.json')
//             );

//         },
//         copyPrism: function () {

//             this.fs.copy(
//                 this.templatePath('prism.js'),
//                 this.destinationPath('libs/scripts/prism.js')
//             );

//             this.fs.copy(
//                 this.templatePath('prism.css'),
//                 this.destinationPath('libs/styles/prism.css')
//             );

//         },
//         copyCore: function () {

//             this.fs.copy(
//                 this.templatePath('gulp.config.js'),
//                 this.destinationPath('gulp.config.js')
//             );

//             this.fs.copyTpl(
//                 this.templatePath('gulpfile.js'),
//                 this.destinationPath('gulpfile.js'), {
//                     contents: '<%= contents %>'
//                 }
//             );

//             this.fs.copyTpl(
//                 this.templatePath('bower.json'),
//                 this.destinationPath('bower.json'), {}
//             );

//             this.fs.copyTpl(
//                 this.templatePath('package.json'),
//                 this.destinationPath('package.json'), {}
//             );

//         },
//         copyFirstPatterns: function () {

//             // Style Guide Items - Atoms
//             this.fs.copy(
//                 this.templatePath('./styleguideitems/01-your-first-atom.hbs'),
//                 this.destinationPath('app/_patterns/atoms/01-your-first-atom.hbs')
//             );
//             // Style Guide Items - Molecules
//             this.fs.copy(
//                 this.templatePath('./styleguideitems/01-your-first-molecule.hbs'),
//                 this.destinationPath('app/_patterns/molecules/01-your-first-molecule.hbs')
//             );
//             // Style Guide Items - Organism
//             this.fs.copy(
//                 this.templatePath('./styleguideitems/01-your-first-organism.hbs'),
//                 this.destinationPath('app/_patterns/organism/01-your-first-organism.hbs')
//             );
//             // Style Guide Items - Template
//             this.fs.copy(
//                 this.templatePath('./styleguideitems/01-your-first-template.hbs'),
//                 this.destinationPath('app/_patterns/templates/01-your-first-template.hbs')
//             );
//             // Style Guide Items - Pages
//             this.fs.copy(
//                 this.templatePath('./styleguideitems/01-your-first-page.hbs'),
//                 this.destinationPath('app/_patterns/pages/01-your-first-page.hbs')
//             );

//         }

//     },
//     install: function () {
//         this.installDependencies();
//     }

// });