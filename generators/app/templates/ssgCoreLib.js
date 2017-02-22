/// <reference path="../../typings/index.d.ts" />
var filterType;
(function (filterType) {
    filterType[filterType["category"] = 0] = "category";
    filterType[filterType["item"] = 1] = "item";
})(filterType || (filterType = {}));
var SsgUI;
(function (SsgUI) {
    'use strict';
    var document = window.document;
    var curPatternConfig = null;
    SsgUI.UiState = {
        currentFilter: {
            filter: 'atoms',
            type: filterType.category
        },
        uiOptions: {
            isolateUI: false,
            showAnnotation: false,
            showCode: false
        }
    };
    SsgUI.UiElements = {
        additionalTools: {
            buttons: [{
                    action: 'Isolate'
                }, {
                    action: 'Code'
                }, {
                    action: 'Annotation'
                }],
            container: 'ssg-add-tools'
        },
        baseContainer: 'ssg-patterns-inner',
        btnAnnot: 'annotation',
        btnCode: 'code',
        btnIsolate: 'isolate',
        btnPrefix: 'ssg-btn',
        code: '.ssg-item-code',
        disco: 'ssg-btn-disco',
        filter: '#ssg-filter',
        filterButtons: {
            buttons: [{
                    action: 'Atoms'
                }, {
                    action: 'Molecules'
                }, {
                    action: 'Organism'
                }, {
                    action: 'Templates'
                }, {
                    action: 'Pages'
                }],
            container: 'ssg-filter'
        },
        filterToc: {
            action: 'TOC'
        },
        itemSelector: 'ssg-item-selector',
        patternAnnotation: '.ssg-item-description',
        patternItem: '.ssg-item',
        resizer: '#ssg-vp-resizer',
        showCode: '.ssg-item-code',
        toc: 'ssg-toc',
        tocItem: '.ssg-toc-item',
        toolbar: '#ssg-toolbar',
        viewport: {
            height: 'ssg-vp-h',
            width: 'ssg-vp-w'
        }
    };
    var Utils;
    (function (Utils) {
        function requestData(method, url) {
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
        }
        Utils.requestData = requestData;
        ;
    })(Utils = SsgUI.Utils || (SsgUI.Utils = {}));
    ;
    var Session;
    (function (Session) {
        function getCurrentState() {
            var state;
            if (window.sessionStorage === undefined) {
                throw 'Session storage not available please update your browser';
            }
            // try to get session storeage
            var currentStateData = sessionStorage.getItem('ssgUI');
            // if failes init with new one
            if (currentStateData != null) {
                // loading from Session
                state = JSON.parse(currentStateData.toString());
            }
            else {
                // loading from default
                state = SsgUI.UiState;
            }
            return state;
        }
        Session.getCurrentState = getCurrentState;
        function saveCurrentState(state) {
            if (state === undefined) {
                throw 'Session object not define';
            }
            if (window.sessionStorage === undefined) {
                throw 'Session storage not available please update your browser';
            }
            // if failes init with new one
            if (state != null) {
                // loading from Session
                var stateString = JSON.stringify(state);
                sessionStorage.setItem('ssgUI', stateString);
            }
        }
        Session.saveCurrentState = saveCurrentState;
    })(Session = SsgUI.Session || (SsgUI.Session = {}));
    var Render;
    (function (Render) {
        var core = SsgUI.UiElements; // core UI elements
        function addFilterButtons() {
            var allButtons = '';
            for (var index = 0; index < core.filterButtons.buttons.length; index++) {
                var curButton = core.filterButtons.buttons[index];
                var curElement = {
                    action: curButton.action.toLowerCase(),
                    title: curButton.action
                };
                try {
                    allButtons += Handlebars['partials'].buttons(curElement);
                }
                catch (exception) {
                    console.log(exception);
                }
            }
            // query filter
            var filter = document.getElementById(core.filterButtons.container);
            filter.insertAdjacentHTML('beforeend', allButtons);
            var filterButtons = document.querySelectorAll(core.filter + ' .' + core.btnPrefix);
            for (var j = 0; j < filterButtons.length; j++) {
                var filterButton = filterButtons[j];
                filterButton.addEventListener('click', SsgUI.Events.filterSections);
            }
        }
        Render.addFilterButtons = addFilterButtons;
        ;
        /// viewport resizer
        function addViewPort() {
            var element = document.querySelector(core.resizer);
            element.innerHTML = ssgCore.templates.vpresizer();
            var height = document.getElementById(SsgUI.UiElements.viewport.height);
            var width = document.getElementById(SsgUI.UiElements.viewport.width);
            height.value = window.innerHeight.toString();
            width.value = window.innerWidth.toString();
            var discoBtn = document.getElementById(core.disco);
            discoBtn.addEventListener('click', SsgUI.Events.enableDisco);
        }
        Render.addViewPort = addViewPort;
        ;
        function addTocElements() {
            var element = document.getElementById(core.itemSelector), curButton = {
                action: core.filterToc.action.toLowerCase(),
                title: core.filterToc.action
            }, tocButton = Handlebars['partials'].buttons(curButton);
            element.insertAdjacentHTML('beforeend', tocButton);
            var curBtn = document.getElementById(SsgUI.UiElements.btnPrefix + curButton.action);
            if (curBtn !== undefined && curBtn !== null) {
                curBtn.addEventListener('click', SsgUI.Events.showToc);
            }
        }
        Render.addTocElements = addTocElements;
        ;
        /// add additionalTools
        function addTools() {
            var element = document.getElementById(core.additionalTools.container);
            for (var i = 0; i < core.additionalTools.buttons.length; i++) {
                var curButton = core.additionalTools.buttons[i];
                var curElement = {
                    action: curButton.action.toLowerCase(),
                    title: curButton.action
                };
                var newButton = Handlebars['partials'].buttons(curElement);
                element.insertAdjacentHTML('beforeend', newButton);
                var btnCode = document.getElementById(core.btnPrefix + curElement.action);
                btnCode.addEventListener('click', SsgUI.Events.additionalTools);
            }
        }
        Render.addTools = addTools;
        ;
        function renderPatterns(config) {
            var allPatternContent = '';
            // fetch base container
            var baseContainer = document.getElementById(core.baseContainer);
            for (var index = 0; index < config.patterns.length; index++) {
                // fetch current element
                var patternElement = config.patterns[index];
                // generate base filter value
                // assign base filter
                patternElement.baseFilter = patternElement.filepath.split('/')[0];
                try {
                    // assign pattern content
                    patternElement.sample = ssg.templates[patternElement.filename]();
                }
                catch (error) {
                    console.log("ERROR: Current file: " + patternElement.filename);
                }
                // generatore content
                var patternContent = ssgCore.templates.patternItem(patternElement);
                allPatternContent += patternContent;
            }
            // append elements to content
            baseContainer.insertAdjacentHTML('beforeend', allPatternContent);
        }
        Render.renderPatterns = renderPatterns;
        ;
        function renderToc(config) {
            var patterns = config.patterns, folder = config.folder, ssgToc = document.getElementById(SsgUI.UiElements.toc);
            for (var i = 0; i < folder.length; i++) {
                var baseElement = '<ul><li id=ssg-' + folder[i].name + ' class=ssg-toc-header>' +
                    folder[i].name +
                    '</li><ul id=ssg-' + folder[i].name + '-items class=ssg-toc-items></ul></ul>';
                ssgToc.insertAdjacentHTML('beforeend', baseElement);
            }
            for (var j = 0; j < patterns.length; j++) {
                var folderpath = patterns[j].filepath.split('/')[0];
                var patternTitle = '<li class=ssg-toc-item data-filter=\"' +
                    patterns[j].filename + '\">' +
                    patterns[j].title + '</li>';
                var currentSection = document.getElementById('ssg-' + folderpath + '-items');
                if (currentSection !== null) {
                    currentSection.insertAdjacentHTML('beforeend', patternTitle);
                }
            }
            var tocItems = document.querySelectorAll(core.tocItem);
            for (var k = 0; k < tocItems.length; k++) {
                tocItems[k].addEventListener('click', SsgUI.Events.filterTocItem);
            }
        }
        Render.renderToc = renderToc;
        ;
        function applySessionState() {
            var session = SsgUI.Session.getCurrentState();
            console.log(session);
            console.log(session.currentFilter.type);
            if (session.currentFilter.type === filterType.category) {
                var currentElement = Array.prototype.slice.call(document.querySelectorAll('.ssg-item[data-cat=\'' + session.currentFilter.filter + '\']'));
                SsgUI.Events.showCurrentSelection(currentElement, session.uiOptions.showCode);
                var currentButton = document.getElementById(core.btnPrefix + session.currentFilter.filter);
                currentButton.classList.add('active');
                if (session.currentFilter.filter === 'templates') {
                    var curFilterButton = document.getElementById('ssg-btntemplates');
                    curFilterButton.click();
                }
                if (session.currentFilter.filter === 'pages') {
                    var curFilterButton = document.getElementById('ssg-btnpages');
                    curFilterButton.click();
                }
                if (session.currentFilter.filter === 'organism') {
                    var curFilterButton = document.getElementById('ssg-btnorganism');
                    curFilterButton.click();
                }
            }
            if (session.currentFilter.type === filterType.item) {
                var currentElement = Array.prototype.slice.call(document.querySelectorAll('.ssg-item[data-file=\'' + session.currentFilter.filter + '\']'));
                SsgUI.Events.showCurrentSelection(currentElement);
                var currentButton = document.getElementById(core.btnPrefix + '-toc');
                currentButton.classList.add('active');
                var tocItems = document.querySelectorAll(core.tocItem +
                    '[data-filter=\'' + session.currentFilter.filter + '\']');
                for (var index = 0; index < tocItems.length; index++) {
                    var tocItem = tocItems[index];
                    tocItem.classList.add('selected');
                    tocItem.classList.add('session');
                }
            }
            // if add tools are set to isolate
            if (session.uiOptions.isolateUI) {
                try {
                    SsgUI.Events.isolatePatterns(true);
                    document.getElementById(core.btnPrefix + core.btnIsolate).classList.add('active');
                }
                catch (error) {
                    throw error;
                }
            }
            // if code preview is enabled
            if (session.uiOptions.showCode) {
                try {
                    SsgUI.Events.showCode(true);
                    document.getElementById(core.btnPrefix + core.btnCode).classList.add('active');
                }
                catch (error) {
                    throw error;
                }
            }
            // if annotations are enabled
            if (session.uiOptions.showAnnotation) {
                try {
                    SsgUI.Events.showAnnotation(true);
                    document.getElementById(core.btnPrefix + core.btnAnnot).classList.add('active');
                }
                catch (error) {
                    throw error;
                }
            }
        }
        Render.applySessionState = applySessionState;
        function renderUI() {
            // load admin ui
            addFilterButtons();
            addTools();
            addViewPort();
            Promise.all([SsgUI.Utils.requestData('GET', '/_config/pattern.conf.json')])
                .then(function (result) {
                try {
                    var patternConfig = JSON.parse(result.toString());
                    addTocElements();
                    renderToc(patternConfig);
                    renderPatterns(patternConfig);
                }
                catch (error) {
                    console.log(error);
                }
            })
                .then(function () {
                applySessionState();
            })
                .catch(function (error) {
                console.log(error);
            });
        }
        Render.renderUI = renderUI;
        ;
        // check if only a singel item is selected
        function itemSelector(filter) {
            // check if slider element already exists on Page
            var curItemSelector = document.getElementById('ssg-items'),
            // get current state to compare with new filter string
            session = SsgUI.Session.getCurrentState();
            // return if exists
            if (curItemSelector !== undefined && curItemSelector !== null) {
                return;
            }
            // select affectedItems
            var affectedItems = document.querySelectorAll('div[data-cat=\'' + filter + '\']');
            if (affectedItems === null || affectedItems.length === 0) {
                return;
            }
            // select first element of affectedItems in slider
            var firstItem = affectedItems[0];
            var title = firstItem.querySelectorAll('.ssg-item-title')[0].textContent;
            var curItem = {
                index: 0,
                title: title
            };
            // select first element
            var itemSelectorHtml = ssgCore.templates.itemselector(curItem);
            // insert slider element
            var itemSelector = document.getElementById(core.itemSelector);
            itemSelector.insertAdjacentHTML('afterbegin', itemSelectorHtml);
            var sliderButtons = document.querySelectorAll('#ssg-items .ssg-btn');
            for (var index = 0; index < sliderButtons.length; index++) {
                sliderButtons[index].addEventListener('click', SsgUI.Events.navigateItems);
            }
        }
        Render.itemSelector = itemSelector;
    })(Render = SsgUI.Render || (SsgUI.Render = {}));
    ;
    var Events;
    (function (Events) {
        var core = SsgUI.UiElements;
        // resets buttons of current section call before setting active one;
        function resetFilterButtons(btnElements) {
            var filterButtons = document.querySelectorAll(btnElements);
            for (var index = 0; index < filterButtons.length; index++) {
                var filterButton = filterButtons[index];
                filterButton.classList.remove('active');
            }
        }
        ;
        // returns current action string for futher selection
        function getCurrentAction(actionString) {
            return actionString.replace(core.btnPrefix, '');
        }
        ;
        // navigation between organism, pages and template
        function navigateItems(event) {
            event.preventDefault();
            // current event button
            var curButton = event.srcElement,
            // retrieve current session state
            session = SsgUI.Session.getCurrentState(),
            // current filter from session
            filter = session.currentFilter.filter,
            // current affected items
            items = document.querySelectorAll('div[data-cat=\'' + filter + '\']'),
            // navigation element
            naviElement = document.getElementById('ssg-items');
            if (naviElement.dataset['itemIndex'] === undefined) {
                return;
            }
            // parse current item index
            var curIndex = parseInt(naviElement.dataset['itemIndex']);
            // navigate to previous element
            if (curButton.classList.contains('prev')) {
                if (curIndex - 1 < 0) {
                    curIndex = items.length - 1;
                }
                else {
                    curIndex -= 1;
                }
            }
            // navigate to next element
            if (curButton.classList.contains('next')) {
                if (curIndex + 1 < items.length) {
                    curIndex += 1;
                }
                else {
                    curIndex = 0;
                }
            }
            for (var index = 0; index < items.length; index++) {
                var element = items[index];
                if (index === curIndex) {
                    element.classList.remove('hide');
                    // query current item title
                    var elemTitle = element.querySelector('.ssg-item-title'),
                    // query current slider title
                    elemSliderTitle = document.querySelector('.item-title'),
                    // query code section of current item
                    codeElements = element.querySelectorAll('.ssg-item-code'), codeElement = codeElements[0];
                    // assign slider item to current title
                    elemSliderTitle.textContent = elemTitle.textContent;
                    // if code is selected - show code
                    if (session.uiOptions.showCode) {
                        codeElement.classList.add('show');
                    }
                }
                else {
                    element.classList.add('hide');
                    var codeElements = element.querySelectorAll('.ssg-item-code'), codeElement = codeElements[0];
                    codeElement.classList.remove('show');
                }
            }
            naviElement.dataset.itemIndex = curIndex;
        }
        Events.navigateItems = navigateItems;
        ;
        // add isolation class to all pattern
        function isolatePatterns(enable) {
            var allElements = document.querySelectorAll(core.patternItem);
            for (var index = 0; index < allElements.length; index++) {
                if (enable === true) {
                    allElements[index]
                        .classList.add('isolate');
                }
                else {
                    allElements[index]
                        .classList.remove('isolate');
                }
            }
            // get current state
            var session = SsgUI.Session.getCurrentState();
            // enable UI Isolation
            session.uiOptions.isolateUI = true;
            session.uiOptions.showCode = false;
            session.uiOptions.showAnnotation = false;
            // save current session
            SsgUI.Session.saveCurrentState(session);
        }
        Events.isolatePatterns = isolatePatterns;
        ;
        // shows annotations of patterns
        function showAnnotation(enable) {
            // fetch all pattern annotattions
            var allElements = document.querySelectorAll(core.patternAnnotation);
            for (var index = 0; index < allElements.length; index++) {
                var element = allElements[index];
                if (enable === true) {
                    element.classList.add('show');
                }
                else {
                    element.classList.remove('show');
                }
            }
            // get current state
            var session = SsgUI.Session.getCurrentState();
            // enable UI Isolateion
            session.uiOptions.isolateUI = false;
            session.uiOptions.showAnnotation = true;
            // save current session
            SsgUI.Session.saveCurrentState(session);
        }
        Events.showAnnotation = showAnnotation;
        ;
        function showCode(enable) {
            // get current state
            var session = SsgUI.Session.getCurrentState();
            var curFilter = session.currentFilter.filter;
            var allElements = document.querySelectorAll(core.code);
            for (var index = 0; index < allElements.length; index++) {
                // get current code element
                var element = allElements[index];
                var closest = SsgUI.UiUtils.getClosest(element, '.ssg-item');
                var itemCat = closest.getAttribute('data-cat');
                if (itemCat !== 'organism' &&
                    itemCat !== 'pages' &&
                    itemCat !== 'templates') {
                    if (enable) {
                        element.classList.add('show');
                    }
                    else {
                        element.classList.remove('show');
                    }
                }
            }
            Prism.highlightAll(true);
            // enable UI Isolateion
            session.uiOptions.isolateUI = false;
            session.uiOptions.showCode = enable;
            // save current session
            SsgUI.Session.saveCurrentState(session);
        }
        Events.showCode = showCode;
        ;
        function showCurrentSelection(selectedItems, showCode) {
            var allElements = document.querySelectorAll(core.patternItem);
            var code = showCode === undefined ? false : showCode;
            // hide all elemtns
            for (var i = 0; i < allElements.length; i++) {
                var element = allElements[i];
                element.classList.add('hide');
            }
            // show only current selection
            for (var j = 0; j < selectedItems.length; j++) {
                var element = selectedItems[j];
                element.classList.remove('hide');
                if (code) {
                    var codeBlock = element.querySelector('.ssg-item-code');
                    codeBlock.classList.add('show');
                }
            }
        }
        Events.showCurrentSelection = showCurrentSelection;
        ;
        function showToc(event) {
            var session = SsgUI.Session.getCurrentState();
            if (event !== undefined) {
                event.preventDefault();
                if (session.currentFilter.type !== filterType.item) {
                    event.srcElement.classList.toggle('active');
                }
            }
            else {
                var tocBtn = document.getElementById(core.toc);
                if (tocBtn !== undefined) {
                    if (session.currentFilter.type !== filterType.item) {
                        tocBtn.classList.toggle('active');
                    }
                }
            }
            var tocContainer = document.getElementById(core.toc);
            if (tocContainer.classList.contains('show')) {
                tocContainer.classList.remove('show');
            }
            else {
                tocContainer.classList.add('show');
            }
        }
        Events.showToc = showToc;
        ;
        function resetTocSelection() {
            var tocElements = document.querySelectorAll(core.tocItem);
            for (var index = 0; index < tocElements.length; index++) {
                tocElements[index].classList.remove('selected');
            }
        }
        //
        function filterTocItem(event) {
            if (event === undefined) {
                throw 'toc element cannot be filtered';
            }
            var curElement = event.srcElement;
            curElement.classList.add('selected');
            var filter = curElement.dataset['filter'];
            if (filter !== undefined) {
                var affectedItems = Array.prototype.slice.call(document.querySelectorAll('div[data-file=\'' + filter + '\']'));
                showCurrentSelection(affectedItems);
                document.getElementById(core.toc).classList.remove('show');
                // reset currently selected elements
                resetTocSelection();
            }
            // rest all other filters
            resetFilterButtons(core.filter + ' .' + core.btnPrefix);
            // get current state
            var session = SsgUI.Session.getCurrentState();
            // enable UI Isolateion
            session.currentFilter.type = filterType.item;
            session.currentFilter.filter = filter;
            // save current session
            SsgUI.Session.saveCurrentState(session);
        }
        Events.filterTocItem = filterTocItem;
        function resetCode() {
            var allCodeElements = [];
            // let allCode: Array<HTMLElement> = document.querySelectorAll('div[data-cat=templates] .ssg-item-code');
            var allCodeTemplates = Array.prototype.slice.call(document.querySelectorAll('div[data-cat=templates] .ssg-item-code'));
            var allCodePages = Array.prototype.slice.call(document.querySelectorAll('div[data-cat=pages] .ssg-item-code'));
            var allCodeOrgansim = Array.prototype.slice.call(document.querySelectorAll('div[data-cat=organism] .ssg-item-code'));
            Array.prototype.push.apply(allCodeElements, allCodeTemplates);
            Array.prototype.push.apply(allCodeElements, allCodePages);
            Array.prototype.push.apply(allCodeElements, allCodeOrgansim);
            for (var i = 0; i < allCodeElements.length; i++) {
                var curElement = allCodeElements[i];
                curElement.classList.remove('show');
            }
        }
        Events.resetCode = resetCode;
        // filter complete sections
        function filterSections(event) {
            // get current state
            var session = SsgUI.Session.getCurrentState();
            if (event === undefined) {
                throw 'Filter cannot be selected';
            }
            event.preventDefault();
            var curButton = event.srcElement;
            resetFilterButtons(core.filter + ' .' + core.btnPrefix); // reset current selection
            curButton.classList.add('active'); // select current button
            var filter = getCurrentAction(curButton.id).toLocaleLowerCase();
            var curSelection = Array.prototype.slice.call(document.querySelectorAll('div[data-cat=\'' + filter + '\']'));
            // remove section selection
            var btnToc = document.querySelector('#' + core.itemSelector + ' .' + core.btnPrefix);
            // btnToc.classList.remove('active');
            resetCode();
            if (filter === 'organism' ||
                filter === 'templates' ||
                filter === 'pages') {
                // cheange this to create a speciall view for current elements
                showCurrentSelection(curSelection.slice(0, 1), session.uiOptions.showCode);
                // Apply current filter
                SsgUI.Render.itemSelector(filter);
            }
            else {
                // Apply current selection
                showCurrentSelection(curSelection);
                var itemSelector = document.querySelector('.ssg-cmd-section #ssg-items');
                if (itemSelector) {
                    itemSelector.remove();
                }
            }
            // enable UI Isolateion
            session.currentFilter.type = filterType.category;
            session.currentFilter.filter = filter;
            // save current session
            SsgUI.Session.saveCurrentState(session);
        }
        Events.filterSections = filterSections;
        ;
        function additionalTools(event) {
            if (event === undefined) {
                throw 'Event not fired';
            }
            event.preventDefault();
            var curButton = event.srcElement;
            var btnIsolate = core.btnPrefix + core.btnIsolate;
            var isolateActive = document.getElementById(btnIsolate).classList.contains('active');
            var action = getCurrentAction(curButton.id).toLowerCase();
            var enable = true;
            if (curButton.classList.contains('active')) {
                enable = false;
            }
            switch (action) {
                case 'isolate':
                    showAnnotation(false);
                    showCode(false);
                    resetFilterButtons('#' + core.additionalTools.container + ' .' + core.btnPrefix);
                    curButton.classList.toggle('active');
                    isolatePatterns(enable);
                    break;
                case 'code':
                    if (isolateActive === true) {
                        resetFilterButtons('#' + core.additionalTools.container + ' .' + core.btnPrefix);
                        isolatePatterns(false);
                    }
                    curButton.classList.toggle('active');
                    isolatePatterns(false);
                    showCode(enable);
                    break;
                case 'annotation':
                    if (isolateActive === true) {
                        resetFilterButtons('#' + core.additionalTools.container + ' .' + core.btnPrefix);
                        isolatePatterns(false);
                    }
                    curButton.classList.toggle('active');
                    showAnnotation(enable);
                    break;
                default:
                    break;
            }
        }
        Events.additionalTools = additionalTools;
        ;
        // enable responsive design tester
        function enableDisco(event) {
            event.preventDefault();
            var discoBtn = event.srcElement, patternsContainer = 'ssg-patterns', patternsCtrl = document.getElementById(patternsContainer),
            // patternsInnerContainer: string = 'ssg-patterns-inner',
            // patternsInnerCtrl: HTMLElement = <HTMLElement>document.getElementById(patternsInnerContainer),
            curWidth = window.innerWidth;
            if (!discoBtn.classList.contains('active')) {
                discoBtn.classList.add('active');
                patternsCtrl.style.width = curWidth.toString();
                SsgUI.UiUtils.discoMode();
            }
            else {
                discoBtn.classList.remove('active');
                SsgUI.UiUtils.discoMode();
            }
        }
        Events.enableDisco = enableDisco;
    })(Events = SsgUI.Events || (SsgUI.Events = {}));
    var UiUtils;
    (function (UiUtils) {
        function discoMode() {
            var curWidth, maxWidth = window.innerWidth, widthCtrl = document.getElementById(SsgUI.UiElements.viewport.width), patternsContainer = 'ssg-patterns', patternsCtrl = document.getElementById(patternsContainer), patternsInnerContainer = 'ssg-patterns-inner', patternsInnerCtrl = document.getElementById(patternsInnerContainer), discoBtn = document.getElementById('ssg-btn-disco');
            if (patternsCtrl !== undefined
                && patternsCtrl.classList.contains('animate') === false) {
                patternsCtrl.classList.add('animate');
            }
            if (patternsInnerCtrl !== undefined
                && patternsInnerCtrl.classList.contains('animate') === false) {
                patternsInnerCtrl.classList.add('animate');
            }
            if (discoBtn !== undefined && discoBtn.classList.contains('active')) {
                do {
                    curWidth = Math.floor((Math.random() * maxWidth) + 1);
                } while (curWidth < 320);
                if (patternsCtrl !== undefined) {
                    // assign current width
                    if (widthCtrl !== undefined) {
                        widthCtrl.value = curWidth.toString();
                    }
                    // assign default width
                    patternsCtrl.style.width = curWidth.toString();
                    patternsCtrl.style.minWidth = '0px';
                }
                // restart animation
                window.setTimeout(function () {
                    SsgUI.UiUtils.discoMode();
                }, 1000);
            }
            else {
                // temove style to resize to normal
                patternsCtrl.style.width = '100%';
                // delay and wait until resize finished and remove rest
                setTimeout(function () {
                    patternsCtrl.removeAttribute('style');
                    patternsInnerCtrl.removeAttribute('style');
                }, 1000);
            }
        }
        UiUtils.discoMode = discoMode;
        function getClosest(elem, selector) {
            // Variables
            var firstChar = selector.charAt(0);
            var supports = 'classList' in document.documentElement;
            var attribute, value;
            // If selector is a data attribute, split attribute from value
            if (firstChar === '[') {
                selector = selector.substr(1, selector.length - 2);
                attribute = selector.split('=');
                if (attribute.length > 1) {
                    value = true;
                    attribute[1] = attribute[1].replace(/"/g, '').replace(/'/g, '');
                }
            }
            // Get closest match
            for (; elem && elem !== document && elem.nodeType === 1; elem = elem.parentNode) {
                // If selector is a class
                if (firstChar === '.') {
                    if (supports) {
                        if (elem.classList.contains(selector.substr(1))) {
                            return elem;
                        }
                    }
                    else {
                        if (new RegExp('(^|\\s)' + selector.substr(1) + '(\\s|$)').test(elem.className)) {
                            return elem;
                        }
                    }
                }
                // If selector is an ID
                if (firstChar === '#') {
                    if (elem.id === selector.substr(1)) {
                        return elem;
                    }
                }
                // If selector is a data attribute
                if (firstChar === '[') {
                    if (elem.hasAttribute(attribute[0])) {
                        if (value) {
                            if (elem.getAttribute(attribute[0]) === attribute[1]) {
                                return elem;
                            }
                        }
                        else {
                            return elem;
                        }
                    }
                }
                // If selector is a tag
                if (elem.tagName.toLowerCase() === selector) {
                    return elem;
                }
            }
            return null;
        }
        UiUtils.getClosest = getClosest;
        ;
    })(UiUtils = SsgUI.UiUtils || (SsgUI.UiUtils = {}));
})(SsgUI || (SsgUI = {}));
// start the party
SsgUI.Render.renderUI();
