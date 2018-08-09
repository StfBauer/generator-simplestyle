This recipe shows you how to integrate Office UI Fabric in SimpleStyle Guide. On the console install Office UI Fabric to your `package.json` file.

```sh
npm install office-ui-fabric-code --save-dev
```

This will install Office UI Fabric to the development dependencies. Once installed open the HTLM `app/index.html` and insert the following line of code in the head section.

```html
<link rel="stylesheet" href="/office-ui-fabric-core/dist/css/fabric.css" type="text/css">
```

The resulting HTML should then look like this.

![Office UI Fabric integrated](https://github.com/StfBauer/generator-simplestyle/wiki/assets/05-office-ui-fabric-integration.png)