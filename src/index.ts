import TabMenu from './TabMenu';
// @ts-ignore
import {Sortable} from "sortablejs";

const tabWrap: JQuery = $('.nav-tabs-iframe .nav-tabs'),
    iframeWrap: JQuery = $('.nav-tabs-iframe .tab-content'),
    tabMenu: TabMenu = new TabMenu(tabWrap, iframeWrap, {
        iframeLoadedCallback: [
            function (iframe: JQuery) {
                $('div.body.loading').remove();
            }
        ]
    });

try {
    // @ts-ignore
    let {url, icon} = _iframe_;
    url && tabMenu.switchTab(url, icon);
} catch (e) {
    console.warn(e);
}


new Sortable(tabWrap.get(0), {
    filter: '.dropdown',
    animation: 100,
});

// menu click
$('.sidebar-menu a').on('click', function () {
    const self: JQuery = $(this),
        li: JQuery = self.parent();

    if (li.hasClass('treeview')) {
        return;
    }

    const url: string = self.attr('href'),
        icon: string = self.find('i').attr('class');

    tabMenu.switchTab(url, icon);

    return false;
});