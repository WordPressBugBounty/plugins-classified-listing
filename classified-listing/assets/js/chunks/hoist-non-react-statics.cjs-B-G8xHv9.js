import { f as React, r as reactExports, d as ReactDOM, o as jsxRuntimeExports, i as reactDomExports } from "./objectWithoutProperties-CEUlrGvr.js";
import { a as getAugmentedNamespace, g as getDefaultExportFromCjs$2 } from "./_commonjsHelpers-CCIqAdii.js";
import { l as leafletSrcExports, t } from "./leaflet-src-xD6arlGP.js";
var jt = (n2) => {
  switch (n2) {
    case "success":
      return ee;
    case "info":
      return ae;
    case "warning":
      return oe;
    case "error":
      return se;
    default:
      return null;
  }
}, te = Array(12).fill(0), Yt = ({ visible: n2, className: e2 }) => React.createElement("div", { className: ["sonner-loading-wrapper", e2].filter(Boolean).join(" "), "data-visible": n2 }, React.createElement("div", { className: "sonner-spinner" }, te.map((t2, a2) => React.createElement("div", { className: "sonner-loading-bar", key: `spinner-bar-${a2}` })))), ee = React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", height: "20", width: "20" }, React.createElement("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z", clipRule: "evenodd" })), oe = React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", height: "20", width: "20" }, React.createElement("path", { fillRule: "evenodd", d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z", clipRule: "evenodd" })), ae = React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", height: "20", width: "20" }, React.createElement("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z", clipRule: "evenodd" })), se = React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", height: "20", width: "20" }, React.createElement("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z", clipRule: "evenodd" })), Ot = React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), React.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" }));
var Ft = () => {
  let [n2, e2] = React.useState(document.hidden);
  return React.useEffect(() => {
    let t2 = () => {
      e2(document.hidden);
    };
    return document.addEventListener("visibilitychange", t2), () => window.removeEventListener("visibilitychange", t2);
  }, []), n2;
};
var bt = 1, yt = class {
  constructor() {
    this.subscribe = (e2) => (this.subscribers.push(e2), () => {
      let t2 = this.subscribers.indexOf(e2);
      this.subscribers.splice(t2, 1);
    });
    this.publish = (e2) => {
      this.subscribers.forEach((t2) => t2(e2));
    };
    this.addToast = (e2) => {
      this.publish(e2), this.toasts = [...this.toasts, e2];
    };
    this.create = (e2) => {
      var S;
      let { message: t2, ...a2 } = e2, u2 = typeof (e2 == null ? void 0 : e2.id) == "number" || ((S = e2.id) == null ? void 0 : S.length) > 0 ? e2.id : bt++, f2 = this.toasts.find((g2) => g2.id === u2), w2 = e2.dismissible === void 0 ? true : e2.dismissible;
      return this.dismissedToasts.has(u2) && this.dismissedToasts.delete(u2), f2 ? this.toasts = this.toasts.map((g2) => g2.id === u2 ? (this.publish({ ...g2, ...e2, id: u2, title: t2 }), { ...g2, ...e2, id: u2, dismissible: w2, title: t2 }) : g2) : this.addToast({ title: t2, ...a2, dismissible: w2, id: u2 }), u2;
    };
    this.dismiss = (e2) => (this.dismissedToasts.add(e2), e2 || this.toasts.forEach((t2) => {
      this.subscribers.forEach((a2) => a2({ id: t2.id, dismiss: true }));
    }), this.subscribers.forEach((t2) => t2({ id: e2, dismiss: true })), e2);
    this.message = (e2, t2) => this.create({ ...t2, message: e2 });
    this.error = (e2, t2) => this.create({ ...t2, message: e2, type: "error" });
    this.success = (e2, t2) => this.create({ ...t2, type: "success", message: e2 });
    this.info = (e2, t2) => this.create({ ...t2, type: "info", message: e2 });
    this.warning = (e2, t2) => this.create({ ...t2, type: "warning", message: e2 });
    this.loading = (e2, t2) => this.create({ ...t2, type: "loading", message: e2 });
    this.promise = (e2, t2) => {
      if (!t2) return;
      let a2;
      t2.loading !== void 0 && (a2 = this.create({ ...t2, promise: e2, type: "loading", message: t2.loading, description: typeof t2.description != "function" ? t2.description : void 0 }));
      let u2 = e2 instanceof Promise ? e2 : e2(), f2 = a2 !== void 0, w2, S = u2.then(async (i2) => {
        if (w2 = ["resolve", i2], React.isValidElement(i2)) f2 = false, this.create({ id: a2, type: "default", message: i2 });
        else if (ie(i2) && !i2.ok) {
          f2 = false;
          let T = typeof t2.error == "function" ? await t2.error(`HTTP error! status: ${i2.status}`) : t2.error, F2 = typeof t2.description == "function" ? await t2.description(`HTTP error! status: ${i2.status}`) : t2.description;
          this.create({ id: a2, type: "error", message: T, description: F2 });
        } else if (t2.success !== void 0) {
          f2 = false;
          let T = typeof t2.success == "function" ? await t2.success(i2) : t2.success, F2 = typeof t2.description == "function" ? await t2.description(i2) : t2.description;
          this.create({ id: a2, type: "success", message: T, description: F2 });
        }
      }).catch(async (i2) => {
        if (w2 = ["reject", i2], t2.error !== void 0) {
          f2 = false;
          let D = typeof t2.error == "function" ? await t2.error(i2) : t2.error, T = typeof t2.description == "function" ? await t2.description(i2) : t2.description;
          this.create({ id: a2, type: "error", message: D, description: T });
        }
      }).finally(() => {
        var i2;
        f2 && (this.dismiss(a2), a2 = void 0), (i2 = t2.finally) == null || i2.call(t2);
      }), g2 = () => new Promise((i2, D) => S.then(() => w2[0] === "reject" ? D(w2[1]) : i2(w2[1])).catch(D));
      return typeof a2 != "string" && typeof a2 != "number" ? { unwrap: g2 } : Object.assign(a2, { unwrap: g2 });
    };
    this.custom = (e2, t2) => {
      let a2 = (t2 == null ? void 0 : t2.id) || bt++;
      return this.create({ jsx: e2(a2), id: a2, ...t2 }), a2;
    };
    this.getActiveToasts = () => this.toasts.filter((e2) => !this.dismissedToasts.has(e2.id));
    this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}, v$1 = new yt(), ne = (n2, e2) => {
  let t2 = (e2 == null ? void 0 : e2.id) || bt++;
  return v$1.addToast({ title: n2, ...e2, id: t2 }), t2;
}, ie = (n2) => n2 && typeof n2 == "object" && "ok" in n2 && typeof n2.ok == "boolean" && "status" in n2 && typeof n2.status == "number", le = ne, ce = () => v$1.toasts, de = () => v$1.getActiveToasts(), ue = Object.assign(le, { success: v$1.success, info: v$1.info, warning: v$1.warning, error: v$1.error, custom: v$1.custom, message: v$1.message, promise: v$1.promise, dismiss: v$1.dismiss, loading: v$1.loading }, { getHistory: ce, getToasts: de });
function wt(n2, { insertAt: e2 } = {}) {
  if (typeof document == "undefined") return;
  let t2 = document.head || document.getElementsByTagName("head")[0], a2 = document.createElement("style");
  a2.type = "text/css", e2 === "top" && t2.firstChild ? t2.insertBefore(a2, t2.firstChild) : t2.appendChild(a2), a2.styleSheet ? a2.styleSheet.cssText = n2 : a2.appendChild(document.createTextNode(n2));
}
wt(`:where(html[dir="ltr"]),:where([data-sonner-toaster][dir="ltr"]){--toast-icon-margin-start: -3px;--toast-icon-margin-end: 4px;--toast-svg-margin-start: -1px;--toast-svg-margin-end: 0px;--toast-button-margin-start: auto;--toast-button-margin-end: 0;--toast-close-button-start: 0;--toast-close-button-end: unset;--toast-close-button-transform: translate(-35%, -35%)}:where(html[dir="rtl"]),:where([data-sonner-toaster][dir="rtl"]){--toast-icon-margin-start: 4px;--toast-icon-margin-end: -3px;--toast-svg-margin-start: 0px;--toast-svg-margin-end: -1px;--toast-button-margin-start: 0;--toast-button-margin-end: auto;--toast-close-button-start: unset;--toast-close-button-end: 0;--toast-close-button-transform: translate(35%, -35%)}:where([data-sonner-toaster]){position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1: hsl(0, 0%, 99%);--gray2: hsl(0, 0%, 97.3%);--gray3: hsl(0, 0%, 95.1%);--gray4: hsl(0, 0%, 93%);--gray5: hsl(0, 0%, 90.9%);--gray6: hsl(0, 0%, 88.7%);--gray7: hsl(0, 0%, 85.8%);--gray8: hsl(0, 0%, 78%);--gray9: hsl(0, 0%, 56.1%);--gray10: hsl(0, 0%, 52.3%);--gray11: hsl(0, 0%, 43.5%);--gray12: hsl(0, 0%, 9%);--border-radius: 8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:none;z-index:999999999;transition:transform .4s ease}:where([data-sonner-toaster][data-lifted="true"]){transform:translateY(-10px)}@media (hover: none) and (pointer: coarse){:where([data-sonner-toaster][data-lifted="true"]){transform:none}}:where([data-sonner-toaster][data-x-position="right"]){right:var(--offset-right)}:where([data-sonner-toaster][data-x-position="left"]){left:var(--offset-left)}:where([data-sonner-toaster][data-x-position="center"]){left:50%;transform:translate(-50%)}:where([data-sonner-toaster][data-y-position="top"]){top:var(--offset-top)}:where([data-sonner-toaster][data-y-position="bottom"]){bottom:var(--offset-bottom)}:where([data-sonner-toast]){--y: translateY(100%);--lift-amount: calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);filter:blur(0);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:none;overflow-wrap:anywhere}:where([data-sonner-toast][data-styled="true"]){padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px #0000001a;width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}:where([data-sonner-toast]:focus-visible){box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast][data-y-position="top"]){top:0;--y: translateY(-100%);--lift: 1;--lift-amount: calc(1 * var(--gap))}:where([data-sonner-toast][data-y-position="bottom"]){bottom:0;--y: translateY(100%);--lift: -1;--lift-amount: calc(var(--lift) * var(--gap))}:where([data-sonner-toast]) :where([data-description]){font-weight:400;line-height:1.4;color:inherit}:where([data-sonner-toast]) :where([data-title]){font-weight:500;line-height:1.5;color:inherit}:where([data-sonner-toast]) :where([data-icon]){display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}:where([data-sonner-toast][data-promise="true"]) :where([data-icon])>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}:where([data-sonner-toast]) :where([data-icon])>*{flex-shrink:0}:where([data-sonner-toast]) :where([data-icon]) svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}:where([data-sonner-toast]) :where([data-content]){display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;cursor:pointer;outline:none;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}:where([data-sonner-toast]) :where([data-button]):focus-visible{box-shadow:0 0 0 2px #0006}:where([data-sonner-toast]) :where([data-button]):first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}:where([data-sonner-toast]) :where([data-cancel]){color:var(--normal-text);background:rgba(0,0,0,.08)}:where([data-sonner-toast][data-theme="dark"]) :where([data-cancel]){background:rgba(255,255,255,.3)}:where([data-sonner-toast]) :where([data-close-button]){position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast] [data-close-button]{background:var(--gray1)}:where([data-sonner-toast]) :where([data-close-button]):focus-visible{box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast]) :where([data-disabled="true"]){cursor:not-allowed}:where([data-sonner-toast]):hover :where([data-close-button]):hover{background:var(--gray2);border-color:var(--gray5)}:where([data-sonner-toast][data-swiping="true"]):before{content:"";position:absolute;left:-50%;right:-50%;height:100%;z-index:-1}:where([data-sonner-toast][data-y-position="top"][data-swiping="true"]):before{bottom:50%;transform:scaleY(3) translateY(50%)}:where([data-sonner-toast][data-y-position="bottom"][data-swiping="true"]):before{top:50%;transform:scaleY(3) translateY(-50%)}:where([data-sonner-toast][data-swiping="false"][data-removed="true"]):before{content:"";position:absolute;inset:0;transform:scaleY(2)}:where([data-sonner-toast]):after{content:"";position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}:where([data-sonner-toast][data-mounted="true"]){--y: translateY(0);opacity:1}:where([data-sonner-toast][data-expanded="false"][data-front="false"]){--scale: var(--toasts-before) * .05 + 1;--y: translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}:where([data-sonner-toast])>*{transition:opacity .4s}:where([data-sonner-toast][data-expanded="false"][data-front="false"][data-styled="true"])>*{opacity:0}:where([data-sonner-toast][data-visible="false"]){opacity:0;pointer-events:none}:where([data-sonner-toast][data-mounted="true"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}:where([data-sonner-toast][data-removed="true"][data-front="true"][data-swipe-out="false"]){--y: translateY(calc(var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="false"]){--y: translateY(40%);opacity:0;transition:transform .5s,opacity .2s}:where([data-sonner-toast][data-removed="true"][data-front="false"]):before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y, 0px)) translate(var(--swipe-amount-x, 0px));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{0%{transform:var(--y) translate(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translate(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{0%{transform:var(--y) translate(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translate(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width: 600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-theme=light]{--normal-bg: #fff;--normal-border: var(--gray4);--normal-text: var(--gray12);--success-bg: hsl(143, 85%, 96%);--success-border: hsl(145, 92%, 91%);--success-text: hsl(140, 100%, 27%);--info-bg: hsl(208, 100%, 97%);--info-border: hsl(221, 91%, 91%);--info-text: hsl(210, 92%, 45%);--warning-bg: hsl(49, 100%, 97%);--warning-border: hsl(49, 91%, 91%);--warning-text: hsl(31, 92%, 45%);--error-bg: hsl(359, 100%, 97%);--error-border: hsl(359, 100%, 94%);--error-text: hsl(360, 100%, 45%)}[data-sonner-toaster][data-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg: #fff;--normal-border: var(--gray3);--normal-text: var(--gray12)}[data-sonner-toaster][data-theme=dark]{--normal-bg: #000;--normal-bg-hover: hsl(0, 0%, 12%);--normal-border: hsl(0, 0%, 20%);--normal-border-hover: hsl(0, 0%, 25%);--normal-text: var(--gray1);--success-bg: hsl(150, 100%, 6%);--success-border: hsl(147, 100%, 12%);--success-text: hsl(150, 86%, 65%);--info-bg: hsl(215, 100%, 6%);--info-border: hsl(223, 100%, 12%);--info-text: hsl(216, 87%, 65%);--warning-bg: hsl(64, 100%, 6%);--warning-border: hsl(60, 100%, 12%);--warning-text: hsl(46, 87%, 65%);--error-bg: hsl(358, 76%, 10%);--error-border: hsl(357, 89%, 16%);--error-text: hsl(358, 100%, 81%)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success],[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info],[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning],[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error],[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size: 16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:nth-child(1){animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}to{opacity:.15}}@media (prefers-reduced-motion){[data-sonner-toast],[data-sonner-toast]>*,.sonner-loading-bar{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}
`);
function tt(n2) {
  return n2.label !== void 0;
}
var pe = 3, me = "32px", ge = "16px", Wt = 4e3, he = 356, be = 14, ye = 20, we = 200;
function M(...n2) {
  return n2.filter(Boolean).join(" ");
}
function xe(n2) {
  let [e2, t2] = n2.split("-"), a2 = [];
  return e2 && a2.push(e2), t2 && a2.push(t2), a2;
}
var ve = (n2) => {
  var Dt, Pt, Nt, Bt, Ct, kt, It, Mt, Ht, At, Lt;
  let { invert: e2, toast: t2, unstyled: a2, interacting: u2, setHeights: f2, visibleToasts: w2, heights: S, index: g2, toasts: i2, expanded: D, removeToast: T, defaultRichColors: F2, closeButton: et, style: ut, cancelButtonStyle: ft, actionButtonStyle: l2, className: ot = "", descriptionClassName: at = "", duration: X, position: st, gap: pt, loadingIcon: rt, expandByDefault: B, classNames: s2, icons: P, closeButtonAriaLabel: nt = "Close toast", pauseWhenPageIsHidden: it } = n2, [Y, C] = React.useState(null), [lt, J] = React.useState(null), [W, H] = React.useState(false), [A, mt] = React.useState(false), [L, z] = React.useState(false), [ct, d2] = React.useState(false), [h2, y2] = React.useState(false), [R2, j] = React.useState(0), [p2, _] = React.useState(0), O = React.useRef(t2.duration || X || Wt), G = React.useRef(null), k = React.useRef(null), Vt = g2 === 0, Ut = g2 + 1 <= w2, N = t2.type, V = t2.dismissible !== false, Kt = t2.className || "", Xt = t2.descriptionClassName || "", dt = React.useMemo(() => S.findIndex((r2) => r2.toastId === t2.id) || 0, [S, t2.id]), Jt = React.useMemo(() => {
    var r2;
    return (r2 = t2.closeButton) != null ? r2 : et;
  }, [t2.closeButton, et]), Tt = React.useMemo(() => t2.duration || X || Wt, [t2.duration, X]), gt = React.useRef(0), U = React.useRef(0), St = React.useRef(0), K = React.useRef(null), [Gt, Qt] = st.split("-"), Rt = React.useMemo(() => S.reduce((r2, m2, c2) => c2 >= dt ? r2 : r2 + m2.height, 0), [S, dt]), Et = Ft(), qt = t2.invert || e2, ht = N === "loading";
  U.current = React.useMemo(() => dt * pt + Rt, [dt, Rt]), React.useEffect(() => {
    O.current = Tt;
  }, [Tt]), React.useEffect(() => {
    H(true);
  }, []), React.useEffect(() => {
    let r2 = k.current;
    if (r2) {
      let m2 = r2.getBoundingClientRect().height;
      return _(m2), f2((c2) => [{ toastId: t2.id, height: m2, position: t2.position }, ...c2]), () => f2((c2) => c2.filter((b2) => b2.toastId !== t2.id));
    }
  }, [f2, t2.id]), React.useLayoutEffect(() => {
    if (!W) return;
    let r2 = k.current, m2 = r2.style.height;
    r2.style.height = "auto";
    let c2 = r2.getBoundingClientRect().height;
    r2.style.height = m2, _(c2), f2((b2) => b2.find((x2) => x2.toastId === t2.id) ? b2.map((x2) => x2.toastId === t2.id ? { ...x2, height: c2 } : x2) : [{ toastId: t2.id, height: c2, position: t2.position }, ...b2]);
  }, [W, t2.title, t2.description, f2, t2.id]);
  let $ = React.useCallback(() => {
    mt(true), j(U.current), f2((r2) => r2.filter((m2) => m2.toastId !== t2.id)), setTimeout(() => {
      T(t2);
    }, we);
  }, [t2, T, f2, U]);
  React.useEffect(() => {
    if (t2.promise && N === "loading" || t2.duration === 1 / 0 || t2.type === "loading") return;
    let r2;
    return D || u2 || it && Et ? (() => {
      if (St.current < gt.current) {
        let b2 = (/* @__PURE__ */ new Date()).getTime() - gt.current;
        O.current = O.current - b2;
      }
      St.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      O.current !== 1 / 0 && (gt.current = (/* @__PURE__ */ new Date()).getTime(), r2 = setTimeout(() => {
        var b2;
        (b2 = t2.onAutoClose) == null || b2.call(t2, t2), $();
      }, O.current));
    })(), () => clearTimeout(r2);
  }, [D, u2, t2, N, it, Et, $]), React.useEffect(() => {
    t2.delete && $();
  }, [$, t2.delete]);
  function Zt() {
    var r2, m2, c2;
    return P != null && P.loading ? React.createElement("div", { className: M(s2 == null ? void 0 : s2.loader, (r2 = t2 == null ? void 0 : t2.classNames) == null ? void 0 : r2.loader, "sonner-loader"), "data-visible": N === "loading" }, P.loading) : rt ? React.createElement("div", { className: M(s2 == null ? void 0 : s2.loader, (m2 = t2 == null ? void 0 : t2.classNames) == null ? void 0 : m2.loader, "sonner-loader"), "data-visible": N === "loading" }, rt) : React.createElement(Yt, { className: M(s2 == null ? void 0 : s2.loader, (c2 = t2 == null ? void 0 : t2.classNames) == null ? void 0 : c2.loader), visible: N === "loading" });
  }
  return React.createElement("li", { tabIndex: 0, ref: k, className: M(ot, Kt, s2 == null ? void 0 : s2.toast, (Dt = t2 == null ? void 0 : t2.classNames) == null ? void 0 : Dt.toast, s2 == null ? void 0 : s2.default, s2 == null ? void 0 : s2[N], (Pt = t2 == null ? void 0 : t2.classNames) == null ? void 0 : Pt[N]), "data-sonner-toast": "", "data-rich-colors": (Nt = t2.richColors) != null ? Nt : F2, "data-styled": !(t2.jsx || t2.unstyled || a2), "data-mounted": W, "data-promise": !!t2.promise, "data-swiped": h2, "data-removed": A, "data-visible": Ut, "data-y-position": Gt, "data-x-position": Qt, "data-index": g2, "data-front": Vt, "data-swiping": L, "data-dismissible": V, "data-type": N, "data-invert": qt, "data-swipe-out": ct, "data-swipe-direction": lt, "data-expanded": !!(D || B && W), style: { "--index": g2, "--toasts-before": g2, "--z-index": i2.length - g2, "--offset": `${A ? R2 : U.current}px`, "--initial-height": B ? "auto" : `${p2}px`, ...ut, ...t2.style }, onDragEnd: () => {
    z(false), C(null), K.current = null;
  }, onPointerDown: (r2) => {
    ht || !V || (G.current = /* @__PURE__ */ new Date(), j(U.current), r2.target.setPointerCapture(r2.pointerId), r2.target.tagName !== "BUTTON" && (z(true), K.current = { x: r2.clientX, y: r2.clientY }));
  }, onPointerUp: () => {
    var x2, Q, q, Z;
    if (ct || !V) return;
    K.current = null;
    let r2 = Number(((x2 = k.current) == null ? void 0 : x2.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), m2 = Number(((Q = k.current) == null ? void 0 : Q.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), c2 = (/* @__PURE__ */ new Date()).getTime() - ((q = G.current) == null ? void 0 : q.getTime()), b2 = Y === "x" ? r2 : m2, I = Math.abs(b2) / c2;
    if (Math.abs(b2) >= ye || I > 0.11) {
      j(U.current), (Z = t2.onDismiss) == null || Z.call(t2, t2), J(Y === "x" ? r2 > 0 ? "right" : "left" : m2 > 0 ? "down" : "up"), $(), d2(true), y2(false);
      return;
    }
    z(false), C(null);
  }, onPointerMove: (r2) => {
    var Q, q, Z, zt;
    if (!K.current || !V || ((Q = window.getSelection()) == null ? void 0 : Q.toString().length) > 0) return;
    let c2 = r2.clientY - K.current.y, b2 = r2.clientX - K.current.x, I = (q = n2.swipeDirections) != null ? q : xe(st);
    !Y && (Math.abs(b2) > 1 || Math.abs(c2) > 1) && C(Math.abs(b2) > Math.abs(c2) ? "x" : "y");
    let x2 = { x: 0, y: 0 };
    Y === "y" ? (I.includes("top") || I.includes("bottom")) && (I.includes("top") && c2 < 0 || I.includes("bottom") && c2 > 0) && (x2.y = c2) : Y === "x" && (I.includes("left") || I.includes("right")) && (I.includes("left") && b2 < 0 || I.includes("right") && b2 > 0) && (x2.x = b2), (Math.abs(x2.x) > 0 || Math.abs(x2.y) > 0) && y2(true), (Z = k.current) == null || Z.style.setProperty("--swipe-amount-x", `${x2.x}px`), (zt = k.current) == null || zt.style.setProperty("--swipe-amount-y", `${x2.y}px`);
  } }, Jt && !t2.jsx ? React.createElement("button", { "aria-label": nt, "data-disabled": ht, "data-close-button": true, onClick: ht || !V ? () => {
  } : () => {
    var r2;
    $(), (r2 = t2.onDismiss) == null || r2.call(t2, t2);
  }, className: M(s2 == null ? void 0 : s2.closeButton, (Bt = t2 == null ? void 0 : t2.classNames) == null ? void 0 : Bt.closeButton) }, (Ct = P == null ? void 0 : P.close) != null ? Ct : Ot) : null, t2.jsx || reactExports.isValidElement(t2.title) ? t2.jsx ? t2.jsx : typeof t2.title == "function" ? t2.title() : t2.title : React.createElement(React.Fragment, null, N || t2.icon || t2.promise ? React.createElement("div", { "data-icon": "", className: M(s2 == null ? void 0 : s2.icon, (kt = t2 == null ? void 0 : t2.classNames) == null ? void 0 : kt.icon) }, t2.promise || t2.type === "loading" && !t2.icon ? t2.icon || Zt() : null, t2.type !== "loading" ? t2.icon || (P == null ? void 0 : P[N]) || jt(N) : null) : null, React.createElement("div", { "data-content": "", className: M(s2 == null ? void 0 : s2.content, (It = t2 == null ? void 0 : t2.classNames) == null ? void 0 : It.content) }, React.createElement("div", { "data-title": "", className: M(s2 == null ? void 0 : s2.title, (Mt = t2 == null ? void 0 : t2.classNames) == null ? void 0 : Mt.title) }, typeof t2.title == "function" ? t2.title() : t2.title), t2.description ? React.createElement("div", { "data-description": "", className: M(at, Xt, s2 == null ? void 0 : s2.description, (Ht = t2 == null ? void 0 : t2.classNames) == null ? void 0 : Ht.description) }, typeof t2.description == "function" ? t2.description() : t2.description) : null), reactExports.isValidElement(t2.cancel) ? t2.cancel : t2.cancel && tt(t2.cancel) ? React.createElement("button", { "data-button": true, "data-cancel": true, style: t2.cancelButtonStyle || ft, onClick: (r2) => {
    var m2, c2;
    tt(t2.cancel) && V && ((c2 = (m2 = t2.cancel).onClick) == null || c2.call(m2, r2), $());
  }, className: M(s2 == null ? void 0 : s2.cancelButton, (At = t2 == null ? void 0 : t2.classNames) == null ? void 0 : At.cancelButton) }, t2.cancel.label) : null, reactExports.isValidElement(t2.action) ? t2.action : t2.action && tt(t2.action) ? React.createElement("button", { "data-button": true, "data-action": true, style: t2.actionButtonStyle || l2, onClick: (r2) => {
    var m2, c2;
    tt(t2.action) && ((c2 = (m2 = t2.action).onClick) == null || c2.call(m2, r2), !r2.defaultPrevented && $());
  }, className: M(s2 == null ? void 0 : s2.actionButton, (Lt = t2 == null ? void 0 : t2.classNames) == null ? void 0 : Lt.actionButton) }, t2.action.label) : null));
};
function _t() {
  if (typeof window == "undefined" || typeof document == "undefined") return "ltr";
  let n2 = document.documentElement.getAttribute("dir");
  return n2 === "auto" || !n2 ? window.getComputedStyle(document.documentElement).direction : n2;
}
function Te(n2, e2) {
  let t2 = {};
  return [n2, e2].forEach((a2, u2) => {
    let f2 = u2 === 1, w2 = f2 ? "--mobile-offset" : "--offset", S = f2 ? ge : me;
    function g2(i2) {
      ["top", "right", "bottom", "left"].forEach((D) => {
        t2[`${w2}-${D}`] = typeof i2 == "number" ? `${i2}px` : i2;
      });
    }
    typeof a2 == "number" || typeof a2 == "string" ? g2(a2) : typeof a2 == "object" ? ["top", "right", "bottom", "left"].forEach((i2) => {
      a2[i2] === void 0 ? t2[`${w2}-${i2}`] = S : t2[`${w2}-${i2}`] = typeof a2[i2] == "number" ? `${a2[i2]}px` : a2[i2];
    }) : g2(S);
  }), t2;
}
var $e = reactExports.forwardRef(function(e2, t2) {
  let { invert: a2, position: u2 = "bottom-right", hotkey: f2 = ["altKey", "KeyT"], expand: w2, closeButton: S, className: g2, offset: i2, mobileOffset: D, theme: T = "light", richColors: F2, duration: et, style: ut, visibleToasts: ft = pe, toastOptions: l2, dir: ot = _t(), gap: at = be, loadingIcon: X, icons: st, containerAriaLabel: pt = "Notifications", pauseWhenPageIsHidden: rt } = e2, [B, s2] = React.useState([]), P = React.useMemo(() => Array.from(new Set([u2].concat(B.filter((d2) => d2.position).map((d2) => d2.position)))), [B, u2]), [nt, it] = React.useState([]), [Y, C] = React.useState(false), [lt, J] = React.useState(false), [W, H] = React.useState(T !== "system" ? T : typeof window != "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), A = React.useRef(null), mt = f2.join("+").replace(/Key/g, "").replace(/Digit/g, ""), L = React.useRef(null), z = React.useRef(false), ct = React.useCallback((d2) => {
    s2((h2) => {
      var y2;
      return (y2 = h2.find((R2) => R2.id === d2.id)) != null && y2.delete || v$1.dismiss(d2.id), h2.filter(({ id: R2 }) => R2 !== d2.id);
    });
  }, []);
  return React.useEffect(() => v$1.subscribe((d2) => {
    if (d2.dismiss) {
      s2((h2) => h2.map((y2) => y2.id === d2.id ? { ...y2, delete: true } : y2));
      return;
    }
    setTimeout(() => {
      ReactDOM.flushSync(() => {
        s2((h2) => {
          let y2 = h2.findIndex((R2) => R2.id === d2.id);
          return y2 !== -1 ? [...h2.slice(0, y2), { ...h2[y2], ...d2 }, ...h2.slice(y2 + 1)] : [d2, ...h2];
        });
      });
    });
  }), []), React.useEffect(() => {
    if (T !== "system") {
      H(T);
      return;
    }
    if (T === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? H("dark") : H("light")), typeof window == "undefined") return;
    let d2 = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      d2.addEventListener("change", ({ matches: h2 }) => {
        H(h2 ? "dark" : "light");
      });
    } catch (h2) {
      d2.addListener(({ matches: y2 }) => {
        try {
          H(y2 ? "dark" : "light");
        } catch (R2) {
          console.error(R2);
        }
      });
    }
  }, [T]), React.useEffect(() => {
    B.length <= 1 && C(false);
  }, [B]), React.useEffect(() => {
    let d2 = (h2) => {
      var R2, j;
      f2.every((p2) => h2[p2] || h2.code === p2) && (C(true), (R2 = A.current) == null || R2.focus()), h2.code === "Escape" && (document.activeElement === A.current || (j = A.current) != null && j.contains(document.activeElement)) && C(false);
    };
    return document.addEventListener("keydown", d2), () => document.removeEventListener("keydown", d2);
  }, [f2]), React.useEffect(() => {
    if (A.current) return () => {
      L.current && (L.current.focus({ preventScroll: true }), L.current = null, z.current = false);
    };
  }, [A.current]), React.createElement("section", { ref: t2, "aria-label": `${pt} ${mt}`, tabIndex: -1, "aria-live": "polite", "aria-relevant": "additions text", "aria-atomic": "false", suppressHydrationWarning: true }, P.map((d2, h2) => {
    var j;
    let [y2, R2] = d2.split("-");
    return B.length ? React.createElement("ol", { key: d2, dir: ot === "auto" ? _t() : ot, tabIndex: -1, ref: A, className: g2, "data-sonner-toaster": true, "data-theme": W, "data-y-position": y2, "data-lifted": Y && B.length > 1 && !w2, "data-x-position": R2, style: { "--front-toast-height": `${((j = nt[0]) == null ? void 0 : j.height) || 0}px`, "--width": `${he}px`, "--gap": `${at}px`, ...ut, ...Te(i2, D) }, onBlur: (p2) => {
      z.current && !p2.currentTarget.contains(p2.relatedTarget) && (z.current = false, L.current && (L.current.focus({ preventScroll: true }), L.current = null));
    }, onFocus: (p2) => {
      p2.target instanceof HTMLElement && p2.target.dataset.dismissible === "false" || z.current || (z.current = true, L.current = p2.relatedTarget);
    }, onMouseEnter: () => C(true), onMouseMove: () => C(true), onMouseLeave: () => {
      lt || C(false);
    }, onDragEnd: () => C(false), onPointerDown: (p2) => {
      p2.target instanceof HTMLElement && p2.target.dataset.dismissible === "false" || J(true);
    }, onPointerUp: () => J(false) }, B.filter((p2) => !p2.position && h2 === 0 || p2.position === d2).map((p2, _) => {
      var O, G;
      return React.createElement(ve, { key: p2.id, icons: st, index: _, toast: p2, defaultRichColors: F2, duration: (O = l2 == null ? void 0 : l2.duration) != null ? O : et, className: l2 == null ? void 0 : l2.className, descriptionClassName: l2 == null ? void 0 : l2.descriptionClassName, invert: a2, visibleToasts: ft, closeButton: (G = l2 == null ? void 0 : l2.closeButton) != null ? G : S, interacting: lt, position: d2, style: l2 == null ? void 0 : l2.style, unstyled: l2 == null ? void 0 : l2.unstyled, classNames: l2 == null ? void 0 : l2.classNames, cancelButtonStyle: l2 == null ? void 0 : l2.cancelButtonStyle, actionButtonStyle: l2 == null ? void 0 : l2.actionButtonStyle, removeToast: ct, toasts: B.filter((k) => k.position == p2.position), heights: nt.filter((k) => k.position == p2.position), setHeights: it, expandByDefault: w2, gap: at, loadingIcon: X, expanded: Y, pauseWhenPageIsHidden: rt, swipeDirections: e2.swipeDirections });
    })) : null;
  }));
});
const __viteBrowserExternal = {};
const __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __viteBrowserExternal
}, Symbol.toStringTag, { value: "Module" }));
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
function sheetForTag(tag) {
  if (tag.sheet) {
    return tag.sheet;
  }
  for (var i2 = 0; i2 < document.styleSheets.length; i2++) {
    if (document.styleSheets[i2].ownerNode === tag) {
      return document.styleSheets[i2];
    }
  }
  return void 0;
}
function createStyleElement(options) {
  var tag = document.createElement("style");
  tag.setAttribute("data-emotion", options.key);
  if (options.nonce !== void 0) {
    tag.setAttribute("nonce", options.nonce);
  }
  tag.appendChild(document.createTextNode(""));
  tag.setAttribute("data-s", "");
  return tag;
}
var StyleSheet = /* @__PURE__ */ (function() {
  function StyleSheet2(options) {
    var _this = this;
    this._insertTag = function(tag) {
      var before;
      if (_this.tags.length === 0) {
        if (_this.insertionPoint) {
          before = _this.insertionPoint.nextSibling;
        } else if (_this.prepend) {
          before = _this.container.firstChild;
        } else {
          before = _this.before;
        }
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }
      _this.container.insertBefore(tag, before);
      _this.tags.push(tag);
    };
    this.isSpeedy = options.speedy === void 0 ? true : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce;
    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.insertionPoint = options.insertionPoint;
    this.before = null;
  }
  var _proto = StyleSheet2.prototype;
  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };
  _proto.insert = function insert(rule) {
    if (this.ctr % (this.isSpeedy ? 65e3 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }
    var tag = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);
      try {
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e2) {
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }
    this.ctr++;
  };
  _proto.flush = function flush() {
    this.tags.forEach(function(tag) {
      var _tag$parentNode;
      return (_tag$parentNode = tag.parentNode) == null ? void 0 : _tag$parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
  };
  return StyleSheet2;
})();
var MS = "-ms-";
var MOZ = "-moz-";
var WEBKIT = "-webkit-";
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var IMPORT = "@import";
var KEYFRAMES = "@keyframes";
var LAYER = "@layer";
var abs = Math.abs;
var from = String.fromCharCode;
var assign = Object.assign;
function hash(value, length2) {
  return charat(value, 0) ^ 45 ? (((length2 << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3) : 0;
}
function trim(value) {
  return value.trim();
}
function match(value, pattern) {
  return (value = pattern.exec(value)) ? value[0] : value;
}
function replace(value, pattern, replacement) {
  return value.replace(pattern, replacement);
}
function indexof(value, search) {
  return value.indexOf(search);
}
function charat(value, index) {
  return value.charCodeAt(index) | 0;
}
function substr(value, begin, end) {
  return value.slice(begin, end);
}
function strlen(value) {
  return value.length;
}
function sizeof(value) {
  return value.length;
}
function append(value, array) {
  return array.push(value), value;
}
function combine(array, callback) {
  return array.map(callback).join("");
}
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = "";
function node(value, root, parent, type, props, children, length2) {
  return { value, root, parent, type, props, children, line, column, length: length2, return: "" };
}
function copy(root, props) {
  return assign(node("", null, null, "", null, null, 0), root, { length: -root.length }, props);
}
function char() {
  return character;
}
function prev() {
  character = position > 0 ? charat(characters, --position) : 0;
  if (column--, character === 10)
    column = 1, line--;
  return character;
}
function next() {
  character = position < length ? charat(characters, position++) : 0;
  if (column++, character === 10)
    column = 1, line++;
  return character;
}
function peek() {
  return charat(characters, position);
}
function caret() {
  return position;
}
function slice(begin, end) {
  return substr(characters, begin, end);
}
function token(type) {
  switch (type) {
    // \0 \t \n \r \s whitespace token
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    // ! + , / > @ ~ isolate token
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    // ; { } breakpoint token
    case 59:
    case 123:
    case 125:
      return 4;
    // : accompanied token
    case 58:
      return 3;
    // " ' ( [ opening delimit token
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    // ) ] closing delimit token
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function alloc(value) {
  return line = column = 1, length = strlen(characters = value), position = 0, [];
}
function dealloc(value) {
  return characters = "", value;
}
function delimit(type) {
  return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
function whitespace(type) {
  while (character = peek())
    if (character < 33)
      next();
    else
      break;
  return token(type) > 2 || token(character) > 3 ? "" : " ";
}
function escaping(index, count) {
  while (--count && next())
    if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97)
      break;
  return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
  while (next())
    switch (character) {
      // ] ) " '
      case type:
        return position;
      // " '
      case 34:
      case 39:
        if (type !== 34 && type !== 39)
          delimiter(character);
        break;
      // (
      case 40:
        if (type === 41)
          delimiter(type);
        break;
      // \
      case 92:
        next();
        break;
    }
  return position;
}
function commenter(type, index) {
  while (next())
    if (type + character === 47 + 10)
      break;
    else if (type + character === 42 + 42 && peek() === 47)
      break;
  return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
function identifier(index) {
  while (!token(peek()))
    next();
  return slice(index, position);
}
function compile(value) {
  return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
  var index = 0;
  var offset = 0;
  var length2 = pseudo;
  var atrule = 0;
  var property = 0;
  var previous = 0;
  var variable = 1;
  var scanning = 1;
  var ampersand = 1;
  var character2 = 0;
  var type = "";
  var props = rules;
  var children = rulesets;
  var reference = rule;
  var characters2 = type;
  while (scanning)
    switch (previous = character2, character2 = next()) {
      // (
      case 40:
        if (previous != 108 && charat(characters2, length2 - 1) == 58) {
          if (indexof(characters2 += replace(delimit(character2), "&", "&\f"), "&\f") != -1)
            ampersand = -1;
          break;
        }
      // " ' [
      case 34:
      case 39:
      case 91:
        characters2 += delimit(character2);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        characters2 += whitespace(previous);
        break;
      // \
      case 92:
        characters2 += escaping(caret() - 1, 7);
        continue;
      // /
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), root, parent), declarations);
            break;
          default:
            characters2 += "/";
        }
        break;
      // {
      case 123 * variable:
        points[index++] = strlen(characters2) * ampersand;
      // } ; \0
      case 125 * variable:
      case 59:
      case 0:
        switch (character2) {
          // \0 }
          case 0:
          case 125:
            scanning = 0;
          // ;
          case 59 + offset:
            if (ampersand == -1) characters2 = replace(characters2, /\f/g, "");
            if (property > 0 && strlen(characters2) - length2)
              append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2), declarations);
            break;
          // @ ;
          case 59:
            characters2 += ";";
          // { rule/at-rule
          default:
            append(reference = ruleset(characters2, root, parent, index, offset, rules, points, type, props = [], children = [], length2), rulesets);
            if (character2 === 123)
              if (offset === 0)
                parse(characters2, root, reference, reference, props, rulesets, length2, points, children);
              else
                switch (atrule === 99 && charat(characters2, 3) === 110 ? 100 : atrule) {
                  // d l m s
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length2), children), rules, children, length2, points, rule ? props : children);
                    break;
                  default:
                    parse(characters2, reference, reference, reference, [""], children, 0, points, children);
                }
        }
        index = offset = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
        break;
      // :
      case 58:
        length2 = 1 + strlen(characters2), property = previous;
      default:
        if (variable < 1) {
          if (character2 == 123)
            --variable;
          else if (character2 == 125 && variable++ == 0 && prev() == 125)
            continue;
        }
        switch (characters2 += from(character2), character2 * variable) {
          // &
          case 38:
            ampersand = offset > 0 ? 1 : (characters2 += "\f", -1);
            break;
          // ,
          case 44:
            points[index++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
            break;
          // @
          case 64:
            if (peek() === 45)
              characters2 += delimit(next());
            atrule = peek(), offset = length2 = strlen(type = characters2 += identifier(caret())), character2++;
            break;
          // -
          case 45:
            if (previous === 45 && strlen(characters2) == 2)
              variable = 0;
        }
    }
  return rulesets;
}
function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length2) {
  var post = offset - 1;
  var rule = offset === 0 ? rules : [""];
  var size = sizeof(rule);
  for (var i2 = 0, j = 0, k = 0; i2 < index; ++i2)
    for (var x2 = 0, y2 = substr(value, post + 1, post = abs(j = points[i2])), z = value; x2 < size; ++x2)
      if (z = trim(j > 0 ? rule[x2] + " " + y2 : replace(y2, /&\f/g, rule[x2])))
        props[k++] = z;
  return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length2);
}
function comment(value, root, parent) {
  return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0);
}
function declaration(value, root, parent, length2) {
  return node(value, root, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2);
}
function serialize(children, callback) {
  var output = "";
  var length2 = sizeof(children);
  for (var i2 = 0; i2 < length2; i2++)
    output += callback(children[i2], i2, children, callback) || "";
  return output;
}
function stringify(element, index, children, callback) {
  switch (element.type) {
    case LAYER:
      if (element.children.length) break;
    case IMPORT:
    case DECLARATION:
      return element.return = element.return || element.value;
    case COMMENT:
      return "";
    case KEYFRAMES:
      return element.return = element.value + "{" + serialize(element.children, callback) + "}";
    case RULESET:
      element.value = element.props.join(",");
  }
  return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}
function middleware(collection) {
  var length2 = sizeof(collection);
  return function(element, index, children, callback) {
    var output = "";
    for (var i2 = 0; i2 < length2; i2++)
      output += collection[i2](element, index, children, callback) || "";
    return output;
  };
}
function rulesheet(callback) {
  return function(element) {
    if (!element.root) {
      if (element = element.return)
        callback(element);
    }
  };
}
function memoize(fn) {
  var cache = /* @__PURE__ */ Object.create(null);
  return function(arg) {
    if (cache[arg] === void 0) cache[arg] = fn(arg);
    return cache[arg];
  };
}
var identifierWithPointTracking = function identifierWithPointTracking2(begin, points, index) {
  var previous = 0;
  var character2 = 0;
  while (true) {
    previous = character2;
    character2 = peek();
    if (previous === 38 && character2 === 12) {
      points[index] = 1;
    }
    if (token(character2)) {
      break;
    }
    next();
  }
  return slice(begin, position);
};
var toRules = function toRules2(parsed, points) {
  var index = -1;
  var character2 = 44;
  do {
    switch (token(character2)) {
      case 0:
        if (character2 === 38 && peek() === 12) {
          points[index] = 1;
        }
        parsed[index] += identifierWithPointTracking(position - 1, points, index);
        break;
      case 2:
        parsed[index] += delimit(character2);
        break;
      case 4:
        if (character2 === 44) {
          parsed[++index] = peek() === 58 ? "&\f" : "";
          points[index] = parsed[index].length;
          break;
        }
      // fallthrough
      default:
        parsed[index] += from(character2);
    }
  } while (character2 = next());
  return parsed;
};
var getRules = function getRules2(value, points) {
  return dealloc(toRules(alloc(value), points));
};
var fixedElements = /* @__PURE__ */ new WeakMap();
var compat = function compat2(element) {
  if (element.type !== "rule" || !element.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  element.length < 1) {
    return;
  }
  var value = element.value;
  var parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;
  while (parent.type !== "rule") {
    parent = parent.parent;
    if (!parent) return;
  }
  if (element.props.length === 1 && value.charCodeAt(0) !== 58 && !fixedElements.get(parent)) {
    return;
  }
  if (isImplicitRule) {
    return;
  }
  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;
  for (var i2 = 0, k = 0; i2 < rules.length; i2++) {
    for (var j = 0; j < parentRules.length; j++, k++) {
      element.props[k] = points[i2] ? rules[i2].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i2];
    }
  }
};
var removeLabel = function removeLabel2(element) {
  if (element.type === "decl") {
    var value = element.value;
    if (
      // charcode for l
      value.charCodeAt(0) === 108 && // charcode for b
      value.charCodeAt(2) === 98
    ) {
      element["return"] = "";
      element.value = "";
    }
  }
};
function prefix(value, length2) {
  switch (hash(value, length2)) {
    // color-adjust
    case 5103:
      return WEBKIT + "print-" + value + value;
    // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return WEBKIT + value + value;
    // appearance, user-select, transform, hyphens, text-size-adjust
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return WEBKIT + value + MOZ + value + MS + value + value;
    // flex, flex-direction
    case 6828:
    case 4268:
      return WEBKIT + value + MS + value + value;
    // order
    case 6165:
      return WEBKIT + value + MS + "flex-" + value + value;
    // align-items
    case 5187:
      return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + "box-$1$2" + MS + "flex-$1$2") + value;
    // align-self
    case 5443:
      return WEBKIT + value + MS + "flex-item-" + replace(value, /flex-|-self/, "") + value;
    // align-content
    case 4675:
      return WEBKIT + value + MS + "flex-line-pack" + replace(value, /align-content|flex-|-self/, "") + value;
    // flex-shrink
    case 5548:
      return WEBKIT + value + MS + replace(value, "shrink", "negative") + value;
    // flex-basis
    case 5292:
      return WEBKIT + value + MS + replace(value, "basis", "preferred-size") + value;
    // flex-grow
    case 6060:
      return WEBKIT + "box-" + replace(value, "-grow", "") + WEBKIT + value + MS + replace(value, "grow", "positive") + value;
    // transition
    case 4554:
      return WEBKIT + replace(value, /([^-])(transform)/g, "$1" + WEBKIT + "$2") + value;
    // cursor
    case 6187:
      return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), value, "") + value;
    // background, background-image
    case 5495:
    case 3959:
      return replace(value, /(image-set\([^]*)/, WEBKIT + "$1$`$1");
    // justify-content
    case 4968:
      return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + "box-pack:$3" + MS + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + WEBKIT + value + value;
    // (margin|padding)-inline-(start|end)
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace(value, /(.+)-inline(.+)/, WEBKIT + "$1$2") + value;
    // (min|max)?(width|height|inline-size|block-size)
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (strlen(value) - 1 - length2 > 6) switch (charat(value, length2 + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          if (charat(value, length2 + 4) !== 45) break;
        // (f)ill-available, (f)it-content
        case 102:
          return replace(value, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(value, length2 + 3) == 108 ? "$3" : "$2-$3")) + value;
        // (s)tretch
        case 115:
          return ~indexof(value, "stretch") ? prefix(replace(value, "stretch", "fill-available"), length2) + value : value;
      }
      break;
    // position: sticky
    case 4949:
      if (charat(value, length2 + 1) !== 115) break;
    // display: (flex|inline-flex)
    case 6444:
      switch (charat(value, strlen(value) - 3 - (~indexof(value, "!important") && 10))) {
        // stic(k)y
        case 107:
          return replace(value, ":", ":" + WEBKIT) + value;
        // (inline-)?fl(e)x
        case 101:
          return replace(value, /(.+:)([^;!]+)(;|!.+)?/, "$1" + WEBKIT + (charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + WEBKIT + "$2$3$1" + MS + "$2box$3") + value;
      }
      break;
    // writing-mode
    case 5936:
      switch (charat(value, length2 + 11)) {
        // vertical-l(r)
        case 114:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
        // vertical-r(l)
        case 108:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
        // horizontal(-)tb
        case 45:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
      }
      return WEBKIT + value + MS + value + value;
  }
  return value;
}
var prefixer = function prefixer2(element, index, children, callback) {
  if (element.length > -1) {
    if (!element["return"]) switch (element.type) {
      case DECLARATION:
        element["return"] = prefix(element.value, element.length);
        break;
      case KEYFRAMES:
        return serialize([copy(element, {
          value: replace(element.value, "@", "@" + WEBKIT)
        })], callback);
      case RULESET:
        if (element.length) return combine(element.props, function(value) {
          switch (match(value, /(::plac\w+|:read-\w+)/)) {
            // :read-(only|write)
            case ":read-only":
            case ":read-write":
              return serialize([copy(element, {
                props: [replace(value, /:(read-\w+)/, ":" + MOZ + "$1")]
              })], callback);
            // :placeholder
            case "::placeholder":
              return serialize([copy(element, {
                props: [replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1")]
              }), copy(element, {
                props: [replace(value, /:(plac\w+)/, ":" + MOZ + "$1")]
              }), copy(element, {
                props: [replace(value, /:(plac\w+)/, MS + "input-$1")]
              })], callback);
          }
          return "";
        });
    }
  }
};
var defaultStylisPlugins = [prefixer];
var createCache = function createCache2(options) {
  var key = options.key;
  if (key === "css") {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(ssrStyles, function(node2) {
      var dataEmotionAttribute = node2.getAttribute("data-emotion");
      if (dataEmotionAttribute.indexOf(" ") === -1) {
        return;
      }
      document.head.appendChild(node2);
      node2.setAttribute("data-s", "");
    });
  }
  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;
  var inserted = {};
  var container;
  var nodesToHydrate = [];
  {
    container = options.container || document.head;
    Array.prototype.forEach.call(
      // this means we will ignore elements which don't have a space in them which
      // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
      document.querySelectorAll('style[data-emotion^="' + key + ' "]'),
      function(node2) {
        var attrib = node2.getAttribute("data-emotion").split(" ");
        for (var i2 = 1; i2 < attrib.length; i2++) {
          inserted[attrib[i2]] = true;
        }
        nodesToHydrate.push(node2);
      }
    );
  }
  var _insert;
  var omnipresentPlugins = [compat, removeLabel];
  {
    var currentSheet;
    var finalizingPlugins = [stringify, rulesheet(function(rule) {
      currentSheet.insert(rule);
    })];
    var serializer = middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));
    var stylis = function stylis2(styles) {
      return serialize(compile(styles), serializer);
    };
    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;
      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
      if (shouldCache) {
        cache.inserted[serialized.name] = true;
      }
    };
  }
  var cache = {
    key,
    sheet: new StyleSheet({
      key,
      container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend,
      insertionPoint: options.insertionPoint
    }),
    nonce: options.nonce,
    inserted,
    registered: {},
    insert: _insert
  };
  cache.sheet.hydrate(nodesToHydrate);
  return cache;
};
function murmur2(str) {
  var h2 = 0;
  var k, i2 = 0, len = str.length;
  for (; len >= 4; ++i2, len -= 4) {
    k = str.charCodeAt(i2) & 255 | (str.charCodeAt(++i2) & 255) << 8 | (str.charCodeAt(++i2) & 255) << 16 | (str.charCodeAt(++i2) & 255) << 24;
    k = /* Math.imul(k, m): */
    (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
    k ^= /* k >>> r: */
    k >>> 24;
    h2 = /* Math.imul(k, m): */
    (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
  }
  switch (len) {
    case 3:
      h2 ^= (str.charCodeAt(i2 + 2) & 255) << 16;
    case 2:
      h2 ^= (str.charCodeAt(i2 + 1) & 255) << 8;
    case 1:
      h2 ^= str.charCodeAt(i2) & 255;
      h2 = /* Math.imul(h, m): */
      (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
  }
  h2 ^= h2 >>> 13;
  h2 = /* Math.imul(h, m): */
  (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
  return ((h2 ^ h2 >>> 15) >>> 0).toString(36);
}
var unitlessKeys = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  scale: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
var isCustomProperty = function isCustomProperty2(property) {
  return property.charCodeAt(1) === 45;
};
var isProcessableValue = function isProcessableValue2(value) {
  return value != null && typeof value !== "boolean";
};
var processStyleName = /* @__PURE__ */ memoize(function(styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, "-$&").toLowerCase();
});
var processStyleValue = function processStyleValue2(key, value) {
  switch (key) {
    case "animation":
    case "animationName": {
      if (typeof value === "string") {
        return value.replace(animationRegex, function(match2, p1, p2) {
          cursor = {
            name: p1,
            styles: p2,
            next: cursor
          };
          return p1;
        });
      }
    }
  }
  if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === "number" && value !== 0) {
    return value + "px";
  }
  return value;
};
function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return "";
  }
  var componentSelector = interpolation;
  if (componentSelector.__emotion_styles !== void 0) {
    return componentSelector;
  }
  switch (typeof interpolation) {
    case "boolean": {
      return "";
    }
    case "object": {
      var keyframes = interpolation;
      if (keyframes.anim === 1) {
        cursor = {
          name: keyframes.name,
          styles: keyframes.styles,
          next: cursor
        };
        return keyframes.name;
      }
      var serializedStyles = interpolation;
      if (serializedStyles.styles !== void 0) {
        var next2 = serializedStyles.next;
        if (next2 !== void 0) {
          while (next2 !== void 0) {
            cursor = {
              name: next2.name,
              styles: next2.styles,
              next: cursor
            };
            next2 = next2.next;
          }
        }
        var styles = serializedStyles.styles + ";";
        return styles;
      }
      return createStringFromObject(mergedProps, registered, interpolation);
    }
    case "function": {
      if (mergedProps !== void 0) {
        var previousCursor = cursor;
        var result = interpolation(mergedProps);
        cursor = previousCursor;
        return handleInterpolation(mergedProps, registered, result);
      }
      break;
    }
  }
  var asString = interpolation;
  if (registered == null) {
    return asString;
  }
  var cached = registered[asString];
  return cached !== void 0 ? cached : asString;
}
function createStringFromObject(mergedProps, registered, obj) {
  var string = "";
  if (Array.isArray(obj)) {
    for (var i2 = 0; i2 < obj.length; i2++) {
      string += handleInterpolation(mergedProps, registered, obj[i2]) + ";";
    }
  } else {
    for (var key in obj) {
      var value = obj[key];
      if (typeof value !== "object") {
        var asString = value;
        if (registered != null && registered[asString] !== void 0) {
          string += key + "{" + registered[asString] + "}";
        } else if (isProcessableValue(asString)) {
          string += processStyleName(key) + ":" + processStyleValue(key, asString) + ";";
        }
      } else {
        if (Array.isArray(value) && typeof value[0] === "string" && (registered == null || registered[value[0]] === void 0)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(key) + ":" + processStyleValue(key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);
          switch (key) {
            case "animation":
            case "animationName": {
              string += processStyleName(key) + ":" + interpolated + ";";
              break;
            }
            default: {
              string += key + "{" + interpolated + "}";
            }
          }
        }
      }
    }
  }
  return string;
}
var labelPattern = /label:\s*([^\s;{]+)\s*(;|$)/g;
var cursor;
function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === "object" && args[0] !== null && args[0].styles !== void 0) {
    return args[0];
  }
  var stringMode = true;
  var styles = "";
  cursor = void 0;
  var strings = args[0];
  if (strings == null || strings.raw === void 0) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings);
  } else {
    var asTemplateStringsArr = strings;
    styles += asTemplateStringsArr[0];
  }
  for (var i2 = 1; i2 < args.length; i2++) {
    styles += handleInterpolation(mergedProps, registered, args[i2]);
    if (stringMode) {
      var templateStringsArr = strings;
      styles += templateStringsArr[i2];
    }
  }
  labelPattern.lastIndex = 0;
  var identifierName = "";
  var match2;
  while ((match2 = labelPattern.exec(styles)) !== null) {
    identifierName += "-" + match2[1];
  }
  var name = murmur2(styles) + identifierName;
  return {
    name,
    styles,
    next: cursor
  };
}
var isBrowser$1 = true;
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = "";
  classNames.split(" ").forEach(function(className) {
    if (registered[className] !== void 0) {
      registeredStyles.push(registered[className] + ";");
    } else if (className) {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var registerStyles = function registerStyles2(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;
  if (
    // we only need to add the styles to the registered cache if the
    // class name could be used further down
    // the tree but if it's a string tag, we know it won't
    // so we don't have to add it to registered cache.
    // this improves memory usage since we can avoid storing the whole style string
    (isStringTag === false || // we need to always store it if we're in compat mode and
    // in node since emotion-server relies on whether a style is in
    // the registered cache to know whether a style is global or not
    // also, note that this check will be dead code eliminated in the browser
    isBrowser$1 === false) && cache.registered[className] === void 0
  ) {
    cache.registered[className] = serialized.styles;
  }
};
var insertStyles = function insertStyles2(cache, serialized, isStringTag) {
  registerStyles(cache, serialized, isStringTag);
  var className = cache.key + "-" + serialized.name;
  if (cache.inserted[serialized.name] === void 0) {
    var current = serialized;
    do {
      cache.insert(serialized === current ? "." + className : "", current, cache.sheet, true);
      current = current.next;
    } while (current !== void 0);
  }
};
function _typeof(o2) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o22) {
    return typeof o22;
  } : function(o22) {
    return o22 && "function" == typeof Symbol && o22.constructor === Symbol && o22 !== Symbol.prototype ? "symbol" : typeof o22;
  }, _typeof(o2);
}
function toPrimitive(t2, r2) {
  if ("object" != _typeof(t2) || !t2) return t2;
  var e2 = t2[Symbol.toPrimitive];
  if (void 0 !== e2) {
    var i2 = e2.call(t2, r2);
    if ("object" != _typeof(i2)) return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function toPropertyKey(t2) {
  var i2 = toPrimitive(t2, "string");
  return "symbol" == _typeof(i2) ? i2 : i2 + "";
}
function _defineProperty(e2, r2, t2) {
  return (r2 = toPropertyKey(r2)) in e2 ? Object.defineProperty(e2, r2, {
    value: t2,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e2[r2] = t2, e2;
}
function getDefaultExportFromCjs$1(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var invariant_1;
var hasRequiredInvariant;
function requireInvariant() {
  if (hasRequiredInvariant) return invariant_1;
  hasRequiredInvariant = 1;
  var invariant2 = function invariant3(condition, format, a2, b2, c2, d2, e2, f2) {
    if (!condition) {
      var error;
      if (format === void 0) {
        error = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
      } else {
        var args = [a2, b2, c2, d2, e2, f2];
        var argIndex = 0;
        error = new Error(format.replace(/%s/g, function() {
          return args[argIndex++];
        }));
        error.name = "Invariant Violation";
      }
      error.framesToPop = 1;
      throw error;
    }
  };
  invariant_1 = invariant2;
  return invariant_1;
}
var invariantExports = requireInvariant();
var invariant = /* @__PURE__ */ getDefaultExportFromCjs$1(invariantExports);
var MapContext = reactExports.createContext(null);
function useGoogleMap() {
  invariant(!!reactExports.useContext, "useGoogleMap is React hook and requires React version 16.8+");
  var map = reactExports.useContext(MapContext);
  invariant(!!map, "useGoogleMap needs a GoogleMap available up in the tree");
  return map;
}
function reduce(obj, fn, acc) {
  return Object.keys(obj).reduce(function reducer(newAcc, key) {
    return fn(newAcc, obj[key], key);
  }, acc);
}
function forEach(obj, fn) {
  Object.keys(obj).forEach((key) => {
    return fn(obj[key], key);
  });
}
function applyUpdaterToNextProps(updaterMap2, prevProps, nextProps, instance) {
  var map = {};
  var iter = (fn, key) => {
    var nextValue = nextProps[key];
    if (nextValue !== prevProps[key]) {
      map[key] = nextValue;
      fn(instance, nextValue);
    }
  };
  forEach(updaterMap2, iter);
  return map;
}
function registerEvents(props, instance, eventMap2) {
  var registeredList = reduce(eventMap2, function reducer(acc, googleEventName, onEventName) {
    if (typeof props[onEventName] === "function") {
      acc.push(google.maps.event.addListener(instance, googleEventName, props[onEventName]));
    }
    return acc;
  }, []);
  return registeredList;
}
function unregisterEvent(registered) {
  google.maps.event.removeListener(registered);
}
function unregisterEvents() {
  var events = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  events.forEach(unregisterEvent);
}
function applyUpdatersToPropsAndRegisterEvents(_ref) {
  var {
    updaterMap: updaterMap2,
    eventMap: eventMap2,
    prevProps,
    nextProps,
    instance
  } = _ref;
  var registeredEvents = registerEvents(nextProps, instance, eventMap2);
  applyUpdaterToNextProps(updaterMap2, prevProps, nextProps, instance);
  return registeredEvents;
}
var eventMap$i = {
  onDblClick: "dblclick",
  onDragEnd: "dragend",
  onDragStart: "dragstart",
  onMapTypeIdChanged: "maptypeid_changed",
  onMouseMove: "mousemove",
  onMouseOut: "mouseout",
  onMouseOver: "mouseover",
  onMouseDown: "mousedown",
  onMouseUp: "mouseup",
  onRightClick: "rightclick",
  onTilesLoaded: "tilesloaded",
  onBoundsChanged: "bounds_changed",
  onCenterChanged: "center_changed",
  onClick: "click",
  onDrag: "drag",
  onHeadingChanged: "heading_changed",
  onIdle: "idle",
  onProjectionChanged: "projection_changed",
  onResize: "resize",
  onTiltChanged: "tilt_changed",
  onZoomChanged: "zoom_changed"
};
var updaterMap$i = {
  extraMapTypes(map, extra) {
    extra.forEach(function forEachExtra(it, i2) {
      map.mapTypes.set(String(i2), it);
    });
  },
  center(map, center) {
    map.setCenter(center);
  },
  clickableIcons(map, clickable) {
    map.setClickableIcons(clickable);
  },
  heading(map, heading) {
    map.setHeading(heading);
  },
  mapTypeId(map, mapTypeId) {
    map.setMapTypeId(mapTypeId);
  },
  options(map, options) {
    map.setOptions(options);
  },
  streetView(map, streetView) {
    map.setStreetView(streetView);
  },
  tilt(map, tilt) {
    map.setTilt(tilt);
  },
  zoom(map, zoom) {
    map.setZoom(zoom);
  }
};
function GoogleMapFunctional(_ref) {
  var {
    children,
    options,
    id,
    mapContainerStyle,
    mapContainerClassName,
    center,
    // clickableIcons,
    // extraMapTypes,
    // heading,
    // mapTypeId,
    onClick,
    onDblClick,
    onDrag,
    onDragEnd,
    onDragStart,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onMouseDown,
    onMouseUp,
    onRightClick,
    // onMapTypeIdChanged,
    // onTilesLoaded,
    // onBoundsChanged,
    onCenterChanged,
    // onHeadingChanged,
    // onIdle,
    // onProjectionChanged,
    // onResize,
    // onTiltChanged,
    // onZoomChanged,
    onLoad,
    onUnmount
  } = _ref;
  var [map, setMap] = reactExports.useState(null);
  var ref = reactExports.useRef(null);
  var [centerChangedListener, setCenterChangedListener] = reactExports.useState(null);
  var [dblclickListener, setDblclickListener] = reactExports.useState(null);
  var [dragendListener, setDragendListener] = reactExports.useState(null);
  var [dragstartListener, setDragstartListener] = reactExports.useState(null);
  var [mousedownListener, setMousedownListener] = reactExports.useState(null);
  var [mousemoveListener, setMousemoveListener] = reactExports.useState(null);
  var [mouseoutListener, setMouseoutListener] = reactExports.useState(null);
  var [mouseoverListener, setMouseoverListener] = reactExports.useState(null);
  var [mouseupListener, setMouseupListener] = reactExports.useState(null);
  var [rightclickListener, setRightclickListener] = reactExports.useState(null);
  var [clickListener, setClickListener] = reactExports.useState(null);
  var [dragListener, setDragListener] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (options && map !== null) {
      map.setOptions(options);
    }
  }, [map, options]);
  reactExports.useEffect(() => {
    if (map !== null && typeof center !== "undefined") {
      map.setCenter(center);
    }
  }, [map, center]);
  reactExports.useEffect(() => {
    if (map && onDblClick) {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      setDblclickListener(google.maps.event.addListener(map, "dblclick", onDblClick));
    }
  }, [onDblClick]);
  reactExports.useEffect(() => {
    if (map && onDragEnd) {
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }
      setDragendListener(google.maps.event.addListener(map, "dragend", onDragEnd));
    }
  }, [onDragEnd]);
  reactExports.useEffect(() => {
    if (map && onDragStart) {
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }
      setDragstartListener(google.maps.event.addListener(map, "dragstart", onDragStart));
    }
  }, [onDragStart]);
  reactExports.useEffect(() => {
    if (map && onMouseDown) {
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      setMousedownListener(google.maps.event.addListener(map, "mousedown", onMouseDown));
    }
  }, [onMouseDown]);
  reactExports.useEffect(() => {
    if (map && onMouseMove) {
      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener);
      }
      setMousemoveListener(google.maps.event.addListener(map, "mousemove", onMouseMove));
    }
  }, [onMouseMove]);
  reactExports.useEffect(() => {
    if (map && onMouseOut) {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      setMouseoutListener(google.maps.event.addListener(map, "mouseout", onMouseOut));
    }
  }, [onMouseOut]);
  reactExports.useEffect(() => {
    if (map && onMouseOver) {
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      setMouseoverListener(google.maps.event.addListener(map, "mouseover", onMouseOver));
    }
  }, [onMouseOver]);
  reactExports.useEffect(() => {
    if (map && onMouseUp) {
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      setMouseupListener(google.maps.event.addListener(map, "mouseup", onMouseUp));
    }
  }, [onMouseUp]);
  reactExports.useEffect(() => {
    if (map && onRightClick) {
      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener);
      }
      setRightclickListener(google.maps.event.addListener(map, "rightclick", onRightClick));
    }
  }, [onRightClick]);
  reactExports.useEffect(() => {
    if (map && onClick) {
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      setClickListener(google.maps.event.addListener(map, "click", onClick));
    }
  }, [onClick]);
  reactExports.useEffect(() => {
    if (map && onDrag) {
      if (dragListener !== null) {
        google.maps.event.removeListener(dragListener);
      }
      setDragListener(google.maps.event.addListener(map, "drag", onDrag));
    }
  }, [onDrag]);
  reactExports.useEffect(() => {
    if (map && onCenterChanged) {
      if (centerChangedListener !== null) {
        google.maps.event.removeListener(centerChangedListener);
      }
      setCenterChangedListener(google.maps.event.addListener(map, "center_changed", onCenterChanged));
    }
  }, [onClick]);
  reactExports.useEffect(() => {
    var map2 = ref.current === null ? null : new google.maps.Map(ref.current, options);
    setMap(map2);
    if (map2 !== null && onLoad) {
      onLoad(map2);
    }
    return () => {
      if (map2 !== null) {
        if (onUnmount) {
          onUnmount(map2);
        }
      }
    };
  }, []);
  return jsxRuntimeExports.jsx("div", {
    id,
    ref,
    style: mapContainerStyle,
    className: mapContainerClassName,
    children: jsxRuntimeExports.jsx(MapContext.Provider, {
      value: map,
      children: map !== null ? children : null
    })
  });
}
reactExports.memo(GoogleMapFunctional);
class GoogleMap extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      map: null
    });
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "mapRef", null);
    _defineProperty(this, "getInstance", () => {
      if (this.mapRef === null) {
        return null;
      }
      return new google.maps.Map(this.mapRef, this.props.options);
    });
    _defineProperty(this, "panTo", (latLng) => {
      var map = this.getInstance();
      if (map) {
        map.panTo(latLng);
      }
    });
    _defineProperty(this, "setMapCallback", () => {
      if (this.state.map !== null) {
        if (this.props.onLoad) {
          this.props.onLoad(this.state.map);
        }
      }
    });
    _defineProperty(this, "getRef", (ref) => {
      this.mapRef = ref;
    });
  }
  componentDidMount() {
    var map = this.getInstance();
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$i,
      eventMap: eventMap$i,
      prevProps: {},
      nextProps: this.props,
      instance: map
    });
    this.setState(function setMap() {
      return {
        map
      };
    }, this.setMapCallback);
  }
  componentDidUpdate(prevProps) {
    if (this.state.map !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$i,
        eventMap: eventMap$i,
        prevProps,
        nextProps: this.props,
        instance: this.state.map
      });
    }
  }
  componentWillUnmount() {
    if (this.state.map !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.map);
      }
      unregisterEvents(this.registeredEvents);
    }
  }
  render() {
    return jsxRuntimeExports.jsx("div", {
      id: this.props.id,
      ref: this.getRef,
      style: this.props.mapContainerStyle,
      className: this.props.mapContainerClassName,
      children: jsxRuntimeExports.jsx(MapContext.Provider, {
        value: this.state.map,
        children: this.state.map !== null ? this.props.children : null
      })
    });
  }
}
function asyncGeneratorStep(n2, t2, e2, r2, o2, a2, c2) {
  try {
    var i2 = n2[a2](c2), u2 = i2.value;
  } catch (n22) {
    return void e2(n22);
  }
  i2.done ? t2(u2) : Promise.resolve(u2).then(r2, o2);
}
function _asyncToGenerator(n2) {
  return function() {
    var t2 = this, e2 = arguments;
    return new Promise(function(r2, o2) {
      var a2 = n2.apply(t2, e2);
      function _next(n22) {
        asyncGeneratorStep(a2, r2, o2, _next, _throw, "next", n22);
      }
      function _throw(n22) {
        asyncGeneratorStep(a2, r2, o2, _next, _throw, "throw", n22);
      }
      _next(void 0);
    });
  };
}
function makeLoadScriptUrl(_ref) {
  var {
    googleMapsApiKey,
    googleMapsClientId,
    version = "weekly",
    language,
    region,
    libraries,
    channel,
    mapIds,
    authReferrerPolicy,
    apiUrl = "https://maps.googleapis.com"
  } = _ref;
  var params = [];
  invariant(googleMapsApiKey && googleMapsClientId || !(googleMapsApiKey && googleMapsClientId), "You need to specify either googleMapsApiKey or googleMapsClientId for @react-google-maps/api load script to work. You cannot use both at the same time.");
  if (googleMapsApiKey) {
    params.push("key=".concat(googleMapsApiKey));
  } else if (googleMapsClientId) {
    params.push("client=".concat(googleMapsClientId));
  }
  if (version) {
    params.push("v=".concat(version));
  }
  if (language) {
    params.push("language=".concat(language));
  }
  if (region) {
    params.push("region=".concat(region));
  }
  if (libraries && libraries.length) {
    params.push("libraries=".concat(libraries.sort().join(",")));
  }
  if (channel) {
    params.push("channel=".concat(channel));
  }
  if (mapIds && mapIds.length) {
    params.push("map_ids=".concat(mapIds.join(",")));
  }
  if (authReferrerPolicy) {
    params.push("auth_referrer_policy=".concat(authReferrerPolicy));
  }
  params.push("loading=async");
  params.push("callback=initMap");
  return "".concat(apiUrl, "/maps/api/js?").concat(params.join("&"));
}
var isBrowser = typeof document !== "undefined";
function injectScript(_ref) {
  var {
    url,
    id,
    nonce
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = _ref;
  if (!isBrowser) {
    return Promise.reject(new Error("document is undefined"));
  }
  return new Promise(function injectScriptCallback(resolve, reject) {
    var existingScript = document.getElementById(id);
    var windowWithGoogleMap = window;
    if (existingScript) {
      var dataStateAttribute = existingScript.getAttribute("data-state");
      if (existingScript.src === url && dataStateAttribute !== "error") {
        if (dataStateAttribute === "ready") {
          return resolve(id);
        } else {
          var originalInitMap = windowWithGoogleMap.initMap;
          var originalErrorCallback = existingScript.onerror;
          windowWithGoogleMap.initMap = function initMap() {
            if (originalInitMap) {
              originalInitMap();
            }
            resolve(id);
          };
          existingScript.onerror = function(err) {
            if (originalErrorCallback) {
              originalErrorCallback(err);
            }
            reject(err);
          };
          return;
        }
      } else {
        existingScript.remove();
      }
    }
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    script.id = id;
    script.async = true;
    script.nonce = nonce || "";
    script.onerror = function onerror(err) {
      script.setAttribute("data-state", "error");
      reject(err);
    };
    windowWithGoogleMap.initMap = function onload() {
      script.setAttribute("data-state", "ready");
      resolve(id);
    };
    document.head.appendChild(script);
  }).catch((err) => {
    console.error("injectScript error: ", err);
    throw err;
  });
}
function isGoogleFontStyle(element) {
  var href = element.href;
  if (href && (href.indexOf("https://fonts.googleapis.com/css?family=Roboto") === 0 || href.indexOf("https://fonts.googleapis.com/css?family=Google+Sans+Text") === 0)) {
    return true;
  }
  if (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.tagName.toLowerCase() === "style" && // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.styleSheet && // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.styleSheet.cssText && // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.styleSheet.cssText.replace("\r\n", "").indexOf(".gm-style") === 0
  ) {
    element.styleSheet.cssText = "";
    return true;
  }
  if (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.tagName.toLowerCase() === "style" && // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.innerHTML && // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.innerHTML.replace("\r\n", "").indexOf(".gm-style") === 0
  ) {
    element.innerHTML = "";
    return true;
  }
  if (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.tagName.toLowerCase() === "style" && // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    !element.styleSheet && // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    !element.innerHTML
  ) {
    return true;
  }
  return false;
}
function preventGoogleFonts() {
  var head = document.getElementsByTagName("head")[0];
  if (head) {
    var trueInsertBefore = head.insertBefore.bind(head);
    head.insertBefore = function insertBefore(newElement, referenceElement) {
      if (!isGoogleFontStyle(newElement)) {
        Reflect.apply(trueInsertBefore, head, [newElement, referenceElement]);
      }
      return newElement;
    };
    var trueAppend = head.appendChild.bind(head);
    head.appendChild = function appendChild(textNode) {
      if (!isGoogleFontStyle(textNode)) {
        Reflect.apply(trueAppend, head, [textNode]);
      }
      return textNode;
    };
  }
}
var cleaningUp = false;
function DefaultLoadingElement() {
  return jsxRuntimeExports.jsx("div", {
    children: "Loading..."
  });
}
var defaultLoadScriptProps = {
  id: "script-loader",
  version: "weekly"
};
class LoadScript extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "check", null);
    _defineProperty(this, "state", {
      loaded: false
    });
    _defineProperty(this, "cleanupCallback", () => {
      delete window.google.maps;
      this.injectScript();
    });
    _defineProperty(this, "isCleaningUp", /* @__PURE__ */ _asyncToGenerator(function* () {
      function promiseCallback(resolve) {
        if (!cleaningUp) {
          resolve();
        } else {
          if (isBrowser) {
            var timer = window.setInterval(function interval() {
              if (!cleaningUp) {
                window.clearInterval(timer);
                resolve();
              }
            }, 1);
          }
        }
        return;
      }
      return new Promise(promiseCallback);
    }));
    _defineProperty(this, "cleanup", () => {
      cleaningUp = true;
      var script = document.getElementById(this.props.id);
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
      Array.prototype.slice.call(document.getElementsByTagName("script")).filter(function filter(script2) {
        return typeof script2.src === "string" && script2.src.includes("maps.googleapis");
      }).forEach(function forEach2(script2) {
        if (script2.parentNode) {
          script2.parentNode.removeChild(script2);
        }
      });
      Array.prototype.slice.call(document.getElementsByTagName("link")).filter(function filter(link) {
        return link.href === "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Google+Sans";
      }).forEach(function forEach2(link) {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
      Array.prototype.slice.call(document.getElementsByTagName("style")).filter(function filter(style) {
        return style.innerText !== void 0 && style.innerText.length > 0 && style.innerText.includes(".gm-");
      }).forEach(function forEach2(style) {
        if (style.parentNode) {
          style.parentNode.removeChild(style);
        }
      });
    });
    _defineProperty(this, "injectScript", () => {
      if (this.props.preventGoogleFontsLoading) {
        preventGoogleFonts();
      }
      invariant(!!this.props.id, 'LoadScript requires "id" prop to be a string: %s', this.props.id);
      var injectScriptOptions = {
        id: this.props.id,
        nonce: this.props.nonce,
        url: makeLoadScriptUrl(this.props)
      };
      injectScript(injectScriptOptions).then(() => {
        if (this.props.onLoad) {
          this.props.onLoad();
        }
        this.setState(function setLoaded() {
          return {
            loaded: true
          };
        });
        return;
      }).catch((err) => {
        if (this.props.onError) {
          this.props.onError(err);
        }
        console.error("\n          There has been an Error with loading Google Maps API script, please check that you provided correct google API key (".concat(this.props.googleMapsApiKey || "-", ") or Client ID (").concat(this.props.googleMapsClientId || "-", ") to <LoadScript />\n          Otherwise it is a Network issue.\n        "));
      });
    });
    _defineProperty(this, "getRef", (el) => {
      this.check = el;
    });
  }
  componentDidMount() {
    if (isBrowser) {
      if (window.google && window.google.maps && !cleaningUp) {
        console.error("google api is already presented");
        return;
      }
      this.isCleaningUp().then(this.injectScript).catch(function error(err) {
        console.error("Error at injecting script after cleaning up: ", err);
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.libraries !== prevProps.libraries) {
      console.warn("Performance warning! LoadScript has been reloaded unintentionally! You should not pass `libraries` prop as new array. Please keep an array of libraries as static class property for Components and PureComponents, or just a const variable outside of component, or somewhere in config files or ENV variables");
    }
    if (isBrowser && prevProps.language !== this.props.language) {
      this.cleanup();
      this.setState(function setLoaded() {
        return {
          loaded: false
        };
      }, this.cleanupCallback);
    }
  }
  componentWillUnmount() {
    if (isBrowser) {
      this.cleanup();
      var timeoutCallback = () => {
        if (!this.check) {
          delete window.google;
          cleaningUp = false;
        }
      };
      window.setTimeout(timeoutCallback, 1);
      if (this.props.onUnmount) {
        this.props.onUnmount();
      }
    }
  }
  render() {
    return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
      children: [jsxRuntimeExports.jsx("div", {
        ref: this.getRef
      }), this.state.loaded ? this.props.children : this.props.loadingElement || jsxRuntimeExports.jsx(DefaultLoadingElement, {})]
    });
  }
}
_defineProperty(LoadScript, "defaultProps", defaultLoadScriptProps);
function _objectWithoutPropertiesLoose(r2, e2) {
  if (null == r2) return {};
  var t2 = {};
  for (var n2 in r2) if ({}.hasOwnProperty.call(r2, n2)) {
    if (e2.includes(n2)) continue;
    t2[n2] = r2[n2];
  }
  return t2;
}
function _objectWithoutProperties(e2, t2) {
  if (null == e2) return {};
  var o2, r2, i2 = _objectWithoutPropertiesLoose(e2, t2);
  if (Object.getOwnPropertySymbols) {
    var s2 = Object.getOwnPropertySymbols(e2);
    for (r2 = 0; r2 < s2.length; r2++) o2 = s2[r2], t2.includes(o2) || {}.propertyIsEnumerable.call(e2, o2) && (i2[o2] = e2[o2]);
  }
  return i2;
}
var previouslyLoadedUrl;
function useLoadScript(_ref) {
  var {
    id = defaultLoadScriptProps.id,
    version = defaultLoadScriptProps.version,
    nonce,
    googleMapsApiKey,
    googleMapsClientId,
    language,
    region,
    libraries,
    preventGoogleFontsLoading,
    channel,
    mapIds,
    authReferrerPolicy,
    apiUrl = "https://maps.googleapis.com"
  } = _ref;
  var isMounted = reactExports.useRef(false);
  var [isLoaded, setLoaded] = reactExports.useState(false);
  var [loadError, setLoadError] = reactExports.useState(void 0);
  reactExports.useEffect(function trackMountedState() {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  reactExports.useEffect(function applyPreventGoogleFonts() {
    if (isBrowser && preventGoogleFontsLoading) {
      preventGoogleFonts();
    }
  }, [preventGoogleFontsLoading]);
  reactExports.useEffect(function validateLoadedState() {
    if (isLoaded) {
      invariant(!!window.google, "useLoadScript was marked as loaded, but window.google is not present. Something went wrong.");
    }
  }, [isLoaded]);
  var url = makeLoadScriptUrl({
    version,
    googleMapsApiKey,
    googleMapsClientId,
    language,
    region,
    libraries,
    channel,
    mapIds,
    authReferrerPolicy,
    apiUrl
  });
  reactExports.useEffect(function loadScriptAndModifyLoadedState() {
    if (!isBrowser) {
      return;
    }
    function setLoadedIfMounted() {
      if (isMounted.current) {
        setLoaded(true);
        previouslyLoadedUrl = url;
      }
    }
    if (window.google && window.google.maps && previouslyLoadedUrl === url) {
      setLoadedIfMounted();
      return;
    }
    injectScript({
      id,
      url,
      nonce
    }).then(setLoadedIfMounted).catch(function handleInjectError(err) {
      if (isMounted.current) {
        setLoadError(err);
      }
      console.warn("\n        There has been an Error with loading Google Maps API script, please check that you provided correct google API key (".concat(googleMapsApiKey || "-", ") or Client ID (").concat(googleMapsClientId || "-", ")\n        Otherwise it is a Network issue.\n      "));
      console.error(err);
    });
  }, [id, url, nonce]);
  var prevLibraries = reactExports.useRef(void 0);
  reactExports.useEffect(function checkPerformance() {
    if (prevLibraries.current && libraries !== prevLibraries.current) {
      console.warn("Performance warning! LoadScript has been reloaded unintentionally! You should not pass `libraries` prop as new array. Please keep an array of libraries as static class property for Components and PureComponents, or just a const variable outside of component, or somewhere in config files or ENV variables");
    }
    prevLibraries.current = libraries;
  }, [libraries]);
  return {
    isLoaded,
    loadError,
    url
  };
}
var _excluded$1 = ["loadingElement", "onLoad", "onError", "onUnmount", "children"];
var defaultLoadingElement = jsxRuntimeExports.jsx(DefaultLoadingElement, {});
function LoadScriptNext(_ref) {
  var {
    loadingElement,
    onLoad,
    onError,
    onUnmount,
    children
  } = _ref, hookOptions = _objectWithoutProperties(_ref, _excluded$1);
  var {
    isLoaded,
    loadError
  } = useLoadScript(hookOptions);
  reactExports.useEffect(function handleOnLoad() {
    if (isLoaded && typeof onLoad === "function") {
      onLoad();
    }
  }, [isLoaded, onLoad]);
  reactExports.useEffect(function handleOnError() {
    if (loadError && typeof onError === "function") {
      onError(loadError);
    }
  }, [loadError, onError]);
  reactExports.useEffect(function handleOnUnmount() {
    return () => {
      if (onUnmount) {
        onUnmount();
      }
    };
  }, [onUnmount]);
  return isLoaded ? children : loadingElement || defaultLoadingElement;
}
reactExports.memo(LoadScriptNext);
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, [])).next());
  });
}
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e2 = new Error(message);
  return e2.name = "SuppressedError", e2.error = error, e2.suppressed = suppressed, e2;
};
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var fastDeepEqual$1 = function equal(a2, b2) {
  if (a2 === b2) return true;
  if (a2 && b2 && typeof a2 == "object" && typeof b2 == "object") {
    if (a2.constructor !== b2.constructor) return false;
    var length2, i2, keys;
    if (Array.isArray(a2)) {
      length2 = a2.length;
      if (length2 != b2.length) return false;
      for (i2 = length2; i2-- !== 0; ) if (!equal(a2[i2], b2[i2])) return false;
      return true;
    }
    if (a2.constructor === RegExp) return a2.source === b2.source && a2.flags === b2.flags;
    if (a2.valueOf !== Object.prototype.valueOf) return a2.valueOf() === b2.valueOf();
    if (a2.toString !== Object.prototype.toString) return a2.toString() === b2.toString();
    keys = Object.keys(a2);
    length2 = keys.length;
    if (length2 !== Object.keys(b2).length) return false;
    for (i2 = length2; i2-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(b2, keys[i2])) return false;
    for (i2 = length2; i2-- !== 0; ) {
      var key = keys[i2];
      if (!equal(a2[key], b2[key])) return false;
    }
    return true;
  }
  return a2 !== a2 && b2 !== b2;
};
var isEqual = /* @__PURE__ */ getDefaultExportFromCjs(fastDeepEqual$1);
var DEFAULT_ID = "__googleMapsScriptId";
var LoaderStatus;
(function(LoaderStatus2) {
  LoaderStatus2[LoaderStatus2["INITIALIZED"] = 0] = "INITIALIZED";
  LoaderStatus2[LoaderStatus2["LOADING"] = 1] = "LOADING";
  LoaderStatus2[LoaderStatus2["SUCCESS"] = 2] = "SUCCESS";
  LoaderStatus2[LoaderStatus2["FAILURE"] = 3] = "FAILURE";
})(LoaderStatus || (LoaderStatus = {}));
class Loader {
  /**
   * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set
   * using this library, instead the defaults are set by the Google Maps
   * JavaScript API server.
   *
   * ```
   * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});
   * ```
   */
  constructor(_ref) {
    var {
      apiKey,
      authReferrerPolicy,
      channel,
      client,
      id = DEFAULT_ID,
      language,
      libraries = [],
      mapIds,
      nonce,
      region,
      retries = 3,
      url = "https://maps.googleapis.com/maps/api/js",
      version
    } = _ref;
    this.callbacks = [];
    this.done = false;
    this.loading = false;
    this.errors = [];
    this.apiKey = apiKey;
    this.authReferrerPolicy = authReferrerPolicy;
    this.channel = channel;
    this.client = client;
    this.id = id || DEFAULT_ID;
    this.language = language;
    this.libraries = libraries;
    this.mapIds = mapIds;
    this.nonce = nonce;
    this.region = region;
    this.retries = retries;
    this.url = url;
    this.version = version;
    if (Loader.instance) {
      if (!isEqual(this.options, Loader.instance.options)) {
        throw new Error("Loader must not be called again with different options. ".concat(JSON.stringify(this.options), " !== ").concat(JSON.stringify(Loader.instance.options)));
      }
      return Loader.instance;
    }
    Loader.instance = this;
  }
  get options() {
    return {
      version: this.version,
      apiKey: this.apiKey,
      channel: this.channel,
      client: this.client,
      id: this.id,
      libraries: this.libraries,
      language: this.language,
      region: this.region,
      mapIds: this.mapIds,
      nonce: this.nonce,
      url: this.url,
      authReferrerPolicy: this.authReferrerPolicy
    };
  }
  get status() {
    if (this.errors.length) {
      return LoaderStatus.FAILURE;
    }
    if (this.done) {
      return LoaderStatus.SUCCESS;
    }
    if (this.loading) {
      return LoaderStatus.LOADING;
    }
    return LoaderStatus.INITIALIZED;
  }
  get failed() {
    return this.done && !this.loading && this.errors.length >= this.retries + 1;
  }
  /**
   * CreateUrl returns the Google Maps JavaScript API script url given the [[LoaderOptions]].
   *
   * @ignore
   * @deprecated
   */
  createUrl() {
    var url = this.url;
    url += "?callback=__googleMapsCallback&loading=async";
    if (this.apiKey) {
      url += "&key=".concat(this.apiKey);
    }
    if (this.channel) {
      url += "&channel=".concat(this.channel);
    }
    if (this.client) {
      url += "&client=".concat(this.client);
    }
    if (this.libraries.length > 0) {
      url += "&libraries=".concat(this.libraries.join(","));
    }
    if (this.language) {
      url += "&language=".concat(this.language);
    }
    if (this.region) {
      url += "&region=".concat(this.region);
    }
    if (this.version) {
      url += "&v=".concat(this.version);
    }
    if (this.mapIds) {
      url += "&map_ids=".concat(this.mapIds.join(","));
    }
    if (this.authReferrerPolicy) {
      url += "&auth_referrer_policy=".concat(this.authReferrerPolicy);
    }
    return url;
  }
  deleteScript() {
    var script = document.getElementById(this.id);
    if (script) {
      script.remove();
    }
  }
  /**
   * Load the Google Maps JavaScript API script and return a Promise.
   * @deprecated, use importLibrary() instead.
   */
  load() {
    return this.loadPromise();
  }
  /**
   * Load the Google Maps JavaScript API script and return a Promise.
   *
   * @ignore
   * @deprecated, use importLibrary() instead.
   */
  loadPromise() {
    return new Promise((resolve, reject) => {
      this.loadCallback((err) => {
        if (!err) {
          resolve(window.google);
        } else {
          reject(err.error);
        }
      });
    });
  }
  importLibrary(name) {
    this.execute();
    return google.maps.importLibrary(name);
  }
  /**
   * Load the Google Maps JavaScript API script with a callback.
   * @deprecated, use importLibrary() instead.
   */
  loadCallback(fn) {
    this.callbacks.push(fn);
    this.execute();
  }
  /**
   * Set the script on document.
   */
  setScript() {
    var _a, _b;
    if (document.getElementById(this.id)) {
      this.callback();
      return;
    }
    var params = {
      key: this.apiKey,
      channel: this.channel,
      client: this.client,
      libraries: this.libraries.length && this.libraries,
      v: this.version,
      mapIds: this.mapIds,
      language: this.language,
      region: this.region,
      authReferrerPolicy: this.authReferrerPolicy
    };
    Object.keys(params).forEach(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (key) => !params[key] && delete params[key]
    );
    if (!((_b = (_a = window === null || window === void 0 ? void 0 : window.google) === null || _a === void 0 ? void 0 : _a.maps) === null || _b === void 0 ? void 0 : _b.importLibrary)) {
      ((g2) => {
        var h2, a2, k, p2 = "The Google Maps JavaScript API", c2 = "google", l2 = "importLibrary", q = "__ib__", m2 = document, b2 = window;
        b2 = b2[c2] || (b2[c2] = {});
        var d2 = b2.maps || (b2.maps = {}), r2 = /* @__PURE__ */ new Set(), e2 = new URLSearchParams(), u2 = () => (
          // @ts-ignore
          h2 || (h2 = new Promise((f2, n2) => __awaiter(this, void 0, void 0, function* () {
            var _a2;
            yield a2 = m2.createElement("script");
            a2.id = this.id;
            e2.set("libraries", [...r2] + "");
            for (k in g2) e2.set(k.replace(/[A-Z]/g, (t2) => "_" + t2[0].toLowerCase()), g2[k]);
            e2.set("callback", c2 + ".maps." + q);
            a2.src = this.url + "?" + e2;
            d2[q] = f2;
            a2.onerror = () => h2 = n2(Error(p2 + " could not load."));
            a2.nonce = this.nonce || ((_a2 = m2.querySelector("script[nonce]")) === null || _a2 === void 0 ? void 0 : _a2.nonce) || "";
            m2.head.append(a2);
          })))
        );
        d2[l2] ? console.warn(p2 + " only loads once. Ignoring:", g2) : d2[l2] = function(f2) {
          for (var _len = arguments.length, n2 = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            n2[_key - 1] = arguments[_key];
          }
          return r2.add(f2) && u2().then(() => d2[l2](f2, ...n2));
        };
      })(params);
    }
    var libraryPromises = this.libraries.map((library) => this.importLibrary(library));
    if (!libraryPromises.length) {
      libraryPromises.push(this.importLibrary("core"));
    }
    Promise.all(libraryPromises).then(() => this.callback(), (error) => {
      var event = new ErrorEvent("error", {
        error
      });
      this.loadErrorCallback(event);
    });
  }
  /**
   * Reset the loader state.
   */
  reset() {
    this.deleteScript();
    this.done = false;
    this.loading = false;
    this.errors = [];
    this.onerrorEvent = null;
  }
  resetIfRetryingFailed() {
    if (this.failed) {
      this.reset();
    }
  }
  loadErrorCallback(e2) {
    this.errors.push(e2);
    if (this.errors.length <= this.retries) {
      var delay = this.errors.length * Math.pow(2, this.errors.length);
      console.error("Failed to load Google Maps script, retrying in ".concat(delay, " ms."));
      setTimeout(() => {
        this.deleteScript();
        this.setScript();
      }, delay);
    } else {
      this.onerrorEvent = e2;
      this.callback();
    }
  }
  callback() {
    this.done = true;
    this.loading = false;
    this.callbacks.forEach((cb) => {
      cb(this.onerrorEvent);
    });
    this.callbacks = [];
  }
  execute() {
    this.resetIfRetryingFailed();
    if (this.loading) {
      return;
    }
    if (this.done) {
      this.callback();
    } else {
      if (window.google && window.google.maps && window.google.maps.version) {
        console.warn("Google Maps already loaded outside @googlemaps/js-api-loader. This may result in undesirable behavior as options and script parameters may not match.");
        this.callback();
        return;
      }
      this.loading = true;
      this.setScript();
    }
  }
}
var defaultLibraries = ["maps"];
function useJsApiLoader(_ref) {
  var {
    id = defaultLoadScriptProps.id,
    version = defaultLoadScriptProps.version,
    nonce,
    googleMapsApiKey,
    // googleMapsClientId,
    language,
    region,
    libraries = defaultLibraries,
    preventGoogleFontsLoading,
    // channel,
    mapIds,
    authReferrerPolicy
  } = _ref;
  var isMounted = reactExports.useRef(false);
  var [isLoaded, setLoaded] = reactExports.useState(false);
  var [loadError, setLoadError] = reactExports.useState(void 0);
  reactExports.useEffect(function trackMountedState() {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  var loader = reactExports.useMemo(() => {
    return new Loader({
      id,
      apiKey: googleMapsApiKey,
      version,
      libraries,
      language: language || "en",
      region: region || "US",
      mapIds: mapIds || [],
      nonce: nonce || "",
      authReferrerPolicy: authReferrerPolicy || "origin"
    });
  }, [id, googleMapsApiKey, version, libraries, language, region, mapIds, nonce, authReferrerPolicy]);
  reactExports.useEffect(function effect() {
    if (isLoaded) {
      return;
    } else {
      loader.load().then(() => {
        if (isMounted.current) {
          setLoaded(true);
        }
        return;
      }).catch((error) => {
        setLoadError(error);
      });
    }
  }, []);
  reactExports.useEffect(() => {
    if (isBrowser && preventGoogleFontsLoading) {
      preventGoogleFonts();
    }
  }, [preventGoogleFontsLoading]);
  var prevLibraries = reactExports.useRef();
  reactExports.useEffect(() => {
    if (prevLibraries.current && libraries !== prevLibraries.current) {
      console.warn("Performance warning! LoadScript has been reloaded unintentionally! You should not pass `libraries` prop as new array. Please keep an array of libraries as static class property for Components and PureComponents, or just a const variable outside of component, or somewhere in config files or ENV variables");
    }
    prevLibraries.current = libraries;
  }, [libraries]);
  return {
    isLoaded,
    loadError
  };
}
function ownKeys$f(e2, r2) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e2);
    r2 && (o2 = o2.filter(function(r22) {
      return Object.getOwnPropertyDescriptor(e2, r22).enumerable;
    })), t2.push.apply(t2, o2);
  }
  return t2;
}
function _objectSpread$f(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$f(Object(t2), true).forEach(function(r22) {
      _defineProperty(e2, r22, t2[r22]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : ownKeys$f(Object(t2)).forEach(function(r22) {
      Object.defineProperty(e2, r22, Object.getOwnPropertyDescriptor(t2, r22));
    });
  }
  return e2;
}
var eventMap$h = {};
var updaterMap$h = {
  options(instance, options) {
    instance.setOptions(options);
  }
};
function TrafficLayerFunctional(_ref) {
  var {
    options,
    onLoad,
    onUnmount
  } = _ref;
  var map = reactExports.useContext(MapContext);
  var [instance, setInstance] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);
  reactExports.useEffect(() => {
    if (options && instance !== null) {
      instance.setOptions(options);
    }
  }, [instance, options]);
  reactExports.useEffect(() => {
    var trafficLayer = new google.maps.TrafficLayer(_objectSpread$f(_objectSpread$f({}, options), {}, {
      map
    }));
    setInstance(trafficLayer);
    if (onLoad) {
      onLoad(trafficLayer);
    }
    return () => {
      if (instance !== null) {
        if (onUnmount) {
          onUnmount(instance);
        }
        instance.setMap(null);
      }
    };
  }, []);
  return null;
}
reactExports.memo(TrafficLayerFunctional);
class TrafficLayer extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      trafficLayer: null
    });
    _defineProperty(this, "setTrafficLayerCallback", () => {
      if (this.state.trafficLayer !== null && this.props.onLoad) {
        this.props.onLoad(this.state.trafficLayer);
      }
    });
    _defineProperty(this, "registeredEvents", []);
  }
  componentDidMount() {
    var trafficLayer = new google.maps.TrafficLayer(_objectSpread$f(_objectSpread$f({}, this.props.options), {}, {
      map: this.context
    }));
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$h,
      eventMap: eventMap$h,
      prevProps: {},
      nextProps: this.props,
      instance: trafficLayer
    });
    this.setState(function setTrafficLayer() {
      return {
        trafficLayer
      };
    }, this.setTrafficLayerCallback);
  }
  componentDidUpdate(prevProps) {
    if (this.state.trafficLayer !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$h,
        eventMap: eventMap$h,
        prevProps,
        nextProps: this.props,
        instance: this.state.trafficLayer
      });
    }
  }
  componentWillUnmount() {
    if (this.state.trafficLayer !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.trafficLayer);
      }
      unregisterEvents(this.registeredEvents);
      this.state.trafficLayer.setMap(null);
    }
  }
  render() {
    return null;
  }
}
_defineProperty(TrafficLayer, "contextType", MapContext);
function BicyclingLayerFunctional(_ref) {
  var {
    onLoad,
    onUnmount
  } = _ref;
  var map = reactExports.useContext(MapContext);
  var [instance, setInstance] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);
  reactExports.useEffect(() => {
    var bicyclingLayer = new google.maps.BicyclingLayer();
    setInstance(bicyclingLayer);
    bicyclingLayer.setMap(map);
    if (onLoad) {
      onLoad(bicyclingLayer);
    }
    return () => {
      if (bicyclingLayer !== null) {
        if (onUnmount) {
          onUnmount(bicyclingLayer);
        }
        bicyclingLayer.setMap(null);
      }
    };
  }, []);
  return null;
}
reactExports.memo(BicyclingLayerFunctional);
class BicyclingLayer extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      bicyclingLayer: null
    });
    _defineProperty(this, "setBicyclingLayerCallback", () => {
      if (this.state.bicyclingLayer !== null) {
        this.state.bicyclingLayer.setMap(this.context);
        if (this.props.onLoad) {
          this.props.onLoad(this.state.bicyclingLayer);
        }
      }
    });
  }
  componentDidMount() {
    var bicyclingLayer = new google.maps.BicyclingLayer();
    this.setState(() => {
      return {
        bicyclingLayer
      };
    }, this.setBicyclingLayerCallback);
  }
  componentWillUnmount() {
    if (this.state.bicyclingLayer !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.bicyclingLayer);
      }
      this.state.bicyclingLayer.setMap(null);
    }
  }
  render() {
    return null;
  }
}
_defineProperty(BicyclingLayer, "contextType", MapContext);
function TransitLayerFunctional(_ref) {
  var {
    onLoad,
    onUnmount
  } = _ref;
  var map = reactExports.useContext(MapContext);
  var [instance, setInstance] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);
  reactExports.useEffect(() => {
    var transitLayer = new google.maps.TransitLayer();
    setInstance(transitLayer);
    transitLayer.setMap(map);
    if (onLoad) {
      onLoad(transitLayer);
    }
    return () => {
      if (instance !== null) {
        if (onUnmount) {
          onUnmount(instance);
        }
        instance.setMap(null);
      }
    };
  }, []);
  return null;
}
reactExports.memo(TransitLayerFunctional);
class TransitLayer extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      transitLayer: null
    });
    _defineProperty(this, "setTransitLayerCallback", () => {
      if (this.state.transitLayer !== null) {
        this.state.transitLayer.setMap(this.context);
        if (this.props.onLoad) {
          this.props.onLoad(this.state.transitLayer);
        }
      }
    });
  }
  componentDidMount() {
    var transitLayer = new google.maps.TransitLayer();
    this.setState(function setTransitLayer() {
      return {
        transitLayer
      };
    }, this.setTransitLayerCallback);
  }
  componentWillUnmount() {
    if (this.state.transitLayer !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.transitLayer);
      }
      this.state.transitLayer.setMap(null);
    }
  }
  render() {
    return null;
  }
}
_defineProperty(TransitLayer, "contextType", MapContext);
function ownKeys$e(e2, r2) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e2);
    r2 && (o2 = o2.filter(function(r22) {
      return Object.getOwnPropertyDescriptor(e2, r22).enumerable;
    })), t2.push.apply(t2, o2);
  }
  return t2;
}
function _objectSpread$e(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$e(Object(t2), true).forEach(function(r22) {
      _defineProperty(e2, r22, t2[r22]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : ownKeys$e(Object(t2)).forEach(function(r22) {
      Object.defineProperty(e2, r22, Object.getOwnPropertyDescriptor(t2, r22));
    });
  }
  return e2;
}
var eventMap$g = {
  onCircleComplete: "circlecomplete",
  onMarkerComplete: "markercomplete",
  onOverlayComplete: "overlaycomplete",
  onPolygonComplete: "polygoncomplete",
  onPolylineComplete: "polylinecomplete",
  onRectangleComplete: "rectanglecomplete"
};
var updaterMap$g = {
  drawingMode(instance, drawingMode) {
    instance.setDrawingMode(drawingMode);
  },
  options(instance, options) {
    instance.setOptions(options);
  }
};
function DrawingManagerFunctional(_ref) {
  var {
    options,
    drawingMode,
    onCircleComplete,
    onMarkerComplete,
    onOverlayComplete,
    onPolygonComplete,
    onPolylineComplete,
    onRectangleComplete,
    onLoad,
    onUnmount
  } = _ref;
  var map = reactExports.useContext(MapContext);
  var [instance, setInstance] = reactExports.useState(null);
  var [circlecompleteListener, setCircleCompleteListener] = reactExports.useState(null);
  var [markercompleteListener, setMarkerCompleteListener] = reactExports.useState(null);
  var [overlaycompleteListener, setOverlayCompleteListener] = reactExports.useState(null);
  var [polygoncompleteListener, setPolygonCompleteListener] = reactExports.useState(null);
  var [polylinecompleteListener, setPolylineCompleteListener] = reactExports.useState(null);
  var [rectanglecompleteListener, setRectangleCompleteListener] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);
  reactExports.useEffect(() => {
    if (options && instance !== null) {
      instance.setOptions(options);
    }
  }, [instance, options]);
  reactExports.useEffect(() => {
    if (instance !== null) {
      instance.setDrawingMode(drawingMode !== null && drawingMode !== void 0 ? drawingMode : null);
    }
  }, [instance, drawingMode]);
  reactExports.useEffect(() => {
    if (instance && onCircleComplete) {
      if (circlecompleteListener !== null) {
        google.maps.event.removeListener(circlecompleteListener);
      }
      setCircleCompleteListener(google.maps.event.addListener(instance, "circlecomplete", onCircleComplete));
    }
  }, [instance, onCircleComplete]);
  reactExports.useEffect(() => {
    if (instance && onMarkerComplete) {
      if (markercompleteListener !== null) {
        google.maps.event.removeListener(markercompleteListener);
      }
      setMarkerCompleteListener(google.maps.event.addListener(instance, "markercomplete", onMarkerComplete));
    }
  }, [instance, onMarkerComplete]);
  reactExports.useEffect(() => {
    if (instance && onOverlayComplete) {
      if (overlaycompleteListener !== null) {
        google.maps.event.removeListener(overlaycompleteListener);
      }
      setOverlayCompleteListener(google.maps.event.addListener(instance, "overlaycomplete", onOverlayComplete));
    }
  }, [instance, onOverlayComplete]);
  reactExports.useEffect(() => {
    if (instance && onPolygonComplete) {
      if (polygoncompleteListener !== null) {
        google.maps.event.removeListener(polygoncompleteListener);
      }
      setPolygonCompleteListener(google.maps.event.addListener(instance, "polygoncomplete", onPolygonComplete));
    }
  }, [instance, onPolygonComplete]);
  reactExports.useEffect(() => {
    if (instance && onPolylineComplete) {
      if (polylinecompleteListener !== null) {
        google.maps.event.removeListener(polylinecompleteListener);
      }
      setPolylineCompleteListener(google.maps.event.addListener(instance, "polylinecomplete", onPolylineComplete));
    }
  }, [instance, onPolylineComplete]);
  reactExports.useEffect(() => {
    if (instance && onRectangleComplete) {
      if (rectanglecompleteListener !== null) {
        google.maps.event.removeListener(rectanglecompleteListener);
      }
      setRectangleCompleteListener(google.maps.event.addListener(instance, "rectanglecomplete", onRectangleComplete));
    }
  }, [instance, onRectangleComplete]);
  reactExports.useEffect(() => {
    invariant(!!google.maps.drawing, "Did you include prop libraries={['drawing']} in the URL? %s", google.maps.drawing);
    var drawingManager = new google.maps.drawing.DrawingManager(_objectSpread$e(_objectSpread$e({}, options), {}, {
      map
    }));
    if (drawingMode) {
      drawingManager.setDrawingMode(drawingMode);
    }
    if (onCircleComplete) {
      setCircleCompleteListener(google.maps.event.addListener(drawingManager, "circlecomplete", onCircleComplete));
    }
    if (onMarkerComplete) {
      setMarkerCompleteListener(google.maps.event.addListener(drawingManager, "markercomplete", onMarkerComplete));
    }
    if (onOverlayComplete) {
      setOverlayCompleteListener(google.maps.event.addListener(drawingManager, "overlaycomplete", onOverlayComplete));
    }
    if (onPolygonComplete) {
      setPolygonCompleteListener(google.maps.event.addListener(drawingManager, "polygoncomplete", onPolygonComplete));
    }
    if (onPolylineComplete) {
      setPolylineCompleteListener(google.maps.event.addListener(drawingManager, "polylinecomplete", onPolylineComplete));
    }
    if (onRectangleComplete) {
      setRectangleCompleteListener(google.maps.event.addListener(drawingManager, "rectanglecomplete", onRectangleComplete));
    }
    setInstance(drawingManager);
    if (onLoad) {
      onLoad(drawingManager);
    }
    return () => {
      if (instance !== null) {
        if (circlecompleteListener) {
          google.maps.event.removeListener(circlecompleteListener);
        }
        if (markercompleteListener) {
          google.maps.event.removeListener(markercompleteListener);
        }
        if (overlaycompleteListener) {
          google.maps.event.removeListener(overlaycompleteListener);
        }
        if (polygoncompleteListener) {
          google.maps.event.removeListener(polygoncompleteListener);
        }
        if (polylinecompleteListener) {
          google.maps.event.removeListener(polylinecompleteListener);
        }
        if (rectanglecompleteListener) {
          google.maps.event.removeListener(rectanglecompleteListener);
        }
        if (onUnmount) {
          onUnmount(instance);
        }
        instance.setMap(null);
      }
    };
  }, []);
  return null;
}
reactExports.memo(DrawingManagerFunctional);
class DrawingManager extends reactExports.PureComponent {
  constructor(props) {
    super(props);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "state", {
      drawingManager: null
    });
    _defineProperty(this, "setDrawingManagerCallback", () => {
      if (this.state.drawingManager !== null && this.props.onLoad) {
        this.props.onLoad(this.state.drawingManager);
      }
    });
    invariant(!!google.maps.drawing, "Did you include prop libraries={['drawing']} in the URL? %s", google.maps.drawing);
  }
  componentDidMount() {
    var drawingManager = new google.maps.drawing.DrawingManager(_objectSpread$e(_objectSpread$e({}, this.props.options), {}, {
      map: this.context
    }));
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$g,
      eventMap: eventMap$g,
      prevProps: {},
      nextProps: this.props,
      instance: drawingManager
    });
    this.setState(function setDrawingManager() {
      return {
        drawingManager
      };
    }, this.setDrawingManagerCallback);
  }
  componentDidUpdate(prevProps) {
    if (this.state.drawingManager !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$g,
        eventMap: eventMap$g,
        prevProps,
        nextProps: this.props,
        instance: this.state.drawingManager
      });
    }
  }
  componentWillUnmount() {
    if (this.state.drawingManager !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.drawingManager);
      }
      unregisterEvents(this.registeredEvents);
      this.state.drawingManager.setMap(null);
    }
  }
  render() {
    return null;
  }
}
_defineProperty(DrawingManager, "contextType", MapContext);
function ownKeys$d(e2, r2) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e2);
    r2 && (o2 = o2.filter(function(r22) {
      return Object.getOwnPropertyDescriptor(e2, r22).enumerable;
    })), t2.push.apply(t2, o2);
  }
  return t2;
}
function _objectSpread$d(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$d(Object(t2), true).forEach(function(r22) {
      _defineProperty(e2, r22, t2[r22]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : ownKeys$d(Object(t2)).forEach(function(r22) {
      Object.defineProperty(e2, r22, Object.getOwnPropertyDescriptor(t2, r22));
    });
  }
  return e2;
}
var eventMap$f = {
  onAnimationChanged: "animation_changed",
  onClick: "click",
  onClickableChanged: "clickable_changed",
  onCursorChanged: "cursor_changed",
  onDblClick: "dblclick",
  onDrag: "drag",
  onDragEnd: "dragend",
  onDraggableChanged: "draggable_changed",
  onDragStart: "dragstart",
  onFlatChanged: "flat_changed",
  onIconChanged: "icon_changed",
  onMouseDown: "mousedown",
  onMouseOut: "mouseout",
  onMouseOver: "mouseover",
  onMouseUp: "mouseup",
  onPositionChanged: "position_changed",
  onRightClick: "rightclick",
  onShapeChanged: "shape_changed",
  onTitleChanged: "title_changed",
  onVisibleChanged: "visible_changed",
  onZindexChanged: "zindex_changed"
};
var updaterMap$f = {
  animation(instance, animation) {
    instance.setAnimation(animation);
  },
  clickable(instance, clickable) {
    instance.setClickable(clickable);
  },
  cursor(instance, cursor2) {
    instance.setCursor(cursor2);
  },
  draggable(instance, draggable) {
    instance.setDraggable(draggable);
  },
  icon(instance, icon) {
    instance.setIcon(icon);
  },
  label(instance, label) {
    instance.setLabel(label);
  },
  map(instance, map) {
    instance.setMap(map);
  },
  opacity(instance, opacity) {
    instance.setOpacity(opacity);
  },
  options(instance, options) {
    instance.setOptions(options);
  },
  position(instance, position2) {
    instance.setPosition(position2);
  },
  shape(instance, shape) {
    instance.setShape(shape);
  },
  title(instance, title) {
    instance.setTitle(title);
  },
  visible(instance, visible) {
    instance.setVisible(visible);
  },
  zIndex(instance, zIndex) {
    instance.setZIndex(zIndex);
  }
};
var defaultOptions$5 = {};
function MarkerFunctional(_ref) {
  var {
    position: position2,
    options,
    clusterer,
    noClustererRedraw,
    children,
    draggable,
    visible,
    animation,
    clickable,
    cursor: cursor2,
    icon,
    label,
    opacity,
    shape,
    title,
    zIndex,
    onClick,
    onDblClick,
    onDrag,
    onDragEnd,
    onDragStart,
    onMouseOut,
    onMouseOver,
    onMouseUp,
    onMouseDown,
    onRightClick,
    onClickableChanged,
    onCursorChanged,
    onAnimationChanged,
    onDraggableChanged,
    onFlatChanged,
    onIconChanged,
    onPositionChanged,
    onShapeChanged,
    onTitleChanged,
    onVisibleChanged,
    onZindexChanged,
    onLoad,
    onUnmount
  } = _ref;
  var map = reactExports.useContext(MapContext);
  var [instance, setInstance] = reactExports.useState(null);
  var [dblclickListener, setDblclickListener] = reactExports.useState(null);
  var [dragendListener, setDragendListener] = reactExports.useState(null);
  var [dragstartListener, setDragstartListener] = reactExports.useState(null);
  var [mousedownListener, setMousedownListener] = reactExports.useState(null);
  var [mouseoutListener, setMouseoutListener] = reactExports.useState(null);
  var [mouseoverListener, setMouseoverListener] = reactExports.useState(null);
  var [mouseupListener, setMouseupListener] = reactExports.useState(null);
  var [rightclickListener, setRightclickListener] = reactExports.useState(null);
  var [clickListener, setClickListener] = reactExports.useState(null);
  var [dragListener, setDragListener] = reactExports.useState(null);
  var [clickableChangedListener, setClickableChangedListener] = reactExports.useState(null);
  var [cursorChangedListener, setCursorChangedListener] = reactExports.useState(null);
  var [animationChangedListener, setAnimationChangedListener] = reactExports.useState(null);
  var [draggableChangedListener, setDraggableChangedListener] = reactExports.useState(null);
  var [flatChangedListener, setFlatChangedListener] = reactExports.useState(null);
  var [iconChangedListener, setIconChangedListener] = reactExports.useState(null);
  var [positionChangedListener, setPositionChangedListener] = reactExports.useState(null);
  var [shapeChangedListener, setShapeChangedListener] = reactExports.useState(null);
  var [titleChangedListener, setTitleChangedListener] = reactExports.useState(null);
  var [visibleChangedListener, setVisibleChangedListener] = reactExports.useState(null);
  var [zIndexChangedListener, setZindexChangedListener] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);
  reactExports.useEffect(() => {
    if (typeof options !== "undefined" && instance !== null) {
      instance.setOptions(options);
    }
  }, [instance, options]);
  reactExports.useEffect(() => {
    if (typeof draggable !== "undefined" && instance !== null) {
      instance.setDraggable(draggable);
    }
  }, [instance, draggable]);
  reactExports.useEffect(() => {
    if (position2 && instance !== null) {
      instance.setPosition(position2);
    }
  }, [instance, position2]);
  reactExports.useEffect(() => {
    if (typeof visible !== "undefined" && instance !== null) {
      instance.setVisible(visible);
    }
  }, [instance, visible]);
  reactExports.useEffect(() => {
    instance === null || instance === void 0 || instance.setAnimation(animation);
  }, [instance, animation]);
  reactExports.useEffect(() => {
    if (instance && clickable !== void 0) {
      instance.setClickable(clickable);
    }
  }, [instance, clickable]);
  reactExports.useEffect(() => {
    if (instance && cursor2 !== void 0) {
      instance.setCursor(cursor2);
    }
  }, [instance, cursor2]);
  reactExports.useEffect(() => {
    if (instance && icon !== void 0) {
      instance.setIcon(icon);
    }
  }, [instance, icon]);
  reactExports.useEffect(() => {
    if (instance && label !== void 0) {
      instance.setLabel(label);
    }
  }, [instance, label]);
  reactExports.useEffect(() => {
    if (instance && opacity !== void 0) {
      instance.setOpacity(opacity);
    }
  }, [instance, opacity]);
  reactExports.useEffect(() => {
    if (instance && shape !== void 0) {
      instance.setShape(shape);
    }
  }, [instance, shape]);
  reactExports.useEffect(() => {
    if (instance && title !== void 0) {
      instance.setTitle(title);
    }
  }, [instance, title]);
  reactExports.useEffect(() => {
    if (instance && zIndex !== void 0) {
      instance.setZIndex(zIndex);
    }
  }, [instance, zIndex]);
  reactExports.useEffect(() => {
    if (instance && onDblClick) {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      setDblclickListener(google.maps.event.addListener(instance, "dblclick", onDblClick));
    }
  }, [onDblClick]);
  reactExports.useEffect(() => {
    if (instance && onDragEnd) {
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }
      setDragendListener(google.maps.event.addListener(instance, "dragend", onDragEnd));
    }
  }, [onDragEnd]);
  reactExports.useEffect(() => {
    if (instance && onDragStart) {
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }
      setDragstartListener(google.maps.event.addListener(instance, "dragstart", onDragStart));
    }
  }, [onDragStart]);
  reactExports.useEffect(() => {
    if (instance && onMouseDown) {
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      setMousedownListener(google.maps.event.addListener(instance, "mousedown", onMouseDown));
    }
  }, [onMouseDown]);
  reactExports.useEffect(() => {
    if (instance && onMouseOut) {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      setMouseoutListener(google.maps.event.addListener(instance, "mouseout", onMouseOut));
    }
  }, [onMouseOut]);
  reactExports.useEffect(() => {
    if (instance && onMouseOver) {
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      setMouseoverListener(google.maps.event.addListener(instance, "mouseover", onMouseOver));
    }
  }, [onMouseOver]);
  reactExports.useEffect(() => {
    if (instance && onMouseUp) {
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      setMouseupListener(google.maps.event.addListener(instance, "mouseup", onMouseUp));
    }
  }, [onMouseUp]);
  reactExports.useEffect(() => {
    if (instance && onRightClick) {
      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener);
      }
      setRightclickListener(google.maps.event.addListener(instance, "rightclick", onRightClick));
    }
  }, [onRightClick]);
  reactExports.useEffect(() => {
    if (instance && onClick) {
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      setClickListener(google.maps.event.addListener(instance, "click", onClick));
    }
  }, [onClick]);
  reactExports.useEffect(() => {
    if (instance && onDrag) {
      if (dragListener !== null) {
        google.maps.event.removeListener(dragListener);
      }
      setDragListener(google.maps.event.addListener(instance, "drag", onDrag));
    }
  }, [onDrag]);
  reactExports.useEffect(() => {
    if (instance && onClickableChanged) {
      if (clickableChangedListener !== null) {
        google.maps.event.removeListener(clickableChangedListener);
      }
      setClickableChangedListener(google.maps.event.addListener(instance, "clickable_changed", onClickableChanged));
    }
  }, [onClickableChanged]);
  reactExports.useEffect(() => {
    if (instance && onCursorChanged) {
      if (cursorChangedListener !== null) {
        google.maps.event.removeListener(cursorChangedListener);
      }
      setCursorChangedListener(google.maps.event.addListener(instance, "cursor_changed", onCursorChanged));
    }
  }, [onCursorChanged]);
  reactExports.useEffect(() => {
    if (instance && onAnimationChanged) {
      if (animationChangedListener !== null) {
        google.maps.event.removeListener(animationChangedListener);
      }
      setAnimationChangedListener(google.maps.event.addListener(instance, "animation_changed", onAnimationChanged));
    }
  }, [onAnimationChanged]);
  reactExports.useEffect(() => {
    if (instance && onDraggableChanged) {
      if (draggableChangedListener !== null) {
        google.maps.event.removeListener(draggableChangedListener);
      }
      setDraggableChangedListener(google.maps.event.addListener(instance, "draggable_changed", onDraggableChanged));
    }
  }, [onDraggableChanged]);
  reactExports.useEffect(() => {
    if (instance && onFlatChanged) {
      if (flatChangedListener !== null) {
        google.maps.event.removeListener(flatChangedListener);
      }
      setFlatChangedListener(google.maps.event.addListener(instance, "flat_changed", onFlatChanged));
    }
  }, [onFlatChanged]);
  reactExports.useEffect(() => {
    if (instance && onIconChanged) {
      if (iconChangedListener !== null) {
        google.maps.event.removeListener(iconChangedListener);
      }
      setIconChangedListener(google.maps.event.addListener(instance, "icon_changed", onIconChanged));
    }
  }, [onIconChanged]);
  reactExports.useEffect(() => {
    if (instance && onPositionChanged) {
      if (positionChangedListener !== null) {
        google.maps.event.removeListener(positionChangedListener);
      }
      setPositionChangedListener(google.maps.event.addListener(instance, "position_changed", onPositionChanged));
    }
  }, [onPositionChanged]);
  reactExports.useEffect(() => {
    if (instance && onShapeChanged) {
      if (shapeChangedListener !== null) {
        google.maps.event.removeListener(shapeChangedListener);
      }
      setShapeChangedListener(google.maps.event.addListener(instance, "shape_changed", onShapeChanged));
    }
  }, [onShapeChanged]);
  reactExports.useEffect(() => {
    if (instance && onTitleChanged) {
      if (titleChangedListener !== null) {
        google.maps.event.removeListener(titleChangedListener);
      }
      setTitleChangedListener(google.maps.event.addListener(instance, "title_changed", onTitleChanged));
    }
  }, [onTitleChanged]);
  reactExports.useEffect(() => {
    if (instance && onVisibleChanged) {
      if (visibleChangedListener !== null) {
        google.maps.event.removeListener(visibleChangedListener);
      }
      setVisibleChangedListener(google.maps.event.addListener(instance, "visible_changed", onVisibleChanged));
    }
  }, [onVisibleChanged]);
  reactExports.useEffect(() => {
    if (instance && onZindexChanged) {
      if (zIndexChangedListener !== null) {
        google.maps.event.removeListener(zIndexChangedListener);
      }
      setZindexChangedListener(google.maps.event.addListener(instance, "zindex_changed", onZindexChanged));
    }
  }, [onZindexChanged]);
  reactExports.useEffect(() => {
    var markerOptions = _objectSpread$d(_objectSpread$d(_objectSpread$d({}, options || defaultOptions$5), clusterer ? defaultOptions$5 : {
      map
    }), {}, {
      position: position2
    });
    var marker = new google.maps.Marker(markerOptions);
    if (clusterer) {
      clusterer.addMarker(marker, !!noClustererRedraw);
    } else {
      marker.setMap(map);
    }
    if (position2) {
      marker.setPosition(position2);
    }
    if (typeof visible !== "undefined") {
      marker.setVisible(visible);
    }
    if (typeof draggable !== "undefined") {
      marker.setDraggable(draggable);
    }
    if (typeof clickable !== "undefined") {
      marker.setClickable(clickable);
    }
    if (typeof cursor2 === "string") {
      marker.setCursor(cursor2);
    }
    if (icon) {
      marker.setIcon(icon);
    }
    if (typeof label !== "undefined") {
      marker.setLabel(label);
    }
    if (typeof opacity !== "undefined") {
      marker.setOpacity(opacity);
    }
    if (shape) {
      marker.setShape(shape);
    }
    if (typeof title === "string") {
      marker.setTitle(title);
    }
    if (typeof zIndex === "number") {
      marker.setZIndex(zIndex);
    }
    if (onDblClick) {
      setDblclickListener(google.maps.event.addListener(marker, "dblclick", onDblClick));
    }
    if (onDragEnd) {
      setDragendListener(google.maps.event.addListener(marker, "dragend", onDragEnd));
    }
    if (onDragStart) {
      setDragstartListener(google.maps.event.addListener(marker, "dragstart", onDragStart));
    }
    if (onMouseDown) {
      setMousedownListener(google.maps.event.addListener(marker, "mousedown", onMouseDown));
    }
    if (onMouseOut) {
      setMouseoutListener(google.maps.event.addListener(marker, "mouseout", onMouseOut));
    }
    if (onMouseOver) {
      setMouseoverListener(google.maps.event.addListener(marker, "mouseover", onMouseOver));
    }
    if (onMouseUp) {
      setMouseupListener(google.maps.event.addListener(marker, "mouseup", onMouseUp));
    }
    if (onRightClick) {
      setRightclickListener(google.maps.event.addListener(marker, "rightclick", onRightClick));
    }
    if (onClick) {
      setClickListener(google.maps.event.addListener(marker, "click", onClick));
    }
    if (onDrag) {
      setDragListener(google.maps.event.addListener(marker, "drag", onDrag));
    }
    if (onClickableChanged) {
      setClickableChangedListener(google.maps.event.addListener(marker, "clickable_changed", onClickableChanged));
    }
    if (onCursorChanged) {
      setCursorChangedListener(google.maps.event.addListener(marker, "cursor_changed", onCursorChanged));
    }
    if (onAnimationChanged) {
      setAnimationChangedListener(google.maps.event.addListener(marker, "animation_changed", onAnimationChanged));
    }
    if (onDraggableChanged) {
      setDraggableChangedListener(google.maps.event.addListener(marker, "draggable_changed", onDraggableChanged));
    }
    if (onFlatChanged) {
      setFlatChangedListener(google.maps.event.addListener(marker, "flat_changed", onFlatChanged));
    }
    if (onIconChanged) {
      setIconChangedListener(google.maps.event.addListener(marker, "icon_changed", onIconChanged));
    }
    if (onPositionChanged) {
      setPositionChangedListener(google.maps.event.addListener(marker, "position_changed", onPositionChanged));
    }
    if (onShapeChanged) {
      setShapeChangedListener(google.maps.event.addListener(marker, "shape_changed", onShapeChanged));
    }
    if (onTitleChanged) {
      setTitleChangedListener(google.maps.event.addListener(marker, "title_changed", onTitleChanged));
    }
    if (onVisibleChanged) {
      setVisibleChangedListener(google.maps.event.addListener(marker, "visible_changed", onVisibleChanged));
    }
    if (onZindexChanged) {
      setZindexChangedListener(google.maps.event.addListener(marker, "zindex_changed", onZindexChanged));
    }
    setInstance(marker);
    if (onLoad) {
      onLoad(marker);
    }
    return () => {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener);
      }
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      if (clickableChangedListener !== null) {
        google.maps.event.removeListener(clickableChangedListener);
      }
      if (cursorChangedListener !== null) {
        google.maps.event.removeListener(cursorChangedListener);
      }
      if (animationChangedListener !== null) {
        google.maps.event.removeListener(animationChangedListener);
      }
      if (draggableChangedListener !== null) {
        google.maps.event.removeListener(draggableChangedListener);
      }
      if (flatChangedListener !== null) {
        google.maps.event.removeListener(flatChangedListener);
      }
      if (iconChangedListener !== null) {
        google.maps.event.removeListener(iconChangedListener);
      }
      if (positionChangedListener !== null) {
        google.maps.event.removeListener(positionChangedListener);
      }
      if (titleChangedListener !== null) {
        google.maps.event.removeListener(titleChangedListener);
      }
      if (visibleChangedListener !== null) {
        google.maps.event.removeListener(visibleChangedListener);
      }
      if (zIndexChangedListener !== null) {
        google.maps.event.removeListener(zIndexChangedListener);
      }
      if (onUnmount) {
        onUnmount(marker);
      }
      if (clusterer) {
        clusterer.removeMarker(marker, !!noClustererRedraw);
      } else if (marker) {
        marker.setMap(null);
      }
    };
  }, []);
  var chx = reactExports.useMemo(() => {
    return children ? reactExports.Children.map(children, (child) => {
      if (!reactExports.isValidElement(child)) {
        return child;
      }
      var elementChild = child;
      return reactExports.cloneElement(elementChild, {
        anchor: instance
      });
    }) : null;
  }, [children, instance]);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
    children: chx
  }) || null;
}
reactExports.memo(MarkerFunctional);
let Marker$1 = class Marker extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
  }
  componentDidMount() {
    var _this = this;
    return _asyncToGenerator(function* () {
      var markerOptions = _objectSpread$d(_objectSpread$d(_objectSpread$d({}, _this.props.options || defaultOptions$5), _this.props.clusterer ? defaultOptions$5 : {
        map: _this.context
      }), {}, {
        position: _this.props.position
      });
      _this.marker = new google.maps.Marker(markerOptions);
      if (_this.props.clusterer) {
        _this.props.clusterer.addMarker(_this.marker, !!_this.props.noClustererRedraw);
      } else {
        _this.marker.setMap(_this.context);
      }
      _this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$f,
        eventMap: eventMap$f,
        prevProps: {},
        nextProps: _this.props,
        instance: _this.marker
      });
      if (_this.props.onLoad) {
        _this.props.onLoad(_this.marker);
      }
    })();
  }
  componentDidUpdate(prevProps) {
    if (this.marker) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$f,
        eventMap: eventMap$f,
        prevProps,
        nextProps: this.props,
        instance: this.marker
      });
    }
  }
  componentWillUnmount() {
    if (!this.marker) {
      return;
    }
    if (this.props.onUnmount) {
      this.props.onUnmount(this.marker);
    }
    unregisterEvents(this.registeredEvents);
    if (this.props.clusterer) {
      this.props.clusterer.removeMarker(this.marker, !!this.props.noClustererRedraw);
    } else if (this.marker) {
      this.marker.setMap(null);
    }
  }
  render() {
    var children = this.props.children ? reactExports.Children.map(this.props.children, (child) => {
      if (!reactExports.isValidElement(child)) {
        return child;
      }
      var elementChild = child;
      return reactExports.cloneElement(elementChild, {
        anchor: this.marker
      });
    }) : null;
    return children || null;
  }
};
_defineProperty(Marker$1, "contextType", MapContext);
var ClusterIcon = (
  /** @class */
  (function() {
    function ClusterIcon2(cluster, styles) {
      cluster.getClusterer().extend(ClusterIcon2, google.maps.OverlayView);
      this.cluster = cluster;
      this.clusterClassName = this.cluster.getClusterer().getClusterClass();
      this.className = this.clusterClassName;
      this.styles = styles;
      this.center = void 0;
      this.div = null;
      this.sums = null;
      this.visible = false;
      this.boundsChangedListener = null;
      this.url = "";
      this.height = 0;
      this.width = 0;
      this.anchorText = [0, 0];
      this.anchorIcon = [0, 0];
      this.textColor = "black";
      this.textSize = 11;
      this.textDecoration = "none";
      this.fontWeight = "bold";
      this.fontStyle = "normal";
      this.fontFamily = "Arial,sans-serif";
      this.backgroundPosition = "0 0";
      this.cMouseDownInCluster = null;
      this.cDraggingMapByCluster = null;
      this.timeOut = null;
      this.setMap(cluster.getMap());
      this.onBoundsChanged = this.onBoundsChanged.bind(this);
      this.onMouseDown = this.onMouseDown.bind(this);
      this.onClick = this.onClick.bind(this);
      this.onMouseOver = this.onMouseOver.bind(this);
      this.onMouseOut = this.onMouseOut.bind(this);
      this.onAdd = this.onAdd.bind(this);
      this.onRemove = this.onRemove.bind(this);
      this.draw = this.draw.bind(this);
      this.hide = this.hide.bind(this);
      this.show = this.show.bind(this);
      this.useStyle = this.useStyle.bind(this);
      this.setCenter = this.setCenter.bind(this);
      this.getPosFromLatLng = this.getPosFromLatLng.bind(this);
    }
    ClusterIcon2.prototype.onBoundsChanged = function() {
      this.cDraggingMapByCluster = this.cMouseDownInCluster;
    };
    ClusterIcon2.prototype.onMouseDown = function() {
      this.cMouseDownInCluster = true;
      this.cDraggingMapByCluster = false;
    };
    ClusterIcon2.prototype.onClick = function(event) {
      this.cMouseDownInCluster = false;
      if (!this.cDraggingMapByCluster) {
        var markerClusterer_1 = this.cluster.getClusterer();
        google.maps.event.trigger(markerClusterer_1, "click", this.cluster);
        google.maps.event.trigger(markerClusterer_1, "clusterclick", this.cluster);
        if (markerClusterer_1.getZoomOnClick()) {
          var maxZoom_1 = markerClusterer_1.getMaxZoom();
          var bounds_1 = this.cluster.getBounds();
          var map = markerClusterer_1.getMap();
          if (map !== null && "fitBounds" in map) {
            map.fitBounds(bounds_1);
          }
          this.timeOut = window.setTimeout(function() {
            var map2 = markerClusterer_1.getMap();
            if (map2 !== null) {
              if ("fitBounds" in map2) {
                map2.fitBounds(bounds_1);
              }
              var zoom = map2.getZoom() || 0;
              if (maxZoom_1 !== null && zoom > maxZoom_1) {
                map2.setZoom(maxZoom_1 + 1);
              }
            }
          }, 100);
        }
        event.cancelBubble = true;
        if (event.stopPropagation) {
          event.stopPropagation();
        }
      }
    };
    ClusterIcon2.prototype.onMouseOver = function() {
      google.maps.event.trigger(this.cluster.getClusterer(), "mouseover", this.cluster);
    };
    ClusterIcon2.prototype.onMouseOut = function() {
      google.maps.event.trigger(this.cluster.getClusterer(), "mouseout", this.cluster);
    };
    ClusterIcon2.prototype.onAdd = function() {
      var _a;
      this.div = document.createElement("div");
      this.div.className = this.className;
      if (this.visible) {
        this.show();
      }
      (_a = this.getPanes()) === null || _a === void 0 ? void 0 : _a.overlayMouseTarget.appendChild(this.div);
      var map = this.getMap();
      if (map !== null) {
        this.boundsChangedListener = google.maps.event.addListener(map, "bounds_changed", this.onBoundsChanged);
        this.div.addEventListener("mousedown", this.onMouseDown);
        this.div.addEventListener("click", this.onClick);
        this.div.addEventListener("mouseover", this.onMouseOver);
        this.div.addEventListener("mouseout", this.onMouseOut);
      }
    };
    ClusterIcon2.prototype.onRemove = function() {
      if (this.div && this.div.parentNode) {
        this.hide();
        if (this.boundsChangedListener !== null) {
          google.maps.event.removeListener(this.boundsChangedListener);
        }
        this.div.removeEventListener("mousedown", this.onMouseDown);
        this.div.removeEventListener("click", this.onClick);
        this.div.removeEventListener("mouseover", this.onMouseOver);
        this.div.removeEventListener("mouseout", this.onMouseOut);
        this.div.parentNode.removeChild(this.div);
        if (this.timeOut !== null) {
          window.clearTimeout(this.timeOut);
          this.timeOut = null;
        }
        this.div = null;
      }
    };
    ClusterIcon2.prototype.draw = function() {
      if (this.visible && this.div !== null && this.center) {
        var pos = this.getPosFromLatLng(this.center);
        this.div.style.top = pos !== null ? "".concat(pos.y, "px") : "0";
        this.div.style.left = pos !== null ? "".concat(pos.x, "px") : "0";
      }
    };
    ClusterIcon2.prototype.hide = function() {
      if (this.div) {
        this.div.style.display = "none";
      }
      this.visible = false;
    };
    ClusterIcon2.prototype.show = function() {
      var _a, _b, _c, _d, _e, _f;
      if (this.div && this.center) {
        var divTitle = this.sums === null || typeof this.sums.title === "undefined" || this.sums.title === "" ? this.cluster.getClusterer().getTitle() : this.sums.title;
        var bp = this.backgroundPosition.split(" ");
        var spriteH = parseInt(((_a = bp[0]) === null || _a === void 0 ? void 0 : _a.replace(/^\s+|\s+$/g, "")) || "0", 10);
        var spriteV = parseInt(((_b = bp[1]) === null || _b === void 0 ? void 0 : _b.replace(/^\s+|\s+$/g, "")) || "0", 10);
        var pos = this.getPosFromLatLng(this.center);
        this.div.className = this.className;
        this.div.setAttribute("style", "cursor: pointer; position: absolute; top: ".concat(pos !== null ? "".concat(pos.y, "px") : "0", "; left: ").concat(pos !== null ? "".concat(pos.x, "px") : "0", "; width: ").concat(this.width, "px; height: ").concat(this.height, "px; "));
        var img = document.createElement("img");
        img.alt = divTitle;
        img.src = this.url;
        img.width = this.width;
        img.height = this.height;
        img.setAttribute("style", "position: absolute; top: ".concat(spriteV, "px; left: ").concat(spriteH, "px"));
        if (!this.cluster.getClusterer().enableRetinaIcons) {
          img.style.clip = "rect(-".concat(spriteV, "px, -").concat(spriteH + this.width, "px, -").concat(spriteV + this.height, ", -").concat(spriteH, ")");
        }
        var textElm = document.createElement("div");
        textElm.setAttribute("style", "position: absolute; top: ".concat(this.anchorText[0], "px; left: ").concat(this.anchorText[1], "px; color: ").concat(this.textColor, "; font-size: ").concat(this.textSize, "px; font-family: ").concat(this.fontFamily, "; font-weight: ").concat(this.fontWeight, "; fontStyle: ").concat(this.fontStyle, "; text-decoration: ").concat(this.textDecoration, "; text-align: center; width: ").concat(this.width, "px; line-height: ").concat(this.height, "px"));
        if ((_c = this.sums) === null || _c === void 0 ? void 0 : _c.text) textElm.innerText = "".concat((_d = this.sums) === null || _d === void 0 ? void 0 : _d.text);
        if ((_e = this.sums) === null || _e === void 0 ? void 0 : _e.html) textElm.innerHTML = "".concat((_f = this.sums) === null || _f === void 0 ? void 0 : _f.html);
        this.div.innerHTML = "";
        this.div.appendChild(img);
        this.div.appendChild(textElm);
        this.div.title = divTitle;
        this.div.style.display = "";
      }
      this.visible = true;
    };
    ClusterIcon2.prototype.useStyle = function(sums) {
      this.sums = sums;
      var styles = this.cluster.getClusterer().getStyles();
      var style = styles[Math.min(styles.length - 1, Math.max(0, sums.index - 1))];
      if (style) {
        this.url = style.url;
        this.height = style.height;
        this.width = style.width;
        if (style.className) {
          this.className = "".concat(this.clusterClassName, " ").concat(style.className);
        }
        this.anchorText = style.anchorText || [0, 0];
        this.anchorIcon = style.anchorIcon || [this.height / 2, this.width / 2];
        this.textColor = style.textColor || "black";
        this.textSize = style.textSize || 11;
        this.textDecoration = style.textDecoration || "none";
        this.fontWeight = style.fontWeight || "bold";
        this.fontStyle = style.fontStyle || "normal";
        this.fontFamily = style.fontFamily || "Arial,sans-serif";
        this.backgroundPosition = style.backgroundPosition || "0 0";
      }
    };
    ClusterIcon2.prototype.setCenter = function(center) {
      this.center = center;
    };
    ClusterIcon2.prototype.getPosFromLatLng = function(latlng) {
      var pos = this.getProjection().fromLatLngToDivPixel(latlng);
      if (pos !== null) {
        pos.x -= this.anchorIcon[1];
        pos.y -= this.anchorIcon[0];
      }
      return pos;
    };
    return ClusterIcon2;
  })()
);
var Cluster$1 = (
  /** @class */
  (function() {
    function Cluster2(markerClusterer) {
      this.markerClusterer = markerClusterer;
      this.map = this.markerClusterer.getMap();
      this.gridSize = this.markerClusterer.getGridSize();
      this.minClusterSize = this.markerClusterer.getMinimumClusterSize();
      this.averageCenter = this.markerClusterer.getAverageCenter();
      this.markers = [];
      this.center = void 0;
      this.bounds = null;
      this.clusterIcon = new ClusterIcon(this, this.markerClusterer.getStyles());
      this.getSize = this.getSize.bind(this);
      this.getMarkers = this.getMarkers.bind(this);
      this.getCenter = this.getCenter.bind(this);
      this.getMap = this.getMap.bind(this);
      this.getClusterer = this.getClusterer.bind(this);
      this.getBounds = this.getBounds.bind(this);
      this.remove = this.remove.bind(this);
      this.addMarker = this.addMarker.bind(this);
      this.isMarkerInClusterBounds = this.isMarkerInClusterBounds.bind(this);
      this.calculateBounds = this.calculateBounds.bind(this);
      this.updateIcon = this.updateIcon.bind(this);
      this.isMarkerAlreadyAdded = this.isMarkerAlreadyAdded.bind(this);
    }
    Cluster2.prototype.getSize = function() {
      return this.markers.length;
    };
    Cluster2.prototype.getMarkers = function() {
      return this.markers;
    };
    Cluster2.prototype.getCenter = function() {
      return this.center;
    };
    Cluster2.prototype.getMap = function() {
      return this.map;
    };
    Cluster2.prototype.getClusterer = function() {
      return this.markerClusterer;
    };
    Cluster2.prototype.getBounds = function() {
      var bounds = new google.maps.LatLngBounds(this.center, this.center);
      var markers = this.getMarkers();
      for (var _i = 0, markers_1 = markers; _i < markers_1.length; _i++) {
        var marker = markers_1[_i];
        var position2 = marker.getPosition();
        if (position2) {
          bounds.extend(position2);
        }
      }
      return bounds;
    };
    Cluster2.prototype.remove = function() {
      this.clusterIcon.setMap(null);
      this.markers = [];
      delete this.markers;
    };
    Cluster2.prototype.addMarker = function(marker) {
      var _a;
      if (this.isMarkerAlreadyAdded(marker)) {
        return false;
      }
      if (!this.center) {
        var position2 = marker.getPosition();
        if (position2) {
          this.center = position2;
          this.calculateBounds();
        }
      } else {
        if (this.averageCenter) {
          var position2 = marker.getPosition();
          if (position2) {
            var length_1 = this.markers.length + 1;
            this.center = new google.maps.LatLng((this.center.lat() * (length_1 - 1) + position2.lat()) / length_1, (this.center.lng() * (length_1 - 1) + position2.lng()) / length_1);
            this.calculateBounds();
          }
        }
      }
      marker.isAdded = true;
      this.markers.push(marker);
      var mCount = this.markers.length;
      var maxZoom = this.markerClusterer.getMaxZoom();
      var zoom = (_a = this.map) === null || _a === void 0 ? void 0 : _a.getZoom();
      if (maxZoom !== null && typeof zoom !== "undefined" && zoom > maxZoom) {
        if (marker.getMap() !== this.map) {
          marker.setMap(this.map);
        }
      } else if (mCount < this.minClusterSize) {
        if (marker.getMap() !== this.map) {
          marker.setMap(this.map);
        }
      } else if (mCount === this.minClusterSize) {
        for (var _i = 0, _b = this.markers; _i < _b.length; _i++) {
          var markerElement = _b[_i];
          markerElement.setMap(null);
        }
      } else {
        marker.setMap(null);
      }
      return true;
    };
    Cluster2.prototype.isMarkerInClusterBounds = function(marker) {
      if (this.bounds !== null) {
        var position2 = marker.getPosition();
        if (position2) {
          return this.bounds.contains(position2);
        }
      }
      return false;
    };
    Cluster2.prototype.calculateBounds = function() {
      this.bounds = this.markerClusterer.getExtendedBounds(new google.maps.LatLngBounds(this.center, this.center));
    };
    Cluster2.prototype.updateIcon = function() {
      var _a;
      var mCount = this.markers.length;
      var maxZoom = this.markerClusterer.getMaxZoom();
      var zoom = (_a = this.map) === null || _a === void 0 ? void 0 : _a.getZoom();
      if (maxZoom !== null && typeof zoom !== "undefined" && zoom > maxZoom) {
        this.clusterIcon.hide();
        return;
      }
      if (mCount < this.minClusterSize) {
        this.clusterIcon.hide();
        return;
      }
      if (this.center) {
        this.clusterIcon.setCenter(this.center);
      }
      this.clusterIcon.useStyle(this.markerClusterer.getCalculator()(this.markers, this.markerClusterer.getStyles().length));
      this.clusterIcon.show();
    };
    Cluster2.prototype.isMarkerAlreadyAdded = function(marker) {
      if (this.markers.includes) {
        return this.markers.includes(marker);
      }
      for (var i2 = 0; i2 < this.markers.length; i2++) {
        if (marker === this.markers[i2]) {
          return true;
        }
      }
      return false;
    };
    return Cluster2;
  })()
);
function CALCULATOR(markers, numStyles) {
  var count = markers.length;
  var numberOfDigits = count.toString().length;
  var index = Math.min(numberOfDigits, numStyles);
  return {
    text: count.toString(),
    index,
    title: ""
  };
}
var BATCH_SIZE = 2e3;
var BATCH_SIZE_IE = 500;
var IMAGE_PATH = "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m";
var IMAGE_EXTENSION = "png";
var IMAGE_SIZES = [53, 56, 66, 78, 90];
var CLUSTERER_CLASS = "cluster";
var Clusterer = (
  /** @class */
  (function() {
    function Clusterer2(map, optMarkers, optOptions) {
      if (optMarkers === void 0) {
        optMarkers = [];
      }
      if (optOptions === void 0) {
        optOptions = {};
      }
      this.getMinimumClusterSize = this.getMinimumClusterSize.bind(this);
      this.setMinimumClusterSize = this.setMinimumClusterSize.bind(this);
      this.getEnableRetinaIcons = this.getEnableRetinaIcons.bind(this);
      this.setEnableRetinaIcons = this.setEnableRetinaIcons.bind(this);
      this.addToClosestCluster = this.addToClosestCluster.bind(this);
      this.getImageExtension = this.getImageExtension.bind(this);
      this.setImageExtension = this.setImageExtension.bind(this);
      this.getExtendedBounds = this.getExtendedBounds.bind(this);
      this.getAverageCenter = this.getAverageCenter.bind(this);
      this.setAverageCenter = this.setAverageCenter.bind(this);
      this.getTotalClusters = this.getTotalClusters.bind(this);
      this.fitMapToMarkers = this.fitMapToMarkers.bind(this);
      this.getIgnoreHidden = this.getIgnoreHidden.bind(this);
      this.setIgnoreHidden = this.setIgnoreHidden.bind(this);
      this.getClusterClass = this.getClusterClass.bind(this);
      this.setClusterClass = this.setClusterClass.bind(this);
      this.getTotalMarkers = this.getTotalMarkers.bind(this);
      this.getZoomOnClick = this.getZoomOnClick.bind(this);
      this.setZoomOnClick = this.setZoomOnClick.bind(this);
      this.getBatchSizeIE = this.getBatchSizeIE.bind(this);
      this.setBatchSizeIE = this.setBatchSizeIE.bind(this);
      this.createClusters = this.createClusters.bind(this);
      this.onZoomChanged = this.onZoomChanged.bind(this);
      this.getImageSizes = this.getImageSizes.bind(this);
      this.setImageSizes = this.setImageSizes.bind(this);
      this.getCalculator = this.getCalculator.bind(this);
      this.setCalculator = this.setCalculator.bind(this);
      this.removeMarkers = this.removeMarkers.bind(this);
      this.resetViewport = this.resetViewport.bind(this);
      this.getImagePath = this.getImagePath.bind(this);
      this.setImagePath = this.setImagePath.bind(this);
      this.pushMarkerTo = this.pushMarkerTo.bind(this);
      this.removeMarker = this.removeMarker.bind(this);
      this.clearMarkers = this.clearMarkers.bind(this);
      this.setupStyles = this.setupStyles.bind(this);
      this.getGridSize = this.getGridSize.bind(this);
      this.setGridSize = this.setGridSize.bind(this);
      this.getClusters = this.getClusters.bind(this);
      this.getMaxZoom = this.getMaxZoom.bind(this);
      this.setMaxZoom = this.setMaxZoom.bind(this);
      this.getMarkers = this.getMarkers.bind(this);
      this.addMarkers = this.addMarkers.bind(this);
      this.getStyles = this.getStyles.bind(this);
      this.setStyles = this.setStyles.bind(this);
      this.addMarker = this.addMarker.bind(this);
      this.onRemove = this.onRemove.bind(this);
      this.getTitle = this.getTitle.bind(this);
      this.setTitle = this.setTitle.bind(this);
      this.repaint = this.repaint.bind(this);
      this.onIdle = this.onIdle.bind(this);
      this.redraw = this.redraw.bind(this);
      this.onAdd = this.onAdd.bind(this);
      this.draw = this.draw.bind(this);
      this.extend = this.extend.bind(this);
      this.extend(Clusterer2, google.maps.OverlayView);
      this.markers = [];
      this.clusters = [];
      this.listeners = [];
      this.activeMap = null;
      this.ready = false;
      this.gridSize = optOptions.gridSize || 60;
      this.minClusterSize = optOptions.minimumClusterSize || 2;
      this.maxZoom = optOptions.maxZoom || null;
      this.styles = optOptions.styles || [];
      this.title = optOptions.title || "";
      this.zoomOnClick = true;
      if (optOptions.zoomOnClick !== void 0) {
        this.zoomOnClick = optOptions.zoomOnClick;
      }
      this.averageCenter = false;
      if (optOptions.averageCenter !== void 0) {
        this.averageCenter = optOptions.averageCenter;
      }
      this.ignoreHidden = false;
      if (optOptions.ignoreHidden !== void 0) {
        this.ignoreHidden = optOptions.ignoreHidden;
      }
      this.enableRetinaIcons = false;
      if (optOptions.enableRetinaIcons !== void 0) {
        this.enableRetinaIcons = optOptions.enableRetinaIcons;
      }
      this.imagePath = optOptions.imagePath || IMAGE_PATH;
      this.imageExtension = optOptions.imageExtension || IMAGE_EXTENSION;
      this.imageSizes = optOptions.imageSizes || IMAGE_SIZES;
      this.calculator = optOptions.calculator || CALCULATOR;
      this.batchSize = optOptions.batchSize || BATCH_SIZE;
      this.batchSizeIE = optOptions.batchSizeIE || BATCH_SIZE_IE;
      this.clusterClass = optOptions.clusterClass || CLUSTERER_CLASS;
      if (navigator.userAgent.toLowerCase().indexOf("msie") !== -1) {
        this.batchSize = this.batchSizeIE;
      }
      this.timerRefStatic = null;
      this.setupStyles();
      this.addMarkers(optMarkers, true);
      this.setMap(map);
    }
    Clusterer2.prototype.onZoomChanged = function() {
      var _a, _b;
      this.resetViewport(false);
      if (((_a = this.getMap()) === null || _a === void 0 ? void 0 : _a.getZoom()) === (this.get("minZoom") || 0) || ((_b = this.getMap()) === null || _b === void 0 ? void 0 : _b.getZoom()) === this.get("maxZoom")) {
        google.maps.event.trigger(this, "idle");
      }
    };
    Clusterer2.prototype.onIdle = function() {
      this.redraw();
    };
    Clusterer2.prototype.onAdd = function() {
      var map = this.getMap();
      this.activeMap = map;
      this.ready = true;
      this.repaint();
      if (map !== null) {
        this.listeners = [google.maps.event.addListener(map, "zoom_changed", this.onZoomChanged), google.maps.event.addListener(map, "idle", this.onIdle)];
      }
    };
    Clusterer2.prototype.onRemove = function() {
      for (var _i = 0, _a = this.markers; _i < _a.length; _i++) {
        var marker = _a[_i];
        if (marker.getMap() !== this.activeMap) {
          marker.setMap(this.activeMap);
        }
      }
      for (var _b = 0, _c = this.clusters; _b < _c.length; _b++) {
        var cluster = _c[_b];
        cluster.remove();
      }
      this.clusters = [];
      for (var _d = 0, _e = this.listeners; _d < _e.length; _d++) {
        var listener = _e[_d];
        google.maps.event.removeListener(listener);
      }
      this.listeners = [];
      this.activeMap = null;
      this.ready = false;
    };
    Clusterer2.prototype.draw = function() {
      return;
    };
    Clusterer2.prototype.getMap = function() {
      return null;
    };
    Clusterer2.prototype.getPanes = function() {
      return null;
    };
    Clusterer2.prototype.getProjection = function() {
      return {
        fromContainerPixelToLatLng: function fromContainerPixelToLatLng() {
          return null;
        },
        fromDivPixelToLatLng: function fromDivPixelToLatLng() {
          return null;
        },
        fromLatLngToContainerPixel: function fromLatLngToContainerPixel() {
          return null;
        },
        fromLatLngToDivPixel: function fromLatLngToDivPixel() {
          return null;
        },
        getVisibleRegion: function getVisibleRegion() {
          return null;
        },
        getWorldWidth: function getWorldWidth() {
          return 0;
        }
      };
    };
    Clusterer2.prototype.setMap = function() {
      return;
    };
    Clusterer2.prototype.addListener = function() {
      return {
        remove: function remove() {
          return;
        }
      };
    };
    Clusterer2.prototype.bindTo = function() {
      return;
    };
    Clusterer2.prototype.get = function() {
      return;
    };
    Clusterer2.prototype.notify = function() {
      return;
    };
    Clusterer2.prototype.set = function() {
      return;
    };
    Clusterer2.prototype.setValues = function() {
      return;
    };
    Clusterer2.prototype.unbind = function() {
      return;
    };
    Clusterer2.prototype.unbindAll = function() {
      return;
    };
    Clusterer2.prototype.setupStyles = function() {
      if (this.styles.length > 0) {
        return;
      }
      for (var i2 = 0; i2 < this.imageSizes.length; i2++) {
        this.styles.push({
          url: "".concat(this.imagePath + (i2 + 1), ".").concat(this.imageExtension),
          height: this.imageSizes[i2] || 0,
          width: this.imageSizes[i2] || 0
        });
      }
    };
    Clusterer2.prototype.fitMapToMarkers = function() {
      var markers = this.getMarkers();
      var bounds = new google.maps.LatLngBounds();
      for (var _i = 0, markers_1 = markers; _i < markers_1.length; _i++) {
        var marker = markers_1[_i];
        var position2 = marker.getPosition();
        if (position2) {
          bounds.extend(position2);
        }
      }
      var map = this.getMap();
      if (map !== null && "fitBounds" in map) {
        map.fitBounds(bounds);
      }
    };
    Clusterer2.prototype.getGridSize = function() {
      return this.gridSize;
    };
    Clusterer2.prototype.setGridSize = function(gridSize) {
      this.gridSize = gridSize;
    };
    Clusterer2.prototype.getMinimumClusterSize = function() {
      return this.minClusterSize;
    };
    Clusterer2.prototype.setMinimumClusterSize = function(minimumClusterSize) {
      this.minClusterSize = minimumClusterSize;
    };
    Clusterer2.prototype.getMaxZoom = function() {
      return this.maxZoom;
    };
    Clusterer2.prototype.setMaxZoom = function(maxZoom) {
      this.maxZoom = maxZoom;
    };
    Clusterer2.prototype.getStyles = function() {
      return this.styles;
    };
    Clusterer2.prototype.setStyles = function(styles) {
      this.styles = styles;
    };
    Clusterer2.prototype.getTitle = function() {
      return this.title;
    };
    Clusterer2.prototype.setTitle = function(title) {
      this.title = title;
    };
    Clusterer2.prototype.getZoomOnClick = function() {
      return this.zoomOnClick;
    };
    Clusterer2.prototype.setZoomOnClick = function(zoomOnClick) {
      this.zoomOnClick = zoomOnClick;
    };
    Clusterer2.prototype.getAverageCenter = function() {
      return this.averageCenter;
    };
    Clusterer2.prototype.setAverageCenter = function(averageCenter) {
      this.averageCenter = averageCenter;
    };
    Clusterer2.prototype.getIgnoreHidden = function() {
      return this.ignoreHidden;
    };
    Clusterer2.prototype.setIgnoreHidden = function(ignoreHidden) {
      this.ignoreHidden = ignoreHidden;
    };
    Clusterer2.prototype.getEnableRetinaIcons = function() {
      return this.enableRetinaIcons;
    };
    Clusterer2.prototype.setEnableRetinaIcons = function(enableRetinaIcons) {
      this.enableRetinaIcons = enableRetinaIcons;
    };
    Clusterer2.prototype.getImageExtension = function() {
      return this.imageExtension;
    };
    Clusterer2.prototype.setImageExtension = function(imageExtension) {
      this.imageExtension = imageExtension;
    };
    Clusterer2.prototype.getImagePath = function() {
      return this.imagePath;
    };
    Clusterer2.prototype.setImagePath = function(imagePath) {
      this.imagePath = imagePath;
    };
    Clusterer2.prototype.getImageSizes = function() {
      return this.imageSizes;
    };
    Clusterer2.prototype.setImageSizes = function(imageSizes) {
      this.imageSizes = imageSizes;
    };
    Clusterer2.prototype.getCalculator = function() {
      return this.calculator;
    };
    Clusterer2.prototype.setCalculator = function(calculator) {
      this.calculator = calculator;
    };
    Clusterer2.prototype.getBatchSizeIE = function() {
      return this.batchSizeIE;
    };
    Clusterer2.prototype.setBatchSizeIE = function(batchSizeIE) {
      this.batchSizeIE = batchSizeIE;
    };
    Clusterer2.prototype.getClusterClass = function() {
      return this.clusterClass;
    };
    Clusterer2.prototype.setClusterClass = function(clusterClass) {
      this.clusterClass = clusterClass;
    };
    Clusterer2.prototype.getMarkers = function() {
      return this.markers;
    };
    Clusterer2.prototype.getTotalMarkers = function() {
      return this.markers.length;
    };
    Clusterer2.prototype.getClusters = function() {
      return this.clusters;
    };
    Clusterer2.prototype.getTotalClusters = function() {
      return this.clusters.length;
    };
    Clusterer2.prototype.addMarker = function(marker, optNoDraw) {
      this.pushMarkerTo(marker);
      if (!optNoDraw) {
        this.redraw();
      }
    };
    Clusterer2.prototype.addMarkers = function(markers, optNoDraw) {
      for (var key in markers) {
        if (Object.prototype.hasOwnProperty.call(markers, key)) {
          var marker = markers[key];
          if (marker) {
            this.pushMarkerTo(marker);
          }
        }
      }
      if (!optNoDraw) {
        this.redraw();
      }
    };
    Clusterer2.prototype.pushMarkerTo = function(marker) {
      var _this = this;
      if (marker.getDraggable()) {
        google.maps.event.addListener(marker, "dragend", function() {
          if (_this.ready) {
            marker.isAdded = false;
            _this.repaint();
          }
        });
      }
      marker.isAdded = false;
      this.markers.push(marker);
    };
    Clusterer2.prototype.removeMarker_ = function(marker) {
      var index = -1;
      if (this.markers.indexOf) {
        index = this.markers.indexOf(marker);
      } else {
        for (var i2 = 0; i2 < this.markers.length; i2++) {
          if (marker === this.markers[i2]) {
            index = i2;
            break;
          }
        }
      }
      if (index === -1) {
        return false;
      }
      marker.setMap(null);
      this.markers.splice(index, 1);
      return true;
    };
    Clusterer2.prototype.removeMarker = function(marker, optNoDraw) {
      var removed = this.removeMarker_(marker);
      if (!optNoDraw && removed) {
        this.repaint();
      }
      return removed;
    };
    Clusterer2.prototype.removeMarkers = function(markers, optNoDraw) {
      var removed = false;
      for (var _i = 0, markers_2 = markers; _i < markers_2.length; _i++) {
        var marker = markers_2[_i];
        removed = removed || this.removeMarker_(marker);
      }
      if (!optNoDraw && removed) {
        this.repaint();
      }
      return removed;
    };
    Clusterer2.prototype.clearMarkers = function() {
      this.resetViewport(true);
      this.markers = [];
    };
    Clusterer2.prototype.repaint = function() {
      var oldClusters = this.clusters.slice();
      this.clusters = [];
      this.resetViewport(false);
      this.redraw();
      setTimeout(function timeout() {
        for (var _i = 0, oldClusters_1 = oldClusters; _i < oldClusters_1.length; _i++) {
          var oldCluster = oldClusters_1[_i];
          oldCluster.remove();
        }
      }, 0);
    };
    Clusterer2.prototype.getExtendedBounds = function(bounds) {
      var projection = this.getProjection();
      var trPix = projection.fromLatLngToDivPixel(
        // Turn the bounds into latlng.
        new google.maps.LatLng(bounds.getNorthEast().lat(), bounds.getNorthEast().lng())
      );
      if (trPix !== null) {
        trPix.x += this.gridSize;
        trPix.y -= this.gridSize;
      }
      var blPix = projection.fromLatLngToDivPixel(
        // Turn the bounds into latlng.
        new google.maps.LatLng(bounds.getSouthWest().lat(), bounds.getSouthWest().lng())
      );
      if (blPix !== null) {
        blPix.x -= this.gridSize;
        blPix.y += this.gridSize;
      }
      if (trPix !== null) {
        var point1 = projection.fromDivPixelToLatLng(trPix);
        if (point1 !== null) {
          bounds.extend(point1);
        }
      }
      if (blPix !== null) {
        var point2 = projection.fromDivPixelToLatLng(blPix);
        if (point2 !== null) {
          bounds.extend(point2);
        }
      }
      return bounds;
    };
    Clusterer2.prototype.redraw = function() {
      this.createClusters(0);
    };
    Clusterer2.prototype.resetViewport = function(optHide) {
      for (var _i = 0, _a = this.clusters; _i < _a.length; _i++) {
        var cluster = _a[_i];
        cluster.remove();
      }
      this.clusters = [];
      for (var _b = 0, _c = this.markers; _b < _c.length; _b++) {
        var marker = _c[_b];
        marker.isAdded = false;
        if (optHide) {
          marker.setMap(null);
        }
      }
    };
    Clusterer2.prototype.distanceBetweenPoints = function(p1, p2) {
      var R2 = 6371;
      var dLat = (p2.lat() - p1.lat()) * Math.PI / 180;
      var dLon = (p2.lng() - p1.lng()) * Math.PI / 180;
      var a2 = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(p1.lat() * Math.PI / 180) * Math.cos(p2.lat() * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      return R2 * (2 * Math.atan2(Math.sqrt(a2), Math.sqrt(1 - a2)));
    };
    Clusterer2.prototype.isMarkerInBounds = function(marker, bounds) {
      var position2 = marker.getPosition();
      if (position2) {
        return bounds.contains(position2);
      }
      return false;
    };
    Clusterer2.prototype.addToClosestCluster = function(marker) {
      var cluster;
      var distance = 4e4;
      var clusterToAddTo = null;
      for (var _i = 0, _a = this.clusters; _i < _a.length; _i++) {
        var clusterElement = _a[_i];
        cluster = clusterElement;
        var center = cluster.getCenter();
        var position2 = marker.getPosition();
        if (center && position2) {
          var d2 = this.distanceBetweenPoints(center, position2);
          if (d2 < distance) {
            distance = d2;
            clusterToAddTo = cluster;
          }
        }
      }
      if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)) {
        clusterToAddTo.addMarker(marker);
      } else {
        cluster = new Cluster$1(this);
        cluster.addMarker(marker);
        this.clusters.push(cluster);
      }
    };
    Clusterer2.prototype.createClusters = function(iFirst) {
      var _this = this;
      if (!this.ready) {
        return;
      }
      if (iFirst === 0) {
        google.maps.event.trigger(this, "clusteringbegin", this);
        if (this.timerRefStatic !== null) {
          window.clearTimeout(this.timerRefStatic);
          delete this.timerRefStatic;
        }
      }
      var map = this.getMap();
      var bounds = map !== null && "getBounds" in map ? map.getBounds() : null;
      var zoom = (map === null || map === void 0 ? void 0 : map.getZoom()) || 0;
      var mapBounds = zoom > 3 ? new google.maps.LatLngBounds(bounds === null || bounds === void 0 ? void 0 : bounds.getSouthWest(), bounds === null || bounds === void 0 ? void 0 : bounds.getNorthEast()) : new google.maps.LatLngBounds(new google.maps.LatLng(85.02070771743472, -178.48388434375), new google.maps.LatLng(-85.08136444384544, 178.00048865625));
      var extendedMapBounds = this.getExtendedBounds(mapBounds);
      var iLast = Math.min(iFirst + this.batchSize, this.markers.length);
      for (var i2 = iFirst; i2 < iLast; i2++) {
        var marker = this.markers[i2];
        if (marker && !marker.isAdded && this.isMarkerInBounds(marker, extendedMapBounds) && (!this.ignoreHidden || this.ignoreHidden && marker.getVisible())) {
          this.addToClosestCluster(marker);
        }
      }
      if (iLast < this.markers.length) {
        this.timerRefStatic = window.setTimeout(function() {
          _this.createClusters(iLast);
        }, 0);
      } else {
        this.timerRefStatic = null;
        google.maps.event.trigger(this, "clusteringend", this);
        for (var _i = 0, _a = this.clusters; _i < _a.length; _i++) {
          var cluster = _a[_i];
          cluster.updateIcon();
        }
      }
    };
    Clusterer2.prototype.extend = function(obj1, obj2) {
      return (function applyExtend(object) {
        for (var property in object.prototype) {
          var prop = property;
          this.prototype[prop] = object.prototype[prop];
        }
        return this;
      }).apply(obj1, [obj2]);
    };
    return Clusterer2;
  })()
);
function ownKeys$c(e2, r2) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e2);
    r2 && (o2 = o2.filter(function(r22) {
      return Object.getOwnPropertyDescriptor(e2, r22).enumerable;
    })), t2.push.apply(t2, o2);
  }
  return t2;
}
function _objectSpread$c(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$c(Object(t2), true).forEach(function(r22) {
      _defineProperty(e2, r22, t2[r22]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : ownKeys$c(Object(t2)).forEach(function(r22) {
      Object.defineProperty(e2, r22, Object.getOwnPropertyDescriptor(t2, r22));
    });
  }
  return e2;
}
var eventMap$e = {
  onClick: "click",
  onClusteringBegin: "clusteringbegin",
  onClusteringEnd: "clusteringend",
  onMouseOut: "mouseout",
  onMouseOver: "mouseover"
};
var updaterMap$e = {
  averageCenter(instance, averageCenter) {
    instance.setAverageCenter(averageCenter);
  },
  batchSizeIE(instance, batchSizeIE) {
    instance.setBatchSizeIE(batchSizeIE);
  },
  calculator(instance, calculator) {
    instance.setCalculator(calculator);
  },
  clusterClass(instance, clusterClass) {
    instance.setClusterClass(clusterClass);
  },
  enableRetinaIcons(instance, enableRetinaIcons) {
    instance.setEnableRetinaIcons(enableRetinaIcons);
  },
  gridSize(instance, gridSize) {
    instance.setGridSize(gridSize);
  },
  ignoreHidden(instance, ignoreHidden) {
    instance.setIgnoreHidden(ignoreHidden);
  },
  imageExtension(instance, imageExtension) {
    instance.setImageExtension(imageExtension);
  },
  imagePath(instance, imagePath) {
    instance.setImagePath(imagePath);
  },
  imageSizes(instance, imageSizes) {
    instance.setImageSizes(imageSizes);
  },
  maxZoom(instance, maxZoom) {
    instance.setMaxZoom(maxZoom);
  },
  minimumClusterSize(instance, minimumClusterSize) {
    instance.setMinimumClusterSize(minimumClusterSize);
  },
  styles(instance, styles) {
    instance.setStyles(styles);
  },
  title(instance, title) {
    instance.setTitle(title);
  },
  zoomOnClick(instance, zoomOnClick) {
    instance.setZoomOnClick(zoomOnClick);
  }
};
var defaultOptions$4 = {};
function MarkerClustererFunctional(props) {
  var {
    children,
    options,
    averageCenter,
    batchSizeIE,
    calculator,
    clusterClass,
    enableRetinaIcons,
    gridSize,
    ignoreHidden,
    imageExtension,
    imagePath,
    imageSizes,
    maxZoom,
    minimumClusterSize,
    styles,
    title,
    zoomOnClick,
    onClick,
    onClusteringBegin,
    onClusteringEnd,
    onMouseOver,
    onMouseOut,
    onLoad,
    onUnmount
  } = props;
  var [instance, setInstance] = reactExports.useState(null);
  var map = reactExports.useContext(MapContext);
  var [clickListener, setClickListener] = reactExports.useState(null);
  var [clusteringBeginListener, setClusteringBeginListener] = reactExports.useState(null);
  var [clusteringEndListener, setClusteringEndListener] = reactExports.useState(null);
  var [mouseoutListener, setMouseoutListener] = reactExports.useState(null);
  var [mouseoverListener, setMouseoverListener] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (instance && onMouseOut) {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      setMouseoutListener(google.maps.event.addListener(instance, eventMap$e.onMouseOut, onMouseOut));
    }
  }, [onMouseOut]);
  reactExports.useEffect(() => {
    if (instance && onMouseOver) {
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      setMouseoverListener(google.maps.event.addListener(instance, eventMap$e.onMouseOver, onMouseOver));
    }
  }, [onMouseOver]);
  reactExports.useEffect(() => {
    if (instance && onClick) {
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      setClickListener(google.maps.event.addListener(instance, eventMap$e.onClick, onClick));
    }
  }, [onClick]);
  reactExports.useEffect(() => {
    if (instance && onClusteringBegin) {
      if (clusteringBeginListener !== null) {
        google.maps.event.removeListener(clusteringBeginListener);
      }
      setClusteringBeginListener(google.maps.event.addListener(instance, eventMap$e.onClusteringBegin, onClusteringBegin));
    }
  }, [onClusteringBegin]);
  reactExports.useEffect(() => {
    if (instance && onClusteringEnd) {
      if (clusteringEndListener !== null) {
        google.maps.event.removeListener(clusteringEndListener);
      }
      setClusteringBeginListener(google.maps.event.addListener(instance, eventMap$e.onClusteringEnd, onClusteringEnd));
    }
  }, [onClusteringEnd]);
  reactExports.useEffect(() => {
    if (typeof averageCenter !== "undefined" && instance !== null) {
      updaterMap$e.averageCenter(instance, averageCenter);
    }
  }, [instance, averageCenter]);
  reactExports.useEffect(() => {
    if (typeof batchSizeIE !== "undefined" && instance !== null) {
      updaterMap$e.batchSizeIE(instance, batchSizeIE);
    }
  }, [instance, batchSizeIE]);
  reactExports.useEffect(() => {
    if (typeof calculator !== "undefined" && instance !== null) {
      updaterMap$e.calculator(instance, calculator);
    }
  }, [instance, calculator]);
  reactExports.useEffect(() => {
    if (typeof clusterClass !== "undefined" && instance !== null) {
      updaterMap$e.clusterClass(instance, clusterClass);
    }
  }, [instance, clusterClass]);
  reactExports.useEffect(() => {
    if (typeof enableRetinaIcons !== "undefined" && instance !== null) {
      updaterMap$e.enableRetinaIcons(instance, enableRetinaIcons);
    }
  }, [instance, enableRetinaIcons]);
  reactExports.useEffect(() => {
    if (typeof gridSize !== "undefined" && instance !== null) {
      updaterMap$e.gridSize(instance, gridSize);
    }
  }, [instance, gridSize]);
  reactExports.useEffect(() => {
    if (typeof ignoreHidden !== "undefined" && instance !== null) {
      updaterMap$e.ignoreHidden(instance, ignoreHidden);
    }
  }, [instance, ignoreHidden]);
  reactExports.useEffect(() => {
    if (typeof imageExtension !== "undefined" && instance !== null) {
      updaterMap$e.imageExtension(instance, imageExtension);
    }
  }, [instance, imageExtension]);
  reactExports.useEffect(() => {
    if (typeof imagePath !== "undefined" && instance !== null) {
      updaterMap$e.imagePath(instance, imagePath);
    }
  }, [instance, imagePath]);
  reactExports.useEffect(() => {
    if (typeof imageSizes !== "undefined" && instance !== null) {
      updaterMap$e.imageSizes(instance, imageSizes);
    }
  }, [instance, imageSizes]);
  reactExports.useEffect(() => {
    if (typeof maxZoom !== "undefined" && instance !== null) {
      updaterMap$e.maxZoom(instance, maxZoom);
    }
  }, [instance, maxZoom]);
  reactExports.useEffect(() => {
    if (typeof minimumClusterSize !== "undefined" && instance !== null) {
      updaterMap$e.minimumClusterSize(instance, minimumClusterSize);
    }
  }, [instance, minimumClusterSize]);
  reactExports.useEffect(() => {
    if (typeof styles !== "undefined" && instance !== null) {
      updaterMap$e.styles(instance, styles);
    }
  }, [instance, styles]);
  reactExports.useEffect(() => {
    if (typeof title !== "undefined" && instance !== null) {
      updaterMap$e.title(instance, title);
    }
  }, [instance, title]);
  reactExports.useEffect(() => {
    if (typeof zoomOnClick !== "undefined" && instance !== null) {
      updaterMap$e.zoomOnClick(instance, zoomOnClick);
    }
  }, [instance, zoomOnClick]);
  reactExports.useEffect(() => {
    if (!map) return;
    var clustererOptions = _objectSpread$c({}, options || defaultOptions$4);
    var clusterer = new Clusterer(map, [], clustererOptions);
    if (averageCenter) {
      updaterMap$e.averageCenter(clusterer, averageCenter);
    }
    if (batchSizeIE) {
      updaterMap$e.batchSizeIE(clusterer, batchSizeIE);
    }
    if (calculator) {
      updaterMap$e.calculator(clusterer, calculator);
    }
    if (clusterClass) {
      updaterMap$e.clusterClass(clusterer, clusterClass);
    }
    if (enableRetinaIcons) {
      updaterMap$e.enableRetinaIcons(clusterer, enableRetinaIcons);
    }
    if (gridSize) {
      updaterMap$e.gridSize(clusterer, gridSize);
    }
    if (ignoreHidden) {
      updaterMap$e.ignoreHidden(clusterer, ignoreHidden);
    }
    if (imageExtension) {
      updaterMap$e.imageExtension(clusterer, imageExtension);
    }
    if (imagePath) {
      updaterMap$e.imagePath(clusterer, imagePath);
    }
    if (imageSizes) {
      updaterMap$e.imageSizes(clusterer, imageSizes);
    }
    if (maxZoom) {
      updaterMap$e.maxZoom(clusterer, maxZoom);
    }
    if (minimumClusterSize) {
      updaterMap$e.minimumClusterSize(clusterer, minimumClusterSize);
    }
    if (styles) {
      updaterMap$e.styles(clusterer, styles);
    }
    if (title) {
      updaterMap$e.title(clusterer, title);
    }
    if (zoomOnClick) {
      updaterMap$e.zoomOnClick(clusterer, zoomOnClick);
    }
    if (onMouseOut) {
      setMouseoutListener(google.maps.event.addListener(clusterer, eventMap$e.onMouseOut, onMouseOut));
    }
    if (onMouseOver) {
      setMouseoverListener(google.maps.event.addListener(clusterer, eventMap$e.onMouseOver, onMouseOver));
    }
    if (onClick) {
      setClickListener(google.maps.event.addListener(clusterer, eventMap$e.onClick, onClick));
    }
    if (onClusteringBegin) {
      setClusteringBeginListener(google.maps.event.addListener(clusterer, eventMap$e.onClusteringBegin, onClusteringBegin));
    }
    if (onClusteringEnd) {
      setClusteringEndListener(google.maps.event.addListener(clusterer, eventMap$e.onClusteringEnd, onClusteringEnd));
    }
    setInstance(clusterer);
    if (onLoad) {
      onLoad(clusterer);
    }
    return () => {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      if (clusteringBeginListener !== null) {
        google.maps.event.removeListener(clusteringBeginListener);
      }
      if (clusteringEndListener !== null) {
        google.maps.event.removeListener(clusteringEndListener);
      }
      if (onUnmount) {
        onUnmount(clusterer);
      }
    };
  }, []);
  return instance !== null ? children(instance) || null : null;
}
reactExports.memo(MarkerClustererFunctional);
class ClustererComponent extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "state", {
      markerClusterer: null
    });
    _defineProperty(this, "setClustererCallback", () => {
      if (this.state.markerClusterer !== null && this.props.onLoad) {
        this.props.onLoad(this.state.markerClusterer);
      }
    });
  }
  componentDidMount() {
    if (this.context) {
      var markerClusterer = new Clusterer(this.context, [], this.props.options);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$e,
        eventMap: eventMap$e,
        prevProps: {},
        nextProps: this.props,
        instance: markerClusterer
      });
      this.setState(() => {
        return {
          markerClusterer
        };
      }, this.setClustererCallback);
    }
  }
  componentDidUpdate(prevProps) {
    if (this.state.markerClusterer) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$e,
        eventMap: eventMap$e,
        prevProps,
        nextProps: this.props,
        instance: this.state.markerClusterer
      });
    }
  }
  componentWillUnmount() {
    if (this.state.markerClusterer !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.markerClusterer);
      }
      unregisterEvents(this.registeredEvents);
      this.state.markerClusterer.setMap(null);
    }
  }
  render() {
    return this.state.markerClusterer !== null ? this.props.children(this.state.markerClusterer) : null;
  }
}
_defineProperty(ClustererComponent, "contextType", MapContext);
function cancelHandler(event) {
  event.cancelBubble = true;
  if (event.stopPropagation) {
    event.stopPropagation();
  }
}
var InfoBox = (
  /** @class */
  (function() {
    function InfoBox2(options) {
      if (options === void 0) {
        options = {};
      }
      this.getCloseClickHandler = this.getCloseClickHandler.bind(this);
      this.closeClickHandler = this.closeClickHandler.bind(this);
      this.createInfoBoxDiv = this.createInfoBoxDiv.bind(this);
      this.addClickHandler = this.addClickHandler.bind(this);
      this.getCloseBoxImg = this.getCloseBoxImg.bind(this);
      this.getBoxWidths = this.getBoxWidths.bind(this);
      this.setBoxStyle = this.setBoxStyle.bind(this);
      this.setPosition = this.setPosition.bind(this);
      this.getPosition = this.getPosition.bind(this);
      this.setOptions = this.setOptions.bind(this);
      this.setContent = this.setContent.bind(this);
      this.setVisible = this.setVisible.bind(this);
      this.getContent = this.getContent.bind(this);
      this.getVisible = this.getVisible.bind(this);
      this.setZIndex = this.setZIndex.bind(this);
      this.getZIndex = this.getZIndex.bind(this);
      this.onRemove = this.onRemove.bind(this);
      this.panBox = this.panBox.bind(this);
      this.extend = this.extend.bind(this);
      this.close = this.close.bind(this);
      this.draw = this.draw.bind(this);
      this.show = this.show.bind(this);
      this.hide = this.hide.bind(this);
      this.open = this.open.bind(this);
      this.extend(InfoBox2, google.maps.OverlayView);
      this.content = options.content || "";
      this.disableAutoPan = options.disableAutoPan || false;
      this.maxWidth = options.maxWidth || 0;
      this.pixelOffset = options.pixelOffset || new google.maps.Size(0, 0);
      this.position = options.position || new google.maps.LatLng(0, 0);
      this.zIndex = options.zIndex || null;
      this.boxClass = options.boxClass || "infoBox";
      this.boxStyle = options.boxStyle || {};
      this.closeBoxMargin = options.closeBoxMargin || "2px";
      this.closeBoxURL = options.closeBoxURL || "http://www.google.com/intl/en_us/mapfiles/close.gif";
      if (options.closeBoxURL === "") {
        this.closeBoxURL = "";
      }
      this.infoBoxClearance = options.infoBoxClearance || new google.maps.Size(1, 1);
      if (typeof options.visible === "undefined") {
        if (typeof options.isHidden === "undefined") {
          options.visible = true;
        } else {
          options.visible = !options.isHidden;
        }
      }
      this.isHidden = !options.visible;
      this.alignBottom = options.alignBottom || false;
      this.pane = options.pane || "floatPane";
      this.enableEventPropagation = options.enableEventPropagation || false;
      this.div = null;
      this.closeListener = null;
      this.moveListener = null;
      this.mapListener = null;
      this.contextListener = null;
      this.eventListeners = null;
      this.fixedWidthSet = null;
    }
    InfoBox2.prototype.createInfoBoxDiv = function() {
      var _this = this;
      var ignoreHandler = function ignoreHandler2(event) {
        event.returnValue = false;
        if (event.preventDefault) {
          event.preventDefault();
        }
        if (!_this.enableEventPropagation) {
          cancelHandler(event);
        }
      };
      if (!this.div) {
        this.div = document.createElement("div");
        this.setBoxStyle();
        if (typeof this.content === "string") {
          this.div.innerHTML = this.getCloseBoxImg() + this.content;
        } else {
          this.div.innerHTML = this.getCloseBoxImg();
          this.div.appendChild(this.content);
        }
        var panes = this.getPanes();
        if (panes !== null) {
          panes[this.pane].appendChild(this.div);
        }
        this.addClickHandler();
        if (this.div.style.width) {
          this.fixedWidthSet = true;
        } else {
          if (this.maxWidth !== 0 && this.div.offsetWidth > this.maxWidth) {
            this.div.style.width = this.maxWidth + "px";
            this.fixedWidthSet = true;
          } else {
            var bw = this.getBoxWidths();
            this.div.style.width = this.div.offsetWidth - bw.left - bw.right + "px";
            this.fixedWidthSet = false;
          }
        }
        this.panBox(this.disableAutoPan);
        if (!this.enableEventPropagation) {
          this.eventListeners = [];
          var events = ["mousedown", "mouseover", "mouseout", "mouseup", "click", "dblclick", "touchstart", "touchend", "touchmove"];
          for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
            var event_1 = events_1[_i];
            this.eventListeners.push(google.maps.event.addListener(this.div, event_1, cancelHandler));
          }
          this.eventListeners.push(google.maps.event.addListener(this.div, "mouseover", function() {
            if (_this.div) {
              _this.div.style.cursor = "default";
            }
          }));
        }
        this.contextListener = google.maps.event.addListener(this.div, "contextmenu", ignoreHandler);
        google.maps.event.trigger(this, "domready");
      }
    };
    InfoBox2.prototype.getCloseBoxImg = function() {
      var img = "";
      if (this.closeBoxURL !== "") {
        img = '<img alt=""';
        img += ' aria-hidden="true"';
        img += " src='" + this.closeBoxURL + "'";
        img += " align=right";
        img += " style='";
        img += " position: relative;";
        img += " cursor: pointer;";
        img += " margin: " + this.closeBoxMargin + ";";
        img += "'>";
      }
      return img;
    };
    InfoBox2.prototype.addClickHandler = function() {
      this.closeListener = this.div && this.div.firstChild && this.closeBoxURL !== "" ? google.maps.event.addListener(this.div.firstChild, "click", this.getCloseClickHandler()) : null;
    };
    InfoBox2.prototype.closeClickHandler = function(event) {
      event.cancelBubble = true;
      if (event.stopPropagation) {
        event.stopPropagation();
      }
      google.maps.event.trigger(this, "closeclick");
      this.close();
    };
    InfoBox2.prototype.getCloseClickHandler = function() {
      return this.closeClickHandler;
    };
    InfoBox2.prototype.panBox = function(disablePan) {
      if (this.div && !disablePan) {
        var map = this.getMap();
        if (map instanceof google.maps.Map) {
          var xOffset = 0;
          var yOffset = 0;
          var bounds = map.getBounds();
          if (bounds && !bounds.contains(this.position)) {
            map.setCenter(this.position);
          }
          var mapDiv = map.getDiv();
          var mapWidth = mapDiv.offsetWidth;
          var mapHeight = mapDiv.offsetHeight;
          var iwOffsetX = this.pixelOffset.width;
          var iwOffsetY = this.pixelOffset.height;
          var iwWidth = this.div.offsetWidth;
          var iwHeight = this.div.offsetHeight;
          var padX = this.infoBoxClearance.width;
          var padY = this.infoBoxClearance.height;
          var projection = this.getProjection();
          var pixPosition = projection.fromLatLngToContainerPixel(this.position);
          if (pixPosition !== null) {
            if (pixPosition.x < -iwOffsetX + padX) {
              xOffset = pixPosition.x + iwOffsetX - padX;
            } else if (pixPosition.x + iwWidth + iwOffsetX + padX > mapWidth) {
              xOffset = pixPosition.x + iwWidth + iwOffsetX + padX - mapWidth;
            }
            if (this.alignBottom) {
              if (pixPosition.y < -iwOffsetY + padY + iwHeight) {
                yOffset = pixPosition.y + iwOffsetY - padY - iwHeight;
              } else if (pixPosition.y + iwOffsetY + padY > mapHeight) {
                yOffset = pixPosition.y + iwOffsetY + padY - mapHeight;
              }
            } else {
              if (pixPosition.y < -iwOffsetY + padY) {
                yOffset = pixPosition.y + iwOffsetY - padY;
              } else if (pixPosition.y + iwHeight + iwOffsetY + padY > mapHeight) {
                yOffset = pixPosition.y + iwHeight + iwOffsetY + padY - mapHeight;
              }
            }
          }
          if (!(xOffset === 0 && yOffset === 0)) {
            map.panBy(xOffset, yOffset);
          }
        }
      }
    };
    InfoBox2.prototype.setBoxStyle = function() {
      if (this.div) {
        this.div.className = this.boxClass;
        this.div.style.cssText = "";
        var boxStyle = this.boxStyle;
        for (var i2 in boxStyle) {
          if (Object.prototype.hasOwnProperty.call(boxStyle, i2)) {
            this.div.style[i2] = boxStyle[i2];
          }
        }
        this.div.style.webkitTransform = "translateZ(0)";
        if (typeof this.div.style.opacity !== "undefined" && this.div.style.opacity !== "") {
          var opacity = parseFloat(this.div.style.opacity || "");
          this.div.style.msFilter = '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + opacity * 100 + ')"';
          this.div.style.filter = "alpha(opacity=" + opacity * 100 + ")";
        }
        this.div.style.position = "absolute";
        this.div.style.visibility = "hidden";
        if (this.zIndex !== null) {
          this.div.style.zIndex = this.zIndex + "";
        }
        if (!this.div.style.overflow) {
          this.div.style.overflow = "auto";
        }
      }
    };
    InfoBox2.prototype.getBoxWidths = function() {
      var bw = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      };
      if (!this.div) {
        return bw;
      }
      if (document.defaultView) {
        var ownerDocument = this.div.ownerDocument;
        var computedStyle = ownerDocument && ownerDocument.defaultView ? ownerDocument.defaultView.getComputedStyle(this.div, "") : null;
        if (computedStyle) {
          bw.top = parseInt(computedStyle.borderTopWidth || "", 10) || 0;
          bw.bottom = parseInt(computedStyle.borderBottomWidth || "", 10) || 0;
          bw.left = parseInt(computedStyle.borderLeftWidth || "", 10) || 0;
          bw.right = parseInt(computedStyle.borderRightWidth || "", 10) || 0;
        }
      } else if (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.documentElement.currentStyle
      ) {
        var currentStyle = this.div.currentStyle;
        if (currentStyle) {
          bw.top = parseInt(currentStyle.borderTopWidth || "", 10) || 0;
          bw.bottom = parseInt(currentStyle.borderBottomWidth || "", 10) || 0;
          bw.left = parseInt(currentStyle.borderLeftWidth || "", 10) || 0;
          bw.right = parseInt(currentStyle.borderRightWidth || "", 10) || 0;
        }
      }
      return bw;
    };
    InfoBox2.prototype.onRemove = function() {
      if (this.div && this.div.parentNode) {
        this.div.parentNode.removeChild(this.div);
        this.div = null;
      }
    };
    InfoBox2.prototype.draw = function() {
      this.createInfoBoxDiv();
      if (this.div) {
        var projection = this.getProjection();
        var pixPosition = projection.fromLatLngToDivPixel(this.position);
        if (pixPosition !== null) {
          this.div.style.left = pixPosition.x + this.pixelOffset.width + "px";
          if (this.alignBottom) {
            this.div.style.bottom = -(pixPosition.y + this.pixelOffset.height) + "px";
          } else {
            this.div.style.top = pixPosition.y + this.pixelOffset.height + "px";
          }
        }
        if (this.isHidden) {
          this.div.style.visibility = "hidden";
        } else {
          this.div.style.visibility = "visible";
        }
      }
    };
    InfoBox2.prototype.setOptions = function(options) {
      if (options === void 0) {
        options = {};
      }
      if (typeof options.boxClass !== "undefined") {
        this.boxClass = options.boxClass;
        this.setBoxStyle();
      }
      if (typeof options.boxStyle !== "undefined") {
        this.boxStyle = options.boxStyle;
        this.setBoxStyle();
      }
      if (typeof options.content !== "undefined") {
        this.setContent(options.content);
      }
      if (typeof options.disableAutoPan !== "undefined") {
        this.disableAutoPan = options.disableAutoPan;
      }
      if (typeof options.maxWidth !== "undefined") {
        this.maxWidth = options.maxWidth;
      }
      if (typeof options.pixelOffset !== "undefined") {
        this.pixelOffset = options.pixelOffset;
      }
      if (typeof options.alignBottom !== "undefined") {
        this.alignBottom = options.alignBottom;
      }
      if (typeof options.position !== "undefined") {
        this.setPosition(options.position);
      }
      if (typeof options.zIndex !== "undefined") {
        this.setZIndex(options.zIndex);
      }
      if (typeof options.closeBoxMargin !== "undefined") {
        this.closeBoxMargin = options.closeBoxMargin;
      }
      if (typeof options.closeBoxURL !== "undefined") {
        this.closeBoxURL = options.closeBoxURL;
      }
      if (typeof options.infoBoxClearance !== "undefined") {
        this.infoBoxClearance = options.infoBoxClearance;
      }
      if (typeof options.isHidden !== "undefined") {
        this.isHidden = options.isHidden;
      }
      if (typeof options.visible !== "undefined") {
        this.isHidden = !options.visible;
      }
      if (typeof options.enableEventPropagation !== "undefined") {
        this.enableEventPropagation = options.enableEventPropagation;
      }
      if (this.div) {
        this.draw();
      }
    };
    InfoBox2.prototype.setContent = function(content) {
      this.content = content;
      if (this.div) {
        if (this.closeListener) {
          google.maps.event.removeListener(this.closeListener);
          this.closeListener = null;
        }
        if (!this.fixedWidthSet) {
          this.div.style.width = "";
        }
        if (typeof content === "string") {
          this.div.innerHTML = this.getCloseBoxImg() + content;
        } else {
          this.div.innerHTML = this.getCloseBoxImg();
          this.div.appendChild(content);
        }
        if (!this.fixedWidthSet) {
          this.div.style.width = this.div.offsetWidth + "px";
          if (typeof content === "string") {
            this.div.innerHTML = this.getCloseBoxImg() + content;
          } else {
            this.div.innerHTML = this.getCloseBoxImg();
            this.div.appendChild(content);
          }
        }
        this.addClickHandler();
      }
      google.maps.event.trigger(this, "content_changed");
    };
    InfoBox2.prototype.setPosition = function(latLng) {
      this.position = latLng;
      if (this.div) {
        this.draw();
      }
      google.maps.event.trigger(this, "position_changed");
    };
    InfoBox2.prototype.setVisible = function(isVisible) {
      this.isHidden = !isVisible;
      if (this.div) {
        this.div.style.visibility = this.isHidden ? "hidden" : "visible";
      }
    };
    InfoBox2.prototype.setZIndex = function(index) {
      this.zIndex = index;
      if (this.div) {
        this.div.style.zIndex = index + "";
      }
      google.maps.event.trigger(this, "zindex_changed");
    };
    InfoBox2.prototype.getContent = function() {
      return this.content;
    };
    InfoBox2.prototype.getPosition = function() {
      return this.position;
    };
    InfoBox2.prototype.getZIndex = function() {
      return this.zIndex;
    };
    InfoBox2.prototype.getVisible = function() {
      var map = this.getMap();
      return typeof map === "undefined" || map === null ? false : !this.isHidden;
    };
    InfoBox2.prototype.show = function() {
      this.isHidden = false;
      if (this.div) {
        this.div.style.visibility = "visible";
      }
    };
    InfoBox2.prototype.hide = function() {
      this.isHidden = true;
      if (this.div) {
        this.div.style.visibility = "hidden";
      }
    };
    InfoBox2.prototype.open = function(map, anchor) {
      var _this = this;
      if (anchor) {
        this.position = anchor.getPosition();
        this.moveListener = google.maps.event.addListener(anchor, "position_changed", function() {
          var position2 = anchor.getPosition();
          _this.setPosition(position2);
        });
        this.mapListener = google.maps.event.addListener(anchor, "map_changed", function() {
          _this.setMap(anchor.map);
        });
      }
      this.setMap(map);
      if (this.div) {
        this.panBox();
      }
    };
    InfoBox2.prototype.close = function() {
      if (this.closeListener) {
        google.maps.event.removeListener(this.closeListener);
        this.closeListener = null;
      }
      if (this.eventListeners) {
        for (var _i = 0, _a = this.eventListeners; _i < _a.length; _i++) {
          var eventListener = _a[_i];
          google.maps.event.removeListener(eventListener);
        }
        this.eventListeners = null;
      }
      if (this.moveListener) {
        google.maps.event.removeListener(this.moveListener);
        this.moveListener = null;
      }
      if (this.mapListener) {
        google.maps.event.removeListener(this.mapListener);
        this.mapListener = null;
      }
      if (this.contextListener) {
        google.maps.event.removeListener(this.contextListener);
        this.contextListener = null;
      }
      this.setMap(null);
    };
    InfoBox2.prototype.extend = function(obj1, obj2) {
      return (function applyExtend(object) {
        for (var property in object.prototype) {
          if (!Object.prototype.hasOwnProperty.call(this, property)) {
            this.prototype[property] = object.prototype[property];
          }
        }
        return this;
      }).apply(obj1, [obj2]);
    };
    return InfoBox2;
  })()
);
var _excluded = ["position"], _excluded2 = ["position"];
function ownKeys$b(e2, r2) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e2);
    r2 && (o2 = o2.filter(function(r22) {
      return Object.getOwnPropertyDescriptor(e2, r22).enumerable;
    })), t2.push.apply(t2, o2);
  }
  return t2;
}
function _objectSpread$b(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$b(Object(t2), true).forEach(function(r22) {
      _defineProperty(e2, r22, t2[r22]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : ownKeys$b(Object(t2)).forEach(function(r22) {
      Object.defineProperty(e2, r22, Object.getOwnPropertyDescriptor(t2, r22));
    });
  }
  return e2;
}
var eventMap$d = {
  onCloseClick: "closeclick",
  onContentChanged: "content_changed",
  onDomReady: "domready",
  onPositionChanged: "position_changed",
  onZindexChanged: "zindex_changed"
};
var updaterMap$d = {
  options(instance, options) {
    instance.setOptions(options);
  },
  position(instance, position2) {
    if (position2 instanceof google.maps.LatLng) {
      instance.setPosition(position2);
    } else {
      instance.setPosition(new google.maps.LatLng(position2.lat, position2.lng));
    }
  },
  visible(instance, visible) {
    instance.setVisible(visible);
  },
  zIndex(instance, zIndex) {
    instance.setZIndex(zIndex);
  }
};
var defaultOptions$3 = {};
function InfoBoxFunctional(_ref) {
  var {
    children,
    anchor,
    options,
    position: position2,
    zIndex,
    onCloseClick,
    onDomReady,
    onContentChanged,
    onPositionChanged,
    onZindexChanged,
    onLoad,
    onUnmount
  } = _ref;
  var map = reactExports.useContext(MapContext);
  var [instance, setInstance] = reactExports.useState(null);
  var [closeClickListener, setCloseClickListener] = reactExports.useState(null);
  var [domReadyClickListener, setDomReadyClickListener] = reactExports.useState(null);
  var [contentChangedClickListener, setContentChangedClickListener] = reactExports.useState(null);
  var [positionChangedClickListener, setPositionChangedClickListener] = reactExports.useState(null);
  var [zIndexChangedClickListener, setZindexChangedClickListener] = reactExports.useState(null);
  var containerElementRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (map && instance !== null) {
      instance.close();
      if (anchor) {
        instance.open(map, anchor);
      } else if (instance.getPosition()) {
        instance.open(map);
      }
    }
  }, [map, instance, anchor]);
  reactExports.useEffect(() => {
    if (options && instance !== null) {
      instance.setOptions(options);
    }
  }, [instance, options]);
  reactExports.useEffect(() => {
    if (position2 && instance !== null) {
      var positionLatLng = position2 instanceof google.maps.LatLng ? position2 : (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        new google.maps.LatLng(position2.lat, position2.lng)
      );
      instance.setPosition(positionLatLng);
    }
  }, [position2]);
  reactExports.useEffect(() => {
    if (typeof zIndex === "number" && instance !== null) {
      instance.setZIndex(zIndex);
    }
  }, [zIndex]);
  reactExports.useEffect(() => {
    if (instance && onCloseClick) {
      if (closeClickListener !== null) {
        google.maps.event.removeListener(closeClickListener);
      }
      setCloseClickListener(google.maps.event.addListener(instance, "closeclick", onCloseClick));
    }
  }, [onCloseClick]);
  reactExports.useEffect(() => {
    if (instance && onDomReady) {
      if (domReadyClickListener !== null) {
        google.maps.event.removeListener(domReadyClickListener);
      }
      setDomReadyClickListener(google.maps.event.addListener(instance, "domready", onDomReady));
    }
  }, [onDomReady]);
  reactExports.useEffect(() => {
    if (instance && onContentChanged) {
      if (contentChangedClickListener !== null) {
        google.maps.event.removeListener(contentChangedClickListener);
      }
      setContentChangedClickListener(google.maps.event.addListener(instance, "content_changed", onContentChanged));
    }
  }, [onContentChanged]);
  reactExports.useEffect(() => {
    if (instance && onPositionChanged) {
      if (positionChangedClickListener !== null) {
        google.maps.event.removeListener(positionChangedClickListener);
      }
      setPositionChangedClickListener(google.maps.event.addListener(instance, "position_changed", onPositionChanged));
    }
  }, [onPositionChanged]);
  reactExports.useEffect(() => {
    if (instance && onZindexChanged) {
      if (zIndexChangedClickListener !== null) {
        google.maps.event.removeListener(zIndexChangedClickListener);
      }
      setZindexChangedClickListener(google.maps.event.addListener(instance, "zindex_changed", onZindexChanged));
    }
  }, [onZindexChanged]);
  reactExports.useEffect(() => {
    if (map) {
      var _ref2 = options || defaultOptions$3, {
        position: _position
      } = _ref2, infoBoxOptions = _objectWithoutProperties(_ref2, _excluded);
      var positionLatLng;
      if (_position && !(_position instanceof google.maps.LatLng)) {
        positionLatLng = new google.maps.LatLng(_position.lat, _position.lng);
      }
      var infoBox = new InfoBox(_objectSpread$b(_objectSpread$b({}, infoBoxOptions), positionLatLng ? {
        position: positionLatLng
      } : {}));
      containerElementRef.current = document.createElement("div");
      setInstance(infoBox);
      if (onCloseClick) {
        setCloseClickListener(google.maps.event.addListener(infoBox, "closeclick", onCloseClick));
      }
      if (onDomReady) {
        setDomReadyClickListener(google.maps.event.addListener(infoBox, "domready", onDomReady));
      }
      if (onContentChanged) {
        setContentChangedClickListener(google.maps.event.addListener(infoBox, "content_changed", onContentChanged));
      }
      if (onPositionChanged) {
        setPositionChangedClickListener(google.maps.event.addListener(infoBox, "position_changed", onPositionChanged));
      }
      if (onZindexChanged) {
        setZindexChangedClickListener(google.maps.event.addListener(infoBox, "zindex_changed", onZindexChanged));
      }
      infoBox.setContent(containerElementRef.current);
      if (anchor) {
        infoBox.open(map, anchor);
      } else if (infoBox.getPosition()) {
        infoBox.open(map);
      } else {
        invariant(false, "You must provide either an anchor or a position prop for <InfoBox>.");
      }
      if (onLoad) {
        onLoad(infoBox);
      }
    }
    return () => {
      if (instance !== null) {
        if (closeClickListener) {
          google.maps.event.removeListener(closeClickListener);
        }
        if (contentChangedClickListener) {
          google.maps.event.removeListener(contentChangedClickListener);
        }
        if (domReadyClickListener) {
          google.maps.event.removeListener(domReadyClickListener);
        }
        if (positionChangedClickListener) {
          google.maps.event.removeListener(positionChangedClickListener);
        }
        if (zIndexChangedClickListener) {
          google.maps.event.removeListener(zIndexChangedClickListener);
        }
        if (onUnmount) {
          onUnmount(instance);
        }
        instance.close();
      }
    };
  }, []);
  return containerElementRef.current ? reactDomExports.createPortal(reactExports.Children.only(children), containerElementRef.current) : null;
}
reactExports.memo(InfoBoxFunctional);
class InfoBoxComponent extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "containerElement", null);
    _defineProperty(this, "state", {
      infoBox: null
    });
    _defineProperty(this, "open", (infoBox, anchor) => {
      if (anchor) {
        if (this.context !== null) {
          infoBox.open(this.context, anchor);
        }
      } else if (infoBox.getPosition()) {
        if (this.context !== null) {
          infoBox.open(this.context);
        }
      } else {
        invariant(false, "You must provide either an anchor or a position prop for <InfoBox>.");
      }
    });
    _defineProperty(this, "setInfoBoxCallback", () => {
      if (this.state.infoBox !== null && this.containerElement !== null) {
        this.state.infoBox.setContent(this.containerElement);
        this.open(this.state.infoBox, this.props.anchor);
        if (this.props.onLoad) {
          this.props.onLoad(this.state.infoBox);
        }
      }
    });
  }
  componentDidMount() {
    var _ref3 = this.props.options || {}, {
      position: position2
    } = _ref3, infoBoxOptions = _objectWithoutProperties(_ref3, _excluded2);
    var positionLatLng;
    if (position2 && !(position2 instanceof google.maps.LatLng)) {
      positionLatLng = new google.maps.LatLng(position2.lat, position2.lng);
    }
    var infoBox = new InfoBox(_objectSpread$b(_objectSpread$b({}, infoBoxOptions), positionLatLng ? {
      position: positionLatLng
    } : {}));
    this.containerElement = document.createElement("div");
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$d,
      eventMap: eventMap$d,
      prevProps: {},
      nextProps: this.props,
      instance: infoBox
    });
    this.setState({
      infoBox
    }, this.setInfoBoxCallback);
  }
  componentDidUpdate(prevProps) {
    var {
      infoBox
    } = this.state;
    if (infoBox !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$d,
        eventMap: eventMap$d,
        prevProps,
        nextProps: this.props,
        instance: infoBox
      });
    }
  }
  componentWillUnmount() {
    var {
      onUnmount
    } = this.props;
    var {
      infoBox
    } = this.state;
    if (infoBox !== null) {
      if (onUnmount) {
        onUnmount(infoBox);
      }
      unregisterEvents(this.registeredEvents);
      infoBox.close();
    }
  }
  render() {
    return this.containerElement ? reactDomExports.createPortal(reactExports.Children.only(this.props.children), this.containerElement) : null;
  }
}
_defineProperty(InfoBoxComponent, "contextType", MapContext);
var fastDeepEqual;
var hasRequiredFastDeepEqual;
function requireFastDeepEqual() {
  if (hasRequiredFastDeepEqual) return fastDeepEqual;
  hasRequiredFastDeepEqual = 1;
  fastDeepEqual = function equal3(a2, b2) {
    if (a2 === b2) return true;
    if (a2 && b2 && typeof a2 == "object" && typeof b2 == "object") {
      if (a2.constructor !== b2.constructor) return false;
      var length2, i2, keys;
      if (Array.isArray(a2)) {
        length2 = a2.length;
        if (length2 != b2.length) return false;
        for (i2 = length2; i2-- !== 0; ) if (!equal3(a2[i2], b2[i2])) return false;
        return true;
      }
      if (a2.constructor === RegExp) return a2.source === b2.source && a2.flags === b2.flags;
      if (a2.valueOf !== Object.prototype.valueOf) return a2.valueOf() === b2.valueOf();
      if (a2.toString !== Object.prototype.toString) return a2.toString() === b2.toString();
      keys = Object.keys(a2);
      length2 = keys.length;
      if (length2 !== Object.keys(b2).length) return false;
      for (i2 = length2; i2-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(b2, keys[i2])) return false;
      for (i2 = length2; i2-- !== 0; ) {
        var key = keys[i2];
        if (!equal3(a2[key], b2[key])) return false;
      }
      return true;
    }
    return a2 !== a2 && b2 !== b2;
  };
  return fastDeepEqual;
}
var fastDeepEqualExports = requireFastDeepEqual();
var equal2 = /* @__PURE__ */ getDefaultExportFromCjs$1(fastDeepEqualExports);
var ARRAY_TYPES = [Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array];
var VERSION = 1;
var HEADER_SIZE = 8;
class KDBush {
  /**
   * Creates an index from raw `ArrayBuffer` data.
   * @param {ArrayBuffer} data
   */
  static from(data) {
    if (!(data instanceof ArrayBuffer)) {
      throw new Error("Data must be an instance of ArrayBuffer.");
    }
    var [magic, versionAndType] = new Uint8Array(data, 0, 2);
    if (magic !== 219) {
      throw new Error("Data does not appear to be in a KDBush format.");
    }
    var version = versionAndType >> 4;
    if (version !== VERSION) {
      throw new Error("Got v".concat(version, " data when expected v").concat(VERSION, "."));
    }
    var ArrayType = ARRAY_TYPES[versionAndType & 15];
    if (!ArrayType) {
      throw new Error("Unrecognized array type.");
    }
    var [nodeSize] = new Uint16Array(data, 2, 1);
    var [numItems] = new Uint32Array(data, 4, 1);
    return new KDBush(numItems, nodeSize, ArrayType, data);
  }
  /**
   * Creates an index that will hold a given number of items.
   * @param {number} numItems
   * @param {number} [nodeSize=64] Size of the KD-tree node (64 by default).
   * @param {TypedArrayConstructor} [ArrayType=Float64Array] The array type used for coordinates storage (`Float64Array` by default).
   * @param {ArrayBuffer} [data] (For internal use only)
   */
  constructor(numItems) {
    var nodeSize = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 64;
    var ArrayType = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Float64Array;
    var data = arguments.length > 3 ? arguments[3] : void 0;
    if (isNaN(numItems) || numItems < 0) throw new Error("Unpexpected numItems value: ".concat(numItems, "."));
    this.numItems = +numItems;
    this.nodeSize = Math.min(Math.max(+nodeSize, 2), 65535);
    this.ArrayType = ArrayType;
    this.IndexArrayType = numItems < 65536 ? Uint16Array : Uint32Array;
    var arrayTypeIndex = ARRAY_TYPES.indexOf(this.ArrayType);
    var coordsByteSize = numItems * 2 * this.ArrayType.BYTES_PER_ELEMENT;
    var idsByteSize = numItems * this.IndexArrayType.BYTES_PER_ELEMENT;
    var padCoords = (8 - idsByteSize % 8) % 8;
    if (arrayTypeIndex < 0) {
      throw new Error("Unexpected typed array class: ".concat(ArrayType, "."));
    }
    if (data && data instanceof ArrayBuffer) {
      this.data = data;
      this.ids = new this.IndexArrayType(this.data, HEADER_SIZE, numItems);
      this.coords = new this.ArrayType(this.data, HEADER_SIZE + idsByteSize + padCoords, numItems * 2);
      this._pos = numItems * 2;
      this._finished = true;
    } else {
      this.data = new ArrayBuffer(HEADER_SIZE + coordsByteSize + idsByteSize + padCoords);
      this.ids = new this.IndexArrayType(this.data, HEADER_SIZE, numItems);
      this.coords = new this.ArrayType(this.data, HEADER_SIZE + idsByteSize + padCoords, numItems * 2);
      this._pos = 0;
      this._finished = false;
      new Uint8Array(this.data, 0, 2).set([219, (VERSION << 4) + arrayTypeIndex]);
      new Uint16Array(this.data, 2, 1)[0] = nodeSize;
      new Uint32Array(this.data, 4, 1)[0] = numItems;
    }
  }
  /**
   * Add a point to the index.
   * @param {number} x
   * @param {number} y
   * @returns {number} An incremental index associated with the added item (starting from `0`).
   */
  add(x2, y2) {
    var index = this._pos >> 1;
    this.ids[index] = index;
    this.coords[this._pos++] = x2;
    this.coords[this._pos++] = y2;
    return index;
  }
  /**
   * Perform indexing of the added points.
   */
  finish() {
    var numAdded = this._pos >> 1;
    if (numAdded !== this.numItems) {
      throw new Error("Added ".concat(numAdded, " items when expected ").concat(this.numItems, "."));
    }
    sort(this.ids, this.coords, this.nodeSize, 0, this.numItems - 1, 0);
    this._finished = true;
    return this;
  }
  /**
   * Search the index for items within a given bounding box.
   * @param {number} minX
   * @param {number} minY
   * @param {number} maxX
   * @param {number} maxY
   * @returns {number[]} An array of indices correponding to the found items.
   */
  range(minX, minY, maxX, maxY) {
    if (!this._finished) throw new Error("Data not yet indexed - call index.finish().");
    var {
      ids,
      coords,
      nodeSize
    } = this;
    var stack = [0, ids.length - 1, 0];
    var result = [];
    while (stack.length) {
      var axis = stack.pop() || 0;
      var right = stack.pop() || 0;
      var left = stack.pop() || 0;
      if (right - left <= nodeSize) {
        for (var i2 = left; i2 <= right; i2++) {
          var _x = coords[2 * i2];
          var _y = coords[2 * i2 + 1];
          if (_x >= minX && _x <= maxX && _y >= minY && _y <= maxY) result.push(ids[i2]);
        }
        continue;
      }
      var m2 = left + right >> 1;
      var x2 = coords[2 * m2];
      var y2 = coords[2 * m2 + 1];
      if (x2 >= minX && x2 <= maxX && y2 >= minY && y2 <= maxY) result.push(ids[m2]);
      if (axis === 0 ? minX <= x2 : minY <= y2) {
        stack.push(left);
        stack.push(m2 - 1);
        stack.push(1 - axis);
      }
      if (axis === 0 ? maxX >= x2 : maxY >= y2) {
        stack.push(m2 + 1);
        stack.push(right);
        stack.push(1 - axis);
      }
    }
    return result;
  }
  /**
   * Search the index for items within a given radius.
   * @param {number} qx
   * @param {number} qy
   * @param {number} r Query radius.
   * @returns {number[]} An array of indices correponding to the found items.
   */
  within(qx, qy, r2) {
    if (!this._finished) throw new Error("Data not yet indexed - call index.finish().");
    var {
      ids,
      coords,
      nodeSize
    } = this;
    var stack = [0, ids.length - 1, 0];
    var result = [];
    var r22 = r2 * r2;
    while (stack.length) {
      var axis = stack.pop() || 0;
      var right = stack.pop() || 0;
      var left = stack.pop() || 0;
      if (right - left <= nodeSize) {
        for (var i2 = left; i2 <= right; i2++) {
          if (sqDist(coords[2 * i2], coords[2 * i2 + 1], qx, qy) <= r22) result.push(ids[i2]);
        }
        continue;
      }
      var m2 = left + right >> 1;
      var x2 = coords[2 * m2];
      var y2 = coords[2 * m2 + 1];
      if (sqDist(x2, y2, qx, qy) <= r22) result.push(ids[m2]);
      if (axis === 0 ? qx - r2 <= x2 : qy - r2 <= y2) {
        stack.push(left);
        stack.push(m2 - 1);
        stack.push(1 - axis);
      }
      if (axis === 0 ? qx + r2 >= x2 : qy + r2 >= y2) {
        stack.push(m2 + 1);
        stack.push(right);
        stack.push(1 - axis);
      }
    }
    return result;
  }
}
function sort(ids, coords, nodeSize, left, right, axis) {
  if (right - left <= nodeSize) return;
  var m2 = left + right >> 1;
  select(ids, coords, m2, left, right, axis);
  sort(ids, coords, nodeSize, left, m2 - 1, 1 - axis);
  sort(ids, coords, nodeSize, m2 + 1, right, 1 - axis);
}
function select(ids, coords, k, left, right, axis) {
  while (right > left) {
    if (right - left > 600) {
      var n2 = right - left + 1;
      var m2 = k - left + 1;
      var z = Math.log(n2);
      var s2 = 0.5 * Math.exp(2 * z / 3);
      var sd = 0.5 * Math.sqrt(z * s2 * (n2 - s2) / n2) * (m2 - n2 / 2 < 0 ? -1 : 1);
      var newLeft = Math.max(left, Math.floor(k - m2 * s2 / n2 + sd));
      var newRight = Math.min(right, Math.floor(k + (n2 - m2) * s2 / n2 + sd));
      select(ids, coords, k, newLeft, newRight, axis);
    }
    var t2 = coords[2 * k + axis];
    var i2 = left;
    var j = right;
    swapItem(ids, coords, left, k);
    if (coords[2 * right + axis] > t2) swapItem(ids, coords, left, right);
    while (i2 < j) {
      swapItem(ids, coords, i2, j);
      i2++;
      j--;
      while (coords[2 * i2 + axis] < t2) i2++;
      while (coords[2 * j + axis] > t2) j--;
    }
    if (coords[2 * left + axis] === t2) swapItem(ids, coords, left, j);
    else {
      j++;
      swapItem(ids, coords, j, right);
    }
    if (j <= k) left = j + 1;
    if (k <= j) right = j - 1;
  }
}
function swapItem(ids, coords, i2, j) {
  swap(ids, i2, j);
  swap(coords, 2 * i2, 2 * j);
  swap(coords, 2 * i2 + 1, 2 * j + 1);
}
function swap(arr, i2, j) {
  var tmp = arr[i2];
  arr[i2] = arr[j];
  arr[j] = tmp;
}
function sqDist(ax, ay, bx, by) {
  var dx = ax - bx;
  var dy = ay - by;
  return dx * dx + dy * dy;
}
var defaultOptions$2 = {
  minZoom: 0,
  // min zoom to generate clusters on
  maxZoom: 16,
  // max zoom level to cluster the points on
  minPoints: 2,
  // minimum points to form a cluster
  radius: 40,
  // cluster radius in pixels
  extent: 512,
  // tile extent (radius is calculated relative to it)
  nodeSize: 64,
  // size of the KD-tree leaf node, affects performance
  log: false,
  // whether to log timing info
  // whether to generate numeric ids for input features (in vector tiles)
  generateId: false,
  // a reduce function for calculating custom cluster properties
  reduce: null,
  // (accumulated, props) => { accumulated.sum += props.sum; }
  // properties to use for individual points when running the reducer
  map: (props) => props
  // props => ({sum: props.my_value})
};
var fround = Math.fround || /* @__PURE__ */ ((tmp) => (x2) => {
  tmp[0] = +x2;
  return tmp[0];
})(new Float32Array(1));
var OFFSET_ZOOM = 2;
var OFFSET_ID = 3;
var OFFSET_PARENT = 4;
var OFFSET_NUM = 5;
var OFFSET_PROP = 6;
class Supercluster {
  constructor(options) {
    this.options = Object.assign(Object.create(defaultOptions$2), options);
    this.trees = new Array(this.options.maxZoom + 1);
    this.stride = this.options.reduce ? 7 : 6;
    this.clusterProps = [];
  }
  load(points) {
    var {
      log,
      minZoom,
      maxZoom
    } = this.options;
    if (log) console.time("total time");
    var timerId = "prepare ".concat(points.length, " points");
    if (log) console.time(timerId);
    this.points = points;
    var data = [];
    for (var i2 = 0; i2 < points.length; i2++) {
      var p2 = points[i2];
      if (!p2.geometry) continue;
      var [lng, lat] = p2.geometry.coordinates;
      var x2 = fround(lngX(lng));
      var y2 = fround(latY(lat));
      data.push(
        x2,
        y2,
        // projected point coordinates
        Infinity,
        // the last zoom the point was processed at
        i2,
        // index of the source feature in the original input array
        -1,
        // parent cluster id
        1
        // number of points in a cluster
      );
      if (this.options.reduce) data.push(0);
    }
    var tree = this.trees[maxZoom + 1] = this._createTree(data);
    if (log) console.timeEnd(timerId);
    for (var z = maxZoom; z >= minZoom; z--) {
      var now = +Date.now();
      tree = this.trees[z] = this._createTree(this._cluster(tree, z));
      if (log) console.log("z%d: %d clusters in %dms", z, tree.numItems, +Date.now() - now);
    }
    if (log) console.timeEnd("total time");
    return this;
  }
  getClusters(bbox, zoom) {
    var minLng = ((bbox[0] + 180) % 360 + 360) % 360 - 180;
    var minLat = Math.max(-90, Math.min(90, bbox[1]));
    var maxLng = bbox[2] === 180 ? 180 : ((bbox[2] + 180) % 360 + 360) % 360 - 180;
    var maxLat = Math.max(-90, Math.min(90, bbox[3]));
    if (bbox[2] - bbox[0] >= 360) {
      minLng = -180;
      maxLng = 180;
    } else if (minLng > maxLng) {
      var easternHem = this.getClusters([minLng, minLat, 180, maxLat], zoom);
      var westernHem = this.getClusters([-180, minLat, maxLng, maxLat], zoom);
      return easternHem.concat(westernHem);
    }
    var tree = this.trees[this._limitZoom(zoom)];
    var ids = tree.range(lngX(minLng), latY(maxLat), lngX(maxLng), latY(minLat));
    var data = tree.data;
    var clusters = [];
    for (var id of ids) {
      var k = this.stride * id;
      clusters.push(data[k + OFFSET_NUM] > 1 ? getClusterJSON(data, k, this.clusterProps) : this.points[data[k + OFFSET_ID]]);
    }
    return clusters;
  }
  getChildren(clusterId) {
    var originId = this._getOriginId(clusterId);
    var originZoom = this._getOriginZoom(clusterId);
    var errorMsg = "No cluster with the specified id.";
    var tree = this.trees[originZoom];
    if (!tree) throw new Error(errorMsg);
    var data = tree.data;
    if (originId * this.stride >= data.length) throw new Error(errorMsg);
    var r2 = this.options.radius / (this.options.extent * Math.pow(2, originZoom - 1));
    var x2 = data[originId * this.stride];
    var y2 = data[originId * this.stride + 1];
    var ids = tree.within(x2, y2, r2);
    var children = [];
    for (var id of ids) {
      var k = id * this.stride;
      if (data[k + OFFSET_PARENT] === clusterId) {
        children.push(data[k + OFFSET_NUM] > 1 ? getClusterJSON(data, k, this.clusterProps) : this.points[data[k + OFFSET_ID]]);
      }
    }
    if (children.length === 0) throw new Error(errorMsg);
    return children;
  }
  getLeaves(clusterId, limit, offset) {
    limit = limit || 10;
    offset = offset || 0;
    var leaves = [];
    this._appendLeaves(leaves, clusterId, limit, offset, 0);
    return leaves;
  }
  getTile(z, x2, y2) {
    var tree = this.trees[this._limitZoom(z)];
    var z2 = Math.pow(2, z);
    var {
      extent,
      radius
    } = this.options;
    var p2 = radius / extent;
    var top = (y2 - p2) / z2;
    var bottom = (y2 + 1 + p2) / z2;
    var tile = {
      features: []
    };
    this._addTileFeatures(tree.range((x2 - p2) / z2, top, (x2 + 1 + p2) / z2, bottom), tree.data, x2, y2, z2, tile);
    if (x2 === 0) {
      this._addTileFeatures(tree.range(1 - p2 / z2, top, 1, bottom), tree.data, z2, y2, z2, tile);
    }
    if (x2 === z2 - 1) {
      this._addTileFeatures(tree.range(0, top, p2 / z2, bottom), tree.data, -1, y2, z2, tile);
    }
    return tile.features.length ? tile : null;
  }
  getClusterExpansionZoom(clusterId) {
    var expansionZoom = this._getOriginZoom(clusterId) - 1;
    while (expansionZoom <= this.options.maxZoom) {
      var children = this.getChildren(clusterId);
      expansionZoom++;
      if (children.length !== 1) break;
      clusterId = children[0].properties.cluster_id;
    }
    return expansionZoom;
  }
  _appendLeaves(result, clusterId, limit, offset, skipped) {
    var children = this.getChildren(clusterId);
    for (var child of children) {
      var props = child.properties;
      if (props && props.cluster) {
        if (skipped + props.point_count <= offset) {
          skipped += props.point_count;
        } else {
          skipped = this._appendLeaves(result, props.cluster_id, limit, offset, skipped);
        }
      } else if (skipped < offset) {
        skipped++;
      } else {
        result.push(child);
      }
      if (result.length === limit) break;
    }
    return skipped;
  }
  _createTree(data) {
    var tree = new KDBush(data.length / this.stride | 0, this.options.nodeSize, Float32Array);
    for (var i2 = 0; i2 < data.length; i2 += this.stride) tree.add(data[i2], data[i2 + 1]);
    tree.finish();
    tree.data = data;
    return tree;
  }
  _addTileFeatures(ids, data, x2, y2, z2, tile) {
    for (var i2 of ids) {
      var k = i2 * this.stride;
      var isCluster = data[k + OFFSET_NUM] > 1;
      var tags = void 0, px = void 0, py = void 0;
      if (isCluster) {
        tags = getClusterProperties(data, k, this.clusterProps);
        px = data[k];
        py = data[k + 1];
      } else {
        var p2 = this.points[data[k + OFFSET_ID]];
        tags = p2.properties;
        var [lng, lat] = p2.geometry.coordinates;
        px = lngX(lng);
        py = latY(lat);
      }
      var f2 = {
        type: 1,
        geometry: [[Math.round(this.options.extent * (px * z2 - x2)), Math.round(this.options.extent * (py * z2 - y2))]],
        tags
      };
      var id = void 0;
      if (isCluster || this.options.generateId) {
        id = data[k + OFFSET_ID];
      } else {
        id = this.points[data[k + OFFSET_ID]].id;
      }
      if (id !== void 0) f2.id = id;
      tile.features.push(f2);
    }
  }
  _limitZoom(z) {
    return Math.max(this.options.minZoom, Math.min(Math.floor(+z), this.options.maxZoom + 1));
  }
  _cluster(tree, zoom) {
    var {
      radius,
      extent,
      reduce: reduce2,
      minPoints
    } = this.options;
    var r2 = radius / (extent * Math.pow(2, zoom));
    var data = tree.data;
    var nextData = [];
    var stride = this.stride;
    for (var i2 = 0; i2 < data.length; i2 += stride) {
      if (data[i2 + OFFSET_ZOOM] <= zoom) continue;
      data[i2 + OFFSET_ZOOM] = zoom;
      var x2 = data[i2];
      var y2 = data[i2 + 1];
      var neighborIds = tree.within(data[i2], data[i2 + 1], r2);
      var numPointsOrigin = data[i2 + OFFSET_NUM];
      var numPoints = numPointsOrigin;
      for (var neighborId of neighborIds) {
        var k = neighborId * stride;
        if (data[k + OFFSET_ZOOM] > zoom) numPoints += data[k + OFFSET_NUM];
      }
      if (numPoints > numPointsOrigin && numPoints >= minPoints) {
        var wx = x2 * numPointsOrigin;
        var wy = y2 * numPointsOrigin;
        var clusterProperties = void 0;
        var clusterPropIndex = -1;
        var id = ((i2 / stride | 0) << 5) + (zoom + 1) + this.points.length;
        for (var _neighborId of neighborIds) {
          var _k = _neighborId * stride;
          if (data[_k + OFFSET_ZOOM] <= zoom) continue;
          data[_k + OFFSET_ZOOM] = zoom;
          var numPoints2 = data[_k + OFFSET_NUM];
          wx += data[_k] * numPoints2;
          wy += data[_k + 1] * numPoints2;
          data[_k + OFFSET_PARENT] = id;
          if (reduce2) {
            if (!clusterProperties) {
              clusterProperties = this._map(data, i2, true);
              clusterPropIndex = this.clusterProps.length;
              this.clusterProps.push(clusterProperties);
            }
            reduce2(clusterProperties, this._map(data, _k));
          }
        }
        data[i2 + OFFSET_PARENT] = id;
        nextData.push(wx / numPoints, wy / numPoints, Infinity, id, -1, numPoints);
        if (reduce2) nextData.push(clusterPropIndex);
      } else {
        for (var j = 0; j < stride; j++) nextData.push(data[i2 + j]);
        if (numPoints > 1) {
          for (var _neighborId2 of neighborIds) {
            var _k2 = _neighborId2 * stride;
            if (data[_k2 + OFFSET_ZOOM] <= zoom) continue;
            data[_k2 + OFFSET_ZOOM] = zoom;
            for (var _j = 0; _j < stride; _j++) nextData.push(data[_k2 + _j]);
          }
        }
      }
    }
    return nextData;
  }
  // get index of the point from which the cluster originated
  _getOriginId(clusterId) {
    return clusterId - this.points.length >> 5;
  }
  // get zoom of the point from which the cluster originated
  _getOriginZoom(clusterId) {
    return (clusterId - this.points.length) % 32;
  }
  _map(data, i2, clone) {
    if (data[i2 + OFFSET_NUM] > 1) {
      var props = this.clusterProps[data[i2 + OFFSET_PROP]];
      return clone ? Object.assign({}, props) : props;
    }
    var original = this.points[data[i2 + OFFSET_ID]].properties;
    var result = this.options.map(original);
    return clone && result === original ? Object.assign({}, result) : result;
  }
}
function getClusterJSON(data, i2, clusterProps) {
  return {
    type: "Feature",
    id: data[i2 + OFFSET_ID],
    properties: getClusterProperties(data, i2, clusterProps),
    geometry: {
      type: "Point",
      coordinates: [xLng(data[i2]), yLat(data[i2 + 1])]
    }
  };
}
function getClusterProperties(data, i2, clusterProps) {
  var count = data[i2 + OFFSET_NUM];
  var abbrev = count >= 1e4 ? "".concat(Math.round(count / 1e3), "k") : count >= 1e3 ? "".concat(Math.round(count / 100) / 10, "k") : count;
  var propIndex = data[i2 + OFFSET_PROP];
  var properties = propIndex === -1 ? {} : Object.assign({}, clusterProps[propIndex]);
  return Object.assign(properties, {
    cluster: true,
    cluster_id: data[i2 + OFFSET_ID],
    point_count: count,
    point_count_abbreviated: abbrev
  });
}
function lngX(lng) {
  return lng / 360 + 0.5;
}
function latY(lat) {
  var sin = Math.sin(lat * Math.PI / 180);
  var y2 = 0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI;
  return y2 < 0 ? 0 : y2 > 1 ? 1 : y2;
}
function xLng(x2) {
  return (x2 - 0.5) * 360;
}
function yLat(y2) {
  var y22 = (180 - y2 * 360) * Math.PI / 180;
  return 360 * Math.atan(Math.exp(y22)) / Math.PI - 90;
}
function __rest(s2, e2) {
  var t2 = {};
  for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2) && e2.indexOf(p2) < 0) t2[p2] = s2[p2];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function") for (var i2 = 0, p2 = Object.getOwnPropertySymbols(s2); i2 < p2.length; i2++) {
    if (e2.indexOf(p2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i2])) t2[p2[i2]] = s2[p2[i2]];
  }
  return t2;
}
class MarkerUtils {
  static isAdvancedMarkerAvailable(map) {
    return google.maps.marker && map.getMapCapabilities().isAdvancedMarkersAvailable === true;
  }
  static isAdvancedMarker(marker) {
    return google.maps.marker && marker instanceof google.maps.marker.AdvancedMarkerElement;
  }
  static setMap(marker, map) {
    if (this.isAdvancedMarker(marker)) {
      marker.map = map;
    } else {
      marker.setMap(map);
    }
  }
  static getPosition(marker) {
    if (this.isAdvancedMarker(marker)) {
      if (marker.position) {
        if (marker.position instanceof google.maps.LatLng) {
          return marker.position;
        }
        if (marker.position.lat && marker.position.lng) {
          return new google.maps.LatLng(marker.position.lat, marker.position.lng);
        }
      }
      return new google.maps.LatLng(null);
    }
    return marker.getPosition();
  }
  static getVisible(marker) {
    if (this.isAdvancedMarker(marker)) {
      return true;
    }
    return marker.getVisible();
  }
}
class Cluster {
  constructor(_ref) {
    var {
      markers,
      position: position2
    } = _ref;
    this.markers = markers;
    if (position2) {
      if (position2 instanceof google.maps.LatLng) {
        this._position = position2;
      } else {
        this._position = new google.maps.LatLng(position2);
      }
    }
  }
  get bounds() {
    if (this.markers.length === 0 && !this._position) {
      return;
    }
    var bounds = new google.maps.LatLngBounds(this._position, this._position);
    for (var marker of this.markers) {
      bounds.extend(MarkerUtils.getPosition(marker));
    }
    return bounds;
  }
  get position() {
    return this._position || this.bounds.getCenter();
  }
  /**
   * Get the count of **visible** markers.
   */
  get count() {
    return this.markers.filter((m2) => MarkerUtils.getVisible(m2)).length;
  }
  /**
   * Add a marker to the cluster.
   */
  push(marker) {
    this.markers.push(marker);
  }
  /**
   * Cleanup references and remove marker from map.
   */
  delete() {
    if (this.marker) {
      MarkerUtils.setMap(this.marker, null);
      this.marker = void 0;
    }
    this.markers.length = 0;
  }
}
class AbstractAlgorithm {
  constructor(_ref4) {
    var {
      maxZoom = 16
    } = _ref4;
    this.maxZoom = maxZoom;
  }
  /**
   * Helper function to bypass clustering based upon some map state such as
   * zoom, number of markers, etc.
   *
   * ```typescript
   *  cluster({markers, map}: AlgorithmInput): Cluster[] {
   *    if (shouldBypassClustering(map)) {
   *      return this.noop({markers})
   *    }
   * }
   * ```
   */
  noop(_ref5) {
    var {
      markers
    } = _ref5;
    return noop$1(markers);
  }
}
var noop$1 = (markers) => {
  var clusters = markers.map((marker) => new Cluster({
    position: MarkerUtils.getPosition(marker),
    markers: [marker]
  }));
  return clusters;
};
class SuperClusterAlgorithm extends AbstractAlgorithm {
  constructor(_a) {
    var {
      maxZoom,
      radius = 60
    } = _a, options = __rest(_a, ["maxZoom", "radius"]);
    super({
      maxZoom
    });
    this.state = {
      zoom: -1
    };
    this.superCluster = new Supercluster(Object.assign({
      maxZoom: this.maxZoom,
      radius
    }, options));
  }
  calculate(input) {
    var changed = false;
    var state = {
      zoom: input.map.getZoom()
    };
    if (!equal2(input.markers, this.markers)) {
      changed = true;
      this.markers = [...input.markers];
      var points = this.markers.map((marker) => {
        var position2 = MarkerUtils.getPosition(marker);
        var coordinates = [position2.lng(), position2.lat()];
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates
          },
          properties: {
            marker
          }
        };
      });
      this.superCluster.load(points);
    }
    if (!changed) {
      if (this.state.zoom <= this.maxZoom || state.zoom <= this.maxZoom) {
        changed = !equal2(this.state, state);
      }
    }
    this.state = state;
    if (changed) {
      this.clusters = this.cluster(input);
    }
    return {
      clusters: this.clusters,
      changed
    };
  }
  cluster(_ref10) {
    var {
      map
    } = _ref10;
    return this.superCluster.getClusters([-180, -90, 180, 90], Math.round(map.getZoom())).map((feature) => this.transformCluster(feature));
  }
  transformCluster(_ref11) {
    var {
      geometry: {
        coordinates: [lng, lat]
      },
      properties
    } = _ref11;
    if (properties.cluster) {
      return new Cluster({
        markers: this.superCluster.getLeaves(properties.cluster_id, Infinity).map((leaf) => leaf.properties.marker),
        position: {
          lat,
          lng
        }
      });
    }
    var marker = properties.marker;
    return new Cluster({
      markers: [marker],
      position: MarkerUtils.getPosition(marker)
    });
  }
}
class ClusterStats {
  constructor(markers, clusters) {
    this.markers = {
      sum: markers.length
    };
    var clusterMarkerCounts = clusters.map((a2) => a2.count);
    var clusterMarkerSum = clusterMarkerCounts.reduce((a2, b2) => a2 + b2, 0);
    this.clusters = {
      count: clusters.length,
      markers: {
        mean: clusterMarkerSum / clusters.length,
        sum: clusterMarkerSum,
        min: Math.min(...clusterMarkerCounts),
        max: Math.max(...clusterMarkerCounts)
      }
    };
  }
}
class DefaultRenderer {
  /**
   * The default render function for the library used by {@link MarkerClusterer}.
   *
   * Currently set to use the following:
   *
   * ```typescript
   * // change color if this cluster has more markers than the mean cluster
   * const color =
   *   count > Math.max(10, stats.clusters.markers.mean)
   *     ? "#ff0000"
   *     : "#0000ff";
   *
   * // create svg url with fill color
   * const svg = window.btoa(`
   * <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
   *   <circle cx="120" cy="120" opacity=".6" r="70" />
   *   <circle cx="120" cy="120" opacity=".3" r="90" />
   *   <circle cx="120" cy="120" opacity=".2" r="110" />
   *   <circle cx="120" cy="120" opacity=".1" r="130" />
   * </svg>`);
   *
   * // create marker using svg icon
   * return new google.maps.Marker({
   *   position,
   *   icon: {
   *     url: `data:image/svg+xml;base64,${svg}`,
   *     scaledSize: new google.maps.Size(45, 45),
   *   },
   *   label: {
   *     text: String(count),
   *     color: "rgba(255,255,255,0.9)",
   *     fontSize: "12px",
   *   },
   *   // adjust zIndex to be above other markers
   *   zIndex: 1000 + count,
   * });
   * ```
   */
  render(_ref14, stats, map) {
    var {
      count,
      position: position2
    } = _ref14;
    var color = count > Math.max(10, stats.clusters.markers.mean) ? "#ff0000" : "#0000ff";
    var svg = '<svg fill="'.concat(color, '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="50" height="50">\n<circle cx="120" cy="120" opacity=".6" r="70" />\n<circle cx="120" cy="120" opacity=".3" r="90" />\n<circle cx="120" cy="120" opacity=".2" r="110" />\n<text x="50%" y="50%" style="fill:#fff" text-anchor="middle" font-size="50" dominant-baseline="middle" font-family="roboto,arial,sans-serif">').concat(count, "</text>\n</svg>");
    var title = "Cluster of ".concat(count, " markers"), zIndex = Number(google.maps.Marker.MAX_ZINDEX) + count;
    if (MarkerUtils.isAdvancedMarkerAvailable(map)) {
      var parser = new DOMParser();
      var svgEl = parser.parseFromString(svg, "image/svg+xml").documentElement;
      svgEl.setAttribute("transform", "translate(0 25)");
      var _clusterOptions = {
        map,
        position: position2,
        zIndex,
        title,
        content: svgEl
      };
      return new google.maps.marker.AdvancedMarkerElement(_clusterOptions);
    }
    var clusterOptions = {
      position: position2,
      zIndex,
      title,
      icon: {
        url: "data:image/svg+xml;base64,".concat(btoa(svg)),
        anchor: new google.maps.Point(25, 25)
      }
    };
    return new google.maps.Marker(clusterOptions);
  }
}
function extend(type1, type2) {
  for (var property in type2.prototype) {
    type1.prototype[property] = type2.prototype[property];
  }
}
class OverlayViewSafe {
  constructor() {
    extend(OverlayViewSafe, google.maps.OverlayView);
  }
}
var MarkerClustererEvents;
(function(MarkerClustererEvents2) {
  MarkerClustererEvents2["CLUSTERING_BEGIN"] = "clusteringbegin";
  MarkerClustererEvents2["CLUSTERING_END"] = "clusteringend";
  MarkerClustererEvents2["CLUSTER_CLICK"] = "click";
})(MarkerClustererEvents || (MarkerClustererEvents = {}));
var defaultOnClusterClickHandler = (_, cluster, map) => {
  map.fitBounds(cluster.bounds);
};
class MarkerClusterer extends OverlayViewSafe {
  constructor(_ref15) {
    var {
      map,
      markers = [],
      algorithmOptions = {},
      algorithm = new SuperClusterAlgorithm(algorithmOptions),
      renderer = new DefaultRenderer(),
      onClusterClick = defaultOnClusterClickHandler
    } = _ref15;
    super();
    this.markers = [...markers];
    this.clusters = [];
    this.algorithm = algorithm;
    this.renderer = renderer;
    this.onClusterClick = onClusterClick;
    if (map) {
      this.setMap(map);
    }
  }
  addMarker(marker, noDraw) {
    if (this.markers.includes(marker)) {
      return;
    }
    this.markers.push(marker);
    if (!noDraw) {
      this.render();
    }
  }
  addMarkers(markers, noDraw) {
    markers.forEach((marker) => {
      this.addMarker(marker, true);
    });
    if (!noDraw) {
      this.render();
    }
  }
  removeMarker(marker, noDraw) {
    var index = this.markers.indexOf(marker);
    if (index === -1) {
      return false;
    }
    MarkerUtils.setMap(marker, null);
    this.markers.splice(index, 1);
    if (!noDraw) {
      this.render();
    }
    return true;
  }
  removeMarkers(markers, noDraw) {
    var removed = false;
    markers.forEach((marker) => {
      removed = this.removeMarker(marker, true) || removed;
    });
    if (removed && !noDraw) {
      this.render();
    }
    return removed;
  }
  clearMarkers(noDraw) {
    this.markers.length = 0;
    if (!noDraw) {
      this.render();
    }
  }
  /**
   * Recalculates and draws all the marker clusters.
   */
  render() {
    var map = this.getMap();
    if (map instanceof google.maps.Map && map.getProjection()) {
      google.maps.event.trigger(this, MarkerClustererEvents.CLUSTERING_BEGIN, this);
      var {
        clusters,
        changed
      } = this.algorithm.calculate({
        markers: this.markers,
        map,
        mapCanvasProjection: this.getProjection()
      });
      if (changed || changed == void 0) {
        var singleMarker = /* @__PURE__ */ new Set();
        for (var cluster of clusters) {
          if (cluster.markers.length == 1) {
            singleMarker.add(cluster.markers[0]);
          }
        }
        var groupMarkers = [];
        for (var _cluster2 of this.clusters) {
          if (_cluster2.marker == null) {
            continue;
          }
          if (_cluster2.markers.length == 1) {
            if (!singleMarker.has(_cluster2.marker)) {
              MarkerUtils.setMap(_cluster2.marker, null);
            }
          } else {
            groupMarkers.push(_cluster2.marker);
          }
        }
        this.clusters = clusters;
        this.renderClusters();
        requestAnimationFrame(() => groupMarkers.forEach((marker) => MarkerUtils.setMap(marker, null)));
      }
      google.maps.event.trigger(this, MarkerClustererEvents.CLUSTERING_END, this);
    }
  }
  onAdd() {
    this.idleListener = this.getMap().addListener("idle", this.render.bind(this));
    this.render();
  }
  onRemove() {
    google.maps.event.removeListener(this.idleListener);
    this.reset();
  }
  reset() {
    this.markers.forEach((marker) => MarkerUtils.setMap(marker, null));
    this.clusters.forEach((cluster) => cluster.delete());
    this.clusters = [];
  }
  renderClusters() {
    var stats = new ClusterStats(this.markers, this.clusters);
    var map = this.getMap();
    this.clusters.forEach((cluster) => {
      if (cluster.markers.length === 1) {
        cluster.marker = cluster.markers[0];
      } else {
        cluster.marker = this.renderer.render(cluster, stats, map);
        cluster.markers.forEach((marker) => MarkerUtils.setMap(marker, null));
        if (this.onClusterClick) {
          cluster.marker.addListener(
            "click",
            /* istanbul ignore next */
            (event) => {
              google.maps.event.trigger(this, MarkerClustererEvents.CLUSTER_CLICK, cluster);
              this.onClusterClick(event, cluster, map);
            }
          );
        }
      }
      MarkerUtils.setMap(cluster.marker, map);
    });
  }
}
function ownKeys$a(e2, r2) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e2);
    r2 && (o2 = o2.filter(function(r22) {
      return Object.getOwnPropertyDescriptor(e2, r22).enumerable;
    })), t2.push.apply(t2, o2);
  }
  return t2;
}
function _objectSpread$a(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$a(Object(t2), true).forEach(function(r22) {
      _defineProperty(e2, r22, t2[r22]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : ownKeys$a(Object(t2)).forEach(function(r22) {
      Object.defineProperty(e2, r22, Object.getOwnPropertyDescriptor(t2, r22));
    });
  }
  return e2;
}
function useGoogleMarkerClusterer(options) {
  var map = useGoogleMap();
  var [markerClusterer, setMarkerClusterer] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (map && markerClusterer === null) {
      var markerCluster = new MarkerClusterer(_objectSpread$a(_objectSpread$a({}, options), {}, {
        map
      }));
      setMarkerClusterer(markerCluster);
    }
  }, [map]);
  return markerClusterer;
}
function GoogleMarkerClusterer(_ref) {
  var {
    children,
    options
  } = _ref;
  var markerClusterer = useGoogleMarkerClusterer(options);
  return markerClusterer !== null ? children(markerClusterer) : null;
}
reactExports.memo(GoogleMarkerClusterer);
var eventMap$c = {
  onCloseClick: "closeclick",
  onContentChanged: "content_changed",
  onDomReady: "domready",
  onPositionChanged: "position_changed",
  onZindexChanged: "zindex_changed"
};
var updaterMap$c = {
  options(instance, options) {
    instance.setOptions(options);
  },
  position(instance, position2) {
    instance.setPosition(position2);
  },
  zIndex(instance, zIndex) {
    instance.setZIndex(zIndex);
  }
};
function InfoWindowFunctional(_ref) {
  var {
    children,
    anchor,
    options,
    position: position2,
    zIndex,
    onCloseClick,
    onDomReady,
    onContentChanged,
    onPositionChanged,
    onZindexChanged,
    onLoad,
    onUnmount
  } = _ref;
  var map = reactExports.useContext(MapContext);
  var [instance, setInstance] = reactExports.useState(null);
  var [closeclickListener, setCloseClickListener] = reactExports.useState(null);
  var [domreadyclickListener, setDomReadyClickListener] = reactExports.useState(null);
  var [contentchangedclickListener, setContentChangedClickListener] = reactExports.useState(null);
  var [positionchangedclickListener, setPositionChangedClickListener] = reactExports.useState(null);
  var [zindexchangedclickListener, setZindexChangedClickListener] = reactExports.useState(null);
  var containerElementRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (instance !== null) {
      instance.close();
      if (anchor) {
        instance.open(map, anchor);
      } else if (instance.getPosition()) {
        instance.open(map);
      }
    }
  }, [map, instance, anchor]);
  reactExports.useEffect(() => {
    if (options && instance !== null) {
      instance.setOptions(options);
    }
  }, [instance, options]);
  reactExports.useEffect(() => {
    if (position2 && instance !== null) {
      instance.setPosition(position2);
    }
  }, [position2]);
  reactExports.useEffect(() => {
    if (typeof zIndex === "number" && instance !== null) {
      instance.setZIndex(zIndex);
    }
  }, [zIndex]);
  reactExports.useEffect(() => {
    if (instance && onCloseClick) {
      if (closeclickListener !== null) {
        google.maps.event.removeListener(closeclickListener);
      }
      setCloseClickListener(google.maps.event.addListener(instance, "closeclick", onCloseClick));
    }
  }, [onCloseClick]);
  reactExports.useEffect(() => {
    if (instance && onDomReady) {
      if (domreadyclickListener !== null) {
        google.maps.event.removeListener(domreadyclickListener);
      }
      setDomReadyClickListener(google.maps.event.addListener(instance, "domready", onDomReady));
    }
  }, [onDomReady]);
  reactExports.useEffect(() => {
    if (instance && onContentChanged) {
      if (contentchangedclickListener !== null) {
        google.maps.event.removeListener(contentchangedclickListener);
      }
      setContentChangedClickListener(google.maps.event.addListener(instance, "content_changed", onContentChanged));
    }
  }, [onContentChanged]);
  reactExports.useEffect(() => {
    if (instance && onPositionChanged) {
      if (positionchangedclickListener !== null) {
        google.maps.event.removeListener(positionchangedclickListener);
      }
      setPositionChangedClickListener(google.maps.event.addListener(instance, "position_changed", onPositionChanged));
    }
  }, [onPositionChanged]);
  reactExports.useEffect(() => {
    if (instance && onZindexChanged) {
      if (zindexchangedclickListener !== null) {
        google.maps.event.removeListener(zindexchangedclickListener);
      }
      setZindexChangedClickListener(google.maps.event.addListener(instance, "zindex_changed", onZindexChanged));
    }
  }, [onZindexChanged]);
  reactExports.useEffect(() => {
    var infoWindow = new google.maps.InfoWindow(options);
    setInstance(infoWindow);
    containerElementRef.current = document.createElement("div");
    if (onCloseClick) {
      setCloseClickListener(google.maps.event.addListener(infoWindow, "closeclick", onCloseClick));
    }
    if (onDomReady) {
      setDomReadyClickListener(google.maps.event.addListener(infoWindow, "domready", onDomReady));
    }
    if (onContentChanged) {
      setContentChangedClickListener(google.maps.event.addListener(infoWindow, "content_changed", onContentChanged));
    }
    if (onPositionChanged) {
      setPositionChangedClickListener(google.maps.event.addListener(infoWindow, "position_changed", onPositionChanged));
    }
    if (onZindexChanged) {
      setZindexChangedClickListener(google.maps.event.addListener(infoWindow, "zindex_changed", onZindexChanged));
    }
    infoWindow.setContent(containerElementRef.current);
    if (position2) {
      infoWindow.setPosition(position2);
    }
    if (zIndex) {
      infoWindow.setZIndex(zIndex);
    }
    if (anchor) {
      infoWindow.open(map, anchor);
    } else if (infoWindow.getPosition()) {
      infoWindow.open(map);
    } else {
      invariant(false, "You must provide either an anchor (typically render it inside a <Marker>) or a position props for <InfoWindow>.");
    }
    if (onLoad) {
      onLoad(infoWindow);
    }
    return () => {
      if (closeclickListener) {
        google.maps.event.removeListener(closeclickListener);
      }
      if (contentchangedclickListener) {
        google.maps.event.removeListener(contentchangedclickListener);
      }
      if (domreadyclickListener) {
        google.maps.event.removeListener(domreadyclickListener);
      }
      if (positionchangedclickListener) {
        google.maps.event.removeListener(positionchangedclickListener);
      }
      if (zindexchangedclickListener) {
        google.maps.event.removeListener(zindexchangedclickListener);
      }
      if (onUnmount) {
        onUnmount(infoWindow);
      }
      infoWindow.close();
    };
  }, []);
  return containerElementRef.current ? reactDomExports.createPortal(reactExports.Children.only(children), containerElementRef.current) : null;
}
reactExports.memo(InfoWindowFunctional);
class InfoWindow extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "containerElement", null);
    _defineProperty(this, "state", {
      infoWindow: null
    });
    _defineProperty(this, "open", (infoWindow, anchor) => {
      if (anchor) {
        infoWindow.open(this.context, anchor);
      } else if (infoWindow.getPosition()) {
        infoWindow.open(this.context);
      } else {
        invariant(false, "You must provide either an anchor (typically render it inside a <Marker>) or a position props for <InfoWindow>.");
      }
    });
    _defineProperty(this, "setInfoWindowCallback", () => {
      if (this.state.infoWindow !== null && this.containerElement !== null) {
        this.state.infoWindow.setContent(this.containerElement);
        this.open(this.state.infoWindow, this.props.anchor);
        if (this.props.onLoad) {
          this.props.onLoad(this.state.infoWindow);
        }
      }
    });
  }
  componentDidMount() {
    var infoWindow = new google.maps.InfoWindow(this.props.options);
    this.containerElement = document.createElement("div");
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$c,
      eventMap: eventMap$c,
      prevProps: {},
      nextProps: this.props,
      instance: infoWindow
    });
    this.setState(() => {
      return {
        infoWindow
      };
    }, this.setInfoWindowCallback);
  }
  componentDidUpdate(prevProps) {
    if (this.state.infoWindow !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$c,
        eventMap: eventMap$c,
        prevProps,
        nextProps: this.props,
        instance: this.state.infoWindow
      });
    }
  }
  componentWillUnmount() {
    if (this.state.infoWindow !== null) {
      unregisterEvents(this.registeredEvents);
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.infoWindow);
      }
      this.state.infoWindow.close();
    }
  }
  render() {
    return this.containerElement ? reactDomExports.createPortal(reactExports.Children.only(this.props.children), this.containerElement) : null;
  }
}
_defineProperty(InfoWindow, "contextType", MapContext);
function ownKeys$9(e2, r2) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e2);
    r2 && (o2 = o2.filter(function(r22) {
      return Object.getOwnPropertyDescriptor(e2, r22).enumerable;
    })), t2.push.apply(t2, o2);
  }
  return t2;
}
function _objectSpread$9(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$9(Object(t2), true).forEach(function(r22) {
      _defineProperty(e2, r22, t2[r22]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : ownKeys$9(Object(t2)).forEach(function(r22) {
      Object.defineProperty(e2, r22, Object.getOwnPropertyDescriptor(t2, r22));
    });
  }
  return e2;
}
var eventMap$b = {
  onClick: "click",
  onDblClick: "dblclick",
  onDrag: "drag",
  onDragEnd: "dragend",
  onDragStart: "dragstart",
  onMouseDown: "mousedown",
  onMouseMove: "mousemove",
  onMouseOut: "mouseout",
  onMouseOver: "mouseover",
  onMouseUp: "mouseup",
  onRightClick: "rightclick"
};
var updaterMap$b = {
  draggable(instance, draggable) {
    instance.setDraggable(draggable);
  },
  editable(instance, editable) {
    instance.setEditable(editable);
  },
  map(instance, map) {
    instance.setMap(map);
  },
  options(instance, options) {
    instance.setOptions(options);
  },
  path(instance, path) {
    instance.setPath(path);
  },
  visible(instance, visible) {
    instance.setVisible(visible);
  }
};
var defaultOptions$1 = {};
function PolylineFunctional(_ref) {
  var {
    options,
    draggable,
    editable,
    visible,
    path,
    onDblClick,
    onDragEnd,
    onDragStart,
    onMouseDown,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onMouseUp,
    onRightClick,
    onClick,
    onDrag,
    onLoad,
    onUnmount
  } = _ref;
  var map = reactExports.useContext(MapContext);
  var [instance, setInstance] = reactExports.useState(null);
  var [dblclickListener, setDblclickListener] = reactExports.useState(null);
  var [dragendListener, setDragendListener] = reactExports.useState(null);
  var [dragstartListener, setDragstartListener] = reactExports.useState(null);
  var [mousedownListener, setMousedownListener] = reactExports.useState(null);
  var [mousemoveListener, setMousemoveListener] = reactExports.useState(null);
  var [mouseoutListener, setMouseoutListener] = reactExports.useState(null);
  var [mouseoverListener, setMouseoverListener] = reactExports.useState(null);
  var [mouseupListener, setMouseupListener] = reactExports.useState(null);
  var [rightclickListener, setRightclickListener] = reactExports.useState(null);
  var [clickListener, setClickListener] = reactExports.useState(null);
  var [dragListener, setDragListener] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);
  reactExports.useEffect(() => {
    if (typeof options !== "undefined" && instance !== null) {
      instance.setOptions(options);
    }
  }, [instance, options]);
  reactExports.useEffect(() => {
    if (typeof draggable !== "undefined" && instance !== null) {
      instance.setDraggable(draggable);
    }
  }, [instance, draggable]);
  reactExports.useEffect(() => {
    if (typeof editable !== "undefined" && instance !== null) {
      instance.setEditable(editable);
    }
  }, [instance, editable]);
  reactExports.useEffect(() => {
    if (typeof visible !== "undefined" && instance !== null) {
      instance.setVisible(visible);
    }
  }, [instance, visible]);
  reactExports.useEffect(() => {
    if (typeof path !== "undefined" && instance !== null) {
      instance.setPath(path);
    }
  }, [instance, path]);
  reactExports.useEffect(() => {
    if (instance && onDblClick) {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      setDblclickListener(google.maps.event.addListener(instance, "dblclick", onDblClick));
    }
  }, [onDblClick]);
  reactExports.useEffect(() => {
    if (instance && onDragEnd) {
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }
      setDragendListener(google.maps.event.addListener(instance, "dragend", onDragEnd));
    }
  }, [onDragEnd]);
  reactExports.useEffect(() => {
    if (instance && onDragStart) {
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }
      setDragstartListener(google.maps.event.addListener(instance, "dragstart", onDragStart));
    }
  }, [onDragStart]);
  reactExports.useEffect(() => {
    if (instance && onMouseDown) {
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      setMousedownListener(google.maps.event.addListener(instance, "mousedown", onMouseDown));
    }
  }, [onMouseDown]);
  reactExports.useEffect(() => {
    if (instance && onMouseMove) {
      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener);
      }
      setMousemoveListener(google.maps.event.addListener(instance, "mousemove", onMouseMove));
    }
  }, [onMouseMove]);
  reactExports.useEffect(() => {
    if (instance && onMouseOut) {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      setMouseoutListener(google.maps.event.addListener(instance, "mouseout", onMouseOut));
    }
  }, [onMouseOut]);
  reactExports.useEffect(() => {
    if (instance && onMouseOver) {
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      setMouseoverListener(google.maps.event.addListener(instance, "mouseover", onMouseOver));
    }
  }, [onMouseOver]);
  reactExports.useEffect(() => {
    if (instance && onMouseUp) {
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      setMouseupListener(google.maps.event.addListener(instance, "mouseup", onMouseUp));
    }
  }, [onMouseUp]);
  reactExports.useEffect(() => {
    if (instance && onRightClick) {
      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener);
      }
      setRightclickListener(google.maps.event.addListener(instance, "rightclick", onRightClick));
    }
  }, [onRightClick]);
  reactExports.useEffect(() => {
    if (instance && onClick) {
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      setClickListener(google.maps.event.addListener(instance, "click", onClick));
    }
  }, [onClick]);
  reactExports.useEffect(() => {
    if (instance && onDrag) {
      if (dragListener !== null) {
        google.maps.event.removeListener(dragListener);
      }
      setDragListener(google.maps.event.addListener(instance, "drag", onDrag));
    }
  }, [onDrag]);
  reactExports.useEffect(() => {
    var polyline = new google.maps.Polyline(_objectSpread$9(_objectSpread$9({}, options || defaultOptions$1), {}, {
      map
    }));
    if (path) {
      polyline.setPath(path);
    }
    if (typeof visible !== "undefined") {
      polyline.setVisible(visible);
    }
    if (typeof editable !== "undefined") {
      polyline.setEditable(editable);
    }
    if (typeof draggable !== "undefined") {
      polyline.setDraggable(draggable);
    }
    if (onDblClick) {
      setDblclickListener(google.maps.event.addListener(polyline, "dblclick", onDblClick));
    }
    if (onDragEnd) {
      setDragendListener(google.maps.event.addListener(polyline, "dragend", onDragEnd));
    }
    if (onDragStart) {
      setDragstartListener(google.maps.event.addListener(polyline, "dragstart", onDragStart));
    }
    if (onMouseDown) {
      setMousedownListener(google.maps.event.addListener(polyline, "mousedown", onMouseDown));
    }
    if (onMouseMove) {
      setMousemoveListener(google.maps.event.addListener(polyline, "mousemove", onMouseMove));
    }
    if (onMouseOut) {
      setMouseoutListener(google.maps.event.addListener(polyline, "mouseout", onMouseOut));
    }
    if (onMouseOver) {
      setMouseoverListener(google.maps.event.addListener(polyline, "mouseover", onMouseOver));
    }
    if (onMouseUp) {
      setMouseupListener(google.maps.event.addListener(polyline, "mouseup", onMouseUp));
    }
    if (onRightClick) {
      setRightclickListener(google.maps.event.addListener(polyline, "rightclick", onRightClick));
    }
    if (onClick) {
      setClickListener(google.maps.event.addListener(polyline, "click", onClick));
    }
    if (onDrag) {
      setDragListener(google.maps.event.addListener(polyline, "drag", onDrag));
    }
    setInstance(polyline);
    if (onLoad) {
      onLoad(polyline);
    }
    return () => {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener);
      }
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener);
      }
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      if (onUnmount) {
        onUnmount(polyline);
      }
      polyline.setMap(null);
    };
  }, []);
  return null;
}
reactExports.memo(PolylineFunctional);
class Polyline extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "state", {
      polyline: null
    });
    _defineProperty(this, "setPolylineCallback", () => {
      if (this.state.polyline !== null && this.props.onLoad) {
        this.props.onLoad(this.state.polyline);
      }
    });
  }
  componentDidMount() {
    var polyline = new google.maps.Polyline(_objectSpread$9(_objectSpread$9({}, this.props.options), {}, {
      map: this.context
    }));
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$b,
      eventMap: eventMap$b,
      prevProps: {},
      nextProps: this.props,
      instance: polyline
    });
    this.setState(function setPolyline() {
      return {
        polyline
      };
    }, this.setPolylineCallback);
  }
  componentDidUpdate(prevProps) {
    if (this.state.polyline !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$b,
        eventMap: eventMap$b,
        prevProps,
        nextProps: this.props,
        instance: this.state.polyline
      });
    }
  }
  componentWillUnmount() {
    if (this.state.polyline === null) {
      return;
    }
    if (this.props.onUnmount) {
      this.props.onUnmount(this.state.polyline);
    }
    unregisterEvents(this.registeredEvents);
    this.state.polyline.setMap(null);
  }
  render() {
    return null;
  }
}
_defineProperty(Polyline, "contextType", MapContext);
function ownKeys$8(e2, r2) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e2);
    r2 && (o2 = o2.filter(function(r22) {
      return Object.getOwnPropertyDescriptor(e2, r22).enumerable;
    })), t2.push.apply(t2, o2);
  }
  return t2;
}
function _objectSpread$8(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$8(Object(t2), true).forEach(function(r22) {
      _defineProperty(e2, r22, t2[r22]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : ownKeys$8(Object(t2)).forEach(function(r22) {
      Object.defineProperty(e2, r22, Object.getOwnPropertyDescriptor(t2, r22));
    });
  }
  return e2;
}
var eventMap$a = {
  onClick: "click",
  onDblClick: "dblclick",
  onDrag: "drag",
  onDragEnd: "dragend",
  onDragStart: "dragstart",
  onMouseDown: "mousedown",
  onMouseMove: "mousemove",
  onMouseOut: "mouseout",
  onMouseOver: "mouseover",
  onMouseUp: "mouseup",
  onRightClick: "rightclick"
};
var updaterMap$a = {
  draggable(instance, draggable) {
    instance.setDraggable(draggable);
  },
  editable(instance, editable) {
    instance.setEditable(editable);
  },
  map(instance, map) {
    instance.setMap(map);
  },
  options(instance, options) {
    instance.setOptions(options);
  },
  path(instance, path) {
    instance.setPath(path);
  },
  paths(instance, paths) {
    instance.setPaths(paths);
  },
  visible(instance, visible) {
    instance.setVisible(visible);
  }
};
function PolygonFunctional(_ref) {
  var {
    options,
    draggable,
    editable,
    visible,
    path,
    paths,
    onDblClick,
    onDragEnd,
    onDragStart,
    onMouseDown,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onMouseUp,
    onRightClick,
    onClick,
    onDrag,
    onLoad,
    onUnmount,
    onEdit
  } = _ref;
  var map = reactExports.useContext(MapContext);
  var [instance, setInstance] = reactExports.useState(null);
  var [dblclickListener, setDblclickListener] = reactExports.useState(null);
  var [dragendListener, setDragendListener] = reactExports.useState(null);
  var [dragstartListener, setDragstartListener] = reactExports.useState(null);
  var [mousedownListener, setMousedownListener] = reactExports.useState(null);
  var [mousemoveListener, setMousemoveListener] = reactExports.useState(null);
  var [mouseoutListener, setMouseoutListener] = reactExports.useState(null);
  var [mouseoverListener, setMouseoverListener] = reactExports.useState(null);
  var [mouseupListener, setMouseupListener] = reactExports.useState(null);
  var [rightclickListener, setRightclickListener] = reactExports.useState(null);
  var [clickListener, setClickListener] = reactExports.useState(null);
  var [dragListener, setDragListener] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);
  reactExports.useEffect(() => {
    if (typeof options !== "undefined" && instance !== null) {
      instance.setOptions(options);
    }
  }, [instance, options]);
  reactExports.useEffect(() => {
    if (typeof draggable !== "undefined" && instance !== null) {
      instance.setDraggable(draggable);
    }
  }, [instance, draggable]);
  reactExports.useEffect(() => {
    if (typeof editable !== "undefined" && instance !== null) {
      instance.setEditable(editable);
    }
  }, [instance, editable]);
  reactExports.useEffect(() => {
    if (typeof visible !== "undefined" && instance !== null) {
      instance.setVisible(visible);
    }
  }, [instance, visible]);
  reactExports.useEffect(() => {
    if (typeof path !== "undefined" && instance !== null) {
      instance.setPath(path);
    }
  }, [instance, path]);
  reactExports.useEffect(() => {
    if (typeof paths !== "undefined" && instance !== null) {
      instance.setPaths(paths);
    }
  }, [instance, paths]);
  reactExports.useEffect(() => {
    if (instance && typeof onDblClick === "function") {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      setDblclickListener(google.maps.event.addListener(instance, "dblclick", onDblClick));
    }
  }, [onDblClick]);
  reactExports.useEffect(() => {
    if (!instance) {
      return;
    }
    google.maps.event.addListener(instance.getPath(), "insert_at", () => {
      onEdit === null || onEdit === void 0 || onEdit(instance);
    });
    google.maps.event.addListener(instance.getPath(), "set_at", () => {
      onEdit === null || onEdit === void 0 || onEdit(instance);
    });
    google.maps.event.addListener(instance.getPath(), "remove_at", () => {
      onEdit === null || onEdit === void 0 || onEdit(instance);
    });
  }, [instance, onEdit]);
  reactExports.useEffect(() => {
    if (instance && typeof onDragEnd === "function") {
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }
      setDragendListener(google.maps.event.addListener(instance, "dragend", onDragEnd));
    }
  }, [onDragEnd]);
  reactExports.useEffect(() => {
    if (instance && typeof onDragStart === "function") {
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }
      setDragstartListener(google.maps.event.addListener(instance, "dragstart", onDragStart));
    }
  }, [onDragStart]);
  reactExports.useEffect(() => {
    if (instance && typeof onMouseDown === "function") {
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      setMousedownListener(google.maps.event.addListener(instance, "mousedown", onMouseDown));
    }
  }, [onMouseDown]);
  reactExports.useEffect(() => {
    if (instance && typeof onMouseMove === "function") {
      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener);
      }
      setMousemoveListener(google.maps.event.addListener(instance, "mousemove", onMouseMove));
    }
  }, [onMouseMove]);
  reactExports.useEffect(() => {
    if (instance && typeof onMouseOut === "function") {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      setMouseoutListener(google.maps.event.addListener(instance, "mouseout", onMouseOut));
    }
  }, [onMouseOut]);
  reactExports.useEffect(() => {
    if (instance && typeof onMouseOver === "function") {
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      setMouseoverListener(google.maps.event.addListener(instance, "mouseover", onMouseOver));
    }
  }, [onMouseOver]);
  reactExports.useEffect(() => {
    if (instance && typeof onMouseUp === "function") {
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      setMouseupListener(google.maps.event.addListener(instance, "mouseup", onMouseUp));
    }
  }, [onMouseUp]);
  reactExports.useEffect(() => {
    if (instance && typeof onRightClick === "function") {
      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener);
      }
      setRightclickListener(google.maps.event.addListener(instance, "rightclick", onRightClick));
    }
  }, [onRightClick]);
  reactExports.useEffect(() => {
    if (instance && typeof onClick === "function") {
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      setClickListener(google.maps.event.addListener(instance, "click", onClick));
    }
  }, [onClick]);
  reactExports.useEffect(() => {
    if (instance && typeof onDrag === "function") {
      if (dragListener !== null) {
        google.maps.event.removeListener(dragListener);
      }
      setDragListener(google.maps.event.addListener(instance, "drag", onDrag));
    }
  }, [onDrag]);
  reactExports.useEffect(() => {
    var polygon = new google.maps.Polygon(_objectSpread$8(_objectSpread$8({}, options), {}, {
      map
    }));
    if (path) {
      polygon.setPath(path);
    }
    if (paths) {
      polygon.setPaths(paths);
    }
    if (typeof visible !== "undefined") {
      polygon.setVisible(visible);
    }
    if (typeof editable !== "undefined") {
      polygon.setEditable(editable);
    }
    if (typeof draggable !== "undefined") {
      polygon.setDraggable(draggable);
    }
    if (onDblClick) {
      setDblclickListener(google.maps.event.addListener(polygon, "dblclick", onDblClick));
    }
    if (onDragEnd) {
      setDragendListener(google.maps.event.addListener(polygon, "dragend", onDragEnd));
    }
    if (onDragStart) {
      setDragstartListener(google.maps.event.addListener(polygon, "dragstart", onDragStart));
    }
    if (onMouseDown) {
      setMousedownListener(google.maps.event.addListener(polygon, "mousedown", onMouseDown));
    }
    if (onMouseMove) {
      setMousemoveListener(google.maps.event.addListener(polygon, "mousemove", onMouseMove));
    }
    if (onMouseOut) {
      setMouseoutListener(google.maps.event.addListener(polygon, "mouseout", onMouseOut));
    }
    if (onMouseOver) {
      setMouseoverListener(google.maps.event.addListener(polygon, "mouseover", onMouseOver));
    }
    if (onMouseUp) {
      setMouseupListener(google.maps.event.addListener(polygon, "mouseup", onMouseUp));
    }
    if (onRightClick) {
      setRightclickListener(google.maps.event.addListener(polygon, "rightclick", onRightClick));
    }
    if (onClick) {
      setClickListener(google.maps.event.addListener(polygon, "click", onClick));
    }
    if (onDrag) {
      setDragListener(google.maps.event.addListener(polygon, "drag", onDrag));
    }
    setInstance(polygon);
    if (onLoad) {
      onLoad(polygon);
    }
    return () => {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener);
      }
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener);
      }
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      if (onUnmount) {
        onUnmount(polygon);
      }
      polygon.setMap(null);
    };
  }, []);
  return null;
}
reactExports.memo(PolygonFunctional);
class Polygon extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
  }
  componentDidMount() {
    var polygonOptions = this.props.options || {};
    this.polygon = new google.maps.Polygon(polygonOptions);
    this.polygon.setMap(this.context);
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$a,
      eventMap: eventMap$a,
      prevProps: {},
      nextProps: this.props,
      instance: this.polygon
    });
    if (this.props.onLoad) {
      this.props.onLoad(this.polygon);
    }
  }
  componentDidUpdate(prevProps) {
    if (this.polygon) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$a,
        eventMap: eventMap$a,
        prevProps,
        nextProps: this.props,
        instance: this.polygon
      });
    }
  }
  componentWillUnmount() {
    if (this.polygon) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.polygon);
      }
      unregisterEvents(this.registeredEvents);
      if (this.polygon) {
        this.polygon.setMap(null);
      }
    }
  }
  render() {
    return null;
  }
}
_defineProperty(Polygon, "contextType", MapContext);
function ownKeys$7(e2, r2) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e2);
    r2 && (o2 = o2.filter(function(r22) {
      return Object.getOwnPropertyDescriptor(e2, r22).enumerable;
    })), t2.push.apply(t2, o2);
  }
  return t2;
}
function _objectSpread$7(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$7(Object(t2), true).forEach(function(r22) {
      _defineProperty(e2, r22, t2[r22]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : ownKeys$7(Object(t2)).forEach(function(r22) {
      Object.defineProperty(e2, r22, Object.getOwnPropertyDescriptor(t2, r22));
    });
  }
  return e2;
}
var eventMap$9 = {
  onBoundsChanged: "bounds_changed",
  onClick: "click",
  onDblClick: "dblclick",
  onDrag: "drag",
  onDragEnd: "dragend",
  onDragStart: "dragstart",
  onMouseDown: "mousedown",
  onMouseMove: "mousemove",
  onMouseOut: "mouseout",
  onMouseOver: "mouseover",
  onMouseUp: "mouseup",
  onRightClick: "rightclick"
};
var updaterMap$9 = {
  bounds(instance, bounds) {
    instance.setBounds(bounds);
  },
  draggable(instance, draggable) {
    instance.setDraggable(draggable);
  },
  editable(instance, editable) {
    instance.setEditable(editable);
  },
  map(instance, map) {
    instance.setMap(map);
  },
  options(instance, options) {
    instance.setOptions(options);
  },
  visible(instance, visible) {
    instance.setVisible(visible);
  }
};
function RectangleFunctional(_ref) {
  var {
    options,
    bounds,
    draggable,
    editable,
    visible,
    onDblClick,
    onDragEnd,
    onDragStart,
    onMouseDown,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onMouseUp,
    onRightClick,
    onClick,
    onDrag,
    onBoundsChanged,
    onLoad,
    onUnmount
  } = _ref;
  var map = reactExports.useContext(MapContext);
  var [instance, setInstance] = reactExports.useState(null);
  var [dblclickListener, setDblclickListener] = reactExports.useState(null);
  var [dragendListener, setDragendListener] = reactExports.useState(null);
  var [dragstartListener, setDragstartListener] = reactExports.useState(null);
  var [mousedownListener, setMousedownListener] = reactExports.useState(null);
  var [mousemoveListener, setMousemoveListener] = reactExports.useState(null);
  var [mouseoutListener, setMouseoutListener] = reactExports.useState(null);
  var [mouseoverListener, setMouseoverListener] = reactExports.useState(null);
  var [mouseupListener, setMouseupListener] = reactExports.useState(null);
  var [rightClickListener, setRightClickListener] = reactExports.useState(null);
  var [clickListener, setClickListener] = reactExports.useState(null);
  var [dragListener, setDragListener] = reactExports.useState(null);
  var [boundsChangedListener, setBoundsChangedListener] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);
  reactExports.useEffect(() => {
    if (typeof options !== "undefined" && instance !== null) {
      instance.setOptions(options);
    }
  }, [instance, options]);
  reactExports.useEffect(() => {
    if (typeof draggable !== "undefined" && instance !== null) {
      instance.setDraggable(draggable);
    }
  }, [instance, draggable]);
  reactExports.useEffect(() => {
    if (typeof editable !== "undefined" && instance !== null) {
      instance.setEditable(editable);
    }
  }, [instance, editable]);
  reactExports.useEffect(() => {
    if (typeof visible !== "undefined" && instance !== null) {
      instance.setVisible(visible);
    }
  }, [instance, visible]);
  reactExports.useEffect(() => {
    if (typeof bounds !== "undefined" && instance !== null) {
      instance.setBounds(bounds);
    }
  }, [instance, bounds]);
  reactExports.useEffect(() => {
    if (instance && onDblClick) {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      setDblclickListener(google.maps.event.addListener(instance, "dblclick", onDblClick));
    }
  }, [onDblClick]);
  reactExports.useEffect(() => {
    if (instance && onDragEnd) {
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }
      setDragendListener(google.maps.event.addListener(instance, "dragend", onDragEnd));
    }
  }, [onDragEnd]);
  reactExports.useEffect(() => {
    if (instance && onDragStart) {
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }
      setDragstartListener(google.maps.event.addListener(instance, "dragstart", onDragStart));
    }
  }, [onDragStart]);
  reactExports.useEffect(() => {
    if (instance && onMouseDown) {
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      setMousedownListener(google.maps.event.addListener(instance, "mousedown", onMouseDown));
    }
  }, [onMouseDown]);
  reactExports.useEffect(() => {
    if (instance && onMouseMove) {
      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener);
      }
      setMousemoveListener(google.maps.event.addListener(instance, "mousemove", onMouseMove));
    }
  }, [onMouseMove]);
  reactExports.useEffect(() => {
    if (instance && onMouseOut) {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      setMouseoutListener(google.maps.event.addListener(instance, "mouseout", onMouseOut));
    }
  }, [onMouseOut]);
  reactExports.useEffect(() => {
    if (instance && onMouseOver) {
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      setMouseoverListener(google.maps.event.addListener(instance, "mouseover", onMouseOver));
    }
  }, [onMouseOver]);
  reactExports.useEffect(() => {
    if (instance && onMouseUp) {
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      setMouseupListener(google.maps.event.addListener(instance, "mouseup", onMouseUp));
    }
  }, [onMouseUp]);
  reactExports.useEffect(() => {
    if (instance && onRightClick) {
      if (rightClickListener !== null) {
        google.maps.event.removeListener(rightClickListener);
      }
      setRightClickListener(google.maps.event.addListener(instance, "rightclick", onRightClick));
    }
  }, [onRightClick]);
  reactExports.useEffect(() => {
    if (instance && onClick) {
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      setClickListener(google.maps.event.addListener(instance, "click", onClick));
    }
  }, [onClick]);
  reactExports.useEffect(() => {
    if (instance && onDrag) {
      if (dragListener !== null) {
        google.maps.event.removeListener(dragListener);
      }
      setDragListener(google.maps.event.addListener(instance, "drag", onDrag));
    }
  }, [onDrag]);
  reactExports.useEffect(() => {
    if (instance && onBoundsChanged) {
      if (boundsChangedListener !== null) {
        google.maps.event.removeListener(boundsChangedListener);
      }
      setBoundsChangedListener(google.maps.event.addListener(instance, "bounds_changed", onBoundsChanged));
    }
  }, [onBoundsChanged]);
  reactExports.useEffect(() => {
    var rectangle = new google.maps.Rectangle(_objectSpread$7(_objectSpread$7({}, options), {}, {
      map
    }));
    if (typeof visible !== "undefined") {
      rectangle.setVisible(visible);
    }
    if (typeof editable !== "undefined") {
      rectangle.setEditable(editable);
    }
    if (typeof draggable !== "undefined") {
      rectangle.setDraggable(draggable);
    }
    if (typeof bounds !== "undefined") {
      rectangle.setBounds(bounds);
    }
    if (onDblClick) {
      setDblclickListener(google.maps.event.addListener(rectangle, "dblclick", onDblClick));
    }
    if (onDragEnd) {
      setDragendListener(google.maps.event.addListener(rectangle, "dragend", onDragEnd));
    }
    if (onDragStart) {
      setDragstartListener(google.maps.event.addListener(rectangle, "dragstart", onDragStart));
    }
    if (onMouseDown) {
      setMousedownListener(google.maps.event.addListener(rectangle, "mousedown", onMouseDown));
    }
    if (onMouseMove) {
      setMousemoveListener(google.maps.event.addListener(rectangle, "mousemove", onMouseMove));
    }
    if (onMouseOut) {
      setMouseoutListener(google.maps.event.addListener(rectangle, "mouseout", onMouseOut));
    }
    if (onMouseOver) {
      setMouseoverListener(google.maps.event.addListener(rectangle, "mouseover", onMouseOver));
    }
    if (onMouseUp) {
      setMouseupListener(google.maps.event.addListener(rectangle, "mouseup", onMouseUp));
    }
    if (onRightClick) {
      setRightClickListener(google.maps.event.addListener(rectangle, "rightclick", onRightClick));
    }
    if (onClick) {
      setClickListener(google.maps.event.addListener(rectangle, "click", onClick));
    }
    if (onDrag) {
      setDragListener(google.maps.event.addListener(rectangle, "drag", onDrag));
    }
    if (onBoundsChanged) {
      setBoundsChangedListener(google.maps.event.addListener(rectangle, "bounds_changed", onBoundsChanged));
    }
    setInstance(rectangle);
    if (onLoad) {
      onLoad(rectangle);
    }
    return () => {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener);
      }
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      if (rightClickListener !== null) {
        google.maps.event.removeListener(rightClickListener);
      }
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      if (dragListener !== null) {
        google.maps.event.removeListener(dragListener);
      }
      if (boundsChangedListener !== null) {
        google.maps.event.removeListener(boundsChangedListener);
      }
      if (onUnmount) {
        onUnmount(rectangle);
      }
      rectangle.setMap(null);
    };
  }, []);
  return null;
}
reactExports.memo(RectangleFunctional);
class Rectangle extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "state", {
      rectangle: null
    });
    _defineProperty(this, "setRectangleCallback", () => {
      if (this.state.rectangle !== null && this.props.onLoad) {
        this.props.onLoad(this.state.rectangle);
      }
    });
  }
  componentDidMount() {
    var rectangle = new google.maps.Rectangle(_objectSpread$7(_objectSpread$7({}, this.props.options), {}, {
      map: this.context
    }));
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$9,
      eventMap: eventMap$9,
      prevProps: {},
      nextProps: this.props,
      instance: rectangle
    });
    this.setState(function setRectangle() {
      return {
        rectangle
      };
    }, this.setRectangleCallback);
  }
  componentDidUpdate(prevProps) {
    if (this.state.rectangle !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$9,
        eventMap: eventMap$9,
        prevProps,
        nextProps: this.props,
        instance: this.state.rectangle
      });
    }
  }
  componentWillUnmount() {
    if (this.state.rectangle !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.rectangle);
      }
      unregisterEvents(this.registeredEvents);
      this.state.rectangle.setMap(null);
    }
  }
  render() {
    return null;
  }
}
_defineProperty(Rectangle, "contextType", MapContext);
function ownKeys$6(e2, r2) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e2);
    r2 && (o2 = o2.filter(function(r22) {
      return Object.getOwnPropertyDescriptor(e2, r22).enumerable;
    })), t2.push.apply(t2, o2);
  }
  return t2;
}
function _objectSpread$6(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$6(Object(t2), true).forEach(function(r22) {
      _defineProperty(e2, r22, t2[r22]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : ownKeys$6(Object(t2)).forEach(function(r22) {
      Object.defineProperty(e2, r22, Object.getOwnPropertyDescriptor(t2, r22));
    });
  }
  return e2;
}
var eventMap$8 = {
  onCenterChanged: "center_changed",
  onRadiusChanged: "radius_changed",
  onClick: "click",
  onDblClick: "dblclick",
  onDrag: "drag",
  onDragEnd: "dragend",
  onDragStart: "dragstart",
  onMouseDown: "mousedown",
  onMouseMove: "mousemove",
  onMouseOut: "mouseout",
  onMouseOver: "mouseover",
  onMouseUp: "mouseup",
  onRightClick: "rightclick"
};
var updaterMap$8 = {
  center(instance, center) {
    instance.setCenter(center);
  },
  draggable(instance, draggable) {
    instance.setDraggable(draggable);
  },
  editable(instance, editable) {
    instance.setEditable(editable);
  },
  map(instance, map) {
    instance.setMap(map);
  },
  options(instance, options) {
    instance.setOptions(options);
  },
  radius(instance, radius) {
    instance.setRadius(radius);
  },
  visible(instance, visible) {
    instance.setVisible(visible);
  }
};
var defaultOptions = {};
function CircleFunctional(_ref) {
  var {
    options,
    center,
    radius,
    draggable,
    editable,
    visible,
    onDblClick,
    onDragEnd,
    onDragStart,
    onMouseDown,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onMouseUp,
    onRightClick,
    onClick,
    onDrag,
    onCenterChanged,
    onRadiusChanged,
    onLoad,
    onUnmount
  } = _ref;
  var map = reactExports.useContext(MapContext);
  var [instance, setInstance] = reactExports.useState(null);
  var [dblclickListener, setDblclickListener] = reactExports.useState(null);
  var [dragendListener, setDragendListener] = reactExports.useState(null);
  var [dragstartListener, setDragstartListener] = reactExports.useState(null);
  var [mousedownListener, setMousedownListener] = reactExports.useState(null);
  var [mousemoveListener, setMousemoveListener] = reactExports.useState(null);
  var [mouseoutListener, setMouseoutListener] = reactExports.useState(null);
  var [mouseoverListener, setMouseoverListener] = reactExports.useState(null);
  var [mouseupListener, setMouseupListener] = reactExports.useState(null);
  var [rightclickListener, setRightclickListener] = reactExports.useState(null);
  var [clickListener, setClickListener] = reactExports.useState(null);
  var [dragListener, setDragListener] = reactExports.useState(null);
  var [centerChangedListener, setCenterChangedListener] = reactExports.useState(null);
  var [radiusChangedListener, setRadiusChangedListener] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);
  reactExports.useEffect(() => {
    if (typeof options !== "undefined" && instance !== null) {
      instance.setOptions(options);
    }
  }, [instance, options]);
  reactExports.useEffect(() => {
    if (typeof draggable !== "undefined" && instance !== null) {
      instance.setDraggable(draggable);
    }
  }, [instance, draggable]);
  reactExports.useEffect(() => {
    if (typeof editable !== "undefined" && instance !== null) {
      instance.setEditable(editable);
    }
  }, [instance, editable]);
  reactExports.useEffect(() => {
    if (typeof visible !== "undefined" && instance !== null) {
      instance.setVisible(visible);
    }
  }, [instance, visible]);
  reactExports.useEffect(() => {
    if (typeof radius === "number" && instance !== null) {
      instance.setRadius(radius);
    }
  }, [instance, radius]);
  reactExports.useEffect(() => {
    if (typeof center !== "undefined" && instance !== null) {
      instance.setCenter(center);
    }
  }, [instance, center]);
  reactExports.useEffect(() => {
    if (instance && onDblClick) {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      setDblclickListener(google.maps.event.addListener(instance, "dblclick", onDblClick));
    }
  }, [onDblClick]);
  reactExports.useEffect(() => {
    if (instance && onDragEnd) {
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }
      setDragendListener(google.maps.event.addListener(instance, "dragend", onDragEnd));
    }
  }, [onDragEnd]);
  reactExports.useEffect(() => {
    if (instance && onDragStart) {
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }
      setDragstartListener(google.maps.event.addListener(instance, "dragstart", onDragStart));
    }
  }, [onDragStart]);
  reactExports.useEffect(() => {
    if (instance && onMouseDown) {
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      setMousedownListener(google.maps.event.addListener(instance, "mousedown", onMouseDown));
    }
  }, [onMouseDown]);
  reactExports.useEffect(() => {
    if (instance && onMouseMove) {
      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener);
      }
      setMousemoveListener(google.maps.event.addListener(instance, "mousemove", onMouseMove));
    }
  }, [onMouseMove]);
  reactExports.useEffect(() => {
    if (instance && onMouseOut) {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      setMouseoutListener(google.maps.event.addListener(instance, "mouseout", onMouseOut));
    }
  }, [onMouseOut]);
  reactExports.useEffect(() => {
    if (instance && onMouseOver) {
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      setMouseoverListener(google.maps.event.addListener(instance, "mouseover", onMouseOver));
    }
  }, [onMouseOver]);
  reactExports.useEffect(() => {
    if (instance && onMouseUp) {
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      setMouseupListener(google.maps.event.addListener(instance, "mouseup", onMouseUp));
    }
  }, [onMouseUp]);
  reactExports.useEffect(() => {
    if (instance && onRightClick) {
      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener);
      }
      setRightclickListener(google.maps.event.addListener(instance, "rightclick", onRightClick));
    }
  }, [onRightClick]);
  reactExports.useEffect(() => {
    if (instance && onClick) {
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      setClickListener(google.maps.event.addListener(instance, "click", onClick));
    }
  }, [onClick]);
  reactExports.useEffect(() => {
    if (instance && onDrag) {
      if (dragListener !== null) {
        google.maps.event.removeListener(dragListener);
      }
      setDragListener(google.maps.event.addListener(instance, "drag", onDrag));
    }
  }, [onDrag]);
  reactExports.useEffect(() => {
    if (instance && onCenterChanged) {
      if (centerChangedListener !== null) {
        google.maps.event.removeListener(centerChangedListener);
      }
      setCenterChangedListener(google.maps.event.addListener(instance, "center_changed", onCenterChanged));
    }
  }, [onClick]);
  reactExports.useEffect(() => {
    if (instance && onRadiusChanged) {
      if (radiusChangedListener !== null) {
        google.maps.event.removeListener(radiusChangedListener);
      }
      setRadiusChangedListener(google.maps.event.addListener(instance, "radius_changed", onRadiusChanged));
    }
  }, [onRadiusChanged]);
  reactExports.useEffect(() => {
    var circle = new google.maps.Circle(_objectSpread$6(_objectSpread$6({}, options || defaultOptions), {}, {
      map
    }));
    if (typeof radius === "number") {
      circle.setRadius(radius);
    }
    if (typeof center !== "undefined") {
      circle.setCenter(center);
    }
    if (typeof radius === "number") {
      circle.setRadius(radius);
    }
    if (typeof visible !== "undefined") {
      circle.setVisible(visible);
    }
    if (typeof editable !== "undefined") {
      circle.setEditable(editable);
    }
    if (typeof draggable !== "undefined") {
      circle.setDraggable(draggable);
    }
    if (onDblClick) {
      setDblclickListener(google.maps.event.addListener(circle, "dblclick", onDblClick));
    }
    if (onDragEnd) {
      setDragendListener(google.maps.event.addListener(circle, "dragend", onDragEnd));
    }
    if (onDragStart) {
      setDragstartListener(google.maps.event.addListener(circle, "dragstart", onDragStart));
    }
    if (onMouseDown) {
      setMousedownListener(google.maps.event.addListener(circle, "mousedown", onMouseDown));
    }
    if (onMouseMove) {
      setMousemoveListener(google.maps.event.addListener(circle, "mousemove", onMouseMove));
    }
    if (onMouseOut) {
      setMouseoutListener(google.maps.event.addListener(circle, "mouseout", onMouseOut));
    }
    if (onMouseOver) {
      setMouseoverListener(google.maps.event.addListener(circle, "mouseover", onMouseOver));
    }
    if (onMouseUp) {
      setMouseupListener(google.maps.event.addListener(circle, "mouseup", onMouseUp));
    }
    if (onRightClick) {
      setRightclickListener(google.maps.event.addListener(circle, "rightclick", onRightClick));
    }
    if (onClick) {
      setClickListener(google.maps.event.addListener(circle, "click", onClick));
    }
    if (onDrag) {
      setDragListener(google.maps.event.addListener(circle, "drag", onDrag));
    }
    if (onCenterChanged) {
      setCenterChangedListener(google.maps.event.addListener(circle, "center_changed", onCenterChanged));
    }
    if (onRadiusChanged) {
      setRadiusChangedListener(google.maps.event.addListener(circle, "radius_changed", onRadiusChanged));
    }
    setInstance(circle);
    if (onLoad) {
      onLoad(circle);
    }
    return () => {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener);
      }
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener);
      }
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      if (centerChangedListener !== null) {
        google.maps.event.removeListener(centerChangedListener);
      }
      if (radiusChangedListener !== null) {
        google.maps.event.removeListener(radiusChangedListener);
      }
      if (onUnmount) {
        onUnmount(circle);
      }
      circle.setMap(null);
    };
  }, []);
  return null;
}
reactExports.memo(CircleFunctional);
class Circle extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "state", {
      circle: null
    });
    _defineProperty(this, "setCircleCallback", () => {
      if (this.state.circle !== null && this.props.onLoad) {
        this.props.onLoad(this.state.circle);
      }
    });
  }
  componentDidMount() {
    var circle = new google.maps.Circle(_objectSpread$6(_objectSpread$6({}, this.props.options), {}, {
      map: this.context
    }));
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$8,
      eventMap: eventMap$8,
      prevProps: {},
      nextProps: this.props,
      instance: circle
    });
    this.setState(function setCircle() {
      return {
        circle
      };
    }, this.setCircleCallback);
  }
  componentDidUpdate(prevProps) {
    if (this.state.circle !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$8,
        eventMap: eventMap$8,
        prevProps,
        nextProps: this.props,
        instance: this.state.circle
      });
    }
  }
  componentWillUnmount() {
    if (this.state.circle !== null) {
      var _this$state$circle;
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.circle);
      }
      unregisterEvents(this.registeredEvents);
      (_this$state$circle = this.state.circle) === null || _this$state$circle === void 0 || _this$state$circle.setMap(null);
    }
  }
  render() {
    return null;
  }
}
_defineProperty(Circle, "contextType", MapContext);
function ownKeys$5(e2, r2) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e2);
    r2 && (o2 = o2.filter(function(r22) {
      return Object.getOwnPropertyDescriptor(e2, r22).enumerable;
    })), t2.push.apply(t2, o2);
  }
  return t2;
}
function _objectSpread$5(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$5(Object(t2), true).forEach(function(r22) {
      _defineProperty(e2, r22, t2[r22]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : ownKeys$5(Object(t2)).forEach(function(r22) {
      Object.defineProperty(e2, r22, Object.getOwnPropertyDescriptor(t2, r22));
    });
  }
  return e2;
}
var eventMap$7 = {
  onClick: "click",
  onDblClick: "dblclick",
  onMouseDown: "mousedown",
  onMouseOut: "mouseout",
  onMouseOver: "mouseover",
  onMouseUp: "mouseup",
  onRightClick: "rightclick",
  onAddFeature: "addfeature",
  onRemoveFeature: "removefeature",
  onRemoveProperty: "removeproperty",
  onSetGeometry: "setgeometry",
  onSetProperty: "setproperty"
};
var updaterMap$7 = {
  add(instance, feature) {
    instance.add(feature);
  },
  addgeojson(instance, geojson, options) {
    instance.addGeoJson(geojson, options);
  },
  contains(instance, feature) {
    instance.contains(feature);
  },
  foreach(instance, callback) {
    instance.forEach(callback);
  },
  loadgeojson(instance, url, options, callback) {
    instance.loadGeoJson(url, options, callback);
  },
  overridestyle(instance, feature, style) {
    instance.overrideStyle(feature, style);
  },
  remove(instance, feature) {
    instance.remove(feature);
  },
  revertstyle(instance, feature) {
    instance.revertStyle(feature);
  },
  controlposition(instance, controlPosition) {
    instance.setControlPosition(controlPosition);
  },
  controls(instance, controls) {
    instance.setControls(controls);
  },
  drawingmode(instance, mode) {
    instance.setDrawingMode(mode);
  },
  map(instance, map) {
    instance.setMap(map);
  },
  style(instance, style) {
    instance.setStyle(style);
  },
  togeojson(instance, callback) {
    instance.toGeoJson(callback);
  }
};
function DataFunctional(_ref) {
  var {
    options,
    onClick,
    onDblClick,
    onMouseDown,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onMouseUp,
    onRightClick,
    onAddFeature,
    onRemoveFeature,
    onRemoveProperty,
    onSetGeometry,
    onSetProperty,
    onLoad,
    onUnmount
  } = _ref;
  var map = reactExports.useContext(MapContext);
  var [instance, setInstance] = reactExports.useState(null);
  var [dblclickListener, setDblclickListener] = reactExports.useState(null);
  var [mousedownListener, setMousedownListener] = reactExports.useState(null);
  var [mousemoveListener, setMousemoveListener] = reactExports.useState(null);
  var [mouseoutListener, setMouseoutListener] = reactExports.useState(null);
  var [mouseoverListener, setMouseoverListener] = reactExports.useState(null);
  var [mouseupListener, setMouseupListener] = reactExports.useState(null);
  var [rightclickListener, setRightclickListener] = reactExports.useState(null);
  var [clickListener, setClickListener] = reactExports.useState(null);
  var [addFeatureListener, setAddFeatureListener] = reactExports.useState(null);
  var [removeFeatureListener, setRemoveFeatureListener] = reactExports.useState(null);
  var [removePropertyListener, setRemovePropertyListener] = reactExports.useState(null);
  var [setGeometryListener, setSetGeometryListener] = reactExports.useState(null);
  var [setPropertyListener, setSetPropertyListener] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);
  reactExports.useEffect(() => {
    if (instance && onDblClick) {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      setDblclickListener(google.maps.event.addListener(instance, "dblclick", onDblClick));
    }
  }, [onDblClick]);
  reactExports.useEffect(() => {
    if (instance && onMouseDown) {
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      setMousedownListener(google.maps.event.addListener(instance, "mousedown", onMouseDown));
    }
  }, [onMouseDown]);
  reactExports.useEffect(() => {
    if (instance && onMouseMove) {
      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener);
      }
      setMousemoveListener(google.maps.event.addListener(instance, "mousemove", onMouseMove));
    }
  }, [onMouseMove]);
  reactExports.useEffect(() => {
    if (instance && onMouseOut) {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      setMouseoutListener(google.maps.event.addListener(instance, "mouseout", onMouseOut));
    }
  }, [onMouseOut]);
  reactExports.useEffect(() => {
    if (instance && onMouseOver) {
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      setMouseoverListener(google.maps.event.addListener(instance, "mouseover", onMouseOver));
    }
  }, [onMouseOver]);
  reactExports.useEffect(() => {
    if (instance && onMouseUp) {
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      setMouseupListener(google.maps.event.addListener(instance, "mouseup", onMouseUp));
    }
  }, [onMouseUp]);
  reactExports.useEffect(() => {
    if (instance && onRightClick) {
      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener);
      }
      setRightclickListener(google.maps.event.addListener(instance, "rightclick", onRightClick));
    }
  }, [onRightClick]);
  reactExports.useEffect(() => {
    if (instance && onClick) {
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      setClickListener(google.maps.event.addListener(instance, "click", onClick));
    }
  }, [onClick]);
  reactExports.useEffect(() => {
    if (instance && onAddFeature) {
      if (addFeatureListener !== null) {
        google.maps.event.removeListener(addFeatureListener);
      }
      setAddFeatureListener(google.maps.event.addListener(instance, "addfeature", onAddFeature));
    }
  }, [onAddFeature]);
  reactExports.useEffect(() => {
    if (instance && onRemoveFeature) {
      if (removeFeatureListener !== null) {
        google.maps.event.removeListener(removeFeatureListener);
      }
      setRemoveFeatureListener(google.maps.event.addListener(instance, "removefeature", onRemoveFeature));
    }
  }, [onRemoveFeature]);
  reactExports.useEffect(() => {
    if (instance && onRemoveProperty) {
      if (removePropertyListener !== null) {
        google.maps.event.removeListener(removePropertyListener);
      }
      setRemovePropertyListener(google.maps.event.addListener(instance, "removeproperty", onRemoveProperty));
    }
  }, [onRemoveProperty]);
  reactExports.useEffect(() => {
    if (instance && onSetGeometry) {
      if (setGeometryListener !== null) {
        google.maps.event.removeListener(setGeometryListener);
      }
      setSetGeometryListener(google.maps.event.addListener(instance, "setgeometry", onSetGeometry));
    }
  }, [onSetGeometry]);
  reactExports.useEffect(() => {
    if (instance && onSetProperty) {
      if (setPropertyListener !== null) {
        google.maps.event.removeListener(setPropertyListener);
      }
      setSetPropertyListener(google.maps.event.addListener(instance, "setproperty", onSetProperty));
    }
  }, [onSetProperty]);
  reactExports.useEffect(() => {
    if (map !== null) {
      var data = new google.maps.Data(_objectSpread$5(_objectSpread$5({}, options), {}, {
        map
      }));
      if (onDblClick) {
        setDblclickListener(google.maps.event.addListener(data, "dblclick", onDblClick));
      }
      if (onMouseDown) {
        setMousedownListener(google.maps.event.addListener(data, "mousedown", onMouseDown));
      }
      if (onMouseMove) {
        setMousemoveListener(google.maps.event.addListener(data, "mousemove", onMouseMove));
      }
      if (onMouseOut) {
        setMouseoutListener(google.maps.event.addListener(data, "mouseout", onMouseOut));
      }
      if (onMouseOver) {
        setMouseoverListener(google.maps.event.addListener(data, "mouseover", onMouseOver));
      }
      if (onMouseUp) {
        setMouseupListener(google.maps.event.addListener(data, "mouseup", onMouseUp));
      }
      if (onRightClick) {
        setRightclickListener(google.maps.event.addListener(data, "rightclick", onRightClick));
      }
      if (onClick) {
        setClickListener(google.maps.event.addListener(data, "click", onClick));
      }
      if (onAddFeature) {
        setAddFeatureListener(google.maps.event.addListener(data, "addfeature", onAddFeature));
      }
      if (onRemoveFeature) {
        setRemoveFeatureListener(google.maps.event.addListener(data, "removefeature", onRemoveFeature));
      }
      if (onRemoveProperty) {
        setRemovePropertyListener(google.maps.event.addListener(data, "removeproperty", onRemoveProperty));
      }
      if (onSetGeometry) {
        setSetGeometryListener(google.maps.event.addListener(data, "setgeometry", onSetGeometry));
      }
      if (onSetProperty) {
        setSetPropertyListener(google.maps.event.addListener(data, "setproperty", onSetProperty));
      }
      setInstance(data);
      if (onLoad) {
        onLoad(data);
      }
    }
    return () => {
      if (instance) {
        if (dblclickListener !== null) {
          google.maps.event.removeListener(dblclickListener);
        }
        if (mousedownListener !== null) {
          google.maps.event.removeListener(mousedownListener);
        }
        if (mousemoveListener !== null) {
          google.maps.event.removeListener(mousemoveListener);
        }
        if (mouseoutListener !== null) {
          google.maps.event.removeListener(mouseoutListener);
        }
        if (mouseoverListener !== null) {
          google.maps.event.removeListener(mouseoverListener);
        }
        if (mouseupListener !== null) {
          google.maps.event.removeListener(mouseupListener);
        }
        if (rightclickListener !== null) {
          google.maps.event.removeListener(rightclickListener);
        }
        if (clickListener !== null) {
          google.maps.event.removeListener(clickListener);
        }
        if (addFeatureListener !== null) {
          google.maps.event.removeListener(addFeatureListener);
        }
        if (removeFeatureListener !== null) {
          google.maps.event.removeListener(removeFeatureListener);
        }
        if (removePropertyListener !== null) {
          google.maps.event.removeListener(removePropertyListener);
        }
        if (setGeometryListener !== null) {
          google.maps.event.removeListener(setGeometryListener);
        }
        if (setPropertyListener !== null) {
          google.maps.event.removeListener(setPropertyListener);
        }
        if (onUnmount) {
          onUnmount(instance);
        }
        instance.setMap(null);
      }
    };
  }, []);
  return null;
}
reactExports.memo(DataFunctional);
class Data extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "state", {
      data: null
    });
    _defineProperty(this, "setDataCallback", () => {
      if (this.state.data !== null && this.props.onLoad) {
        this.props.onLoad(this.state.data);
      }
    });
  }
  componentDidMount() {
    if (this.context !== null) {
      var data = new google.maps.Data(_objectSpread$5(_objectSpread$5({}, this.props.options), {}, {
        map: this.context
      }));
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$7,
        eventMap: eventMap$7,
        prevProps: {},
        nextProps: this.props,
        instance: data
      });
      this.setState(() => {
        return {
          data
        };
      }, this.setDataCallback);
    }
  }
  componentDidUpdate(prevProps) {
    if (this.state.data !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$7,
        eventMap: eventMap$7,
        prevProps,
        nextProps: this.props,
        instance: this.state.data
      });
    }
  }
  componentWillUnmount() {
    if (this.state.data !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.data);
      }
      unregisterEvents(this.registeredEvents);
      if (this.state.data) {
        this.state.data.setMap(null);
      }
    }
  }
  render() {
    return null;
  }
}
_defineProperty(Data, "contextType", MapContext);
function ownKeys$4(e2, r2) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e2);
    r2 && (o2 = o2.filter(function(r22) {
      return Object.getOwnPropertyDescriptor(e2, r22).enumerable;
    })), t2.push.apply(t2, o2);
  }
  return t2;
}
function _objectSpread$4(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$4(Object(t2), true).forEach(function(r22) {
      _defineProperty(e2, r22, t2[r22]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : ownKeys$4(Object(t2)).forEach(function(r22) {
      Object.defineProperty(e2, r22, Object.getOwnPropertyDescriptor(t2, r22));
    });
  }
  return e2;
}
var eventMap$6 = {
  onClick: "click",
  onDefaultViewportChanged: "defaultviewport_changed",
  onStatusChanged: "status_changed"
};
var updaterMap$6 = {
  options(instance, options) {
    instance.setOptions(options);
  },
  url(instance, url) {
    instance.setUrl(url);
  },
  zIndex(instance, zIndex) {
    instance.setZIndex(zIndex);
  }
};
class KmlLayer extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "state", {
      kmlLayer: null
    });
    _defineProperty(this, "setKmlLayerCallback", () => {
      if (this.state.kmlLayer !== null && this.props.onLoad) {
        this.props.onLoad(this.state.kmlLayer);
      }
    });
  }
  componentDidMount() {
    var kmlLayer = new google.maps.KmlLayer(_objectSpread$4(_objectSpread$4({}, this.props.options), {}, {
      map: this.context
    }));
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$6,
      eventMap: eventMap$6,
      prevProps: {},
      nextProps: this.props,
      instance: kmlLayer
    });
    this.setState(function setLmlLayer() {
      return {
        kmlLayer
      };
    }, this.setKmlLayerCallback);
  }
  componentDidUpdate(prevProps) {
    if (this.state.kmlLayer !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$6,
        eventMap: eventMap$6,
        prevProps,
        nextProps: this.props,
        instance: this.state.kmlLayer
      });
    }
  }
  componentWillUnmount() {
    if (this.state.kmlLayer !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.kmlLayer);
      }
      unregisterEvents(this.registeredEvents);
      this.state.kmlLayer.setMap(null);
    }
  }
  render() {
    return null;
  }
}
_defineProperty(KmlLayer, "contextType", MapContext);
function getOffsetOverride(containerElement, getPixelPositionOffset) {
  return typeof getPixelPositionOffset === "function" ? getPixelPositionOffset(containerElement.offsetWidth, containerElement.offsetHeight) : {
    x: 0,
    y: 0
  };
}
function createLatLng(inst, Type) {
  return new Type(inst.lat, inst.lng);
}
function createLatLngBounds(inst, Type) {
  return new Type(new google.maps.LatLng(inst.ne.lat, inst.ne.lng), new google.maps.LatLng(inst.sw.lat, inst.sw.lng));
}
function ensureOfType(inst, type, factory) {
  return inst instanceof type ? inst : factory(inst, type);
}
function ensureOfTypeBounds(inst, type, factory) {
  return inst instanceof type ? inst : factory(inst, type);
}
function getLayoutStylesByBounds(mapCanvasProjection, offset, bounds) {
  var ne2 = mapCanvasProjection && mapCanvasProjection.fromLatLngToDivPixel(bounds.getNorthEast());
  var sw = mapCanvasProjection && mapCanvasProjection.fromLatLngToDivPixel(bounds.getSouthWest());
  if (ne2 && sw) {
    return {
      left: "".concat(sw.x + offset.x, "px"),
      top: "".concat(ne2.y + offset.y, "px"),
      width: "".concat(ne2.x - sw.x - offset.x, "px"),
      height: "".concat(sw.y - ne2.y - offset.y, "px")
    };
  }
  return {
    left: "-9999px",
    top: "-9999px"
  };
}
function getLayoutStylesByPosition(mapCanvasProjection, offset, position2) {
  var point = mapCanvasProjection && mapCanvasProjection.fromLatLngToDivPixel(position2);
  if (point) {
    var {
      x: x2,
      y: y2
    } = point;
    return {
      left: "".concat(x2 + offset.x, "px"),
      top: "".concat(y2 + offset.y, "px")
    };
  }
  return {
    left: "-9999px",
    top: "-9999px"
  };
}
function getLayoutStyles(mapCanvasProjection, offset, bounds, position2) {
  return bounds !== void 0 ? getLayoutStylesByBounds(mapCanvasProjection, offset, ensureOfTypeBounds(bounds, google.maps.LatLngBounds, createLatLngBounds)) : getLayoutStylesByPosition(mapCanvasProjection, offset, ensureOfType(position2, google.maps.LatLng, createLatLng));
}
function arePositionsEqual(currentPosition, previousPosition) {
  return currentPosition.left === previousPosition.left && currentPosition.top === previousPosition.top && currentPosition.width === previousPosition.height && currentPosition.height === previousPosition.height;
}
function ownKeys$3(e2, r2) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e2);
    r2 && (o2 = o2.filter(function(r22) {
      return Object.getOwnPropertyDescriptor(e2, r22).enumerable;
    })), t2.push.apply(t2, o2);
  }
  return t2;
}
function _objectSpread$3(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$3(Object(t2), true).forEach(function(r22) {
      _defineProperty(e2, r22, t2[r22]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : ownKeys$3(Object(t2)).forEach(function(r22) {
      Object.defineProperty(e2, r22, Object.getOwnPropertyDescriptor(t2, r22));
    });
  }
  return e2;
}
function createOverlay(container, pane, position2, bounds, getPixelPositionOffset) {
  class Overlay extends google.maps.OverlayView {
    constructor(container2, pane2, position22, bounds2) {
      super();
      this.container = container2;
      this.pane = pane2;
      this.position = position22;
      this.bounds = bounds2;
    }
    onAdd() {
      var _this$getPanes;
      var pane2 = (_this$getPanes = this.getPanes()) === null || _this$getPanes === void 0 ? void 0 : _this$getPanes[this.pane];
      pane2 === null || pane2 === void 0 || pane2.appendChild(this.container);
    }
    draw() {
      var projection = this.getProjection();
      var offset = _objectSpread$3({}, this.container ? getOffsetOverride(this.container, getPixelPositionOffset) : {
        x: 0,
        y: 0
      });
      var layoutStyles = getLayoutStyles(projection, offset, this.bounds, this.position);
      for (var [key, value] of Object.entries(layoutStyles)) {
        this.container.style[key] = value;
      }
    }
    onRemove() {
      if (this.container.parentNode !== null) {
        this.container.parentNode.removeChild(this.container);
      }
    }
  }
  return new Overlay(container, pane, position2, bounds);
}
function ownKeys$2(e2, r2) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e2);
    r2 && (o2 = o2.filter(function(r22) {
      return Object.getOwnPropertyDescriptor(e2, r22).enumerable;
    })), t2.push.apply(t2, o2);
  }
  return t2;
}
function _objectSpread$2(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$2(Object(t2), true).forEach(function(r22) {
      _defineProperty(e2, r22, t2[r22]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : ownKeys$2(Object(t2)).forEach(function(r22) {
      Object.defineProperty(e2, r22, Object.getOwnPropertyDescriptor(t2, r22));
    });
  }
  return e2;
}
function convertToLatLngString(latLngLike) {
  if (!latLngLike) {
    return "";
  }
  var latLng = latLngLike instanceof google.maps.LatLng ? latLngLike : new google.maps.LatLng(latLngLike.lat, latLngLike.lng);
  return latLng + "";
}
function convertToLatLngBoundsString(latLngBoundsLike) {
  if (!latLngBoundsLike) {
    return "";
  }
  var latLngBounds = latLngBoundsLike instanceof google.maps.LatLngBounds ? latLngBoundsLike : new google.maps.LatLngBounds(new google.maps.LatLng(latLngBoundsLike.south, latLngBoundsLike.east), new google.maps.LatLng(latLngBoundsLike.north, latLngBoundsLike.west));
  return latLngBounds + "";
}
function OverlayViewFunctional(_ref) {
  var {
    position: position2,
    bounds,
    mapPaneName,
    zIndex,
    onLoad,
    onUnmount,
    getPixelPositionOffset,
    children
  } = _ref;
  var map = reactExports.useContext(MapContext);
  var container = reactExports.useMemo(() => {
    var div = document.createElement("div");
    div.style.position = "absolute";
    return div;
  }, []);
  var overlay = reactExports.useMemo(() => {
    return createOverlay(container, mapPaneName, position2, bounds, getPixelPositionOffset);
  }, [container, mapPaneName, position2, bounds]);
  reactExports.useEffect(() => {
    onLoad === null || onLoad === void 0 || onLoad(overlay);
    overlay === null || overlay === void 0 || overlay.setMap(map);
    return () => {
      onUnmount === null || onUnmount === void 0 || onUnmount(overlay);
      overlay === null || overlay === void 0 || overlay.setMap(null);
    };
  }, [map, overlay]);
  reactExports.useEffect(() => {
    container.style.zIndex = "".concat(zIndex);
  }, [zIndex, container]);
  return reactDomExports.createPortal(children, container);
}
reactExports.memo(OverlayViewFunctional);
class OverlayView extends reactExports.PureComponent {
  constructor(props) {
    super(props);
    _defineProperty(this, "state", {
      paneEl: null,
      containerStyle: {
        // set initial position
        position: "absolute"
      }
    });
    _defineProperty(this, "updatePane", () => {
      var mapPaneName = this.props.mapPaneName;
      var mapPanes = this.overlayView.getPanes();
      invariant(!!mapPaneName, "OverlayView requires props.mapPaneName but got %s", mapPaneName);
      if (mapPanes) {
        this.setState({
          paneEl: mapPanes[mapPaneName]
        });
      } else {
        this.setState({
          paneEl: null
        });
      }
    });
    _defineProperty(this, "onAdd", () => {
      var _this$props$onLoad, _this$props;
      this.updatePane();
      (_this$props$onLoad = (_this$props = this.props).onLoad) === null || _this$props$onLoad === void 0 || _this$props$onLoad.call(_this$props, this.overlayView);
    });
    _defineProperty(this, "onPositionElement", () => {
      var mapCanvasProjection = this.overlayView.getProjection();
      var offset = _objectSpread$2({
        x: 0,
        y: 0
      }, this.containerRef.current ? getOffsetOverride(this.containerRef.current, this.props.getPixelPositionOffset) : {});
      var layoutStyles = getLayoutStyles(mapCanvasProjection, offset, this.props.bounds, this.props.position);
      if (!arePositionsEqual(layoutStyles, {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        left: this.state.containerStyle.left,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        top: this.state.containerStyle.top,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        width: this.state.containerStyle.width,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        height: this.state.containerStyle.height
      })) {
        var _layoutStyles$top, _layoutStyles$left, _layoutStyles$width, _layoutStyles$height;
        this.setState({
          containerStyle: {
            top: (_layoutStyles$top = layoutStyles.top) !== null && _layoutStyles$top !== void 0 ? _layoutStyles$top : 0,
            left: (_layoutStyles$left = layoutStyles.left) !== null && _layoutStyles$left !== void 0 ? _layoutStyles$left : 0,
            width: (_layoutStyles$width = layoutStyles.width) !== null && _layoutStyles$width !== void 0 ? _layoutStyles$width : 0,
            height: (_layoutStyles$height = layoutStyles.height) !== null && _layoutStyles$height !== void 0 ? _layoutStyles$height : 0,
            position: "absolute"
          }
        });
      }
    });
    _defineProperty(this, "draw", () => {
      this.onPositionElement();
    });
    _defineProperty(this, "onRemove", () => {
      var _this$props$onUnmount, _this$props2;
      this.setState(() => ({
        paneEl: null
      }));
      (_this$props$onUnmount = (_this$props2 = this.props).onUnmount) === null || _this$props$onUnmount === void 0 || _this$props$onUnmount.call(_this$props2, this.overlayView);
    });
    this.containerRef = reactExports.createRef();
    var overlayView = new google.maps.OverlayView();
    overlayView.onAdd = this.onAdd;
    overlayView.draw = this.draw;
    overlayView.onRemove = this.onRemove;
    this.overlayView = overlayView;
  }
  componentDidMount() {
    this.overlayView.setMap(this.context);
  }
  componentDidUpdate(prevProps) {
    var prevPositionString = convertToLatLngString(prevProps.position);
    var positionString = convertToLatLngString(this.props.position);
    var prevBoundsString = convertToLatLngBoundsString(prevProps.bounds);
    var boundsString = convertToLatLngBoundsString(this.props.bounds);
    if (prevPositionString !== positionString || prevBoundsString !== boundsString) {
      this.overlayView.draw();
    }
    if (prevProps.mapPaneName !== this.props.mapPaneName) {
      this.updatePane();
    }
  }
  componentWillUnmount() {
    this.overlayView.setMap(null);
  }
  render() {
    var paneEl = this.state.paneEl;
    if (paneEl) {
      return reactDomExports.createPortal(jsxRuntimeExports.jsx("div", {
        ref: this.containerRef,
        style: this.state.containerStyle,
        children: reactExports.Children.only(this.props.children)
      }), paneEl);
    } else {
      return null;
    }
  }
}
_defineProperty(OverlayView, "FLOAT_PANE", "floatPane");
_defineProperty(OverlayView, "MAP_PANE", "mapPane");
_defineProperty(OverlayView, "MARKER_LAYER", "markerLayer");
_defineProperty(OverlayView, "OVERLAY_LAYER", "overlayLayer");
_defineProperty(OverlayView, "OVERLAY_MOUSE_TARGET", "overlayMouseTarget");
_defineProperty(OverlayView, "contextType", MapContext);
function noop() {
  return;
}
function ownKeys$1(e2, r2) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e2);
    r2 && (o2 = o2.filter(function(r22) {
      return Object.getOwnPropertyDescriptor(e2, r22).enumerable;
    })), t2.push.apply(t2, o2);
  }
  return t2;
}
function _objectSpread$1(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$1(Object(t2), true).forEach(function(r22) {
      _defineProperty(e2, r22, t2[r22]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : ownKeys$1(Object(t2)).forEach(function(r22) {
      Object.defineProperty(e2, r22, Object.getOwnPropertyDescriptor(t2, r22));
    });
  }
  return e2;
}
var eventMap$5 = {
  onDblClick: "dblclick",
  onClick: "click"
};
var updaterMap$5 = {
  opacity(instance, opacity) {
    instance.setOpacity(opacity);
  }
};
function GroundOverlayFunctional(_ref) {
  var {
    url,
    bounds,
    options,
    visible
  } = _ref;
  var map = reactExports.useContext(MapContext);
  var imageBounds = new google.maps.LatLngBounds(new google.maps.LatLng(bounds.south, bounds.west), new google.maps.LatLng(bounds.north, bounds.east));
  var groundOverlay = reactExports.useMemo(() => {
    return new google.maps.GroundOverlay(url, imageBounds, options);
  }, []);
  reactExports.useEffect(() => {
    if (groundOverlay !== null) {
      groundOverlay.setMap(map);
    }
  }, [map]);
  reactExports.useEffect(() => {
    if (typeof url !== "undefined" && groundOverlay !== null) {
      groundOverlay.set("url", url);
      groundOverlay.setMap(map);
    }
  }, [groundOverlay, url]);
  reactExports.useEffect(() => {
    if (typeof visible !== "undefined" && groundOverlay !== null) {
      groundOverlay.setOpacity(visible ? 1 : 0);
    }
  }, [groundOverlay, visible]);
  reactExports.useEffect(() => {
    var newBounds = new google.maps.LatLngBounds(new google.maps.LatLng(bounds.south, bounds.west), new google.maps.LatLng(bounds.north, bounds.east));
    if (typeof bounds !== "undefined" && groundOverlay !== null) {
      groundOverlay.set("bounds", newBounds);
      groundOverlay.setMap(map);
    }
  }, [groundOverlay, bounds]);
  return null;
}
reactExports.memo(GroundOverlayFunctional);
class GroundOverlay extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "state", {
      groundOverlay: null
    });
    _defineProperty(this, "setGroundOverlayCallback", () => {
      if (this.state.groundOverlay !== null && this.props.onLoad) {
        this.props.onLoad(this.state.groundOverlay);
      }
    });
  }
  componentDidMount() {
    invariant(!!this.props.url || !!this.props.bounds, "For GroundOverlay, url and bounds are passed in to constructor and are immutable after instantiated. This is the behavior of Google Maps JavaScript API v3 ( See https://developers.google.com/maps/documentation/javascript/reference#GroundOverlay) Hence, use the corresponding two props provided by `react-google-maps-api`, url and bounds. In some cases, you'll need the GroundOverlay component to reflect the changes of url and bounds. You can leverage the React's key property to remount the component. Typically, just `key={url}` would serve your need. See https://github.com/tomchentw/react-google-maps/issues/655");
    var groundOverlay = new google.maps.GroundOverlay(this.props.url, this.props.bounds, _objectSpread$1(_objectSpread$1({}, this.props.options), {}, {
      map: this.context
    }));
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$5,
      eventMap: eventMap$5,
      prevProps: {},
      nextProps: this.props,
      instance: groundOverlay
    });
    this.setState(function setGroundOverlay() {
      return {
        groundOverlay
      };
    }, this.setGroundOverlayCallback);
  }
  componentDidUpdate(prevProps) {
    if (this.state.groundOverlay !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$5,
        eventMap: eventMap$5,
        prevProps,
        nextProps: this.props,
        instance: this.state.groundOverlay
      });
    }
  }
  componentWillUnmount() {
    if (this.state.groundOverlay) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.groundOverlay);
      }
      this.state.groundOverlay.setMap(null);
    }
  }
  render() {
    return null;
  }
}
_defineProperty(GroundOverlay, "defaultProps", {
  onLoad: noop
});
_defineProperty(GroundOverlay, "contextType", MapContext);
function ownKeys(e2, r2) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e2);
    r2 && (o2 = o2.filter(function(r22) {
      return Object.getOwnPropertyDescriptor(e2, r22).enumerable;
    })), t2.push.apply(t2, o2);
  }
  return t2;
}
function _objectSpread(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys(Object(t2), true).forEach(function(r22) {
      _defineProperty(e2, r22, t2[r22]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : ownKeys(Object(t2)).forEach(function(r22) {
      Object.defineProperty(e2, r22, Object.getOwnPropertyDescriptor(t2, r22));
    });
  }
  return e2;
}
var eventMap$4 = {};
var updaterMap$4 = {
  data(instance, data) {
    instance.setData(data);
  },
  map(instance, map) {
    instance.setMap(map);
  },
  options(instance, options) {
    instance.setOptions(options);
  }
};
function HeatmapLayerFunctional(_ref) {
  var {
    data,
    onLoad,
    onUnmount,
    options
  } = _ref;
  var map = reactExports.useContext(MapContext);
  var [instance, setInstance] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!google.maps.visualization) {
      invariant(!!google.maps.visualization, 'Did you include prop libraries={["visualization"]} in useJsApiScript? %s', google.maps.visualization);
    }
  }, []);
  reactExports.useEffect(() => {
    invariant(!!data, "data property is required in HeatmapLayer %s", data);
  }, [data]);
  reactExports.useEffect(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);
  reactExports.useEffect(() => {
    if (options && instance !== null) {
      instance.setOptions(options);
    }
  }, [instance, options]);
  reactExports.useEffect(() => {
    var heatmapLayer = new google.maps.visualization.HeatmapLayer(_objectSpread(_objectSpread({}, options), {}, {
      data,
      map
    }));
    setInstance(heatmapLayer);
    if (onLoad) {
      onLoad(heatmapLayer);
    }
    return () => {
      if (instance !== null) {
        if (onUnmount) {
          onUnmount(instance);
        }
        instance.setMap(null);
      }
    };
  }, []);
  return null;
}
reactExports.memo(HeatmapLayerFunctional);
class HeatmapLayer extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "state", {
      heatmapLayer: null
    });
    _defineProperty(this, "setHeatmapLayerCallback", () => {
      if (this.state.heatmapLayer !== null && this.props.onLoad) {
        this.props.onLoad(this.state.heatmapLayer);
      }
    });
  }
  componentDidMount() {
    invariant(!!google.maps.visualization, 'Did you include prop libraries={["visualization"]} to <LoadScript />? %s', google.maps.visualization);
    invariant(!!this.props.data, "data property is required in HeatmapLayer %s", this.props.data);
    var heatmapLayer = new google.maps.visualization.HeatmapLayer(_objectSpread(_objectSpread({}, this.props.options), {}, {
      data: this.props.data,
      map: this.context
    }));
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$4,
      eventMap: eventMap$4,
      prevProps: {},
      nextProps: this.props,
      instance: heatmapLayer
    });
    this.setState(function setHeatmapLayer() {
      return {
        heatmapLayer
      };
    }, this.setHeatmapLayerCallback);
  }
  componentDidUpdate(prevProps) {
    unregisterEvents(this.registeredEvents);
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$4,
      eventMap: eventMap$4,
      prevProps,
      nextProps: this.props,
      instance: this.state.heatmapLayer
    });
  }
  componentWillUnmount() {
    if (this.state.heatmapLayer !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.heatmapLayer);
      }
      unregisterEvents(this.registeredEvents);
      this.state.heatmapLayer.setMap(null);
    }
  }
  render() {
    return null;
  }
}
_defineProperty(HeatmapLayer, "contextType", MapContext);
var eventMap$3 = {
  onCloseClick: "closeclick",
  onPanoChanged: "pano_changed",
  onPositionChanged: "position_changed",
  onPovChanged: "pov_changed",
  onResize: "resize",
  onStatusChanged: "status_changed",
  onVisibleChanged: "visible_changed",
  onZoomChanged: "zoom_changed"
};
var updaterMap$3 = {
  register(instance, provider, options) {
    instance.registerPanoProvider(provider, options);
  },
  links(instance, links) {
    instance.setLinks(links);
  },
  motionTracking(instance, motionTracking) {
    instance.setMotionTracking(motionTracking);
  },
  options(instance, options) {
    instance.setOptions(options);
  },
  pano(instance, pano) {
    instance.setPano(pano);
  },
  position(instance, position2) {
    instance.setPosition(position2);
  },
  pov(instance, pov) {
    instance.setPov(pov);
  },
  visible(instance, visible) {
    instance.setVisible(visible);
  },
  zoom(instance, zoom) {
    instance.setZoom(zoom);
  }
};
class StreetViewPanorama extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "state", {
      streetViewPanorama: null
    });
    _defineProperty(this, "setStreetViewPanoramaCallback", () => {
      if (this.state.streetViewPanorama !== null && this.props.onLoad) {
        this.props.onLoad(this.state.streetViewPanorama);
      }
    });
  }
  componentDidMount() {
    var _this$context$getStre, _this$context;
    var streetViewPanorama = (_this$context$getStre = (_this$context = this.context) === null || _this$context === void 0 ? void 0 : _this$context.getStreetView()) !== null && _this$context$getStre !== void 0 ? _this$context$getStre : null;
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$3,
      eventMap: eventMap$3,
      prevProps: {},
      nextProps: this.props,
      instance: streetViewPanorama
    });
    this.setState(() => {
      return {
        streetViewPanorama
      };
    }, this.setStreetViewPanoramaCallback);
  }
  componentDidUpdate(prevProps) {
    if (this.state.streetViewPanorama !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$3,
        eventMap: eventMap$3,
        prevProps,
        nextProps: this.props,
        instance: this.state.streetViewPanorama
      });
    }
  }
  componentWillUnmount() {
    if (this.state.streetViewPanorama !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.streetViewPanorama);
      }
      unregisterEvents(this.registeredEvents);
      this.state.streetViewPanorama.setVisible(false);
    }
  }
  render() {
    return null;
  }
}
_defineProperty(StreetViewPanorama, "contextType", MapContext);
class StreetViewService extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      streetViewService: null
    });
    _defineProperty(this, "setStreetViewServiceCallback", () => {
      if (this.state.streetViewService !== null && this.props.onLoad) {
        this.props.onLoad(this.state.streetViewService);
      }
    });
  }
  componentDidMount() {
    var streetViewService = new google.maps.StreetViewService();
    this.setState(function setStreetViewService() {
      return {
        streetViewService
      };
    }, this.setStreetViewServiceCallback);
  }
  componentWillUnmount() {
    if (this.state.streetViewService !== null && this.props.onUnmount) {
      this.props.onUnmount(this.state.streetViewService);
    }
  }
  render() {
    return null;
  }
}
_defineProperty(StreetViewService, "contextType", MapContext);
var eventMap$2 = {
  onDirectionsChanged: "directions_changed"
};
var updaterMap$2 = {
  directions(instance, directions) {
    instance.setDirections(directions);
  },
  map(instance, map) {
    instance.setMap(map);
  },
  options(instance, options) {
    instance.setOptions(options);
  },
  panel(instance, panel) {
    instance.setPanel(panel);
  },
  routeIndex(instance, routeIndex) {
    instance.setRouteIndex(routeIndex);
  }
};
class DirectionsRenderer extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "state", {
      directionsRenderer: null
    });
    _defineProperty(this, "setDirectionsRendererCallback", () => {
      if (this.state.directionsRenderer !== null) {
        this.state.directionsRenderer.setMap(this.context);
        if (this.props.onLoad) {
          this.props.onLoad(this.state.directionsRenderer);
        }
      }
    });
  }
  componentDidMount() {
    var directionsRenderer = new google.maps.DirectionsRenderer(this.props.options);
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$2,
      eventMap: eventMap$2,
      prevProps: {},
      nextProps: this.props,
      instance: directionsRenderer
    });
    this.setState(function setDirectionsRenderer() {
      return {
        directionsRenderer
      };
    }, this.setDirectionsRendererCallback);
  }
  componentDidUpdate(prevProps) {
    if (this.state.directionsRenderer !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$2,
        eventMap: eventMap$2,
        prevProps,
        nextProps: this.props,
        instance: this.state.directionsRenderer
      });
    }
  }
  componentWillUnmount() {
    if (this.state.directionsRenderer !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.directionsRenderer);
      }
      unregisterEvents(this.registeredEvents);
      if (this.state.directionsRenderer) {
        this.state.directionsRenderer.setMap(null);
      }
    }
  }
  render() {
    return null;
  }
}
_defineProperty(DirectionsRenderer, "contextType", MapContext);
var eventMap$1 = {
  onPlacesChanged: "places_changed"
};
var updaterMap$1 = {
  bounds(instance, bounds) {
    instance.setBounds(bounds);
  }
};
class StandaloneSearchBox extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "containerElement", reactExports.createRef());
    _defineProperty(this, "state", {
      searchBox: null
    });
    _defineProperty(this, "setSearchBoxCallback", () => {
      if (this.state.searchBox !== null && this.props.onLoad) {
        this.props.onLoad(this.state.searchBox);
      }
    });
  }
  componentDidMount() {
    invariant(!!google.maps.places, 'You need to provide libraries={["places"]} prop to <LoadScript /> component %s', google.maps.places);
    if (this.containerElement !== null && this.containerElement.current !== null) {
      var input = this.containerElement.current.querySelector("input");
      if (input !== null) {
        var searchBox = new google.maps.places.SearchBox(input, this.props.options);
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
          updaterMap: updaterMap$1,
          eventMap: eventMap$1,
          prevProps: {},
          nextProps: this.props,
          instance: searchBox
        });
        this.setState(function setSearchBox() {
          return {
            searchBox
          };
        }, this.setSearchBoxCallback);
      }
    }
  }
  componentDidUpdate(prevProps) {
    if (this.state.searchBox !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$1,
        eventMap: eventMap$1,
        prevProps,
        nextProps: this.props,
        instance: this.state.searchBox
      });
    }
  }
  componentWillUnmount() {
    if (this.state.searchBox !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.searchBox);
      }
      unregisterEvents(this.registeredEvents);
    }
  }
  render() {
    return jsxRuntimeExports.jsx("div", {
      ref: this.containerElement,
      children: reactExports.Children.only(this.props.children)
    });
  }
}
_defineProperty(StandaloneSearchBox, "contextType", MapContext);
var eventMap = {
  onPlaceChanged: "place_changed"
};
var updaterMap = {
  bounds(instance, bounds) {
    instance.setBounds(bounds);
  },
  restrictions(instance, restrictions) {
    instance.setComponentRestrictions(restrictions);
  },
  fields(instance, fields) {
    instance.setFields(fields);
  },
  options(instance, options) {
    instance.setOptions(options);
  },
  types(instance, types) {
    instance.setTypes(types);
  }
};
class Autocomplete extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "containerElement", reactExports.createRef());
    _defineProperty(this, "state", {
      autocomplete: null
    });
    _defineProperty(this, "setAutocompleteCallback", () => {
      if (this.state.autocomplete !== null && this.props.onLoad) {
        this.props.onLoad(this.state.autocomplete);
      }
    });
  }
  componentDidMount() {
    var _this$containerElemen;
    invariant(!!google.maps.places, 'You need to provide libraries={["places"]} prop to <LoadScript /> component %s', google.maps.places);
    var input = (_this$containerElemen = this.containerElement.current) === null || _this$containerElemen === void 0 ? void 0 : _this$containerElemen.querySelector("input");
    if (input) {
      var autocomplete = new google.maps.places.Autocomplete(input, this.props.options);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps: {},
        nextProps: this.props,
        instance: autocomplete
      });
      this.setState(() => {
        return {
          autocomplete
        };
      }, this.setAutocompleteCallback);
    }
  }
  componentDidUpdate(prevProps) {
    unregisterEvents(this.registeredEvents);
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.autocomplete
    });
  }
  componentWillUnmount() {
    if (this.state.autocomplete !== null) {
      unregisterEvents(this.registeredEvents);
    }
  }
  render() {
    return jsxRuntimeExports.jsx("div", {
      ref: this.containerElement,
      className: this.props.className,
      children: reactExports.Children.only(this.props.children)
    });
  }
}
_defineProperty(Autocomplete, "defaultProps", {
  className: ""
});
_defineProperty(Autocomplete, "contextType", MapContext);
function useAttribution(map, attribution) {
  const attributionRef = reactExports.useRef(attribution);
  reactExports.useEffect(function updateAttribution() {
    if (attribution !== attributionRef.current && map.attributionControl != null) {
      if (attributionRef.current != null) {
        map.attributionControl.removeAttribution(attributionRef.current);
      }
      if (attribution != null) {
        map.attributionControl.addAttribution(attribution);
      }
    }
    attributionRef.current = attribution;
  }, [
    map,
    attribution
  ]);
}
const CONTEXT_VERSION = 1;
function createLeafletContext(map) {
  return Object.freeze({
    __version: CONTEXT_VERSION,
    map
  });
}
function extendContext(source, extra) {
  return Object.freeze({
    ...source,
    ...extra
  });
}
const LeafletContext = reactExports.createContext(null);
const LeafletProvider = LeafletContext.Provider;
function useLeafletContext() {
  const context = reactExports.useContext(LeafletContext);
  if (context == null) {
    throw new Error("No context provided: useLeafletContext() can only be used in a descendant of <MapContainer>");
  }
  return context;
}
function createContainerComponent(useElement) {
  function ContainerComponent(props, forwardedRef) {
    const { instance, context } = useElement(props).current;
    reactExports.useImperativeHandle(forwardedRef, () => instance);
    return props.children == null ? null : /* @__PURE__ */ React.createElement(LeafletProvider, {
      value: context
    }, props.children);
  }
  return /* @__PURE__ */ reactExports.forwardRef(ContainerComponent);
}
function createDivOverlayComponent(useElement) {
  function OverlayComponent(props, forwardedRef) {
    const [isOpen, setOpen] = reactExports.useState(false);
    const { instance } = useElement(props, setOpen).current;
    reactExports.useImperativeHandle(forwardedRef, () => instance);
    reactExports.useEffect(function updateOverlay() {
      if (isOpen) {
        instance.update();
      }
    }, [
      instance,
      isOpen,
      props.children
    ]);
    const contentNode = instance._contentNode;
    return contentNode ? /* @__PURE__ */ reactDomExports.createPortal(props.children, contentNode) : null;
  }
  return /* @__PURE__ */ reactExports.forwardRef(OverlayComponent);
}
function createLeafComponent(useElement) {
  function LeafComponent(props, forwardedRef) {
    const { instance } = useElement(props).current;
    reactExports.useImperativeHandle(forwardedRef, () => instance);
    return null;
  }
  return /* @__PURE__ */ reactExports.forwardRef(LeafComponent);
}
function useEventHandlers(element, eventHandlers) {
  const eventHandlersRef = reactExports.useRef();
  reactExports.useEffect(function addEventHandlers() {
    if (eventHandlers != null) {
      element.instance.on(eventHandlers);
    }
    eventHandlersRef.current = eventHandlers;
    return function removeEventHandlers() {
      if (eventHandlersRef.current != null) {
        element.instance.off(eventHandlersRef.current);
      }
      eventHandlersRef.current = null;
    };
  }, [
    element,
    eventHandlers
  ]);
}
function withPane(props, context) {
  const pane = props.pane ?? context.pane;
  return pane ? {
    ...props,
    pane
  } : props;
}
function createDivOverlayHook(useElement, useLifecycle) {
  return function useDivOverlay(props, setOpen) {
    const context = useLeafletContext();
    const elementRef = useElement(withPane(props, context), context);
    useAttribution(context.map, props.attribution);
    useEventHandlers(elementRef.current, props.eventHandlers);
    useLifecycle(elementRef.current, context, props, setOpen);
    return elementRef;
  };
}
function createElementObject(instance, context, container) {
  return Object.freeze({
    instance,
    context,
    container
  });
}
function createElementHook(createElement, updateElement) {
  if (updateElement == null) {
    return function useImmutableLeafletElement(props, context) {
      const elementRef = reactExports.useRef();
      if (!elementRef.current) elementRef.current = createElement(props, context);
      return elementRef;
    };
  }
  return function useMutableLeafletElement(props, context) {
    const elementRef = reactExports.useRef();
    if (!elementRef.current) elementRef.current = createElement(props, context);
    const propsRef = reactExports.useRef(props);
    const { instance } = elementRef.current;
    reactExports.useEffect(function updateElementProps() {
      if (propsRef.current !== props) {
        updateElement(instance, props, propsRef.current);
        propsRef.current = props;
      }
    }, [
      instance,
      props,
      context
    ]);
    return elementRef;
  };
}
function useLayerLifecycle(element, context) {
  reactExports.useEffect(function addLayer() {
    const container = context.layerContainer ?? context.map;
    container.addLayer(element.instance);
    return function removeLayer() {
      context.layerContainer?.removeLayer(element.instance);
      context.map.removeLayer(element.instance);
    };
  }, [
    context,
    element
  ]);
}
function createLayerHook(useElement) {
  return function useLayer(props) {
    const context = useLeafletContext();
    const elementRef = useElement(withPane(props, context), context);
    useAttribution(context.map, props.attribution);
    useEventHandlers(elementRef.current, props.eventHandlers);
    useLayerLifecycle(elementRef.current, context);
    return elementRef;
  };
}
function createLayerComponent(createElement, updateElement) {
  const useElement = createElementHook(createElement, updateElement);
  const useLayer = createLayerHook(useElement);
  return createContainerComponent(useLayer);
}
function createOverlayComponent(createElement, useLifecycle) {
  const useElement = createElementHook(createElement);
  const useOverlay = createDivOverlayHook(useElement, useLifecycle);
  return createDivOverlayComponent(useOverlay);
}
function createTileLayerComponent(createElement, updateElement) {
  const useElement = createElementHook(createElement, updateElement);
  const useLayer = createLayerHook(useElement);
  return createLeafComponent(useLayer);
}
function updateGridLayer(layer, props, prevProps) {
  const { opacity, zIndex } = props;
  if (opacity != null && opacity !== prevProps.opacity) {
    layer.setOpacity(opacity);
  }
  if (zIndex != null && zIndex !== prevProps.zIndex) {
    layer.setZIndex(zIndex);
  }
}
function useMap() {
  return useLeafletContext().map;
}
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function MapContainerComponent({ bounds, boundsOptions, center, children, className, id, placeholder, style, whenReady, zoom, ...options }, forwardedRef) {
  const [props] = reactExports.useState({
    className,
    id,
    style
  });
  const [context, setContext] = reactExports.useState(null);
  reactExports.useImperativeHandle(forwardedRef, () => context?.map ?? null, [
    context
  ]);
  const mapRef = reactExports.useCallback((node2) => {
    if (node2 !== null && context === null) {
      const map = new leafletSrcExports.Map(node2, options);
      if (center != null && zoom != null) {
        map.setView(center, zoom);
      } else if (bounds != null) {
        map.fitBounds(bounds, boundsOptions);
      }
      if (whenReady != null) {
        map.whenReady(whenReady);
      }
      setContext(createLeafletContext(map));
    }
  }, []);
  reactExports.useEffect(() => {
    return () => {
      context?.map.remove();
    };
  }, [
    context
  ]);
  const contents = context ? /* @__PURE__ */ React.createElement(LeafletProvider, {
    value: context
  }, children) : placeholder ?? null;
  return /* @__PURE__ */ React.createElement("div", _extends({}, props, {
    ref: mapRef
  }), contents);
}
const MapContainer = /* @__PURE__ */ reactExports.forwardRef(MapContainerComponent);
const Marker2 = createLayerComponent(function createMarker({ position: position2, ...options }, ctx) {
  const marker = new leafletSrcExports.Marker(position2, options);
  return createElementObject(marker, extendContext(ctx, {
    overlayContainer: marker
  }));
}, function updateMarker(marker, props, prevProps) {
  if (props.position !== prevProps.position) {
    marker.setLatLng(props.position);
  }
  if (props.icon != null && props.icon !== prevProps.icon) {
    marker.setIcon(props.icon);
  }
  if (props.zIndexOffset != null && props.zIndexOffset !== prevProps.zIndexOffset) {
    marker.setZIndexOffset(props.zIndexOffset);
  }
  if (props.opacity != null && props.opacity !== prevProps.opacity) {
    marker.setOpacity(props.opacity);
  }
  if (marker.dragging != null && props.draggable !== prevProps.draggable) {
    if (props.draggable === true) {
      marker.dragging.enable();
    } else {
      marker.dragging.disable();
    }
  }
});
const Popup = createOverlayComponent(function createPopup(props, context) {
  const popup = new leafletSrcExports.Popup(props, context.overlayContainer);
  return createElementObject(popup, context);
}, function usePopupLifecycle(element, context, { position: position2 }, setOpen) {
  reactExports.useEffect(function addPopup() {
    const { instance } = element;
    function onPopupOpen(event) {
      if (event.popup === instance) {
        instance.update();
        setOpen(true);
      }
    }
    function onPopupClose(event) {
      if (event.popup === instance) {
        setOpen(false);
      }
    }
    context.map.on({
      popupopen: onPopupOpen,
      popupclose: onPopupClose
    });
    if (context.overlayContainer == null) {
      if (position2 != null) {
        instance.setLatLng(position2);
      }
      instance.openOn(context.map);
    } else {
      context.overlayContainer.bindPopup(instance);
    }
    return function removePopup() {
      context.map.off({
        popupopen: onPopupOpen,
        popupclose: onPopupClose
      });
      context.overlayContainer?.unbindPopup();
      context.map.removeLayer(instance);
    };
  }, [
    element,
    context,
    setOpen,
    position2
  ]);
});
const TileLayer = createTileLayerComponent(function createTileLayer({ url, ...options }, context) {
  const layer = new leafletSrcExports.TileLayer(url, withPane(options, context));
  return createElementObject(layer, context);
}, function updateTileLayer(layer, props, prevProps) {
  updateGridLayer(layer, props, prevProps);
  const { url } = props;
  if (url != null && url !== prevProps.url) {
    layer.setUrl(url);
  }
});
function e() {
  return e = Object.assign ? Object.assign.bind() : function(t2) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var r2 = arguments[e2];
      for (var n2 in r2) Object.prototype.hasOwnProperty.call(r2, n2) && (t2[n2] = r2[n2]);
    }
    return t2;
  }, e.apply(this, arguments);
}
function r(t2, e2) {
  t2.prototype = Object.create(e2.prototype), t2.prototype.constructor = t2, n(t2, e2);
}
function n(t2, e2) {
  return n = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
    return t3.__proto__ = e3, t3;
  }, n(t2, e2);
}
function o() {
  if ("undefined" == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ("function" == typeof Proxy) return true;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), true;
  } catch (t2) {
    return false;
  }
}
function i(t2, e2, r2) {
  return i = o() ? Reflect.construct.bind() : function(t3, e3, r3) {
    var o2 = [null];
    o2.push.apply(o2, e3);
    var i2 = new (Function.bind.apply(t3, o2))();
    return r3 && n(i2, r3.prototype), i2;
  }, i.apply(null, arguments);
}
function s(t2, e2, r2, n2) {
  void 0 === e2 && (e2 = ""), void 0 === n2 && (n2 = {});
  var o2 = document.createElement(t2);
  return e2 && (o2.className = e2), Object.keys(n2).forEach(function(t3) {
    if ("function" == typeof n2[t3]) {
      var e3 = 0 === t3.indexOf("on") ? t3.substr(2).toLowerCase() : t3;
      o2.addEventListener(e3, n2[t3]);
    } else "html" === t3 ? o2.innerHTML = n2[t3] : "text" === t3 ? o2.innerText = n2[t3] : o2.setAttribute(t3, n2[t3]);
  }), r2 && r2.appendChild(o2), o2;
}
function a(t2) {
  t2.preventDefault(), t2.stopPropagation();
}
var l = function() {
  return [].slice.call(arguments).filter(Boolean).join(" ").trim();
};
function c(t2, e2) {
  t2 && t2.classList && (Array.isArray(e2) ? e2 : [e2]).forEach(function(e3) {
    t2.classList.contains(e3) || t2.classList.add(e3);
  });
}
function u(t2, e2) {
  t2 && t2.classList && (Array.isArray(e2) ? e2 : [e2]).forEach(function(e3) {
    t2.classList.contains(e3) && t2.classList.remove(e3);
  });
}
var h, p = 13, d = 40, f = 38, v = [p, 27, d, f, 37, 39], m = /* @__PURE__ */ (function() {
  function t2(t3) {
    var e3 = this, r2 = t3.handleSubmit, n2 = t3.searchLabel, o2 = t3.classNames, i2 = void 0 === o2 ? {} : o2;
    this.container = void 0, this.form = void 0, this.input = void 0, this.handleSubmit = void 0, this.hasError = false, this.container = s("div", l("geosearch", i2.container)), this.form = s("form", ["", i2.form].join(" "), this.container, { autocomplete: "none", onClick: a, onDblClick: a, touchStart: a, touchEnd: a }), this.input = s("input", ["glass", i2.input].join(" "), this.form, { type: "text", placeholder: n2 || "search", onInput: this.onInput, onKeyUp: function(t4) {
      return e3.onKeyUp(t4);
    }, onKeyPress: function(t4) {
      return e3.onKeyPress(t4);
    }, onFocus: this.onFocus, onBlur: this.onBlur, onClick: function() {
      e3.input.focus(), e3.input.dispatchEvent(new Event("focus"));
    } }), this.handleSubmit = r2;
  }
  var e2 = t2.prototype;
  return e2.onFocus = function() {
    c(this.form, "active");
  }, e2.onBlur = function() {
    u(this.form, "active");
  }, e2.onSubmit = function(t3) {
    try {
      var e3 = this;
      return a(t3), u(r2 = e3.container, "error"), c(r2, "pending"), Promise.resolve(e3.handleSubmit({ query: e3.input.value })).then(function() {
        u(e3.container, "pending");
      });
    } catch (t4) {
      return Promise.reject(t4);
    }
    var r2;
  }, e2.onInput = function() {
    this.hasError && (u(this.container, "error"), this.hasError = false);
  }, e2.onKeyUp = function(t3) {
    27 === t3.keyCode && (u(this.container, ["pending", "active"]), this.input.value = "", document.body.focus(), document.body.blur());
  }, e2.onKeyPress = function(t3) {
    t3.keyCode === p && this.onSubmit(t3);
  }, e2.setQuery = function(t3) {
    this.input.value = t3;
  }, t2;
})(), g = /* @__PURE__ */ (function() {
  function t2(t3) {
    var e3 = this, r2 = t3.handleClick, n2 = t3.classNames, o2 = void 0 === n2 ? {} : n2, i2 = t3.notFoundMessage;
    this.handleClick = void 0, this.selected = -1, this.results = [], this.container = void 0, this.resultItem = void 0, this.notFoundMessage = void 0, this.onClick = function(t4) {
      if ("function" == typeof e3.handleClick) {
        var r3 = t4.target;
        if (r3 && e3.container.contains(r3) && r3.hasAttribute("data-key")) {
          var n3 = Number(r3.getAttribute("data-key"));
          e3.handleClick({ result: e3.results[n3] });
        }
      }
    }, this.handleClick = r2, this.notFoundMessage = i2 ? s("div", l(o2.notfound), void 0, { html: i2 }) : void 0, this.container = s("div", l("results", o2.resultlist)), this.container.addEventListener("click", this.onClick, true), this.resultItem = s("div", l(o2.item));
  }
  var e2 = t2.prototype;
  return e2.render = function(t3, e3) {
    var r2 = this;
    void 0 === t3 && (t3 = []), this.clear(), t3.forEach(function(t4, n2) {
      var o2 = r2.resultItem.cloneNode(true);
      o2.setAttribute("data-key", "" + n2), o2.innerHTML = e3({ result: t4 }), r2.container.appendChild(o2);
    }), t3.length > 0 ? (c(this.container.parentElement, "open"), c(this.container, "active")) : this.notFoundMessage && (this.container.appendChild(this.notFoundMessage), c(this.container.parentElement, "open")), this.results = t3;
  }, e2.select = function(t3) {
    return Array.from(this.container.children).forEach(function(e3, r2) {
      return r2 === t3 ? c(e3, "active") : u(e3, "active");
    }), this.selected = t3, this.results[t3];
  }, e2.count = function() {
    return this.results ? this.results.length : 0;
  }, e2.clear = function() {
    for (this.selected = -1; this.container.lastChild; ) this.container.removeChild(this.container.lastChild);
    u(this.container.parentElement, "open"), u(this.container, "active");
  }, t2;
})(), y = { position: "topleft", style: "button", showMarker: true, showPopup: false, popupFormat: function(t2) {
  return "" + t2.result.label;
}, resultFormat: function(t2) {
  return "" + t2.result.label;
}, marker: { icon: t && leafletSrcExports.Icon ? new leafletSrcExports.Icon.Default() : void 0, draggable: false }, maxMarkers: 1, maxSuggestions: 5, retainZoomLevel: false, animateZoom: true, searchLabel: "Enter address", clearSearchLabel: "Clear search", notFoundMessage: "", messageHideDelay: 3e3, zoomLevel: 18, classNames: { container: "leaflet-bar leaflet-control leaflet-control-geosearch", button: "leaflet-bar-part leaflet-bar-part-single", resetButton: "reset", msgbox: "leaflet-bar message", form: "", input: "", resultlist: "", item: "", notfound: "leaflet-bar-notfound" }, autoComplete: true, autoCompleteDelay: 250, autoClose: false, keepResult: false, updateMap: true }, b = "Leaflet must be loaded before instantiating the GeoSearch control", E = { options: e({}, y), classNames: e({}, y.classNames), initialize: function(r2) {
  var n2, o2, i2, a2, l2 = this;
  if (!t) throw new Error(b);
  if (!r2.provider) throw new Error("Provider is missing from options");
  this.options = e({}, y, r2), this.classNames = e({}, this.classNames, r2.classNames), this.markers = new leafletSrcExports.FeatureGroup(), this.classNames.container += " leaflet-geosearch-" + this.options.style, this.searchElement = new m({ searchLabel: this.options.searchLabel, classNames: { container: this.classNames.container, form: this.classNames.form, input: this.classNames.input }, handleSubmit: function(t2) {
    return l2.onSubmit(t2);
  } }), this.button = s("a", this.classNames.button, this.searchElement.container, { title: this.options.searchLabel, href: "#", onClick: function(t2) {
    return l2.onClick(t2);
  } }), leafletSrcExports.DomEvent.disableClickPropagation(this.button), this.resetButton = s("button", this.classNames.resetButton, this.searchElement.form, { text: "×", "aria-label": this.options.clearSearchLabel, onClick: function() {
    "" === l2.searchElement.input.value ? l2.close() : l2.clearResults(null, true);
  } }), leafletSrcExports.DomEvent.disableClickPropagation(this.resetButton), this.options.autoComplete && (this.resultList = new g({ handleClick: function(t2) {
    var e2 = t2.result;
    l2.searchElement.input.value = e2.label, l2.onSubmit({ query: e2.label, data: e2 });
  }, classNames: { resultlist: this.classNames.resultlist, item: this.classNames.item, notfound: this.classNames.notfound }, notFoundMessage: this.options.notFoundMessage }), this.searchElement.form.appendChild(this.resultList.container), this.searchElement.input.addEventListener("keyup", (n2 = function(t2) {
    return l2.autoSearch(t2);
  }, void 0 === (o2 = this.options.autoCompleteDelay) && (o2 = 250), void 0 === i2 && (i2 = false), function() {
    var t2 = [].slice.call(arguments);
    a2 && clearTimeout(a2), a2 = setTimeout(function() {
      a2 = null, i2 || n2.apply(void 0, t2);
    }, o2), i2 && !a2 && n2.apply(void 0, t2);
  }), true), this.searchElement.input.addEventListener("keydown", function(t2) {
    return l2.selectResult(t2);
  }, true), this.searchElement.input.addEventListener("keydown", function(t2) {
    return l2.clearResults(t2, true);
  }, true)), this.searchElement.form.addEventListener("click", function(t2) {
    t2.preventDefault();
  }, false);
}, onAdd: function(e2) {
  var r2 = this.options, n2 = r2.showMarker, o2 = r2.style;
  if (this.map = e2, n2 && this.markers.addTo(e2), "bar" === o2) {
    var i2 = e2.getContainer().querySelector(".leaflet-control-container");
    this.container = s("div", "leaflet-control-geosearch leaflet-geosearch-bar"), this.container.appendChild(this.searchElement.form), i2.appendChild(this.container);
  }
  return leafletSrcExports.DomEvent.disableClickPropagation(this.searchElement.form), this.searchElement.container;
}, onRemove: function() {
  var t2;
  return null == (t2 = this.container) || t2.remove(), this;
}, open: function() {
  var t2 = this.searchElement, e2 = t2.input;
  c(t2.container, "active"), e2.focus();
}, close: function() {
  u(this.searchElement.container, "active"), this.clearResults();
}, onClick: function(t2) {
  t2.preventDefault(), t2.stopPropagation(), this.searchElement.container.classList.contains("active") ? this.close() : this.open();
}, selectResult: function(t2) {
  if (-1 !== [p, d, f].indexOf(t2.keyCode)) if (t2.preventDefault(), t2.keyCode !== p) {
    var e2 = this.resultList.count() - 1;
    if (!(e2 < 0)) {
      var r2 = this.resultList.selected, n2 = t2.keyCode === d ? r2 + 1 : r2 - 1, o2 = this.resultList.select(n2 < 0 ? e2 : n2 > e2 ? 0 : n2);
      this.searchElement.input.value = o2.label;
    }
  } else {
    var i2 = this.resultList.select(this.resultList.selected);
    this.onSubmit({ query: this.searchElement.input.value, data: i2 });
  }
}, clearResults: function(t2, e2) {
  if (void 0 === e2 && (e2 = false), !t2 || 27 === t2.keyCode) {
    var r2 = this.options, n2 = r2.autoComplete;
    !e2 && r2.keepResult || (this.searchElement.input.value = "", this.markers.clearLayers()), n2 && this.resultList.clear();
  }
}, autoSearch: function(t2) {
  try {
    var e2 = this;
    if (v.indexOf(t2.keyCode) > -1) return Promise.resolve();
    var r2 = t2.target.value, n2 = e2.options.provider, o2 = (function() {
      if (r2.length) return Promise.resolve(n2.search({ query: r2 })).then(function(t3) {
        t3 = t3.slice(0, e2.options.maxSuggestions), e2.resultList.render(t3, e2.options.resultFormat);
      });
      e2.resultList.clear();
    })();
    return Promise.resolve(o2 && o2.then ? o2.then(function() {
    }) : void 0);
  } catch (t3) {
    return Promise.reject(t3);
  }
}, onSubmit: function(t2) {
  try {
    var e2 = this;
    return e2.resultList.clear(), Promise.resolve(e2.options.provider.search(t2)).then(function(r2) {
      r2 && r2.length > 0 && e2.showResult(r2[0], t2);
    });
  } catch (t3) {
    return Promise.reject(t3);
  }
}, showResult: function(t2, e2) {
  var r2 = this.options, n2 = r2.autoClose, o2 = r2.updateMap, i2 = this.markers.getLayers();
  i2.length >= this.options.maxMarkers && this.markers.removeLayer(i2[0]);
  var s2 = this.addMarker(t2, e2);
  o2 && this.centerMap(t2), this.map.fireEvent("geosearch/showlocation", { location: t2, marker: s2 }), n2 && this.closeResults();
}, closeResults: function() {
  var t2 = this.searchElement.container;
  t2.classList.contains("active") && u(t2, "active"), this.clearResults();
}, addMarker: function(e2, r2) {
  var n2 = this, o2 = this.options, i2 = o2.marker, s2 = o2.showPopup, a2 = o2.popupFormat, l2 = new leafletSrcExports.Marker([e2.y, e2.x], i2), c2 = e2.label;
  return "function" == typeof a2 && (c2 = a2({ query: r2, result: e2 })), l2.bindPopup(c2), this.markers.addLayer(l2), s2 && l2.openPopup(), i2.draggable && l2.on("dragend", function(t2) {
    n2.map.fireEvent("geosearch/marker/dragend", { location: l2.getLatLng(), event: t2 });
  }), l2;
}, centerMap: function(e2) {
  var r2 = this.options, n2 = r2.retainZoomLevel, o2 = r2.animateZoom, i2 = e2.bounds ? new leafletSrcExports.LatLngBounds(e2.bounds) : new leafletSrcExports.LatLng(e2.y, e2.x).toBounds(10), s2 = i2.isValid() ? i2 : this.markers.getBounds();
  !n2 && i2.isValid() && !e2.bounds || n2 || !i2.isValid() ? this.map.setView(s2.getCenter(), this.getZoom(), { animate: o2 }) : this.map.fitBounds(s2, { animate: o2 });
}, getZoom: function() {
  var t2 = this.options, e2 = t2.zoomLevel;
  return t2.retainZoomLevel ? this.map.getZoom() : e2;
} };
function w() {
  if (!t) throw new Error(b);
  var e2 = leafletSrcExports.Control.extend(E);
  return i(e2, [].slice.call(arguments));
}
!(function(t2) {
  t2[t2.SEARCH = 0] = "SEARCH", t2[t2.REVERSE = 1] = "REVERSE";
})(h || (h = {}));
var x = /* @__PURE__ */ (function() {
  function t2(t3) {
    void 0 === t3 && (t3 = {}), this.options = void 0, this.options = t3;
  }
  var r2 = t2.prototype;
  return r2.getParamString = function(t3) {
    void 0 === t3 && (t3 = {});
    var r3 = e({}, this.options.params, t3);
    return Object.keys(r3).map(function(t4) {
      return encodeURIComponent(t4) + "=" + encodeURIComponent(r3[t4]);
    }).join("&");
  }, r2.getUrl = function(t3, e2) {
    return t3 + "?" + this.getParamString(e2);
  }, r2.search = function(t3) {
    try {
      var e2 = this, r3 = e2.endpoint({ query: t3.query, type: h.SEARCH });
      return Promise.resolve(fetch(r3)).then(function(t4) {
        return Promise.resolve(t4.json()).then(function(t5) {
          return e2.parse({ data: t5 });
        });
      });
    } catch (t4) {
      return Promise.reject(t4);
    }
  }, t2;
})();
"function" == typeof SuppressedError && SuppressedError;
var R;
!(function(t2) {
  t2[t2.INITIALIZED = 0] = "INITIALIZED", t2[t2.LOADING = 1] = "LOADING", t2[t2.SUCCESS = 2] = "SUCCESS", t2[t2.FAILURE = 3] = "FAILURE";
})(R || (R = {}));
var F = /* @__PURE__ */ (function(t2) {
  function e2(e3) {
    var r2;
    void 0 === e3 && (e3 = {}), (r2 = t2.call(this, e3) || this).searchUrl = void 0, r2.reverseUrl = void 0;
    var n3 = "https://nominatim.openstreetmap.org";
    return r2.searchUrl = e3.searchUrl || n3 + "/search", r2.reverseUrl = e3.reverseUrl || n3 + "/reverse", r2;
  }
  r(e2, t2);
  var n2 = e2.prototype;
  return n2.endpoint = function(t3) {
    var e3 = t3.query, r2 = t3.type, n3 = "string" == typeof e3 ? { q: e3 } : e3;
    return n3.format = "json", this.getUrl(r2 === h.REVERSE ? this.reverseUrl : this.searchUrl, n3);
  }, n2.parse = function(t3) {
    return (Array.isArray(t3.data) ? t3.data : [t3.data]).map(function(t4) {
      return { x: Number(t4.lon), y: Number(t4.lat), label: t4.display_name, bounds: [[parseFloat(t4.boundingbox[0]), parseFloat(t4.boundingbox[2])], [parseFloat(t4.boundingbox[1]), parseFloat(t4.boundingbox[3])]], raw: t4 };
    });
  }, e2;
})(x);
var reactIs = { exports: {} };
var reactIs_production_min = {};
var hasRequiredReactIs_production_min;
function requireReactIs_production_min() {
  if (hasRequiredReactIs_production_min) return reactIs_production_min;
  hasRequiredReactIs_production_min = 1;
  var b2 = "function" === typeof Symbol && Symbol.for, c2 = b2 ? /* @__PURE__ */ Symbol.for("react.element") : 60103, d2 = b2 ? /* @__PURE__ */ Symbol.for("react.portal") : 60106, e2 = b2 ? /* @__PURE__ */ Symbol.for("react.fragment") : 60107, f2 = b2 ? /* @__PURE__ */ Symbol.for("react.strict_mode") : 60108, g2 = b2 ? /* @__PURE__ */ Symbol.for("react.profiler") : 60114, h2 = b2 ? /* @__PURE__ */ Symbol.for("react.provider") : 60109, k = b2 ? /* @__PURE__ */ Symbol.for("react.context") : 60110, l2 = b2 ? /* @__PURE__ */ Symbol.for("react.async_mode") : 60111, m2 = b2 ? /* @__PURE__ */ Symbol.for("react.concurrent_mode") : 60111, n2 = b2 ? /* @__PURE__ */ Symbol.for("react.forward_ref") : 60112, p2 = b2 ? /* @__PURE__ */ Symbol.for("react.suspense") : 60113, q = b2 ? /* @__PURE__ */ Symbol.for("react.suspense_list") : 60120, r2 = b2 ? /* @__PURE__ */ Symbol.for("react.memo") : 60115, t2 = b2 ? /* @__PURE__ */ Symbol.for("react.lazy") : 60116, v2 = b2 ? /* @__PURE__ */ Symbol.for("react.block") : 60121, w2 = b2 ? /* @__PURE__ */ Symbol.for("react.fundamental") : 60117, x2 = b2 ? /* @__PURE__ */ Symbol.for("react.responder") : 60118, y2 = b2 ? /* @__PURE__ */ Symbol.for("react.scope") : 60119;
  function z(a2) {
    if ("object" === typeof a2 && null !== a2) {
      var u2 = a2.$$typeof;
      switch (u2) {
        case c2:
          switch (a2 = a2.type, a2) {
            case l2:
            case m2:
            case e2:
            case g2:
            case f2:
            case p2:
              return a2;
            default:
              switch (a2 = a2 && a2.$$typeof, a2) {
                case k:
                case n2:
                case t2:
                case r2:
                case h2:
                  return a2;
                default:
                  return u2;
              }
          }
        case d2:
          return u2;
      }
    }
  }
  function A(a2) {
    return z(a2) === m2;
  }
  reactIs_production_min.AsyncMode = l2;
  reactIs_production_min.ConcurrentMode = m2;
  reactIs_production_min.ContextConsumer = k;
  reactIs_production_min.ContextProvider = h2;
  reactIs_production_min.Element = c2;
  reactIs_production_min.ForwardRef = n2;
  reactIs_production_min.Fragment = e2;
  reactIs_production_min.Lazy = t2;
  reactIs_production_min.Memo = r2;
  reactIs_production_min.Portal = d2;
  reactIs_production_min.Profiler = g2;
  reactIs_production_min.StrictMode = f2;
  reactIs_production_min.Suspense = p2;
  reactIs_production_min.isAsyncMode = function(a2) {
    return A(a2) || z(a2) === l2;
  };
  reactIs_production_min.isConcurrentMode = A;
  reactIs_production_min.isContextConsumer = function(a2) {
    return z(a2) === k;
  };
  reactIs_production_min.isContextProvider = function(a2) {
    return z(a2) === h2;
  };
  reactIs_production_min.isElement = function(a2) {
    return "object" === typeof a2 && null !== a2 && a2.$$typeof === c2;
  };
  reactIs_production_min.isForwardRef = function(a2) {
    return z(a2) === n2;
  };
  reactIs_production_min.isFragment = function(a2) {
    return z(a2) === e2;
  };
  reactIs_production_min.isLazy = function(a2) {
    return z(a2) === t2;
  };
  reactIs_production_min.isMemo = function(a2) {
    return z(a2) === r2;
  };
  reactIs_production_min.isPortal = function(a2) {
    return z(a2) === d2;
  };
  reactIs_production_min.isProfiler = function(a2) {
    return z(a2) === g2;
  };
  reactIs_production_min.isStrictMode = function(a2) {
    return z(a2) === f2;
  };
  reactIs_production_min.isSuspense = function(a2) {
    return z(a2) === p2;
  };
  reactIs_production_min.isValidElementType = function(a2) {
    return "string" === typeof a2 || "function" === typeof a2 || a2 === e2 || a2 === m2 || a2 === g2 || a2 === f2 || a2 === p2 || a2 === q || "object" === typeof a2 && null !== a2 && (a2.$$typeof === t2 || a2.$$typeof === r2 || a2.$$typeof === h2 || a2.$$typeof === k || a2.$$typeof === n2 || a2.$$typeof === w2 || a2.$$typeof === x2 || a2.$$typeof === y2 || a2.$$typeof === v2);
  };
  reactIs_production_min.typeOf = z;
  return reactIs_production_min;
}
var hasRequiredReactIs;
function requireReactIs() {
  if (hasRequiredReactIs) return reactIs.exports;
  hasRequiredReactIs = 1;
  {
    reactIs.exports = requireReactIs_production_min();
  }
  return reactIs.exports;
}
var hoistNonReactStatics_cjs;
var hasRequiredHoistNonReactStatics_cjs;
function requireHoistNonReactStatics_cjs() {
  if (hasRequiredHoistNonReactStatics_cjs) return hoistNonReactStatics_cjs;
  hasRequiredHoistNonReactStatics_cjs = 1;
  var reactIs2 = requireReactIs();
  var REACT_STATICS = {
    childContextTypes: true,
    contextType: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromError: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
  };
  var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
  };
  var FORWARD_REF_STATICS = {
    "$$typeof": true,
    render: true,
    defaultProps: true,
    displayName: true,
    propTypes: true
  };
  var MEMO_STATICS = {
    "$$typeof": true,
    compare: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
    type: true
  };
  var TYPE_STATICS = {};
  TYPE_STATICS[reactIs2.ForwardRef] = FORWARD_REF_STATICS;
  TYPE_STATICS[reactIs2.Memo] = MEMO_STATICS;
  function getStatics(component) {
    if (reactIs2.isMemo(component)) {
      return MEMO_STATICS;
    }
    return TYPE_STATICS[component["$$typeof"]] || REACT_STATICS;
  }
  var defineProperty = Object.defineProperty;
  var getOwnPropertyNames = Object.getOwnPropertyNames;
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var getPrototypeOf = Object.getPrototypeOf;
  var objectPrototype = Object.prototype;
  function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== "string") {
      if (objectPrototype) {
        var inheritedComponent = getPrototypeOf(sourceComponent);
        if (inheritedComponent && inheritedComponent !== objectPrototype) {
          hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
        }
      }
      var keys = getOwnPropertyNames(sourceComponent);
      if (getOwnPropertySymbols) {
        keys = keys.concat(getOwnPropertySymbols(sourceComponent));
      }
      var targetStatics = getStatics(targetComponent);
      var sourceStatics = getStatics(sourceComponent);
      for (var i2 = 0; i2 < keys.length; ++i2) {
        var key = keys[i2];
        if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
          var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
          try {
            defineProperty(targetComponent, key, descriptor);
          } catch (e2) {
          }
        }
      }
    }
    return targetComponent;
  }
  hoistNonReactStatics_cjs = hoistNonReactStatics;
  return hoistNonReactStatics_cjs;
}
var hoistNonReactStatics_cjsExports = requireHoistNonReactStatics_cjs();
const hoistNonReactStatics$1 = /* @__PURE__ */ getDefaultExportFromCjs$2(hoistNonReactStatics_cjsExports);
export {
  $e as $,
  Autocomplete as A,
  F,
  GoogleMap as G,
  LoadScript as L,
  Marker$1 as M,
  Popup as P,
  TileLayer as T,
  useJsApiLoader as a,
  MapContainer as b,
  Marker2 as c,
  useMap as d,
  createCache as e,
  registerStyles as f,
  getRegisteredStyles as g,
  hoistNonReactStatics$1 as h,
  insertStyles as i,
  require$$0 as r,
  serializeStyles as s,
  ue as u,
  w
};
