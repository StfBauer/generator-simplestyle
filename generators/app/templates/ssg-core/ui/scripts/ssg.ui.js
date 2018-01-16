this["ssgCore"] = this["ssgCore"] || {};
this["ssgCore"]["templates"] = this["ssgCore"]["templates"] || {};
this["ssgCore"]["templates"]["addTools"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"ssg-add-tools\">\n</div>";
},"useData":true});
Handlebars.registerPartial("buttons",Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<button id=\"ssg-btn"
    + alias4(((helper = (helper = helpers.action || (depth0 != null ? depth0.action : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"action","hash":{},"data":data}) : helper)))
    + "\" class=\"ssg-btn "
    + alias4(((helper = (helper = helpers["class"] || (depth0 != null ? depth0["class"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"class","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</button>";
},"useData":true}));
this["ssgCore"]["templates"]["itemselector"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"ssg-items\" data-item-index=\""
    + alias4(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n	<button class=\"ssg-btn prev\" "
    + alias4(((helper = (helper = helpers.prevEnabled || (depth0 != null ? depth0.prevEnabled : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"prevEnabled","hash":{},"data":data}) : helper)))
    + " >&lt;</button>\n	<span class=\"item-title\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</span>\n	<button class=\"ssg-btn next\" "
    + alias4(((helper = (helper = helpers.nextEnabled || (depth0 != null ? depth0.nextEnabled : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nextEnabled","hash":{},"data":data}) : helper)))
    + " >&gt;</button>\n</div>";
},"useData":true});
this["ssgCore"]["templates"]["patternItem"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"ssg-item\" data-cat=\""
    + alias4(((helper = (helper = helpers.baseFilter || (depth0 != null ? depth0.baseFilter : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"baseFilter","hash":{},"data":data}) : helper)))
    + "\" data-file=\""
    + alias4(((helper = (helper = helpers.filename || (depth0 != null ? depth0.filename : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"filename","hash":{},"data":data}) : helper)))
    + "\">\n	<div class=\"ssg-item-header\">\n		<div class=\"ssg-item-title\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</div>\n		<div class=\"ssg-item-description\">\n			<div class=\"ssg-docs\">"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</div>\n			<b class=\"ssg-pattern-label\">Pattern name:</b>\n			<span class=\"ssg-pattern-name\">"
    + alias4(((helper = (helper = helpers.filename || (depth0 != null ? depth0.filename : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"filename","hash":{},"data":data}) : helper)))
    + "</span>\n		</div>\n	</div>\n	<div class=\"sample\">"
    + ((stack1 = ((helper = (helper = helpers.sample || (depth0 != null ? depth0.sample : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sample","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\n	<pre class=\"ssg-item-code\"><code class='language-markup'>"
    + alias4(((helper = (helper = helpers.sample || (depth0 != null ? depth0.sample : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sample","hash":{},"data":data}) : helper)))
    + "</code></pre>\n</div>";
},"useData":true});
this["ssgCore"]["templates"]["test"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"ello\"></div>";
},"useData":true});
this["ssgCore"]["templates"]["vpresizer"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\n	<input type=\"numeric\" id=\"ssg-vp-w\" class=\"ssg-input-s\" value=\""
    + alias4(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"width","hash":{},"data":data}) : helper)))
    + "\">\n	<span id=\"ssg-vp-by\">x</span>\n	<input type=\"numeric\" id=\"ssg-vp-h\" class=\"ssg-input-s\" value=\""
    + alias4(((helper = (helper = helpers.height || (depth0 != null ? depth0.height : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"height","hash":{},"data":data}) : helper)))
    + "\">\n	<button id=\"ssg-btn-disco\" class=\"ssg-btn\">Disco</button>\n";
},"useData":true});
/// <reference path="../../typings/index.d.ts" />
;
var ssg;
(function (ssg_1) {
    var UI;
    (function (UI) {
        var win = window, doc = document, ssgCoreTemplates = ssgCore.templates, ssgTemplates = ssg.templates, patternConfig = null, currentSingleItems = [], currentSingleCount = 0, currentUIState = ssg.UI.State;
        var viewports = [
            320,
            768,
            1024,
            3500
        ];
        var coreUiElement = {
            filterButton: '.ssg-core-filter .ssg-button',
            viewButton: '.ssg-core-view .ssg-button',
            viewPortButton: '.ssg-core-viewport .ssg-button',
            viewPortTarget: '.ssg-patterns-inner',
            viewPortWidth: '#ssg-in-width',
            viewToc: '.ssg-toc',
            viewTocInner: '.ssg-toc-inner',
            // Buttons
            discoButton: '.ssg-button[data-viewport=\'disco\']',
            btnShowCode: '.ssg-button[data-action=\'ssg-code\']',
            btnShowAnnotion: '.ssg-button[data-action=\'ssg-annot\']',
            btnShowToC: '.ssg-button[data-action=\'ssg-toc\']',
            tocItem: '.ssg-toc-item',
            tocSearchBox: '.ssg-toc-searchbox',
            tocSearchValue: 'toc-searchbox',
            patternItem: 'div[class^=ssg-item]',
            singleItemNavTitle: '#ssg-item-nav-label',
            singleItemNav: 'ssg-core-nav',
            singleNavLeft: 'ssg-left',
            singleNavRight: 'ssg-right',
            // States
            state: {
                active: 'active',
                hidden: 'hidden',
                show: 'show'
            }
        };
        UI.State = (function () {
            var STATE_KEY = "ssg.UI.State", XTRAS = ['isolate', 'code', 'annotation'], FILTERS = ['atoms', 'molecules', 'organism', 'templates', 'pages', 'single'], SCREEN = ['s', 'm', 'l', 'uwd', 'full', 'disco'];
            var _currentUIState = null;
            // default UI State;
            var defState = {
                "filter": "atoms",
                "xtras": ['annotation'],
                "screen": window.screen.availWidth
            };
            // Validate current state entry
            var _validateState = function (state) {
                // checking if all states are valid
                var checkSumXtras = 0, checkSumFilter = 0, checkSumScreen = 0;
                // Check current xtra selection
                for (var i = state.xtras.length - 1; i > 0; i--) {
                    var curState = state.xtras[i];
                    if (XTRAS.indexOf(curState) === -1) {
                        checkSumXtras += 1;
                    }
                }
                // Check current filter
                if (FILTERS.indexOf(state.filter) === -1) {
                    checkSumFilter += 1;
                }
                // check current screen
                try {
                    parseInt(state.screen.toString());
                }
                catch (exception) {
                    console.log("ERROR:" + exception);
                    checkSumScreen += 1;
                }
                if (checkSumFilter + checkSumXtras + checkSumScreen === 0) {
                    return true;
                }
                return false;
            };
            var _updateState = function (state) {
                var curState = state;
                if (_validateState(state)) {
                    localStorage.setItem(STATE_KEY, JSON.stringify(curState));
                }
                else {
                    throw "There are some errors with the state";
                }
            };
            (function () {
                var sessionState = localStorage.getItem(STATE_KEY);
                // If session already exists
                if (sessionState) {
                    _currentUIState = JSON.parse(sessionState);
                }
                else {
                    localStorage.setItem(STATE_KEY, JSON.stringify(defState));
                    _currentUIState = defState;
                }
            })();
            return {
                current: function () {
                    return _currentUIState;
                },
                update: function (state) {
                    _updateState(state);
                }
            };
        })();
        var Utils;
        (function (Utils) {
            Utils.requestData = function (method, url) {
                return new Promise(function (resolve, reject) {
                    var xhr;
                    var loaded = function () {
                        if (this.status >= 200 && this.status < 300) {
                            resolve(xhr.response);
                        }
                        else {
                            reject({
                                status: this.status,
                                statusText: xhr.statusText
                            });
                        }
                    };
                    var onError = function () {
                        reject({
                            status: this.status,
                            statusText: xhr.statusText
                        });
                    };
                    xhr = new XMLHttpRequest();
                    xhr.open(method, url);
                    xhr.onload = loaded;
                    xhr.onerror = onError;
                    xhr.send();
                });
            };
            Utils.changeItemToSinglePage = function (nodes) {
                var nodeCount = nodes.length;
                while (nodeCount !== 0) {
                    nodeCount -= 1;
                    var curNode = nodes[nodeCount];
                    if (curNode.classList.contains('ssg-item')) {
                        curNode.classList.remove('ssg-item');
                        curNode.classList.add('ssg-item-single');
                    }
                }
            };
            Utils.hideSingleItemSlider = function (hide) {
                var singleItemSelector = doc.querySelector("." + coreUiElement.singleItemNav);
                if (singleItemSelector !== undefined && singleItemSelector !== null) {
                    if (hide === true) {
                        singleItemSelector.classList.add(coreUiElement.state.hidden);
                    }
                    else {
                        singleItemSelector.classList.remove(coreUiElement.state.hidden);
                    }
                }
            };
        })(Utils = UI.Utils || (UI.Utils = {}));
        ;
        UI.Filter = {
            sliderSelection: function (filter) {
                var allElements = doc.querySelectorAll('div[data-cat]'), firstItemFound = false;
                // reset currentSingleItem
                currentSingleItems = [];
                for (var i = 0; i < allElements.length; i++) {
                    var curElement = allElements[i];
                    if (curElement.dataset['cat'] === filter) {
                        var curSingleItem = {
                            title: curElement.getAttribute('title'),
                            file: curElement.dataset['file'],
                            category: filter
                        };
                        currentSingleItems.push(curSingleItem);
                        if (firstItemFound === false) {
                            currentSingleCount = 0;
                            firstItemFound = true;
                            if (curElement.classList.contains('hide')) {
                                curElement.classList.remove('hide');
                            }
                        }
                        else {
                            curElement.classList.add('hide');
                        }
                    }
                    else {
                        curElement.classList.add('hide');
                    }
                }
                ssg.UI.EnableSingleSlider(currentSingleItems);
                if (currentSingleItems.length > 1) {
                    ssg.UI.Utils.hideSingleItemSlider(false);
                }
                else {
                    ssg.UI.Utils.hideSingleItemSlider(true);
                }
            },
            elements: function (filterValue) {
                switch (filterValue) {
                    case "atoms":
                    case "molecules":
                        var newState = ssg.UI.State.current();
                        newState.filter = filterValue;
                        ssg.UI.State.update(newState);
                        var allElements = doc.querySelectorAll('div[data-cat]');
                        for (var i = allElements.length - 1; i >= 0; i--) {
                            var curElement = allElements[i];
                            if (curElement.dataset['cat'] === filterValue) {
                                curElement.classList.remove('hide');
                            }
                            else {
                                curElement.classList.add('hide');
                            }
                        }
                        ssg.UI.Utils.hideSingleItemSlider(true);
                        break;
                    case "organism":
                        ssg.UI.Filter.sliderSelection(filterValue);
                        break;
                    case "templates":
                        ssg.UI.Filter.sliderSelection(filterValue);
                        break;
                    case "pages":
                        ssg.UI.Filter.sliderSelection(filterValue);
                        break;
                    default:
                        break;
                }
            }
        };
        UI.initDisco = function () {
            var disco = setInterval(function () {
                var discoButton = document.querySelector(coreUiElement.discoButton + "." + coreUiElement.state.active), viewPortInner = doc.querySelector(coreUiElement.viewPortTarget), viewPortWidth = doc.querySelector(coreUiElement.viewPortWidth);
                if (discoButton !== null) {
                    var curViewPort = Math.floor(Math.random() * (viewports.length - 0)) + 0;
                    viewPortWidth.value = viewPortInner.style.width = viewports[curViewPort].toString();
                }
                else {
                    clearInterval(disco);
                }
            }, 1000);
        };
        UI.Events = {
            // change all filter
            changeFilter: function (event) {
                // prevent all default
                event.preventDefault();
                var allButtons = doc.querySelectorAll(coreUiElement.filterButton);
                for (var i = allButtons.length - 1; i >= 0; i--) {
                    if (allButtons[i].classList.contains(coreUiElement.state.active)) {
                        allButtons[i].classList.remove(coreUiElement.state.active);
                    }
                }
                var curButton = event.target, filter = curButton.dataset['filter'];
                curButton.classList.add(coreUiElement.state.active);
                UI.Filter.elements(filter);
                // Check if toc button is active otherwise remove state.
                var tocButton = doc.querySelectorAll(coreUiElement.btnShowToC);
                // if toc button was found
                if (tocButton.length !== 0) {
                    // remove active state in case toc was selected
                    if (tocButton[0].classList.contains(coreUiElement.state.active)) {
                        tocButton[0].classList.remove('active');
                    }
                }
                ;
                var curState = ssg.UI.State.current();
                curState.filter = filter;
                ssg.UI.State.update(curState);
                return false;
            },
            // change view - Add isolated, code, Annotation
            changeView: function (event) {
                // prevent all default
                event.preventDefault();
                var curButton = event.target, filter = curButton.dataset['filter'];
                curButton.classList.contains(coreUiElement.state.active) ?
                    curButton.classList.remove(coreUiElement.state.active) : curButton.classList.add(coreUiElement.state.active);
            },
            // adjust view port to differnet width
            changeViewPort: function (event) {
                event.preventDefault();
                var vpButton = event.target, vpActiveButton = doc.querySelector(coreUiElement.viewPortButton + '.' + coreUiElement.state.active), vpData = vpButton.dataset['viewport'], vpTarget = doc.querySelector(coreUiElement.viewPortTarget), widthInput = doc.querySelector(coreUiElement.viewPortWidth);
                // Updating State
                var newState = ssg.UI.State.current();
                newState.screen = vpData;
                ssg.UI.State.update(newState);
                // remove current active button
                if (vpActiveButton !== null) {
                    vpActiveButton.classList.remove(coreUiElement.state.active);
                }
                if (vpActiveButton === vpButton) {
                    vpButton.classList.remove(coreUiElement.state.active);
                    vpData = 'full';
                }
                else {
                    vpButton.classList.add(coreUiElement.state.active);
                }
                // recheck Active Buttons
                vpActiveButton = doc.querySelector(coreUiElement.viewPortButton + '.' + coreUiElement.state.active);
                if (vpActiveButton === null) {
                    vpActiveButton = doc.querySelector('.ssg-button[data-viewport=\'full\']');
                    vpActiveButton.classList.add(coreUiElement.state.active);
                }
                // action what to do
                if (typeof vpTarget !== undefined) {
                    switch (vpData) {
                        case 'full':
                            vpData = vpTarget.style.width = win.innerWidth.toString();
                            break;
                        case 'disco':
                            ssg.UI.initDisco();
                            break;
                        default:
                            vpTarget.style.width = vpData;
                            break;
                    }
                    // assign special class for documentation
                    var vpCurSize = parseInt(vpData, 10);
                    if (vpCurSize !== NaN && vpCurSize <= 1024) {
                        console.log('small view port size');
                        vpTarget.classList.add('vp-small');
                    }
                    else {
                        console.log('large view port size');
                        vpTarget.classList.remove('vp-small');
                    }
                }
                if (vpData !== 'disco') {
                    // Update width indicator
                    vpTarget = doc.querySelector(coreUiElement.viewPortTarget);
                    widthInput.value = vpData;
                }
            },
            // Resize View Port through manual update of width
            viewPortResizer: function (event) {
                if (event instanceof KeyboardEvent) {
                    var kbEvent = event;
                    if (kbEvent.keyCode == 13) {
                        var innerPattern = doc.querySelector(coreUiElement.viewPortTarget), newWidth = doc.querySelector(coreUiElement.viewPortWidth);
                        innerPattern.style.width = newWidth.value;
                    }
                }
                else {
                    var innerPattern = doc.querySelector(coreUiElement.viewPortTarget), newWidth = doc.querySelector(coreUiElement.viewPortWidth);
                    innerPattern.style.width = newWidth.value;
                }
            },
            // Show and hides source code
            showSource: function (event) {
                event.preventDefault();
                event.stopImmediatePropagation();
                // Updating State
                var newState = ssg.UI.State.current();
                // check if code is already included in UI Extras
                if (newState.xtras.indexOf('code') === -1) {
                    newState.xtras.push('code');
                }
                else {
                    var newXtras = newState.xtras.filter(function (e) { return e !== 'code'; });
                    newState.xtras = newXtras;
                }
                ssg.UI.State.update(newState);
                if (event.target.classList.contains(coreUiElement.state.active)) {
                    // sho source code by adding class
                    var codeBlocks = doc.querySelectorAll('.ssg-item-code');
                    for (var i = codeBlocks.length - 1; i >= 0; i--) {
                        codeBlocks[i].classList.add(coreUiElement.state.show);
                    }
                }
                else {
                    // hide source code by removing the class
                    var codeBlocks = doc.querySelectorAll('.ssg-item-code');
                    for (var i = codeBlocks.length - 1; i >= 0; i--) {
                        codeBlocks[i].classList.remove(coreUiElement.state.show);
                    }
                }
            },
            // show and hides annotations
            showAnnotation: function (event) {
                event.preventDefault();
                event.stopImmediatePropagation();
                // Updating State
                var newState = ssg.UI.State.current();
                // check if code is already included in UI Extras
                if (newState.xtras.indexOf('annotation') === -1) {
                    newState.xtras.push('annotation');
                }
                else {
                    var newXtras = newState.xtras.filter(function (e) { return e !== 'annotation'; });
                    newState.xtras = newXtras;
                }
                ssg.UI.State.update(newState);
                if (event.target.classList.contains(coreUiElement.state.active)) {
                    // show annotation by adding class
                    var codeBlocks = doc.querySelectorAll('.ssg-item-description');
                    for (var i = codeBlocks.length - 1; i >= 0; i--) {
                        codeBlocks[i].classList.add(coreUiElement.state.show);
                    }
                }
                else {
                    // hide annotation code by removing the class
                    var codeBlocks = doc.querySelectorAll('.ssg-item-description');
                    for (var i = codeBlocks.length - 1; i >= 0; i--) {
                        codeBlocks[i].classList.remove(coreUiElement.state.show);
                    }
                }
            },
            // show and collapse table of contents
            showToc: function (event) {
                event.preventDefault();
                var currentButton = event.target, containerToc = doc.querySelector(coreUiElement.viewToc);
                currentButton !== null && currentButton.classList.contains(coreUiElement.state.active) ?
                    currentButton.classList.remove(coreUiElement.state.active) : currentButton.classList.add(coreUiElement.state.active);
                if (containerToc !== null) {
                    if (containerToc.classList.contains(coreUiElement.state.show)) {
                        containerToc.classList.add(coreUiElement.state.hidden);
                        containerToc.classList.remove(coreUiElement.state.show);
                    }
                    else {
                        containerToc.classList.remove(coreUiElement.state.hidden);
                        containerToc.classList.add(coreUiElement.state.show);
                    }
                }
            },
            // filter single toc element
            filterToc: function (event) {
                event.preventDefault();
                var currentToc = event.target, filter = currentToc.dataset['filter'], filterFolder = currentToc.dataset['folder'], filterCat = (currentToc.parentNode.attributes.getNamedItem('id').value), tocButton = doc.querySelector(ssg.UI.btnShowToC);
                if (tocButton) {
                    tocButton[0].classList.add('active');
                }
                if (filterCat) {
                    if (filterFolder === 'templates' ||
                        filterFolder === 'organism' ||
                        filterFolder === 'page') {
                        var selectedItems = doc.querySelectorAll('div[data-cat=' + filterFolder + ']');
                        // Updating current state
                        var curState = ssg.UI.State.current();
                        curState.filterSelector = '.' + filter;
                        ssg.UI.State.update(curState);
                        ssg.UI.Filter.sliderSelection(filterFolder);
                    }
                    else {
                        ssg.UI.Utils.hideSingleItemSlider(true);
                    }
                    var category = filterCat.split('-')[1];
                    var filterButtons = document.querySelectorAll('.ssg-core-filter .ssg-button');
                    for (var i = filterButtons.length - 1; i >= 0; i--) {
                        var curFilterButton = filterButtons[i], curFilterStyle = curFilterButton.classList, curDataSet = curFilterButton.dataset['filter'];
                        if (curFilterStyle.contains('active')) {
                            curFilterStyle.remove('active');
                        }
                        if (curDataSet === category) {
                            curFilterStyle.add('active');
                        }
                    }
                }
                // Updating State
                var newState = ssg.UI.State.current();
                newState.filter = 'single';
                newState.filterSelector = '.' + filter;
                ssg.UI.State.update(newState);
                if (filter !== null) {
                    var allElements = doc.querySelectorAll(coreUiElement.patternItem), tocElement = doc.querySelector(coreUiElement.viewToc);
                    for (var i = allElements.length - 1; i >= 0; i--) {
                        var curItem = allElements[i];
                        if (curItem.dataset['file'] === filter) {
                            curItem.classList.remove('hide');
                        }
                        else {
                            curItem.classList.add('hide');
                        }
                    }
                    tocElement.classList.remove('show');
                    tocElement.classList.add('hidden');
                }
            },
            // search for item in toc
            searchToc: function (event) {
                event.preventDefault();
                var searchBox = doc.getElementById(coreUiElement.tocSearchValue);
                if (searchBox !== null) {
                    var searchValue = searchBox.value;
                    var resetResult = doc.querySelectorAll('.ssg-toc-item');
                    for (var j = resetResult.length - 1; j >= 0; j--) {
                        if (resetResult[j].classList.contains('hide')) {
                            resetResult[j].classList.remove('hide');
                        }
                    }
                    if (searchValue !== '') {
                        var searchResult = doc.querySelectorAll(".ssg-toc-item:not([data-filter*='" + searchValue + "'])");
                        if (searchResult !== null) {
                            for (var i = searchResult.length - 1; i >= 0; i--) {
                                searchResult[i].classList.add('hide');
                            }
                        }
                    }
                }
            },
            // register specific event on all notes
            registerEvents: function (curElements, eventType, handler) {
                for (var i = curElements.length - 1; i >= 0; i--) {
                    curElements[i].addEventListener(eventType, handler);
                }
            }
        };
        UI.Render = function () {
            var RenderToc = function (patternConfig) {
                var patterns = patternConfig.patterns.filter(function (object) {
                    return object["deleted"] === undefined;
                }), folder = patternConfig.folder, ssgToc = doc.querySelector(coreUiElement.viewTocInner);
                for (var i = 0; i < folder.length; i++) {
                    var baseElement = '<ul><li id=ssg-' + folder[i].name + ' class=ssg-toc-header>' +
                        folder[i].name +
                        '</li><ul id=ssg-' + folder[i].name + '-items class=ssg-toc-items></ul></ul>';
                    ssgToc.insertAdjacentHTML('beforeend', baseElement);
                }
                for (var j = 0; j < patterns.length; j++) {
                    var folderpath = patterns[j].filepath.split('/')[0];
                    var patternTitle = '<li class=ssg-toc-item data-filter=\"' +
                        patterns[j].filename + '\" ' +
                        ' data-folder=\"' + folderpath + '\" ' +
                        '>' +
                        patterns[j].title + '</li>';
                    var currentSection = doc.getElementById('ssg-' + folderpath + '-items');
                    if (currentSection !== null) {
                        currentSection.insertAdjacentHTML('beforeend', patternTitle);
                    }
                }
                var tocItems = doc.querySelectorAll(coreUiElement.tocItem);
                for (var k = 0; k < tocItems.length; k++) {
                    tocItems[k].addEventListener('click', UI.Events.filterToc);
                }
            };
            var container = doc.querySelector(coreUiElement.viewPortTarget), tocContainer = doc.querySelector(coreUiElement.viewTocInner);
            var allContent = '', allToc = '', parser = new DOMParser();
            for (var i = patternConfig.patterns.length - 1; i >= 0; i--) {
                var curPattern = patternConfig.patterns[i], curPatternTitle = curPattern.filename, curTemplate = ssgTemplates[curPatternTitle];
                // Define base filter
                curPattern.baseFilter = curPattern.filepath.split('/')[0];
                if (curPattern !== null) {
                    curPattern.sample = curTemplate !== undefined ? curTemplate(ssgData) : curTemplate;
                    var content = ssgCoreTemplates.patternItem(curPattern);
                    try {
                        // Parse Document and check if all elements are properly closed
                        var domContent = parser.parseFromString(content, 'text/html');
                        // Append parsed content
                        allContent = domContent.body.innerHTML + allContent;
                    }
                    catch (exception) {
                        console.log(exception);
                    }
                }
            }
            var allContentDOM = parser.parseFromString(allContent, 'text/html');
            // alter templates and pages
            var allTempLates = allContentDOM.querySelectorAll('div[data-cat=templates]'), allPages = allContentDOM.querySelectorAll('div[data-cat=pages]'), allOrganism = allContentDOM.querySelectorAll('div[data-cat=organism]');
            Utils.changeItemToSinglePage(allTempLates);
            Utils.changeItemToSinglePage(allPages);
            Utils.changeItemToSinglePage(allOrganism);
            container.insertAdjacentHTML('afterbegin', allContentDOM.body.innerHTML);
            Prism.highlightAll();
            RenderToc(patternConfig);
            UI.ApplyUIState(ssg.UI.State.current());
        };
        UI.ApplyUIState = function (state) {
            var applyFilter = function (state) {
                if (state.filter !== undefined
                    && state.filter !== 'single') {
                    var buttons = doc.querySelectorAll(".ssg-button[data-filter]");
                    // Set correct button
                    for (var i = buttons.length - 1; i >= 0; i--) {
                        var curButton = buttons[i];
                        if (curButton.dataset !== null
                            && curButton.dataset !== undefined
                            && curButton.dataset['filter'] === state.filter) {
                            if (!curButton.classList.contains('active')) {
                                curButton.classList.add('active');
                            }
                        }
                        else {
                            if (curButton.classList.contains('active')) {
                                curButton.classList.remove('active');
                            }
                        }
                    }
                    var query = "div[class^='ssg-item'][data-cat='" + state.filter + "']", invQuery = "div[class^='ssg-item']:not([data-cat='" + state.filter + "'])";
                    if (state.filter === 'single') {
                        var filter = state.filterSelector.substr(1);
                        query = "div[data-file='" + filter + "']";
                        invQuery = "div:not([data-file='" + filter + "'])";
                        var tocButton = doc.querySelectorAll(".ssg-button[data-action='ssg-toc']");
                        if (tocButton !== undefined && tocButton.length === 1) {
                            tocButton[0].classList.add('active');
                        }
                    }
                    if (state.filter === 'organism' ||
                        state.filter === 'molecules' ||
                        state.filter === 'templates') {
                        ssg.UI.Filter.sliderSelection(state.filter);
                    }
                    // unselect all
                    var notSelItems = doc.querySelectorAll(invQuery);
                    for (var i = notSelItems.length - 1; i >= 0; i--) {
                        notSelItems[i].classList.add('hide');
                    }
                    // make sure all are selected
                    var selItems = doc.querySelectorAll(query);
                    if (selItems.length === 1) {
                        var curItem = selItems[0];
                        if (curItem.dataset.cat !== undefined
                            && curItem.dataset.cat !== null
                            && (curItem.dataset.cat === 'templates'
                                || curItem.dataset.cat === 'pages'
                                || curItem.dataset.cat === 'organism')) {
                            ssg.UI.Filter.sliderSelection(curItem.dataset.cat);
                        }
                        else {
                            ssg.UI.Utils.hideSingleItemSlider(true);
                        }
                    }
                    else {
                        for (var i = selItems.length - 1; i >= 0; i--) {
                            selItems[i].classList.remove('hide');
                        }
                    }
                }
                else if (state.filter === 'single') {
                    var tocButton = doc.querySelector(coreUiElement.btnShowToC);
                    tocButton.classList.add('active');
                    if (state.filterSelector !== undefined &&
                        state.filterSelector !== null) {
                        var curFilter = state.filterSelector.substr(1);
                        var allAMItems = [].slice.call(doc.querySelectorAll('div[class=ssg-item')), allOPTItems = [].slice.call(doc.querySelectorAll('div[class=ssg-item-single')), allItems = allAMItems.concat(allOPTItems);
                        for (var i = allItems.length - 1; i >= 0; i--) {
                            if (allItems[i].dataset['file'] !== curFilter) {
                                var curItem = allItems[i];
                                curItem.classList.add('hide');
                            }
                        }
                    }
                }
            };
            // apply the correct selected scren width tot the viewport
            var applyScreenWidth = function (state) {
                var viewPortQuery = "button[data-viewport='" + state.screen + "']", viewPortInvQuery = "button.active[data-viewport]", 
                // selecting buttons
                viewPortActiveButton = doc.querySelector(viewPortInvQuery), viewPortButton = doc.querySelector(viewPortQuery), 
                // width selector
                widthSelector = doc.getElementById('ssg-in-width'), contentWidth = doc.querySelector('.ssg-patterns-inner');
                // If full screeen use actian width
                if (state.screen === 'full') {
                    state.screen = window.innerWidth;
                }
                // set inner screen width of patterns
                contentWidth.style.width = state.screen + "px";
                // view width selector
                widthSelector.value = state.screen;
                // activate viewport button
                if (viewPortButton !== undefined
                    && viewPortButton !== null) {
                    viewPortButton.classList.add('active');
                    if (viewPortButton !== viewPortActiveButton) {
                        viewPortActiveButton.classList.remove('active');
                    }
                }
            };
            // applies extras such as shwo Source code
            var applyExtras = function (state) {
                // Set annotation button and enable annotations
                if (state.xtras.indexOf('annotation') !== -1) {
                    var notes = doc.querySelectorAll('.ssg-item-description');
                    for (var i = notes.length - 1; i >= 0; i--) {
                        var curNote = notes[i];
                        curNote.classList.add('show');
                    }
                    var notesButton = doc.querySelectorAll("button[data-action='ssg-annot']");
                    for (var i = notesButton.length - 1; i >= 0; i--) {
                        notesButton[i].classList.add('active');
                    }
                }
                // Set code button and shows code
                if (state.xtras.indexOf('code') !== -1) {
                    var notes = doc.querySelectorAll('.ssg-item-code');
                    for (var i = notes.length - 1; i >= 0; i--) {
                        var curNote = notes[i];
                        curNote.classList.add('show');
                    }
                    var notesButton = doc.querySelectorAll("button[data-action='ssg-code']");
                    for (var i = notesButton.length - 1; i >= 0; i--) {
                        notesButton[i].classList.add('active');
                    }
                }
            };
            applyFilter(state);
            applyScreenWidth(state);
            applyExtras(state);
        };
        UI.EnableSingleSlider = function (currentSingleItems, filter) {
            var slideItems = currentSingleItems;
            var setCurrentItem = function (index) {
                var curElement = slideItems[index];
                currentTitle.textContent = curElement.title;
                var allElements = doc.querySelectorAll('div[data-cat=\'' + slideItems[currentSingleCount].category + '\']');
                for (var j = 0; j < allElements.length; j++) {
                    var curPatternElement = allElements[j];
                    if (curPatternElement.dataset['file'] === curElement.file) {
                        curPatternElement.classList.remove('hide');
                        var newState = ssg.UI.State.current();
                        // newState.filter = "single";
                        newState.filterSelector = '.' + curPatternElement.dataset['file'];
                        ssg.UI.State.update(newState);
                    }
                    else {
                        curPatternElement.classList.add('hide');
                    }
                }
            };
            var slidePatterns = function (event) {
                event.preventDefault();
                event.stopPropagation();
                var currentButton = event.target;
                if (currentButton !== null) {
                    if (currentButton.dataset['filter'] === coreUiElement.singleNavLeft) {
                        currentSingleCount -= 1;
                    }
                    ;
                    if (currentButton.dataset['filter'] === coreUiElement.singleNavRight) {
                        currentSingleCount += 1;
                    }
                    ;
                    if (currentSingleCount > currentSingleItems.length - 1) {
                        currentSingleCount = 0;
                    }
                    if (currentSingleCount < 0) {
                        currentSingleCount = currentSingleItems.length - 1;
                    }
                }
                setCurrentItem(currentSingleCount);
            };
            // check if only one pattern is in current selection
            if (slideItems.length <= 1) {
                return;
            }
            var currentTitle = doc.querySelector(coreUiElement.singleItemNavTitle);
            currentTitle.textContent = slideItems[0].title;
            // let slider = doc.querySelectorAll('.ssg-core-nav .ssg-button[data-filter=\'' + filter + '\']');
            var slider = doc.querySelectorAll('.ssg-core-nav .ssg-button');
            for (var i = 0; i < slider.length; i++) {
                // remova all previous registered event handler
                var currentButton = slider[i];
                // clone current node without event handler
                var newButton = currentButton.cloneNode(true);
                // register new Click event
                newButton.addEventListener('click', slidePatterns);
                // replace element
                currentButton.parentNode.replaceChild(newButton, currentButton);
            }
            var curState = ssg.UI.State.current();
            // Check if TOC have been selected
            if (curState.filterSelector !== undefined) {
                // Setting current Item count i case filter using TOC
                currentSingleCount = currentSingleItems.findIndex(function (x) { return x.file === curState.filterSelector.substring(1); });
                // Update from current filter
                setCurrentItem(currentSingleCount);
            }
        };
        UI.ShowSliderCtrl = function (show) {
            var singleSliderControl = document.querySelector('.' + coreUiElement.singleItemNav);
            if (show) {
                singleSliderControl.classList.remove('hidden');
            }
            else {
                singleSliderControl.classList.add('hidden');
            }
        };
        UI.InitEvents = function () {
            // Render Events
            var filterButtons = doc.querySelectorAll(coreUiElement.filterButton), viewButtons = doc.querySelectorAll(coreUiElement.viewButton), viewPortButtons = doc.querySelectorAll(coreUiElement.viewPortButton), viewPortWidth = doc.querySelectorAll(coreUiElement.viewPortWidth), 
            // Action Buttons
            showCode = doc.querySelectorAll(coreUiElement.btnShowCode), showAnnot = doc.querySelectorAll(coreUiElement.btnShowAnnotion), showToc = doc.querySelectorAll(coreUiElement.btnShowToC), 
            // TOC Eevent
            allTocItems = doc.querySelectorAll(coreUiElement.tocSearchBox);
            UI.Events.registerEvents(filterButtons, 'click', UI.Events.changeFilter);
            UI.Events.registerEvents(viewButtons, 'click', UI.Events.changeView); // mabye obsolete?
            UI.Events.registerEvents(viewPortButtons, 'click', UI.Events.changeViewPort);
            UI.Events.registerEvents(viewPortWidth, 'blur', UI.Events.viewPortResizer);
            UI.Events.registerEvents(viewPortWidth, 'focusout', UI.Events.viewPortResizer);
            UI.Events.registerEvents(viewPortWidth, 'keypress', UI.Events.viewPortResizer);
            UI.Events.registerEvents(showCode, 'click', UI.Events.showSource);
            UI.Events.registerEvents(showAnnot, 'click', UI.Events.showAnnotation);
            // show and hide table fo contents
            UI.Events.registerEvents(showToc, 'click', UI.Events.showToc);
            // Search table of contents
            UI.Events.registerEvents(allTocItems, 'keyup', UI.Events.searchToc);
        };
        UI.Init = function () {
            Promise.all([ssg.UI.Utils.requestData('GET', '/_config/pattern.conf.json')])
                .then(function (result) {
                try {
                    patternConfig = JSON.parse(result.toString());
                }
                catch (error) {
                    console.log(error);
                }
            })
                .then(function () {
                UI.Render();
                UI.InitEvents();
                UI.ApplyUIState(ssg.UI.State.current());
                if (UI.PostRender.length !== 0) {
                    UI.PostRender.forEach(function (element) {
                        element();
                    });
                }
            })
                .catch(function (error) {
                console.log(error);
            });
        };
        UI.PostRender = [];
    })(UI = ssg_1.UI || (ssg_1.UI = {}));
})(ssg || (ssg = {}));
;
ssg.UI.Init();
Handlebars.registerHelper('description', function (block) {
    var description = '', markdownKey = block.data.root.baseFilter + '_' + block.data.root.title;
    if (ssgDoc[markdownKey] !== undefined) {
        description = ssgDoc[markdownKey].body;
        return new Handlebars.SafeString(description);
    }
    else {
        // description = block.data.root.description;
        return block.data.root.description;
    }
});

Handlebars.registerHelper('description', function (block) {
    var description = "", markdownKey = block.data.root.baseFilter + '_' + block.data.root.title;
    if (ssgDoc[markdownKey] !== undefined) {
        description = ssgDoc[markdownKey].body;
        return new Handlebars.SafeString(description);
    }
    else {
        // description = block.data.root.description;
        return block.data.root.description;
    }
});

//# sourceMappingURL=ssg.ui.js.map
