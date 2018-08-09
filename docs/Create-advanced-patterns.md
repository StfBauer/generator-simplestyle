The use of Handlebars allows to merge simple patterns together to more advanced advanced UI elements. The style guide stores each pattern with an unique name that can be found in the `app/_config/pattern.config.json`.

```json
{
    "patterns": [
        {
            "title": "01-your-first-atom",
            "description": "",
            "filename": "01-your-first-atom",
            "filepath": "atoms/01-your-first-atom.hbs"
        },
```

The filename of a pattern can be used for reference when patterns should be combined together. The following file is an example for the first pattern.

```handlebars
<!-- 01-pattern-file -->
<h1>This is the first pattern</h1>
```

This pattern should be referenced in a second file.

```handlebars
<!-- 02-pattern-file -->
<h2>This is the second pattern</h2>
```

To reference the first pattern simply add the following line to the second file: ```{{> 01-pattern-file }}
The resulting code looks is:

```handlebars
<!-- 02-pattern-file -->
{{> 01-pattern-file }}
<h2>This is the second pattern</h2>
```

The result of the combination of both templates should be displayed in the style guide like shown in the following screenshot.

![combined patterns](https://github.com/StfBauer/generator-simplestyle/blob/master/assets/combine-patterns.png?raw=true)

## Additional considerations
One recommended practice is to organise sibling patterns in the same sub folder. The following structure give an indication how this can be done.

* atoms/01-text-elements
    * /01-paragraph.hbs
    * /02-lead-paragraph.hbs
    * /03-headlines.hbs
    * /04-code.hbs
    * /05-hyperlinks.hbs
* atoms/02-table-variants
    * /01-table-variant-01.hbs
    * /02-table-variant-02.hbs
    * /03-table-variant-03.hbs
    * /04-table-variant-04.hbs

With this simple naming convention the patterns in the configuration will be automatically sorted and appear in the style guide in the correct order otherwise the patterns needs to be sorted manually.

## Reuse patterns in patterns
The benefit that SimpleStyle used Handlebars to compile and display the patterns brings other benefits too. All pattern defined is also registered as a partial template. This way it is possible to reuse already define patterns in other patterns. The default files provided by the generator already make use of the method.
The file `atoms/01-atom.hbs` is the smallest piece of pattern, this is also included embedded in the molecule `molecules/01-molecule.hbs`. This molecule is embedded in the organism `organism/01-organism.hbs`. This organism is then included in the template `template/01-template.hbs` and this file is finally include on the page `page/01-page.hbs`.
The file `01-atom.hbs` contains the following code:

```html
<!-- First Atom -->
<p>This is the first atom which uses the data stored in the `_data` folder.
    <br>
    <br>
    <br> By the way the following hyperlink use data that data binding:
    <br>
    <a href="{{ href }}">{{ title }}</a>
</p>
<!-- /First Atom -->

To embedded this files in the file `01-template.hbs` the following code is required.

```

To make use of this file `01-atom` in the `01-template` the following code is required.

```handlebars
<!-- First Molecule -->
This molecule uses an atom. {{> 01-atom }}
<!-- /First Molecule -->
```

Like mentioned before every template get also compiled to a partial handlebar template. The part that actually makes the embedding is the following part of the previously shown code.

```
{{> 01-atom }}
```

The name in of the partial template is set to `01-atom` this name needs to be wrapped up in curly braces. The opening braces also requires the greater than sign.
This follows exactly the pattern for [partial Handlebar templates](http://handlebarsjs.com/partials.html).