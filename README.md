# Simple Style Guide Generator for SharePoint and Office 365 Development

[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/yosimplestyle/)
[![Slack](https://img.shields.io/badge/slack-join_the_conversation-red.svg)](https://simplestyleteam.slack.com/signup)

![logo][logo]

This yeoman generator allows you to create a Style Guide for your SharePoint and Office 365 projects. It helps you to document all style changes you do in SharePoint and allows other developers to resuse already developed patterns.

## History

*Current Version:*   2.6

## Installation


`npm install -g generator-simplestyle bower gulp jslint`

After you installed the yeoman generator you are able to create new style guide instances.

## Usage
After the yeoman generator have been installed a new project can be created on any empty folder by executing the following command:

`yo simplestyle`

![yeoman generator][yeoman]

### Add and maintain patterns
To store new pattern to the style guide simply add them in the folder

```
app/_patterns
```

This style guide follows the atomic design pattern and all pattern are organized in the following folders:

```
app/_patterns/atoms
app/_patterns/molecules
app/_patterns/organism
app/_patterns/templates
app/_patterns/pages
```

To add new pattern simply add a new HTML File with the file extension ".hbs" there. You can make full use of Handlebars in the template files.
When the web server is running the files will be picked up by a gulp task and automatically added to the configuration.

The pattern configuration is stored in the path:

```
app/_config/pattern.conf.json
```

All patterns are stored in the following format:

```
{
    "patterns": [
        {
            "title": "Headings",
            "description": "Default Headlines",
            "filename": "00-headings",
            "filepath": "atoms/00-headings.hbs"
        },
```

In ever pattern the title and description property can be change manually to a proper name.
Filename and file path will be used to find the pattern corresponding with the file.

## Credits
Inspiration for this project came from [PatternLab.io](http://patternlab.io) and [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) by Brad Frost.

## License

The MIT License (MIT)
Copyright (c) 2016 Stefan Bauer - N8D

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


[logo]: https://github.com/StfBauer/SimpleStyle/blob/dev/docs/assets/simple-style.png?raw=true "Simple Style"
[screenshot]: https://github.com/StfBauer/SimpleStyle/blob/dev/docs/assets/screenshot-simple-style.png?raw=true "Screen Shot"
[yeoman]: https://github.com/StfBauer/generator-simplestyle/blob/dev/assets/yeoman-generator-first-run.png?raw=true
