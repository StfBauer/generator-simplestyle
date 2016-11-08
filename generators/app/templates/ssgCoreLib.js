var filterType;!function(a){a[a.category=0]="category",a[a.item=1]="item"}(filterType||(filterType={}));var SsgUI;!function(a){"use strict";var b=window.document;a.UiState={currentFilter:{filter:"atoms",type:filterType.category},uiOptions:{isolateUI:!1,showAnnotation:!1,showCode:!1}},a.UiElements={additionalTools:{buttons:[{action:"Isolate"},{action:"Code"},{action:"Annotation"}],container:"ssg-add-tools"},baseContainer:"ssg-patterns-inner",btnAnnot:"annotation",btnCode:"code",btnIsolate:"isolate",btnPrefix:"ssg-btn",code:".ssg-item-code",disco:"ssg-btn-disco",filter:"#ssg-filter",filterButtons:{buttons:[{action:"Atoms"},{action:"Molecules"},{action:"Organism"},{action:"Templates"},{action:"Pages"}],container:"ssg-filter"},filterToc:{action:"TOC"},itemSelector:"ssg-item-selector",patternAnnotation:".ssg-item-description",patternItem:".ssg-item",resizer:"#ssg-vp-resizer",showCode:".ssg-item-code",toc:"ssg-toc",tocItem:".ssg-toc-item",toolbar:"#ssg-toolbar",viewport:{height:"ssg-vp-h",width:"ssg-vp-w"}};var d;!function(a){function b(a,b){return new Promise(function(c,d){var e,f=function(){this.status>=200&&this.status<300?c(e.response):d({status:this.status,statusText:e.statusText})},g=function(){d({status:this.status,statusText:e.statusText})};e=new XMLHttpRequest,e.open(a,b),e.onload=f,e.onerror=g,e.send()})}a.requestData=b}(d=a.Utils||(a.Utils={}));var e;!function(b){function c(){var b;if(void 0===window.sessionStorage)throw"Session storage not available please update your browser";var c=sessionStorage.getItem("ssgUI");return b=null!=c?JSON.parse(c.toString()):a.UiState}function d(a){if(void 0===a)throw"Session object not define";if(void 0===window.sessionStorage)throw"Session storage not available please update your browser";if(null!=a){var b=JSON.stringify(a);sessionStorage.setItem("ssgUI",b)}}b.getCurrentState=c,b.saveCurrentState=d}(e=a.Session||(a.Session={}));var f;!function(c){function e(){for(var c="",e=0;e<d.filterButtons.buttons.length;e++){var f=d.filterButtons.buttons[e],g={action:f.action.toLowerCase(),title:f.action};try{c+=Handlebars.partials.buttons(g)}catch(a){console.log(a)}}var h=b.getElementById(d.filterButtons.container);h.insertAdjacentHTML("beforeend",c);for(var i=b.querySelectorAll(d.filter+" ."+d.btnPrefix),j=0;j<i.length;j++){var k=i[j];k.addEventListener("click",a.Events.filterSections)}}function f(){var c=b.querySelector(d.resizer);c.innerHTML=ssgCore.templates.vpresizer();var e=b.getElementById(a.UiElements.viewport.height),f=b.getElementById(a.UiElements.viewport.width);e.value=window.innerHeight.toString(),f.value=window.innerWidth.toString();var g=b.getElementById(d.disco);g.addEventListener("click",a.Events.enableDisco)}function g(){var c=b.getElementById(d.itemSelector),e={action:d.filterToc.action.toLowerCase(),title:d.filterToc.action},f=Handlebars.partials.buttons(e);c.insertAdjacentHTML("beforeend",f);var g=b.getElementById(a.UiElements.btnPrefix+e.action);void 0!==g&&null!==g&&g.addEventListener("click",a.Events.showToc)}function h(){for(var c=b.getElementById(d.additionalTools.container),e=0;e<d.additionalTools.buttons.length;e++){var f=d.additionalTools.buttons[e],g={action:f.action.toLowerCase(),title:f.action},h=Handlebars.partials.buttons(g);c.insertAdjacentHTML("beforeend",h);var i=b.getElementById(d.btnPrefix+g.action);i.addEventListener("click",a.Events.additionalTools)}}function i(a){for(var c="",e=b.getElementById(d.baseContainer),f=0;f<a.patterns.length;f++){var g=a.patterns[f];g.baseFilter=g.filepath.split("/")[0],g.sample=ssg.templates[g.filename]();var h=ssgCore.templates.patternItem(g);c+=h}e.insertAdjacentHTML("beforeend",c)}function j(c){for(var e=c.patterns,f=c.folder,g=b.getElementById(a.UiElements.toc),h=0;h<f.length;h++){var i="<ul><li id=ssg-"+f[h].name+" class=ssg-toc-header>"+f[h].name+"</li><ul id=ssg-"+f[h].name+"-items class=ssg-toc-items></ul></ul>";g.insertAdjacentHTML("beforeend",i)}for(var j=0;j<e.length;j++){var k=e[j].filepath.split("/")[0],l='<li class=ssg-toc-item data-filter="'+e[j].filename+'">'+e[j].title+"</li>",m=b.getElementById("ssg-"+k+"-items");null!==m&&m.insertAdjacentHTML("beforeend",l)}for(var n=b.querySelectorAll(d.tocItem),o=0;o<n.length;o++)n[o].addEventListener("click",a.Events.filterTocItem)}function k(){var c=a.Session.getCurrentState();if(console.log(c),console.log(c.currentFilter.type),c.currentFilter.type===filterType.category){var e=Array.prototype.slice.call(b.querySelectorAll(".ssg-item[data-cat='"+c.currentFilter.filter+"']"));a.Events.showCurrentSelection(e,c.uiOptions.showCode);var f=b.getElementById(d.btnPrefix+c.currentFilter.filter);if(f.classList.add("active"),"templates"===c.currentFilter.filter){var g=b.getElementById("ssg-btntemplates");g.click()}if("pages"===c.currentFilter.filter){var g=b.getElementById("ssg-btnpages");g.click()}if("organism"===c.currentFilter.filter){var g=b.getElementById("ssg-btnorganism");g.click()}}if(c.currentFilter.type===filterType.item){var e=Array.prototype.slice.call(b.querySelectorAll(".ssg-item[data-file='"+c.currentFilter.filter+"']"));a.Events.showCurrentSelection(e);var f=b.getElementById(d.btnPrefix+"-toc");f.classList.add("active");for(var h=b.querySelectorAll(d.tocItem+"[data-filter='"+c.currentFilter.filter+"']"),i=0;i<h.length;i++){var j=h[i];j.classList.add("selected"),j.classList.add("session")}}if(c.uiOptions.isolateUI)try{a.Events.isolatePatterns(!0),b.getElementById(d.btnPrefix+d.btnIsolate).classList.add("active")}catch(a){throw a}if(c.uiOptions.showCode)try{a.Events.showCode(!0),b.getElementById(d.btnPrefix+d.btnCode).classList.add("active")}catch(a){throw a}if(c.uiOptions.showAnnotation)try{a.Events.showAnnotation(!0),b.getElementById(d.btnPrefix+d.btnAnnot).classList.add("active")}catch(a){throw a}}function l(){e(),h(),f(),Promise.all([a.Utils.requestData("GET","/scripts/pattern.conf.json")]).then(function(a){try{var b=JSON.parse(a.toString());g(),j(b),i(b)}catch(a){console.log(a)}}).then(function(){k()}).catch(function(a){console.log(a)})}function m(c){var e=b.getElementById("ssg-items");a.Session.getCurrentState();if(void 0===e||null===e){var g=b.querySelectorAll("div[data-cat='"+c+"']");if(null!==g&&0!==g.length){var h=g[0],i=h.querySelectorAll(".ssg-item-title")[0].textContent,j={index:0,title:i},k=ssgCore.templates.itemselector(j),l=b.getElementById(d.itemSelector);l.insertAdjacentHTML("afterbegin",k);for(var m=b.querySelectorAll("#ssg-items .ssg-btn"),n=0;n<m.length;n++)m[n].addEventListener("click",a.Events.navigateItems)}}}var d=a.UiElements;c.addFilterButtons=e,c.addViewPort=f,c.addTocElements=g,c.addTools=h,c.renderPatterns=i,c.renderToc=j,c.applySessionState=k,c.renderUI=l,c.itemSelector=m}(f=a.Render||(a.Render={}));var g;!function(c){function e(a){for(var c=b.querySelectorAll(a),d=0;d<c.length;d++){var e=c[d];e.classList.remove("active")}}function f(a){return a.replace(d.btnPrefix,"")}function g(c){c.preventDefault();var d=c.srcElement,e=a.Session.getCurrentState(),f=e.currentFilter.filter,g=b.querySelectorAll("div[data-cat='"+f+"']"),h=b.getElementById("ssg-items");if(void 0!==h.dataset.itemIndex){var i=parseInt(h.dataset.itemIndex);d.classList.contains("prev")&&(i-1<0?i=g.length-1:i-=1),d.classList.contains("next")&&(i+1<g.length?i+=1:i=0);for(var j=0;j<g.length;j++){var k=g[j];if(j===i){k.classList.remove("hide");var l=k.querySelector(".ssg-item-title"),m=b.querySelector(".item-title"),n=k.querySelectorAll(".ssg-item-code"),o=n[0];m.textContent=l.textContent,e.uiOptions.showCode&&o.classList.add("show")}else{k.classList.add("hide");var n=k.querySelectorAll(".ssg-item-code"),o=n[0];o.classList.remove("show")}}h.dataset.itemIndex=i}}function h(c){for(var e=b.querySelectorAll(d.patternItem),f=0;f<e.length;f++)c===!0?e[f].classList.add("isolate"):e[f].classList.remove("isolate");var g=a.Session.getCurrentState();g.uiOptions.isolateUI=!0,g.uiOptions.showCode=!1,g.uiOptions.showAnnotation=!1,a.Session.saveCurrentState(g)}function i(c){for(var e=b.querySelectorAll(d.patternAnnotation),f=0;f<e.length;f++){var g=e[f];c===!0?g.classList.add("show"):g.classList.remove("show")}var h=a.Session.getCurrentState();h.uiOptions.isolateUI=!1,h.uiOptions.showAnnotation=!0,a.Session.saveCurrentState(h)}function j(c){for(var e=a.Session.getCurrentState(),g=(e.currentFilter.filter,b.querySelectorAll(d.code)),h=0;h<g.length;h++){var i=g[h],j=a.UiUtils.getClosest(i,".ssg-item"),k=j.getAttribute("data-cat");"organism"!==k&&"pages"!==k&&"templates"!==k&&(c?i.classList.add("show"):i.classList.remove("show"))}Prism.highlightAll(!0),e.uiOptions.isolateUI=!1,e.uiOptions.showCode=c,a.Session.saveCurrentState(e)}function k(a,c){for(var e=b.querySelectorAll(d.patternItem),f=void 0!==c&&c,g=0;g<e.length;g++){var h=e[g];h.classList.add("hide")}for(var i=0;i<a.length;i++){var h=a[i];if(h.classList.remove("hide"),f){var j=h.querySelector(".ssg-item-code");j.classList.add("show")}}}function l(c){var e=a.Session.getCurrentState();if(void 0!==c)c.preventDefault(),e.currentFilter.type!==filterType.item&&c.srcElement.classList.toggle("active");else{var f=b.getElementById(d.toc);void 0!==f&&e.currentFilter.type!==filterType.item&&f.classList.toggle("active")}var g=b.getElementById(d.toc);g.classList.contains("show")?g.classList.remove("show"):g.classList.add("show")}function m(){for(var a=b.querySelectorAll(d.tocItem),c=0;c<a.length;c++)a[c].classList.remove("selected")}function n(c){if(void 0===c)throw"toc element cannot be filtered";var f=c.srcElement;f.classList.add("selected");var g=f.dataset.filter;if(void 0!==g){var h=Array.prototype.slice.call(b.querySelectorAll("div[data-file='"+g+"']"));k(h),b.getElementById(d.toc).classList.remove("show"),m()}e(d.filter+" ."+d.btnPrefix);var i=a.Session.getCurrentState();i.currentFilter.type=filterType.item,i.currentFilter.filter=g,a.Session.saveCurrentState(i)}function o(){var a=[],c=Array.prototype.slice.call(b.querySelectorAll("div[data-cat=templates] .ssg-item-code")),d=Array.prototype.slice.call(b.querySelectorAll("div[data-cat=pages] .ssg-item-code")),e=Array.prototype.slice.call(b.querySelectorAll("div[data-cat=organism] .ssg-item-code"));Array.prototype.push.apply(a,c),Array.prototype.push.apply(a,d),Array.prototype.push.apply(a,e);for(var f=0;f<a.length;f++){var g=a[f];g.classList.remove("show")}}function p(c){var g=a.Session.getCurrentState();if(void 0===c)throw"Filter cannot be selected";c.preventDefault();var h=c.srcElement;e(d.filter+" ."+d.btnPrefix),h.classList.add("active");var i=f(h.id).toLocaleLowerCase(),j=Array.prototype.slice.call(b.querySelectorAll("div[data-cat='"+i+"']"));b.querySelector("#"+d.itemSelector+" ."+d.btnPrefix);if(o(),"organism"===i||"templates"===i||"pages"===i)k(j.slice(0,1),g.uiOptions.showCode),a.Render.itemSelector(i);else{k(j);var m=b.querySelector(".ssg-cmd-section #ssg-items");m&&m.remove()}g.currentFilter.type=filterType.category,g.currentFilter.filter=i,a.Session.saveCurrentState(g)}function q(a){if(void 0===a)throw"Event not fired";a.preventDefault();var c=a.srcElement,g=d.btnPrefix+d.btnIsolate,k=b.getElementById(g).classList.contains("active"),l=f(c.id).toLowerCase(),m=!0;switch(c.classList.contains("active")&&(m=!1),l){case"isolate":i(!1),j(!1),e("#"+d.additionalTools.container+" ."+d.btnPrefix),c.classList.toggle("active"),h(m);break;case"code":k===!0&&(e("#"+d.additionalTools.container+" ."+d.btnPrefix),h(!1)),c.classList.toggle("active"),h(!1),j(m);break;case"annotation":k===!0&&(e("#"+d.additionalTools.container+" ."+d.btnPrefix),h(!1)),c.classList.toggle("active"),i(m)}}function r(c){c.preventDefault();var d=c.srcElement,e="ssg-patterns",f=b.getElementById(e),g=window.innerWidth;d.classList.contains("active")?(d.classList.remove("active"),a.UiUtils.discoMode()):(d.classList.add("active"),f.style.width=g.toString(),a.UiUtils.discoMode())}var d=a.UiElements;c.navigateItems=g,c.isolatePatterns=h,c.showAnnotation=i,c.showCode=j,c.showCurrentSelection=k,c.showToc=l,c.filterTocItem=n,c.resetCode=o,c.filterSections=p,c.additionalTools=q,c.enableDisco=r}(g=a.Events||(a.Events={}));var h;!function(c){function d(){var c,d=window.innerWidth,e=b.getElementById(a.UiElements.viewport.width),f="ssg-patterns",g=b.getElementById(f),h="ssg-patterns-inner",i=b.getElementById(h),j=b.getElementById("ssg-btn-disco");if(void 0!==g&&g.classList.contains("animate")===!1&&g.classList.add("animate"),void 0!==i&&i.classList.contains("animate")===!1&&i.classList.add("animate"),void 0!==j&&j.classList.contains("active")){do c=Math.floor(Math.random()*d+1);while(c<320);void 0!==g&&(void 0!==e&&(e.value=c.toString()),g.style.width=c.toString(),g.style.minWidth="0px"),window.setTimeout(function(){a.UiUtils.discoMode()},1e3)}else g.style.width="100%",setTimeout(function(){g.removeAttribute("style"),i.removeAttribute("style")},1e3)}function e(a,c){var f,g,d=c.charAt(0),e="classList"in b.documentElement;for("["===d&&(c=c.substr(1,c.length-2),f=c.split("="),f.length>1&&(g=!0,f[1]=f[1].replace(/"/g,"").replace(/'/g,"")));a&&a!==b&&1===a.nodeType;a=a.parentNode){if("."===d)if(e){if(a.classList.contains(c.substr(1)))return a}else if(new RegExp("(^|\\s)"+c.substr(1)+"(\\s|$)").test(a.className))return a;if("#"===d&&a.id===c.substr(1))return a;if("["===d&&a.hasAttribute(f[0])){if(!g)return a;if(a.getAttribute(f[0])===f[1])return a}if(a.tagName.toLowerCase()===c)return a}return null}c.discoMode=d,c.getClosest=e}(h=a.UiUtils||(a.UiUtils={}))}(SsgUI||(SsgUI={})),SsgUI.Render.renderUI();