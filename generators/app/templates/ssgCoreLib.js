var jQuery = jQuery.noConflict();
(function($){
'use strict';
var baseComponents = {
    toc: {
        target: '#ssg-toolbar',
        action: 'toc',
        title: 'TOC',
        class: 'ssg-toc-switch'
    },
    additionalTools: {
        target: '#ssg-add-tools',
        items: [{
            action: 'isolate',
            title: 'Isolate',
            class: 'ssg-pattern-iso'
        }, {
            target: '#ssg-add-tools',
            action: 'showCode',
            title: 'Code',
            class: 'ssg-show-code'
        }, {
            target: '#ssg-add-tools',
            action: 'showAnnot',
            title: 'Annotation',
            class: 'ssg-show-annot'
        }]
    },
    filterButtons: {
        target: '#ssg-filter',
        items: [{
            action: 'atoms',
            title: 'Atoms',
            class: 'ssg-filter-button'
        }, {
            action: 'molecules',
            title: 'Molecules',
            class: 'ssg-filter-button'
        }, {
            action: 'orangism',
            title: 'Organism',
            class: 'ssg-filter-button'
        }, {
            action: 'templates',
            title: 'Templates',
            class: 'ssg-filter-button'
        }, {
            action: 'pages',
            title: 'Pages',
            class: 'ssg-filter-button'
        }]
    }
};

/* http://prismjs.com/download.html?themes=prism-okaidia&languages=markup+css+clike+javascript */
/* jshint:ignore */
var _self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},Prism=function(){var e=/\blang(?:uage)?-(?!\*)(\w+)\b/i,t=_self.Prism={util:{encode:function(e){return e instanceof n?new n(e.type,t.util.encode(e.content),e.alias):"Array"===t.util.type(e)?e.map(t.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},clone:function(e){var n=t.util.type(e);switch(n){case"Object":var a={};for(var r in e)e.hasOwnProperty(r)&&(a[r]=t.util.clone(e[r]));return a;case"Array":return e.map&&e.map(function(e){return t.util.clone(e)})}return e}},languages:{extend:function(e,n){var a=t.util.clone(t.languages[e]);for(var r in n)a[r]=n[r];return a},insertBefore:function(e,n,a,r){r=r||t.languages;var l=r[e];if(2==arguments.length){a=arguments[1];for(var i in a)a.hasOwnProperty(i)&&(l[i]=a[i]);return l}var o={};for(var s in l)if(l.hasOwnProperty(s)){if(s==n)for(var i in a)a.hasOwnProperty(i)&&(o[i]=a[i]);o[s]=l[s]}return t.languages.DFS(t.languages,function(t,n){n===r[e]&&t!=e&&(this[t]=o)}),r[e]=o},DFS:function(e,n,a,r){r=r||{};for(var l in e)e.hasOwnProperty(l)&&(n.call(e,l,e[l],a||l),"Object"!==t.util.type(e[l])||r[e[l]]?"Array"!==t.util.type(e[l])||r[e[l]]||(r[e[l]]=!0,t.languages.DFS(e[l],n,l,r)):(r[e[l]]=!0,t.languages.DFS(e[l],n,null,r)))}},plugins:{},highlightAll:function(e,n){for(var a,r=document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'),l=0;a=r[l++];)t.highlightElement(a,e===!0,n)},highlightElement:function(n,a,r){for(var l,i,o=n;o&&!e.test(o.className);)o=o.parentNode;o&&(l=(o.className.match(e)||[,""])[1],i=t.languages[l]),n.className=n.className.replace(e,"").replace(/\s+/g," ")+" language-"+l,o=n.parentNode,/pre/i.test(o.nodeName)&&(o.className=o.className.replace(e,"").replace(/\s+/g," ")+" language-"+l);var s=n.textContent,u={element:n,language:l,grammar:i,code:s};if(!s||!i)return t.hooks.run("complete",u),void 0;if(t.hooks.run("before-highlight",u),a&&_self.Worker){var g=new Worker(t.filename);g.onmessage=function(e){u.highlightedCode=e.data,t.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,r&&r.call(u.element),t.hooks.run("after-highlight",u),t.hooks.run("complete",u)},g.postMessage(JSON.stringify({language:u.language,code:u.code,immediateClose:!0}))}else u.highlightedCode=t.highlight(u.code,u.grammar,u.language),t.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,r&&r.call(n),t.hooks.run("after-highlight",u),t.hooks.run("complete",u)},highlight:function(e,a,r){var l=t.tokenize(e,a);return n.stringify(t.util.encode(l),r)},tokenize:function(e,n){var a=t.Token,r=[e],l=n.rest;if(l){for(var i in l)n[i]=l[i];delete n.rest}e:for(var i in n)if(n.hasOwnProperty(i)&&n[i]){var o=n[i];o="Array"===t.util.type(o)?o:[o];for(var s=0;s<o.length;++s){var u=o[s],g=u.inside,c=!!u.lookbehind,f=0,h=u.alias;u=u.pattern||u;for(var p=0;p<r.length;p++){var d=r[p];if(r.length>e.length)break e;if(!(d instanceof a)){u.lastIndex=0;var m=u.exec(d);if(m){c&&(f=m[1].length);var y=m.index-1+f,m=m[0].slice(f),v=m.length,k=y+v,b=d.slice(0,y+1),w=d.slice(k+1),P=[p,1];b&&P.push(b);var A=new a(i,g?t.tokenize(m,g):m,h);P.push(A),w&&P.push(w),Array.prototype.splice.apply(r,P)}}}}}return r},hooks:{all:{},add:function(e,n){var a=t.hooks.all;a[e]=a[e]||[],a[e].push(n)},run:function(e,n){var a=t.hooks.all[e];if(a&&a.length)for(var r,l=0;r=a[l++];)r(n)}}},n=t.Token=function(e,t,n){this.type=e,this.content=t,this.alias=n};if(n.stringify=function(e,a,r){if("string"==typeof e)return e;if("Array"===t.util.type(e))return e.map(function(t){return n.stringify(t,a,e)}).join("");var l={type:e.type,content:n.stringify(e.content,a,r),tag:"span",classes:["token",e.type],attributes:{},language:a,parent:r};if("comment"==l.type&&(l.attributes.spellcheck="true"),e.alias){var i="Array"===t.util.type(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(l.classes,i)}t.hooks.run("wrap",l);var o="";for(var s in l.attributes)o+=(o?" ":"")+s+'="'+(l.attributes[s]||"")+'"';return"<"+l.tag+' class="'+l.classes.join(" ")+'" '+o+">"+l.content+"</"+l.tag+">"},!_self.document)return _self.addEventListener?(_self.addEventListener("message",function(e){var n=JSON.parse(e.data),a=n.language,r=n.code,l=n.immediateClose;_self.postMessage(t.highlight(r,t.languages[a],a)),l&&_self.close()},!1),_self.Prism):_self.Prism;var a=document.getElementsByTagName("script");return a=a[a.length-1],a&&(t.filename=a.src,document.addEventListener&&!a.hasAttribute("data-manual")&&document.addEventListener("DOMContentLoaded",t.highlightAll)),_self.Prism}();"undefined"!=typeof module&&module.exports&&(module.exports=Prism),"undefined"!=typeof global&&(global.Prism=Prism);
Prism.languages.markup={comment:/<!--[\w\W]*?-->/,prolog:/<\?[\w\W]+?\?>/,doctype:/<!DOCTYPE[\w\W]+?>/,cdata:/<!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/<\/?(?!\d)[^\s>\/=.$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,inside:{punctuation:/[=>"']/}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},Prism.hooks.add("wrap",function(a){"entity"===a.type&&(a.attributes.title=a.content.replace(/&amp;/,"&"))}),Prism.languages.xml=Prism.languages.markup,Prism.languages.html=Prism.languages.markup,Prism.languages.mathml=Prism.languages.markup,Prism.languages.svg=Prism.languages.markup;
Prism.languages.css={comment:/\/\*[\w\W]*?\*\//,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*\{))/i,inside:{rule:/@[\w-]+/}},url:/url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,selector:/[^\{\}\s][^\{\};]*?(?=\s*\{)/,string:/("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,property:/(\b|\B)[\w-]+(?=\s*:)/i,important:/\B!important\b/i,"function":/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:]/},Prism.languages.css.atrule.inside.rest=Prism.util.clone(Prism.languages.css),Prism.languages.markup&&(Prism.languages.insertBefore("markup","tag",{style:{pattern:/(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,lookbehind:!0,inside:Prism.languages.css,alias:"language-css"}}),Prism.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|').*?\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:Prism.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:Prism.languages.css}},alias:"language-css"}},Prism.languages.markup.tag));
Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\w\W]*?\*\//,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0}],string:/(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,"class-name":{pattern:/((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,"boolean":/\b(true|false)\b/,"function":/[a-z0-9_]+(?=\()/i,number:/\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/};
Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,number:/\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,"function":/[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i}),Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,lookbehind:!0}}),Prism.languages.insertBefore("javascript","class-name",{"template-string":{pattern:/`(?:\\`|\\?[^`])*`/,inside:{interpolation:{pattern:/\$\{[^}]+\}/,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}}}),Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,lookbehind:!0,inside:Prism.languages.javascript,alias:"language-javascript"}}),Prism.languages.js=Prism.languages.javascript;

/* globals ssgCore,ssg,$,Handlebars,baseComponents,Prism */

// var ssgCore = ssgCore || {};

var curConfig;

var debug = (function() {


}());

// Build UI
// Filter
// Session Handling
// Render Style Guide
// Constructor
// Core components
ssgCore.components = {};

ssgCore.itemSelector = null;

ssgCore.components.addButton = function(item, target) {

    var button = Handlebars.partials.buttons;
    var filter = button(item);
    $(target).append(filter);
};

ssgCore.components.toc = function() {

    this.addButton(baseComponents.toc, baseComponents.toc.target);

};

ssgCore.components.filter = function() {

    var btnFilter = baseComponents.filterButtons;

    for (var i = 0; i < btnFilter.items.length; i++) {

        this.addButton(btnFilter.items[i], btnFilter.target);

    }

};

ssgCore.components.renderPatterns = function() {

    var patternItem = ssgCore.templates.patternItem,
        patternCont = $('#ssg-patterns-inner');

    var patterns = ssgCore.curConfig.patterns;

    for (var i = 0; i < patterns.length; i++) {

        var curPattern = patterns[i];

        var patternContent = ssg.templates[curPattern.filename];

        var baseContainer = curPattern.filepath.split('/')[0];

        curPattern.baseFilter = baseContainer;

        // Check if can be compiled
        if (patternContent !== undefined) {
            patternContent = patternContent();
        }

        curPattern.sample = patternContent;

        var content = patternItem(curPattern);

        patternCont.append(content);

    }


};

ssgCore.components.showAll = function() {

    $('.ssg-item[data-cat=\'templates\']').addClass('hide');
    $('.ssg-item[data-cat=\'pages\']').addClass('hide');

};

ssgCore.components.tocBuilder = function(data) {

    var patterns = data.patterns;

    var folder = data.folder;

    for (var i = 0; i < folder.length; i++) {

        $('#ssg-toc').append(
            '<ul><li id=ssg-' + folder[i].name + ' class=ssg-toc-header>' +
            folder[i].name +
            '</li><ul id=ssg-' + folder[i].name + '-items class=ssg-toc-items></ul></ul>'
        );

    }

    for (var j = 0; j < patterns.length; j++) {

        var folderpath = patterns[j].filepath.split('/')[0];

        var patternTitle = '<li class=ssg-toc-item data-filter=\"' +
            patterns[j].filename + '\">' +
            patterns[j].title + '</li>';

        var currentSection = $('#ssg-' + folderpath + '-items');

        if (currentSection.length !== 0) {

            currentSection.append(patternTitle);

        }

    }
};

ssgCore.components.resize = function() {

    var curWidth,
        maxWidth = $(document).width(),

        widthCtrl = $('#ssg-vp-w'),

        patternsContainer = '#ssg-patterns',
        patternsCtrl = $(patternsContainer),

        patternsInnerContainer = '#ssg-patterns-inner',
        patternsInnerCtrl = $(patternsInnerContainer),
        discoBtn = $('#ssg-btn-disco');

    if (patternsCtrl.length !== 0 && patternsCtrl.hasClass('animate') === false) {
        patternsCtrl.addClass('animate');
    }

    if (patternsInnerCtrl.length !== 0 && patternsInnerCtrl.hasClass('animate') === false) {
        patternsInnerCtrl.addClass('animate');
    }

    if (discoBtn.length !== 0 && discoBtn.hasClass('active')) {

        do {

            curWidth = Math.floor((Math.random() * maxWidth) + 1);

        } while (curWidth < 320);

        if (patternsCtrl.length !== 0) {

            // assign current width
            if (widthCtrl.length !== 0) {
                widthCtrl.val(curWidth);
            }

            patternsCtrl.css({
                'width': curWidth,
                'min-width': '0px'
            });

            // Add animation class to make use off CSS3 animations

        }

        // restart animation
        window.setTimeout(
            ssgCore.components.resize,
            1000);

    } else {

        // Remove style to resize to normal
        patternsCtrl.css('width', '100%');

        // Delay and wait until resize finished and remove rest
        setTimeout(function() {

            patternsCtrl.removeAttr('style').delay(1000).removeClass('animate');

            patternsInnerCtrl.removeAttr('style').delay(1000).removeClass('animate');

        }, 1000);

    }
};

ssgCore.components.viewPortResizer = function() {

    var width = $(window).width();
    var height = $(window).height();

    var curWindow = {
        'width': width,
        'height': height
    };

    var vpResizer = ssgCore.templates.vpresizer(curWindow);

    $('#ssg-vp-resizer').append(vpResizer);
};

ssgCore.components.additionalTools = function() {

    var btnFilter = baseComponents.additionalTools;

    for (var i = 0; i < btnFilter.items.length; i++) {

        this.addButton(btnFilter.items[i], btnFilter.target);

    }

};

ssgCore.components.addSelector = function(items, index) {


    if (items.length === 0) {
        return;
    }

    var curItem = {},
        prev,
        next;

    if (index <= 0) {

        curItem.prevEnabled = 'disabled';

    }

    if (index >= items.length - 1) {

        curItem.nextEnabled = 'disabled';

    }

    curItem.title = items[index].title;
    curItem.index = index;

    var itemSelectorHtml = ssgCore.templates.itemselector(curItem);

    $('#ssg-item-selector').html(itemSelectorHtml);

    var patterns = $('.ssg-item[data-cat=' + ssgCore.Session.filter.get() + ']');

    if (patterns.length !== 0) {

        patterns.addClass('hide');
        var curPattern = $(patterns[index]);
        curPattern.removeClass('hide');
        curPattern.find('.ssg-item-code').addClass('show');

    }


};

ssgCore.components.loadConfig = function() {

    return $.getJSON('/_config/pattern.conf.json');

};


ssgCore.initUi = (function() {

    // Logging debug information
    // debug();
    ssgCore.components.loadConfig().done(function(data) {

        ssgCore.curConfig = data;
        ssgCore.components.tocBuilder(data);

        // render patterns
        ssgCore.components.renderPatterns();
        Prism.highlightAll();


        // retrieve current item filter
        var curFilter = ssgCore.Session.filter.get();

        // apply category filter
        ssgCore.UIHelper.setCategoryFilter(curFilter);

    });

    // init filter button
    ssgCore.components.filter();

    // init table of contents
    ssgCore.components.toc();

    // init view port resizer
    ssgCore.components.viewPortResizer();

    //
    ssgCore.components.additionalTools();

}());

/* globals ssgCore,baseComponents,$,Prism */
ssgCore.Events = {};

ssgCore.Events.toggleToc = function(event) {

    event.preventDefault();

    var tocSection = $('#ssg-toc');

    if (tocSection.length !== 0) {
        tocSection.toggleClass('show');
    }

};

ssgCore.Events.closeToc = function() {

    var toc = $('#ssg-toc');

    if (toc.hasClass('show')) {
        toc.removeClass('show');
    }

};

// Fitler for multiple items
ssgCore.Events.filterItems = function(event) {

    var curButton = $(this);
    var filterMode = $(this).text().toLowerCase();

    // Check if TOC is closed
    ssgCore.Events.closeToc();

    // Just in case table of content is filtered
    $('#ssg-btntoc').removeClass('active');

    // Check if button is active
    if (curButton.hasClass('active')) {

        $('.ssg-filter-button').removeClass('active');
        ssgCore.UIHelper.setCategoryFilter(null);
        ssgCore.components.showAll();

    } else {

        $('.ssg-filter-button').removeClass('active');
        curButton.addClass('active');
        ssgCore.UIHelper.setCategoryFilter(filterMode);
        ssgCore.components.showAll();

    }

};

// Filter for single item
ssgCore.Events.filterItem = function(event) {

    event.preventDefault();

    var curFilter = $(this);

    if (curFilter.hasClass('selected')) {

        // remove selected from current filter
        curFilter.removeClass('selected');

        // remove active toc selection
        $('#ssg-btntoc').removeClass('active');

        // show all elements
        $('.ssg-item').removeClass('hide');

        return;
    }

    if (curFilter.length === 0) {
        return;
    }

    var curFilterValue = curFilter.data('filter');

    // Set toc filter as selected
    $('#ssg-btntoc').addClass('active');
    $('.ssg-filter-button').removeClass('active');


    // Remove all selected items
    $('.ssg-toc-item').removeClass('selected');

    // Select only the current one
    curFilter.addClass('selected');

    // filter items
    $('.ssg-item').addClass('hide');
    $('.ssg-item[data-file=' + curFilterValue + ']').removeClass('hide');

    // Close table of contents
    $('#ssg-toc').removeClass('show');

};

// Enable disco mode through automatic resizing
ssgCore.Events.enableDiscoMode = function(event) {

    event.preventDefault();

    var discoBtn = $(this),
        patternsContainer = '#ssg-patterns',
        patternsCtrl = $(patternsContainer),

        patternsInnerContainer = '#ssg-patterns-inner',
        patternsInnerCtrl = $(patternsInnerContainer);

    var curWidth = document.width;

    if (!discoBtn.hasClass('active')) {

        discoBtn.addClass('active');

        patternsCtrl.css('width', curWidth);

        var cssValues = {
            'width': curWidth,
            'min-width': '100%'
        };

        ssgCore.components.resize();

    } else {

        discoBtn.removeClass('active');

        // patternsCtrl.css('width', '100%');
        ssgCore.components.resize();

    }

};

// enables different sections
ssgCore.Events.sectionEnabler = function(curButton, affectedElement, noCode) {

    if (curButton.hasClass('active')) {

        curButton.removeClass('active');

        if (noCode === undefined) {
            affectedElement.removeClass('show');
        }

    } else {

        curButton.addClass('active');

        if (noCode === undefined) {
            affectedElement.addClass('show');
        }

    }

};

// toggle description text
ssgCore.Events.enableAnnotation = function(event) {

    var curButton = $(this),
        affectedElement = $('.ssg-item-description');

    ssgCore.Events.sectionEnabler(curButton, affectedElement);
    $('#ssg-btnisolate').removeClass('active');

    ssgCore.Session.uiOptions.add('annotation');

};

// toggle to show source code
ssgCore.Events.enableCode = function(event) {

    var curButton = $(this),
        affectedElement;

    $('.ssg-item').removeClass('isolate');
    $('#ssg-btnisolate').removeClass('active');

    var currentFilter = ssgCore.Session.filter.get();
    var curIndex = $('#ssg-items').data('item-index');
    affectedElement = $('div[data-cat=' + currentFilter + '] .ssg-item-code');

    // check if current template selection is not template or page
    if (currentFilter !== 'templates' && currentFilter !== 'pages') {

        ssgCore.Events.sectionEnabler(curButton, affectedElement);
        affectedElement.addClass('show');

    } else {
        // when templates or pages are currently selectd
        ssgCore.Events.sectionEnabler(curButton, affectedElement, true);
    }

    if (curButton.hasClass('active')) {

        ssgCore.Session.uiOptions.add('code');

    } else {

        ssgCore.Session.uiOptions.remove('code');

        $('.ssg-item-code').removeClass('show');

    }

    Prism.highlightAll();

};

// isolate pattern
ssgCore.Events.isolate = function(event) {

    var curButton = $(this);

    if (curButton.hasClass('active')) {

        curButton.removeClass('active');
        $('.ssg-item').removeClass('isolate');

        ssgCore.Session.uiOptions.remove();

    } else {

        curButton.addClass('active');

        $('.ssg-item').addClass('isolate');
        $('#ssg-btnshowCode').removeClass('active');
        $('#ssg-btnshowAnnot').removeClass('active');

        ssgCore.Session.uiOptions.remove();
        ssgCore.Session.uiOptions.add('isolate');

    }

};

// page and template next handler
ssgCore.Events.prevPage = function(event) {

    event.preventDefault();

    var curIndex = $('#ssg-items').data('item-index');

    $('#ssg-items').data('item-index', curIndex - 1);

    ssgCore.components.addSelector(ssgCore.itemSelector, curIndex - 1);

};

// page and template next handler
ssgCore.Events.nextPage = function(event) {

    event.preventDefault();

    //  return;
    var curIndex = parseInt($('#ssg-items').data('item-index'));

    $('.ssg-item-code').removeClass('show');

    $('#ssg-items').data('item-index', curIndex + 1);

    ssgCore.components.addSelector(ssgCore.itemSelector, curIndex + 1);

};

// init events
ssgCore.Events.init = (function() {

    // start toggle Toc
    $('.' + baseComponents.toc.class).bind('click', ssgCore.Events.toggleToc);

    // Core filter items for atoms, molecules, organism, tempalte and pages
    $('.ssg-filter-button').bind('click', ssgCore.Events.filterItems);

    // Single item filter
    $('#ssg-toc').on('click', '.ssg-toc-item', ssgCore.Events.filterItem);


    // Viewport resizer: Disco mode
    $('#ssg-btn-disco').bind('click', ssgCore.Events.enableDiscoMode);

    // Toggle Annotation
    $('#ssg-btnshowAnnot').on('click', ssgCore.Events.enableAnnotation);

    // Toggle Annotation
    $('#ssg-btnshowCode').on('click', ssgCore.Events.enableCode);

    // Toggle items to isolate
    $('#ssg-btnisolate').on('click', ssgCore.Events.isolate);

    // // page previous page
    // $('#ssg-item-selector').on('click', '.prev', ssgCore.Events.prevPage);

    // // page next page
    // $('#ssg-item-selector').on('click', '.next', ssgCore.Events.nextPage);


    $('#ssg-item-selector').on('click', '.next', ssgCore.Events.nextPage);
    $('#ssg-item-selector').on('click', '.prev', ssgCore.Events.prevPage);


}());
/* globals ssgCore,baseComponents,$ */
ssgCore.Session = {};

ssgCore.Session.filter = {

    add: function(filterValue) {
        if (typeof(Storage) !== undefined) {
            sessionStorage.setItem('currentFilter', filterValue);
        }
    },
    get: function() {
        if (typeof(Storage) !== undefined) {
            return sessionStorage.getItem('currentFilter');
        } else {
            return null;
        }
    },
    remove: function() {
        if (typeof(Storage) !== undefined) {
            sessionStorage.setItem('currentFilter', null);
        }
    }

};

ssgCore.Session.uiOptions = {

    add: function(filterValue) {

        if (typeof(Storage) !== undefined) {
            if (sessionStorage.getItem('uiOptions') === null) {
                sessionStorage.setItem('uiOptions', '');
            }

            var currentUiOptions = sessionStorage.getItem('uiOptions');

            // Check if current uiOptions are set to isolate
            if (currentUiOptions.indexOf('isolate') !== -1) {
                sessionStorage.setItem('uiOptions', '');
                currentUiOptions = '';
            }

            // remove current field value if it can be found
            if (currentUiOptions.indexOf(filterValue) === -1) {
                currentUiOptions += ' ' + filterValue;
            } else {
                currentUiOptions = currentUiOptions.replace(filterValue, '');
            }

            currentUiOptions = currentUiOptions.trim();

            sessionStorage.setItem('uiOptions', currentUiOptions);

        }

    },
    get: function() {
        if (typeof(Storage) !== undefined) {
            return sessionStorage.getItem('uiOptions');
        } else {
            return null;
        }
    },
    remove: function() {
        if (typeof(Storage) !== undefined) {
            sessionStorage.removeItem('uiOptions');
            sessionStorage.setItem('uiOptions', '');
        }
    }

};

ssgCore.Session.Code = {



};

/* globals ssgCore,baseComponents,$ */
ssgCore.UIHelper = {};

ssgCore.UIHelper.setCategoryFilter = function(filter) {
    // setting correct button active

    ssgCore.Session.filter.add(filter);

    if (filter != null) {

        // filter items
        var currentItems,
            otherItems;

        $('#ssg-item-selector').html('');

        if (filter === 'templates' || filter === 'pages') {

            var allElements = $('.ssg-item[data-cat=' + filter + ']');
            otherItems = $('.ssg-item');
            otherItems.addClass('hide');

            // var test = $('.ssg-item[data-cat=' + filter + ']');

            this.enablePaging(allElements);

            currentItems = $('.ssg-item[data-cat=' + filter + ']');
            currentItems[0].removeClass('hide');

        } else {

            currentItems = $('.ssg-item[data-cat=' + filter + ']');
            otherItems = $('.ssg-item[data-cat!=' + filter + ']');

            currentItems.removeClass('hide');
            otherItems.addClass('hide');

        }

        var filterButton = $('#ssg-btn' + filter);

        if (filterButton.length !== 0) {

            filterButton.addClass('active');

        }

    } else {

        // show all elements
        $('.ssg-item').removeClass('hide');
        // hide templates and pages
        $('.ssg-item[data-cat=pages]').addClass('hide');

        $('.ssg-item[data-cat=templates]').addClass('hide');

    }

};


ssgCore.UIHelper.enablePaging = function(elements) {

    var items = [];

    for (var i = 0; i < elements.length; i++) {

        var curItem = $(elements[i]);
        var curTitle = curItem.find('.ssg-item-title').text();

        var item = {
            title: curTitle
        };

        items.push(item);

    }

    ssgCore.itemSelector = items;
    ssgCore.components.addSelector(items, 0);

};
})(jQuery);
//# sourceMappingURL=ssgCoreLib.js.map
