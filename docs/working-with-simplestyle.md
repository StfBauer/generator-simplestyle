# Documentation
To use Simply Style guide the following folders are mainly required during your development.
## ./app
This folder contains all your source code configurations of the Simple Style Guide.
## ./app/_config
This folder contains the configuration of you're currently used patterns. The file 'pattern.conf.json' will be autogenerate via a gulp task. Whenever you add a new pattern this new pattern will be written to the 'pattern.conf.json'
## ./app/_pattern
This folder contains all pattern and html snippets your style guide contains. Files needs to be stored to this folder with the  extension '.hbs'.
The 'atoms', 'molecules', 'organism', 'templates' and 'pages' folder helps you to organise your patterns and combine them together.
## ./app/scripts
In case you need custom javascript in your style guide you can put them in this scripts folder.
By default the only the main.js, that already exists in this folder is embedded in the style guide.
## ./app/styles
This folder contains the file 'main.scss'. This file allows you to customise the design of your patterns.
It is recommended to structure your styles in folders and multiple files.
To use them in your 'main.scss' you can simply use the [Sass @import](http://sass-lang.com/guide) statement.