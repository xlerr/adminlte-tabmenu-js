interface TabMenuOptions {
    wrap: Element;
    containerClass: string;
    menuWrapClass: string;
    iframeWrapClass: string;
    defaultPageUrl: string;
}

export default class TabMenu1 {
    defaultOptions: TabMenuOptions = {
        wrap: document.getElementsByTagName('body').item(0),
        containerClass: 'nav-tabs-custom nav-tabs-iframe',
        menuWrapClass: 'nav nav-tabs',
        iframeWrapClass: 'tab-content',
        defaultPageUrl: '/site/home',
    };

    options: TabMenuOptions;

    container: Element;

    menuWrap: Element;

    iframeWrap: Element;

    pool: HTMLIFrameElement[];

    constructor(opt?: TabMenuOptions) {
        this.options = Object.assign(this.defaultOptions, opt);
        console.log(this.options);

        this.init();
        this.run();
    }

    init() {
        this.container = this._createElement('div');
        this.menuWrap = this._createElement('ul');
        this.iframeWrap = this._createElement('div');

        this.container.setAttribute('class', this.options.containerClass);
        this.menuWrap.setAttribute('class', this.options.menuWrapClass);
        this.iframeWrap.setAttribute('class', this.options.iframeWrapClass);

        this.container.appendChild(this.menuWrap)
            .appendChild(this.iframeWrap)
            .append(this.options.wrap);
    }

    run() {
        this.switch(this.options.defaultPageUrl);
    }

    find(url: string): HTMLIFrameElement | null {
        this.pool.forEach((iframe: HTMLIFrameElement) => {
            let iframeLocation = iframe.contentWindow.location;
            if (iframeLocation.pathname + iframeLocation.search === url) {
                return iframe;
            }
        });

        return null;
    }

    switch(url: string, icon?: string): void {
        let iframe = this.find(url);

        if (!iframe) {
            iframe = this.make(url, icon)
        }

    }

    make(url: string, iconClass?: string): HTMLIFrameElement {
        let li = this._createElement('li'),
            target = this._createElement('a'),
            icon = this._createElement('i'),
            span = this._createElement('span'),
            close = this._createElement('i'),
            ifDiv = this._createElement('div'),
            iframe = this._createElement('iframe');

        target.appendChild(icon).appendChild(span).appendChild(close).append(li);
        li.append(this.menuWrap);

        ifDiv.appendChild(iframe).append(this.iframeWrap);

        return iframe;
    }

    _createElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions): HTMLElementTagNameMap[K] {
        return document.createElement(tagName, options);
    }
}