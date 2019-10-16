!function (t) {
    var e = {};

    function n(o) {
        if (e[o]) return e[o].exports;
        var i = e[o] = {i: o, l: !1, exports: {}};
        return t[o].call(i.exports, i, i.exports, n), i.l = !0, i.exports
    }

    n.m = t, n.c = e, n.d = function (t, e, o) {
        n.o(t, e) || Object.defineProperty(t, e, {enumerable: !0, get: o})
    }, n.r = function (t) {
        "undefined" !=
        typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(t, "__esModule", {value: !0})
    }, n.t = function (t, e) {
        if (1 & e && (t = n(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var o = Object.create(null);
        if (n.r(o), Object.defineProperty(o, "default", {enumerable: !0, value: t}), 2 &
        e &&
        "string" !=
        typeof t) for (var i in t) n.d(o, i, function (e) {
            return t[e]
        }.bind(null, i));
        return o
    }, n.n = function (t) {
        var e = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return n.d(e, "a", e), e
    }, n.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, n.p = "", n(n.s = 3)
}({
    3: function (t, e, n) {
        "use strict";
        n.r(e);
        var o = function () {
            function t(t, e, n) {
                this.index = 0, this.iframeList = {}, this.iframeLoadedCallback = [
                    function (t, e, n, o, i, r, a) {
                        var l = t.contents().find("head > title").text(), s = t.get(0).contentWindow.location.href;
                        document.title = l, window.history.pushState("", "", s), e.attr("title", l), o.text(l), n.attr("class", a ||
                            "fa fa-circle-o")
                    }
                ], this.tabWrap = t, this.iframeWrap = e, this.iframeLoadedCallback = this.iframeLoadedCallback.concat(n.iframeLoadedCallback ||
                    []), this.registerGlobalFunc(), this.init()
            }

            return t.prototype.registerGlobalFunc = function () {
                var t = this;
                window.self !==
                window.top &&
                (window.top.location.href = window.self.location.href), window.switchTab = function (e, n) {
                    void 0 === n && (n = "fa fa-circle-o"), t.switchTab(e, n)
                }, window.iframeRunFunction = function (e, n) {
                    try {
                        t.getIframe(e).get(0).contentWindow.runFunction(n)
                    } catch (t) {
                        console.warn(t)
                    }
                }
            }, t.prototype.getIframe = function (t) {
                for (var e in this.iframeList) {
                    var n = this.iframeList[e], o = n.get(0).contentWindow.location;
                    if (t === o.pathname + o.search) return n
                }
                return null
            }, t.prototype.getTarget = function (t) {
                return this.tabWrap.find('a[data-toggle="tab"][href="#' + t + '"]')
            }, t.prototype.switchTab = function (t, e) {
                void 0 === e && (e = "fa fa-circle-o");
                var n = this.getIframe(t);
                n || (n = this.makeTab(t, e)), this.getTarget(n.parent().attr("id")).trigger("click")
            }, t.prototype.makeTab = function (t, e) {
                var n = this, o = "SI" + n.index++, i = $("<i/>", {class: "fa fa-spinner fa-spin"}), r = $("<span/>"),
                    a = $("<a/>", {href: "#" + o, "data-toggle": "tab"}), l = $("<i/>", {class: "fa fa-close"}),
                    s = $("<li/>"), c = $("<iframe/>", {src: t}), u = $("<div/>", {id: o, class: "tab-pane"});
                return n.iframeList[o] = c, l.on("click", (function (t) {
                    if (t.stopPropagation(), delete n.iframeList[o], s.hasClass("active")) {
                        var e = s.prev();
                        if (e.length > 0) e.find("a").trigger("click"); else {
                            var i = s.next();
                            if (i.hasClass("dropdown")) {
                                if (!window.confirm("确定要关闭最后一个标签吗?")) return !1
                            } else i.find("a").trigger("click")
                        }
                    }
                    u.remove(), s.remove()
                })), a.on("dblclick", (function () {
                    i.attr("class", "fa fa-spinner fa-spin"), c.get(0).contentWindow.location.reload()
                })).on("click", (function () {
                    n.target = a;
                    var t = r.text(), e = c.get(0).contentWindow.location.href;
                    "about:blank" === e && (e = c.attr("src")), document.title = t, window.history.pushState("", "", e)
                })), a.append(i).append(r).append(l).appendTo(s), n.tabWrap.find("li.dropdown").before(s), u.append(c).appendTo(n.iframeWrap), c.get(0).onload = function () {
                    var o = this;
                    n.iframeLoadedCallback.forEach((function (n) {
                        n.call(o, c, a, i, r, l, t, e)
                    }))
                }, c
            }, t.prototype.init = function () {
                var t = this;
                t.tabWrap.on("click", "a.close-other", (function () {
                    t.target.parent().siblings().find("a > i.fa-close").trigger("click")
                })).on("click", "a.close-current", (function () {
                    t.target.find("i.fa-close").trigger("click")
                })).on("click", "li.dropdown > ul.dropdown-menu > li > a.refresh-iframe", (function () {
                    t.target.trigger("dblclick")
                }))
            }, t
        }();

        /**!
         * Sortable 1.10.1
         * @author    RubaXa   <trash@rubaxa.org>
         * @author    owenm    <owen23355@gmail.com>
         * @license MIT
         */
        function i(t) {
            return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t &&
                "function" ==
                typeof Symbol &&
                t.constructor ===
                Symbol &&
                t !==
                Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function r(t, e, n) {
            return e in t ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = n, t
        }

        function a() {
            return (a = Object.assign || function (t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e];
                    for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o])
                }
                return t
            }).apply(this, arguments)
        }

        function l(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {}, o = Object.keys(n);
                "function" ==
                typeof Object.getOwnPropertySymbols &&
                (o = o.concat(Object.getOwnPropertySymbols(n).filter((function (t) {
                    return Object.getOwnPropertyDescriptor(n, t).enumerable
                })))), o.forEach((function (e) {
                    r(t, e, n[e])
                }))
            }
            return t
        }

        function s(t, e) {
            if (null == t) return {};
            var n, o, i = function (t, e) {
                if (null == t) return {};
                var n, o, i = {}, r = Object.keys(t);
                for (o = 0; o < r.length; o++) n = r[o], e.indexOf(n) >= 0 || (i[n] = t[n]);
                return i
            }(t, e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(t);
                for (o = 0; o < r.length; o++) n = r[o], e.indexOf(n) >=
                0 ||
                Object.prototype.propertyIsEnumerable.call(t, n) &&
                (i[n] = t[n])
            }
            return i
        }

        function c(t) {
            if ("undefined" != typeof window && window.navigator) return !!navigator.userAgent.match(t)
        }

        var u = c(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), d = c(/Edge/i), h = c(/firefox/i),
            f = c(/safari/i) && !c(/chrome/i) && !c(/android/i), p = c(/iP(ad|od|hone)/i),
            g = c(/chrome/i) && c(/android/i), v = {capture: !1, passive: !1};

        function m(t, e, n) {
            t.addEventListener(e, n, !u && v)
        }

        function b(t, e, n) {
            t.removeEventListener(e, n, !u && v)
        }

        function w(t, e) {
            if (e) {
                if (">" === e[0] && (e = e.substring(1)), t) try {
                    if (t.matches) return t.matches(e);
                    if (t.msMatchesSelector) return t.msMatchesSelector(e);
                    if (t.webkitMatchesSelector) return t.webkitMatchesSelector(e)
                } catch (t) {
                    return !1
                }
                return !1
            }
        }

        function y(t) {
            return t.host && t !== document && t.host.nodeType ? t.host : t.parentNode
        }

        function E(t, e, n, o) {
            if (t) {
                n = n || document;
                do {
                    if (null != e && (">" === e[0] ? t.parentNode === n && w(t, e) : w(t, e)) || o && t === n) return t;
                    if (t === n) break
                } while (t = y(t))
            }
            return null
        }

        var _, S = /\s+/g;

        function D(t, e, n) {
            if (t && e) if (t.classList) t.classList[n ? "add" : "remove"](e); else {
                var o = (" " + t.className + " ").replace(S, " ").replace(" " + e + " ", " ");
                t.className = (o + (n ? " " + e : "")).replace(S, " ")
            }
        }

        function T(t, e, n) {
            var o = t && t.style;
            if (o) {
                if (void 0 === n) return document.defaultView &&
                document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(t, "") : t.currentStyle &&
                    (n = t.currentStyle), void 0 === e ? n : n[e];
                e in o || -1 !== e.indexOf("webkit") || (e = "-webkit-" + e), o[e] = n +
                    ("string" == typeof n ? "" : "px")
            }
        }

        function C(t, e) {
            var n = "";
            if ("string" == typeof t) n = t; else do {
                var o = T(t, "transform");
                o && "none" !== o && (n = o + " " + n)
            } while (!e && (t = t.parentNode));
            var i = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix;
            return i && new i(n)
        }

        function x(t, e, n) {
            if (t) {
                var o = t.getElementsByTagName(e), i = 0, r = o.length;
                if (n) for (; i < r; i++) n(o[i], i);
                return o
            }
            return []
        }

        function O() {
            return u ? document.documentElement : document.scrollingElement
        }

        function I(t, e, n, o, i) {
            if (t.getBoundingClientRect || t === window) {
                var r, a, l, s, c, d, h;
                if (t !==
                window &&
                t !==
                O() ? (a = (r = t.getBoundingClientRect()).top, l = r.left, s = r.bottom, c = r.right, d = r.height, h = r.width) : (a = 0, l = 0, s = window.innerHeight, c = window.innerWidth, d = window.innerHeight, h = window.innerWidth), (e ||
                    n) && t !== window && (i = i || t.parentNode, !u)) do {
                    if (i &&
                        i.getBoundingClientRect &&
                        ("none" !== T(i, "transform") || n && "static" !== T(i, "position"))) {
                        var f = i.getBoundingClientRect();
                        a -= f.top + parseInt(T(i, "border-top-width")), l -= f.left +
                            parseInt(T(i, "border-left-width")), s = a + r.height, c = l + r.width;
                        break
                    }
                } while (i = i.parentNode);
                if (o && t !== window) {
                    var p = C(i || t), g = p && p.a, v = p && p.d;
                    p && (s = (a /= v) + (d /= v), c = (l /= g) + (h /= g))
                }
                return {top: a, left: l, bottom: s, right: c, width: h, height: d}
            }
        }

        function M(t, e, n) {
            for (var o = X(t, !0), i = I(t)[e]; o;) {
                var r = I(o)[n];
                if (!("top" === n || "left" === n ? i >= r : i <= r)) return o;
                if (o === O()) break;
                o = X(o, !1)
            }
            return !1
        }

        function k(t, e, n) {
            for (var o = 0, i = 0, r = t.children; i < r.length;) {
                if ("none" !==
                    r[i].style.display &&
                    r[i] !==
                    Lt.ghost &&
                    r[i] !==
                    Lt.dragged &&
                    E(r[i], n.draggable, t, !1)) {
                    if (o === e) return r[i];
                    o++
                }
                i++
            }
            return null
        }

        function P(t, e) {
            for (var n = t.lastElementChild; n &&
            (n === Lt.ghost || "none" === T(n, "display") || e && !w(n, e));) n = n.previousElementSibling;
            return n || null
        }

        function N(t, e) {
            var n = 0;
            if (!t || !t.parentNode) return -1;
            for (; t = t.previousElementSibling;) "TEMPLATE" ===
            t.nodeName.toUpperCase() ||
            t ===
            Lt.clone ||
            e &&
            !w(t, e) ||
            n++;
            return n
        }

        function A(t) {
            var e = 0, n = 0, o = O();
            if (t) do {
                var i = C(t), r = i.a, a = i.d;
                e += t.scrollLeft * r, n += t.scrollTop * a
            } while (t !== o && (t = t.parentNode));
            return [e, n]
        }

        function X(t, e) {
            if (!t || !t.getBoundingClientRect) return O();
            var n = t, o = !1;
            do {
                if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
                    var i = T(n);
                    if (n.clientWidth <
                        n.scrollWidth &&
                        ("auto" == i.overflowX || "scroll" == i.overflowX) ||
                        n.clientHeight <
                        n.scrollHeight &&
                        ("auto" == i.overflowY || "scroll" == i.overflowY)) {
                        if (!n.getBoundingClientRect || n === document.body) return O();
                        if (o || e) return n;
                        o = !0
                    }
                }
            } while (n = n.parentNode);
            return O()
        }

        function R(t, e) {
            return Math.round(t.top) ===
                Math.round(e.top) &&
                Math.round(t.left) ===
                Math.round(e.left) &&
                Math.round(t.height) ===
                Math.round(e.height) &&
                Math.round(t.width) ===
                Math.round(e.width)
        }

        function Y(t, e) {
            return function () {
                if (!_) {
                    var n = arguments, o = this;
                    1 === n.length ? t.call(o, n[0]) : t.apply(o, n), _ = setTimeout((function () {
                        _ = void 0
                    }), e)
                }
            }
        }

        function F(t, e, n) {
            t.scrollLeft += e, t.scrollTop += n
        }

        function L(t) {
            var e = window.Polymer, n = window.jQuery || window.Zepto;
            return e && e.dom ? e.dom(t).cloneNode(!0) : n ? n(t).clone(!0)[0] : t.cloneNode(!0)
        }

        var W = "Sortable" + (new Date).getTime();

        function B() {
            var t, e = [];
            return {
                captureAnimationState: function () {
                    (e = [], this.options.animation) && [].slice.call(this.el.children).forEach((function (t) {
                        if ("none" !== T(t, "display") && t !== Lt.ghost) {
                            e.push({target: t, rect: I(t)});
                            var n = l({}, e[e.length - 1].rect);
                            if (t.thisAnimationDuration) {
                                var o = C(t, !0);
                                o && (n.top -= o.f, n.left -= o.e)
                            }
                            t.fromRect = n
                        }
                    }))
                }, addAnimationState: function (t) {
                    e.push(t)
                }, removeAnimationState: function (t) {
                    e.splice(function (t, e) {
                        for (var n in t) if (t.hasOwnProperty(n)) for (var o in e) if (e.hasOwnProperty(o) &&
                            e[o] ===
                            t[n][o]) return Number(n);
                        return -1
                    }(e, {target: t}), 1)
                }, animateAll: function (n) {
                    var o = this;
                    if (!this.options.animation) return clearTimeout(t), void ("function" == typeof n && n());
                    var i = !1, r = 0;
                    e.forEach((function (t) {
                        var e = 0, n = t.target, a = n.fromRect, l = I(n), s = n.prevFromRect, c = n.prevToRect,
                            u = t.rect, d = C(n, !0);
                        d && (l.top -= d.f, l.left -= d.e), n.toRect = l, n.thisAnimationDuration &&
                        R(s, l) &&
                        !R(a, l) &&
                        (u.top - l.top) /
                        (u.left - l.left) ==
                        (a.top - l.top) /
                        (a.left - l.left) &&
                        (e = function (t, e, n, o) {
                            return Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)) /
                                Math.sqrt(Math.pow(e.top - n.top, 2) + Math.pow(e.left - n.left, 2)) *
                                o.animation
                        }(u, s, c, o.options)), R(l, a) ||
                        (n.prevFromRect = a, n.prevToRect = l, e ||
                        (e = o.options.animation), o.animate(n, u, l, e)), e &&
                        (i = !0, r = Math.max(r, e), clearTimeout(n.animationResetTimer), n.animationResetTimer = setTimeout((function () {
                            n.animationTime = 0, n.prevFromRect = null, n.fromRect = null, n.prevToRect = null, n.thisAnimationDuration = null
                        }), e), n.thisAnimationDuration = e)
                    })), clearTimeout(t), i ? t = setTimeout((function () {
                        "function" == typeof n && n()
                    }), r) : "function" == typeof n && n(), e = []
                }, animate: function (t, e, n, o) {
                    if (o) {
                        T(t, "transition", ""), T(t, "transform", "");
                        var i = C(this.el), r = i && i.a, a = i && i.d, l = (e.left - n.left) / (r || 1),
                            s = (e.top - n.top) / (a || 1);
                        t.animatingX = !!l, t.animatingY = !!s, T(t, "transform", "translate3d(" +
                            l +
                            "px," +
                            s +
                            "px,0)"), function (t) {
                            t.offsetWidth
                        }(t), T(t, "transition", "transform " +
                            o +
                            "ms" +
                            (this.options.easing ? " " +
                                this.options.easing : "")), T(t, "transform", "translate3d(0,0,0)"), "number" ==
                        typeof t.animated &&
                        clearTimeout(t.animated), t.animated = setTimeout((function () {
                            T(t, "transition", ""), T(t, "transform", ""), t.animated = !1, t.animatingX = !1, t.animatingY = !1
                        }), o)
                    }
                }
            }
        }

        var j = [], H = {initializeByDefault: !0}, z = {
            mount: function (t) {
                for (var e in H) !H.hasOwnProperty(e) || e in t || (t[e] = H[e]);
                j.push(t)
            }, pluginEvent: function (t, e, n) {
                var o = this;
                this.eventCanceled = !1, n.cancel = function () {
                    o.eventCanceled = !0
                };
                var i = t + "Global";
                j.forEach((function (o) {
                    e[o.pluginName] &&
                    (e[o.pluginName][i] && e[o.pluginName][i](l({sortable: e}, n)), e.options[o.pluginName] &&
                    e[o.pluginName][t] &&
                    e[o.pluginName][t](l({sortable: e}, n)))
                }))
            }, initializePlugins: function (t, e, n, o) {
                for (var i in j.forEach((function (o) {
                    var i = o.pluginName;
                    if (t.options[i] || o.initializeByDefault) {
                        var r = new o(t, e, t.options);
                        r.sortable = t, r.options = t.options, t[i] = r, a(n, r.defaults)
                    }
                })), t.options) if (t.options.hasOwnProperty(i)) {
                    var r = this.modifyOption(t, i, t.options[i]);
                    void 0 !== r && (t.options[i] = r)
                }
            }, getEventProperties: function (t, e) {
                var n = {};
                return j.forEach((function (o) {
                    "function" == typeof o.eventProperties && a(n, o.eventProperties.call(e[o.pluginName], t))
                })), n
            }, modifyOption: function (t, e, n) {
                var o;
                return j.forEach((function (i) {
                    t[i.pluginName] &&
                    i.optionListeners &&
                    "function" ==
                    typeof i.optionListeners[e] &&
                    (o = i.optionListeners[e].call(t[i.pluginName], n))
                })), o
            }
        };

        function G(t) {
            var e = t.sortable, n = t.rootEl, o = t.name, i = t.targetEl, r = t.cloneEl, a = t.toEl, s = t.fromEl,
                c = t.oldIndex, h = t.newIndex, f = t.oldDraggableIndex, p = t.newDraggableIndex, g = t.originalEvent,
                v = t.putSortable, m = t.extraEventProperties;
            if (e = e || n && n[W]) {
                var b, w = e.options, y = "on" + o.charAt(0).toUpperCase() + o.substr(1);
                !window.CustomEvent ||
                u ||
                d ? (b = document.createEvent("Event")).initEvent(o, !0, !0) : b = new CustomEvent(o, {
                    bubbles: !0,
                    cancelable: !0
                }), b.to = a || n, b.from = s || n, b.item = i ||
                    n, b.clone = r, b.oldIndex = c, b.newIndex = h, b.oldDraggableIndex = f, b.newDraggableIndex = p, b.originalEvent = g, b.pullMode = v ? v.lastPutMode : void 0;
                var E = l({}, m, z.getEventProperties(o, e));
                for (var _ in E) b[_] = E[_];
                n && n.dispatchEvent(b), w[y] && w[y].call(e, b)
            }
        }

        var U = function (t, e) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, o = n.evt, i = s(n, ["evt"]);
            z.pluginEvent.bind(Lt)(t, e, l({
                dragEl: q,
                parentEl: Z,
                ghostEl: K,
                rootEl: Q,
                nextEl: J,
                lastDownEl: tt,
                cloneEl: et,
                cloneHidden: nt,
                dragStarted: gt,
                putSortable: st,
                activeSortable: Lt.active,
                originalEvent: o,
                oldIndex: ot,
                oldDraggableIndex: rt,
                newIndex: it,
                newDraggableIndex: at,
                hideGhostForTarget: Xt,
                unhideGhostForTarget: Rt,
                cloneNowHidden: function () {
                    nt = !0
                },
                cloneNowShown: function () {
                    nt = !1
                },
                dispatchSortableEvent: function (t) {
                    V({sortable: e, name: t, originalEvent: o})
                }
            }, i))
        };

        function V(t) {
            G(l({
                putSortable: st,
                cloneEl: et,
                targetEl: q,
                rootEl: Q,
                oldIndex: ot,
                oldDraggableIndex: rt,
                newIndex: it,
                newDraggableIndex: at
            }, t))
        }

        var q, Z, K, Q, J, tt, et, nt, ot, it, rt, at, lt, st, ct, ut, dt, ht, ft, pt, gt, vt, mt, bt, wt, yt = !1,
            Et = !1, _t = [], St = !1, Dt = !1, Tt = [], Ct = !1, xt = [], Ot = "undefined" != typeof document, It = p,
            Mt = d || u ? "cssFloat" : "float", kt = Ot && !g && !p && "draggable" in document.createElement("div"),
            Pt = function () {
                if (Ot) {
                    if (u) return !1;
                    var t = document.createElement("x");
                    return t.style.cssText = "pointer-events:auto", "auto" === t.style.pointerEvents
                }
            }(), Nt = function (t, e) {
                var n = T(t), o = parseInt(n.width) -
                    parseInt(n.paddingLeft) -
                    parseInt(n.paddingRight) -
                    parseInt(n.borderLeftWidth) -
                    parseInt(n.borderRightWidth), i = k(t, 0, e), r = k(t, 1, e), a = i && T(i), l = r && T(r),
                    s = a && parseInt(a.marginLeft) + parseInt(a.marginRight) + I(i).width,
                    c = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + I(r).width;
                if ("flex" === n.display) return "column" ===
                n.flexDirection ||
                "column-reverse" ===
                n.flexDirection ? "vertical" : "horizontal";
                if ("grid" === n.display) return n.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
                if (i && a.float && "none" !== a.float) {
                    var u = "left" === a.float ? "left" : "right";
                    return !r || "both" !== l.clear && l.clear !== u ? "horizontal" : "vertical"
                }
                return i &&
                ("block" ===
                    a.display ||
                    "flex" ===
                    a.display ||
                    "table" ===
                    a.display ||
                    "grid" ===
                    a.display ||
                    s >=
                    o &&
                    "none" ===
                    n[Mt] ||
                    r &&
                    "none" ===
                    n[Mt] &&
                    s +
                    c >
                    o) ? "vertical" : "horizontal"
            }, At = function (t) {
                function e(t, n) {
                    return function (o, i, r, a) {
                        var l = o.options.group.name &&
                            i.options.group.name &&
                            o.options.group.name ===
                            i.options.group.name;
                        if (null == t && (n || l)) return !0;
                        if (null == t || !1 === t) return !1;
                        if (n && "clone" === t) return t;
                        if ("function" == typeof t) return e(t(o, i, r, a), n)(o, i, r, a);
                        var s = (n ? o : i).options.group.name;
                        return !0 === t || "string" == typeof t && t === s || t.join && t.indexOf(s) > -1
                    }
                }

                var n = {}, o = t.group;
                o &&
                "object" ==
                i(o) ||
                (o = {name: o}), n.name = o.name, n.checkPull = e(o.pull, !0), n.checkPut = e(o.put), n.revertClone = o.revertClone, t.group = n
            }, Xt = function () {
                !Pt && K && T(K, "display", "none")
            }, Rt = function () {
                !Pt && K && T(K, "display", "")
            };
        Ot && document.addEventListener("click", (function (t) {
            if (Et) return t.preventDefault(), t.stopPropagation && t.stopPropagation(), t.stopImmediatePropagation &&
            t.stopImmediatePropagation(), Et = !1, !1
        }), !0);
        var Yt = function (t) {
            if (q) {
                t = t.touches ? t.touches[0] : t;
                var e = (i = t.clientX, r = t.clientY, _t.some((function (t) {
                    if (!P(t)) {
                        var e = I(t), n = t[W].options.emptyInsertThreshold, o = i >= e.left - n && i <= e.right + n,
                            l = r >= e.top - n && r <= e.bottom + n;
                        return n && o && l ? a = t : void 0
                    }
                })), a);
                if (e) {
                    var n = {};
                    for (var o in t) t.hasOwnProperty(o) && (n[o] = t[o]);
                    n.target = n.rootEl = e, n.preventDefault = void 0, n.stopPropagation = void 0, e[W]._onDragOver(n)
                }
            }
            var i, r, a
        }, Ft = function (t) {
            q && q.parentNode[W]._isOutsideThisEl(t.target)
        };

        function Lt(t, e) {
            if (!t ||
                !t.nodeType ||
                1 !==
                t.nodeType) throw"Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(t));
            this.el = t, this.options = e = a({}, e), t[W] = this;
            var n = {
                group: null,
                sort: !0,
                disabled: !1,
                store: null,
                handle: null,
                draggable: /^[uo]l$/i.test(t.nodeName) ? ">li" : ">*",
                swapThreshold: 1,
                invertSwap: !1,
                invertedSwapThreshold: null,
                removeCloneOnHide: !0,
                direction: function () {
                    return Nt(t, this.options)
                },
                ghostClass: "sortable-ghost",
                chosenClass: "sortable-chosen",
                dragClass: "sortable-drag",
                ignore: "a, img",
                filter: null,
                preventOnFilter: !0,
                animation: 0,
                easing: null,
                setData: function (t, e) {
                    t.setData("Text", e.textContent)
                },
                dropBubble: !1,
                dragoverBubble: !1,
                dataIdAttr: "data-id",
                delay: 0,
                delayOnTouchOnly: !1,
                touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
                forceFallback: !1,
                fallbackClass: "sortable-fallback",
                fallbackOnBody: !1,
                fallbackTolerance: 0,
                fallbackOffset: {x: 0, y: 0},
                supportPointer: !1 !== Lt.supportPointer && "PointerEvent" in window,
                emptyInsertThreshold: 5
            };
            for (var o in z.initializePlugins(this, t, n), n) !(o in e) && (e[o] = n[o]);
            for (var i in At(e), this) "_" ===
            i.charAt(0) &&
            "function" ==
            typeof this[i] &&
            (this[i] = this[i].bind(this));
            this.nativeDraggable = !e.forceFallback && kt, this.nativeDraggable &&
            (this.options.touchStartThreshold = 1), e.supportPointer ? m(t, "pointerdown", this._onTapStart) : (m(t, "mousedown", this._onTapStart), m(t, "touchstart", this._onTapStart)), this.nativeDraggable &&
            (m(t, "dragover", this), m(t, "dragenter", this)), _t.push(this.el), e.store &&
            e.store.get &&
            this.sort(e.store.get(this) || []), a(this, B())
        }

        function Wt(t, e, n, o, i, r, a, l) {
            var s, c, h = t[W], f = h.options.onMove;
            return !window.CustomEvent ||
            u ||
            d ? (s = document.createEvent("Event")).initEvent("move", !0, !0) : s = new CustomEvent("move", {
                bubbles: !0,
                cancelable: !0
            }), s.to = e, s.from = t, s.dragged = n, s.draggedRect = o, s.related = i || e, s.relatedRect = r ||
                I(e), s.willInsertAfter = l, s.originalEvent = a, t.dispatchEvent(s), f && (c = f.call(h, s, a)), c
        }

        function Bt(t) {
            t.draggable = !1
        }

        function jt() {
            Ct = !1
        }

        function Ht(t) {
            for (var e = t.tagName +
                t.className +
                t.src +
                t.href +
                t.textContent, n = e.length, o = 0; n--;) o += e.charCodeAt(n);
            return o.toString(36)
        }

        function zt(t) {
            return setTimeout(t, 0)
        }

        function $t(t) {
            return clearTimeout(t)
        }

        Lt.prototype = {
            constructor: Lt, _isOutsideThisEl: function (t) {
                this.el.contains(t) || t === this.el || (vt = null)
            }, _getDirection: function (t, e) {
                return "function" ==
                typeof this.options.direction ? this.options.direction.call(this, t, e, q) : this.options.direction
            }, _onTapStart: function (t) {
                if (t.cancelable) {
                    var e = this, n = this.el, o = this.options, i = o.preventOnFilter, r = t.type,
                        a = t.touches && t.touches[0] || t.pointerType && "touch" === t.pointerType && t,
                        l = (a || t).target,
                        s = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || l,
                        c = o.filter;
                    if (function (t) {
                        xt.length = 0;
                        var e = t.getElementsByTagName("input"), n = e.length;
                        for (; n--;) {
                            var o = e[n];
                            o.checked && xt.push(o)
                        }
                    }(n), !q &&
                    !(/mousedown|pointerdown/.test(r) &&
                        0 !==
                        t.button ||
                        o.disabled ||
                        s.isContentEditable ||
                        (l = E(l, o.draggable, n, !1)) &&
                        l.animated ||
                        tt ===
                        l)) {
                        if (ot = N(l), rt = N(l, o.draggable), "function" == typeof c) {
                            if (c.call(this, t, l, this)) return V({
                                sortable: e,
                                rootEl: s,
                                name: "filter",
                                targetEl: l,
                                toEl: n,
                                fromEl: n
                            }), U("filter", e, {evt: t}), void (i && t.cancelable && t.preventDefault())
                        } else if (c && (c = c.split(",").some((function (o) {
                            if (o = E(s, o.trim(), n, !1)) return V({
                                sortable: e,
                                rootEl: o,
                                name: "filter",
                                targetEl: l,
                                fromEl: n,
                                toEl: n
                            }), U("filter", e, {evt: t}), !0
                        })))) return void (i && t.cancelable && t.preventDefault());
                        o.handle && !E(s, o.handle, n, !1) || this._prepareDragStart(t, a, l)
                    }
                }
            }, _prepareDragStart: function (t, e, n) {
                var o, i = this, r = i.el, a = i.options, l = r.ownerDocument;
                if (n && !q && n.parentNode === r) {
                    var s = I(n);
                    if (Q = r, Z = (q = n).parentNode, J = q.nextSibling, tt = n, lt = a.group, Lt.dragged = q, ct = {
                        target: q,
                        clientX: (e || t).clientX,
                        clientY: (e || t).clientY
                    }, ft = ct.clientX - s.left, pt = ct.clientY - s.top, this._lastX = (e ||
                        t).clientX, this._lastY = (e || t).clientY, q.style["will-change"] = "all", o = function () {
                        U("delayEnded", i, {evt: t}), Lt.eventCanceled ? i._onDrop() : (i._disableDelayedDragEvents(), !h &&
                        i.nativeDraggable &&
                        (q.draggable = !0), i._triggerDragStart(t, e), V({
                            sortable: i,
                            name: "choose",
                            originalEvent: t
                        }), D(q, a.chosenClass, !0))
                    }, a.ignore.split(",").forEach((function (t) {
                        x(q, t.trim(), Bt)
                    })), m(l, "dragover", Yt), m(l, "mousemove", Yt), m(l, "touchmove", Yt), m(l, "mouseup", i._onDrop), m(l, "touchend", i._onDrop), m(l, "touchcancel", i._onDrop), h &&
                    this.nativeDraggable &&
                    (this.options.touchStartThreshold = 4, q.draggable = !0), U("delayStart", this, {evt: t}), !a.delay ||
                    a.delayOnTouchOnly &&
                    !e ||
                    this.nativeDraggable &&
                    (d || u)) o(); else {
                        if (Lt.eventCanceled) return void this._onDrop();
                        m(l, "mouseup", i._disableDelayedDrag), m(l, "touchend", i._disableDelayedDrag), m(l, "touchcancel", i._disableDelayedDrag), m(l, "mousemove", i._delayedDragTouchMoveHandler), m(l, "touchmove", i._delayedDragTouchMoveHandler), a.supportPointer &&
                        m(l, "pointermove", i._delayedDragTouchMoveHandler), i._dragStartTimer = setTimeout(o, a.delay)
                    }
                }
            }, _delayedDragTouchMoveHandler: function (t) {
                var e = t.touches ? t.touches[0] : t;
                Math.max(Math.abs(e.clientX - this._lastX), Math.abs(e.clientY - this._lastY)) >=
                Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) &&
                this._disableDelayedDrag()
            }, _disableDelayedDrag: function () {
                q && Bt(q), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents()
            }, _disableDelayedDragEvents: function () {
                var t = this.el.ownerDocument;
                b(t, "mouseup", this._disableDelayedDrag), b(t, "touchend", this._disableDelayedDrag), b(t, "touchcancel", this._disableDelayedDrag), b(t, "mousemove", this._delayedDragTouchMoveHandler), b(t, "touchmove", this._delayedDragTouchMoveHandler), b(t, "pointermove", this._delayedDragTouchMoveHandler)
            }, _triggerDragStart: function (t, e) {
                e = e || "touch" == t.pointerType && t, !this.nativeDraggable ||
                e ? this.options.supportPointer ? m(document, "pointermove", this._onTouchMove) : m(document, e ? "touchmove" : "mousemove", this._onTouchMove) : (m(q, "dragend", this), m(Q, "dragstart", this._onDragStart));
                try {
                    document.selection ? zt((function () {
                        document.selection.empty()
                    })) : window.getSelection().removeAllRanges()
                } catch (t) {
                }
            }, _dragStarted: function (t, e) {
                if (yt = !1, Q && q) {
                    U("dragStarted", this, {evt: e}), this.nativeDraggable && m(document, "dragover", Ft);
                    var n = this.options;
                    !t && D(q, n.dragClass, !1), D(q, n.ghostClass, !0), Lt.active = this, t &&
                    this._appendGhost(), V({sortable: this, name: "start", originalEvent: e})
                } else this._nulling()
            }, _emulateDragOver: function () {
                if (ut) {
                    this._lastX = ut.clientX, this._lastY = ut.clientY, Xt();
                    for (var t = document.elementFromPoint(ut.clientX, ut.clientY), e = t; t &&
                    t.shadowRoot &&
                    (t = t.shadowRoot.elementFromPoint(ut.clientX, ut.clientY)) !==
                    e;) e = t;
                    if (q.parentNode[W]._isOutsideThisEl(t), e) do {
                        if (e[W]) {
                            if (e[W]._onDragOver({clientX: ut.clientX, clientY: ut.clientY, target: t, rootEl: e}) &&
                                !this.options.dragoverBubble) break
                        }
                        t = e
                    } while (e = e.parentNode);
                    Rt()
                }
            }, _onTouchMove: function (t) {
                if (ct) {
                    var e = this.options, n = e.fallbackTolerance, o = e.fallbackOffset,
                        i = t.touches ? t.touches[0] : t, r = K && C(K), a = K && r && r.a, l = K && r && r.d,
                        s = It && wt && A(wt),
                        c = (i.clientX - ct.clientX + o.x) / (a || 1) + (s ? s[0] - Tt[0] : 0) / (a || 1),
                        u = (i.clientY - ct.clientY + o.y) / (l || 1) + (s ? s[1] - Tt[1] : 0) / (l || 1);
                    if (!Lt.active && !yt) {
                        if (n &&
                            Math.max(Math.abs(i.clientX - this._lastX), Math.abs(i.clientY - this._lastY)) <
                            n) return;
                        this._onDragStart(t, !0)
                    }
                    if (K) {
                        r ? (r.e += c - (dt || 0), r.f += u - (ht || 0)) : r = {a: 1, b: 0, c: 0, d: 1, e: c, f: u};
                        var d = "matrix(".concat(r.a, ",").concat(r.b, ",").concat(r.c, ",").concat(r.d, ",").concat(r.e, ",").concat(r.f, ")");
                        T(K, "webkitTransform", d), T(K, "mozTransform", d), T(K, "msTransform", d), T(K, "transform", d), dt = c, ht = u, ut = i
                    }
                    t.cancelable && t.preventDefault()
                }
            }, _appendGhost: function () {
                if (!K) {
                    var t = this.options.fallbackOnBody ? document.body : Q, e = I(q, !0, It, !0, t), n = this.options;
                    if (It) {
                        for (wt = t; "static" ===
                        T(wt, "position") &&
                        "none" ===
                        T(wt, "transform") &&
                        wt !==
                        document;) wt = wt.parentNode;
                        wt !== document.body && wt !== document.documentElement ? (wt ===
                        document &&
                        (wt = O()), e.top += wt.scrollTop, e.left += wt.scrollLeft) : wt = O(), Tt = A(wt)
                    }
                    D(K = q.cloneNode(!0), n.ghostClass, !1), D(K, n.fallbackClass, !0), D(K, n.dragClass, !0), T(K, "transition", ""), T(K, "transform", ""), T(K, "box-sizing", "border-box"), T(K, "margin", 0), T(K, "top", e.top), T(K, "left", e.left), T(K, "width", e.width), T(K, "height", e.height), T(K, "opacity", "0.8"), T(K, "position", It ? "absolute" : "fixed"), T(K, "zIndex", "100000"), T(K, "pointerEvents", "none"), Lt.ghost = K, t.appendChild(K), T(K, "transform-origin", ft /
                        parseInt(K.style.width) *
                        100 +
                        "% " +
                        pt /
                        parseInt(K.style.height) *
                        100 +
                        "%")
                }
            }, _onDragStart: function (t, e) {
                var n = this, o = t.dataTransfer, i = n.options;
                U("dragStart", this, {evt: t}), Lt.eventCanceled ? this._onDrop() : (U("setupClone", this), Lt.eventCanceled ||
                ((et = L(q)).draggable = !1, et.style["will-change"] = "", this._hideClone(), D(et, this.options.chosenClass, !1), Lt.clone = et), n.cloneId = zt((function () {
                    U("clone", n), Lt.eventCanceled ||
                    (n.options.removeCloneOnHide || Q.insertBefore(et, q), n._hideClone(), V({
                        sortable: n,
                        name: "clone"
                    }))
                })), !e &&
                D(q, i.dragClass, !0), e ? (Et = !0, n._loopId = setInterval(n._emulateDragOver, 50)) : (b(document, "mouseup", n._onDrop), b(document, "touchend", n._onDrop), b(document, "touchcancel", n._onDrop), o &&
                (o.effectAllowed = "move", i.setData &&
                i.setData.call(n, o, q)), m(document, "drop", n), T(q, "transform", "translateZ(0)")), yt = !0, n._dragStartId = zt(n._dragStarted.bind(n, e, t)), m(document, "selectstart", n), gt = !0, f &&
                T(document.body, "user-select", "none"))
            }, _onDragOver: function (t) {
                var e, n, o, i, r = this.el, a = t.target, s = this.options, c = s.group, u = Lt.active, d = lt === c,
                    h = s.sort, f = st || u, p = this, g = !1;
                if (!Ct) {
                    if (void 0 !==
                    t.preventDefault &&
                    t.cancelable &&
                    t.preventDefault(), a = E(a, s.draggable, r, !0), R("dragOver"), Lt.eventCanceled) return g;
                    if (q.contains(t.target) ||
                        a.animated &&
                        a.animatingX &&
                        a.animatingY ||
                        p._ignoreWhileAnimating ===
                        a) return L(!1);
                    if (Et = !1, u &&
                    !s.disabled &&
                    (d ? h || (o = !Q.contains(q)) : st ===
                        this ||
                        (this.lastPutMode = lt.checkPull(this, u, q, t)) &&
                        c.checkPut(this, u, q, t))) {
                        if (i = "vertical" ===
                            this._getDirection(t, a), e = I(q), R("dragOverValid"), Lt.eventCanceled) return g;
                        if (o) return Z = Q, Y(), this._hideClone(), R("revert"), Lt.eventCanceled ||
                        (J ? Q.insertBefore(q, J) : Q.appendChild(q)), L(!0);
                        var v = P(r, s.draggable);
                        if (!v || function (t, e, n) {
                            var o = I(P(n.el, n.options.draggable));
                            return e ? t.clientX >
                                o.right +
                                10 ||
                                t.clientX <=
                                o.right &&
                                t.clientY >
                                o.bottom &&
                                t.clientX >=
                                o.left : t.clientX >
                                o.right &&
                                t.clientY >
                                o.top ||
                                t.clientX <=
                                o.right &&
                                t.clientY >
                                o.bottom +
                                10
                        }(t, i, this) && !v.animated) {
                            if (v === q) return L(!1);
                            if (v && r === t.target && (a = v), a && (n = I(a)), !1 !==
                            Wt(Q, r, q, e, a, n, t, !!a)) return Y(), r.appendChild(q), Z = r, B(), L(!0)
                        } else if (a.parentNode === r) {
                            n = I(a);
                            var m, b, w, y = q.parentNode !== r, _ = !function (t, e, n) {
                                    var o = n ? t.left : t.top, i = n ? t.right : t.bottom, r = n ? t.width : t.height,
                                        a = n ? e.left : e.top, l = n ? e.right : e.bottom, s = n ? e.width : e.height;
                                    return o === a || i === l || o + r / 2 === a + s / 2
                                }(q.animated && q.toRect || e, a.animated && a.toRect || n, i), S = i ? "top" : "left",
                                C = M(a, "top", "top") || M(q, "top", "top"), x = C ? C.scrollTop : void 0;
                            if (vt !== a && (b = n[S], St = !1, Dt = !_ && s.invertSwap || y), 0 !==
                            (m = function (t, e, n, o, i, r, a, l) {
                                var s = o ? t.clientY : t.clientX, c = o ? n.height : n.width, u = o ? n.top : n.left,
                                    d = o ? n.bottom : n.right, h = !1;
                                if (!a) if (l && bt < c * i) {
                                    if (!St &&
                                    (1 === mt ? s > u + c * r / 2 : s < d - c * r / 2) &&
                                    (St = !0), St) h = !0; else if (1 === mt ? s < u + bt : s > d - bt) return -mt
                                } else if (s > u + c * (1 - i) / 2 && s < d - c * (1 - i) / 2) return function (t) {
                                    return N(q) < N(t) ? 1 : -1
                                }(e);
                                if ((h = h || a) && (s < u + c * r / 2 || s > d - c * r / 2)) return s >
                                u +
                                c /
                                2 ? 1 : -1;
                                return 0
                            }(t, a, n, i, _ ? 1 : s.swapThreshold, null ==
                            s.invertedSwapThreshold ? s.swapThreshold : s.invertedSwapThreshold, Dt, vt === a))) {
                                var O = N(q);
                                do {
                                    O -= m, w = Z.children[O]
                                } while (w && ("none" === T(w, "display") || w === K))
                            }
                            if (0 === m || w === a) return L(!1);
                            vt = a, mt = m;
                            var k = a.nextElementSibling, A = !1, X = Wt(Q, r, q, e, a, n, t, A = 1 === m);
                            if (!1 !== X) return 1 !==
                            X &&
                            -1 !==
                            X ||
                            (A = 1 === X), Ct = !0, setTimeout(jt, 30), Y(), A &&
                            !k ? r.appendChild(q) : a.parentNode.insertBefore(q, A ? k : a), C &&
                            F(C, 0, x - C.scrollTop), Z = q.parentNode, void 0 ===
                            b ||
                            Dt ||
                            (bt = Math.abs(b - I(a)[S])), B(), L(!0)
                        }
                        if (r.contains(q)) return L(!1)
                    }
                    return !1
                }

                function R(s, c) {
                    U(s, p, l({
                        evt: t,
                        isOwner: d,
                        axis: i ? "vertical" : "horizontal",
                        revert: o,
                        dragRect: e,
                        targetRect: n,
                        canSort: h,
                        fromSortable: f,
                        target: a,
                        completed: L,
                        onMove: function (n, o) {
                            return Wt(Q, r, q, e, n, I(n), t, o)
                        },
                        changed: B
                    }, c))
                }

                function Y() {
                    R("dragOverAnimationCapture"), p.captureAnimationState(), p !== f && f.captureAnimationState()
                }

                function L(e) {
                    return R("dragOverCompleted", {insertion: e}), e &&
                    (d ? u._hideClone() : u._showClone(p), p !==
                    f &&
                    (D(q, st ? st.options.ghostClass : u.options.ghostClass, !1), D(q, s.ghostClass, !0)), st !==
                    p &&
                    p !==
                    Lt.active ? st = p : p === Lt.active && st && (st = null), f ===
                    p &&
                    (p._ignoreWhileAnimating = a), p.animateAll((function () {
                        R("dragOverAnimationComplete"), p._ignoreWhileAnimating = null
                    })), p !== f && (f.animateAll(), f._ignoreWhileAnimating = null)), (a ===
                        q &&
                        !q.animated ||
                        a ===
                        r &&
                        !a.animated) && (vt = null), s.dragoverBubble ||
                    t.rootEl ||
                    a ===
                    document ||
                    (q.parentNode[W]._isOutsideThisEl(t.target), !e && Yt(t)), !s.dragoverBubble &&
                    t.stopPropagation &&
                    t.stopPropagation(), g = !0
                }

                function B() {
                    it = N(q), at = N(q, s.draggable), V({
                        sortable: p,
                        name: "change",
                        toEl: r,
                        newIndex: it,
                        newDraggableIndex: at,
                        originalEvent: t
                    })
                }
            }, _ignoreWhileAnimating: null, _offMoveEvents: function () {
                b(document, "mousemove", this._onTouchMove), b(document, "touchmove", this._onTouchMove), b(document, "pointermove", this._onTouchMove), b(document, "dragover", Yt), b(document, "mousemove", Yt), b(document, "touchmove", Yt)
            }, _offUpEvents: function () {
                var t = this.el.ownerDocument;
                b(t, "mouseup", this._onDrop), b(t, "touchend", this._onDrop), b(t, "pointerup", this._onDrop), b(t, "touchcancel", this._onDrop), b(document, "selectstart", this)
            }, _onDrop: function (t) {
                var e = this.el, n = this.options;
                it = N(q), at = N(q, n.draggable), U("drop", this, {evt: t}), Z = q &&
                    q.parentNode, it = N(q), at = N(q, n.draggable), Lt.eventCanceled ? this._nulling() : (yt = !1, Dt = !1, St = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), $t(this.cloneId), $t(this._dragStartId), this.nativeDraggable &&
                (b(document, "drop", this), b(e, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), f &&
                T(document.body, "user-select", ""), t &&
                (gt && (t.cancelable && t.preventDefault(), !n.dropBubble && t.stopPropagation()), K &&
                K.parentNode &&
                K.parentNode.removeChild(K), (Q === Z || st && "clone" !== st.lastPutMode) &&
                et &&
                et.parentNode &&
                et.parentNode.removeChild(et), q &&
                (this.nativeDraggable && b(q, "dragend", this), Bt(q), q.style["will-change"] = "", gt &&
                !yt &&
                D(q, st ? st.options.ghostClass : this.options.ghostClass, !1), D(q, this.options.chosenClass, !1), V({
                    sortable: this,
                    name: "unchoose",
                    toEl: Z,
                    newIndex: null,
                    newDraggableIndex: null,
                    originalEvent: t
                }), Q !== Z ? (it >=
                0 &&
                (V({rootEl: Z, name: "add", toEl: Z, fromEl: Q, originalEvent: t}), V({
                    sortable: this,
                    name: "remove",
                    toEl: Z,
                    originalEvent: t
                }), V({rootEl: Z, name: "sort", toEl: Z, fromEl: Q, originalEvent: t}), V({
                    sortable: this,
                    name: "sort",
                    toEl: Z,
                    originalEvent: t
                })), st && st.save()) : it !==
                    ot &&
                    it >=
                    0 &&
                    (V({sortable: this, name: "update", toEl: Z, originalEvent: t}), V({
                        sortable: this,
                        name: "sort",
                        toEl: Z,
                        originalEvent: t
                    })), Lt.active &&
                (null != it && -1 !== it || (it = ot, at = rt), V({
                    sortable: this,
                    name: "end",
                    toEl: Z,
                    originalEvent: t
                }), this.save()))), this._nulling())
            }, _nulling: function () {
                U("nulling", this), Q = q = Z = K = J = et = tt = nt = ct = ut = gt = it = at = ot = rt = vt = mt = st = lt = Lt.dragged = Lt.ghost = Lt.clone = Lt.active = null, xt.forEach((function (t) {
                    t.checked = !0
                })), xt.length = dt = ht = 0
            }, handleEvent: function (t) {
                switch (t.type) {
                    case"drop":
                    case"dragend":
                        this._onDrop(t);
                        break;
                    case"dragenter":
                    case"dragover":
                        q && (this._onDragOver(t), function (t) {
                            t.dataTransfer && (t.dataTransfer.dropEffect = "move");
                            t.cancelable && t.preventDefault()
                        }(t));
                        break;
                    case"selectstart":
                        t.preventDefault()
                }
            }, toArray: function () {
                for (var t, e = [], n = this.el.children, o = 0, i = n.length, r = this.options; o <
                i; o++) E(t = n[o], r.draggable, this.el, !1) && e.push(t.getAttribute(r.dataIdAttr) || Ht(t));
                return e
            }, sort: function (t) {
                var e = {}, n = this.el;
                this.toArray().forEach((function (t, o) {
                    var i = n.children[o];
                    E(i, this.options.draggable, n, !1) && (e[t] = i)
                }), this), t.forEach((function (t) {
                    e[t] && (n.removeChild(e[t]), n.appendChild(e[t]))
                }))
            }, save: function () {
                var t = this.options.store;
                t && t.set && t.set(this)
            }, closest: function (t, e) {
                return E(t, e || this.options.draggable, this.el, !1)
            }, option: function (t, e) {
                var n = this.options;
                if (void 0 === e) return n[t];
                var o = z.modifyOption(this, t, e);
                n[t] = void 0 !== o ? o : e, "group" === t && At(n)
            }, destroy: function () {
                U("destroy", this);
                var t = this.el;
                t[W] = null, b(t, "mousedown", this._onTapStart), b(t, "touchstart", this._onTapStart), b(t, "pointerdown", this._onTapStart), this.nativeDraggable &&
                (b(t, "dragover", this), b(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), (function (t) {
                    t.removeAttribute("draggable")
                })), this._onDrop(), _t.splice(_t.indexOf(this.el), 1), this.el = t = null
            }, _hideClone: function () {
                if (!nt) {
                    if (U("hideClone", this), Lt.eventCanceled) return;
                    T(et, "display", "none"), this.options.removeCloneOnHide &&
                    et.parentNode &&
                    et.parentNode.removeChild(et), nt = !0
                }
            }, _showClone: function (t) {
                if ("clone" === t.lastPutMode) {
                    if (nt) {
                        if (U("showClone", this), Lt.eventCanceled) return;
                        Q.contains(q) &&
                        !this.options.group.revertClone ? Q.insertBefore(et, q) : J ? Q.insertBefore(et, J) : Q.appendChild(et), this.options.group.revertClone &&
                        this.animate(q, et), T(et, "display", ""), nt = !1
                    }
                } else this._hideClone()
            }
        }, Ot && m(document, "touchmove", (function (t) {
            (Lt.active || yt) && t.cancelable && t.preventDefault()
        })), Lt.utils = {
            on: m,
            off: b,
            css: T,
            find: x,
            is: function (t, e) {
                return !!E(t, e, t, !1)
            },
            extend: function (t, e) {
                if (t && e) for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
                return t
            },
            throttle: Y,
            closest: E,
            toggleClass: D,
            clone: L,
            index: N,
            nextTick: zt,
            cancelNextTick: $t,
            detectDirection: Nt,
            getChild: k
        }, Lt.get = function (t) {
            return t[W]
        }, Lt.mount = function () {
            for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
            e[0].constructor === Array && (e = e[0]), e.forEach((function (t) {
                if (!t.prototype ||
                    !t.prototype.constructor) throw"Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(t));
                t.utils && (Lt.utils = l({}, Lt.utils, t.utils)), z.mount(t)
            }))
        }, Lt.create = function (t, e) {
            return new Lt(t, e)
        }, Lt.version = "1.10.1";
        var Gt, Ut, Vt, qt, Zt, Kt, Qt = [], Jt = !1;

        function te() {
            Qt.forEach((function (t) {
                clearInterval(t.pid)
            })), Qt = []
        }

        function ee() {
            clearInterval(Kt)
        }

        var ne = Y((function (t, e, n, o) {
            if (e.scroll) {
                var i, r = (t.touches ? t.touches[0] : t).clientX, a = (t.touches ? t.touches[0] : t).clientY,
                    l = e.scrollSensitivity, s = e.scrollSpeed, c = O(), u = !1;
                Ut !== n && (Ut = n, te(), Gt = e.scroll, i = e.scrollFn, !0 === Gt && (Gt = X(n, !0)));
                var d = 0, h = Gt;
                do {
                    var f = h, p = I(f), g = p.top, v = p.bottom, m = p.left, b = p.right, w = p.width, y = p.height,
                        E = void 0, _ = void 0, S = f.scrollWidth, D = f.scrollHeight, C = T(f), x = f.scrollLeft,
                        M = f.scrollTop;
                    f === c ? (E = w <
                        S &&
                        ("auto" === C.overflowX || "scroll" === C.overflowX || "visible" === C.overflowX), _ = y <
                        D &&
                        ("auto" === C.overflowY || "scroll" === C.overflowY || "visible" === C.overflowY)) : (E = w <
                        S &&
                        ("auto" === C.overflowX || "scroll" === C.overflowX), _ = y <
                        D &&
                        ("auto" === C.overflowY || "scroll" === C.overflowY));
                    var k = E && (Math.abs(b - r) <= l && x + w < S) - (Math.abs(m - r) <= l && !!x),
                        P = _ && (Math.abs(v - a) <= l && M + y < D) - (Math.abs(g - a) <= l && !!M);
                    if (!Qt[d]) for (var N = 0; N <= d; N++) Qt[N] || (Qt[N] = {});
                    Qt[d].vx ==
                    k &&
                    Qt[d].vy ==
                    P &&
                    Qt[d].el ===
                    f ||
                    (Qt[d].el = f, Qt[d].vx = k, Qt[d].vy = P, clearInterval(Qt[d].pid), 0 ==
                    k &&
                    0 ==
                    P ||
                    (u = !0, Qt[d].pid = setInterval(function () {
                        o && 0 === this.layer && Lt.active._onTouchMove(Zt);
                        var e = Qt[this.layer].vy ? Qt[this.layer].vy * s : 0,
                            n = Qt[this.layer].vx ? Qt[this.layer].vx * s : 0;
                        "function" ==
                        typeof i &&
                        "continue" !==
                        i.call(Lt.dragged.parentNode[W], n, e, t, Zt, Qt[this.layer].el) ||
                        F(Qt[this.layer].el, n, e)
                    }.bind({layer: d}), 24))), d++
                } while (e.bubbleScroll && h !== c && (h = X(h, !1)));
                Jt = u
            }
        }), 30), oe = function (t) {
            var e = t.originalEvent, n = t.putSortable, o = t.dragEl, i = t.activeSortable, r = t.dispatchSortableEvent,
                a = t.hideGhostForTarget, l = t.unhideGhostForTarget;
            if (e) {
                var s = n || i;
                a();
                var c = e.changedTouches && e.changedTouches.length ? e.changedTouches[0] : e,
                    u = document.elementFromPoint(c.clientX, c.clientY);
                l(), s && !s.el.contains(u) && (r("spill"), this.onSpill({dragEl: o, putSortable: n}))
            }
        };

        function ie() {
        }

        function re() {
        }

        ie.prototype = {
            startIndex: null, dragStart: function (t) {
                var e = t.oldDraggableIndex;
                this.startIndex = e
            }, onSpill: function (t) {
                var e = t.dragEl, n = t.putSortable;
                this.sortable.captureAnimationState(), n && n.captureAnimationState();
                var o = k(this.sortable.el, this.startIndex, this.options);
                o ? this.sortable.el.insertBefore(e, o) : this.sortable.el.appendChild(e), this.sortable.animateAll(), n &&
                n.animateAll()
            }, drop: oe
        }, a(ie, {pluginName: "revertOnSpill"}), re.prototype = {
            onSpill: function (t) {
                var e = t.dragEl, n = t.putSortable || this.sortable;
                n.captureAnimationState(), e.parentNode && e.parentNode.removeChild(e), n.animateAll()
            }, drop: oe
        }, a(re, {pluginName: "removeOnSpill"});
        Lt.mount(new function () {
            function t() {
                for (var t in this.defaults = {
                    scroll: !0,
                    scrollSensitivity: 30,
                    scrollSpeed: 10,
                    bubbleScroll: !0
                }, this) "_" === t.charAt(0) && "function" == typeof this[t] && (this[t] = this[t].bind(this))
            }

            return t.prototype = {
                dragStarted: function (t) {
                    var e = t.originalEvent;
                    this.sortable.nativeDraggable ? m(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? m(document, "pointermove", this._handleFallbackAutoScroll) : e.touches ? m(document, "touchmove", this._handleFallbackAutoScroll) : m(document, "mousemove", this._handleFallbackAutoScroll)
                }, dragOverCompleted: function (t) {
                    var e = t.originalEvent;
                    this.options.dragOverBubble || e.rootEl || this._handleAutoScroll(e)
                }, drop: function () {
                    this.sortable.nativeDraggable ? b(document, "dragover", this._handleAutoScroll) : (b(document, "pointermove", this._handleFallbackAutoScroll), b(document, "touchmove", this._handleFallbackAutoScroll), b(document, "mousemove", this._handleFallbackAutoScroll)), ee(), te(), clearTimeout(_), _ = void 0
                }, nulling: function () {
                    Zt = Ut = Gt = Jt = Kt = Vt = qt = null, Qt.length = 0
                }, _handleFallbackAutoScroll: function (t) {
                    this._handleAutoScroll(t, !0)
                }, _handleAutoScroll: function (t, e) {
                    var n = this, o = (t.touches ? t.touches[0] : t).clientX,
                        i = (t.touches ? t.touches[0] : t).clientY, r = document.elementFromPoint(o, i);
                    if (Zt = t, e || d || u || f) {
                        ne(t, this.options, r, e);
                        var a = X(r, !0);
                        !Jt || Kt && o === Vt && i === qt || (Kt && ee(), Kt = setInterval((function () {
                            var r = X(document.elementFromPoint(o, i), !0);
                            r !== a && (a = r, te()), ne(t, n.options, r, e)
                        }), 10), Vt = o, qt = i)
                    } else {
                        if (!this.options.bubbleScroll || X(r, !0) === O()) return void te();
                        ne(t, this.options, X(r, !1), !1)
                    }
                }
            }, a(t, {pluginName: "scroll", initializeByDefault: !0})
        }), Lt.mount(re, ie);
        var ae = $(".nav-tabs-iframe .nav-tabs"), le = new o(ae, $(".nav-tabs-iframe .tab-content"), {
            iframeLoadedCallback: [
                function (t) {
                    $("div.body.loading").remove()
                }
            ]
        });
        try {
            var se = _iframe_.url, ce = _iframe_.icon;
            se && le.switchTab(se, ce)
        } catch (t) {
            console.warn(t)
        }
        new Lt(ae.get(0), {filter: ".dropdown", animation: 100}), $(".sidebar-menu a").on("click", (function () {
            var t = $(this);
            if (!t.parent().hasClass("treeview")) {
                var e = t.attr("href"), n = t.find("i").attr("class");
                return le.switchTab(e, n), !1
            }
        }))
    }
});