interface IframeLoadedParams {
    self: TabMenu,
    $iframe: JQuery<HTMLIFrameElement>;
    $target: JQuery,
    $icon: JQuery,
    $title: JQuery,
    $closeBtn: JQuery,
    url: string,
    icon: string,
}

interface TabMenuOptions {
    $tabWrap: JQuery;
    $iframeWrap: JQuery;
    iframeLoadedCallback?: Function[];
}

export default class TabMenu {
    public pushState = true;
    private index: number = 0;
    private iframeList: { [key: string]: JQuery<HTMLIFrameElement> } = {};
    private tabWrap: JQuery;
    private iframeWrap: JQuery;
    private target: JQuery;

    // iframe onload callback list
    private iframeLoadedCallback: Function[] = [
        (options: IframeLoadedParams) => {
            const title = options.$iframe.contents().find('head > title').text();
            document.title = title;
            options.$target.attr('title', title);
            options.$title.text(title);
        },
        (options: IframeLoadedParams) => {
            options.$icon.attr('class', options.icon || 'fa fa-circle-o');
        },
        (options: IframeLoadedParams) => {
            options.self.pushState && window.history.pushState({
                id: '#' + options.$iframe.parent().attr('id'),
            }, '', options.$iframe.get(0).contentWindow.location.href);
            options.self.pushState = true;
        }
    ];

    constructor(options: TabMenuOptions) {
        this.tabWrap = options.$tabWrap;
        this.iframeWrap = options.$iframeWrap;
        this.iframeLoadedCallback = this.iframeLoadedCallback.concat(options.iframeLoadedCallback || []);

        this.registerGlobalFunc();
        this.init();
    }

    registerGlobalFunc(): void {
        const self = this;

        if (window.self !== window.top) {
            window.top.location.href = window.self.location.href;
        }

        // @ts-ignore
        window.switchTab = function (url: string, icon: string = 'fa fa-circle-o'): void {
            self.switchTab(url, icon);
        };

        // @ts-ignore
        window.iframeRunFunction = function (url: string, func: any): void {
            try {
                // @ts-ignore
                self.getIframe(url).get(0).contentWindow.runFunction(func);
            } catch (e) {
                console.warn(e);
            }
        };
    }

    getIframe(href: string): JQuery<HTMLIFrameElement> | null {
        for (let k in this.iframeList) {
            let iframe: JQuery<HTMLIFrameElement> = this.iframeList[k];
            let insLocation = iframe.get(0).contentWindow.location;
            if (href === insLocation.pathname + insLocation.search) {
                return iframe;
            }
        }

        return null;
    }

    getTarget(id: string) {
        return this.tabWrap.find('a[data-toggle="tab"][href="#' + id + '"]');
    }

    switchTab(url: string, icon: string = 'fa fa-circle-o', iframeWrapId: string = null) {
        let iframe = this.getIframe(url);

        if (!iframe) {
            if (iframeWrapId) {
                iframe = $(iframeWrapId + ' iframe');
            }
            if (iframe) {
                this.pushState = false;
                iframe.attr('src', url);
            } else {
                iframe = this.makeTab(url, icon);
            }
        }

        this.getTarget(iframe.parent().attr('id')).trigger('click');
    }

    makeTab(url: string, icon: string): JQuery<HTMLIFrameElement> {
        const self = this,
            id = 'SI' + self.index++,
            $icon = $('<i/>', {
                class: 'fa fa-spinner fa-spin',
            }),
            $title = $('<span/>'),
            $target = $('<a/>', {
                href: '#' + id,
                'data-toggle': 'tab'
            }),
            $closeBtn = $('<i/>', {
                class: 'fa fa-close'
            }),
            $targetWrap = $('<li/>', {
                class: 'active',
            }),
            $iframe: JQuery<HTMLIFrameElement> = $('<iframe/>', {
                src: url,
            }),
            $iframeWrap = $('<div/>', {
                id: id,
                class: 'tab-pane',
            });

        self.iframeList[id] = $iframe;

        $closeBtn.on('click', function (e) {
            e.stopPropagation();
            delete self.iframeList[id];

            if ($targetWrap.hasClass('active')) {
                const $prev = $targetWrap.prev();
                if ($prev.length > 0) {
                    $prev.find('a').trigger('click');
                } else {
                    const $next = $targetWrap.next();
                    if (!$next.hasClass('dropdown')) {
                        $next.find('a').trigger('click');
                    } else {
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
            let title: string = $title.text(),
                url: string = $iframe.get(0).contentWindow.location.href;

            if (url === 'about:blank') {
                url = $iframe.attr('src');
            }

            const isActive = $target.parent().hasClass('active');
            if (isActive) {
                $target.parent().removeClass('active');
            } else {
                document.title = title;
                if (self.pushState) {
                    window.history.pushState({
                        id: $target.attr('href'),
                    }, '', url);
                }
                self.pushState = true;
            }
        });

        $target.append($icon).append($title).append($closeBtn).appendTo($targetWrap);
        self.tabWrap.find('li.dropdown').before($targetWrap);

        $iframeWrap.append($iframe).appendTo(self.iframeWrap);

        $iframe.get(0).onload = function () {
            self.iframeLoadedCallback.forEach(func => {
                func.call(this, {self, $iframe, $target, $icon, $title, $closeBtn, url, icon});
            });
        };

        return $iframe;
    }

    init() {
        const self = this;

        self.tabWrap.on('click', 'a.close-other', function () {
            self.target.parent().siblings().find('a > i.fa-close').trigger('click');
        }).on('click', 'a.close-current', function () {
            self.target.find('i.fa-close').trigger('click');
        }).on('click', 'li.dropdown > ul.dropdown-menu > li > a.refresh-iframe', function () {
            self.target.trigger('dblclick');
        });
    }
}
