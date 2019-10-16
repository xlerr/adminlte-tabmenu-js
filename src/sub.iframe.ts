import {Base64} from "js-base64";

if (window.self === window.top) {
    const url = '/?_iframe_=' + Base64.encode(JSON.stringify({
        url: window.parent.location.href,
        icon: 'fa fa-circle-o',
    }));

    window.location.replace(url);
}


// @ts-ignore
window.runFunction = function (func: any): void {
    typeof func === 'function' && func(window, $);
};

$(document).ready(() => {
    // 移除loading层
    $('div.body.loading').remove();

    $('body').on('click', 'a[target=_blank][href]', function () {
        const self: JQuery<HTMLElement> = $(this);

        // 如果有`target_browser`节点,则使用浏览器默认标签页打开
        if (undefined !== self.attr('target_browser')) {
            return;
        }

        const url: string = self.attr('href');

        if (/^#+$/.test(url)) {
            return false;
        }

        if (/^javascript:/.test(url)) {
            console.log('script url: ' + url);
            return false;
        }

        if (url && /^https?/.test(url) && url.indexOf(window.location.host) === -1) {
            return;
        }

        if (/\.(pdf|jpe?g|gif|png|csv)($|\?)/.test(url)) {
            return;
        }

        // @ts-ignore
        window.parent.switchTab(url || window.location.href);
        return false;
    });
});
