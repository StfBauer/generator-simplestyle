## ./app
All your source code configurations of the Simple Style Guide.
## ./app/_config
Contains the configuration of you're currently used patterns. The file 'pattern.conf.json' will be autogenerate via a gulp task. Whenever you add a new pattern this new pattern will be written to the 'pattern.conf.json'
## ./app/_data
Contains the file `ssg.data.js`. This file can be used to control the data binding in the patterns. See more on data binding.
## ./app/_patterns
Contains all pattern and html snippets your style guide contains. Files needs to be stored to this folder with the  extension '.hbs'.
The 'atoms', 'molecules', 'organism', 'templates' and 'pages' folder helps you to organise your patterns and combine them together.
## ./app/_documentation
Documentations of the style guide can be stored in this folder in a MarkDown format. The structure need to match the structure of the patterns folder.
To document a pattern stored in the folder `./app/_patterns/atoms/01-atoms.hbs` the corresponding documentation file must be stored in the following folder `./app/_patterns/atoms/01-atoms.md`. This MarkDown document gets picked up by a gulp task and automatically assigned to the corresponding pattern.
## ./app/scripts
In case you need custom javascript in your style guide you can put them in this scripts folder.
By default the only the main.js or main.ts will be generated in this folder.
## ./app/styles
This folder contains the file 'main.scss'. This file allows you to customise the design of your patterns.
It is recommended to structure your styles in folders and multiple files.
To use them in your 'main.scss' you can simply use the [Sass @import](http://sass-lang.com/guide) statement.
