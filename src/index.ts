import TabMenu from './TabMenu';
// @ts-ignore
import {Sortable} from "sortablejs";

const tabWrap: JQuery = $('.nav-tabs-iframe .nav-tabs');
const tabMenu: TabMenu = new TabMenu({
    $tabWrap: tabWrap,
    $iframeWrap: $('.nav-tabs-iframe .tab-content'),
    iframeLoadedCallback: [
        () => {
            $('div.body.loading').remove()
        },
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

// 监听前进/后退事件
window.addEventListener('popstate', (e) => {
    // @ts-ignore
    const location = e.target.location,
        url = location.pathname + location.search;

    if (/\?_iframe_=/.test(url)) {
        window.location.href = url;
    } else {
        let id = null;
        try {
            id = e.state.id;
        } catch (e) {
        }

        tabMenu.pushState = false;
        tabMenu.switchTab(url, 'fa fa-circle-o', id);
    }
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