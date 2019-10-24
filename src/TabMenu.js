"use strict";
exports.__esModule = true;
var TabMenu = /** @class */ (function () {
    function TabMenu(options) {
        this.pushState = true;
        this.index = 0;
        this.iframeList = {};
        // iframe onload callback list
        this.iframeLoadedCallback = [
            function (options) {
                var title = options.$iframe.contents().find('head > title').text();
                document.title = title;
                options.$target.attr('title', title);
                options.$title.text(title);
            },
            function (options) {
                options.$icon.attr('class', options.icon || 'fa fa-circle-o');
            },
            function (options) {
                options.self.pushState && window.history.pushState({
                    id: '#' + options.$iframe.parent().attr('id')
                }, '', options.$iframe.get(0).contentWindow.location.href);
                options.self.pushState = true;
            }
        ];
        this.tabWrap = options.$tabWrap;
        this.iframeWrap = options.$iframeWrap;
        this.iframeLoadedCallback = this.iframeLoadedCallback.concat(options.iframeLoadedCallback || []);
        this.registerGlobalFunc();
        this.init();
    }
    TabMenu.prototype.registerGlobalFunc = function () {
        var self = this;
        if (window.self !== window.top) {
            window.top.location.href = window.self.location.href;
        }
        // @ts-ignore
        window.switchTab = function (url, icon) {
            if (icon === void 0) { icon = 'fa fa-circle-o'; }
            self.switchTab(url, icon);
        };
        // @ts-ignore
        window.iframeRunFunction = function (url, func) {
            try {
                // @ts-ignore
                self.getIframe(url).get(0).contentWindow.runFunction(func);
            }
            catch (e) {
                console.warn(e);
            }
        };
    };
    TabMenu.prototype.getIframe = function (href) {
        for (var k in this.iframeList) {
            var iframe = this.iframeList[k];
            var insLocation = iframe.get(0).contentWindow.location;
            if (href === insLocation.pathname + insLocation.search) {
                return iframe;
            }
        }
        return null;
    };
    TabMenu.prototype.getTarget = function (id) {
        return this.tabWrap.find('a[data-toggle="tab"][href="#' + id + '"]');
    };
    TabMenu.prototype.switchTab = function (url, icon, iframeWrapId) {
        if (icon === void 0) { icon = 'fa fa-circle-o'; }
        if (iframeWrapId === void 0) { iframeWrapId = null; }
        var iframe = this.getIframe(url);
        if (!iframe) {
            if (iframeWrapId) {
                iframe = $(iframeWrapId + ' iframe');
            }
            if (iframe) {
                this.pushState = false;
                iframe.attr('src', url);
            }
            else {
                iframe = this.makeTab(url, icon);
            }
        }
        this.getTarget(iframe.parent().attr('id')).trigger('click');
    };
    TabMenu.prototype.makeTab = function (url, icon) {
        var self = this, id = 'SI' + self.index++, $icon = $('<i/>', {
            "class": 'fa fa-spinner fa-spin'
        }), $title = $('<span/>'), $target = $('<a/>', {
            href: '#' + id,
            'data-toggle': 'tab'
        }), $closeBtn = $('<i/>', {
            "class": 'fa fa-close'
        }), $targetWrap = $('<li/>', {
            "class": 'active'
        }), $iframe = $('<iframe/>', {
            src: url
        }), $iframeWrap = $('<div/>', {
            id: id,
            "class": 'tab-pane'
        });
        self.iframeList[id] = $iframe;
        $closeBtn.on('click', function (e) {
            e.stopPropagation();
            delete self.iframeList[id];
            if ($targetWrap.hasClass('active')) {
                var $prev = $targetWrap.prev();
                if ($prev.length > 0) {
                    $prev.find('a').trigger('click');
                }
                else {
                    var $next = $targetWrap.next();
                    if (!$next.hasClass('dropdown')) {
                        $next.find('a').trigger('click');
                    }
                    else {
                        if (!window.confirm('确定要关闭最后一个标签吗?')) {
                            return false;
                        }
                    }
                }
            }
            $iframeWrap.remove();
            $targetWrap.remove();
        });
        $target.on('dblclick', function () {
            $icon.attr('class', 'fa fa-spinner fa-spin');
            $iframe.get(0).contentWindow.location.reload();
        }).on('click', function () {
            self.target = $target;
            var title = $title.text(), url = $iframe.get(0).contentWindow.location.href;
            if (url === 'about:blank') {
                url = $iframe.attr('src');
            }
            var isActive = $target.parent().hasClass('active');
            if (isActive) {
                $target.parent().removeClass('active');
            }
            else {
                document.title = title;
                if (self.pushState) {
                    window.history.pushState({
                        id: $target.attr('href')
                    }, '', url);
                }
                self.pushState = true;
            }
        });
        $target.append($icon).append($title).append($closeBtn).appendTo($targetWrap);
        self.tabWrap.find('li.dropdown').before($targetWrap);
        $iframeWrap.append($iframe).appendTo(self.iframeWrap);
        $iframe.get(0).onload = function () {
            var _this = this;
            self.iframeLoadedCallback.forEach(function (func) {
                func.call(_this, { self: self, $iframe: $iframe, $target: $target, $icon: $icon, $title: $title, $closeBtn: $closeBtn, url: url, icon: icon });
            });
        };
        return $iframe;
    };
    TabMenu.prototype.init = function () {
        var self = this;
        self.tabWrap.on('click', 'a.close-other', function () {
            self.target.parent().siblings().find('a > i.fa-close').trigger('click');
        }).on('click', 'a.close-current', function () {
            self.target.find('i.fa-close').trigger('click');
        }).on('click', 'li.dropdown > ul.dropdown-menu > li > a.refresh-iframe', function () {
            self.target.trigger('dblclick');
        });
    };
    return TabMenu;
}());
exports["default"] = TabMenu;
