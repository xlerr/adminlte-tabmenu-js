"use strict";
exports.__esModule = true;
var TabMenu_1 = require("./TabMenu");
// @ts-ignore
var sortablejs_1 = require("sortablejs");
var tabWrap = $('.nav-tabs-iframe .nav-tabs');
var tabMenu = new TabMenu_1["default"]({
    $tabWrap: tabWrap,
    $iframeWrap: $('.nav-tabs-iframe .tab-content'),
    iframeLoadedCallback: [
        function () {
            $('div.body.loading').remove();
        },
    ]
});
try {
    // @ts-ignore
    var url = _iframe_.url, icon = _iframe_.icon;
    url && tabMenu.switchTab(url, icon);
}
catch (e) {
    console.warn(e);
}
new sortablejs_1.Sortable(tabWrap.get(0), {
    filter: '.dropdown',
    animation: 100
});
// 监听前进/后退事件
window.addEventListener('popstate', function (e) {
    // @ts-ignore
    var location = e.target.location, url = location.pathname + location.search;
    if (/\?_iframe_=/.test(url)) {
        window.location.href = url;
    }
    else {
        var id = null;
        try {
            id = e.state.id;
        }
        catch (e) {
        }
        tabMenu.pushState = false;
        tabMenu.switchTab(url, 'fa fa-circle-o', id);
    }
});
// menu click
$('.sidebar-menu a').on('click', function () {
    var self = $(this), li = self.parent();
    if (li.hasClass('treeview')) {
        return;
    }
    var url = self.attr('href'), icon = self.find('i').attr('class');
    tabMenu.switchTab(url, icon);
    return false;
});
