"use strict";
exports.__esModule = true;
var TabMenu1 = /** @class */ (function () {
    function TabMenu1(opt) {
        this.defaultOptions = {
            wrap: document.getElementsByTagName('body').item(0),
            containerClass: 'nav-tabs-custom nav-tabs-iframe',
            menuWrapClass: 'nav nav-tabs',
            iframeWrapClass: 'tab-content',
            defaultPageUrl: '/site/home'
        };
        this.options = Object.assign(this.defaultOptions, opt);
        console.log(this.options);
        this.init();
        this.run();
    }
    TabMenu1.prototype.init = function () {
        this.container = this._createElement('div');
        this.menuWrap = this._createElement('ul');
        this.iframeWrap = this._createElement('div');
        this.container.setAttribute('class', this.options.containerClass);
        this.menuWrap.setAttribute('class', this.options.menuWrapClass);
        this.iframeWrap.setAttribute('class', this.options.iframeWrapClass);
        this.container.appendChild(this.menuWrap)
            .appendChild(this.iframeWrap)
            .append(this.options.wrap);
    };
    TabMenu1.prototype.run = function () {
        this["switch"](this.options.defaultPageUrl);
    };
    TabMenu1.prototype.find = function (url) {
        this.pool.forEach(function (iframe) {
            var iframeLocation = iframe.contentWindow.location;
            if (iframeLocation.pathname + iframeLocation.search === url) {
                return iframe;
            }
        });
        return null;
    };
    TabMenu1.prototype["switch"] = function (url, icon) {
        var iframe = this.find(url);
        if (!iframe) {
            iframe = this.make(url, icon);
        }
    };
    TabMenu1.prototype.make = function (url, iconClass) {
        var li = this._createElement('li'), target = this._createElement('a'), icon = this._createElement('i'), span = this._createElement('span'), close = this._createElement('i'), ifDiv = this._createElement('div'), iframe = this._createElement('iframe');
        target.appendChild(icon).appendChild(span).appendChild(close).append(li);
        li.append(this.menuWrap);
        ifDiv.appendChild(iframe).append(this.iframeWrap);
        return iframe;
    };
    TabMenu1.prototype._createElement = function (tagName, options) {
        return document.createElement(tagName, options);
    };
    return TabMenu1;
}());
exports["default"] = TabMenu1;
