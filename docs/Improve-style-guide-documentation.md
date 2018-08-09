The core element of this style guide is the configuration file stored in `app/_config/pattern.conf.json`. Whenever a new pattern will be added, deleted or renamed this fill will be updated. If the pattern that was modified already existed only the filepath and the file name will be updated. The title and description will stay untouched.
The following sample of the json configuration file shows the patterns and the first element.

```json
{
  "patterns": [
    {
      "title": "01-pattern-file",
      "description": "",
      "filename": "01-pattern",
      "filepath": "atoms/01-pattern.hbs"
    },
    {
      "title": "01-your-first-atom",
```

Each pattern contains a `title`, `description`, `filename` and `filepath` those information will be auto-generated through the gulp tasks. `filename` and `filepath` shouldn't be touch because those are the mandatory field to identify the pattern. In case the file name needs to be renamed simply rename the file. The gulp task will update the file name automatically in the configuration file.

## Change Title and Description
`title` and `description` can be modified to contain any important information that helps the developer, user or customer better. Simply modify this properties in any pattern if needed. In case of the previous example the title  and description can be changed to something like this.

```json
{
  "patterns": [
    {
      "title": "My superb first pattern file",
      "description": "This pattern shows the first file in my style guide",
      "filename": "01-pattern",
      "filepath": "atoms/01-pattern.hbs"
    },
    {
      "title": "01-your-first-atom",
```

These changes reflect directly on the user interface of the style guide. The pattern will be shown like this.

![Show additional information](https://github.com/StfBauer/generator-simplestyle/blob/master/assets/additional-information-style-guide.png?raw=true)