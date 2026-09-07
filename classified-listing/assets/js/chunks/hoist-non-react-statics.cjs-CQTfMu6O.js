import { f as React, r as reactExports, d as ReactDOM, E as getAugmentedNamespace, o as jsxRuntimeExports, i as reactDomExports, t as getDefaultExportFromCjs$2 } from "./objectWithoutProperties-Bq7cFu76.js";
function _mergeNamespaces(n2, m2) {
  for (var i2 = 0; i2 < m2.length; i2++) {
    const e2 = m2[i2];
    if (typeof e2 !== "string" && !Array.isArray(e2)) {
      for (const k in e2) {
        if (k !== "default" && !(k in n2)) {
          const d2 = Object.getOwnPropertyDescriptor(e2, k);
          if (d2) {
            Object.defineProperty(n2, k, d2.get ? d2 : {
              enumerable: true,
              get: () => e2[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n2, Symbol.toStringTag, { value: "Module" }));
}
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
  let { invert: e2, toast: t2, unstyled: a2, interacting: u2, setHeights: f2, visibleToasts: w2, heights: S, index: g2, toasts: i2, expanded: D, removeToast: T, defaultRichColors: F2, closeButton: et, style: ut, cancelButtonStyle: ft, actionButtonStyle: l2, className: ot = "", descriptionClassName: at = "", duration: X, position: st, gap: pt, loadingIcon: rt, expandByDefault: B, classNames: s2, icons: P, closeButtonAriaLabel: nt = "Close toast", pauseWhenPageIsHidden: it } = n2, [Y, C] = React.useState(null), [lt, J] = React.useState(null), [W, H] = React.useState(false), [A, mt] = React.useState(false), [L2, z] = React.useState(false), [ct, d2] = React.useState(false), [h2, y2] = React.useState(false), [R2, j] = React.useState(0), [p2, _] = React.useState(0), O = React.useRef(t2.duration || X || Wt), G = React.useRef(null), k = React.useRef(null), Vt = g2 === 0, Ut = g2 + 1 <= w2, N = t2.type, V = t2.dismissible !== false, Kt = t2.className || "", Xt = t2.descriptionClassName || "", dt = React.useMemo(() => S.findIndex((r2) => r2.toastId === t2.id) || 0, [S, t2.id]), Jt = React.useMemo(() => {
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
  return React.createElement("li", { tabIndex: 0, ref: k, className: M(ot, Kt, s2 == null ? void 0 : s2.toast, (Dt = t2 == null ? void 0 : t2.classNames) == null ? void 0 : Dt.toast, s2 == null ? void 0 : s2.default, s2 == null ? void 0 : s2[N], (Pt = t2 == null ? void 0 : t2.classNames) == null ? void 0 : Pt[N]), "data-sonner-toast": "", "data-rich-colors": (Nt = t2.richColors) != null ? Nt : F2, "data-styled": !(t2.jsx || t2.unstyled || a2), "data-mounted": W, "data-promise": !!t2.promise, "data-swiped": h2, "data-removed": A, "data-visible": Ut, "data-y-position": Gt, "data-x-position": Qt, "data-index": g2, "data-front": Vt, "data-swiping": L2, "data-dismissible": V, "data-type": N, "data-invert": qt, "data-swipe-out": ct, "data-swipe-direction": lt, "data-expanded": !!(D || B && W), style: { "--index": g2, "--toasts-before": g2, "--z-index": i2.length - g2, "--offset": `${A ? R2 : U.current}px`, "--initial-height": B ? "auto" : `${p2}px`, ...ut, ...t2.style }, onDragEnd: () => {
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
  let { invert: a2, position: u2 = "bottom-right", hotkey: f2 = ["altKey", "KeyT"], expand: w2, closeButton: S, className: g2, offset: i2, mobileOffset: D, theme: T = "light", richColors: F2, duration: et, style: ut, visibleToasts: ft = pe, toastOptions: l2, dir: ot = _t(), gap: at = be, loadingIcon: X, icons: st, containerAriaLabel: pt = "Notifications", pauseWhenPageIsHidden: rt } = e2, [B, s2] = React.useState([]), P = React.useMemo(() => Array.from(new Set([u2].concat(B.filter((d2) => d2.position).map((d2) => d2.position)))), [B, u2]), [nt, it] = React.useState([]), [Y, C] = React.useState(false), [lt, J] = React.useState(false), [W, H] = React.useState(T !== "system" ? T : typeof window != "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), A = React.useRef(null), mt = f2.join("+").replace(/Key/g, "").replace(/Digit/g, ""), L2 = React.useRef(null), z = React.useRef(false), ct = React.useCallback((d2) => {
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
      L2.current && (L2.current.focus({ preventScroll: true }), L2.current = null, z.current = false);
    };
  }, [A.current]), React.createElement("section", { ref: t2, "aria-label": `${pt} ${mt}`, tabIndex: -1, "aria-live": "polite", "aria-relevant": "additions text", "aria-atomic": "false", suppressHydrationWarning: true }, P.map((d2, h2) => {
    var j;
    let [y2, R2] = d2.split("-");
    return B.length ? React.createElement("ol", { key: d2, dir: ot === "auto" ? _t() : ot, tabIndex: -1, ref: A, className: g2, "data-sonner-toaster": true, "data-theme": W, "data-y-position": y2, "data-lifted": Y && B.length > 1 && !w2, "data-x-position": R2, style: { "--front-toast-height": `${((j = nt[0]) == null ? void 0 : j.height) || 0}px`, "--width": `${he}px`, "--gap": `${at}px`, ...ut, ...Te(i2, D) }, onBlur: (p2) => {
      z.current && !p2.currentTarget.contains(p2.relatedTarget) && (z.current = false, L2.current && (L2.current.focus({ preventScroll: true }), L2.current = null));
    }, onFocus: (p2) => {
      p2.target instanceof HTMLElement && p2.target.dataset.dismissible === "false" || z.current || (z.current = true, L2.current = p2.relatedTarget);
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
var leafletSrc$1 = { exports: {} };
var leafletSrc = leafletSrc$1.exports;
var hasRequiredLeafletSrc;
function requireLeafletSrc() {
  if (hasRequiredLeafletSrc) return leafletSrc$1.exports;
  hasRequiredLeafletSrc = 1;
  (function(module, exports$1) {
    (function(global, factory) {
      factory(exports$1);
    })(leafletSrc, (function(exports$12) {
      var version = "1.9.4";
      function extend2(dest) {
        var i2, j, len, src;
        for (j = 1, len = arguments.length; j < len; j++) {
          src = arguments[j];
          for (i2 in src) {
            dest[i2] = src[i2];
          }
        }
        return dest;
      }
      var create$2 = Object.create || /* @__PURE__ */ (function() {
        function F2() {
        }
        return function(proto) {
          F2.prototype = proto;
          return new F2();
        };
      })();
      function bind(fn, obj) {
        var slice2 = Array.prototype.slice;
        if (fn.bind) {
          return fn.bind.apply(fn, slice2.call(arguments, 1));
        }
        var args = slice2.call(arguments, 2);
        return function() {
          return fn.apply(obj, args.length ? args.concat(slice2.call(arguments)) : arguments);
        };
      }
      var lastId = 0;
      function stamp(obj) {
        if (!("_leaflet_id" in obj)) {
          obj["_leaflet_id"] = ++lastId;
        }
        return obj._leaflet_id;
      }
      function throttle(fn, time, context) {
        var lock, args, wrapperFn, later;
        later = function() {
          lock = false;
          if (args) {
            wrapperFn.apply(context, args);
            args = false;
          }
        };
        wrapperFn = function() {
          if (lock) {
            args = arguments;
          } else {
            fn.apply(context, arguments);
            setTimeout(later, time);
            lock = true;
          }
        };
        return wrapperFn;
      }
      function wrapNum(x2, range, includeMax) {
        var max = range[1], min = range[0], d2 = max - min;
        return x2 === max && includeMax ? x2 : ((x2 - min) % d2 + d2) % d2 + min;
      }
      function falseFn() {
        return false;
      }
      function formatNum(num, precision) {
        if (precision === false) {
          return num;
        }
        var pow = Math.pow(10, precision === void 0 ? 6 : precision);
        return Math.round(num * pow) / pow;
      }
      function trim2(str) {
        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
      }
      function splitWords(str) {
        return trim2(str).split(/\s+/);
      }
      function setOptions(obj, options) {
        if (!Object.prototype.hasOwnProperty.call(obj, "options")) {
          obj.options = obj.options ? create$2(obj.options) : {};
        }
        for (var i2 in options) {
          obj.options[i2] = options[i2];
        }
        return obj.options;
      }
      function getParamString(obj, existingUrl, uppercase) {
        var params = [];
        for (var i2 in obj) {
          params.push(encodeURIComponent(uppercase ? i2.toUpperCase() : i2) + "=" + encodeURIComponent(obj[i2]));
        }
        return (!existingUrl || existingUrl.indexOf("?") === -1 ? "?" : "&") + params.join("&");
      }
      var templateRe = /\{ *([\w_ -]+) *\}/g;
      function template(str, data) {
        return str.replace(templateRe, function(str2, key) {
          var value = data[key];
          if (value === void 0) {
            throw new Error("No value provided for variable " + str2);
          } else if (typeof value === "function") {
            value = value(data);
          }
          return value;
        });
      }
      var isArray = Array.isArray || function(obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
      };
      function indexOf(array, el) {
        for (var i2 = 0; i2 < array.length; i2++) {
          if (array[i2] === el) {
            return i2;
          }
        }
        return -1;
      }
      var emptyImageUrl = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
      function getPrefixed(name) {
        return window["webkit" + name] || window["moz" + name] || window["ms" + name];
      }
      var lastTime = 0;
      function timeoutDefer(fn) {
        var time = +/* @__PURE__ */ new Date(), timeToCall = Math.max(0, 16 - (time - lastTime));
        lastTime = time + timeToCall;
        return window.setTimeout(fn, timeToCall);
      }
      var requestFn = window.requestAnimationFrame || getPrefixed("RequestAnimationFrame") || timeoutDefer;
      var cancelFn = window.cancelAnimationFrame || getPrefixed("CancelAnimationFrame") || getPrefixed("CancelRequestAnimationFrame") || function(id) {
        window.clearTimeout(id);
      };
      function requestAnimFrame(fn, context, immediate) {
        if (immediate && requestFn === timeoutDefer) {
          fn.call(context);
        } else {
          return requestFn.call(window, bind(fn, context));
        }
      }
      function cancelAnimFrame(id) {
        if (id) {
          cancelFn.call(window, id);
        }
      }
      var Util = {
        __proto__: null,
        extend: extend2,
        create: create$2,
        bind,
        get lastId() {
          return lastId;
        },
        stamp,
        throttle,
        wrapNum,
        falseFn,
        formatNum,
        trim: trim2,
        splitWords,
        setOptions,
        getParamString,
        template,
        isArray,
        indexOf,
        emptyImageUrl,
        requestFn,
        cancelFn,
        requestAnimFrame,
        cancelAnimFrame
      };
      function Class() {
      }
      Class.extend = function(props) {
        var NewClass = function() {
          setOptions(this);
          if (this.initialize) {
            this.initialize.apply(this, arguments);
          }
          this.callInitHooks();
        };
        var parentProto = NewClass.__super__ = this.prototype;
        var proto = create$2(parentProto);
        proto.constructor = NewClass;
        NewClass.prototype = proto;
        for (var i2 in this) {
          if (Object.prototype.hasOwnProperty.call(this, i2) && i2 !== "prototype" && i2 !== "__super__") {
            NewClass[i2] = this[i2];
          }
        }
        if (props.statics) {
          extend2(NewClass, props.statics);
        }
        if (props.includes) {
          checkDeprecatedMixinEvents(props.includes);
          extend2.apply(null, [proto].concat(props.includes));
        }
        extend2(proto, props);
        delete proto.statics;
        delete proto.includes;
        if (proto.options) {
          proto.options = parentProto.options ? create$2(parentProto.options) : {};
          extend2(proto.options, props.options);
        }
        proto._initHooks = [];
        proto.callInitHooks = function() {
          if (this._initHooksCalled) {
            return;
          }
          if (parentProto.callInitHooks) {
            parentProto.callInitHooks.call(this);
          }
          this._initHooksCalled = true;
          for (var i3 = 0, len = proto._initHooks.length; i3 < len; i3++) {
            proto._initHooks[i3].call(this);
          }
        };
        return NewClass;
      };
      Class.include = function(props) {
        var parentOptions = this.prototype.options;
        extend2(this.prototype, props);
        if (props.options) {
          this.prototype.options = parentOptions;
          this.mergeOptions(props.options);
        }
        return this;
      };
      Class.mergeOptions = function(options) {
        extend2(this.prototype.options, options);
        return this;
      };
      Class.addInitHook = function(fn) {
        var args = Array.prototype.slice.call(arguments, 1);
        var init = typeof fn === "function" ? fn : function() {
          this[fn].apply(this, args);
        };
        this.prototype._initHooks = this.prototype._initHooks || [];
        this.prototype._initHooks.push(init);
        return this;
      };
      function checkDeprecatedMixinEvents(includes) {
        if (typeof L === "undefined" || !L || !L.Mixin) {
          return;
        }
        includes = isArray(includes) ? includes : [includes];
        for (var i2 = 0; i2 < includes.length; i2++) {
          if (includes[i2] === L.Mixin.Events) {
            console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", new Error().stack);
          }
        }
      }
      var Events = {
        /* @method on(type: String, fn: Function, context?: Object): this
         * Adds a listener function (`fn`) to a particular event type of the object. You can optionally specify the context of the listener (object the this keyword will point to). You can also pass several space-separated types (e.g. `'click dblclick'`).
         *
         * @alternative
         * @method on(eventMap: Object): this
         * Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
         */
        on: function(types, fn, context) {
          if (typeof types === "object") {
            for (var type in types) {
              this._on(type, types[type], fn);
            }
          } else {
            types = splitWords(types);
            for (var i2 = 0, len = types.length; i2 < len; i2++) {
              this._on(types[i2], fn, context);
            }
          }
          return this;
        },
        /* @method off(type: String, fn?: Function, context?: Object): this
         * Removes a previously added listener function. If no function is specified, it will remove all the listeners of that particular event from the object. Note that if you passed a custom context to `on`, you must pass the same context to `off` in order to remove the listener.
         *
         * @alternative
         * @method off(eventMap: Object): this
         * Removes a set of type/listener pairs.
         *
         * @alternative
         * @method off: this
         * Removes all listeners to all events on the object. This includes implicitly attached events.
         */
        off: function(types, fn, context) {
          if (!arguments.length) {
            delete this._events;
          } else if (typeof types === "object") {
            for (var type in types) {
              this._off(type, types[type], fn);
            }
          } else {
            types = splitWords(types);
            var removeAll = arguments.length === 1;
            for (var i2 = 0, len = types.length; i2 < len; i2++) {
              if (removeAll) {
                this._off(types[i2]);
              } else {
                this._off(types[i2], fn, context);
              }
            }
          }
          return this;
        },
        // attach listener (without syntactic sugar now)
        _on: function(type, fn, context, _once) {
          if (typeof fn !== "function") {
            console.warn("wrong listener type: " + typeof fn);
            return;
          }
          if (this._listens(type, fn, context) !== false) {
            return;
          }
          if (context === this) {
            context = void 0;
          }
          var newListener = { fn, ctx: context };
          if (_once) {
            newListener.once = true;
          }
          this._events = this._events || {};
          this._events[type] = this._events[type] || [];
          this._events[type].push(newListener);
        },
        _off: function(type, fn, context) {
          var listeners, i2, len;
          if (!this._events) {
            return;
          }
          listeners = this._events[type];
          if (!listeners) {
            return;
          }
          if (arguments.length === 1) {
            if (this._firingCount) {
              for (i2 = 0, len = listeners.length; i2 < len; i2++) {
                listeners[i2].fn = falseFn;
              }
            }
            delete this._events[type];
            return;
          }
          if (typeof fn !== "function") {
            console.warn("wrong listener type: " + typeof fn);
            return;
          }
          var index2 = this._listens(type, fn, context);
          if (index2 !== false) {
            var listener = listeners[index2];
            if (this._firingCount) {
              listener.fn = falseFn;
              this._events[type] = listeners = listeners.slice();
            }
            listeners.splice(index2, 1);
          }
        },
        // @method fire(type: String, data?: Object, propagate?: Boolean): this
        // Fires an event of the specified type. You can optionally provide a data
        // object — the first argument of the listener function will contain its
        // properties. The event can optionally be propagated to event parents.
        fire: function(type, data, propagate) {
          if (!this.listens(type, propagate)) {
            return this;
          }
          var event = extend2({}, data, {
            type,
            target: this,
            sourceTarget: data && data.sourceTarget || this
          });
          if (this._events) {
            var listeners = this._events[type];
            if (listeners) {
              this._firingCount = this._firingCount + 1 || 1;
              for (var i2 = 0, len = listeners.length; i2 < len; i2++) {
                var l2 = listeners[i2];
                var fn = l2.fn;
                if (l2.once) {
                  this.off(type, fn, l2.ctx);
                }
                fn.call(l2.ctx || this, event);
              }
              this._firingCount--;
            }
          }
          if (propagate) {
            this._propagateEvent(event);
          }
          return this;
        },
        // @method listens(type: String, propagate?: Boolean): Boolean
        // @method listens(type: String, fn: Function, context?: Object, propagate?: Boolean): Boolean
        // Returns `true` if a particular event type has any listeners attached to it.
        // The verification can optionally be propagated, it will return `true` if parents have the listener attached to it.
        listens: function(type, fn, context, propagate) {
          if (typeof type !== "string") {
            console.warn('"string" type argument expected');
          }
          var _fn = fn;
          if (typeof fn !== "function") {
            propagate = !!fn;
            _fn = void 0;
            context = void 0;
          }
          var listeners = this._events && this._events[type];
          if (listeners && listeners.length) {
            if (this._listens(type, _fn, context) !== false) {
              return true;
            }
          }
          if (propagate) {
            for (var id in this._eventParents) {
              if (this._eventParents[id].listens(type, fn, context, propagate)) {
                return true;
              }
            }
          }
          return false;
        },
        // returns the index (number) or false
        _listens: function(type, fn, context) {
          if (!this._events) {
            return false;
          }
          var listeners = this._events[type] || [];
          if (!fn) {
            return !!listeners.length;
          }
          if (context === this) {
            context = void 0;
          }
          for (var i2 = 0, len = listeners.length; i2 < len; i2++) {
            if (listeners[i2].fn === fn && listeners[i2].ctx === context) {
              return i2;
            }
          }
          return false;
        },
        // @method once(…): this
        // Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
        once: function(types, fn, context) {
          if (typeof types === "object") {
            for (var type in types) {
              this._on(type, types[type], fn, true);
            }
          } else {
            types = splitWords(types);
            for (var i2 = 0, len = types.length; i2 < len; i2++) {
              this._on(types[i2], fn, context, true);
            }
          }
          return this;
        },
        // @method addEventParent(obj: Evented): this
        // Adds an event parent - an `Evented` that will receive propagated events
        addEventParent: function(obj) {
          this._eventParents = this._eventParents || {};
          this._eventParents[stamp(obj)] = obj;
          return this;
        },
        // @method removeEventParent(obj: Evented): this
        // Removes an event parent, so it will stop receiving propagated events
        removeEventParent: function(obj) {
          if (this._eventParents) {
            delete this._eventParents[stamp(obj)];
          }
          return this;
        },
        _propagateEvent: function(e2) {
          for (var id in this._eventParents) {
            this._eventParents[id].fire(e2.type, extend2({
              layer: e2.target,
              propagatedFrom: e2.target
            }, e2), true);
          }
        }
      };
      Events.addEventListener = Events.on;
      Events.removeEventListener = Events.clearAllEventListeners = Events.off;
      Events.addOneTimeEventListener = Events.once;
      Events.fireEvent = Events.fire;
      Events.hasEventListeners = Events.listens;
      var Evented = Class.extend(Events);
      function Point(x2, y2, round) {
        this.x = round ? Math.round(x2) : x2;
        this.y = round ? Math.round(y2) : y2;
      }
      var trunc = Math.trunc || function(v2) {
        return v2 > 0 ? Math.floor(v2) : Math.ceil(v2);
      };
      Point.prototype = {
        // @method clone(): Point
        // Returns a copy of the current point.
        clone: function() {
          return new Point(this.x, this.y);
        },
        // @method add(otherPoint: Point): Point
        // Returns the result of addition of the current and the given points.
        add: function(point) {
          return this.clone()._add(toPoint(point));
        },
        _add: function(point) {
          this.x += point.x;
          this.y += point.y;
          return this;
        },
        // @method subtract(otherPoint: Point): Point
        // Returns the result of subtraction of the given point from the current.
        subtract: function(point) {
          return this.clone()._subtract(toPoint(point));
        },
        _subtract: function(point) {
          this.x -= point.x;
          this.y -= point.y;
          return this;
        },
        // @method divideBy(num: Number): Point
        // Returns the result of division of the current point by the given number.
        divideBy: function(num) {
          return this.clone()._divideBy(num);
        },
        _divideBy: function(num) {
          this.x /= num;
          this.y /= num;
          return this;
        },
        // @method multiplyBy(num: Number): Point
        // Returns the result of multiplication of the current point by the given number.
        multiplyBy: function(num) {
          return this.clone()._multiplyBy(num);
        },
        _multiplyBy: function(num) {
          this.x *= num;
          this.y *= num;
          return this;
        },
        // @method scaleBy(scale: Point): Point
        // Multiply each coordinate of the current point by each coordinate of
        // `scale`. In linear algebra terms, multiply the point by the
        // [scaling matrix](https://en.wikipedia.org/wiki/Scaling_%28geometry%29#Matrix_representation)
        // defined by `scale`.
        scaleBy: function(point) {
          return new Point(this.x * point.x, this.y * point.y);
        },
        // @method unscaleBy(scale: Point): Point
        // Inverse of `scaleBy`. Divide each coordinate of the current point by
        // each coordinate of `scale`.
        unscaleBy: function(point) {
          return new Point(this.x / point.x, this.y / point.y);
        },
        // @method round(): Point
        // Returns a copy of the current point with rounded coordinates.
        round: function() {
          return this.clone()._round();
        },
        _round: function() {
          this.x = Math.round(this.x);
          this.y = Math.round(this.y);
          return this;
        },
        // @method floor(): Point
        // Returns a copy of the current point with floored coordinates (rounded down).
        floor: function() {
          return this.clone()._floor();
        },
        _floor: function() {
          this.x = Math.floor(this.x);
          this.y = Math.floor(this.y);
          return this;
        },
        // @method ceil(): Point
        // Returns a copy of the current point with ceiled coordinates (rounded up).
        ceil: function() {
          return this.clone()._ceil();
        },
        _ceil: function() {
          this.x = Math.ceil(this.x);
          this.y = Math.ceil(this.y);
          return this;
        },
        // @method trunc(): Point
        // Returns a copy of the current point with truncated coordinates (rounded towards zero).
        trunc: function() {
          return this.clone()._trunc();
        },
        _trunc: function() {
          this.x = trunc(this.x);
          this.y = trunc(this.y);
          return this;
        },
        // @method distanceTo(otherPoint: Point): Number
        // Returns the cartesian distance between the current and the given points.
        distanceTo: function(point) {
          point = toPoint(point);
          var x2 = point.x - this.x, y2 = point.y - this.y;
          return Math.sqrt(x2 * x2 + y2 * y2);
        },
        // @method equals(otherPoint: Point): Boolean
        // Returns `true` if the given point has the same coordinates.
        equals: function(point) {
          point = toPoint(point);
          return point.x === this.x && point.y === this.y;
        },
        // @method contains(otherPoint: Point): Boolean
        // Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
        contains: function(point) {
          point = toPoint(point);
          return Math.abs(point.x) <= Math.abs(this.x) && Math.abs(point.y) <= Math.abs(this.y);
        },
        // @method toString(): String
        // Returns a string representation of the point for debugging purposes.
        toString: function() {
          return "Point(" + formatNum(this.x) + ", " + formatNum(this.y) + ")";
        }
      };
      function toPoint(x2, y2, round) {
        if (x2 instanceof Point) {
          return x2;
        }
        if (isArray(x2)) {
          return new Point(x2[0], x2[1]);
        }
        if (x2 === void 0 || x2 === null) {
          return x2;
        }
        if (typeof x2 === "object" && "x" in x2 && "y" in x2) {
          return new Point(x2.x, x2.y);
        }
        return new Point(x2, y2, round);
      }
      function Bounds(a2, b2) {
        if (!a2) {
          return;
        }
        var points = b2 ? [a2, b2] : a2;
        for (var i2 = 0, len = points.length; i2 < len; i2++) {
          this.extend(points[i2]);
        }
      }
      Bounds.prototype = {
        // @method extend(point: Point): this
        // Extends the bounds to contain the given point.
        // @alternative
        // @method extend(otherBounds: Bounds): this
        // Extend the bounds to contain the given bounds
        extend: function(obj) {
          var min2, max2;
          if (!obj) {
            return this;
          }
          if (obj instanceof Point || typeof obj[0] === "number" || "x" in obj) {
            min2 = max2 = toPoint(obj);
          } else {
            obj = toBounds(obj);
            min2 = obj.min;
            max2 = obj.max;
            if (!min2 || !max2) {
              return this;
            }
          }
          if (!this.min && !this.max) {
            this.min = min2.clone();
            this.max = max2.clone();
          } else {
            this.min.x = Math.min(min2.x, this.min.x);
            this.max.x = Math.max(max2.x, this.max.x);
            this.min.y = Math.min(min2.y, this.min.y);
            this.max.y = Math.max(max2.y, this.max.y);
          }
          return this;
        },
        // @method getCenter(round?: Boolean): Point
        // Returns the center point of the bounds.
        getCenter: function(round) {
          return toPoint(
            (this.min.x + this.max.x) / 2,
            (this.min.y + this.max.y) / 2,
            round
          );
        },
        // @method getBottomLeft(): Point
        // Returns the bottom-left point of the bounds.
        getBottomLeft: function() {
          return toPoint(this.min.x, this.max.y);
        },
        // @method getTopRight(): Point
        // Returns the top-right point of the bounds.
        getTopRight: function() {
          return toPoint(this.max.x, this.min.y);
        },
        // @method getTopLeft(): Point
        // Returns the top-left point of the bounds (i.e. [`this.min`](#bounds-min)).
        getTopLeft: function() {
          return this.min;
        },
        // @method getBottomRight(): Point
        // Returns the bottom-right point of the bounds (i.e. [`this.max`](#bounds-max)).
        getBottomRight: function() {
          return this.max;
        },
        // @method getSize(): Point
        // Returns the size of the given bounds
        getSize: function() {
          return this.max.subtract(this.min);
        },
        // @method contains(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle contains the given one.
        // @alternative
        // @method contains(point: Point): Boolean
        // Returns `true` if the rectangle contains the given point.
        contains: function(obj) {
          var min, max;
          if (typeof obj[0] === "number" || obj instanceof Point) {
            obj = toPoint(obj);
          } else {
            obj = toBounds(obj);
          }
          if (obj instanceof Bounds) {
            min = obj.min;
            max = obj.max;
          } else {
            min = max = obj;
          }
          return min.x >= this.min.x && max.x <= this.max.x && min.y >= this.min.y && max.y <= this.max.y;
        },
        // @method intersects(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle intersects the given bounds. Two bounds
        // intersect if they have at least one point in common.
        intersects: function(bounds) {
          bounds = toBounds(bounds);
          var min = this.min, max = this.max, min2 = bounds.min, max2 = bounds.max, xIntersects = max2.x >= min.x && min2.x <= max.x, yIntersects = max2.y >= min.y && min2.y <= max.y;
          return xIntersects && yIntersects;
        },
        // @method overlaps(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle overlaps the given bounds. Two bounds
        // overlap if their intersection is an area.
        overlaps: function(bounds) {
          bounds = toBounds(bounds);
          var min = this.min, max = this.max, min2 = bounds.min, max2 = bounds.max, xOverlaps = max2.x > min.x && min2.x < max.x, yOverlaps = max2.y > min.y && min2.y < max.y;
          return xOverlaps && yOverlaps;
        },
        // @method isValid(): Boolean
        // Returns `true` if the bounds are properly initialized.
        isValid: function() {
          return !!(this.min && this.max);
        },
        // @method pad(bufferRatio: Number): Bounds
        // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
        // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
        // Negative values will retract the bounds.
        pad: function(bufferRatio) {
          var min = this.min, max = this.max, heightBuffer = Math.abs(min.x - max.x) * bufferRatio, widthBuffer = Math.abs(min.y - max.y) * bufferRatio;
          return toBounds(
            toPoint(min.x - heightBuffer, min.y - widthBuffer),
            toPoint(max.x + heightBuffer, max.y + widthBuffer)
          );
        },
        // @method equals(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle is equivalent to the given bounds.
        equals: function(bounds) {
          if (!bounds) {
            return false;
          }
          bounds = toBounds(bounds);
          return this.min.equals(bounds.getTopLeft()) && this.max.equals(bounds.getBottomRight());
        }
      };
      function toBounds(a2, b2) {
        if (!a2 || a2 instanceof Bounds) {
          return a2;
        }
        return new Bounds(a2, b2);
      }
      function LatLngBounds(corner1, corner2) {
        if (!corner1) {
          return;
        }
        var latlngs = corner2 ? [corner1, corner2] : corner1;
        for (var i2 = 0, len = latlngs.length; i2 < len; i2++) {
          this.extend(latlngs[i2]);
        }
      }
      LatLngBounds.prototype = {
        // @method extend(latlng: LatLng): this
        // Extend the bounds to contain the given point
        // @alternative
        // @method extend(otherBounds: LatLngBounds): this
        // Extend the bounds to contain the given bounds
        extend: function(obj) {
          var sw = this._southWest, ne2 = this._northEast, sw2, ne22;
          if (obj instanceof LatLng) {
            sw2 = obj;
            ne22 = obj;
          } else if (obj instanceof LatLngBounds) {
            sw2 = obj._southWest;
            ne22 = obj._northEast;
            if (!sw2 || !ne22) {
              return this;
            }
          } else {
            return obj ? this.extend(toLatLng(obj) || toLatLngBounds(obj)) : this;
          }
          if (!sw && !ne2) {
            this._southWest = new LatLng(sw2.lat, sw2.lng);
            this._northEast = new LatLng(ne22.lat, ne22.lng);
          } else {
            sw.lat = Math.min(sw2.lat, sw.lat);
            sw.lng = Math.min(sw2.lng, sw.lng);
            ne2.lat = Math.max(ne22.lat, ne2.lat);
            ne2.lng = Math.max(ne22.lng, ne2.lng);
          }
          return this;
        },
        // @method pad(bufferRatio: Number): LatLngBounds
        // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
        // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
        // Negative values will retract the bounds.
        pad: function(bufferRatio) {
          var sw = this._southWest, ne2 = this._northEast, heightBuffer = Math.abs(sw.lat - ne2.lat) * bufferRatio, widthBuffer = Math.abs(sw.lng - ne2.lng) * bufferRatio;
          return new LatLngBounds(
            new LatLng(sw.lat - heightBuffer, sw.lng - widthBuffer),
            new LatLng(ne2.lat + heightBuffer, ne2.lng + widthBuffer)
          );
        },
        // @method getCenter(): LatLng
        // Returns the center point of the bounds.
        getCenter: function() {
          return new LatLng(
            (this._southWest.lat + this._northEast.lat) / 2,
            (this._southWest.lng + this._northEast.lng) / 2
          );
        },
        // @method getSouthWest(): LatLng
        // Returns the south-west point of the bounds.
        getSouthWest: function() {
          return this._southWest;
        },
        // @method getNorthEast(): LatLng
        // Returns the north-east point of the bounds.
        getNorthEast: function() {
          return this._northEast;
        },
        // @method getNorthWest(): LatLng
        // Returns the north-west point of the bounds.
        getNorthWest: function() {
          return new LatLng(this.getNorth(), this.getWest());
        },
        // @method getSouthEast(): LatLng
        // Returns the south-east point of the bounds.
        getSouthEast: function() {
          return new LatLng(this.getSouth(), this.getEast());
        },
        // @method getWest(): Number
        // Returns the west longitude of the bounds
        getWest: function() {
          return this._southWest.lng;
        },
        // @method getSouth(): Number
        // Returns the south latitude of the bounds
        getSouth: function() {
          return this._southWest.lat;
        },
        // @method getEast(): Number
        // Returns the east longitude of the bounds
        getEast: function() {
          return this._northEast.lng;
        },
        // @method getNorth(): Number
        // Returns the north latitude of the bounds
        getNorth: function() {
          return this._northEast.lat;
        },
        // @method contains(otherBounds: LatLngBounds): Boolean
        // Returns `true` if the rectangle contains the given one.
        // @alternative
        // @method contains (latlng: LatLng): Boolean
        // Returns `true` if the rectangle contains the given point.
        contains: function(obj) {
          if (typeof obj[0] === "number" || obj instanceof LatLng || "lat" in obj) {
            obj = toLatLng(obj);
          } else {
            obj = toLatLngBounds(obj);
          }
          var sw = this._southWest, ne2 = this._northEast, sw2, ne22;
          if (obj instanceof LatLngBounds) {
            sw2 = obj.getSouthWest();
            ne22 = obj.getNorthEast();
          } else {
            sw2 = ne22 = obj;
          }
          return sw2.lat >= sw.lat && ne22.lat <= ne2.lat && sw2.lng >= sw.lng && ne22.lng <= ne2.lng;
        },
        // @method intersects(otherBounds: LatLngBounds): Boolean
        // Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
        intersects: function(bounds) {
          bounds = toLatLngBounds(bounds);
          var sw = this._southWest, ne2 = this._northEast, sw2 = bounds.getSouthWest(), ne22 = bounds.getNorthEast(), latIntersects = ne22.lat >= sw.lat && sw2.lat <= ne2.lat, lngIntersects = ne22.lng >= sw.lng && sw2.lng <= ne2.lng;
          return latIntersects && lngIntersects;
        },
        // @method overlaps(otherBounds: LatLngBounds): Boolean
        // Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
        overlaps: function(bounds) {
          bounds = toLatLngBounds(bounds);
          var sw = this._southWest, ne2 = this._northEast, sw2 = bounds.getSouthWest(), ne22 = bounds.getNorthEast(), latOverlaps = ne22.lat > sw.lat && sw2.lat < ne2.lat, lngOverlaps = ne22.lng > sw.lng && sw2.lng < ne2.lng;
          return latOverlaps && lngOverlaps;
        },
        // @method toBBoxString(): String
        // Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
        toBBoxString: function() {
          return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",");
        },
        // @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
        // Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting `maxMargin` to a small number.
        equals: function(bounds, maxMargin) {
          if (!bounds) {
            return false;
          }
          bounds = toLatLngBounds(bounds);
          return this._southWest.equals(bounds.getSouthWest(), maxMargin) && this._northEast.equals(bounds.getNorthEast(), maxMargin);
        },
        // @method isValid(): Boolean
        // Returns `true` if the bounds are properly initialized.
        isValid: function() {
          return !!(this._southWest && this._northEast);
        }
      };
      function toLatLngBounds(a2, b2) {
        if (a2 instanceof LatLngBounds) {
          return a2;
        }
        return new LatLngBounds(a2, b2);
      }
      function LatLng(lat, lng, alt) {
        if (isNaN(lat) || isNaN(lng)) {
          throw new Error("Invalid LatLng object: (" + lat + ", " + lng + ")");
        }
        this.lat = +lat;
        this.lng = +lng;
        if (alt !== void 0) {
          this.alt = +alt;
        }
      }
      LatLng.prototype = {
        // @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
        // Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overridden by setting `maxMargin` to a small number.
        equals: function(obj, maxMargin) {
          if (!obj) {
            return false;
          }
          obj = toLatLng(obj);
          var margin = Math.max(
            Math.abs(this.lat - obj.lat),
            Math.abs(this.lng - obj.lng)
          );
          return margin <= (maxMargin === void 0 ? 1e-9 : maxMargin);
        },
        // @method toString(): String
        // Returns a string representation of the point (for debugging purposes).
        toString: function(precision) {
          return "LatLng(" + formatNum(this.lat, precision) + ", " + formatNum(this.lng, precision) + ")";
        },
        // @method distanceTo(otherLatLng: LatLng): Number
        // Returns the distance (in meters) to the given `LatLng` calculated using the [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines).
        distanceTo: function(other) {
          return Earth.distance(this, toLatLng(other));
        },
        // @method wrap(): LatLng
        // Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
        wrap: function() {
          return Earth.wrapLatLng(this);
        },
        // @method toBounds(sizeInMeters: Number): LatLngBounds
        // Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
        toBounds: function(sizeInMeters) {
          var latAccuracy = 180 * sizeInMeters / 40075017, lngAccuracy = latAccuracy / Math.cos(Math.PI / 180 * this.lat);
          return toLatLngBounds(
            [this.lat - latAccuracy, this.lng - lngAccuracy],
            [this.lat + latAccuracy, this.lng + lngAccuracy]
          );
        },
        clone: function() {
          return new LatLng(this.lat, this.lng, this.alt);
        }
      };
      function toLatLng(a2, b2, c2) {
        if (a2 instanceof LatLng) {
          return a2;
        }
        if (isArray(a2) && typeof a2[0] !== "object") {
          if (a2.length === 3) {
            return new LatLng(a2[0], a2[1], a2[2]);
          }
          if (a2.length === 2) {
            return new LatLng(a2[0], a2[1]);
          }
          return null;
        }
        if (a2 === void 0 || a2 === null) {
          return a2;
        }
        if (typeof a2 === "object" && "lat" in a2) {
          return new LatLng(a2.lat, "lng" in a2 ? a2.lng : a2.lon, a2.alt);
        }
        if (b2 === void 0) {
          return null;
        }
        return new LatLng(a2, b2, c2);
      }
      var CRS = {
        // @method latLngToPoint(latlng: LatLng, zoom: Number): Point
        // Projects geographical coordinates into pixel coordinates for a given zoom.
        latLngToPoint: function(latlng, zoom2) {
          var projectedPoint = this.projection.project(latlng), scale2 = this.scale(zoom2);
          return this.transformation._transform(projectedPoint, scale2);
        },
        // @method pointToLatLng(point: Point, zoom: Number): LatLng
        // The inverse of `latLngToPoint`. Projects pixel coordinates on a given
        // zoom into geographical coordinates.
        pointToLatLng: function(point, zoom2) {
          var scale2 = this.scale(zoom2), untransformedPoint = this.transformation.untransform(point, scale2);
          return this.projection.unproject(untransformedPoint);
        },
        // @method project(latlng: LatLng): Point
        // Projects geographical coordinates into coordinates in units accepted for
        // this CRS (e.g. meters for EPSG:3857, for passing it to WMS services).
        project: function(latlng) {
          return this.projection.project(latlng);
        },
        // @method unproject(point: Point): LatLng
        // Given a projected coordinate returns the corresponding LatLng.
        // The inverse of `project`.
        unproject: function(point) {
          return this.projection.unproject(point);
        },
        // @method scale(zoom: Number): Number
        // Returns the scale used when transforming projected coordinates into
        // pixel coordinates for a particular zoom. For example, it returns
        // `256 * 2^zoom` for Mercator-based CRS.
        scale: function(zoom2) {
          return 256 * Math.pow(2, zoom2);
        },
        // @method zoom(scale: Number): Number
        // Inverse of `scale()`, returns the zoom level corresponding to a scale
        // factor of `scale`.
        zoom: function(scale2) {
          return Math.log(scale2 / 256) / Math.LN2;
        },
        // @method getProjectedBounds(zoom: Number): Bounds
        // Returns the projection's bounds scaled and transformed for the provided `zoom`.
        getProjectedBounds: function(zoom2) {
          if (this.infinite) {
            return null;
          }
          var b2 = this.projection.bounds, s2 = this.scale(zoom2), min = this.transformation.transform(b2.min, s2), max = this.transformation.transform(b2.max, s2);
          return new Bounds(min, max);
        },
        // @method distance(latlng1: LatLng, latlng2: LatLng): Number
        // Returns the distance between two geographical coordinates.
        // @property code: String
        // Standard code name of the CRS passed into WMS services (e.g. `'EPSG:3857'`)
        //
        // @property wrapLng: Number[]
        // An array of two numbers defining whether the longitude (horizontal) coordinate
        // axis wraps around a given range and how. Defaults to `[-180, 180]` in most
        // geographical CRSs. If `undefined`, the longitude axis does not wrap around.
        //
        // @property wrapLat: Number[]
        // Like `wrapLng`, but for the latitude (vertical) axis.
        // wrapLng: [min, max],
        // wrapLat: [min, max],
        // @property infinite: Boolean
        // If true, the coordinate space will be unbounded (infinite in both axes)
        infinite: false,
        // @method wrapLatLng(latlng: LatLng): LatLng
        // Returns a `LatLng` where lat and lng has been wrapped according to the
        // CRS's `wrapLat` and `wrapLng` properties, if they are outside the CRS's bounds.
        wrapLatLng: function(latlng) {
          var lng = this.wrapLng ? wrapNum(latlng.lng, this.wrapLng, true) : latlng.lng, lat = this.wrapLat ? wrapNum(latlng.lat, this.wrapLat, true) : latlng.lat, alt = latlng.alt;
          return new LatLng(lat, lng, alt);
        },
        // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
        // Returns a `LatLngBounds` with the same size as the given one, ensuring
        // that its center is within the CRS's bounds.
        // Only accepts actual `L.LatLngBounds` instances, not arrays.
        wrapLatLngBounds: function(bounds) {
          var center = bounds.getCenter(), newCenter = this.wrapLatLng(center), latShift = center.lat - newCenter.lat, lngShift = center.lng - newCenter.lng;
          if (latShift === 0 && lngShift === 0) {
            return bounds;
          }
          var sw = bounds.getSouthWest(), ne2 = bounds.getNorthEast(), newSw = new LatLng(sw.lat - latShift, sw.lng - lngShift), newNe = new LatLng(ne2.lat - latShift, ne2.lng - lngShift);
          return new LatLngBounds(newSw, newNe);
        }
      };
      var Earth = extend2({}, CRS, {
        wrapLng: [-180, 180],
        // Mean Earth Radius, as recommended for use by
        // the International Union of Geodesy and Geophysics,
        // see https://rosettacode.org/wiki/Haversine_formula
        R: 6371e3,
        // distance between two geographical points using spherical law of cosines approximation
        distance: function(latlng1, latlng2) {
          var rad = Math.PI / 180, lat1 = latlng1.lat * rad, lat2 = latlng2.lat * rad, sinDLat = Math.sin((latlng2.lat - latlng1.lat) * rad / 2), sinDLon = Math.sin((latlng2.lng - latlng1.lng) * rad / 2), a2 = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon, c2 = 2 * Math.atan2(Math.sqrt(a2), Math.sqrt(1 - a2));
          return this.R * c2;
        }
      });
      var earthRadius = 6378137;
      var SphericalMercator = {
        R: earthRadius,
        MAX_LATITUDE: 85.0511287798,
        project: function(latlng) {
          var d2 = Math.PI / 180, max = this.MAX_LATITUDE, lat = Math.max(Math.min(max, latlng.lat), -max), sin = Math.sin(lat * d2);
          return new Point(
            this.R * latlng.lng * d2,
            this.R * Math.log((1 + sin) / (1 - sin)) / 2
          );
        },
        unproject: function(point) {
          var d2 = 180 / Math.PI;
          return new LatLng(
            (2 * Math.atan(Math.exp(point.y / this.R)) - Math.PI / 2) * d2,
            point.x * d2 / this.R
          );
        },
        bounds: (function() {
          var d2 = earthRadius * Math.PI;
          return new Bounds([-d2, -d2], [d2, d2]);
        })()
      };
      function Transformation(a2, b2, c2, d2) {
        if (isArray(a2)) {
          this._a = a2[0];
          this._b = a2[1];
          this._c = a2[2];
          this._d = a2[3];
          return;
        }
        this._a = a2;
        this._b = b2;
        this._c = c2;
        this._d = d2;
      }
      Transformation.prototype = {
        // @method transform(point: Point, scale?: Number): Point
        // Returns a transformed point, optionally multiplied by the given scale.
        // Only accepts actual `L.Point` instances, not arrays.
        transform: function(point, scale2) {
          return this._transform(point.clone(), scale2);
        },
        // destructive transform (faster)
        _transform: function(point, scale2) {
          scale2 = scale2 || 1;
          point.x = scale2 * (this._a * point.x + this._b);
          point.y = scale2 * (this._c * point.y + this._d);
          return point;
        },
        // @method untransform(point: Point, scale?: Number): Point
        // Returns the reverse transformation of the given point, optionally divided
        // by the given scale. Only accepts actual `L.Point` instances, not arrays.
        untransform: function(point, scale2) {
          scale2 = scale2 || 1;
          return new Point(
            (point.x / scale2 - this._b) / this._a,
            (point.y / scale2 - this._d) / this._c
          );
        }
      };
      function toTransformation(a2, b2, c2, d2) {
        return new Transformation(a2, b2, c2, d2);
      }
      var EPSG3857 = extend2({}, Earth, {
        code: "EPSG:3857",
        projection: SphericalMercator,
        transformation: (function() {
          var scale2 = 0.5 / (Math.PI * SphericalMercator.R);
          return toTransformation(scale2, 0.5, -scale2, 0.5);
        })()
      });
      var EPSG900913 = extend2({}, EPSG3857, {
        code: "EPSG:900913"
      });
      function svgCreate(name) {
        return document.createElementNS("http://www.w3.org/2000/svg", name);
      }
      function pointsToPath(rings, closed) {
        var str = "", i2, j, len, len2, points, p2;
        for (i2 = 0, len = rings.length; i2 < len; i2++) {
          points = rings[i2];
          for (j = 0, len2 = points.length; j < len2; j++) {
            p2 = points[j];
            str += (j ? "L" : "M") + p2.x + " " + p2.y;
          }
          str += closed ? Browser.svg ? "z" : "x" : "";
        }
        return str || "M0 0";
      }
      var style = document.documentElement.style;
      var ie2 = "ActiveXObject" in window;
      var ielt9 = ie2 && !document.addEventListener;
      var edge = "msLaunchUri" in navigator && !("documentMode" in document);
      var webkit = userAgentContains("webkit");
      var android = userAgentContains("android");
      var android23 = userAgentContains("android 2") || userAgentContains("android 3");
      var webkitVer = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10);
      var androidStock = android && userAgentContains("Google") && webkitVer < 537 && !("AudioNode" in window);
      var opera = !!window.opera;
      var chrome = !edge && userAgentContains("chrome");
      var gecko = userAgentContains("gecko") && !webkit && !opera && !ie2;
      var safari = !chrome && userAgentContains("safari");
      var phantom = userAgentContains("phantom");
      var opera12 = "OTransition" in style;
      var win = navigator.platform.indexOf("Win") === 0;
      var ie3d = ie2 && "transition" in style;
      var webkit3d = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !android23;
      var gecko3d = "MozPerspective" in style;
      var any3d = !window.L_DISABLE_3D && (ie3d || webkit3d || gecko3d) && !opera12 && !phantom;
      var mobile = typeof orientation !== "undefined" || userAgentContains("mobile");
      var mobileWebkit = mobile && webkit;
      var mobileWebkit3d = mobile && webkit3d;
      var msPointer = !window.PointerEvent && window.MSPointerEvent;
      var pointer = !!(window.PointerEvent || msPointer);
      var touchNative = "ontouchstart" in window || !!window.TouchEvent;
      var touch = !window.L_NO_TOUCH && (touchNative || pointer);
      var mobileOpera = mobile && opera;
      var mobileGecko = mobile && gecko;
      var retina = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1;
      var passiveEvents = (function() {
        var supportsPassiveOption = false;
        try {
          var opts = Object.defineProperty({}, "passive", {
            get: function() {
              supportsPassiveOption = true;
            }
          });
          window.addEventListener("testPassiveEventSupport", falseFn, opts);
          window.removeEventListener("testPassiveEventSupport", falseFn, opts);
        } catch (e2) {
        }
        return supportsPassiveOption;
      })();
      var canvas$1 = (function() {
        return !!document.createElement("canvas").getContext;
      })();
      var svg$1 = !!(document.createElementNS && svgCreate("svg").createSVGRect);
      var inlineSvg = !!svg$1 && (function() {
        var div = document.createElement("div");
        div.innerHTML = "<svg/>";
        return (div.firstChild && div.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
      })();
      var vml = !svg$1 && (function() {
        try {
          var div = document.createElement("div");
          div.innerHTML = '<v:shape adj="1"/>';
          var shape = div.firstChild;
          shape.style.behavior = "url(#default#VML)";
          return shape && typeof shape.adj === "object";
        } catch (e2) {
          return false;
        }
      })();
      var mac = navigator.platform.indexOf("Mac") === 0;
      var linux = navigator.platform.indexOf("Linux") === 0;
      function userAgentContains(str) {
        return navigator.userAgent.toLowerCase().indexOf(str) >= 0;
      }
      var Browser = {
        ie: ie2,
        ielt9,
        edge,
        webkit,
        android,
        android23,
        androidStock,
        opera,
        chrome,
        gecko,
        safari,
        phantom,
        opera12,
        win,
        ie3d,
        webkit3d,
        gecko3d,
        any3d,
        mobile,
        mobileWebkit,
        mobileWebkit3d,
        msPointer,
        pointer,
        touch,
        touchNative,
        mobileOpera,
        mobileGecko,
        retina,
        passiveEvents,
        canvas: canvas$1,
        svg: svg$1,
        vml,
        inlineSvg,
        mac,
        linux
      };
      var POINTER_DOWN = Browser.msPointer ? "MSPointerDown" : "pointerdown";
      var POINTER_MOVE = Browser.msPointer ? "MSPointerMove" : "pointermove";
      var POINTER_UP = Browser.msPointer ? "MSPointerUp" : "pointerup";
      var POINTER_CANCEL = Browser.msPointer ? "MSPointerCancel" : "pointercancel";
      var pEvent = {
        touchstart: POINTER_DOWN,
        touchmove: POINTER_MOVE,
        touchend: POINTER_UP,
        touchcancel: POINTER_CANCEL
      };
      var handle = {
        touchstart: _onPointerStart,
        touchmove: _handlePointer,
        touchend: _handlePointer,
        touchcancel: _handlePointer
      };
      var _pointers = {};
      var _pointerDocListener = false;
      function addPointerListener(obj, type, handler) {
        if (type === "touchstart") {
          _addPointerDocListener();
        }
        if (!handle[type]) {
          console.warn("wrong event specified:", type);
          return falseFn;
        }
        handler = handle[type].bind(this, handler);
        obj.addEventListener(pEvent[type], handler, false);
        return handler;
      }
      function removePointerListener(obj, type, handler) {
        if (!pEvent[type]) {
          console.warn("wrong event specified:", type);
          return;
        }
        obj.removeEventListener(pEvent[type], handler, false);
      }
      function _globalPointerDown(e2) {
        _pointers[e2.pointerId] = e2;
      }
      function _globalPointerMove(e2) {
        if (_pointers[e2.pointerId]) {
          _pointers[e2.pointerId] = e2;
        }
      }
      function _globalPointerUp(e2) {
        delete _pointers[e2.pointerId];
      }
      function _addPointerDocListener() {
        if (!_pointerDocListener) {
          document.addEventListener(POINTER_DOWN, _globalPointerDown, true);
          document.addEventListener(POINTER_MOVE, _globalPointerMove, true);
          document.addEventListener(POINTER_UP, _globalPointerUp, true);
          document.addEventListener(POINTER_CANCEL, _globalPointerUp, true);
          _pointerDocListener = true;
        }
      }
      function _handlePointer(handler, e2) {
        if (e2.pointerType === (e2.MSPOINTER_TYPE_MOUSE || "mouse")) {
          return;
        }
        e2.touches = [];
        for (var i2 in _pointers) {
          e2.touches.push(_pointers[i2]);
        }
        e2.changedTouches = [e2];
        handler(e2);
      }
      function _onPointerStart(handler, e2) {
        if (e2.MSPOINTER_TYPE_TOUCH && e2.pointerType === e2.MSPOINTER_TYPE_TOUCH) {
          preventDefault(e2);
        }
        _handlePointer(handler, e2);
      }
      function makeDblclick(event) {
        var newEvent = {}, prop, i2;
        for (i2 in event) {
          prop = event[i2];
          newEvent[i2] = prop && prop.bind ? prop.bind(event) : prop;
        }
        event = newEvent;
        newEvent.type = "dblclick";
        newEvent.detail = 2;
        newEvent.isTrusted = false;
        newEvent._simulated = true;
        return newEvent;
      }
      var delay = 200;
      function addDoubleTapListener(obj, handler) {
        obj.addEventListener("dblclick", handler);
        var last = 0, detail;
        function simDblclick(e2) {
          if (e2.detail !== 1) {
            detail = e2.detail;
            return;
          }
          if (e2.pointerType === "mouse" || e2.sourceCapabilities && !e2.sourceCapabilities.firesTouchEvents) {
            return;
          }
          var path = getPropagationPath(e2);
          if (path.some(function(el) {
            return el instanceof HTMLLabelElement && el.attributes.for;
          }) && !path.some(function(el) {
            return el instanceof HTMLInputElement || el instanceof HTMLSelectElement;
          })) {
            return;
          }
          var now = Date.now();
          if (now - last <= delay) {
            detail++;
            if (detail === 2) {
              handler(makeDblclick(e2));
            }
          } else {
            detail = 1;
          }
          last = now;
        }
        obj.addEventListener("click", simDblclick);
        return {
          dblclick: handler,
          simDblclick
        };
      }
      function removeDoubleTapListener(obj, handlers) {
        obj.removeEventListener("dblclick", handlers.dblclick);
        obj.removeEventListener("click", handlers.simDblclick);
      }
      var TRANSFORM = testProp(
        ["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]
      );
      var TRANSITION = testProp(
        ["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]
      );
      var TRANSITION_END = TRANSITION === "webkitTransition" || TRANSITION === "OTransition" ? TRANSITION + "End" : "transitionend";
      function get(id) {
        return typeof id === "string" ? document.getElementById(id) : id;
      }
      function getStyle(el, style2) {
        var value = el.style[style2] || el.currentStyle && el.currentStyle[style2];
        if ((!value || value === "auto") && document.defaultView) {
          var css = document.defaultView.getComputedStyle(el, null);
          value = css ? css[style2] : null;
        }
        return value === "auto" ? null : value;
      }
      function create$1(tagName, className, container) {
        var el = document.createElement(tagName);
        el.className = className || "";
        if (container) {
          container.appendChild(el);
        }
        return el;
      }
      function remove(el) {
        var parent = el.parentNode;
        if (parent) {
          parent.removeChild(el);
        }
      }
      function empty(el) {
        while (el.firstChild) {
          el.removeChild(el.firstChild);
        }
      }
      function toFront(el) {
        var parent = el.parentNode;
        if (parent && parent.lastChild !== el) {
          parent.appendChild(el);
        }
      }
      function toBack(el) {
        var parent = el.parentNode;
        if (parent && parent.firstChild !== el) {
          parent.insertBefore(el, parent.firstChild);
        }
      }
      function hasClass(el, name) {
        if (el.classList !== void 0) {
          return el.classList.contains(name);
        }
        var className = getClass(el);
        return className.length > 0 && new RegExp("(^|\\s)" + name + "(\\s|$)").test(className);
      }
      function addClass(el, name) {
        if (el.classList !== void 0) {
          var classes = splitWords(name);
          for (var i2 = 0, len = classes.length; i2 < len; i2++) {
            el.classList.add(classes[i2]);
          }
        } else if (!hasClass(el, name)) {
          var className = getClass(el);
          setClass(el, (className ? className + " " : "") + name);
        }
      }
      function removeClass(el, name) {
        if (el.classList !== void 0) {
          el.classList.remove(name);
        } else {
          setClass(el, trim2((" " + getClass(el) + " ").replace(" " + name + " ", " ")));
        }
      }
      function setClass(el, name) {
        if (el.className.baseVal === void 0) {
          el.className = name;
        } else {
          el.className.baseVal = name;
        }
      }
      function getClass(el) {
        if (el.correspondingElement) {
          el = el.correspondingElement;
        }
        return el.className.baseVal === void 0 ? el.className : el.className.baseVal;
      }
      function setOpacity(el, value) {
        if ("opacity" in el.style) {
          el.style.opacity = value;
        } else if ("filter" in el.style) {
          _setOpacityIE(el, value);
        }
      }
      function _setOpacityIE(el, value) {
        var filter = false, filterName = "DXImageTransform.Microsoft.Alpha";
        try {
          filter = el.filters.item(filterName);
        } catch (e2) {
          if (value === 1) {
            return;
          }
        }
        value = Math.round(value * 100);
        if (filter) {
          filter.Enabled = value !== 100;
          filter.Opacity = value;
        } else {
          el.style.filter += " progid:" + filterName + "(opacity=" + value + ")";
        }
      }
      function testProp(props) {
        var style2 = document.documentElement.style;
        for (var i2 = 0; i2 < props.length; i2++) {
          if (props[i2] in style2) {
            return props[i2];
          }
        }
        return false;
      }
      function setTransform(el, offset, scale2) {
        var pos = offset || new Point(0, 0);
        el.style[TRANSFORM] = (Browser.ie3d ? "translate(" + pos.x + "px," + pos.y + "px)" : "translate3d(" + pos.x + "px," + pos.y + "px,0)") + (scale2 ? " scale(" + scale2 + ")" : "");
      }
      function setPosition(el, point) {
        el._leaflet_pos = point;
        if (Browser.any3d) {
          setTransform(el, point);
        } else {
          el.style.left = point.x + "px";
          el.style.top = point.y + "px";
        }
      }
      function getPosition(el) {
        return el._leaflet_pos || new Point(0, 0);
      }
      var disableTextSelection;
      var enableTextSelection;
      var _userSelect;
      if ("onselectstart" in document) {
        disableTextSelection = function() {
          on(window, "selectstart", preventDefault);
        };
        enableTextSelection = function() {
          off(window, "selectstart", preventDefault);
        };
      } else {
        var userSelectProperty = testProp(
          ["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]
        );
        disableTextSelection = function() {
          if (userSelectProperty) {
            var style2 = document.documentElement.style;
            _userSelect = style2[userSelectProperty];
            style2[userSelectProperty] = "none";
          }
        };
        enableTextSelection = function() {
          if (userSelectProperty) {
            document.documentElement.style[userSelectProperty] = _userSelect;
            _userSelect = void 0;
          }
        };
      }
      function disableImageDrag() {
        on(window, "dragstart", preventDefault);
      }
      function enableImageDrag() {
        off(window, "dragstart", preventDefault);
      }
      var _outlineElement, _outlineStyle;
      function preventOutline(element) {
        while (element.tabIndex === -1) {
          element = element.parentNode;
        }
        if (!element.style) {
          return;
        }
        restoreOutline();
        _outlineElement = element;
        _outlineStyle = element.style.outlineStyle;
        element.style.outlineStyle = "none";
        on(window, "keydown", restoreOutline);
      }
      function restoreOutline() {
        if (!_outlineElement) {
          return;
        }
        _outlineElement.style.outlineStyle = _outlineStyle;
        _outlineElement = void 0;
        _outlineStyle = void 0;
        off(window, "keydown", restoreOutline);
      }
      function getSizedParentNode(element) {
        do {
          element = element.parentNode;
        } while ((!element.offsetWidth || !element.offsetHeight) && element !== document.body);
        return element;
      }
      function getScale(element) {
        var rect = element.getBoundingClientRect();
        return {
          x: rect.width / element.offsetWidth || 1,
          y: rect.height / element.offsetHeight || 1,
          boundingClientRect: rect
        };
      }
      var DomUtil = {
        __proto__: null,
        TRANSFORM,
        TRANSITION,
        TRANSITION_END,
        get,
        getStyle,
        create: create$1,
        remove,
        empty,
        toFront,
        toBack,
        hasClass,
        addClass,
        removeClass,
        setClass,
        getClass,
        setOpacity,
        testProp,
        setTransform,
        setPosition,
        getPosition,
        get disableTextSelection() {
          return disableTextSelection;
        },
        get enableTextSelection() {
          return enableTextSelection;
        },
        disableImageDrag,
        enableImageDrag,
        preventOutline,
        restoreOutline,
        getSizedParentNode,
        getScale
      };
      function on(obj, types, fn, context) {
        if (types && typeof types === "object") {
          for (var type in types) {
            addOne(obj, type, types[type], fn);
          }
        } else {
          types = splitWords(types);
          for (var i2 = 0, len = types.length; i2 < len; i2++) {
            addOne(obj, types[i2], fn, context);
          }
        }
        return this;
      }
      var eventsKey = "_leaflet_events";
      function off(obj, types, fn, context) {
        if (arguments.length === 1) {
          batchRemove(obj);
          delete obj[eventsKey];
        } else if (types && typeof types === "object") {
          for (var type in types) {
            removeOne(obj, type, types[type], fn);
          }
        } else {
          types = splitWords(types);
          if (arguments.length === 2) {
            batchRemove(obj, function(type2) {
              return indexOf(types, type2) !== -1;
            });
          } else {
            for (var i2 = 0, len = types.length; i2 < len; i2++) {
              removeOne(obj, types[i2], fn, context);
            }
          }
        }
        return this;
      }
      function batchRemove(obj, filterFn) {
        for (var id in obj[eventsKey]) {
          var type = id.split(/\d/)[0];
          if (!filterFn || filterFn(type)) {
            removeOne(obj, type, null, null, id);
          }
        }
      }
      var mouseSubst = {
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        wheel: !("onwheel" in window) && "mousewheel"
      };
      function addOne(obj, type, fn, context) {
        var id = type + stamp(fn) + (context ? "_" + stamp(context) : "");
        if (obj[eventsKey] && obj[eventsKey][id]) {
          return this;
        }
        var handler = function(e2) {
          return fn.call(context || obj, e2 || window.event);
        };
        var originalHandler = handler;
        if (!Browser.touchNative && Browser.pointer && type.indexOf("touch") === 0) {
          handler = addPointerListener(obj, type, handler);
        } else if (Browser.touch && type === "dblclick") {
          handler = addDoubleTapListener(obj, handler);
        } else if ("addEventListener" in obj) {
          if (type === "touchstart" || type === "touchmove" || type === "wheel" || type === "mousewheel") {
            obj.addEventListener(mouseSubst[type] || type, handler, Browser.passiveEvents ? { passive: false } : false);
          } else if (type === "mouseenter" || type === "mouseleave") {
            handler = function(e2) {
              e2 = e2 || window.event;
              if (isExternalTarget(obj, e2)) {
                originalHandler(e2);
              }
            };
            obj.addEventListener(mouseSubst[type], handler, false);
          } else {
            obj.addEventListener(type, originalHandler, false);
          }
        } else {
          obj.attachEvent("on" + type, handler);
        }
        obj[eventsKey] = obj[eventsKey] || {};
        obj[eventsKey][id] = handler;
      }
      function removeOne(obj, type, fn, context, id) {
        id = id || type + stamp(fn) + (context ? "_" + stamp(context) : "");
        var handler = obj[eventsKey] && obj[eventsKey][id];
        if (!handler) {
          return this;
        }
        if (!Browser.touchNative && Browser.pointer && type.indexOf("touch") === 0) {
          removePointerListener(obj, type, handler);
        } else if (Browser.touch && type === "dblclick") {
          removeDoubleTapListener(obj, handler);
        } else if ("removeEventListener" in obj) {
          obj.removeEventListener(mouseSubst[type] || type, handler, false);
        } else {
          obj.detachEvent("on" + type, handler);
        }
        obj[eventsKey][id] = null;
      }
      function stopPropagation(e2) {
        if (e2.stopPropagation) {
          e2.stopPropagation();
        } else if (e2.originalEvent) {
          e2.originalEvent._stopped = true;
        } else {
          e2.cancelBubble = true;
        }
        return this;
      }
      function disableScrollPropagation(el) {
        addOne(el, "wheel", stopPropagation);
        return this;
      }
      function disableClickPropagation(el) {
        on(el, "mousedown touchstart dblclick contextmenu", stopPropagation);
        el["_leaflet_disable_click"] = true;
        return this;
      }
      function preventDefault(e2) {
        if (e2.preventDefault) {
          e2.preventDefault();
        } else {
          e2.returnValue = false;
        }
        return this;
      }
      function stop(e2) {
        preventDefault(e2);
        stopPropagation(e2);
        return this;
      }
      function getPropagationPath(ev) {
        if (ev.composedPath) {
          return ev.composedPath();
        }
        var path = [];
        var el = ev.target;
        while (el) {
          path.push(el);
          el = el.parentNode;
        }
        return path;
      }
      function getMousePosition(e2, container) {
        if (!container) {
          return new Point(e2.clientX, e2.clientY);
        }
        var scale2 = getScale(container), offset = scale2.boundingClientRect;
        return new Point(
          // offset.left/top values are in page scale (like clientX/Y),
          // whereas clientLeft/Top (border width) values are the original values (before CSS scale applies).
          (e2.clientX - offset.left) / scale2.x - container.clientLeft,
          (e2.clientY - offset.top) / scale2.y - container.clientTop
        );
      }
      var wheelPxFactor = Browser.linux && Browser.chrome ? window.devicePixelRatio : Browser.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
      function getWheelDelta(e2) {
        return Browser.edge ? e2.wheelDeltaY / 2 : (
          // Don't trust window-geometry-based delta
          e2.deltaY && e2.deltaMode === 0 ? -e2.deltaY / wheelPxFactor : (
            // Pixels
            e2.deltaY && e2.deltaMode === 1 ? -e2.deltaY * 20 : (
              // Lines
              e2.deltaY && e2.deltaMode === 2 ? -e2.deltaY * 60 : (
                // Pages
                e2.deltaX || e2.deltaZ ? 0 : (
                  // Skip horizontal/depth wheel events
                  e2.wheelDelta ? (e2.wheelDeltaY || e2.wheelDelta) / 2 : (
                    // Legacy IE pixels
                    e2.detail && Math.abs(e2.detail) < 32765 ? -e2.detail * 20 : (
                      // Legacy Moz lines
                      e2.detail ? e2.detail / -32765 * 60 : (
                        // Legacy Moz pages
                        0
                      )
                    )
                  )
                )
              )
            )
          )
        );
      }
      function isExternalTarget(el, e2) {
        var related = e2.relatedTarget;
        if (!related) {
          return true;
        }
        try {
          while (related && related !== el) {
            related = related.parentNode;
          }
        } catch (err) {
          return false;
        }
        return related !== el;
      }
      var DomEvent = {
        __proto__: null,
        on,
        off,
        stopPropagation,
        disableScrollPropagation,
        disableClickPropagation,
        preventDefault,
        stop,
        getPropagationPath,
        getMousePosition,
        getWheelDelta,
        isExternalTarget,
        addListener: on,
        removeListener: off
      };
      var PosAnimation = Evented.extend({
        // @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
        // Run an animation of a given element to a new position, optionally setting
        // duration in seconds (`0.25` by default) and easing linearity factor (3rd
        // argument of the [cubic bezier curve](https://cubic-bezier.com/#0,0,.5,1),
        // `0.5` by default).
        run: function(el, newPos, duration, easeLinearity) {
          this.stop();
          this._el = el;
          this._inProgress = true;
          this._duration = duration || 0.25;
          this._easeOutPower = 1 / Math.max(easeLinearity || 0.5, 0.2);
          this._startPos = getPosition(el);
          this._offset = newPos.subtract(this._startPos);
          this._startTime = +/* @__PURE__ */ new Date();
          this.fire("start");
          this._animate();
        },
        // @method stop()
        // Stops the animation (if currently running).
        stop: function() {
          if (!this._inProgress) {
            return;
          }
          this._step(true);
          this._complete();
        },
        _animate: function() {
          this._animId = requestAnimFrame(this._animate, this);
          this._step();
        },
        _step: function(round) {
          var elapsed = +/* @__PURE__ */ new Date() - this._startTime, duration = this._duration * 1e3;
          if (elapsed < duration) {
            this._runFrame(this._easeOut(elapsed / duration), round);
          } else {
            this._runFrame(1);
            this._complete();
          }
        },
        _runFrame: function(progress, round) {
          var pos = this._startPos.add(this._offset.multiplyBy(progress));
          if (round) {
            pos._round();
          }
          setPosition(this._el, pos);
          this.fire("step");
        },
        _complete: function() {
          cancelAnimFrame(this._animId);
          this._inProgress = false;
          this.fire("end");
        },
        _easeOut: function(t2) {
          return 1 - Math.pow(1 - t2, this._easeOutPower);
        }
      });
      var Map = Evented.extend({
        options: {
          // @section Map State Options
          // @option crs: CRS = L.CRS.EPSG3857
          // The [Coordinate Reference System](#crs) to use. Don't change this if you're not
          // sure what it means.
          crs: EPSG3857,
          // @option center: LatLng = undefined
          // Initial geographic center of the map
          center: void 0,
          // @option zoom: Number = undefined
          // Initial map zoom level
          zoom: void 0,
          // @option minZoom: Number = *
          // Minimum zoom level of the map.
          // If not specified and at least one `GridLayer` or `TileLayer` is in the map,
          // the lowest of their `minZoom` options will be used instead.
          minZoom: void 0,
          // @option maxZoom: Number = *
          // Maximum zoom level of the map.
          // If not specified and at least one `GridLayer` or `TileLayer` is in the map,
          // the highest of their `maxZoom` options will be used instead.
          maxZoom: void 0,
          // @option layers: Layer[] = []
          // Array of layers that will be added to the map initially
          layers: [],
          // @option maxBounds: LatLngBounds = null
          // When this option is set, the map restricts the view to the given
          // geographical bounds, bouncing the user back if the user tries to pan
          // outside the view. To set the restriction dynamically, use
          // [`setMaxBounds`](#map-setmaxbounds) method.
          maxBounds: void 0,
          // @option renderer: Renderer = *
          // The default method for drawing vector layers on the map. `L.SVG`
          // or `L.Canvas` by default depending on browser support.
          renderer: void 0,
          // @section Animation Options
          // @option zoomAnimation: Boolean = true
          // Whether the map zoom animation is enabled. By default it's enabled
          // in all browsers that support CSS3 Transitions except Android.
          zoomAnimation: true,
          // @option zoomAnimationThreshold: Number = 4
          // Won't animate zoom if the zoom difference exceeds this value.
          zoomAnimationThreshold: 4,
          // @option fadeAnimation: Boolean = true
          // Whether the tile fade animation is enabled. By default it's enabled
          // in all browsers that support CSS3 Transitions except Android.
          fadeAnimation: true,
          // @option markerZoomAnimation: Boolean = true
          // Whether markers animate their zoom with the zoom animation, if disabled
          // they will disappear for the length of the animation. By default it's
          // enabled in all browsers that support CSS3 Transitions except Android.
          markerZoomAnimation: true,
          // @option transform3DLimit: Number = 2^23
          // Defines the maximum size of a CSS translation transform. The default
          // value should not be changed unless a web browser positions layers in
          // the wrong place after doing a large `panBy`.
          transform3DLimit: 8388608,
          // Precision limit of a 32-bit float
          // @section Interaction Options
          // @option zoomSnap: Number = 1
          // Forces the map's zoom level to always be a multiple of this, particularly
          // right after a [`fitBounds()`](#map-fitbounds) or a pinch-zoom.
          // By default, the zoom level snaps to the nearest integer; lower values
          // (e.g. `0.5` or `0.1`) allow for greater granularity. A value of `0`
          // means the zoom level will not be snapped after `fitBounds` or a pinch-zoom.
          zoomSnap: 1,
          // @option zoomDelta: Number = 1
          // Controls how much the map's zoom level will change after a
          // [`zoomIn()`](#map-zoomin), [`zoomOut()`](#map-zoomout), pressing `+`
          // or `-` on the keyboard, or using the [zoom controls](#control-zoom).
          // Values smaller than `1` (e.g. `0.5`) allow for greater granularity.
          zoomDelta: 1,
          // @option trackResize: Boolean = true
          // Whether the map automatically handles browser window resize to update itself.
          trackResize: true
        },
        initialize: function(id, options) {
          options = setOptions(this, options);
          this._handlers = [];
          this._layers = {};
          this._zoomBoundLayers = {};
          this._sizeChanged = true;
          this._initContainer(id);
          this._initLayout();
          this._onResize = bind(this._onResize, this);
          this._initEvents();
          if (options.maxBounds) {
            this.setMaxBounds(options.maxBounds);
          }
          if (options.zoom !== void 0) {
            this._zoom = this._limitZoom(options.zoom);
          }
          if (options.center && options.zoom !== void 0) {
            this.setView(toLatLng(options.center), options.zoom, { reset: true });
          }
          this.callInitHooks();
          this._zoomAnimated = TRANSITION && Browser.any3d && !Browser.mobileOpera && this.options.zoomAnimation;
          if (this._zoomAnimated) {
            this._createAnimProxy();
            on(this._proxy, TRANSITION_END, this._catchTransitionEnd, this);
          }
          this._addLayers(this.options.layers);
        },
        // @section Methods for modifying map state
        // @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
        // Sets the view of the map (geographical center and zoom) with the given
        // animation options.
        setView: function(center, zoom2, options) {
          zoom2 = zoom2 === void 0 ? this._zoom : this._limitZoom(zoom2);
          center = this._limitCenter(toLatLng(center), zoom2, this.options.maxBounds);
          options = options || {};
          this._stop();
          if (this._loaded && !options.reset && options !== true) {
            if (options.animate !== void 0) {
              options.zoom = extend2({ animate: options.animate }, options.zoom);
              options.pan = extend2({ animate: options.animate, duration: options.duration }, options.pan);
            }
            var moved = this._zoom !== zoom2 ? this._tryAnimatedZoom && this._tryAnimatedZoom(center, zoom2, options.zoom) : this._tryAnimatedPan(center, options.pan);
            if (moved) {
              clearTimeout(this._sizeTimer);
              return this;
            }
          }
          this._resetView(center, zoom2, options.pan && options.pan.noMoveStart);
          return this;
        },
        // @method setZoom(zoom: Number, options?: Zoom/pan options): this
        // Sets the zoom of the map.
        setZoom: function(zoom2, options) {
          if (!this._loaded) {
            this._zoom = zoom2;
            return this;
          }
          return this.setView(this.getCenter(), zoom2, { zoom: options });
        },
        // @method zoomIn(delta?: Number, options?: Zoom options): this
        // Increases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
        zoomIn: function(delta, options) {
          delta = delta || (Browser.any3d ? this.options.zoomDelta : 1);
          return this.setZoom(this._zoom + delta, options);
        },
        // @method zoomOut(delta?: Number, options?: Zoom options): this
        // Decreases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
        zoomOut: function(delta, options) {
          delta = delta || (Browser.any3d ? this.options.zoomDelta : 1);
          return this.setZoom(this._zoom - delta, options);
        },
        // @method setZoomAround(latlng: LatLng, zoom: Number, options: Zoom options): this
        // Zooms the map while keeping a specified geographical point on the map
        // stationary (e.g. used internally for scroll zoom and double-click zoom).
        // @alternative
        // @method setZoomAround(offset: Point, zoom: Number, options: Zoom options): this
        // Zooms the map while keeping a specified pixel on the map (relative to the top-left corner) stationary.
        setZoomAround: function(latlng, zoom2, options) {
          var scale2 = this.getZoomScale(zoom2), viewHalf = this.getSize().divideBy(2), containerPoint = latlng instanceof Point ? latlng : this.latLngToContainerPoint(latlng), centerOffset = containerPoint.subtract(viewHalf).multiplyBy(1 - 1 / scale2), newCenter = this.containerPointToLatLng(viewHalf.add(centerOffset));
          return this.setView(newCenter, zoom2, { zoom: options });
        },
        _getBoundsCenterZoom: function(bounds, options) {
          options = options || {};
          bounds = bounds.getBounds ? bounds.getBounds() : toLatLngBounds(bounds);
          var paddingTL = toPoint(options.paddingTopLeft || options.padding || [0, 0]), paddingBR = toPoint(options.paddingBottomRight || options.padding || [0, 0]), zoom2 = this.getBoundsZoom(bounds, false, paddingTL.add(paddingBR));
          zoom2 = typeof options.maxZoom === "number" ? Math.min(options.maxZoom, zoom2) : zoom2;
          if (zoom2 === Infinity) {
            return {
              center: bounds.getCenter(),
              zoom: zoom2
            };
          }
          var paddingOffset = paddingBR.subtract(paddingTL).divideBy(2), swPoint = this.project(bounds.getSouthWest(), zoom2), nePoint = this.project(bounds.getNorthEast(), zoom2), center = this.unproject(swPoint.add(nePoint).divideBy(2).add(paddingOffset), zoom2);
          return {
            center,
            zoom: zoom2
          };
        },
        // @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
        // Sets a map view that contains the given geographical bounds with the
        // maximum zoom level possible.
        fitBounds: function(bounds, options) {
          bounds = toLatLngBounds(bounds);
          if (!bounds.isValid()) {
            throw new Error("Bounds are not valid.");
          }
          var target = this._getBoundsCenterZoom(bounds, options);
          return this.setView(target.center, target.zoom, options);
        },
        // @method fitWorld(options?: fitBounds options): this
        // Sets a map view that mostly contains the whole world with the maximum
        // zoom level possible.
        fitWorld: function(options) {
          return this.fitBounds([[-90, -180], [90, 180]], options);
        },
        // @method panTo(latlng: LatLng, options?: Pan options): this
        // Pans the map to a given center.
        panTo: function(center, options) {
          return this.setView(center, this._zoom, { pan: options });
        },
        // @method panBy(offset: Point, options?: Pan options): this
        // Pans the map by a given number of pixels (animated).
        panBy: function(offset, options) {
          offset = toPoint(offset).round();
          options = options || {};
          if (!offset.x && !offset.y) {
            return this.fire("moveend");
          }
          if (options.animate !== true && !this.getSize().contains(offset)) {
            this._resetView(this.unproject(this.project(this.getCenter()).add(offset)), this.getZoom());
            return this;
          }
          if (!this._panAnim) {
            this._panAnim = new PosAnimation();
            this._panAnim.on({
              "step": this._onPanTransitionStep,
              "end": this._onPanTransitionEnd
            }, this);
          }
          if (!options.noMoveStart) {
            this.fire("movestart");
          }
          if (options.animate !== false) {
            addClass(this._mapPane, "leaflet-pan-anim");
            var newPos = this._getMapPanePos().subtract(offset).round();
            this._panAnim.run(this._mapPane, newPos, options.duration || 0.25, options.easeLinearity);
          } else {
            this._rawPanBy(offset);
            this.fire("move").fire("moveend");
          }
          return this;
        },
        // @method flyTo(latlng: LatLng, zoom?: Number, options?: Zoom/pan options): this
        // Sets the view of the map (geographical center and zoom) performing a smooth
        // pan-zoom animation.
        flyTo: function(targetCenter, targetZoom, options) {
          options = options || {};
          if (options.animate === false || !Browser.any3d) {
            return this.setView(targetCenter, targetZoom, options);
          }
          this._stop();
          var from2 = this.project(this.getCenter()), to = this.project(targetCenter), size = this.getSize(), startZoom = this._zoom;
          targetCenter = toLatLng(targetCenter);
          targetZoom = targetZoom === void 0 ? startZoom : targetZoom;
          var w0 = Math.max(size.x, size.y), w1 = w0 * this.getZoomScale(startZoom, targetZoom), u1 = to.distanceTo(from2) || 1, rho = 1.42, rho2 = rho * rho;
          function r2(i2) {
            var s1 = i2 ? -1 : 1, s2 = i2 ? w1 : w0, t1 = w1 * w1 - w0 * w0 + s1 * rho2 * rho2 * u1 * u1, b1 = 2 * s2 * rho2 * u1, b2 = t1 / b1, sq = Math.sqrt(b2 * b2 + 1) - b2;
            var log = sq < 1e-9 ? -18 : Math.log(sq);
            return log;
          }
          function sinh(n2) {
            return (Math.exp(n2) - Math.exp(-n2)) / 2;
          }
          function cosh(n2) {
            return (Math.exp(n2) + Math.exp(-n2)) / 2;
          }
          function tanh(n2) {
            return sinh(n2) / cosh(n2);
          }
          var r0 = r2(0);
          function w2(s2) {
            return w0 * (cosh(r0) / cosh(r0 + rho * s2));
          }
          function u2(s2) {
            return w0 * (cosh(r0) * tanh(r0 + rho * s2) - sinh(r0)) / rho2;
          }
          function easeOut(t2) {
            return 1 - Math.pow(1 - t2, 1.5);
          }
          var start = Date.now(), S = (r2(1) - r0) / rho, duration = options.duration ? 1e3 * options.duration : 1e3 * S * 0.8;
          function frame() {
            var t2 = (Date.now() - start) / duration, s2 = easeOut(t2) * S;
            if (t2 <= 1) {
              this._flyToFrame = requestAnimFrame(frame, this);
              this._move(
                this.unproject(from2.add(to.subtract(from2).multiplyBy(u2(s2) / u1)), startZoom),
                this.getScaleZoom(w0 / w2(s2), startZoom),
                { flyTo: true }
              );
            } else {
              this._move(targetCenter, targetZoom)._moveEnd(true);
            }
          }
          this._moveStart(true, options.noMoveStart);
          frame.call(this);
          return this;
        },
        // @method flyToBounds(bounds: LatLngBounds, options?: fitBounds options): this
        // Sets the view of the map with a smooth animation like [`flyTo`](#map-flyto),
        // but takes a bounds parameter like [`fitBounds`](#map-fitbounds).
        flyToBounds: function(bounds, options) {
          var target = this._getBoundsCenterZoom(bounds, options);
          return this.flyTo(target.center, target.zoom, options);
        },
        // @method setMaxBounds(bounds: LatLngBounds): this
        // Restricts the map view to the given bounds (see the [maxBounds](#map-maxbounds) option).
        setMaxBounds: function(bounds) {
          bounds = toLatLngBounds(bounds);
          if (this.listens("moveend", this._panInsideMaxBounds)) {
            this.off("moveend", this._panInsideMaxBounds);
          }
          if (!bounds.isValid()) {
            this.options.maxBounds = null;
            return this;
          }
          this.options.maxBounds = bounds;
          if (this._loaded) {
            this._panInsideMaxBounds();
          }
          return this.on("moveend", this._panInsideMaxBounds);
        },
        // @method setMinZoom(zoom: Number): this
        // Sets the lower limit for the available zoom levels (see the [minZoom](#map-minzoom) option).
        setMinZoom: function(zoom2) {
          var oldZoom = this.options.minZoom;
          this.options.minZoom = zoom2;
          if (this._loaded && oldZoom !== zoom2) {
            this.fire("zoomlevelschange");
            if (this.getZoom() < this.options.minZoom) {
              return this.setZoom(zoom2);
            }
          }
          return this;
        },
        // @method setMaxZoom(zoom: Number): this
        // Sets the upper limit for the available zoom levels (see the [maxZoom](#map-maxzoom) option).
        setMaxZoom: function(zoom2) {
          var oldZoom = this.options.maxZoom;
          this.options.maxZoom = zoom2;
          if (this._loaded && oldZoom !== zoom2) {
            this.fire("zoomlevelschange");
            if (this.getZoom() > this.options.maxZoom) {
              return this.setZoom(zoom2);
            }
          }
          return this;
        },
        // @method panInsideBounds(bounds: LatLngBounds, options?: Pan options): this
        // Pans the map to the closest view that would lie inside the given bounds (if it's not already), controlling the animation using the options specific, if any.
        panInsideBounds: function(bounds, options) {
          this._enforcingBounds = true;
          var center = this.getCenter(), newCenter = this._limitCenter(center, this._zoom, toLatLngBounds(bounds));
          if (!center.equals(newCenter)) {
            this.panTo(newCenter, options);
          }
          this._enforcingBounds = false;
          return this;
        },
        // @method panInside(latlng: LatLng, options?: padding options): this
        // Pans the map the minimum amount to make the `latlng` visible. Use
        // padding options to fit the display to more restricted bounds.
        // If `latlng` is already within the (optionally padded) display bounds,
        // the map will not be panned.
        panInside: function(latlng, options) {
          options = options || {};
          var paddingTL = toPoint(options.paddingTopLeft || options.padding || [0, 0]), paddingBR = toPoint(options.paddingBottomRight || options.padding || [0, 0]), pixelCenter = this.project(this.getCenter()), pixelPoint = this.project(latlng), pixelBounds = this.getPixelBounds(), paddedBounds = toBounds([pixelBounds.min.add(paddingTL), pixelBounds.max.subtract(paddingBR)]), paddedSize = paddedBounds.getSize();
          if (!paddedBounds.contains(pixelPoint)) {
            this._enforcingBounds = true;
            var centerOffset = pixelPoint.subtract(paddedBounds.getCenter());
            var offset = paddedBounds.extend(pixelPoint).getSize().subtract(paddedSize);
            pixelCenter.x += centerOffset.x < 0 ? -offset.x : offset.x;
            pixelCenter.y += centerOffset.y < 0 ? -offset.y : offset.y;
            this.panTo(this.unproject(pixelCenter), options);
            this._enforcingBounds = false;
          }
          return this;
        },
        // @method invalidateSize(options: Zoom/pan options): this
        // Checks if the map container size changed and updates the map if so —
        // call it after you've changed the map size dynamically, also animating
        // pan by default. If `options.pan` is `false`, panning will not occur.
        // If `options.debounceMoveend` is `true`, it will delay `moveend` event so
        // that it doesn't happen often even if the method is called many
        // times in a row.
        // @alternative
        // @method invalidateSize(animate: Boolean): this
        // Checks if the map container size changed and updates the map if so —
        // call it after you've changed the map size dynamically, also animating
        // pan by default.
        invalidateSize: function(options) {
          if (!this._loaded) {
            return this;
          }
          options = extend2({
            animate: false,
            pan: true
          }, options === true ? { animate: true } : options);
          var oldSize = this.getSize();
          this._sizeChanged = true;
          this._lastCenter = null;
          var newSize = this.getSize(), oldCenter = oldSize.divideBy(2).round(), newCenter = newSize.divideBy(2).round(), offset = oldCenter.subtract(newCenter);
          if (!offset.x && !offset.y) {
            return this;
          }
          if (options.animate && options.pan) {
            this.panBy(offset);
          } else {
            if (options.pan) {
              this._rawPanBy(offset);
            }
            this.fire("move");
            if (options.debounceMoveend) {
              clearTimeout(this._sizeTimer);
              this._sizeTimer = setTimeout(bind(this.fire, this, "moveend"), 200);
            } else {
              this.fire("moveend");
            }
          }
          return this.fire("resize", {
            oldSize,
            newSize
          });
        },
        // @section Methods for modifying map state
        // @method stop(): this
        // Stops the currently running `panTo` or `flyTo` animation, if any.
        stop: function() {
          this.setZoom(this._limitZoom(this._zoom));
          if (!this.options.zoomSnap) {
            this.fire("viewreset");
          }
          return this._stop();
        },
        // @section Geolocation methods
        // @method locate(options?: Locate options): this
        // Tries to locate the user using the Geolocation API, firing a [`locationfound`](#map-locationfound)
        // event with location data on success or a [`locationerror`](#map-locationerror) event on failure,
        // and optionally sets the map view to the user's location with respect to
        // detection accuracy (or to the world view if geolocation failed).
        // Note that, if your page doesn't use HTTPS, this method will fail in
        // modern browsers ([Chrome 50 and newer](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins))
        // See `Locate options` for more details.
        locate: function(options) {
          options = this._locateOptions = extend2({
            timeout: 1e4,
            watch: false
            // setView: false
            // maxZoom: <Number>
            // maximumAge: 0
            // enableHighAccuracy: false
          }, options);
          if (!("geolocation" in navigator)) {
            this._handleGeolocationError({
              code: 0,
              message: "Geolocation not supported."
            });
            return this;
          }
          var onResponse = bind(this._handleGeolocationResponse, this), onError = bind(this._handleGeolocationError, this);
          if (options.watch) {
            this._locationWatchId = navigator.geolocation.watchPosition(onResponse, onError, options);
          } else {
            navigator.geolocation.getCurrentPosition(onResponse, onError, options);
          }
          return this;
        },
        // @method stopLocate(): this
        // Stops watching location previously initiated by `map.locate({watch: true})`
        // and aborts resetting the map view if map.locate was called with
        // `{setView: true}`.
        stopLocate: function() {
          if (navigator.geolocation && navigator.geolocation.clearWatch) {
            navigator.geolocation.clearWatch(this._locationWatchId);
          }
          if (this._locateOptions) {
            this._locateOptions.setView = false;
          }
          return this;
        },
        _handleGeolocationError: function(error) {
          if (!this._container._leaflet_id) {
            return;
          }
          var c2 = error.code, message = error.message || (c2 === 1 ? "permission denied" : c2 === 2 ? "position unavailable" : "timeout");
          if (this._locateOptions.setView && !this._loaded) {
            this.fitWorld();
          }
          this.fire("locationerror", {
            code: c2,
            message: "Geolocation error: " + message + "."
          });
        },
        _handleGeolocationResponse: function(pos) {
          if (!this._container._leaflet_id) {
            return;
          }
          var lat = pos.coords.latitude, lng = pos.coords.longitude, latlng = new LatLng(lat, lng), bounds = latlng.toBounds(pos.coords.accuracy * 2), options = this._locateOptions;
          if (options.setView) {
            var zoom2 = this.getBoundsZoom(bounds);
            this.setView(latlng, options.maxZoom ? Math.min(zoom2, options.maxZoom) : zoom2);
          }
          var data = {
            latlng,
            bounds,
            timestamp: pos.timestamp
          };
          for (var i2 in pos.coords) {
            if (typeof pos.coords[i2] === "number") {
              data[i2] = pos.coords[i2];
            }
          }
          this.fire("locationfound", data);
        },
        // TODO Appropriate docs section?
        // @section Other Methods
        // @method addHandler(name: String, HandlerClass: Function): this
        // Adds a new `Handler` to the map, given its name and constructor function.
        addHandler: function(name, HandlerClass) {
          if (!HandlerClass) {
            return this;
          }
          var handler = this[name] = new HandlerClass(this);
          this._handlers.push(handler);
          if (this.options[name]) {
            handler.enable();
          }
          return this;
        },
        // @method remove(): this
        // Destroys the map and clears all related event listeners.
        remove: function() {
          this._initEvents(true);
          if (this.options.maxBounds) {
            this.off("moveend", this._panInsideMaxBounds);
          }
          if (this._containerId !== this._container._leaflet_id) {
            throw new Error("Map container is being reused by another instance");
          }
          try {
            delete this._container._leaflet_id;
            delete this._containerId;
          } catch (e2) {
            this._container._leaflet_id = void 0;
            this._containerId = void 0;
          }
          if (this._locationWatchId !== void 0) {
            this.stopLocate();
          }
          this._stop();
          remove(this._mapPane);
          if (this._clearControlPos) {
            this._clearControlPos();
          }
          if (this._resizeRequest) {
            cancelAnimFrame(this._resizeRequest);
            this._resizeRequest = null;
          }
          this._clearHandlers();
          if (this._loaded) {
            this.fire("unload");
          }
          var i2;
          for (i2 in this._layers) {
            this._layers[i2].remove();
          }
          for (i2 in this._panes) {
            remove(this._panes[i2]);
          }
          this._layers = [];
          this._panes = [];
          delete this._mapPane;
          delete this._renderer;
          return this;
        },
        // @section Other Methods
        // @method createPane(name: String, container?: HTMLElement): HTMLElement
        // Creates a new [map pane](#map-pane) with the given name if it doesn't exist already,
        // then returns it. The pane is created as a child of `container`, or
        // as a child of the main map pane if not set.
        createPane: function(name, container) {
          var className = "leaflet-pane" + (name ? " leaflet-" + name.replace("Pane", "") + "-pane" : ""), pane = create$1("div", className, container || this._mapPane);
          if (name) {
            this._panes[name] = pane;
          }
          return pane;
        },
        // @section Methods for Getting Map State
        // @method getCenter(): LatLng
        // Returns the geographical center of the map view
        getCenter: function() {
          this._checkIfLoaded();
          if (this._lastCenter && !this._moved()) {
            return this._lastCenter.clone();
          }
          return this.layerPointToLatLng(this._getCenterLayerPoint());
        },
        // @method getZoom(): Number
        // Returns the current zoom level of the map view
        getZoom: function() {
          return this._zoom;
        },
        // @method getBounds(): LatLngBounds
        // Returns the geographical bounds visible in the current map view
        getBounds: function() {
          var bounds = this.getPixelBounds(), sw = this.unproject(bounds.getBottomLeft()), ne2 = this.unproject(bounds.getTopRight());
          return new LatLngBounds(sw, ne2);
        },
        // @method getMinZoom(): Number
        // Returns the minimum zoom level of the map (if set in the `minZoom` option of the map or of any layers), or `0` by default.
        getMinZoom: function() {
          return this.options.minZoom === void 0 ? this._layersMinZoom || 0 : this.options.minZoom;
        },
        // @method getMaxZoom(): Number
        // Returns the maximum zoom level of the map (if set in the `maxZoom` option of the map or of any layers).
        getMaxZoom: function() {
          return this.options.maxZoom === void 0 ? this._layersMaxZoom === void 0 ? Infinity : this._layersMaxZoom : this.options.maxZoom;
        },
        // @method getBoundsZoom(bounds: LatLngBounds, inside?: Boolean, padding?: Point): Number
        // Returns the maximum zoom level on which the given bounds fit to the map
        // view in its entirety. If `inside` (optional) is set to `true`, the method
        // instead returns the minimum zoom level on which the map view fits into
        // the given bounds in its entirety.
        getBoundsZoom: function(bounds, inside, padding) {
          bounds = toLatLngBounds(bounds);
          padding = toPoint(padding || [0, 0]);
          var zoom2 = this.getZoom() || 0, min = this.getMinZoom(), max = this.getMaxZoom(), nw = bounds.getNorthWest(), se2 = bounds.getSouthEast(), size = this.getSize().subtract(padding), boundsSize = toBounds(this.project(se2, zoom2), this.project(nw, zoom2)).getSize(), snap = Browser.any3d ? this.options.zoomSnap : 1, scalex = size.x / boundsSize.x, scaley = size.y / boundsSize.y, scale2 = inside ? Math.max(scalex, scaley) : Math.min(scalex, scaley);
          zoom2 = this.getScaleZoom(scale2, zoom2);
          if (snap) {
            zoom2 = Math.round(zoom2 / (snap / 100)) * (snap / 100);
            zoom2 = inside ? Math.ceil(zoom2 / snap) * snap : Math.floor(zoom2 / snap) * snap;
          }
          return Math.max(min, Math.min(max, zoom2));
        },
        // @method getSize(): Point
        // Returns the current size of the map container (in pixels).
        getSize: function() {
          if (!this._size || this._sizeChanged) {
            this._size = new Point(
              this._container.clientWidth || 0,
              this._container.clientHeight || 0
            );
            this._sizeChanged = false;
          }
          return this._size.clone();
        },
        // @method getPixelBounds(): Bounds
        // Returns the bounds of the current map view in projected pixel
        // coordinates (sometimes useful in layer and overlay implementations).
        getPixelBounds: function(center, zoom2) {
          var topLeftPoint = this._getTopLeftPoint(center, zoom2);
          return new Bounds(topLeftPoint, topLeftPoint.add(this.getSize()));
        },
        // TODO: Check semantics - isn't the pixel origin the 0,0 coord relative to
        // the map pane? "left point of the map layer" can be confusing, specially
        // since there can be negative offsets.
        // @method getPixelOrigin(): Point
        // Returns the projected pixel coordinates of the top left point of
        // the map layer (useful in custom layer and overlay implementations).
        getPixelOrigin: function() {
          this._checkIfLoaded();
          return this._pixelOrigin;
        },
        // @method getPixelWorldBounds(zoom?: Number): Bounds
        // Returns the world's bounds in pixel coordinates for zoom level `zoom`.
        // If `zoom` is omitted, the map's current zoom level is used.
        getPixelWorldBounds: function(zoom2) {
          return this.options.crs.getProjectedBounds(zoom2 === void 0 ? this.getZoom() : zoom2);
        },
        // @section Other Methods
        // @method getPane(pane: String|HTMLElement): HTMLElement
        // Returns a [map pane](#map-pane), given its name or its HTML element (its identity).
        getPane: function(pane) {
          return typeof pane === "string" ? this._panes[pane] : pane;
        },
        // @method getPanes(): Object
        // Returns a plain object containing the names of all [panes](#map-pane) as keys and
        // the panes as values.
        getPanes: function() {
          return this._panes;
        },
        // @method getContainer: HTMLElement
        // Returns the HTML element that contains the map.
        getContainer: function() {
          return this._container;
        },
        // @section Conversion Methods
        // @method getZoomScale(toZoom: Number, fromZoom: Number): Number
        // Returns the scale factor to be applied to a map transition from zoom level
        // `fromZoom` to `toZoom`. Used internally to help with zoom animations.
        getZoomScale: function(toZoom, fromZoom) {
          var crs = this.options.crs;
          fromZoom = fromZoom === void 0 ? this._zoom : fromZoom;
          return crs.scale(toZoom) / crs.scale(fromZoom);
        },
        // @method getScaleZoom(scale: Number, fromZoom: Number): Number
        // Returns the zoom level that the map would end up at, if it is at `fromZoom`
        // level and everything is scaled by a factor of `scale`. Inverse of
        // [`getZoomScale`](#map-getZoomScale).
        getScaleZoom: function(scale2, fromZoom) {
          var crs = this.options.crs;
          fromZoom = fromZoom === void 0 ? this._zoom : fromZoom;
          var zoom2 = crs.zoom(scale2 * crs.scale(fromZoom));
          return isNaN(zoom2) ? Infinity : zoom2;
        },
        // @method project(latlng: LatLng, zoom: Number): Point
        // Projects a geographical coordinate `LatLng` according to the projection
        // of the map's CRS, then scales it according to `zoom` and the CRS's
        // `Transformation`. The result is pixel coordinate relative to
        // the CRS origin.
        project: function(latlng, zoom2) {
          zoom2 = zoom2 === void 0 ? this._zoom : zoom2;
          return this.options.crs.latLngToPoint(toLatLng(latlng), zoom2);
        },
        // @method unproject(point: Point, zoom: Number): LatLng
        // Inverse of [`project`](#map-project).
        unproject: function(point, zoom2) {
          zoom2 = zoom2 === void 0 ? this._zoom : zoom2;
          return this.options.crs.pointToLatLng(toPoint(point), zoom2);
        },
        // @method layerPointToLatLng(point: Point): LatLng
        // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
        // returns the corresponding geographical coordinate (for the current zoom level).
        layerPointToLatLng: function(point) {
          var projectedPoint = toPoint(point).add(this.getPixelOrigin());
          return this.unproject(projectedPoint);
        },
        // @method latLngToLayerPoint(latlng: LatLng): Point
        // Given a geographical coordinate, returns the corresponding pixel coordinate
        // relative to the [origin pixel](#map-getpixelorigin).
        latLngToLayerPoint: function(latlng) {
          var projectedPoint = this.project(toLatLng(latlng))._round();
          return projectedPoint._subtract(this.getPixelOrigin());
        },
        // @method wrapLatLng(latlng: LatLng): LatLng
        // Returns a `LatLng` where `lat` and `lng` has been wrapped according to the
        // map's CRS's `wrapLat` and `wrapLng` properties, if they are outside the
        // CRS's bounds.
        // By default this means longitude is wrapped around the dateline so its
        // value is between -180 and +180 degrees.
        wrapLatLng: function(latlng) {
          return this.options.crs.wrapLatLng(toLatLng(latlng));
        },
        // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
        // Returns a `LatLngBounds` with the same size as the given one, ensuring that
        // its center is within the CRS's bounds.
        // By default this means the center longitude is wrapped around the dateline so its
        // value is between -180 and +180 degrees, and the majority of the bounds
        // overlaps the CRS's bounds.
        wrapLatLngBounds: function(latlng) {
          return this.options.crs.wrapLatLngBounds(toLatLngBounds(latlng));
        },
        // @method distance(latlng1: LatLng, latlng2: LatLng): Number
        // Returns the distance between two geographical coordinates according to
        // the map's CRS. By default this measures distance in meters.
        distance: function(latlng1, latlng2) {
          return this.options.crs.distance(toLatLng(latlng1), toLatLng(latlng2));
        },
        // @method containerPointToLayerPoint(point: Point): Point
        // Given a pixel coordinate relative to the map container, returns the corresponding
        // pixel coordinate relative to the [origin pixel](#map-getpixelorigin).
        containerPointToLayerPoint: function(point) {
          return toPoint(point).subtract(this._getMapPanePos());
        },
        // @method layerPointToContainerPoint(point: Point): Point
        // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
        // returns the corresponding pixel coordinate relative to the map container.
        layerPointToContainerPoint: function(point) {
          return toPoint(point).add(this._getMapPanePos());
        },
        // @method containerPointToLatLng(point: Point): LatLng
        // Given a pixel coordinate relative to the map container, returns
        // the corresponding geographical coordinate (for the current zoom level).
        containerPointToLatLng: function(point) {
          var layerPoint = this.containerPointToLayerPoint(toPoint(point));
          return this.layerPointToLatLng(layerPoint);
        },
        // @method latLngToContainerPoint(latlng: LatLng): Point
        // Given a geographical coordinate, returns the corresponding pixel coordinate
        // relative to the map container.
        latLngToContainerPoint: function(latlng) {
          return this.layerPointToContainerPoint(this.latLngToLayerPoint(toLatLng(latlng)));
        },
        // @method mouseEventToContainerPoint(ev: MouseEvent): Point
        // Given a MouseEvent object, returns the pixel coordinate relative to the
        // map container where the event took place.
        mouseEventToContainerPoint: function(e2) {
          return getMousePosition(e2, this._container);
        },
        // @method mouseEventToLayerPoint(ev: MouseEvent): Point
        // Given a MouseEvent object, returns the pixel coordinate relative to
        // the [origin pixel](#map-getpixelorigin) where the event took place.
        mouseEventToLayerPoint: function(e2) {
          return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e2));
        },
        // @method mouseEventToLatLng(ev: MouseEvent): LatLng
        // Given a MouseEvent object, returns geographical coordinate where the
        // event took place.
        mouseEventToLatLng: function(e2) {
          return this.layerPointToLatLng(this.mouseEventToLayerPoint(e2));
        },
        // map initialization methods
        _initContainer: function(id) {
          var container = this._container = get(id);
          if (!container) {
            throw new Error("Map container not found.");
          } else if (container._leaflet_id) {
            throw new Error("Map container is already initialized.");
          }
          on(container, "scroll", this._onScroll, this);
          this._containerId = stamp(container);
        },
        _initLayout: function() {
          var container = this._container;
          this._fadeAnimated = this.options.fadeAnimation && Browser.any3d;
          addClass(container, "leaflet-container" + (Browser.touch ? " leaflet-touch" : "") + (Browser.retina ? " leaflet-retina" : "") + (Browser.ielt9 ? " leaflet-oldie" : "") + (Browser.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
          var position2 = getStyle(container, "position");
          if (position2 !== "absolute" && position2 !== "relative" && position2 !== "fixed" && position2 !== "sticky") {
            container.style.position = "relative";
          }
          this._initPanes();
          if (this._initControlPos) {
            this._initControlPos();
          }
        },
        _initPanes: function() {
          var panes = this._panes = {};
          this._paneRenderers = {};
          this._mapPane = this.createPane("mapPane", this._container);
          setPosition(this._mapPane, new Point(0, 0));
          this.createPane("tilePane");
          this.createPane("overlayPane");
          this.createPane("shadowPane");
          this.createPane("markerPane");
          this.createPane("tooltipPane");
          this.createPane("popupPane");
          if (!this.options.markerZoomAnimation) {
            addClass(panes.markerPane, "leaflet-zoom-hide");
            addClass(panes.shadowPane, "leaflet-zoom-hide");
          }
        },
        // private methods that modify map state
        // @section Map state change events
        _resetView: function(center, zoom2, noMoveStart) {
          setPosition(this._mapPane, new Point(0, 0));
          var loading = !this._loaded;
          this._loaded = true;
          zoom2 = this._limitZoom(zoom2);
          this.fire("viewprereset");
          var zoomChanged = this._zoom !== zoom2;
          this._moveStart(zoomChanged, noMoveStart)._move(center, zoom2)._moveEnd(zoomChanged);
          this.fire("viewreset");
          if (loading) {
            this.fire("load");
          }
        },
        _moveStart: function(zoomChanged, noMoveStart) {
          if (zoomChanged) {
            this.fire("zoomstart");
          }
          if (!noMoveStart) {
            this.fire("movestart");
          }
          return this;
        },
        _move: function(center, zoom2, data, supressEvent) {
          if (zoom2 === void 0) {
            zoom2 = this._zoom;
          }
          var zoomChanged = this._zoom !== zoom2;
          this._zoom = zoom2;
          this._lastCenter = center;
          this._pixelOrigin = this._getNewPixelOrigin(center);
          if (!supressEvent) {
            if (zoomChanged || data && data.pinch) {
              this.fire("zoom", data);
            }
            this.fire("move", data);
          } else if (data && data.pinch) {
            this.fire("zoom", data);
          }
          return this;
        },
        _moveEnd: function(zoomChanged) {
          if (zoomChanged) {
            this.fire("zoomend");
          }
          return this.fire("moveend");
        },
        _stop: function() {
          cancelAnimFrame(this._flyToFrame);
          if (this._panAnim) {
            this._panAnim.stop();
          }
          return this;
        },
        _rawPanBy: function(offset) {
          setPosition(this._mapPane, this._getMapPanePos().subtract(offset));
        },
        _getZoomSpan: function() {
          return this.getMaxZoom() - this.getMinZoom();
        },
        _panInsideMaxBounds: function() {
          if (!this._enforcingBounds) {
            this.panInsideBounds(this.options.maxBounds);
          }
        },
        _checkIfLoaded: function() {
          if (!this._loaded) {
            throw new Error("Set map center and zoom first.");
          }
        },
        // DOM event handling
        // @section Interaction events
        _initEvents: function(remove2) {
          this._targets = {};
          this._targets[stamp(this._container)] = this;
          var onOff = remove2 ? off : on;
          onOff(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this);
          if (this.options.trackResize) {
            onOff(window, "resize", this._onResize, this);
          }
          if (Browser.any3d && this.options.transform3DLimit) {
            (remove2 ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
          }
        },
        _onResize: function() {
          cancelAnimFrame(this._resizeRequest);
          this._resizeRequest = requestAnimFrame(
            function() {
              this.invalidateSize({ debounceMoveend: true });
            },
            this
          );
        },
        _onScroll: function() {
          this._container.scrollTop = 0;
          this._container.scrollLeft = 0;
        },
        _onMoveEnd: function() {
          var pos = this._getMapPanePos();
          if (Math.max(Math.abs(pos.x), Math.abs(pos.y)) >= this.options.transform3DLimit) {
            this._resetView(this.getCenter(), this.getZoom());
          }
        },
        _findEventTargets: function(e2, type) {
          var targets = [], target, isHover = type === "mouseout" || type === "mouseover", src = e2.target || e2.srcElement, dragging = false;
          while (src) {
            target = this._targets[stamp(src)];
            if (target && (type === "click" || type === "preclick") && this._draggableMoved(target)) {
              dragging = true;
              break;
            }
            if (target && target.listens(type, true)) {
              if (isHover && !isExternalTarget(src, e2)) {
                break;
              }
              targets.push(target);
              if (isHover) {
                break;
              }
            }
            if (src === this._container) {
              break;
            }
            src = src.parentNode;
          }
          if (!targets.length && !dragging && !isHover && this.listens(type, true)) {
            targets = [this];
          }
          return targets;
        },
        _isClickDisabled: function(el) {
          while (el && el !== this._container) {
            if (el["_leaflet_disable_click"]) {
              return true;
            }
            el = el.parentNode;
          }
        },
        _handleDOMEvent: function(e2) {
          var el = e2.target || e2.srcElement;
          if (!this._loaded || el["_leaflet_disable_events"] || e2.type === "click" && this._isClickDisabled(el)) {
            return;
          }
          var type = e2.type;
          if (type === "mousedown") {
            preventOutline(el);
          }
          this._fireDOMEvent(e2, type);
        },
        _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
        _fireDOMEvent: function(e2, type, canvasTargets) {
          if (e2.type === "click") {
            var synth = extend2({}, e2);
            synth.type = "preclick";
            this._fireDOMEvent(synth, synth.type, canvasTargets);
          }
          var targets = this._findEventTargets(e2, type);
          if (canvasTargets) {
            var filtered = [];
            for (var i2 = 0; i2 < canvasTargets.length; i2++) {
              if (canvasTargets[i2].listens(type, true)) {
                filtered.push(canvasTargets[i2]);
              }
            }
            targets = filtered.concat(targets);
          }
          if (!targets.length) {
            return;
          }
          if (type === "contextmenu") {
            preventDefault(e2);
          }
          var target = targets[0];
          var data = {
            originalEvent: e2
          };
          if (e2.type !== "keypress" && e2.type !== "keydown" && e2.type !== "keyup") {
            var isMarker = target.getLatLng && (!target._radius || target._radius <= 10);
            data.containerPoint = isMarker ? this.latLngToContainerPoint(target.getLatLng()) : this.mouseEventToContainerPoint(e2);
            data.layerPoint = this.containerPointToLayerPoint(data.containerPoint);
            data.latlng = isMarker ? target.getLatLng() : this.layerPointToLatLng(data.layerPoint);
          }
          for (i2 = 0; i2 < targets.length; i2++) {
            targets[i2].fire(type, data, true);
            if (data.originalEvent._stopped || targets[i2].options.bubblingMouseEvents === false && indexOf(this._mouseEvents, type) !== -1) {
              return;
            }
          }
        },
        _draggableMoved: function(obj) {
          obj = obj.dragging && obj.dragging.enabled() ? obj : this;
          return obj.dragging && obj.dragging.moved() || this.boxZoom && this.boxZoom.moved();
        },
        _clearHandlers: function() {
          for (var i2 = 0, len = this._handlers.length; i2 < len; i2++) {
            this._handlers[i2].disable();
          }
        },
        // @section Other Methods
        // @method whenReady(fn: Function, context?: Object): this
        // Runs the given function `fn` when the map gets initialized with
        // a view (center and zoom) and at least one layer, or immediately
        // if it's already initialized, optionally passing a function context.
        whenReady: function(callback, context) {
          if (this._loaded) {
            callback.call(context || this, { target: this });
          } else {
            this.on("load", callback, context);
          }
          return this;
        },
        // private methods for getting map state
        _getMapPanePos: function() {
          return getPosition(this._mapPane) || new Point(0, 0);
        },
        _moved: function() {
          var pos = this._getMapPanePos();
          return pos && !pos.equals([0, 0]);
        },
        _getTopLeftPoint: function(center, zoom2) {
          var pixelOrigin = center && zoom2 !== void 0 ? this._getNewPixelOrigin(center, zoom2) : this.getPixelOrigin();
          return pixelOrigin.subtract(this._getMapPanePos());
        },
        _getNewPixelOrigin: function(center, zoom2) {
          var viewHalf = this.getSize()._divideBy(2);
          return this.project(center, zoom2)._subtract(viewHalf)._add(this._getMapPanePos())._round();
        },
        _latLngToNewLayerPoint: function(latlng, zoom2, center) {
          var topLeft = this._getNewPixelOrigin(center, zoom2);
          return this.project(latlng, zoom2)._subtract(topLeft);
        },
        _latLngBoundsToNewLayerBounds: function(latLngBounds, zoom2, center) {
          var topLeft = this._getNewPixelOrigin(center, zoom2);
          return toBounds([
            this.project(latLngBounds.getSouthWest(), zoom2)._subtract(topLeft),
            this.project(latLngBounds.getNorthWest(), zoom2)._subtract(topLeft),
            this.project(latLngBounds.getSouthEast(), zoom2)._subtract(topLeft),
            this.project(latLngBounds.getNorthEast(), zoom2)._subtract(topLeft)
          ]);
        },
        // layer point of the current center
        _getCenterLayerPoint: function() {
          return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
        },
        // offset of the specified place to the current center in pixels
        _getCenterOffset: function(latlng) {
          return this.latLngToLayerPoint(latlng).subtract(this._getCenterLayerPoint());
        },
        // adjust center for view to get inside bounds
        _limitCenter: function(center, zoom2, bounds) {
          if (!bounds) {
            return center;
          }
          var centerPoint = this.project(center, zoom2), viewHalf = this.getSize().divideBy(2), viewBounds = new Bounds(centerPoint.subtract(viewHalf), centerPoint.add(viewHalf)), offset = this._getBoundsOffset(viewBounds, bounds, zoom2);
          if (Math.abs(offset.x) <= 1 && Math.abs(offset.y) <= 1) {
            return center;
          }
          return this.unproject(centerPoint.add(offset), zoom2);
        },
        // adjust offset for view to get inside bounds
        _limitOffset: function(offset, bounds) {
          if (!bounds) {
            return offset;
          }
          var viewBounds = this.getPixelBounds(), newBounds = new Bounds(viewBounds.min.add(offset), viewBounds.max.add(offset));
          return offset.add(this._getBoundsOffset(newBounds, bounds));
        },
        // returns offset needed for pxBounds to get inside maxBounds at a specified zoom
        _getBoundsOffset: function(pxBounds, maxBounds, zoom2) {
          var projectedMaxBounds = toBounds(
            this.project(maxBounds.getNorthEast(), zoom2),
            this.project(maxBounds.getSouthWest(), zoom2)
          ), minOffset = projectedMaxBounds.min.subtract(pxBounds.min), maxOffset = projectedMaxBounds.max.subtract(pxBounds.max), dx = this._rebound(minOffset.x, -maxOffset.x), dy = this._rebound(minOffset.y, -maxOffset.y);
          return new Point(dx, dy);
        },
        _rebound: function(left, right) {
          return left + right > 0 ? Math.round(left - right) / 2 : Math.max(0, Math.ceil(left)) - Math.max(0, Math.floor(right));
        },
        _limitZoom: function(zoom2) {
          var min = this.getMinZoom(), max = this.getMaxZoom(), snap = Browser.any3d ? this.options.zoomSnap : 1;
          if (snap) {
            zoom2 = Math.round(zoom2 / snap) * snap;
          }
          return Math.max(min, Math.min(max, zoom2));
        },
        _onPanTransitionStep: function() {
          this.fire("move");
        },
        _onPanTransitionEnd: function() {
          removeClass(this._mapPane, "leaflet-pan-anim");
          this.fire("moveend");
        },
        _tryAnimatedPan: function(center, options) {
          var offset = this._getCenterOffset(center)._trunc();
          if ((options && options.animate) !== true && !this.getSize().contains(offset)) {
            return false;
          }
          this.panBy(offset, options);
          return true;
        },
        _createAnimProxy: function() {
          var proxy = this._proxy = create$1("div", "leaflet-proxy leaflet-zoom-animated");
          this._panes.mapPane.appendChild(proxy);
          this.on("zoomanim", function(e2) {
            var prop = TRANSFORM, transform = this._proxy.style[prop];
            setTransform(this._proxy, this.project(e2.center, e2.zoom), this.getZoomScale(e2.zoom, 1));
            if (transform === this._proxy.style[prop] && this._animatingZoom) {
              this._onZoomTransitionEnd();
            }
          }, this);
          this.on("load moveend", this._animMoveEnd, this);
          this._on("unload", this._destroyAnimProxy, this);
        },
        _destroyAnimProxy: function() {
          remove(this._proxy);
          this.off("load moveend", this._animMoveEnd, this);
          delete this._proxy;
        },
        _animMoveEnd: function() {
          var c2 = this.getCenter(), z = this.getZoom();
          setTransform(this._proxy, this.project(c2, z), this.getZoomScale(z, 1));
        },
        _catchTransitionEnd: function(e2) {
          if (this._animatingZoom && e2.propertyName.indexOf("transform") >= 0) {
            this._onZoomTransitionEnd();
          }
        },
        _nothingToAnimate: function() {
          return !this._container.getElementsByClassName("leaflet-zoom-animated").length;
        },
        _tryAnimatedZoom: function(center, zoom2, options) {
          if (this._animatingZoom) {
            return true;
          }
          options = options || {};
          if (!this._zoomAnimated || options.animate === false || this._nothingToAnimate() || Math.abs(zoom2 - this._zoom) > this.options.zoomAnimationThreshold) {
            return false;
          }
          var scale2 = this.getZoomScale(zoom2), offset = this._getCenterOffset(center)._divideBy(1 - 1 / scale2);
          if (options.animate !== true && !this.getSize().contains(offset)) {
            return false;
          }
          requestAnimFrame(function() {
            this._moveStart(true, options.noMoveStart || false)._animateZoom(center, zoom2, true);
          }, this);
          return true;
        },
        _animateZoom: function(center, zoom2, startAnim, noUpdate) {
          if (!this._mapPane) {
            return;
          }
          if (startAnim) {
            this._animatingZoom = true;
            this._animateToCenter = center;
            this._animateToZoom = zoom2;
            addClass(this._mapPane, "leaflet-zoom-anim");
          }
          this.fire("zoomanim", {
            center,
            zoom: zoom2,
            noUpdate
          });
          if (!this._tempFireZoomEvent) {
            this._tempFireZoomEvent = this._zoom !== this._animateToZoom;
          }
          this._move(this._animateToCenter, this._animateToZoom, void 0, true);
          setTimeout(bind(this._onZoomTransitionEnd, this), 250);
        },
        _onZoomTransitionEnd: function() {
          if (!this._animatingZoom) {
            return;
          }
          if (this._mapPane) {
            removeClass(this._mapPane, "leaflet-zoom-anim");
          }
          this._animatingZoom = false;
          this._move(this._animateToCenter, this._animateToZoom, void 0, true);
          if (this._tempFireZoomEvent) {
            this.fire("zoom");
          }
          delete this._tempFireZoomEvent;
          this.fire("move");
          this._moveEnd(true);
        }
      });
      function createMap(id, options) {
        return new Map(id, options);
      }
      var Control = Class.extend({
        // @section
        // @aka Control Options
        options: {
          // @option position: String = 'topright'
          // The position of the control (one of the map corners). Possible values are `'topleft'`,
          // `'topright'`, `'bottomleft'` or `'bottomright'`
          position: "topright"
        },
        initialize: function(options) {
          setOptions(this, options);
        },
        /* @section
         * Classes extending L.Control will inherit the following methods:
         *
         * @method getPosition: string
         * Returns the position of the control.
         */
        getPosition: function() {
          return this.options.position;
        },
        // @method setPosition(position: string): this
        // Sets the position of the control.
        setPosition: function(position2) {
          var map = this._map;
          if (map) {
            map.removeControl(this);
          }
          this.options.position = position2;
          if (map) {
            map.addControl(this);
          }
          return this;
        },
        // @method getContainer: HTMLElement
        // Returns the HTMLElement that contains the control.
        getContainer: function() {
          return this._container;
        },
        // @method addTo(map: Map): this
        // Adds the control to the given map.
        addTo: function(map) {
          this.remove();
          this._map = map;
          var container = this._container = this.onAdd(map), pos = this.getPosition(), corner = map._controlCorners[pos];
          addClass(container, "leaflet-control");
          if (pos.indexOf("bottom") !== -1) {
            corner.insertBefore(container, corner.firstChild);
          } else {
            corner.appendChild(container);
          }
          this._map.on("unload", this.remove, this);
          return this;
        },
        // @method remove: this
        // Removes the control from the map it is currently active on.
        remove: function() {
          if (!this._map) {
            return this;
          }
          remove(this._container);
          if (this.onRemove) {
            this.onRemove(this._map);
          }
          this._map.off("unload", this.remove, this);
          this._map = null;
          return this;
        },
        _refocusOnMap: function(e2) {
          if (this._map && e2 && e2.screenX > 0 && e2.screenY > 0) {
            this._map.getContainer().focus();
          }
        }
      });
      var control = function(options) {
        return new Control(options);
      };
      Map.include({
        // @method addControl(control: Control): this
        // Adds the given control to the map
        addControl: function(control2) {
          control2.addTo(this);
          return this;
        },
        // @method removeControl(control: Control): this
        // Removes the given control from the map
        removeControl: function(control2) {
          control2.remove();
          return this;
        },
        _initControlPos: function() {
          var corners = this._controlCorners = {}, l2 = "leaflet-", container = this._controlContainer = create$1("div", l2 + "control-container", this._container);
          function createCorner(vSide, hSide) {
            var className = l2 + vSide + " " + l2 + hSide;
            corners[vSide + hSide] = create$1("div", className, container);
          }
          createCorner("top", "left");
          createCorner("top", "right");
          createCorner("bottom", "left");
          createCorner("bottom", "right");
        },
        _clearControlPos: function() {
          for (var i2 in this._controlCorners) {
            remove(this._controlCorners[i2]);
          }
          remove(this._controlContainer);
          delete this._controlCorners;
          delete this._controlContainer;
        }
      });
      var Layers = Control.extend({
        // @section
        // @aka Control.Layers options
        options: {
          // @option collapsed: Boolean = true
          // If `true`, the control will be collapsed into an icon and expanded on mouse hover, touch, or keyboard activation.
          collapsed: true,
          position: "topright",
          // @option autoZIndex: Boolean = true
          // If `true`, the control will assign zIndexes in increasing order to all of its layers so that the order is preserved when switching them on/off.
          autoZIndex: true,
          // @option hideSingleBase: Boolean = false
          // If `true`, the base layers in the control will be hidden when there is only one.
          hideSingleBase: false,
          // @option sortLayers: Boolean = false
          // Whether to sort the layers. When `false`, layers will keep the order
          // in which they were added to the control.
          sortLayers: false,
          // @option sortFunction: Function = *
          // A [compare function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
          // that will be used for sorting the layers, when `sortLayers` is `true`.
          // The function receives both the `L.Layer` instances and their names, as in
          // `sortFunction(layerA, layerB, nameA, nameB)`.
          // By default, it sorts layers alphabetically by their name.
          sortFunction: function(layerA, layerB, nameA, nameB) {
            return nameA < nameB ? -1 : nameB < nameA ? 1 : 0;
          }
        },
        initialize: function(baseLayers, overlays, options) {
          setOptions(this, options);
          this._layerControlInputs = [];
          this._layers = [];
          this._lastZIndex = 0;
          this._handlingClick = false;
          this._preventClick = false;
          for (var i2 in baseLayers) {
            this._addLayer(baseLayers[i2], i2);
          }
          for (i2 in overlays) {
            this._addLayer(overlays[i2], i2, true);
          }
        },
        onAdd: function(map) {
          this._initLayout();
          this._update();
          this._map = map;
          map.on("zoomend", this._checkDisabledLayers, this);
          for (var i2 = 0; i2 < this._layers.length; i2++) {
            this._layers[i2].layer.on("add remove", this._onLayerChange, this);
          }
          return this._container;
        },
        addTo: function(map) {
          Control.prototype.addTo.call(this, map);
          return this._expandIfNotCollapsed();
        },
        onRemove: function() {
          this._map.off("zoomend", this._checkDisabledLayers, this);
          for (var i2 = 0; i2 < this._layers.length; i2++) {
            this._layers[i2].layer.off("add remove", this._onLayerChange, this);
          }
        },
        // @method addBaseLayer(layer: Layer, name: String): this
        // Adds a base layer (radio button entry) with the given name to the control.
        addBaseLayer: function(layer, name) {
          this._addLayer(layer, name);
          return this._map ? this._update() : this;
        },
        // @method addOverlay(layer: Layer, name: String): this
        // Adds an overlay (checkbox entry) with the given name to the control.
        addOverlay: function(layer, name) {
          this._addLayer(layer, name, true);
          return this._map ? this._update() : this;
        },
        // @method removeLayer(layer: Layer): this
        // Remove the given layer from the control.
        removeLayer: function(layer) {
          layer.off("add remove", this._onLayerChange, this);
          var obj = this._getLayer(stamp(layer));
          if (obj) {
            this._layers.splice(this._layers.indexOf(obj), 1);
          }
          return this._map ? this._update() : this;
        },
        // @method expand(): this
        // Expand the control container if collapsed.
        expand: function() {
          addClass(this._container, "leaflet-control-layers-expanded");
          this._section.style.height = null;
          var acceptableHeight = this._map.getSize().y - (this._container.offsetTop + 50);
          if (acceptableHeight < this._section.clientHeight) {
            addClass(this._section, "leaflet-control-layers-scrollbar");
            this._section.style.height = acceptableHeight + "px";
          } else {
            removeClass(this._section, "leaflet-control-layers-scrollbar");
          }
          this._checkDisabledLayers();
          return this;
        },
        // @method collapse(): this
        // Collapse the control container if expanded.
        collapse: function() {
          removeClass(this._container, "leaflet-control-layers-expanded");
          return this;
        },
        _initLayout: function() {
          var className = "leaflet-control-layers", container = this._container = create$1("div", className), collapsed = this.options.collapsed;
          container.setAttribute("aria-haspopup", true);
          disableClickPropagation(container);
          disableScrollPropagation(container);
          var section = this._section = create$1("section", className + "-list");
          if (collapsed) {
            this._map.on("click", this.collapse, this);
            on(container, {
              mouseenter: this._expandSafely,
              mouseleave: this.collapse
            }, this);
          }
          var link = this._layersLink = create$1("a", className + "-toggle", container);
          link.href = "#";
          link.title = "Layers";
          link.setAttribute("role", "button");
          on(link, {
            keydown: function(e2) {
              if (e2.keyCode === 13) {
                this._expandSafely();
              }
            },
            // Certain screen readers intercept the key event and instead send a click event
            click: function(e2) {
              preventDefault(e2);
              this._expandSafely();
            }
          }, this);
          if (!collapsed) {
            this.expand();
          }
          this._baseLayersList = create$1("div", className + "-base", section);
          this._separator = create$1("div", className + "-separator", section);
          this._overlaysList = create$1("div", className + "-overlays", section);
          container.appendChild(section);
        },
        _getLayer: function(id) {
          for (var i2 = 0; i2 < this._layers.length; i2++) {
            if (this._layers[i2] && stamp(this._layers[i2].layer) === id) {
              return this._layers[i2];
            }
          }
        },
        _addLayer: function(layer, name, overlay) {
          if (this._map) {
            layer.on("add remove", this._onLayerChange, this);
          }
          this._layers.push({
            layer,
            name,
            overlay
          });
          if (this.options.sortLayers) {
            this._layers.sort(bind(function(a2, b2) {
              return this.options.sortFunction(a2.layer, b2.layer, a2.name, b2.name);
            }, this));
          }
          if (this.options.autoZIndex && layer.setZIndex) {
            this._lastZIndex++;
            layer.setZIndex(this._lastZIndex);
          }
          this._expandIfNotCollapsed();
        },
        _update: function() {
          if (!this._container) {
            return this;
          }
          empty(this._baseLayersList);
          empty(this._overlaysList);
          this._layerControlInputs = [];
          var baseLayersPresent, overlaysPresent, i2, obj, baseLayersCount = 0;
          for (i2 = 0; i2 < this._layers.length; i2++) {
            obj = this._layers[i2];
            this._addItem(obj);
            overlaysPresent = overlaysPresent || obj.overlay;
            baseLayersPresent = baseLayersPresent || !obj.overlay;
            baseLayersCount += !obj.overlay ? 1 : 0;
          }
          if (this.options.hideSingleBase) {
            baseLayersPresent = baseLayersPresent && baseLayersCount > 1;
            this._baseLayersList.style.display = baseLayersPresent ? "" : "none";
          }
          this._separator.style.display = overlaysPresent && baseLayersPresent ? "" : "none";
          return this;
        },
        _onLayerChange: function(e2) {
          if (!this._handlingClick) {
            this._update();
          }
          var obj = this._getLayer(stamp(e2.target));
          var type = obj.overlay ? e2.type === "add" ? "overlayadd" : "overlayremove" : e2.type === "add" ? "baselayerchange" : null;
          if (type) {
            this._map.fire(type, obj);
          }
        },
        // IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see https://stackoverflow.com/a/119079)
        _createRadioElement: function(name, checked) {
          var radioHtml = '<input type="radio" class="leaflet-control-layers-selector" name="' + name + '"' + (checked ? ' checked="checked"' : "") + "/>";
          var radioFragment = document.createElement("div");
          radioFragment.innerHTML = radioHtml;
          return radioFragment.firstChild;
        },
        _addItem: function(obj) {
          var label = document.createElement("label"), checked = this._map.hasLayer(obj.layer), input;
          if (obj.overlay) {
            input = document.createElement("input");
            input.type = "checkbox";
            input.className = "leaflet-control-layers-selector";
            input.defaultChecked = checked;
          } else {
            input = this._createRadioElement("leaflet-base-layers_" + stamp(this), checked);
          }
          this._layerControlInputs.push(input);
          input.layerId = stamp(obj.layer);
          on(input, "click", this._onInputClick, this);
          var name = document.createElement("span");
          name.innerHTML = " " + obj.name;
          var holder = document.createElement("span");
          label.appendChild(holder);
          holder.appendChild(input);
          holder.appendChild(name);
          var container = obj.overlay ? this._overlaysList : this._baseLayersList;
          container.appendChild(label);
          this._checkDisabledLayers();
          return label;
        },
        _onInputClick: function() {
          if (this._preventClick) {
            return;
          }
          var inputs = this._layerControlInputs, input, layer;
          var addedLayers = [], removedLayers = [];
          this._handlingClick = true;
          for (var i2 = inputs.length - 1; i2 >= 0; i2--) {
            input = inputs[i2];
            layer = this._getLayer(input.layerId).layer;
            if (input.checked) {
              addedLayers.push(layer);
            } else if (!input.checked) {
              removedLayers.push(layer);
            }
          }
          for (i2 = 0; i2 < removedLayers.length; i2++) {
            if (this._map.hasLayer(removedLayers[i2])) {
              this._map.removeLayer(removedLayers[i2]);
            }
          }
          for (i2 = 0; i2 < addedLayers.length; i2++) {
            if (!this._map.hasLayer(addedLayers[i2])) {
              this._map.addLayer(addedLayers[i2]);
            }
          }
          this._handlingClick = false;
          this._refocusOnMap();
        },
        _checkDisabledLayers: function() {
          var inputs = this._layerControlInputs, input, layer, zoom2 = this._map.getZoom();
          for (var i2 = inputs.length - 1; i2 >= 0; i2--) {
            input = inputs[i2];
            layer = this._getLayer(input.layerId).layer;
            input.disabled = layer.options.minZoom !== void 0 && zoom2 < layer.options.minZoom || layer.options.maxZoom !== void 0 && zoom2 > layer.options.maxZoom;
          }
        },
        _expandIfNotCollapsed: function() {
          if (this._map && !this.options.collapsed) {
            this.expand();
          }
          return this;
        },
        _expandSafely: function() {
          var section = this._section;
          this._preventClick = true;
          on(section, "click", preventDefault);
          this.expand();
          var that = this;
          setTimeout(function() {
            off(section, "click", preventDefault);
            that._preventClick = false;
          });
        }
      });
      var layers = function(baseLayers, overlays, options) {
        return new Layers(baseLayers, overlays, options);
      };
      var Zoom = Control.extend({
        // @section
        // @aka Control.Zoom options
        options: {
          position: "topleft",
          // @option zoomInText: String = '<span aria-hidden="true">+</span>'
          // The text set on the 'zoom in' button.
          zoomInText: '<span aria-hidden="true">+</span>',
          // @option zoomInTitle: String = 'Zoom in'
          // The title set on the 'zoom in' button.
          zoomInTitle: "Zoom in",
          // @option zoomOutText: String = '<span aria-hidden="true">&#x2212;</span>'
          // The text set on the 'zoom out' button.
          zoomOutText: '<span aria-hidden="true">&#x2212;</span>',
          // @option zoomOutTitle: String = 'Zoom out'
          // The title set on the 'zoom out' button.
          zoomOutTitle: "Zoom out"
        },
        onAdd: function(map) {
          var zoomName = "leaflet-control-zoom", container = create$1("div", zoomName + " leaflet-bar"), options = this.options;
          this._zoomInButton = this._createButton(
            options.zoomInText,
            options.zoomInTitle,
            zoomName + "-in",
            container,
            this._zoomIn
          );
          this._zoomOutButton = this._createButton(
            options.zoomOutText,
            options.zoomOutTitle,
            zoomName + "-out",
            container,
            this._zoomOut
          );
          this._updateDisabled();
          map.on("zoomend zoomlevelschange", this._updateDisabled, this);
          return container;
        },
        onRemove: function(map) {
          map.off("zoomend zoomlevelschange", this._updateDisabled, this);
        },
        disable: function() {
          this._disabled = true;
          this._updateDisabled();
          return this;
        },
        enable: function() {
          this._disabled = false;
          this._updateDisabled();
          return this;
        },
        _zoomIn: function(e2) {
          if (!this._disabled && this._map._zoom < this._map.getMaxZoom()) {
            this._map.zoomIn(this._map.options.zoomDelta * (e2.shiftKey ? 3 : 1));
          }
        },
        _zoomOut: function(e2) {
          if (!this._disabled && this._map._zoom > this._map.getMinZoom()) {
            this._map.zoomOut(this._map.options.zoomDelta * (e2.shiftKey ? 3 : 1));
          }
        },
        _createButton: function(html, title, className, container, fn) {
          var link = create$1("a", className, container);
          link.innerHTML = html;
          link.href = "#";
          link.title = title;
          link.setAttribute("role", "button");
          link.setAttribute("aria-label", title);
          disableClickPropagation(link);
          on(link, "click", stop);
          on(link, "click", fn, this);
          on(link, "click", this._refocusOnMap, this);
          return link;
        },
        _updateDisabled: function() {
          var map = this._map, className = "leaflet-disabled";
          removeClass(this._zoomInButton, className);
          removeClass(this._zoomOutButton, className);
          this._zoomInButton.setAttribute("aria-disabled", "false");
          this._zoomOutButton.setAttribute("aria-disabled", "false");
          if (this._disabled || map._zoom === map.getMinZoom()) {
            addClass(this._zoomOutButton, className);
            this._zoomOutButton.setAttribute("aria-disabled", "true");
          }
          if (this._disabled || map._zoom === map.getMaxZoom()) {
            addClass(this._zoomInButton, className);
            this._zoomInButton.setAttribute("aria-disabled", "true");
          }
        }
      });
      Map.mergeOptions({
        zoomControl: true
      });
      Map.addInitHook(function() {
        if (this.options.zoomControl) {
          this.zoomControl = new Zoom();
          this.addControl(this.zoomControl);
        }
      });
      var zoom = function(options) {
        return new Zoom(options);
      };
      var Scale = Control.extend({
        // @section
        // @aka Control.Scale options
        options: {
          position: "bottomleft",
          // @option maxWidth: Number = 100
          // Maximum width of the control in pixels. The width is set dynamically to show round values (e.g. 100, 200, 500).
          maxWidth: 100,
          // @option metric: Boolean = True
          // Whether to show the metric scale line (m/km).
          metric: true,
          // @option imperial: Boolean = True
          // Whether to show the imperial scale line (mi/ft).
          imperial: true
          // @option updateWhenIdle: Boolean = false
          // If `true`, the control is updated on [`moveend`](#map-moveend), otherwise it's always up-to-date (updated on [`move`](#map-move)).
        },
        onAdd: function(map) {
          var className = "leaflet-control-scale", container = create$1("div", className), options = this.options;
          this._addScales(options, className + "-line", container);
          map.on(options.updateWhenIdle ? "moveend" : "move", this._update, this);
          map.whenReady(this._update, this);
          return container;
        },
        onRemove: function(map) {
          map.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
        },
        _addScales: function(options, className, container) {
          if (options.metric) {
            this._mScale = create$1("div", className, container);
          }
          if (options.imperial) {
            this._iScale = create$1("div", className, container);
          }
        },
        _update: function() {
          var map = this._map, y2 = map.getSize().y / 2;
          var maxMeters = map.distance(
            map.containerPointToLatLng([0, y2]),
            map.containerPointToLatLng([this.options.maxWidth, y2])
          );
          this._updateScales(maxMeters);
        },
        _updateScales: function(maxMeters) {
          if (this.options.metric && maxMeters) {
            this._updateMetric(maxMeters);
          }
          if (this.options.imperial && maxMeters) {
            this._updateImperial(maxMeters);
          }
        },
        _updateMetric: function(maxMeters) {
          var meters = this._getRoundNum(maxMeters), label = meters < 1e3 ? meters + " m" : meters / 1e3 + " km";
          this._updateScale(this._mScale, label, meters / maxMeters);
        },
        _updateImperial: function(maxMeters) {
          var maxFeet = maxMeters * 3.2808399, maxMiles, miles, feet;
          if (maxFeet > 5280) {
            maxMiles = maxFeet / 5280;
            miles = this._getRoundNum(maxMiles);
            this._updateScale(this._iScale, miles + " mi", miles / maxMiles);
          } else {
            feet = this._getRoundNum(maxFeet);
            this._updateScale(this._iScale, feet + " ft", feet / maxFeet);
          }
        },
        _updateScale: function(scale2, text, ratio) {
          scale2.style.width = Math.round(this.options.maxWidth * ratio) + "px";
          scale2.innerHTML = text;
        },
        _getRoundNum: function(num) {
          var pow10 = Math.pow(10, (Math.floor(num) + "").length - 1), d2 = num / pow10;
          d2 = d2 >= 10 ? 10 : d2 >= 5 ? 5 : d2 >= 3 ? 3 : d2 >= 2 ? 2 : 1;
          return pow10 * d2;
        }
      });
      var scale = function(options) {
        return new Scale(options);
      };
      var ukrainianFlag = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>';
      var Attribution = Control.extend({
        // @section
        // @aka Control.Attribution options
        options: {
          position: "bottomright",
          // @option prefix: String|false = 'Leaflet'
          // The HTML text shown before the attributions. Pass `false` to disable.
          prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (Browser.inlineSvg ? ukrainianFlag + " " : "") + "Leaflet</a>"
        },
        initialize: function(options) {
          setOptions(this, options);
          this._attributions = {};
        },
        onAdd: function(map) {
          map.attributionControl = this;
          this._container = create$1("div", "leaflet-control-attribution");
          disableClickPropagation(this._container);
          for (var i2 in map._layers) {
            if (map._layers[i2].getAttribution) {
              this.addAttribution(map._layers[i2].getAttribution());
            }
          }
          this._update();
          map.on("layeradd", this._addAttribution, this);
          return this._container;
        },
        onRemove: function(map) {
          map.off("layeradd", this._addAttribution, this);
        },
        _addAttribution: function(ev) {
          if (ev.layer.getAttribution) {
            this.addAttribution(ev.layer.getAttribution());
            ev.layer.once("remove", function() {
              this.removeAttribution(ev.layer.getAttribution());
            }, this);
          }
        },
        // @method setPrefix(prefix: String|false): this
        // The HTML text shown before the attributions. Pass `false` to disable.
        setPrefix: function(prefix2) {
          this.options.prefix = prefix2;
          this._update();
          return this;
        },
        // @method addAttribution(text: String): this
        // Adds an attribution text (e.g. `'&copy; OpenStreetMap contributors'`).
        addAttribution: function(text) {
          if (!text) {
            return this;
          }
          if (!this._attributions[text]) {
            this._attributions[text] = 0;
          }
          this._attributions[text]++;
          this._update();
          return this;
        },
        // @method removeAttribution(text: String): this
        // Removes an attribution text.
        removeAttribution: function(text) {
          if (!text) {
            return this;
          }
          if (this._attributions[text]) {
            this._attributions[text]--;
            this._update();
          }
          return this;
        },
        _update: function() {
          if (!this._map) {
            return;
          }
          var attribs = [];
          for (var i2 in this._attributions) {
            if (this._attributions[i2]) {
              attribs.push(i2);
            }
          }
          var prefixAndAttribs = [];
          if (this.options.prefix) {
            prefixAndAttribs.push(this.options.prefix);
          }
          if (attribs.length) {
            prefixAndAttribs.push(attribs.join(", "));
          }
          this._container.innerHTML = prefixAndAttribs.join(' <span aria-hidden="true">|</span> ');
        }
      });
      Map.mergeOptions({
        attributionControl: true
      });
      Map.addInitHook(function() {
        if (this.options.attributionControl) {
          new Attribution().addTo(this);
        }
      });
      var attribution = function(options) {
        return new Attribution(options);
      };
      Control.Layers = Layers;
      Control.Zoom = Zoom;
      Control.Scale = Scale;
      Control.Attribution = Attribution;
      control.layers = layers;
      control.zoom = zoom;
      control.scale = scale;
      control.attribution = attribution;
      var Handler = Class.extend({
        initialize: function(map) {
          this._map = map;
        },
        // @method enable(): this
        // Enables the handler
        enable: function() {
          if (this._enabled) {
            return this;
          }
          this._enabled = true;
          this.addHooks();
          return this;
        },
        // @method disable(): this
        // Disables the handler
        disable: function() {
          if (!this._enabled) {
            return this;
          }
          this._enabled = false;
          this.removeHooks();
          return this;
        },
        // @method enabled(): Boolean
        // Returns `true` if the handler is enabled
        enabled: function() {
          return !!this._enabled;
        }
        // @section Extension methods
        // Classes inheriting from `Handler` must implement the two following methods:
        // @method addHooks()
        // Called when the handler is enabled, should add event hooks.
        // @method removeHooks()
        // Called when the handler is disabled, should remove the event hooks added previously.
      });
      Handler.addTo = function(map, name) {
        map.addHandler(name, this);
        return this;
      };
      var Mixin = { Events };
      var START = Browser.touch ? "touchstart mousedown" : "mousedown";
      var Draggable = Evented.extend({
        options: {
          // @section
          // @aka Draggable options
          // @option clickTolerance: Number = 3
          // The max number of pixels a user can shift the mouse pointer during a click
          // for it to be considered a valid click (as opposed to a mouse drag).
          clickTolerance: 3
        },
        // @constructor L.Draggable(el: HTMLElement, dragHandle?: HTMLElement, preventOutline?: Boolean, options?: Draggable options)
        // Creates a `Draggable` object for moving `el` when you start dragging the `dragHandle` element (equals `el` itself by default).
        initialize: function(element, dragStartTarget, preventOutline2, options) {
          setOptions(this, options);
          this._element = element;
          this._dragStartTarget = dragStartTarget || element;
          this._preventOutline = preventOutline2;
        },
        // @method enable()
        // Enables the dragging ability
        enable: function() {
          if (this._enabled) {
            return;
          }
          on(this._dragStartTarget, START, this._onDown, this);
          this._enabled = true;
        },
        // @method disable()
        // Disables the dragging ability
        disable: function() {
          if (!this._enabled) {
            return;
          }
          if (Draggable._dragging === this) {
            this.finishDrag(true);
          }
          off(this._dragStartTarget, START, this._onDown, this);
          this._enabled = false;
          this._moved = false;
        },
        _onDown: function(e2) {
          if (!this._enabled) {
            return;
          }
          this._moved = false;
          if (hasClass(this._element, "leaflet-zoom-anim")) {
            return;
          }
          if (e2.touches && e2.touches.length !== 1) {
            if (Draggable._dragging === this) {
              this.finishDrag();
            }
            return;
          }
          if (Draggable._dragging || e2.shiftKey || e2.which !== 1 && e2.button !== 1 && !e2.touches) {
            return;
          }
          Draggable._dragging = this;
          if (this._preventOutline) {
            preventOutline(this._element);
          }
          disableImageDrag();
          disableTextSelection();
          if (this._moving) {
            return;
          }
          this.fire("down");
          var first = e2.touches ? e2.touches[0] : e2, sizedParent = getSizedParentNode(this._element);
          this._startPoint = new Point(first.clientX, first.clientY);
          this._startPos = getPosition(this._element);
          this._parentScale = getScale(sizedParent);
          var mouseevent = e2.type === "mousedown";
          on(document, mouseevent ? "mousemove" : "touchmove", this._onMove, this);
          on(document, mouseevent ? "mouseup" : "touchend touchcancel", this._onUp, this);
        },
        _onMove: function(e2) {
          if (!this._enabled) {
            return;
          }
          if (e2.touches && e2.touches.length > 1) {
            this._moved = true;
            return;
          }
          var first = e2.touches && e2.touches.length === 1 ? e2.touches[0] : e2, offset = new Point(first.clientX, first.clientY)._subtract(this._startPoint);
          if (!offset.x && !offset.y) {
            return;
          }
          if (Math.abs(offset.x) + Math.abs(offset.y) < this.options.clickTolerance) {
            return;
          }
          offset.x /= this._parentScale.x;
          offset.y /= this._parentScale.y;
          preventDefault(e2);
          if (!this._moved) {
            this.fire("dragstart");
            this._moved = true;
            addClass(document.body, "leaflet-dragging");
            this._lastTarget = e2.target || e2.srcElement;
            if (window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance) {
              this._lastTarget = this._lastTarget.correspondingUseElement;
            }
            addClass(this._lastTarget, "leaflet-drag-target");
          }
          this._newPos = this._startPos.add(offset);
          this._moving = true;
          this._lastEvent = e2;
          this._updatePosition();
        },
        _updatePosition: function() {
          var e2 = { originalEvent: this._lastEvent };
          this.fire("predrag", e2);
          setPosition(this._element, this._newPos);
          this.fire("drag", e2);
        },
        _onUp: function() {
          if (!this._enabled) {
            return;
          }
          this.finishDrag();
        },
        finishDrag: function(noInertia) {
          removeClass(document.body, "leaflet-dragging");
          if (this._lastTarget) {
            removeClass(this._lastTarget, "leaflet-drag-target");
            this._lastTarget = null;
          }
          off(document, "mousemove touchmove", this._onMove, this);
          off(document, "mouseup touchend touchcancel", this._onUp, this);
          enableImageDrag();
          enableTextSelection();
          var fireDragend = this._moved && this._moving;
          this._moving = false;
          Draggable._dragging = false;
          if (fireDragend) {
            this.fire("dragend", {
              noInertia,
              distance: this._newPos.distanceTo(this._startPos)
            });
          }
        }
      });
      function clipPolygon(points, bounds, round) {
        var clippedPoints, edges = [1, 4, 2, 8], i2, j, k, a2, b2, len, edge2, p2;
        for (i2 = 0, len = points.length; i2 < len; i2++) {
          points[i2]._code = _getBitCode(points[i2], bounds);
        }
        for (k = 0; k < 4; k++) {
          edge2 = edges[k];
          clippedPoints = [];
          for (i2 = 0, len = points.length, j = len - 1; i2 < len; j = i2++) {
            a2 = points[i2];
            b2 = points[j];
            if (!(a2._code & edge2)) {
              if (b2._code & edge2) {
                p2 = _getEdgeIntersection(b2, a2, edge2, bounds, round);
                p2._code = _getBitCode(p2, bounds);
                clippedPoints.push(p2);
              }
              clippedPoints.push(a2);
            } else if (!(b2._code & edge2)) {
              p2 = _getEdgeIntersection(b2, a2, edge2, bounds, round);
              p2._code = _getBitCode(p2, bounds);
              clippedPoints.push(p2);
            }
          }
          points = clippedPoints;
        }
        return points;
      }
      function polygonCenter(latlngs, crs) {
        var i2, j, p1, p2, f2, area, x2, y2, center;
        if (!latlngs || latlngs.length === 0) {
          throw new Error("latlngs not passed");
        }
        if (!isFlat(latlngs)) {
          console.warn("latlngs are not flat! Only the first ring will be used");
          latlngs = latlngs[0];
        }
        var centroidLatLng = toLatLng([0, 0]);
        var bounds = toLatLngBounds(latlngs);
        var areaBounds = bounds.getNorthWest().distanceTo(bounds.getSouthWest()) * bounds.getNorthEast().distanceTo(bounds.getNorthWest());
        if (areaBounds < 1700) {
          centroidLatLng = centroid(latlngs);
        }
        var len = latlngs.length;
        var points = [];
        for (i2 = 0; i2 < len; i2++) {
          var latlng = toLatLng(latlngs[i2]);
          points.push(crs.project(toLatLng([latlng.lat - centroidLatLng.lat, latlng.lng - centroidLatLng.lng])));
        }
        area = x2 = y2 = 0;
        for (i2 = 0, j = len - 1; i2 < len; j = i2++) {
          p1 = points[i2];
          p2 = points[j];
          f2 = p1.y * p2.x - p2.y * p1.x;
          x2 += (p1.x + p2.x) * f2;
          y2 += (p1.y + p2.y) * f2;
          area += f2 * 3;
        }
        if (area === 0) {
          center = points[0];
        } else {
          center = [x2 / area, y2 / area];
        }
        var latlngCenter = crs.unproject(toPoint(center));
        return toLatLng([latlngCenter.lat + centroidLatLng.lat, latlngCenter.lng + centroidLatLng.lng]);
      }
      function centroid(coords) {
        var latSum = 0;
        var lngSum = 0;
        var len = 0;
        for (var i2 = 0; i2 < coords.length; i2++) {
          var latlng = toLatLng(coords[i2]);
          latSum += latlng.lat;
          lngSum += latlng.lng;
          len++;
        }
        return toLatLng([latSum / len, lngSum / len]);
      }
      var PolyUtil = {
        __proto__: null,
        clipPolygon,
        polygonCenter,
        centroid
      };
      function simplify(points, tolerance) {
        if (!tolerance || !points.length) {
          return points.slice();
        }
        var sqTolerance = tolerance * tolerance;
        points = _reducePoints(points, sqTolerance);
        points = _simplifyDP(points, sqTolerance);
        return points;
      }
      function pointToSegmentDistance(p2, p1, p22) {
        return Math.sqrt(_sqClosestPointOnSegment(p2, p1, p22, true));
      }
      function closestPointOnSegment(p2, p1, p22) {
        return _sqClosestPointOnSegment(p2, p1, p22);
      }
      function _simplifyDP(points, sqTolerance) {
        var len = points.length, ArrayConstructor = typeof Uint8Array !== "undefined" ? Uint8Array : Array, markers = new ArrayConstructor(len);
        markers[0] = markers[len - 1] = 1;
        _simplifyDPStep(points, markers, sqTolerance, 0, len - 1);
        var i2, newPoints = [];
        for (i2 = 0; i2 < len; i2++) {
          if (markers[i2]) {
            newPoints.push(points[i2]);
          }
        }
        return newPoints;
      }
      function _simplifyDPStep(points, markers, sqTolerance, first, last) {
        var maxSqDist = 0, index2, i2, sqDist2;
        for (i2 = first + 1; i2 <= last - 1; i2++) {
          sqDist2 = _sqClosestPointOnSegment(points[i2], points[first], points[last], true);
          if (sqDist2 > maxSqDist) {
            index2 = i2;
            maxSqDist = sqDist2;
          }
        }
        if (maxSqDist > sqTolerance) {
          markers[index2] = 1;
          _simplifyDPStep(points, markers, sqTolerance, first, index2);
          _simplifyDPStep(points, markers, sqTolerance, index2, last);
        }
      }
      function _reducePoints(points, sqTolerance) {
        var reducedPoints = [points[0]];
        for (var i2 = 1, prev2 = 0, len = points.length; i2 < len; i2++) {
          if (_sqDist(points[i2], points[prev2]) > sqTolerance) {
            reducedPoints.push(points[i2]);
            prev2 = i2;
          }
        }
        if (prev2 < len - 1) {
          reducedPoints.push(points[len - 1]);
        }
        return reducedPoints;
      }
      var _lastCode;
      function clipSegment(a2, b2, bounds, useLastCode, round) {
        var codeA = useLastCode ? _lastCode : _getBitCode(a2, bounds), codeB = _getBitCode(b2, bounds), codeOut, p2, newCode;
        _lastCode = codeB;
        while (true) {
          if (!(codeA | codeB)) {
            return [a2, b2];
          }
          if (codeA & codeB) {
            return false;
          }
          codeOut = codeA || codeB;
          p2 = _getEdgeIntersection(a2, b2, codeOut, bounds, round);
          newCode = _getBitCode(p2, bounds);
          if (codeOut === codeA) {
            a2 = p2;
            codeA = newCode;
          } else {
            b2 = p2;
            codeB = newCode;
          }
        }
      }
      function _getEdgeIntersection(a2, b2, code, bounds, round) {
        var dx = b2.x - a2.x, dy = b2.y - a2.y, min = bounds.min, max = bounds.max, x2, y2;
        if (code & 8) {
          x2 = a2.x + dx * (max.y - a2.y) / dy;
          y2 = max.y;
        } else if (code & 4) {
          x2 = a2.x + dx * (min.y - a2.y) / dy;
          y2 = min.y;
        } else if (code & 2) {
          x2 = max.x;
          y2 = a2.y + dy * (max.x - a2.x) / dx;
        } else if (code & 1) {
          x2 = min.x;
          y2 = a2.y + dy * (min.x - a2.x) / dx;
        }
        return new Point(x2, y2, round);
      }
      function _getBitCode(p2, bounds) {
        var code = 0;
        if (p2.x < bounds.min.x) {
          code |= 1;
        } else if (p2.x > bounds.max.x) {
          code |= 2;
        }
        if (p2.y < bounds.min.y) {
          code |= 4;
        } else if (p2.y > bounds.max.y) {
          code |= 8;
        }
        return code;
      }
      function _sqDist(p1, p2) {
        var dx = p2.x - p1.x, dy = p2.y - p1.y;
        return dx * dx + dy * dy;
      }
      function _sqClosestPointOnSegment(p2, p1, p22, sqDist2) {
        var x2 = p1.x, y2 = p1.y, dx = p22.x - x2, dy = p22.y - y2, dot = dx * dx + dy * dy, t2;
        if (dot > 0) {
          t2 = ((p2.x - x2) * dx + (p2.y - y2) * dy) / dot;
          if (t2 > 1) {
            x2 = p22.x;
            y2 = p22.y;
          } else if (t2 > 0) {
            x2 += dx * t2;
            y2 += dy * t2;
          }
        }
        dx = p2.x - x2;
        dy = p2.y - y2;
        return sqDist2 ? dx * dx + dy * dy : new Point(x2, y2);
      }
      function isFlat(latlngs) {
        return !isArray(latlngs[0]) || typeof latlngs[0][0] !== "object" && typeof latlngs[0][0] !== "undefined";
      }
      function _flat(latlngs) {
        console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead.");
        return isFlat(latlngs);
      }
      function polylineCenter(latlngs, crs) {
        var i2, halfDist, segDist, dist, p1, p2, ratio, center;
        if (!latlngs || latlngs.length === 0) {
          throw new Error("latlngs not passed");
        }
        if (!isFlat(latlngs)) {
          console.warn("latlngs are not flat! Only the first ring will be used");
          latlngs = latlngs[0];
        }
        var centroidLatLng = toLatLng([0, 0]);
        var bounds = toLatLngBounds(latlngs);
        var areaBounds = bounds.getNorthWest().distanceTo(bounds.getSouthWest()) * bounds.getNorthEast().distanceTo(bounds.getNorthWest());
        if (areaBounds < 1700) {
          centroidLatLng = centroid(latlngs);
        }
        var len = latlngs.length;
        var points = [];
        for (i2 = 0; i2 < len; i2++) {
          var latlng = toLatLng(latlngs[i2]);
          points.push(crs.project(toLatLng([latlng.lat - centroidLatLng.lat, latlng.lng - centroidLatLng.lng])));
        }
        for (i2 = 0, halfDist = 0; i2 < len - 1; i2++) {
          halfDist += points[i2].distanceTo(points[i2 + 1]) / 2;
        }
        if (halfDist === 0) {
          center = points[0];
        } else {
          for (i2 = 0, dist = 0; i2 < len - 1; i2++) {
            p1 = points[i2];
            p2 = points[i2 + 1];
            segDist = p1.distanceTo(p2);
            dist += segDist;
            if (dist > halfDist) {
              ratio = (dist - halfDist) / segDist;
              center = [
                p2.x - ratio * (p2.x - p1.x),
                p2.y - ratio * (p2.y - p1.y)
              ];
              break;
            }
          }
        }
        var latlngCenter = crs.unproject(toPoint(center));
        return toLatLng([latlngCenter.lat + centroidLatLng.lat, latlngCenter.lng + centroidLatLng.lng]);
      }
      var LineUtil = {
        __proto__: null,
        simplify,
        pointToSegmentDistance,
        closestPointOnSegment,
        clipSegment,
        _getEdgeIntersection,
        _getBitCode,
        _sqClosestPointOnSegment,
        isFlat,
        _flat,
        polylineCenter
      };
      var LonLat = {
        project: function(latlng) {
          return new Point(latlng.lng, latlng.lat);
        },
        unproject: function(point) {
          return new LatLng(point.y, point.x);
        },
        bounds: new Bounds([-180, -90], [180, 90])
      };
      var Mercator = {
        R: 6378137,
        R_MINOR: 6356752314245179e-9,
        bounds: new Bounds([-2003750834279e-5, -1549657073972e-5], [2003750834279e-5, 1876465623138e-5]),
        project: function(latlng) {
          var d2 = Math.PI / 180, r2 = this.R, y2 = latlng.lat * d2, tmp = this.R_MINOR / r2, e2 = Math.sqrt(1 - tmp * tmp), con = e2 * Math.sin(y2);
          var ts = Math.tan(Math.PI / 4 - y2 / 2) / Math.pow((1 - con) / (1 + con), e2 / 2);
          y2 = -r2 * Math.log(Math.max(ts, 1e-10));
          return new Point(latlng.lng * d2 * r2, y2);
        },
        unproject: function(point) {
          var d2 = 180 / Math.PI, r2 = this.R, tmp = this.R_MINOR / r2, e2 = Math.sqrt(1 - tmp * tmp), ts = Math.exp(-point.y / r2), phi = Math.PI / 2 - 2 * Math.atan(ts);
          for (var i2 = 0, dphi = 0.1, con; i2 < 15 && Math.abs(dphi) > 1e-7; i2++) {
            con = e2 * Math.sin(phi);
            con = Math.pow((1 - con) / (1 + con), e2 / 2);
            dphi = Math.PI / 2 - 2 * Math.atan(ts * con) - phi;
            phi += dphi;
          }
          return new LatLng(phi * d2, point.x * d2 / r2);
        }
      };
      var index = {
        __proto__: null,
        LonLat,
        Mercator,
        SphericalMercator
      };
      var EPSG3395 = extend2({}, Earth, {
        code: "EPSG:3395",
        projection: Mercator,
        transformation: (function() {
          var scale2 = 0.5 / (Math.PI * Mercator.R);
          return toTransformation(scale2, 0.5, -scale2, 0.5);
        })()
      });
      var EPSG4326 = extend2({}, Earth, {
        code: "EPSG:4326",
        projection: LonLat,
        transformation: toTransformation(1 / 180, 1, -1 / 180, 0.5)
      });
      var Simple = extend2({}, CRS, {
        projection: LonLat,
        transformation: toTransformation(1, 0, -1, 0),
        scale: function(zoom2) {
          return Math.pow(2, zoom2);
        },
        zoom: function(scale2) {
          return Math.log(scale2) / Math.LN2;
        },
        distance: function(latlng1, latlng2) {
          var dx = latlng2.lng - latlng1.lng, dy = latlng2.lat - latlng1.lat;
          return Math.sqrt(dx * dx + dy * dy);
        },
        infinite: true
      });
      CRS.Earth = Earth;
      CRS.EPSG3395 = EPSG3395;
      CRS.EPSG3857 = EPSG3857;
      CRS.EPSG900913 = EPSG900913;
      CRS.EPSG4326 = EPSG4326;
      CRS.Simple = Simple;
      var Layer = Evented.extend({
        // Classes extending `L.Layer` will inherit the following options:
        options: {
          // @option pane: String = 'overlayPane'
          // By default the layer will be added to the map's [overlay pane](#map-overlaypane). Overriding this option will cause the layer to be placed on another pane by default.
          pane: "overlayPane",
          // @option attribution: String = null
          // String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers.
          attribution: null,
          bubblingMouseEvents: true
        },
        /* @section
         * Classes extending `L.Layer` will inherit the following methods:
         *
         * @method addTo(map: Map|LayerGroup): this
         * Adds the layer to the given map or layer group.
         */
        addTo: function(map) {
          map.addLayer(this);
          return this;
        },
        // @method remove: this
        // Removes the layer from the map it is currently active on.
        remove: function() {
          return this.removeFrom(this._map || this._mapToAdd);
        },
        // @method removeFrom(map: Map): this
        // Removes the layer from the given map
        //
        // @alternative
        // @method removeFrom(group: LayerGroup): this
        // Removes the layer from the given `LayerGroup`
        removeFrom: function(obj) {
          if (obj) {
            obj.removeLayer(this);
          }
          return this;
        },
        // @method getPane(name? : String): HTMLElement
        // Returns the `HTMLElement` representing the named pane on the map. If `name` is omitted, returns the pane for this layer.
        getPane: function(name) {
          return this._map.getPane(name ? this.options[name] || name : this.options.pane);
        },
        addInteractiveTarget: function(targetEl) {
          this._map._targets[stamp(targetEl)] = this;
          return this;
        },
        removeInteractiveTarget: function(targetEl) {
          delete this._map._targets[stamp(targetEl)];
          return this;
        },
        // @method getAttribution: String
        // Used by the `attribution control`, returns the [attribution option](#gridlayer-attribution).
        getAttribution: function() {
          return this.options.attribution;
        },
        _layerAdd: function(e2) {
          var map = e2.target;
          if (!map.hasLayer(this)) {
            return;
          }
          this._map = map;
          this._zoomAnimated = map._zoomAnimated;
          if (this.getEvents) {
            var events = this.getEvents();
            map.on(events, this);
            this.once("remove", function() {
              map.off(events, this);
            }, this);
          }
          this.onAdd(map);
          this.fire("add");
          map.fire("layeradd", { layer: this });
        }
      });
      Map.include({
        // @method addLayer(layer: Layer): this
        // Adds the given layer to the map
        addLayer: function(layer) {
          if (!layer._layerAdd) {
            throw new Error("The provided object is not a Layer.");
          }
          var id = stamp(layer);
          if (this._layers[id]) {
            return this;
          }
          this._layers[id] = layer;
          layer._mapToAdd = this;
          if (layer.beforeAdd) {
            layer.beforeAdd(this);
          }
          this.whenReady(layer._layerAdd, layer);
          return this;
        },
        // @method removeLayer(layer: Layer): this
        // Removes the given layer from the map.
        removeLayer: function(layer) {
          var id = stamp(layer);
          if (!this._layers[id]) {
            return this;
          }
          if (this._loaded) {
            layer.onRemove(this);
          }
          delete this._layers[id];
          if (this._loaded) {
            this.fire("layerremove", { layer });
            layer.fire("remove");
          }
          layer._map = layer._mapToAdd = null;
          return this;
        },
        // @method hasLayer(layer: Layer): Boolean
        // Returns `true` if the given layer is currently added to the map
        hasLayer: function(layer) {
          return stamp(layer) in this._layers;
        },
        /* @method eachLayer(fn: Function, context?: Object): this
         * Iterates over the layers of the map, optionally specifying context of the iterator function.
         * ```
         * map.eachLayer(function(layer){
         *     layer.bindPopup('Hello');
         * });
         * ```
         */
        eachLayer: function(method, context) {
          for (var i2 in this._layers) {
            method.call(context, this._layers[i2]);
          }
          return this;
        },
        _addLayers: function(layers2) {
          layers2 = layers2 ? isArray(layers2) ? layers2 : [layers2] : [];
          for (var i2 = 0, len = layers2.length; i2 < len; i2++) {
            this.addLayer(layers2[i2]);
          }
        },
        _addZoomLimit: function(layer) {
          if (!isNaN(layer.options.maxZoom) || !isNaN(layer.options.minZoom)) {
            this._zoomBoundLayers[stamp(layer)] = layer;
            this._updateZoomLevels();
          }
        },
        _removeZoomLimit: function(layer) {
          var id = stamp(layer);
          if (this._zoomBoundLayers[id]) {
            delete this._zoomBoundLayers[id];
            this._updateZoomLevels();
          }
        },
        _updateZoomLevels: function() {
          var minZoom = Infinity, maxZoom = -Infinity, oldZoomSpan = this._getZoomSpan();
          for (var i2 in this._zoomBoundLayers) {
            var options = this._zoomBoundLayers[i2].options;
            minZoom = options.minZoom === void 0 ? minZoom : Math.min(minZoom, options.minZoom);
            maxZoom = options.maxZoom === void 0 ? maxZoom : Math.max(maxZoom, options.maxZoom);
          }
          this._layersMaxZoom = maxZoom === -Infinity ? void 0 : maxZoom;
          this._layersMinZoom = minZoom === Infinity ? void 0 : minZoom;
          if (oldZoomSpan !== this._getZoomSpan()) {
            this.fire("zoomlevelschange");
          }
          if (this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom) {
            this.setZoom(this._layersMaxZoom);
          }
          if (this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom) {
            this.setZoom(this._layersMinZoom);
          }
        }
      });
      var LayerGroup = Layer.extend({
        initialize: function(layers2, options) {
          setOptions(this, options);
          this._layers = {};
          var i2, len;
          if (layers2) {
            for (i2 = 0, len = layers2.length; i2 < len; i2++) {
              this.addLayer(layers2[i2]);
            }
          }
        },
        // @method addLayer(layer: Layer): this
        // Adds the given layer to the group.
        addLayer: function(layer) {
          var id = this.getLayerId(layer);
          this._layers[id] = layer;
          if (this._map) {
            this._map.addLayer(layer);
          }
          return this;
        },
        // @method removeLayer(layer: Layer): this
        // Removes the given layer from the group.
        // @alternative
        // @method removeLayer(id: Number): this
        // Removes the layer with the given internal ID from the group.
        removeLayer: function(layer) {
          var id = layer in this._layers ? layer : this.getLayerId(layer);
          if (this._map && this._layers[id]) {
            this._map.removeLayer(this._layers[id]);
          }
          delete this._layers[id];
          return this;
        },
        // @method hasLayer(layer: Layer): Boolean
        // Returns `true` if the given layer is currently added to the group.
        // @alternative
        // @method hasLayer(id: Number): Boolean
        // Returns `true` if the given internal ID is currently added to the group.
        hasLayer: function(layer) {
          var layerId = typeof layer === "number" ? layer : this.getLayerId(layer);
          return layerId in this._layers;
        },
        // @method clearLayers(): this
        // Removes all the layers from the group.
        clearLayers: function() {
          return this.eachLayer(this.removeLayer, this);
        },
        // @method invoke(methodName: String, …): this
        // Calls `methodName` on every layer contained in this group, passing any
        // additional parameters. Has no effect if the layers contained do not
        // implement `methodName`.
        invoke: function(methodName) {
          var args = Array.prototype.slice.call(arguments, 1), i2, layer;
          for (i2 in this._layers) {
            layer = this._layers[i2];
            if (layer[methodName]) {
              layer[methodName].apply(layer, args);
            }
          }
          return this;
        },
        onAdd: function(map) {
          this.eachLayer(map.addLayer, map);
        },
        onRemove: function(map) {
          this.eachLayer(map.removeLayer, map);
        },
        // @method eachLayer(fn: Function, context?: Object): this
        // Iterates over the layers of the group, optionally specifying context of the iterator function.
        // ```js
        // group.eachLayer(function (layer) {
        // 	layer.bindPopup('Hello');
        // });
        // ```
        eachLayer: function(method, context) {
          for (var i2 in this._layers) {
            method.call(context, this._layers[i2]);
          }
          return this;
        },
        // @method getLayer(id: Number): Layer
        // Returns the layer with the given internal ID.
        getLayer: function(id) {
          return this._layers[id];
        },
        // @method getLayers(): Layer[]
        // Returns an array of all the layers added to the group.
        getLayers: function() {
          var layers2 = [];
          this.eachLayer(layers2.push, layers2);
          return layers2;
        },
        // @method setZIndex(zIndex: Number): this
        // Calls `setZIndex` on every layer contained in this group, passing the z-index.
        setZIndex: function(zIndex) {
          return this.invoke("setZIndex", zIndex);
        },
        // @method getLayerId(layer: Layer): Number
        // Returns the internal ID for a layer
        getLayerId: function(layer) {
          return stamp(layer);
        }
      });
      var layerGroup = function(layers2, options) {
        return new LayerGroup(layers2, options);
      };
      var FeatureGroup = LayerGroup.extend({
        addLayer: function(layer) {
          if (this.hasLayer(layer)) {
            return this;
          }
          layer.addEventParent(this);
          LayerGroup.prototype.addLayer.call(this, layer);
          return this.fire("layeradd", { layer });
        },
        removeLayer: function(layer) {
          if (!this.hasLayer(layer)) {
            return this;
          }
          if (layer in this._layers) {
            layer = this._layers[layer];
          }
          layer.removeEventParent(this);
          LayerGroup.prototype.removeLayer.call(this, layer);
          return this.fire("layerremove", { layer });
        },
        // @method setStyle(style: Path options): this
        // Sets the given path options to each layer of the group that has a `setStyle` method.
        setStyle: function(style2) {
          return this.invoke("setStyle", style2);
        },
        // @method bringToFront(): this
        // Brings the layer group to the top of all other layers
        bringToFront: function() {
          return this.invoke("bringToFront");
        },
        // @method bringToBack(): this
        // Brings the layer group to the back of all other layers
        bringToBack: function() {
          return this.invoke("bringToBack");
        },
        // @method getBounds(): LatLngBounds
        // Returns the LatLngBounds of the Feature Group (created from bounds and coordinates of its children).
        getBounds: function() {
          var bounds = new LatLngBounds();
          for (var id in this._layers) {
            var layer = this._layers[id];
            bounds.extend(layer.getBounds ? layer.getBounds() : layer.getLatLng());
          }
          return bounds;
        }
      });
      var featureGroup = function(layers2, options) {
        return new FeatureGroup(layers2, options);
      };
      var Icon = Class.extend({
        /* @section
         * @aka Icon options
         *
         * @option iconUrl: String = null
         * **(required)** The URL to the icon image (absolute or relative to your script path).
         *
         * @option iconRetinaUrl: String = null
         * The URL to a retina sized version of the icon image (absolute or relative to your
         * script path). Used for Retina screen devices.
         *
         * @option iconSize: Point = null
         * Size of the icon image in pixels.
         *
         * @option iconAnchor: Point = null
         * The coordinates of the "tip" of the icon (relative to its top left corner). The icon
         * will be aligned so that this point is at the marker's geographical location. Centered
         * by default if size is specified, also can be set in CSS with negative margins.
         *
         * @option popupAnchor: Point = [0, 0]
         * The coordinates of the point from which popups will "open", relative to the icon anchor.
         *
         * @option tooltipAnchor: Point = [0, 0]
         * The coordinates of the point from which tooltips will "open", relative to the icon anchor.
         *
         * @option shadowUrl: String = null
         * The URL to the icon shadow image. If not specified, no shadow image will be created.
         *
         * @option shadowRetinaUrl: String = null
         *
         * @option shadowSize: Point = null
         * Size of the shadow image in pixels.
         *
         * @option shadowAnchor: Point = null
         * The coordinates of the "tip" of the shadow (relative to its top left corner) (the same
         * as iconAnchor if not specified).
         *
         * @option className: String = ''
         * A custom class name to assign to both icon and shadow images. Empty by default.
         */
        options: {
          popupAnchor: [0, 0],
          tooltipAnchor: [0, 0],
          // @option crossOrigin: Boolean|String = false
          // Whether the crossOrigin attribute will be added to the tiles.
          // If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
          // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
          crossOrigin: false
        },
        initialize: function(options) {
          setOptions(this, options);
        },
        // @method createIcon(oldIcon?: HTMLElement): HTMLElement
        // Called internally when the icon has to be shown, returns a `<img>` HTML element
        // styled according to the options.
        createIcon: function(oldIcon) {
          return this._createIcon("icon", oldIcon);
        },
        // @method createShadow(oldIcon?: HTMLElement): HTMLElement
        // As `createIcon`, but for the shadow beneath it.
        createShadow: function(oldIcon) {
          return this._createIcon("shadow", oldIcon);
        },
        _createIcon: function(name, oldIcon) {
          var src = this._getIconUrl(name);
          if (!src) {
            if (name === "icon") {
              throw new Error("iconUrl not set in Icon options (see the docs).");
            }
            return null;
          }
          var img = this._createImg(src, oldIcon && oldIcon.tagName === "IMG" ? oldIcon : null);
          this._setIconStyles(img, name);
          if (this.options.crossOrigin || this.options.crossOrigin === "") {
            img.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin;
          }
          return img;
        },
        _setIconStyles: function(img, name) {
          var options = this.options;
          var sizeOption = options[name + "Size"];
          if (typeof sizeOption === "number") {
            sizeOption = [sizeOption, sizeOption];
          }
          var size = toPoint(sizeOption), anchor = toPoint(name === "shadow" && options.shadowAnchor || options.iconAnchor || size && size.divideBy(2, true));
          img.className = "leaflet-marker-" + name + " " + (options.className || "");
          if (anchor) {
            img.style.marginLeft = -anchor.x + "px";
            img.style.marginTop = -anchor.y + "px";
          }
          if (size) {
            img.style.width = size.x + "px";
            img.style.height = size.y + "px";
          }
        },
        _createImg: function(src, el) {
          el = el || document.createElement("img");
          el.src = src;
          return el;
        },
        _getIconUrl: function(name) {
          return Browser.retina && this.options[name + "RetinaUrl"] || this.options[name + "Url"];
        }
      });
      function icon(options) {
        return new Icon(options);
      }
      var IconDefault = Icon.extend({
        options: {
          iconUrl: "marker-icon.png",
          iconRetinaUrl: "marker-icon-2x.png",
          shadowUrl: "marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
          shadowSize: [41, 41]
        },
        _getIconUrl: function(name) {
          if (typeof IconDefault.imagePath !== "string") {
            IconDefault.imagePath = this._detectIconPath();
          }
          return (this.options.imagePath || IconDefault.imagePath) + Icon.prototype._getIconUrl.call(this, name);
        },
        _stripUrl: function(path) {
          var strip = function(str, re, idx) {
            var match2 = re.exec(str);
            return match2 && match2[idx];
          };
          path = strip(path, /^url\((['"])?(.+)\1\)$/, 2);
          return path && strip(path, /^(.*)marker-icon\.png$/, 1);
        },
        _detectIconPath: function() {
          var el = create$1("div", "leaflet-default-icon-path", document.body);
          var path = getStyle(el, "background-image") || getStyle(el, "backgroundImage");
          document.body.removeChild(el);
          path = this._stripUrl(path);
          if (path) {
            return path;
          }
          var link = document.querySelector('link[href$="leaflet.css"]');
          if (!link) {
            return "";
          }
          return link.href.substring(0, link.href.length - "leaflet.css".length - 1);
        }
      });
      var MarkerDrag = Handler.extend({
        initialize: function(marker2) {
          this._marker = marker2;
        },
        addHooks: function() {
          var icon2 = this._marker._icon;
          if (!this._draggable) {
            this._draggable = new Draggable(icon2, icon2, true);
          }
          this._draggable.on({
            dragstart: this._onDragStart,
            predrag: this._onPreDrag,
            drag: this._onDrag,
            dragend: this._onDragEnd
          }, this).enable();
          addClass(icon2, "leaflet-marker-draggable");
        },
        removeHooks: function() {
          this._draggable.off({
            dragstart: this._onDragStart,
            predrag: this._onPreDrag,
            drag: this._onDrag,
            dragend: this._onDragEnd
          }, this).disable();
          if (this._marker._icon) {
            removeClass(this._marker._icon, "leaflet-marker-draggable");
          }
        },
        moved: function() {
          return this._draggable && this._draggable._moved;
        },
        _adjustPan: function(e2) {
          var marker2 = this._marker, map = marker2._map, speed = this._marker.options.autoPanSpeed, padding = this._marker.options.autoPanPadding, iconPos = getPosition(marker2._icon), bounds = map.getPixelBounds(), origin = map.getPixelOrigin();
          var panBounds = toBounds(
            bounds.min._subtract(origin).add(padding),
            bounds.max._subtract(origin).subtract(padding)
          );
          if (!panBounds.contains(iconPos)) {
            var movement = toPoint(
              (Math.max(panBounds.max.x, iconPos.x) - panBounds.max.x) / (bounds.max.x - panBounds.max.x) - (Math.min(panBounds.min.x, iconPos.x) - panBounds.min.x) / (bounds.min.x - panBounds.min.x),
              (Math.max(panBounds.max.y, iconPos.y) - panBounds.max.y) / (bounds.max.y - panBounds.max.y) - (Math.min(panBounds.min.y, iconPos.y) - panBounds.min.y) / (bounds.min.y - panBounds.min.y)
            ).multiplyBy(speed);
            map.panBy(movement, { animate: false });
            this._draggable._newPos._add(movement);
            this._draggable._startPos._add(movement);
            setPosition(marker2._icon, this._draggable._newPos);
            this._onDrag(e2);
            this._panRequest = requestAnimFrame(this._adjustPan.bind(this, e2));
          }
        },
        _onDragStart: function() {
          this._oldLatLng = this._marker.getLatLng();
          this._marker.closePopup && this._marker.closePopup();
          this._marker.fire("movestart").fire("dragstart");
        },
        _onPreDrag: function(e2) {
          if (this._marker.options.autoPan) {
            cancelAnimFrame(this._panRequest);
            this._panRequest = requestAnimFrame(this._adjustPan.bind(this, e2));
          }
        },
        _onDrag: function(e2) {
          var marker2 = this._marker, shadow = marker2._shadow, iconPos = getPosition(marker2._icon), latlng = marker2._map.layerPointToLatLng(iconPos);
          if (shadow) {
            setPosition(shadow, iconPos);
          }
          marker2._latlng = latlng;
          e2.latlng = latlng;
          e2.oldLatLng = this._oldLatLng;
          marker2.fire("move", e2).fire("drag", e2);
        },
        _onDragEnd: function(e2) {
          cancelAnimFrame(this._panRequest);
          delete this._oldLatLng;
          this._marker.fire("moveend").fire("dragend", e2);
        }
      });
      var Marker3 = Layer.extend({
        // @section
        // @aka Marker options
        options: {
          // @option icon: Icon = *
          // Icon instance to use for rendering the marker.
          // See [Icon documentation](#L.Icon) for details on how to customize the marker icon.
          // If not specified, a common instance of `L.Icon.Default` is used.
          icon: new IconDefault(),
          // Option inherited from "Interactive layer" abstract class
          interactive: true,
          // @option keyboard: Boolean = true
          // Whether the marker can be tabbed to with a keyboard and clicked by pressing enter.
          keyboard: true,
          // @option title: String = ''
          // Text for the browser tooltip that appear on marker hover (no tooltip by default).
          // [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
          title: "",
          // @option alt: String = 'Marker'
          // Text for the `alt` attribute of the icon image.
          // [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
          alt: "Marker",
          // @option zIndexOffset: Number = 0
          // By default, marker images zIndex is set automatically based on its latitude. Use this option if you want to put the marker on top of all others (or below), specifying a high value like `1000` (or high negative value, respectively).
          zIndexOffset: 0,
          // @option opacity: Number = 1.0
          // The opacity of the marker.
          opacity: 1,
          // @option riseOnHover: Boolean = false
          // If `true`, the marker will get on top of others when you hover the mouse over it.
          riseOnHover: false,
          // @option riseOffset: Number = 250
          // The z-index offset used for the `riseOnHover` feature.
          riseOffset: 250,
          // @option pane: String = 'markerPane'
          // `Map pane` where the markers icon will be added.
          pane: "markerPane",
          // @option shadowPane: String = 'shadowPane'
          // `Map pane` where the markers shadow will be added.
          shadowPane: "shadowPane",
          // @option bubblingMouseEvents: Boolean = false
          // When `true`, a mouse event on this marker will trigger the same event on the map
          // (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
          bubblingMouseEvents: false,
          // @option autoPanOnFocus: Boolean = true
          // When `true`, the map will pan whenever the marker is focused (via
          // e.g. pressing `tab` on the keyboard) to ensure the marker is
          // visible within the map's bounds
          autoPanOnFocus: true,
          // @section Draggable marker options
          // @option draggable: Boolean = false
          // Whether the marker is draggable with mouse/touch or not.
          draggable: false,
          // @option autoPan: Boolean = false
          // Whether to pan the map when dragging this marker near its edge or not.
          autoPan: false,
          // @option autoPanPadding: Point = Point(50, 50)
          // Distance (in pixels to the left/right and to the top/bottom) of the
          // map edge to start panning the map.
          autoPanPadding: [50, 50],
          // @option autoPanSpeed: Number = 10
          // Number of pixels the map should pan by.
          autoPanSpeed: 10
        },
        /* @section
         *
         * In addition to [shared layer methods](#Layer) like `addTo()` and `remove()` and [popup methods](#Popup) like bindPopup() you can also use the following methods:
         */
        initialize: function(latlng, options) {
          setOptions(this, options);
          this._latlng = toLatLng(latlng);
        },
        onAdd: function(map) {
          this._zoomAnimated = this._zoomAnimated && map.options.markerZoomAnimation;
          if (this._zoomAnimated) {
            map.on("zoomanim", this._animateZoom, this);
          }
          this._initIcon();
          this.update();
        },
        onRemove: function(map) {
          if (this.dragging && this.dragging.enabled()) {
            this.options.draggable = true;
            this.dragging.removeHooks();
          }
          delete this.dragging;
          if (this._zoomAnimated) {
            map.off("zoomanim", this._animateZoom, this);
          }
          this._removeIcon();
          this._removeShadow();
        },
        getEvents: function() {
          return {
            zoom: this.update,
            viewreset: this.update
          };
        },
        // @method getLatLng: LatLng
        // Returns the current geographical position of the marker.
        getLatLng: function() {
          return this._latlng;
        },
        // @method setLatLng(latlng: LatLng): this
        // Changes the marker position to the given point.
        setLatLng: function(latlng) {
          var oldLatLng = this._latlng;
          this._latlng = toLatLng(latlng);
          this.update();
          return this.fire("move", { oldLatLng, latlng: this._latlng });
        },
        // @method setZIndexOffset(offset: Number): this
        // Changes the [zIndex offset](#marker-zindexoffset) of the marker.
        setZIndexOffset: function(offset) {
          this.options.zIndexOffset = offset;
          return this.update();
        },
        // @method getIcon: Icon
        // Returns the current icon used by the marker
        getIcon: function() {
          return this.options.icon;
        },
        // @method setIcon(icon: Icon): this
        // Changes the marker icon.
        setIcon: function(icon2) {
          this.options.icon = icon2;
          if (this._map) {
            this._initIcon();
            this.update();
          }
          if (this._popup) {
            this.bindPopup(this._popup, this._popup.options);
          }
          return this;
        },
        getElement: function() {
          return this._icon;
        },
        update: function() {
          if (this._icon && this._map) {
            var pos = this._map.latLngToLayerPoint(this._latlng).round();
            this._setPos(pos);
          }
          return this;
        },
        _initIcon: function() {
          var options = this.options, classToAdd = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
          var icon2 = options.icon.createIcon(this._icon), addIcon = false;
          if (icon2 !== this._icon) {
            if (this._icon) {
              this._removeIcon();
            }
            addIcon = true;
            if (options.title) {
              icon2.title = options.title;
            }
            if (icon2.tagName === "IMG") {
              icon2.alt = options.alt || "";
            }
          }
          addClass(icon2, classToAdd);
          if (options.keyboard) {
            icon2.tabIndex = "0";
            icon2.setAttribute("role", "button");
          }
          this._icon = icon2;
          if (options.riseOnHover) {
            this.on({
              mouseover: this._bringToFront,
              mouseout: this._resetZIndex
            });
          }
          if (this.options.autoPanOnFocus) {
            on(icon2, "focus", this._panOnFocus, this);
          }
          var newShadow = options.icon.createShadow(this._shadow), addShadow = false;
          if (newShadow !== this._shadow) {
            this._removeShadow();
            addShadow = true;
          }
          if (newShadow) {
            addClass(newShadow, classToAdd);
            newShadow.alt = "";
          }
          this._shadow = newShadow;
          if (options.opacity < 1) {
            this._updateOpacity();
          }
          if (addIcon) {
            this.getPane().appendChild(this._icon);
          }
          this._initInteraction();
          if (newShadow && addShadow) {
            this.getPane(options.shadowPane).appendChild(this._shadow);
          }
        },
        _removeIcon: function() {
          if (this.options.riseOnHover) {
            this.off({
              mouseover: this._bringToFront,
              mouseout: this._resetZIndex
            });
          }
          if (this.options.autoPanOnFocus) {
            off(this._icon, "focus", this._panOnFocus, this);
          }
          remove(this._icon);
          this.removeInteractiveTarget(this._icon);
          this._icon = null;
        },
        _removeShadow: function() {
          if (this._shadow) {
            remove(this._shadow);
          }
          this._shadow = null;
        },
        _setPos: function(pos) {
          if (this._icon) {
            setPosition(this._icon, pos);
          }
          if (this._shadow) {
            setPosition(this._shadow, pos);
          }
          this._zIndex = pos.y + this.options.zIndexOffset;
          this._resetZIndex();
        },
        _updateZIndex: function(offset) {
          if (this._icon) {
            this._icon.style.zIndex = this._zIndex + offset;
          }
        },
        _animateZoom: function(opt) {
          var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center).round();
          this._setPos(pos);
        },
        _initInteraction: function() {
          if (!this.options.interactive) {
            return;
          }
          addClass(this._icon, "leaflet-interactive");
          this.addInteractiveTarget(this._icon);
          if (MarkerDrag) {
            var draggable = this.options.draggable;
            if (this.dragging) {
              draggable = this.dragging.enabled();
              this.dragging.disable();
            }
            this.dragging = new MarkerDrag(this);
            if (draggable) {
              this.dragging.enable();
            }
          }
        },
        // @method setOpacity(opacity: Number): this
        // Changes the opacity of the marker.
        setOpacity: function(opacity) {
          this.options.opacity = opacity;
          if (this._map) {
            this._updateOpacity();
          }
          return this;
        },
        _updateOpacity: function() {
          var opacity = this.options.opacity;
          if (this._icon) {
            setOpacity(this._icon, opacity);
          }
          if (this._shadow) {
            setOpacity(this._shadow, opacity);
          }
        },
        _bringToFront: function() {
          this._updateZIndex(this.options.riseOffset);
        },
        _resetZIndex: function() {
          this._updateZIndex(0);
        },
        _panOnFocus: function() {
          var map = this._map;
          if (!map) {
            return;
          }
          var iconOpts = this.options.icon.options;
          var size = iconOpts.iconSize ? toPoint(iconOpts.iconSize) : toPoint(0, 0);
          var anchor = iconOpts.iconAnchor ? toPoint(iconOpts.iconAnchor) : toPoint(0, 0);
          map.panInside(this._latlng, {
            paddingTopLeft: anchor,
            paddingBottomRight: size.subtract(anchor)
          });
        },
        _getPopupAnchor: function() {
          return this.options.icon.options.popupAnchor;
        },
        _getTooltipAnchor: function() {
          return this.options.icon.options.tooltipAnchor;
        }
      });
      function marker(latlng, options) {
        return new Marker3(latlng, options);
      }
      var Path = Layer.extend({
        // @section
        // @aka Path options
        options: {
          // @option stroke: Boolean = true
          // Whether to draw stroke along the path. Set it to `false` to disable borders on polygons or circles.
          stroke: true,
          // @option color: String = '#3388ff'
          // Stroke color
          color: "#3388ff",
          // @option weight: Number = 3
          // Stroke width in pixels
          weight: 3,
          // @option opacity: Number = 1.0
          // Stroke opacity
          opacity: 1,
          // @option lineCap: String= 'round'
          // A string that defines [shape to be used at the end](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap) of the stroke.
          lineCap: "round",
          // @option lineJoin: String = 'round'
          // A string that defines [shape to be used at the corners](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linejoin) of the stroke.
          lineJoin: "round",
          // @option dashArray: String = null
          // A string that defines the stroke [dash pattern](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dasharray). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
          dashArray: null,
          // @option dashOffset: String = null
          // A string that defines the [distance into the dash pattern to start the dash](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dashoffset). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
          dashOffset: null,
          // @option fill: Boolean = depends
          // Whether to fill the path with color. Set it to `false` to disable filling on polygons or circles.
          fill: false,
          // @option fillColor: String = *
          // Fill color. Defaults to the value of the [`color`](#path-color) option
          fillColor: null,
          // @option fillOpacity: Number = 0.2
          // Fill opacity.
          fillOpacity: 0.2,
          // @option fillRule: String = 'evenodd'
          // A string that defines [how the inside of a shape](https://developer.mozilla.org/docs/Web/SVG/Attribute/fill-rule) is determined.
          fillRule: "evenodd",
          // className: '',
          // Option inherited from "Interactive layer" abstract class
          interactive: true,
          // @option bubblingMouseEvents: Boolean = true
          // When `true`, a mouse event on this path will trigger the same event on the map
          // (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
          bubblingMouseEvents: true
        },
        beforeAdd: function(map) {
          this._renderer = map.getRenderer(this);
        },
        onAdd: function() {
          this._renderer._initPath(this);
          this._reset();
          this._renderer._addPath(this);
        },
        onRemove: function() {
          this._renderer._removePath(this);
        },
        // @method redraw(): this
        // Redraws the layer. Sometimes useful after you changed the coordinates that the path uses.
        redraw: function() {
          if (this._map) {
            this._renderer._updatePath(this);
          }
          return this;
        },
        // @method setStyle(style: Path options): this
        // Changes the appearance of a Path based on the options in the `Path options` object.
        setStyle: function(style2) {
          setOptions(this, style2);
          if (this._renderer) {
            this._renderer._updateStyle(this);
            if (this.options.stroke && style2 && Object.prototype.hasOwnProperty.call(style2, "weight")) {
              this._updateBounds();
            }
          }
          return this;
        },
        // @method bringToFront(): this
        // Brings the layer to the top of all path layers.
        bringToFront: function() {
          if (this._renderer) {
            this._renderer._bringToFront(this);
          }
          return this;
        },
        // @method bringToBack(): this
        // Brings the layer to the bottom of all path layers.
        bringToBack: function() {
          if (this._renderer) {
            this._renderer._bringToBack(this);
          }
          return this;
        },
        getElement: function() {
          return this._path;
        },
        _reset: function() {
          this._project();
          this._update();
        },
        _clickTolerance: function() {
          return (this.options.stroke ? this.options.weight / 2 : 0) + (this._renderer.options.tolerance || 0);
        }
      });
      var CircleMarker = Path.extend({
        // @section
        // @aka CircleMarker options
        options: {
          fill: true,
          // @option radius: Number = 10
          // Radius of the circle marker, in pixels
          radius: 10
        },
        initialize: function(latlng, options) {
          setOptions(this, options);
          this._latlng = toLatLng(latlng);
          this._radius = this.options.radius;
        },
        // @method setLatLng(latLng: LatLng): this
        // Sets the position of a circle marker to a new location.
        setLatLng: function(latlng) {
          var oldLatLng = this._latlng;
          this._latlng = toLatLng(latlng);
          this.redraw();
          return this.fire("move", { oldLatLng, latlng: this._latlng });
        },
        // @method getLatLng(): LatLng
        // Returns the current geographical position of the circle marker
        getLatLng: function() {
          return this._latlng;
        },
        // @method setRadius(radius: Number): this
        // Sets the radius of a circle marker. Units are in pixels.
        setRadius: function(radius) {
          this.options.radius = this._radius = radius;
          return this.redraw();
        },
        // @method getRadius(): Number
        // Returns the current radius of the circle
        getRadius: function() {
          return this._radius;
        },
        setStyle: function(options) {
          var radius = options && options.radius || this._radius;
          Path.prototype.setStyle.call(this, options);
          this.setRadius(radius);
          return this;
        },
        _project: function() {
          this._point = this._map.latLngToLayerPoint(this._latlng);
          this._updateBounds();
        },
        _updateBounds: function() {
          var r2 = this._radius, r22 = this._radiusY || r2, w2 = this._clickTolerance(), p2 = [r2 + w2, r22 + w2];
          this._pxBounds = new Bounds(this._point.subtract(p2), this._point.add(p2));
        },
        _update: function() {
          if (this._map) {
            this._updatePath();
          }
        },
        _updatePath: function() {
          this._renderer._updateCircle(this);
        },
        _empty: function() {
          return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
        },
        // Needed by the `Canvas` renderer for interactivity
        _containsPoint: function(p2) {
          return p2.distanceTo(this._point) <= this._radius + this._clickTolerance();
        }
      });
      function circleMarker(latlng, options) {
        return new CircleMarker(latlng, options);
      }
      var Circle2 = CircleMarker.extend({
        initialize: function(latlng, options, legacyOptions) {
          if (typeof options === "number") {
            options = extend2({}, legacyOptions, { radius: options });
          }
          setOptions(this, options);
          this._latlng = toLatLng(latlng);
          if (isNaN(this.options.radius)) {
            throw new Error("Circle radius cannot be NaN");
          }
          this._mRadius = this.options.radius;
        },
        // @method setRadius(radius: Number): this
        // Sets the radius of a circle. Units are in meters.
        setRadius: function(radius) {
          this._mRadius = radius;
          return this.redraw();
        },
        // @method getRadius(): Number
        // Returns the current radius of a circle. Units are in meters.
        getRadius: function() {
          return this._mRadius;
        },
        // @method getBounds(): LatLngBounds
        // Returns the `LatLngBounds` of the path.
        getBounds: function() {
          var half = [this._radius, this._radiusY || this._radius];
          return new LatLngBounds(
            this._map.layerPointToLatLng(this._point.subtract(half)),
            this._map.layerPointToLatLng(this._point.add(half))
          );
        },
        setStyle: Path.prototype.setStyle,
        _project: function() {
          var lng = this._latlng.lng, lat = this._latlng.lat, map = this._map, crs = map.options.crs;
          if (crs.distance === Earth.distance) {
            var d2 = Math.PI / 180, latR = this._mRadius / Earth.R / d2, top = map.project([lat + latR, lng]), bottom = map.project([lat - latR, lng]), p2 = top.add(bottom).divideBy(2), lat2 = map.unproject(p2).lat, lngR = Math.acos((Math.cos(latR * d2) - Math.sin(lat * d2) * Math.sin(lat2 * d2)) / (Math.cos(lat * d2) * Math.cos(lat2 * d2))) / d2;
            if (isNaN(lngR) || lngR === 0) {
              lngR = latR / Math.cos(Math.PI / 180 * lat);
            }
            this._point = p2.subtract(map.getPixelOrigin());
            this._radius = isNaN(lngR) ? 0 : p2.x - map.project([lat2, lng - lngR]).x;
            this._radiusY = p2.y - top.y;
          } else {
            var latlng2 = crs.unproject(crs.project(this._latlng).subtract([this._mRadius, 0]));
            this._point = map.latLngToLayerPoint(this._latlng);
            this._radius = this._point.x - map.latLngToLayerPoint(latlng2).x;
          }
          this._updateBounds();
        }
      });
      function circle(latlng, options, legacyOptions) {
        return new Circle2(latlng, options, legacyOptions);
      }
      var Polyline2 = Path.extend({
        // @section
        // @aka Polyline options
        options: {
          // @option smoothFactor: Number = 1.0
          // How much to simplify the polyline on each zoom level. More means
          // better performance and smoother look, and less means more accurate representation.
          smoothFactor: 1,
          // @option noClip: Boolean = false
          // Disable polyline clipping.
          noClip: false
        },
        initialize: function(latlngs, options) {
          setOptions(this, options);
          this._setLatLngs(latlngs);
        },
        // @method getLatLngs(): LatLng[]
        // Returns an array of the points in the path, or nested arrays of points in case of multi-polyline.
        getLatLngs: function() {
          return this._latlngs;
        },
        // @method setLatLngs(latlngs: LatLng[]): this
        // Replaces all the points in the polyline with the given array of geographical points.
        setLatLngs: function(latlngs) {
          this._setLatLngs(latlngs);
          return this.redraw();
        },
        // @method isEmpty(): Boolean
        // Returns `true` if the Polyline has no LatLngs.
        isEmpty: function() {
          return !this._latlngs.length;
        },
        // @method closestLayerPoint(p: Point): Point
        // Returns the point closest to `p` on the Polyline.
        closestLayerPoint: function(p2) {
          var minDistance = Infinity, minPoint = null, closest = _sqClosestPointOnSegment, p1, p22;
          for (var j = 0, jLen = this._parts.length; j < jLen; j++) {
            var points = this._parts[j];
            for (var i2 = 1, len = points.length; i2 < len; i2++) {
              p1 = points[i2 - 1];
              p22 = points[i2];
              var sqDist2 = closest(p2, p1, p22, true);
              if (sqDist2 < minDistance) {
                minDistance = sqDist2;
                minPoint = closest(p2, p1, p22);
              }
            }
          }
          if (minPoint) {
            minPoint.distance = Math.sqrt(minDistance);
          }
          return minPoint;
        },
        // @method getCenter(): LatLng
        // Returns the center ([centroid](https://en.wikipedia.org/wiki/Centroid)) of the polyline.
        getCenter: function() {
          if (!this._map) {
            throw new Error("Must add layer to map before using getCenter()");
          }
          return polylineCenter(this._defaultShape(), this._map.options.crs);
        },
        // @method getBounds(): LatLngBounds
        // Returns the `LatLngBounds` of the path.
        getBounds: function() {
          return this._bounds;
        },
        // @method addLatLng(latlng: LatLng, latlngs?: LatLng[]): this
        // Adds a given point to the polyline. By default, adds to the first ring of
        // the polyline in case of a multi-polyline, but can be overridden by passing
        // a specific ring as a LatLng array (that you can earlier access with [`getLatLngs`](#polyline-getlatlngs)).
        addLatLng: function(latlng, latlngs) {
          latlngs = latlngs || this._defaultShape();
          latlng = toLatLng(latlng);
          latlngs.push(latlng);
          this._bounds.extend(latlng);
          return this.redraw();
        },
        _setLatLngs: function(latlngs) {
          this._bounds = new LatLngBounds();
          this._latlngs = this._convertLatLngs(latlngs);
        },
        _defaultShape: function() {
          return isFlat(this._latlngs) ? this._latlngs : this._latlngs[0];
        },
        // recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
        _convertLatLngs: function(latlngs) {
          var result = [], flat = isFlat(latlngs);
          for (var i2 = 0, len = latlngs.length; i2 < len; i2++) {
            if (flat) {
              result[i2] = toLatLng(latlngs[i2]);
              this._bounds.extend(result[i2]);
            } else {
              result[i2] = this._convertLatLngs(latlngs[i2]);
            }
          }
          return result;
        },
        _project: function() {
          var pxBounds = new Bounds();
          this._rings = [];
          this._projectLatlngs(this._latlngs, this._rings, pxBounds);
          if (this._bounds.isValid() && pxBounds.isValid()) {
            this._rawPxBounds = pxBounds;
            this._updateBounds();
          }
        },
        _updateBounds: function() {
          var w2 = this._clickTolerance(), p2 = new Point(w2, w2);
          if (!this._rawPxBounds) {
            return;
          }
          this._pxBounds = new Bounds([
            this._rawPxBounds.min.subtract(p2),
            this._rawPxBounds.max.add(p2)
          ]);
        },
        // recursively turns latlngs into a set of rings with projected coordinates
        _projectLatlngs: function(latlngs, result, projectedBounds) {
          var flat = latlngs[0] instanceof LatLng, len = latlngs.length, i2, ring;
          if (flat) {
            ring = [];
            for (i2 = 0; i2 < len; i2++) {
              ring[i2] = this._map.latLngToLayerPoint(latlngs[i2]);
              projectedBounds.extend(ring[i2]);
            }
            result.push(ring);
          } else {
            for (i2 = 0; i2 < len; i2++) {
              this._projectLatlngs(latlngs[i2], result, projectedBounds);
            }
          }
        },
        // clip polyline by renderer bounds so that we have less to render for performance
        _clipPoints: function() {
          var bounds = this._renderer._bounds;
          this._parts = [];
          if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
            return;
          }
          if (this.options.noClip) {
            this._parts = this._rings;
            return;
          }
          var parts = this._parts, i2, j, k, len, len2, segment, points;
          for (i2 = 0, k = 0, len = this._rings.length; i2 < len; i2++) {
            points = this._rings[i2];
            for (j = 0, len2 = points.length; j < len2 - 1; j++) {
              segment = clipSegment(points[j], points[j + 1], bounds, j, true);
              if (!segment) {
                continue;
              }
              parts[k] = parts[k] || [];
              parts[k].push(segment[0]);
              if (segment[1] !== points[j + 1] || j === len2 - 2) {
                parts[k].push(segment[1]);
                k++;
              }
            }
          }
        },
        // simplify each clipped part of the polyline for performance
        _simplifyPoints: function() {
          var parts = this._parts, tolerance = this.options.smoothFactor;
          for (var i2 = 0, len = parts.length; i2 < len; i2++) {
            parts[i2] = simplify(parts[i2], tolerance);
          }
        },
        _update: function() {
          if (!this._map) {
            return;
          }
          this._clipPoints();
          this._simplifyPoints();
          this._updatePath();
        },
        _updatePath: function() {
          this._renderer._updatePoly(this);
        },
        // Needed by the `Canvas` renderer for interactivity
        _containsPoint: function(p2, closed) {
          var i2, j, k, len, len2, part, w2 = this._clickTolerance();
          if (!this._pxBounds || !this._pxBounds.contains(p2)) {
            return false;
          }
          for (i2 = 0, len = this._parts.length; i2 < len; i2++) {
            part = this._parts[i2];
            for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
              if (!closed && j === 0) {
                continue;
              }
              if (pointToSegmentDistance(p2, part[k], part[j]) <= w2) {
                return true;
              }
            }
          }
          return false;
        }
      });
      function polyline(latlngs, options) {
        return new Polyline2(latlngs, options);
      }
      Polyline2._flat = _flat;
      var Polygon2 = Polyline2.extend({
        options: {
          fill: true
        },
        isEmpty: function() {
          return !this._latlngs.length || !this._latlngs[0].length;
        },
        // @method getCenter(): LatLng
        // Returns the center ([centroid](http://en.wikipedia.org/wiki/Centroid)) of the Polygon.
        getCenter: function() {
          if (!this._map) {
            throw new Error("Must add layer to map before using getCenter()");
          }
          return polygonCenter(this._defaultShape(), this._map.options.crs);
        },
        _convertLatLngs: function(latlngs) {
          var result = Polyline2.prototype._convertLatLngs.call(this, latlngs), len = result.length;
          if (len >= 2 && result[0] instanceof LatLng && result[0].equals(result[len - 1])) {
            result.pop();
          }
          return result;
        },
        _setLatLngs: function(latlngs) {
          Polyline2.prototype._setLatLngs.call(this, latlngs);
          if (isFlat(this._latlngs)) {
            this._latlngs = [this._latlngs];
          }
        },
        _defaultShape: function() {
          return isFlat(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
        },
        _clipPoints: function() {
          var bounds = this._renderer._bounds, w2 = this.options.weight, p2 = new Point(w2, w2);
          bounds = new Bounds(bounds.min.subtract(p2), bounds.max.add(p2));
          this._parts = [];
          if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
            return;
          }
          if (this.options.noClip) {
            this._parts = this._rings;
            return;
          }
          for (var i2 = 0, len = this._rings.length, clipped; i2 < len; i2++) {
            clipped = clipPolygon(this._rings[i2], bounds, true);
            if (clipped.length) {
              this._parts.push(clipped);
            }
          }
        },
        _updatePath: function() {
          this._renderer._updatePoly(this, true);
        },
        // Needed by the `Canvas` renderer for interactivity
        _containsPoint: function(p2) {
          var inside = false, part, p1, p22, i2, j, k, len, len2;
          if (!this._pxBounds || !this._pxBounds.contains(p2)) {
            return false;
          }
          for (i2 = 0, len = this._parts.length; i2 < len; i2++) {
            part = this._parts[i2];
            for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
              p1 = part[j];
              p22 = part[k];
              if (p1.y > p2.y !== p22.y > p2.y && p2.x < (p22.x - p1.x) * (p2.y - p1.y) / (p22.y - p1.y) + p1.x) {
                inside = !inside;
              }
            }
          }
          return inside || Polyline2.prototype._containsPoint.call(this, p2, true);
        }
      });
      function polygon(latlngs, options) {
        return new Polygon2(latlngs, options);
      }
      var GeoJSON = FeatureGroup.extend({
        /* @section
         * @aka GeoJSON options
         *
         * @option pointToLayer: Function = *
         * A `Function` defining how GeoJSON points spawn Leaflet layers. It is internally
         * called when data is added, passing the GeoJSON point feature and its `LatLng`.
         * The default is to spawn a default `Marker`:
         * ```js
         * function(geoJsonPoint, latlng) {
         * 	return L.marker(latlng);
         * }
         * ```
         *
         * @option style: Function = *
         * A `Function` defining the `Path options` for styling GeoJSON lines and polygons,
         * called internally when data is added.
         * The default value is to not override any defaults:
         * ```js
         * function (geoJsonFeature) {
         * 	return {}
         * }
         * ```
         *
         * @option onEachFeature: Function = *
         * A `Function` that will be called once for each created `Feature`, after it has
         * been created and styled. Useful for attaching events and popups to features.
         * The default is to do nothing with the newly created layers:
         * ```js
         * function (feature, layer) {}
         * ```
         *
         * @option filter: Function = *
         * A `Function` that will be used to decide whether to include a feature or not.
         * The default is to include all features:
         * ```js
         * function (geoJsonFeature) {
         * 	return true;
         * }
         * ```
         * Note: dynamically changing the `filter` option will have effect only on newly
         * added data. It will _not_ re-evaluate already included features.
         *
         * @option coordsToLatLng: Function = *
         * A `Function` that will be used for converting GeoJSON coordinates to `LatLng`s.
         * The default is the `coordsToLatLng` static method.
         *
         * @option markersInheritOptions: Boolean = false
         * Whether default Markers for "Point" type Features inherit from group options.
         */
        initialize: function(geojson, options) {
          setOptions(this, options);
          this._layers = {};
          if (geojson) {
            this.addData(geojson);
          }
        },
        // @method addData( <GeoJSON> data ): this
        // Adds a GeoJSON object to the layer.
        addData: function(geojson) {
          var features = isArray(geojson) ? geojson : geojson.features, i2, len, feature;
          if (features) {
            for (i2 = 0, len = features.length; i2 < len; i2++) {
              feature = features[i2];
              if (feature.geometries || feature.geometry || feature.features || feature.coordinates) {
                this.addData(feature);
              }
            }
            return this;
          }
          var options = this.options;
          if (options.filter && !options.filter(geojson)) {
            return this;
          }
          var layer = geometryToLayer(geojson, options);
          if (!layer) {
            return this;
          }
          layer.feature = asFeature(geojson);
          layer.defaultOptions = layer.options;
          this.resetStyle(layer);
          if (options.onEachFeature) {
            options.onEachFeature(geojson, layer);
          }
          return this.addLayer(layer);
        },
        // @method resetStyle( <Path> layer? ): this
        // Resets the given vector layer's style to the original GeoJSON style, useful for resetting style after hover events.
        // If `layer` is omitted, the style of all features in the current layer is reset.
        resetStyle: function(layer) {
          if (layer === void 0) {
            return this.eachLayer(this.resetStyle, this);
          }
          layer.options = extend2({}, layer.defaultOptions);
          this._setLayerStyle(layer, this.options.style);
          return this;
        },
        // @method setStyle( <Function> style ): this
        // Changes styles of GeoJSON vector layers with the given style function.
        setStyle: function(style2) {
          return this.eachLayer(function(layer) {
            this._setLayerStyle(layer, style2);
          }, this);
        },
        _setLayerStyle: function(layer, style2) {
          if (layer.setStyle) {
            if (typeof style2 === "function") {
              style2 = style2(layer.feature);
            }
            layer.setStyle(style2);
          }
        }
      });
      function geometryToLayer(geojson, options) {
        var geometry = geojson.type === "Feature" ? geojson.geometry : geojson, coords = geometry ? geometry.coordinates : null, layers2 = [], pointToLayer = options && options.pointToLayer, _coordsToLatLng = options && options.coordsToLatLng || coordsToLatLng, latlng, latlngs, i2, len;
        if (!coords && !geometry) {
          return null;
        }
        switch (geometry.type) {
          case "Point":
            latlng = _coordsToLatLng(coords);
            return _pointToLayer(pointToLayer, geojson, latlng, options);
          case "MultiPoint":
            for (i2 = 0, len = coords.length; i2 < len; i2++) {
              latlng = _coordsToLatLng(coords[i2]);
              layers2.push(_pointToLayer(pointToLayer, geojson, latlng, options));
            }
            return new FeatureGroup(layers2);
          case "LineString":
          case "MultiLineString":
            latlngs = coordsToLatLngs(coords, geometry.type === "LineString" ? 0 : 1, _coordsToLatLng);
            return new Polyline2(latlngs, options);
          case "Polygon":
          case "MultiPolygon":
            latlngs = coordsToLatLngs(coords, geometry.type === "Polygon" ? 1 : 2, _coordsToLatLng);
            return new Polygon2(latlngs, options);
          case "GeometryCollection":
            for (i2 = 0, len = geometry.geometries.length; i2 < len; i2++) {
              var geoLayer = geometryToLayer({
                geometry: geometry.geometries[i2],
                type: "Feature",
                properties: geojson.properties
              }, options);
              if (geoLayer) {
                layers2.push(geoLayer);
              }
            }
            return new FeatureGroup(layers2);
          case "FeatureCollection":
            for (i2 = 0, len = geometry.features.length; i2 < len; i2++) {
              var featureLayer = geometryToLayer(geometry.features[i2], options);
              if (featureLayer) {
                layers2.push(featureLayer);
              }
            }
            return new FeatureGroup(layers2);
          default:
            throw new Error("Invalid GeoJSON object.");
        }
      }
      function _pointToLayer(pointToLayerFn, geojson, latlng, options) {
        return pointToLayerFn ? pointToLayerFn(geojson, latlng) : new Marker3(latlng, options && options.markersInheritOptions && options);
      }
      function coordsToLatLng(coords) {
        return new LatLng(coords[1], coords[0], coords[2]);
      }
      function coordsToLatLngs(coords, levelsDeep, _coordsToLatLng) {
        var latlngs = [];
        for (var i2 = 0, len = coords.length, latlng; i2 < len; i2++) {
          latlng = levelsDeep ? coordsToLatLngs(coords[i2], levelsDeep - 1, _coordsToLatLng) : (_coordsToLatLng || coordsToLatLng)(coords[i2]);
          latlngs.push(latlng);
        }
        return latlngs;
      }
      function latLngToCoords(latlng, precision) {
        latlng = toLatLng(latlng);
        return latlng.alt !== void 0 ? [formatNum(latlng.lng, precision), formatNum(latlng.lat, precision), formatNum(latlng.alt, precision)] : [formatNum(latlng.lng, precision), formatNum(latlng.lat, precision)];
      }
      function latLngsToCoords(latlngs, levelsDeep, closed, precision) {
        var coords = [];
        for (var i2 = 0, len = latlngs.length; i2 < len; i2++) {
          coords.push(levelsDeep ? latLngsToCoords(latlngs[i2], isFlat(latlngs[i2]) ? 0 : levelsDeep - 1, closed, precision) : latLngToCoords(latlngs[i2], precision));
        }
        if (!levelsDeep && closed && coords.length > 0) {
          coords.push(coords[0].slice());
        }
        return coords;
      }
      function getFeature(layer, newGeometry) {
        return layer.feature ? extend2({}, layer.feature, { geometry: newGeometry }) : asFeature(newGeometry);
      }
      function asFeature(geojson) {
        if (geojson.type === "Feature" || geojson.type === "FeatureCollection") {
          return geojson;
        }
        return {
          type: "Feature",
          properties: {},
          geometry: geojson
        };
      }
      var PointToGeoJSON = {
        toGeoJSON: function(precision) {
          return getFeature(this, {
            type: "Point",
            coordinates: latLngToCoords(this.getLatLng(), precision)
          });
        }
      };
      Marker3.include(PointToGeoJSON);
      Circle2.include(PointToGeoJSON);
      CircleMarker.include(PointToGeoJSON);
      Polyline2.include({
        toGeoJSON: function(precision) {
          var multi = !isFlat(this._latlngs);
          var coords = latLngsToCoords(this._latlngs, multi ? 1 : 0, false, precision);
          return getFeature(this, {
            type: (multi ? "Multi" : "") + "LineString",
            coordinates: coords
          });
        }
      });
      Polygon2.include({
        toGeoJSON: function(precision) {
          var holes = !isFlat(this._latlngs), multi = holes && !isFlat(this._latlngs[0]);
          var coords = latLngsToCoords(this._latlngs, multi ? 2 : holes ? 1 : 0, true, precision);
          if (!holes) {
            coords = [coords];
          }
          return getFeature(this, {
            type: (multi ? "Multi" : "") + "Polygon",
            coordinates: coords
          });
        }
      });
      LayerGroup.include({
        toMultiPoint: function(precision) {
          var coords = [];
          this.eachLayer(function(layer) {
            coords.push(layer.toGeoJSON(precision).geometry.coordinates);
          });
          return getFeature(this, {
            type: "MultiPoint",
            coordinates: coords
          });
        },
        // @method toGeoJSON(precision?: Number|false): Object
        // Coordinates values are rounded with [`formatNum`](#util-formatnum) function with given `precision`.
        // Returns a [`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) representation of the layer group (as a GeoJSON `FeatureCollection`, `GeometryCollection`, or `MultiPoint`).
        toGeoJSON: function(precision) {
          var type = this.feature && this.feature.geometry && this.feature.geometry.type;
          if (type === "MultiPoint") {
            return this.toMultiPoint(precision);
          }
          var isGeometryCollection = type === "GeometryCollection", jsons = [];
          this.eachLayer(function(layer) {
            if (layer.toGeoJSON) {
              var json = layer.toGeoJSON(precision);
              if (isGeometryCollection) {
                jsons.push(json.geometry);
              } else {
                var feature = asFeature(json);
                if (feature.type === "FeatureCollection") {
                  jsons.push.apply(jsons, feature.features);
                } else {
                  jsons.push(feature);
                }
              }
            }
          });
          if (isGeometryCollection) {
            return getFeature(this, {
              geometries: jsons,
              type: "GeometryCollection"
            });
          }
          return {
            type: "FeatureCollection",
            features: jsons
          };
        }
      });
      function geoJSON(geojson, options) {
        return new GeoJSON(geojson, options);
      }
      var geoJson = geoJSON;
      var ImageOverlay = Layer.extend({
        // @section
        // @aka ImageOverlay options
        options: {
          // @option opacity: Number = 1.0
          // The opacity of the image overlay.
          opacity: 1,
          // @option alt: String = ''
          // Text for the `alt` attribute of the image (useful for accessibility).
          alt: "",
          // @option interactive: Boolean = false
          // If `true`, the image overlay will emit [mouse events](#interactive-layer) when clicked or hovered.
          interactive: false,
          // @option crossOrigin: Boolean|String = false
          // Whether the crossOrigin attribute will be added to the image.
          // If a String is provided, the image will have its crossOrigin attribute set to the String provided. This is needed if you want to access image pixel data.
          // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
          crossOrigin: false,
          // @option errorOverlayUrl: String = ''
          // URL to the overlay image to show in place of the overlay that failed to load.
          errorOverlayUrl: "",
          // @option zIndex: Number = 1
          // The explicit [zIndex](https://developer.mozilla.org/docs/Web/CSS/CSS_Positioning/Understanding_z_index) of the overlay layer.
          zIndex: 1,
          // @option className: String = ''
          // A custom class name to assign to the image. Empty by default.
          className: ""
        },
        initialize: function(url, bounds, options) {
          this._url = url;
          this._bounds = toLatLngBounds(bounds);
          setOptions(this, options);
        },
        onAdd: function() {
          if (!this._image) {
            this._initImage();
            if (this.options.opacity < 1) {
              this._updateOpacity();
            }
          }
          if (this.options.interactive) {
            addClass(this._image, "leaflet-interactive");
            this.addInteractiveTarget(this._image);
          }
          this.getPane().appendChild(this._image);
          this._reset();
        },
        onRemove: function() {
          remove(this._image);
          if (this.options.interactive) {
            this.removeInteractiveTarget(this._image);
          }
        },
        // @method setOpacity(opacity: Number): this
        // Sets the opacity of the overlay.
        setOpacity: function(opacity) {
          this.options.opacity = opacity;
          if (this._image) {
            this._updateOpacity();
          }
          return this;
        },
        setStyle: function(styleOpts) {
          if (styleOpts.opacity) {
            this.setOpacity(styleOpts.opacity);
          }
          return this;
        },
        // @method bringToFront(): this
        // Brings the layer to the top of all overlays.
        bringToFront: function() {
          if (this._map) {
            toFront(this._image);
          }
          return this;
        },
        // @method bringToBack(): this
        // Brings the layer to the bottom of all overlays.
        bringToBack: function() {
          if (this._map) {
            toBack(this._image);
          }
          return this;
        },
        // @method setUrl(url: String): this
        // Changes the URL of the image.
        setUrl: function(url) {
          this._url = url;
          if (this._image) {
            this._image.src = url;
          }
          return this;
        },
        // @method setBounds(bounds: LatLngBounds): this
        // Update the bounds that this ImageOverlay covers
        setBounds: function(bounds) {
          this._bounds = toLatLngBounds(bounds);
          if (this._map) {
            this._reset();
          }
          return this;
        },
        getEvents: function() {
          var events = {
            zoom: this._reset,
            viewreset: this._reset
          };
          if (this._zoomAnimated) {
            events.zoomanim = this._animateZoom;
          }
          return events;
        },
        // @method setZIndex(value: Number): this
        // Changes the [zIndex](#imageoverlay-zindex) of the image overlay.
        setZIndex: function(value) {
          this.options.zIndex = value;
          this._updateZIndex();
          return this;
        },
        // @method getBounds(): LatLngBounds
        // Get the bounds that this ImageOverlay covers
        getBounds: function() {
          return this._bounds;
        },
        // @method getElement(): HTMLElement
        // Returns the instance of [`HTMLImageElement`](https://developer.mozilla.org/docs/Web/API/HTMLImageElement)
        // used by this overlay.
        getElement: function() {
          return this._image;
        },
        _initImage: function() {
          var wasElementSupplied = this._url.tagName === "IMG";
          var img = this._image = wasElementSupplied ? this._url : create$1("img");
          addClass(img, "leaflet-image-layer");
          if (this._zoomAnimated) {
            addClass(img, "leaflet-zoom-animated");
          }
          if (this.options.className) {
            addClass(img, this.options.className);
          }
          img.onselectstart = falseFn;
          img.onmousemove = falseFn;
          img.onload = bind(this.fire, this, "load");
          img.onerror = bind(this._overlayOnError, this, "error");
          if (this.options.crossOrigin || this.options.crossOrigin === "") {
            img.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin;
          }
          if (this.options.zIndex) {
            this._updateZIndex();
          }
          if (wasElementSupplied) {
            this._url = img.src;
            return;
          }
          img.src = this._url;
          img.alt = this.options.alt;
        },
        _animateZoom: function(e2) {
          var scale2 = this._map.getZoomScale(e2.zoom), offset = this._map._latLngBoundsToNewLayerBounds(this._bounds, e2.zoom, e2.center).min;
          setTransform(this._image, offset, scale2);
        },
        _reset: function() {
          var image = this._image, bounds = new Bounds(
            this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
            this._map.latLngToLayerPoint(this._bounds.getSouthEast())
          ), size = bounds.getSize();
          setPosition(image, bounds.min);
          image.style.width = size.x + "px";
          image.style.height = size.y + "px";
        },
        _updateOpacity: function() {
          setOpacity(this._image, this.options.opacity);
        },
        _updateZIndex: function() {
          if (this._image && this.options.zIndex !== void 0 && this.options.zIndex !== null) {
            this._image.style.zIndex = this.options.zIndex;
          }
        },
        _overlayOnError: function() {
          this.fire("error");
          var errorUrl = this.options.errorOverlayUrl;
          if (errorUrl && this._url !== errorUrl) {
            this._url = errorUrl;
            this._image.src = errorUrl;
          }
        },
        // @method getCenter(): LatLng
        // Returns the center of the ImageOverlay.
        getCenter: function() {
          return this._bounds.getCenter();
        }
      });
      var imageOverlay = function(url, bounds, options) {
        return new ImageOverlay(url, bounds, options);
      };
      var VideoOverlay = ImageOverlay.extend({
        // @section
        // @aka VideoOverlay options
        options: {
          // @option autoplay: Boolean = true
          // Whether the video starts playing automatically when loaded.
          // On some browsers autoplay will only work with `muted: true`
          autoplay: true,
          // @option loop: Boolean = true
          // Whether the video will loop back to the beginning when played.
          loop: true,
          // @option keepAspectRatio: Boolean = true
          // Whether the video will save aspect ratio after the projection.
          // Relevant for supported browsers. See [browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)
          keepAspectRatio: true,
          // @option muted: Boolean = false
          // Whether the video starts on mute when loaded.
          muted: false,
          // @option playsInline: Boolean = true
          // Mobile browsers will play the video right where it is instead of open it up in fullscreen mode.
          playsInline: true
        },
        _initImage: function() {
          var wasElementSupplied = this._url.tagName === "VIDEO";
          var vid = this._image = wasElementSupplied ? this._url : create$1("video");
          addClass(vid, "leaflet-image-layer");
          if (this._zoomAnimated) {
            addClass(vid, "leaflet-zoom-animated");
          }
          if (this.options.className) {
            addClass(vid, this.options.className);
          }
          vid.onselectstart = falseFn;
          vid.onmousemove = falseFn;
          vid.onloadeddata = bind(this.fire, this, "load");
          if (wasElementSupplied) {
            var sourceElements = vid.getElementsByTagName("source");
            var sources = [];
            for (var j = 0; j < sourceElements.length; j++) {
              sources.push(sourceElements[j].src);
            }
            this._url = sourceElements.length > 0 ? sources : [vid.src];
            return;
          }
          if (!isArray(this._url)) {
            this._url = [this._url];
          }
          if (!this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(vid.style, "objectFit")) {
            vid.style["objectFit"] = "fill";
          }
          vid.autoplay = !!this.options.autoplay;
          vid.loop = !!this.options.loop;
          vid.muted = !!this.options.muted;
          vid.playsInline = !!this.options.playsInline;
          for (var i2 = 0; i2 < this._url.length; i2++) {
            var source = create$1("source");
            source.src = this._url[i2];
            vid.appendChild(source);
          }
        }
        // @method getElement(): HTMLVideoElement
        // Returns the instance of [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
        // used by this overlay.
      });
      function videoOverlay(video, bounds, options) {
        return new VideoOverlay(video, bounds, options);
      }
      var SVGOverlay = ImageOverlay.extend({
        _initImage: function() {
          var el = this._image = this._url;
          addClass(el, "leaflet-image-layer");
          if (this._zoomAnimated) {
            addClass(el, "leaflet-zoom-animated");
          }
          if (this.options.className) {
            addClass(el, this.options.className);
          }
          el.onselectstart = falseFn;
          el.onmousemove = falseFn;
        }
        // @method getElement(): SVGElement
        // Returns the instance of [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)
        // used by this overlay.
      });
      function svgOverlay(el, bounds, options) {
        return new SVGOverlay(el, bounds, options);
      }
      var DivOverlay = Layer.extend({
        // @section
        // @aka DivOverlay options
        options: {
          // @option interactive: Boolean = false
          // If true, the popup/tooltip will listen to the mouse events.
          interactive: false,
          // @option offset: Point = Point(0, 0)
          // The offset of the overlay position.
          offset: [0, 0],
          // @option className: String = ''
          // A custom CSS class name to assign to the overlay.
          className: "",
          // @option pane: String = undefined
          // `Map pane` where the overlay will be added.
          pane: void 0,
          // @option content: String|HTMLElement|Function = ''
          // Sets the HTML content of the overlay while initializing. If a function is passed the source layer will be
          // passed to the function. The function should return a `String` or `HTMLElement` to be used in the overlay.
          content: ""
        },
        initialize: function(options, source) {
          if (options && (options instanceof LatLng || isArray(options))) {
            this._latlng = toLatLng(options);
            setOptions(this, source);
          } else {
            setOptions(this, options);
            this._source = source;
          }
          if (this.options.content) {
            this._content = this.options.content;
          }
        },
        // @method openOn(map: Map): this
        // Adds the overlay to the map.
        // Alternative to `map.openPopup(popup)`/`.openTooltip(tooltip)`.
        openOn: function(map) {
          map = arguments.length ? map : this._source._map;
          if (!map.hasLayer(this)) {
            map.addLayer(this);
          }
          return this;
        },
        // @method close(): this
        // Closes the overlay.
        // Alternative to `map.closePopup(popup)`/`.closeTooltip(tooltip)`
        // and `layer.closePopup()`/`.closeTooltip()`.
        close: function() {
          if (this._map) {
            this._map.removeLayer(this);
          }
          return this;
        },
        // @method toggle(layer?: Layer): this
        // Opens or closes the overlay bound to layer depending on its current state.
        // Argument may be omitted only for overlay bound to layer.
        // Alternative to `layer.togglePopup()`/`.toggleTooltip()`.
        toggle: function(layer) {
          if (this._map) {
            this.close();
          } else {
            if (arguments.length) {
              this._source = layer;
            } else {
              layer = this._source;
            }
            this._prepareOpen();
            this.openOn(layer._map);
          }
          return this;
        },
        onAdd: function(map) {
          this._zoomAnimated = map._zoomAnimated;
          if (!this._container) {
            this._initLayout();
          }
          if (map._fadeAnimated) {
            setOpacity(this._container, 0);
          }
          clearTimeout(this._removeTimeout);
          this.getPane().appendChild(this._container);
          this.update();
          if (map._fadeAnimated) {
            setOpacity(this._container, 1);
          }
          this.bringToFront();
          if (this.options.interactive) {
            addClass(this._container, "leaflet-interactive");
            this.addInteractiveTarget(this._container);
          }
        },
        onRemove: function(map) {
          if (map._fadeAnimated) {
            setOpacity(this._container, 0);
            this._removeTimeout = setTimeout(bind(remove, void 0, this._container), 200);
          } else {
            remove(this._container);
          }
          if (this.options.interactive) {
            removeClass(this._container, "leaflet-interactive");
            this.removeInteractiveTarget(this._container);
          }
        },
        // @namespace DivOverlay
        // @method getLatLng: LatLng
        // Returns the geographical point of the overlay.
        getLatLng: function() {
          return this._latlng;
        },
        // @method setLatLng(latlng: LatLng): this
        // Sets the geographical point where the overlay will open.
        setLatLng: function(latlng) {
          this._latlng = toLatLng(latlng);
          if (this._map) {
            this._updatePosition();
            this._adjustPan();
          }
          return this;
        },
        // @method getContent: String|HTMLElement
        // Returns the content of the overlay.
        getContent: function() {
          return this._content;
        },
        // @method setContent(htmlContent: String|HTMLElement|Function): this
        // Sets the HTML content of the overlay. If a function is passed the source layer will be passed to the function.
        // The function should return a `String` or `HTMLElement` to be used in the overlay.
        setContent: function(content) {
          this._content = content;
          this.update();
          return this;
        },
        // @method getElement: String|HTMLElement
        // Returns the HTML container of the overlay.
        getElement: function() {
          return this._container;
        },
        // @method update: null
        // Updates the overlay content, layout and position. Useful for updating the overlay after something inside changed, e.g. image loaded.
        update: function() {
          if (!this._map) {
            return;
          }
          this._container.style.visibility = "hidden";
          this._updateContent();
          this._updateLayout();
          this._updatePosition();
          this._container.style.visibility = "";
          this._adjustPan();
        },
        getEvents: function() {
          var events = {
            zoom: this._updatePosition,
            viewreset: this._updatePosition
          };
          if (this._zoomAnimated) {
            events.zoomanim = this._animateZoom;
          }
          return events;
        },
        // @method isOpen: Boolean
        // Returns `true` when the overlay is visible on the map.
        isOpen: function() {
          return !!this._map && this._map.hasLayer(this);
        },
        // @method bringToFront: this
        // Brings this overlay in front of other overlays (in the same map pane).
        bringToFront: function() {
          if (this._map) {
            toFront(this._container);
          }
          return this;
        },
        // @method bringToBack: this
        // Brings this overlay to the back of other overlays (in the same map pane).
        bringToBack: function() {
          if (this._map) {
            toBack(this._container);
          }
          return this;
        },
        // prepare bound overlay to open: update latlng pos / content source (for FeatureGroup)
        _prepareOpen: function(latlng) {
          var source = this._source;
          if (!source._map) {
            return false;
          }
          if (source instanceof FeatureGroup) {
            source = null;
            var layers2 = this._source._layers;
            for (var id in layers2) {
              if (layers2[id]._map) {
                source = layers2[id];
                break;
              }
            }
            if (!source) {
              return false;
            }
            this._source = source;
          }
          if (!latlng) {
            if (source.getCenter) {
              latlng = source.getCenter();
            } else if (source.getLatLng) {
              latlng = source.getLatLng();
            } else if (source.getBounds) {
              latlng = source.getBounds().getCenter();
            } else {
              throw new Error("Unable to get source layer LatLng.");
            }
          }
          this.setLatLng(latlng);
          if (this._map) {
            this.update();
          }
          return true;
        },
        _updateContent: function() {
          if (!this._content) {
            return;
          }
          var node2 = this._contentNode;
          var content = typeof this._content === "function" ? this._content(this._source || this) : this._content;
          if (typeof content === "string") {
            node2.innerHTML = content;
          } else {
            while (node2.hasChildNodes()) {
              node2.removeChild(node2.firstChild);
            }
            node2.appendChild(content);
          }
          this.fire("contentupdate");
        },
        _updatePosition: function() {
          if (!this._map) {
            return;
          }
          var pos = this._map.latLngToLayerPoint(this._latlng), offset = toPoint(this.options.offset), anchor = this._getAnchor();
          if (this._zoomAnimated) {
            setPosition(this._container, pos.add(anchor));
          } else {
            offset = offset.add(pos).add(anchor);
          }
          var bottom = this._containerBottom = -offset.y, left = this._containerLeft = -Math.round(this._containerWidth / 2) + offset.x;
          this._container.style.bottom = bottom + "px";
          this._container.style.left = left + "px";
        },
        _getAnchor: function() {
          return [0, 0];
        }
      });
      Map.include({
        _initOverlay: function(OverlayClass, content, latlng, options) {
          var overlay = content;
          if (!(overlay instanceof OverlayClass)) {
            overlay = new OverlayClass(options).setContent(content);
          }
          if (latlng) {
            overlay.setLatLng(latlng);
          }
          return overlay;
        }
      });
      Layer.include({
        _initOverlay: function(OverlayClass, old, content, options) {
          var overlay = content;
          if (overlay instanceof OverlayClass) {
            setOptions(overlay, options);
            overlay._source = this;
          } else {
            overlay = old && !options ? old : new OverlayClass(options, this);
            overlay.setContent(content);
          }
          return overlay;
        }
      });
      var Popup2 = DivOverlay.extend({
        // @section
        // @aka Popup options
        options: {
          // @option pane: String = 'popupPane'
          // `Map pane` where the popup will be added.
          pane: "popupPane",
          // @option offset: Point = Point(0, 7)
          // The offset of the popup position.
          offset: [0, 7],
          // @option maxWidth: Number = 300
          // Max width of the popup, in pixels.
          maxWidth: 300,
          // @option minWidth: Number = 50
          // Min width of the popup, in pixels.
          minWidth: 50,
          // @option maxHeight: Number = null
          // If set, creates a scrollable container of the given height
          // inside a popup if its content exceeds it.
          // The scrollable container can be styled using the
          // `leaflet-popup-scrolled` CSS class selector.
          maxHeight: null,
          // @option autoPan: Boolean = true
          // Set it to `false` if you don't want the map to do panning animation
          // to fit the opened popup.
          autoPan: true,
          // @option autoPanPaddingTopLeft: Point = null
          // The margin between the popup and the top left corner of the map
          // view after autopanning was performed.
          autoPanPaddingTopLeft: null,
          // @option autoPanPaddingBottomRight: Point = null
          // The margin between the popup and the bottom right corner of the map
          // view after autopanning was performed.
          autoPanPaddingBottomRight: null,
          // @option autoPanPadding: Point = Point(5, 5)
          // Equivalent of setting both top left and bottom right autopan padding to the same value.
          autoPanPadding: [5, 5],
          // @option keepInView: Boolean = false
          // Set it to `true` if you want to prevent users from panning the popup
          // off of the screen while it is open.
          keepInView: false,
          // @option closeButton: Boolean = true
          // Controls the presence of a close button in the popup.
          closeButton: true,
          // @option autoClose: Boolean = true
          // Set it to `false` if you want to override the default behavior of
          // the popup closing when another popup is opened.
          autoClose: true,
          // @option closeOnEscapeKey: Boolean = true
          // Set it to `false` if you want to override the default behavior of
          // the ESC key for closing of the popup.
          closeOnEscapeKey: true,
          // @option closeOnClick: Boolean = *
          // Set it if you want to override the default behavior of the popup closing when user clicks
          // on the map. Defaults to the map's [`closePopupOnClick`](#map-closepopuponclick) option.
          // @option className: String = ''
          // A custom CSS class name to assign to the popup.
          className: ""
        },
        // @namespace Popup
        // @method openOn(map: Map): this
        // Alternative to `map.openPopup(popup)`.
        // Adds the popup to the map and closes the previous one.
        openOn: function(map) {
          map = arguments.length ? map : this._source._map;
          if (!map.hasLayer(this) && map._popup && map._popup.options.autoClose) {
            map.removeLayer(map._popup);
          }
          map._popup = this;
          return DivOverlay.prototype.openOn.call(this, map);
        },
        onAdd: function(map) {
          DivOverlay.prototype.onAdd.call(this, map);
          map.fire("popupopen", { popup: this });
          if (this._source) {
            this._source.fire("popupopen", { popup: this }, true);
            if (!(this._source instanceof Path)) {
              this._source.on("preclick", stopPropagation);
            }
          }
        },
        onRemove: function(map) {
          DivOverlay.prototype.onRemove.call(this, map);
          map.fire("popupclose", { popup: this });
          if (this._source) {
            this._source.fire("popupclose", { popup: this }, true);
            if (!(this._source instanceof Path)) {
              this._source.off("preclick", stopPropagation);
            }
          }
        },
        getEvents: function() {
          var events = DivOverlay.prototype.getEvents.call(this);
          if (this.options.closeOnClick !== void 0 ? this.options.closeOnClick : this._map.options.closePopupOnClick) {
            events.preclick = this.close;
          }
          if (this.options.keepInView) {
            events.moveend = this._adjustPan;
          }
          return events;
        },
        _initLayout: function() {
          var prefix2 = "leaflet-popup", container = this._container = create$1(
            "div",
            prefix2 + " " + (this.options.className || "") + " leaflet-zoom-animated"
          );
          var wrapper = this._wrapper = create$1("div", prefix2 + "-content-wrapper", container);
          this._contentNode = create$1("div", prefix2 + "-content", wrapper);
          disableClickPropagation(container);
          disableScrollPropagation(this._contentNode);
          on(container, "contextmenu", stopPropagation);
          this._tipContainer = create$1("div", prefix2 + "-tip-container", container);
          this._tip = create$1("div", prefix2 + "-tip", this._tipContainer);
          if (this.options.closeButton) {
            var closeButton = this._closeButton = create$1("a", prefix2 + "-close-button", container);
            closeButton.setAttribute("role", "button");
            closeButton.setAttribute("aria-label", "Close popup");
            closeButton.href = "#close";
            closeButton.innerHTML = '<span aria-hidden="true">&#215;</span>';
            on(closeButton, "click", function(ev) {
              preventDefault(ev);
              this.close();
            }, this);
          }
        },
        _updateLayout: function() {
          var container = this._contentNode, style2 = container.style;
          style2.width = "";
          style2.whiteSpace = "nowrap";
          var width = container.offsetWidth;
          width = Math.min(width, this.options.maxWidth);
          width = Math.max(width, this.options.minWidth);
          style2.width = width + 1 + "px";
          style2.whiteSpace = "";
          style2.height = "";
          var height = container.offsetHeight, maxHeight = this.options.maxHeight, scrolledClass = "leaflet-popup-scrolled";
          if (maxHeight && height > maxHeight) {
            style2.height = maxHeight + "px";
            addClass(container, scrolledClass);
          } else {
            removeClass(container, scrolledClass);
          }
          this._containerWidth = this._container.offsetWidth;
        },
        _animateZoom: function(e2) {
          var pos = this._map._latLngToNewLayerPoint(this._latlng, e2.zoom, e2.center), anchor = this._getAnchor();
          setPosition(this._container, pos.add(anchor));
        },
        _adjustPan: function() {
          if (!this.options.autoPan) {
            return;
          }
          if (this._map._panAnim) {
            this._map._panAnim.stop();
          }
          if (this._autopanning) {
            this._autopanning = false;
            return;
          }
          var map = this._map, marginBottom = parseInt(getStyle(this._container, "marginBottom"), 10) || 0, containerHeight = this._container.offsetHeight + marginBottom, containerWidth = this._containerWidth, layerPos = new Point(this._containerLeft, -containerHeight - this._containerBottom);
          layerPos._add(getPosition(this._container));
          var containerPos = map.layerPointToContainerPoint(layerPos), padding = toPoint(this.options.autoPanPadding), paddingTL = toPoint(this.options.autoPanPaddingTopLeft || padding), paddingBR = toPoint(this.options.autoPanPaddingBottomRight || padding), size = map.getSize(), dx = 0, dy = 0;
          if (containerPos.x + containerWidth + paddingBR.x > size.x) {
            dx = containerPos.x + containerWidth - size.x + paddingBR.x;
          }
          if (containerPos.x - dx - paddingTL.x < 0) {
            dx = containerPos.x - paddingTL.x;
          }
          if (containerPos.y + containerHeight + paddingBR.y > size.y) {
            dy = containerPos.y + containerHeight - size.y + paddingBR.y;
          }
          if (containerPos.y - dy - paddingTL.y < 0) {
            dy = containerPos.y - paddingTL.y;
          }
          if (dx || dy) {
            if (this.options.keepInView) {
              this._autopanning = true;
            }
            map.fire("autopanstart").panBy([dx, dy]);
          }
        },
        _getAnchor: function() {
          return toPoint(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
        }
      });
      var popup = function(options, source) {
        return new Popup2(options, source);
      };
      Map.mergeOptions({
        closePopupOnClick: true
      });
      Map.include({
        // @method openPopup(popup: Popup): this
        // Opens the specified popup while closing the previously opened (to make sure only one is opened at one time for usability).
        // @alternative
        // @method openPopup(content: String|HTMLElement, latlng: LatLng, options?: Popup options): this
        // Creates a popup with the specified content and options and opens it in the given point on a map.
        openPopup: function(popup2, latlng, options) {
          this._initOverlay(Popup2, popup2, latlng, options).openOn(this);
          return this;
        },
        // @method closePopup(popup?: Popup): this
        // Closes the popup previously opened with [openPopup](#map-openpopup) (or the given one).
        closePopup: function(popup2) {
          popup2 = arguments.length ? popup2 : this._popup;
          if (popup2) {
            popup2.close();
          }
          return this;
        }
      });
      Layer.include({
        // @method bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options): this
        // Binds a popup to the layer with the passed `content` and sets up the
        // necessary event listeners. If a `Function` is passed it will receive
        // the layer as the first argument and should return a `String` or `HTMLElement`.
        bindPopup: function(content, options) {
          this._popup = this._initOverlay(Popup2, this._popup, content, options);
          if (!this._popupHandlersAdded) {
            this.on({
              click: this._openPopup,
              keypress: this._onKeyPress,
              remove: this.closePopup,
              move: this._movePopup
            });
            this._popupHandlersAdded = true;
          }
          return this;
        },
        // @method unbindPopup(): this
        // Removes the popup previously bound with `bindPopup`.
        unbindPopup: function() {
          if (this._popup) {
            this.off({
              click: this._openPopup,
              keypress: this._onKeyPress,
              remove: this.closePopup,
              move: this._movePopup
            });
            this._popupHandlersAdded = false;
            this._popup = null;
          }
          return this;
        },
        // @method openPopup(latlng?: LatLng): this
        // Opens the bound popup at the specified `latlng` or at the default popup anchor if no `latlng` is passed.
        openPopup: function(latlng) {
          if (this._popup) {
            if (!(this instanceof FeatureGroup)) {
              this._popup._source = this;
            }
            if (this._popup._prepareOpen(latlng || this._latlng)) {
              this._popup.openOn(this._map);
            }
          }
          return this;
        },
        // @method closePopup(): this
        // Closes the popup bound to this layer if it is open.
        closePopup: function() {
          if (this._popup) {
            this._popup.close();
          }
          return this;
        },
        // @method togglePopup(): this
        // Opens or closes the popup bound to this layer depending on its current state.
        togglePopup: function() {
          if (this._popup) {
            this._popup.toggle(this);
          }
          return this;
        },
        // @method isPopupOpen(): boolean
        // Returns `true` if the popup bound to this layer is currently open.
        isPopupOpen: function() {
          return this._popup ? this._popup.isOpen() : false;
        },
        // @method setPopupContent(content: String|HTMLElement|Popup): this
        // Sets the content of the popup bound to this layer.
        setPopupContent: function(content) {
          if (this._popup) {
            this._popup.setContent(content);
          }
          return this;
        },
        // @method getPopup(): Popup
        // Returns the popup bound to this layer.
        getPopup: function() {
          return this._popup;
        },
        _openPopup: function(e2) {
          if (!this._popup || !this._map) {
            return;
          }
          stop(e2);
          var target = e2.layer || e2.target;
          if (this._popup._source === target && !(target instanceof Path)) {
            if (this._map.hasLayer(this._popup)) {
              this.closePopup();
            } else {
              this.openPopup(e2.latlng);
            }
            return;
          }
          this._popup._source = target;
          this.openPopup(e2.latlng);
        },
        _movePopup: function(e2) {
          this._popup.setLatLng(e2.latlng);
        },
        _onKeyPress: function(e2) {
          if (e2.originalEvent.keyCode === 13) {
            this._openPopup(e2);
          }
        }
      });
      var Tooltip = DivOverlay.extend({
        // @section
        // @aka Tooltip options
        options: {
          // @option pane: String = 'tooltipPane'
          // `Map pane` where the tooltip will be added.
          pane: "tooltipPane",
          // @option offset: Point = Point(0, 0)
          // Optional offset of the tooltip position.
          offset: [0, 0],
          // @option direction: String = 'auto'
          // Direction where to open the tooltip. Possible values are: `right`, `left`,
          // `top`, `bottom`, `center`, `auto`.
          // `auto` will dynamically switch between `right` and `left` according to the tooltip
          // position on the map.
          direction: "auto",
          // @option permanent: Boolean = false
          // Whether to open the tooltip permanently or only on mouseover.
          permanent: false,
          // @option sticky: Boolean = false
          // If true, the tooltip will follow the mouse instead of being fixed at the feature center.
          sticky: false,
          // @option opacity: Number = 0.9
          // Tooltip container opacity.
          opacity: 0.9
        },
        onAdd: function(map) {
          DivOverlay.prototype.onAdd.call(this, map);
          this.setOpacity(this.options.opacity);
          map.fire("tooltipopen", { tooltip: this });
          if (this._source) {
            this.addEventParent(this._source);
            this._source.fire("tooltipopen", { tooltip: this }, true);
          }
        },
        onRemove: function(map) {
          DivOverlay.prototype.onRemove.call(this, map);
          map.fire("tooltipclose", { tooltip: this });
          if (this._source) {
            this.removeEventParent(this._source);
            this._source.fire("tooltipclose", { tooltip: this }, true);
          }
        },
        getEvents: function() {
          var events = DivOverlay.prototype.getEvents.call(this);
          if (!this.options.permanent) {
            events.preclick = this.close;
          }
          return events;
        },
        _initLayout: function() {
          var prefix2 = "leaflet-tooltip", className = prefix2 + " " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
          this._contentNode = this._container = create$1("div", className);
          this._container.setAttribute("role", "tooltip");
          this._container.setAttribute("id", "leaflet-tooltip-" + stamp(this));
        },
        _updateLayout: function() {
        },
        _adjustPan: function() {
        },
        _setPosition: function(pos) {
          var subX, subY, map = this._map, container = this._container, centerPoint = map.latLngToContainerPoint(map.getCenter()), tooltipPoint = map.layerPointToContainerPoint(pos), direction = this.options.direction, tooltipWidth = container.offsetWidth, tooltipHeight = container.offsetHeight, offset = toPoint(this.options.offset), anchor = this._getAnchor();
          if (direction === "top") {
            subX = tooltipWidth / 2;
            subY = tooltipHeight;
          } else if (direction === "bottom") {
            subX = tooltipWidth / 2;
            subY = 0;
          } else if (direction === "center") {
            subX = tooltipWidth / 2;
            subY = tooltipHeight / 2;
          } else if (direction === "right") {
            subX = 0;
            subY = tooltipHeight / 2;
          } else if (direction === "left") {
            subX = tooltipWidth;
            subY = tooltipHeight / 2;
          } else if (tooltipPoint.x < centerPoint.x) {
            direction = "right";
            subX = 0;
            subY = tooltipHeight / 2;
          } else {
            direction = "left";
            subX = tooltipWidth + (offset.x + anchor.x) * 2;
            subY = tooltipHeight / 2;
          }
          pos = pos.subtract(toPoint(subX, subY, true)).add(offset).add(anchor);
          removeClass(container, "leaflet-tooltip-right");
          removeClass(container, "leaflet-tooltip-left");
          removeClass(container, "leaflet-tooltip-top");
          removeClass(container, "leaflet-tooltip-bottom");
          addClass(container, "leaflet-tooltip-" + direction);
          setPosition(container, pos);
        },
        _updatePosition: function() {
          var pos = this._map.latLngToLayerPoint(this._latlng);
          this._setPosition(pos);
        },
        setOpacity: function(opacity) {
          this.options.opacity = opacity;
          if (this._container) {
            setOpacity(this._container, opacity);
          }
        },
        _animateZoom: function(e2) {
          var pos = this._map._latLngToNewLayerPoint(this._latlng, e2.zoom, e2.center);
          this._setPosition(pos);
        },
        _getAnchor: function() {
          return toPoint(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
        }
      });
      var tooltip = function(options, source) {
        return new Tooltip(options, source);
      };
      Map.include({
        // @method openTooltip(tooltip: Tooltip): this
        // Opens the specified tooltip.
        // @alternative
        // @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
        // Creates a tooltip with the specified content and options and open it.
        openTooltip: function(tooltip2, latlng, options) {
          this._initOverlay(Tooltip, tooltip2, latlng, options).openOn(this);
          return this;
        },
        // @method closeTooltip(tooltip: Tooltip): this
        // Closes the tooltip given as parameter.
        closeTooltip: function(tooltip2) {
          tooltip2.close();
          return this;
        }
      });
      Layer.include({
        // @method bindTooltip(content: String|HTMLElement|Function|Tooltip, options?: Tooltip options): this
        // Binds a tooltip to the layer with the passed `content` and sets up the
        // necessary event listeners. If a `Function` is passed it will receive
        // the layer as the first argument and should return a `String` or `HTMLElement`.
        bindTooltip: function(content, options) {
          if (this._tooltip && this.isTooltipOpen()) {
            this.unbindTooltip();
          }
          this._tooltip = this._initOverlay(Tooltip, this._tooltip, content, options);
          this._initTooltipInteractions();
          if (this._tooltip.options.permanent && this._map && this._map.hasLayer(this)) {
            this.openTooltip();
          }
          return this;
        },
        // @method unbindTooltip(): this
        // Removes the tooltip previously bound with `bindTooltip`.
        unbindTooltip: function() {
          if (this._tooltip) {
            this._initTooltipInteractions(true);
            this.closeTooltip();
            this._tooltip = null;
          }
          return this;
        },
        _initTooltipInteractions: function(remove2) {
          if (!remove2 && this._tooltipHandlersAdded) {
            return;
          }
          var onOff = remove2 ? "off" : "on", events = {
            remove: this.closeTooltip,
            move: this._moveTooltip
          };
          if (!this._tooltip.options.permanent) {
            events.mouseover = this._openTooltip;
            events.mouseout = this.closeTooltip;
            events.click = this._openTooltip;
            if (this._map) {
              this._addFocusListeners();
            } else {
              events.add = this._addFocusListeners;
            }
          } else {
            events.add = this._openTooltip;
          }
          if (this._tooltip.options.sticky) {
            events.mousemove = this._moveTooltip;
          }
          this[onOff](events);
          this._tooltipHandlersAdded = !remove2;
        },
        // @method openTooltip(latlng?: LatLng): this
        // Opens the bound tooltip at the specified `latlng` or at the default tooltip anchor if no `latlng` is passed.
        openTooltip: function(latlng) {
          if (this._tooltip) {
            if (!(this instanceof FeatureGroup)) {
              this._tooltip._source = this;
            }
            if (this._tooltip._prepareOpen(latlng)) {
              this._tooltip.openOn(this._map);
              if (this.getElement) {
                this._setAriaDescribedByOnLayer(this);
              } else if (this.eachLayer) {
                this.eachLayer(this._setAriaDescribedByOnLayer, this);
              }
            }
          }
          return this;
        },
        // @method closeTooltip(): this
        // Closes the tooltip bound to this layer if it is open.
        closeTooltip: function() {
          if (this._tooltip) {
            return this._tooltip.close();
          }
        },
        // @method toggleTooltip(): this
        // Opens or closes the tooltip bound to this layer depending on its current state.
        toggleTooltip: function() {
          if (this._tooltip) {
            this._tooltip.toggle(this);
          }
          return this;
        },
        // @method isTooltipOpen(): boolean
        // Returns `true` if the tooltip bound to this layer is currently open.
        isTooltipOpen: function() {
          return this._tooltip.isOpen();
        },
        // @method setTooltipContent(content: String|HTMLElement|Tooltip): this
        // Sets the content of the tooltip bound to this layer.
        setTooltipContent: function(content) {
          if (this._tooltip) {
            this._tooltip.setContent(content);
          }
          return this;
        },
        // @method getTooltip(): Tooltip
        // Returns the tooltip bound to this layer.
        getTooltip: function() {
          return this._tooltip;
        },
        _addFocusListeners: function() {
          if (this.getElement) {
            this._addFocusListenersOnLayer(this);
          } else if (this.eachLayer) {
            this.eachLayer(this._addFocusListenersOnLayer, this);
          }
        },
        _addFocusListenersOnLayer: function(layer) {
          var el = typeof layer.getElement === "function" && layer.getElement();
          if (el) {
            on(el, "focus", function() {
              this._tooltip._source = layer;
              this.openTooltip();
            }, this);
            on(el, "blur", this.closeTooltip, this);
          }
        },
        _setAriaDescribedByOnLayer: function(layer) {
          var el = typeof layer.getElement === "function" && layer.getElement();
          if (el) {
            el.setAttribute("aria-describedby", this._tooltip._container.id);
          }
        },
        _openTooltip: function(e2) {
          if (!this._tooltip || !this._map) {
            return;
          }
          if (this._map.dragging && this._map.dragging.moving() && !this._openOnceFlag) {
            this._openOnceFlag = true;
            var that = this;
            this._map.once("moveend", function() {
              that._openOnceFlag = false;
              that._openTooltip(e2);
            });
            return;
          }
          this._tooltip._source = e2.layer || e2.target;
          this.openTooltip(this._tooltip.options.sticky ? e2.latlng : void 0);
        },
        _moveTooltip: function(e2) {
          var latlng = e2.latlng, containerPoint, layerPoint;
          if (this._tooltip.options.sticky && e2.originalEvent) {
            containerPoint = this._map.mouseEventToContainerPoint(e2.originalEvent);
            layerPoint = this._map.containerPointToLayerPoint(containerPoint);
            latlng = this._map.layerPointToLatLng(layerPoint);
          }
          this._tooltip.setLatLng(latlng);
        }
      });
      var DivIcon = Icon.extend({
        options: {
          // @section
          // @aka DivIcon options
          iconSize: [12, 12],
          // also can be set through CSS
          // iconAnchor: (Point),
          // popupAnchor: (Point),
          // @option html: String|HTMLElement = ''
          // Custom HTML code to put inside the div element, empty by default. Alternatively,
          // an instance of `HTMLElement`.
          html: false,
          // @option bgPos: Point = [0, 0]
          // Optional relative position of the background, in pixels
          bgPos: null,
          className: "leaflet-div-icon"
        },
        createIcon: function(oldIcon) {
          var div = oldIcon && oldIcon.tagName === "DIV" ? oldIcon : document.createElement("div"), options = this.options;
          if (options.html instanceof Element) {
            empty(div);
            div.appendChild(options.html);
          } else {
            div.innerHTML = options.html !== false ? options.html : "";
          }
          if (options.bgPos) {
            var bgPos = toPoint(options.bgPos);
            div.style.backgroundPosition = -bgPos.x + "px " + -bgPos.y + "px";
          }
          this._setIconStyles(div, "icon");
          return div;
        },
        createShadow: function() {
          return null;
        }
      });
      function divIcon(options) {
        return new DivIcon(options);
      }
      Icon.Default = IconDefault;
      var GridLayer = Layer.extend({
        // @section
        // @aka GridLayer options
        options: {
          // @option tileSize: Number|Point = 256
          // Width and height of tiles in the grid. Use a number if width and height are equal, or `L.point(width, height)` otherwise.
          tileSize: 256,
          // @option opacity: Number = 1.0
          // Opacity of the tiles. Can be used in the `createTile()` function.
          opacity: 1,
          // @option updateWhenIdle: Boolean = (depends)
          // Load new tiles only when panning ends.
          // `true` by default on mobile browsers, in order to avoid too many requests and keep smooth navigation.
          // `false` otherwise in order to display new tiles _during_ panning, since it is easy to pan outside the
          // [`keepBuffer`](#gridlayer-keepbuffer) option in desktop browsers.
          updateWhenIdle: Browser.mobile,
          // @option updateWhenZooming: Boolean = true
          // By default, a smooth zoom animation (during a [touch zoom](#map-touchzoom) or a [`flyTo()`](#map-flyto)) will update grid layers every integer zoom level. Setting this option to `false` will update the grid layer only when the smooth animation ends.
          updateWhenZooming: true,
          // @option updateInterval: Number = 200
          // Tiles will not update more than once every `updateInterval` milliseconds when panning.
          updateInterval: 200,
          // @option zIndex: Number = 1
          // The explicit zIndex of the tile layer.
          zIndex: 1,
          // @option bounds: LatLngBounds = undefined
          // If set, tiles will only be loaded inside the set `LatLngBounds`.
          bounds: null,
          // @option minZoom: Number = 0
          // The minimum zoom level down to which this layer will be displayed (inclusive).
          minZoom: 0,
          // @option maxZoom: Number = undefined
          // The maximum zoom level up to which this layer will be displayed (inclusive).
          maxZoom: void 0,
          // @option maxNativeZoom: Number = undefined
          // Maximum zoom number the tile source has available. If it is specified,
          // the tiles on all zoom levels higher than `maxNativeZoom` will be loaded
          // from `maxNativeZoom` level and auto-scaled.
          maxNativeZoom: void 0,
          // @option minNativeZoom: Number = undefined
          // Minimum zoom number the tile source has available. If it is specified,
          // the tiles on all zoom levels lower than `minNativeZoom` will be loaded
          // from `minNativeZoom` level and auto-scaled.
          minNativeZoom: void 0,
          // @option noWrap: Boolean = false
          // Whether the layer is wrapped around the antimeridian. If `true`, the
          // GridLayer will only be displayed once at low zoom levels. Has no
          // effect when the [map CRS](#map-crs) doesn't wrap around. Can be used
          // in combination with [`bounds`](#gridlayer-bounds) to prevent requesting
          // tiles outside the CRS limits.
          noWrap: false,
          // @option pane: String = 'tilePane'
          // `Map pane` where the grid layer will be added.
          pane: "tilePane",
          // @option className: String = ''
          // A custom class name to assign to the tile layer. Empty by default.
          className: "",
          // @option keepBuffer: Number = 2
          // When panning the map, keep this many rows and columns of tiles before unloading them.
          keepBuffer: 2
        },
        initialize: function(options) {
          setOptions(this, options);
        },
        onAdd: function() {
          this._initContainer();
          this._levels = {};
          this._tiles = {};
          this._resetView();
        },
        beforeAdd: function(map) {
          map._addZoomLimit(this);
        },
        onRemove: function(map) {
          this._removeAllTiles();
          remove(this._container);
          map._removeZoomLimit(this);
          this._container = null;
          this._tileZoom = void 0;
        },
        // @method bringToFront: this
        // Brings the tile layer to the top of all tile layers.
        bringToFront: function() {
          if (this._map) {
            toFront(this._container);
            this._setAutoZIndex(Math.max);
          }
          return this;
        },
        // @method bringToBack: this
        // Brings the tile layer to the bottom of all tile layers.
        bringToBack: function() {
          if (this._map) {
            toBack(this._container);
            this._setAutoZIndex(Math.min);
          }
          return this;
        },
        // @method getContainer: HTMLElement
        // Returns the HTML element that contains the tiles for this layer.
        getContainer: function() {
          return this._container;
        },
        // @method setOpacity(opacity: Number): this
        // Changes the [opacity](#gridlayer-opacity) of the grid layer.
        setOpacity: function(opacity) {
          this.options.opacity = opacity;
          this._updateOpacity();
          return this;
        },
        // @method setZIndex(zIndex: Number): this
        // Changes the [zIndex](#gridlayer-zindex) of the grid layer.
        setZIndex: function(zIndex) {
          this.options.zIndex = zIndex;
          this._updateZIndex();
          return this;
        },
        // @method isLoading: Boolean
        // Returns `true` if any tile in the grid layer has not finished loading.
        isLoading: function() {
          return this._loading;
        },
        // @method redraw: this
        // Causes the layer to clear all the tiles and request them again.
        redraw: function() {
          if (this._map) {
            this._removeAllTiles();
            var tileZoom = this._clampZoom(this._map.getZoom());
            if (tileZoom !== this._tileZoom) {
              this._tileZoom = tileZoom;
              this._updateLevels();
            }
            this._update();
          }
          return this;
        },
        getEvents: function() {
          var events = {
            viewprereset: this._invalidateAll,
            viewreset: this._resetView,
            zoom: this._resetView,
            moveend: this._onMoveEnd
          };
          if (!this.options.updateWhenIdle) {
            if (!this._onMove) {
              this._onMove = throttle(this._onMoveEnd, this.options.updateInterval, this);
            }
            events.move = this._onMove;
          }
          if (this._zoomAnimated) {
            events.zoomanim = this._animateZoom;
          }
          return events;
        },
        // @section Extension methods
        // Layers extending `GridLayer` shall reimplement the following method.
        // @method createTile(coords: Object, done?: Function): HTMLElement
        // Called only internally, must be overridden by classes extending `GridLayer`.
        // Returns the `HTMLElement` corresponding to the given `coords`. If the `done` callback
        // is specified, it must be called when the tile has finished loading and drawing.
        createTile: function() {
          return document.createElement("div");
        },
        // @section
        // @method getTileSize: Point
        // Normalizes the [tileSize option](#gridlayer-tilesize) into a point. Used by the `createTile()` method.
        getTileSize: function() {
          var s2 = this.options.tileSize;
          return s2 instanceof Point ? s2 : new Point(s2, s2);
        },
        _updateZIndex: function() {
          if (this._container && this.options.zIndex !== void 0 && this.options.zIndex !== null) {
            this._container.style.zIndex = this.options.zIndex;
          }
        },
        _setAutoZIndex: function(compare) {
          var layers2 = this.getPane().children, edgeZIndex = -compare(-Infinity, Infinity);
          for (var i2 = 0, len = layers2.length, zIndex; i2 < len; i2++) {
            zIndex = layers2[i2].style.zIndex;
            if (layers2[i2] !== this._container && zIndex) {
              edgeZIndex = compare(edgeZIndex, +zIndex);
            }
          }
          if (isFinite(edgeZIndex)) {
            this.options.zIndex = edgeZIndex + compare(-1, 1);
            this._updateZIndex();
          }
        },
        _updateOpacity: function() {
          if (!this._map) {
            return;
          }
          if (Browser.ielt9) {
            return;
          }
          setOpacity(this._container, this.options.opacity);
          var now = +/* @__PURE__ */ new Date(), nextFrame = false, willPrune = false;
          for (var key in this._tiles) {
            var tile = this._tiles[key];
            if (!tile.current || !tile.loaded) {
              continue;
            }
            var fade = Math.min(1, (now - tile.loaded) / 200);
            setOpacity(tile.el, fade);
            if (fade < 1) {
              nextFrame = true;
            } else {
              if (tile.active) {
                willPrune = true;
              } else {
                this._onOpaqueTile(tile);
              }
              tile.active = true;
            }
          }
          if (willPrune && !this._noPrune) {
            this._pruneTiles();
          }
          if (nextFrame) {
            cancelAnimFrame(this._fadeFrame);
            this._fadeFrame = requestAnimFrame(this._updateOpacity, this);
          }
        },
        _onOpaqueTile: falseFn,
        _initContainer: function() {
          if (this._container) {
            return;
          }
          this._container = create$1("div", "leaflet-layer " + (this.options.className || ""));
          this._updateZIndex();
          if (this.options.opacity < 1) {
            this._updateOpacity();
          }
          this.getPane().appendChild(this._container);
        },
        _updateLevels: function() {
          var zoom2 = this._tileZoom, maxZoom = this.options.maxZoom;
          if (zoom2 === void 0) {
            return void 0;
          }
          for (var z in this._levels) {
            z = Number(z);
            if (this._levels[z].el.children.length || z === zoom2) {
              this._levels[z].el.style.zIndex = maxZoom - Math.abs(zoom2 - z);
              this._onUpdateLevel(z);
            } else {
              remove(this._levels[z].el);
              this._removeTilesAtZoom(z);
              this._onRemoveLevel(z);
              delete this._levels[z];
            }
          }
          var level = this._levels[zoom2], map = this._map;
          if (!level) {
            level = this._levels[zoom2] = {};
            level.el = create$1("div", "leaflet-tile-container leaflet-zoom-animated", this._container);
            level.el.style.zIndex = maxZoom;
            level.origin = map.project(map.unproject(map.getPixelOrigin()), zoom2).round();
            level.zoom = zoom2;
            this._setZoomTransform(level, map.getCenter(), map.getZoom());
            falseFn(level.el.offsetWidth);
            this._onCreateLevel(level);
          }
          this._level = level;
          return level;
        },
        _onUpdateLevel: falseFn,
        _onRemoveLevel: falseFn,
        _onCreateLevel: falseFn,
        _pruneTiles: function() {
          if (!this._map) {
            return;
          }
          var key, tile;
          var zoom2 = this._map.getZoom();
          if (zoom2 > this.options.maxZoom || zoom2 < this.options.minZoom) {
            this._removeAllTiles();
            return;
          }
          for (key in this._tiles) {
            tile = this._tiles[key];
            tile.retain = tile.current;
          }
          for (key in this._tiles) {
            tile = this._tiles[key];
            if (tile.current && !tile.active) {
              var coords = tile.coords;
              if (!this._retainParent(coords.x, coords.y, coords.z, coords.z - 5)) {
                this._retainChildren(coords.x, coords.y, coords.z, coords.z + 2);
              }
            }
          }
          for (key in this._tiles) {
            if (!this._tiles[key].retain) {
              this._removeTile(key);
            }
          }
        },
        _removeTilesAtZoom: function(zoom2) {
          for (var key in this._tiles) {
            if (this._tiles[key].coords.z !== zoom2) {
              continue;
            }
            this._removeTile(key);
          }
        },
        _removeAllTiles: function() {
          for (var key in this._tiles) {
            this._removeTile(key);
          }
        },
        _invalidateAll: function() {
          for (var z in this._levels) {
            remove(this._levels[z].el);
            this._onRemoveLevel(Number(z));
            delete this._levels[z];
          }
          this._removeAllTiles();
          this._tileZoom = void 0;
        },
        _retainParent: function(x2, y2, z, minZoom) {
          var x22 = Math.floor(x2 / 2), y22 = Math.floor(y2 / 2), z2 = z - 1, coords2 = new Point(+x22, +y22);
          coords2.z = +z2;
          var key = this._tileCoordsToKey(coords2), tile = this._tiles[key];
          if (tile && tile.active) {
            tile.retain = true;
            return true;
          } else if (tile && tile.loaded) {
            tile.retain = true;
          }
          if (z2 > minZoom) {
            return this._retainParent(x22, y22, z2, minZoom);
          }
          return false;
        },
        _retainChildren: function(x2, y2, z, maxZoom) {
          for (var i2 = 2 * x2; i2 < 2 * x2 + 2; i2++) {
            for (var j = 2 * y2; j < 2 * y2 + 2; j++) {
              var coords = new Point(i2, j);
              coords.z = z + 1;
              var key = this._tileCoordsToKey(coords), tile = this._tiles[key];
              if (tile && tile.active) {
                tile.retain = true;
                continue;
              } else if (tile && tile.loaded) {
                tile.retain = true;
              }
              if (z + 1 < maxZoom) {
                this._retainChildren(i2, j, z + 1, maxZoom);
              }
            }
          }
        },
        _resetView: function(e2) {
          var animating = e2 && (e2.pinch || e2.flyTo);
          this._setView(this._map.getCenter(), this._map.getZoom(), animating, animating);
        },
        _animateZoom: function(e2) {
          this._setView(e2.center, e2.zoom, true, e2.noUpdate);
        },
        _clampZoom: function(zoom2) {
          var options = this.options;
          if (void 0 !== options.minNativeZoom && zoom2 < options.minNativeZoom) {
            return options.minNativeZoom;
          }
          if (void 0 !== options.maxNativeZoom && options.maxNativeZoom < zoom2) {
            return options.maxNativeZoom;
          }
          return zoom2;
        },
        _setView: function(center, zoom2, noPrune, noUpdate) {
          var tileZoom = Math.round(zoom2);
          if (this.options.maxZoom !== void 0 && tileZoom > this.options.maxZoom || this.options.minZoom !== void 0 && tileZoom < this.options.minZoom) {
            tileZoom = void 0;
          } else {
            tileZoom = this._clampZoom(tileZoom);
          }
          var tileZoomChanged = this.options.updateWhenZooming && tileZoom !== this._tileZoom;
          if (!noUpdate || tileZoomChanged) {
            this._tileZoom = tileZoom;
            if (this._abortLoading) {
              this._abortLoading();
            }
            this._updateLevels();
            this._resetGrid();
            if (tileZoom !== void 0) {
              this._update(center);
            }
            if (!noPrune) {
              this._pruneTiles();
            }
            this._noPrune = !!noPrune;
          }
          this._setZoomTransforms(center, zoom2);
        },
        _setZoomTransforms: function(center, zoom2) {
          for (var i2 in this._levels) {
            this._setZoomTransform(this._levels[i2], center, zoom2);
          }
        },
        _setZoomTransform: function(level, center, zoom2) {
          var scale2 = this._map.getZoomScale(zoom2, level.zoom), translate = level.origin.multiplyBy(scale2).subtract(this._map._getNewPixelOrigin(center, zoom2)).round();
          if (Browser.any3d) {
            setTransform(level.el, translate, scale2);
          } else {
            setPosition(level.el, translate);
          }
        },
        _resetGrid: function() {
          var map = this._map, crs = map.options.crs, tileSize = this._tileSize = this.getTileSize(), tileZoom = this._tileZoom;
          var bounds = this._map.getPixelWorldBounds(this._tileZoom);
          if (bounds) {
            this._globalTileRange = this._pxBoundsToTileRange(bounds);
          }
          this._wrapX = crs.wrapLng && !this.options.noWrap && [
            Math.floor(map.project([0, crs.wrapLng[0]], tileZoom).x / tileSize.x),
            Math.ceil(map.project([0, crs.wrapLng[1]], tileZoom).x / tileSize.y)
          ];
          this._wrapY = crs.wrapLat && !this.options.noWrap && [
            Math.floor(map.project([crs.wrapLat[0], 0], tileZoom).y / tileSize.x),
            Math.ceil(map.project([crs.wrapLat[1], 0], tileZoom).y / tileSize.y)
          ];
        },
        _onMoveEnd: function() {
          if (!this._map || this._map._animatingZoom) {
            return;
          }
          this._update();
        },
        _getTiledPixelBounds: function(center) {
          var map = this._map, mapZoom = map._animatingZoom ? Math.max(map._animateToZoom, map.getZoom()) : map.getZoom(), scale2 = map.getZoomScale(mapZoom, this._tileZoom), pixelCenter = map.project(center, this._tileZoom).floor(), halfSize = map.getSize().divideBy(scale2 * 2);
          return new Bounds(pixelCenter.subtract(halfSize), pixelCenter.add(halfSize));
        },
        // Private method to load tiles in the grid's active zoom level according to map bounds
        _update: function(center) {
          var map = this._map;
          if (!map) {
            return;
          }
          var zoom2 = this._clampZoom(map.getZoom());
          if (center === void 0) {
            center = map.getCenter();
          }
          if (this._tileZoom === void 0) {
            return;
          }
          var pixelBounds = this._getTiledPixelBounds(center), tileRange = this._pxBoundsToTileRange(pixelBounds), tileCenter = tileRange.getCenter(), queue = [], margin = this.options.keepBuffer, noPruneRange = new Bounds(
            tileRange.getBottomLeft().subtract([margin, -margin]),
            tileRange.getTopRight().add([margin, -margin])
          );
          if (!(isFinite(tileRange.min.x) && isFinite(tileRange.min.y) && isFinite(tileRange.max.x) && isFinite(tileRange.max.y))) {
            throw new Error("Attempted to load an infinite number of tiles");
          }
          for (var key in this._tiles) {
            var c2 = this._tiles[key].coords;
            if (c2.z !== this._tileZoom || !noPruneRange.contains(new Point(c2.x, c2.y))) {
              this._tiles[key].current = false;
            }
          }
          if (Math.abs(zoom2 - this._tileZoom) > 1) {
            this._setView(center, zoom2);
            return;
          }
          for (var j = tileRange.min.y; j <= tileRange.max.y; j++) {
            for (var i2 = tileRange.min.x; i2 <= tileRange.max.x; i2++) {
              var coords = new Point(i2, j);
              coords.z = this._tileZoom;
              if (!this._isValidTile(coords)) {
                continue;
              }
              var tile = this._tiles[this._tileCoordsToKey(coords)];
              if (tile) {
                tile.current = true;
              } else {
                queue.push(coords);
              }
            }
          }
          queue.sort(function(a2, b2) {
            return a2.distanceTo(tileCenter) - b2.distanceTo(tileCenter);
          });
          if (queue.length !== 0) {
            if (!this._loading) {
              this._loading = true;
              this.fire("loading");
            }
            var fragment = document.createDocumentFragment();
            for (i2 = 0; i2 < queue.length; i2++) {
              this._addTile(queue[i2], fragment);
            }
            this._level.el.appendChild(fragment);
          }
        },
        _isValidTile: function(coords) {
          var crs = this._map.options.crs;
          if (!crs.infinite) {
            var bounds = this._globalTileRange;
            if (!crs.wrapLng && (coords.x < bounds.min.x || coords.x > bounds.max.x) || !crs.wrapLat && (coords.y < bounds.min.y || coords.y > bounds.max.y)) {
              return false;
            }
          }
          if (!this.options.bounds) {
            return true;
          }
          var tileBounds = this._tileCoordsToBounds(coords);
          return toLatLngBounds(this.options.bounds).overlaps(tileBounds);
        },
        _keyToBounds: function(key) {
          return this._tileCoordsToBounds(this._keyToTileCoords(key));
        },
        _tileCoordsToNwSe: function(coords) {
          var map = this._map, tileSize = this.getTileSize(), nwPoint = coords.scaleBy(tileSize), sePoint = nwPoint.add(tileSize), nw = map.unproject(nwPoint, coords.z), se2 = map.unproject(sePoint, coords.z);
          return [nw, se2];
        },
        // converts tile coordinates to its geographical bounds
        _tileCoordsToBounds: function(coords) {
          var bp = this._tileCoordsToNwSe(coords), bounds = new LatLngBounds(bp[0], bp[1]);
          if (!this.options.noWrap) {
            bounds = this._map.wrapLatLngBounds(bounds);
          }
          return bounds;
        },
        // converts tile coordinates to key for the tile cache
        _tileCoordsToKey: function(coords) {
          return coords.x + ":" + coords.y + ":" + coords.z;
        },
        // converts tile cache key to coordinates
        _keyToTileCoords: function(key) {
          var k = key.split(":"), coords = new Point(+k[0], +k[1]);
          coords.z = +k[2];
          return coords;
        },
        _removeTile: function(key) {
          var tile = this._tiles[key];
          if (!tile) {
            return;
          }
          remove(tile.el);
          delete this._tiles[key];
          this.fire("tileunload", {
            tile: tile.el,
            coords: this._keyToTileCoords(key)
          });
        },
        _initTile: function(tile) {
          addClass(tile, "leaflet-tile");
          var tileSize = this.getTileSize();
          tile.style.width = tileSize.x + "px";
          tile.style.height = tileSize.y + "px";
          tile.onselectstart = falseFn;
          tile.onmousemove = falseFn;
          if (Browser.ielt9 && this.options.opacity < 1) {
            setOpacity(tile, this.options.opacity);
          }
        },
        _addTile: function(coords, container) {
          var tilePos = this._getTilePos(coords), key = this._tileCoordsToKey(coords);
          var tile = this.createTile(this._wrapCoords(coords), bind(this._tileReady, this, coords));
          this._initTile(tile);
          if (this.createTile.length < 2) {
            requestAnimFrame(bind(this._tileReady, this, coords, null, tile));
          }
          setPosition(tile, tilePos);
          this._tiles[key] = {
            el: tile,
            coords,
            current: true
          };
          container.appendChild(tile);
          this.fire("tileloadstart", {
            tile,
            coords
          });
        },
        _tileReady: function(coords, err, tile) {
          if (err) {
            this.fire("tileerror", {
              error: err,
              tile,
              coords
            });
          }
          var key = this._tileCoordsToKey(coords);
          tile = this._tiles[key];
          if (!tile) {
            return;
          }
          tile.loaded = +/* @__PURE__ */ new Date();
          if (this._map._fadeAnimated) {
            setOpacity(tile.el, 0);
            cancelAnimFrame(this._fadeFrame);
            this._fadeFrame = requestAnimFrame(this._updateOpacity, this);
          } else {
            tile.active = true;
            this._pruneTiles();
          }
          if (!err) {
            addClass(tile.el, "leaflet-tile-loaded");
            this.fire("tileload", {
              tile: tile.el,
              coords
            });
          }
          if (this._noTilesToLoad()) {
            this._loading = false;
            this.fire("load");
            if (Browser.ielt9 || !this._map._fadeAnimated) {
              requestAnimFrame(this._pruneTiles, this);
            } else {
              setTimeout(bind(this._pruneTiles, this), 250);
            }
          }
        },
        _getTilePos: function(coords) {
          return coords.scaleBy(this.getTileSize()).subtract(this._level.origin);
        },
        _wrapCoords: function(coords) {
          var newCoords = new Point(
            this._wrapX ? wrapNum(coords.x, this._wrapX) : coords.x,
            this._wrapY ? wrapNum(coords.y, this._wrapY) : coords.y
          );
          newCoords.z = coords.z;
          return newCoords;
        },
        _pxBoundsToTileRange: function(bounds) {
          var tileSize = this.getTileSize();
          return new Bounds(
            bounds.min.unscaleBy(tileSize).floor(),
            bounds.max.unscaleBy(tileSize).ceil().subtract([1, 1])
          );
        },
        _noTilesToLoad: function() {
          for (var key in this._tiles) {
            if (!this._tiles[key].loaded) {
              return false;
            }
          }
          return true;
        }
      });
      function gridLayer(options) {
        return new GridLayer(options);
      }
      var TileLayer2 = GridLayer.extend({
        // @section
        // @aka TileLayer options
        options: {
          // @option minZoom: Number = 0
          // The minimum zoom level down to which this layer will be displayed (inclusive).
          minZoom: 0,
          // @option maxZoom: Number = 18
          // The maximum zoom level up to which this layer will be displayed (inclusive).
          maxZoom: 18,
          // @option subdomains: String|String[] = 'abc'
          // Subdomains of the tile service. Can be passed in the form of one string (where each letter is a subdomain name) or an array of strings.
          subdomains: "abc",
          // @option errorTileUrl: String = ''
          // URL to the tile image to show in place of the tile that failed to load.
          errorTileUrl: "",
          // @option zoomOffset: Number = 0
          // The zoom number used in tile URLs will be offset with this value.
          zoomOffset: 0,
          // @option tms: Boolean = false
          // If `true`, inverses Y axis numbering for tiles (turn this on for [TMS](https://en.wikipedia.org/wiki/Tile_Map_Service) services).
          tms: false,
          // @option zoomReverse: Boolean = false
          // If set to true, the zoom number used in tile URLs will be reversed (`maxZoom - zoom` instead of `zoom`)
          zoomReverse: false,
          // @option detectRetina: Boolean = false
          // If `true` and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.
          detectRetina: false,
          // @option crossOrigin: Boolean|String = false
          // Whether the crossOrigin attribute will be added to the tiles.
          // If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
          // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
          crossOrigin: false,
          // @option referrerPolicy: Boolean|String = false
          // Whether the referrerPolicy attribute will be added to the tiles.
          // If a String is provided, all tiles will have their referrerPolicy attribute set to the String provided.
          // This may be needed if your map's rendering context has a strict default but your tile provider expects a valid referrer
          // (e.g. to validate an API token).
          // Refer to [HTMLImageElement.referrerPolicy](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/referrerPolicy) for valid String values.
          referrerPolicy: false
        },
        initialize: function(url, options) {
          this._url = url;
          options = setOptions(this, options);
          if (options.detectRetina && Browser.retina && options.maxZoom > 0) {
            options.tileSize = Math.floor(options.tileSize / 2);
            if (!options.zoomReverse) {
              options.zoomOffset++;
              options.maxZoom = Math.max(options.minZoom, options.maxZoom - 1);
            } else {
              options.zoomOffset--;
              options.minZoom = Math.min(options.maxZoom, options.minZoom + 1);
            }
            options.minZoom = Math.max(0, options.minZoom);
          } else if (!options.zoomReverse) {
            options.maxZoom = Math.max(options.minZoom, options.maxZoom);
          } else {
            options.minZoom = Math.min(options.maxZoom, options.minZoom);
          }
          if (typeof options.subdomains === "string") {
            options.subdomains = options.subdomains.split("");
          }
          this.on("tileunload", this._onTileRemove);
        },
        // @method setUrl(url: String, noRedraw?: Boolean): this
        // Updates the layer's URL template and redraws it (unless `noRedraw` is set to `true`).
        // If the URL does not change, the layer will not be redrawn unless
        // the noRedraw parameter is set to false.
        setUrl: function(url, noRedraw) {
          if (this._url === url && noRedraw === void 0) {
            noRedraw = true;
          }
          this._url = url;
          if (!noRedraw) {
            this.redraw();
          }
          return this;
        },
        // @method createTile(coords: Object, done?: Function): HTMLElement
        // Called only internally, overrides GridLayer's [`createTile()`](#gridlayer-createtile)
        // to return an `<img>` HTML element with the appropriate image URL given `coords`. The `done`
        // callback is called when the tile has been loaded.
        createTile: function(coords, done) {
          var tile = document.createElement("img");
          on(tile, "load", bind(this._tileOnLoad, this, done, tile));
          on(tile, "error", bind(this._tileOnError, this, done, tile));
          if (this.options.crossOrigin || this.options.crossOrigin === "") {
            tile.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin;
          }
          if (typeof this.options.referrerPolicy === "string") {
            tile.referrerPolicy = this.options.referrerPolicy;
          }
          tile.alt = "";
          tile.src = this.getTileUrl(coords);
          return tile;
        },
        // @section Extension methods
        // @uninheritable
        // Layers extending `TileLayer` might reimplement the following method.
        // @method getTileUrl(coords: Object): String
        // Called only internally, returns the URL for a tile given its coordinates.
        // Classes extending `TileLayer` can override this function to provide custom tile URL naming schemes.
        getTileUrl: function(coords) {
          var data = {
            r: Browser.retina ? "@2x" : "",
            s: this._getSubdomain(coords),
            x: coords.x,
            y: coords.y,
            z: this._getZoomForUrl()
          };
          if (this._map && !this._map.options.crs.infinite) {
            var invertedY = this._globalTileRange.max.y - coords.y;
            if (this.options.tms) {
              data["y"] = invertedY;
            }
            data["-y"] = invertedY;
          }
          return template(this._url, extend2(data, this.options));
        },
        _tileOnLoad: function(done, tile) {
          if (Browser.ielt9) {
            setTimeout(bind(done, this, null, tile), 0);
          } else {
            done(null, tile);
          }
        },
        _tileOnError: function(done, tile, e2) {
          var errorUrl = this.options.errorTileUrl;
          if (errorUrl && tile.getAttribute("src") !== errorUrl) {
            tile.src = errorUrl;
          }
          done(e2, tile);
        },
        _onTileRemove: function(e2) {
          e2.tile.onload = null;
        },
        _getZoomForUrl: function() {
          var zoom2 = this._tileZoom, maxZoom = this.options.maxZoom, zoomReverse = this.options.zoomReverse, zoomOffset = this.options.zoomOffset;
          if (zoomReverse) {
            zoom2 = maxZoom - zoom2;
          }
          return zoom2 + zoomOffset;
        },
        _getSubdomain: function(tilePoint) {
          var index2 = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
          return this.options.subdomains[index2];
        },
        // stops loading all tiles in the background layer
        _abortLoading: function() {
          var i2, tile;
          for (i2 in this._tiles) {
            if (this._tiles[i2].coords.z !== this._tileZoom) {
              tile = this._tiles[i2].el;
              tile.onload = falseFn;
              tile.onerror = falseFn;
              if (!tile.complete) {
                tile.src = emptyImageUrl;
                var coords = this._tiles[i2].coords;
                remove(tile);
                delete this._tiles[i2];
                this.fire("tileabort", {
                  tile,
                  coords
                });
              }
            }
          }
        },
        _removeTile: function(key) {
          var tile = this._tiles[key];
          if (!tile) {
            return;
          }
          tile.el.setAttribute("src", emptyImageUrl);
          return GridLayer.prototype._removeTile.call(this, key);
        },
        _tileReady: function(coords, err, tile) {
          if (!this._map || tile && tile.getAttribute("src") === emptyImageUrl) {
            return;
          }
          return GridLayer.prototype._tileReady.call(this, coords, err, tile);
        }
      });
      function tileLayer(url, options) {
        return new TileLayer2(url, options);
      }
      var TileLayerWMS = TileLayer2.extend({
        // @section
        // @aka TileLayer.WMS options
        // If any custom options not documented here are used, they will be sent to the
        // WMS server as extra parameters in each request URL. This can be useful for
        // [non-standard vendor WMS parameters](https://docs.geoserver.org/stable/en/user/services/wms/vendor.html).
        defaultWmsParams: {
          service: "WMS",
          request: "GetMap",
          // @option layers: String = ''
          // **(required)** Comma-separated list of WMS layers to show.
          layers: "",
          // @option styles: String = ''
          // Comma-separated list of WMS styles.
          styles: "",
          // @option format: String = 'image/jpeg'
          // WMS image format (use `'image/png'` for layers with transparency).
          format: "image/jpeg",
          // @option transparent: Boolean = false
          // If `true`, the WMS service will return images with transparency.
          transparent: false,
          // @option version: String = '1.1.1'
          // Version of the WMS service to use
          version: "1.1.1"
        },
        options: {
          // @option crs: CRS = null
          // Coordinate Reference System to use for the WMS requests, defaults to
          // map CRS. Don't change this if you're not sure what it means.
          crs: null,
          // @option uppercase: Boolean = false
          // If `true`, WMS request parameter keys will be uppercase.
          uppercase: false
        },
        initialize: function(url, options) {
          this._url = url;
          var wmsParams = extend2({}, this.defaultWmsParams);
          for (var i2 in options) {
            if (!(i2 in this.options)) {
              wmsParams[i2] = options[i2];
            }
          }
          options = setOptions(this, options);
          var realRetina = options.detectRetina && Browser.retina ? 2 : 1;
          var tileSize = this.getTileSize();
          wmsParams.width = tileSize.x * realRetina;
          wmsParams.height = tileSize.y * realRetina;
          this.wmsParams = wmsParams;
        },
        onAdd: function(map) {
          this._crs = this.options.crs || map.options.crs;
          this._wmsVersion = parseFloat(this.wmsParams.version);
          var projectionKey = this._wmsVersion >= 1.3 ? "crs" : "srs";
          this.wmsParams[projectionKey] = this._crs.code;
          TileLayer2.prototype.onAdd.call(this, map);
        },
        getTileUrl: function(coords) {
          var tileBounds = this._tileCoordsToNwSe(coords), crs = this._crs, bounds = toBounds(crs.project(tileBounds[0]), crs.project(tileBounds[1])), min = bounds.min, max = bounds.max, bbox = (this._wmsVersion >= 1.3 && this._crs === EPSG4326 ? [min.y, min.x, max.y, max.x] : [min.x, min.y, max.x, max.y]).join(","), url = TileLayer2.prototype.getTileUrl.call(this, coords);
          return url + getParamString(this.wmsParams, url, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + bbox;
        },
        // @method setParams(params: Object, noRedraw?: Boolean): this
        // Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
        setParams: function(params, noRedraw) {
          extend2(this.wmsParams, params);
          if (!noRedraw) {
            this.redraw();
          }
          return this;
        }
      });
      function tileLayerWMS(url, options) {
        return new TileLayerWMS(url, options);
      }
      TileLayer2.WMS = TileLayerWMS;
      tileLayer.wms = tileLayerWMS;
      var Renderer = Layer.extend({
        // @section
        // @aka Renderer options
        options: {
          // @option padding: Number = 0.1
          // How much to extend the clip area around the map view (relative to its size)
          // e.g. 0.1 would be 10% of map view in each direction
          padding: 0.1
        },
        initialize: function(options) {
          setOptions(this, options);
          stamp(this);
          this._layers = this._layers || {};
        },
        onAdd: function() {
          if (!this._container) {
            this._initContainer();
            addClass(this._container, "leaflet-zoom-animated");
          }
          this.getPane().appendChild(this._container);
          this._update();
          this.on("update", this._updatePaths, this);
        },
        onRemove: function() {
          this.off("update", this._updatePaths, this);
          this._destroyContainer();
        },
        getEvents: function() {
          var events = {
            viewreset: this._reset,
            zoom: this._onZoom,
            moveend: this._update,
            zoomend: this._onZoomEnd
          };
          if (this._zoomAnimated) {
            events.zoomanim = this._onAnimZoom;
          }
          return events;
        },
        _onAnimZoom: function(ev) {
          this._updateTransform(ev.center, ev.zoom);
        },
        _onZoom: function() {
          this._updateTransform(this._map.getCenter(), this._map.getZoom());
        },
        _updateTransform: function(center, zoom2) {
          var scale2 = this._map.getZoomScale(zoom2, this._zoom), viewHalf = this._map.getSize().multiplyBy(0.5 + this.options.padding), currentCenterPoint = this._map.project(this._center, zoom2), topLeftOffset = viewHalf.multiplyBy(-scale2).add(currentCenterPoint).subtract(this._map._getNewPixelOrigin(center, zoom2));
          if (Browser.any3d) {
            setTransform(this._container, topLeftOffset, scale2);
          } else {
            setPosition(this._container, topLeftOffset);
          }
        },
        _reset: function() {
          this._update();
          this._updateTransform(this._center, this._zoom);
          for (var id in this._layers) {
            this._layers[id]._reset();
          }
        },
        _onZoomEnd: function() {
          for (var id in this._layers) {
            this._layers[id]._project();
          }
        },
        _updatePaths: function() {
          for (var id in this._layers) {
            this._layers[id]._update();
          }
        },
        _update: function() {
          var p2 = this.options.padding, size = this._map.getSize(), min = this._map.containerPointToLayerPoint(size.multiplyBy(-p2)).round();
          this._bounds = new Bounds(min, min.add(size.multiplyBy(1 + p2 * 2)).round());
          this._center = this._map.getCenter();
          this._zoom = this._map.getZoom();
        }
      });
      var Canvas = Renderer.extend({
        // @section
        // @aka Canvas options
        options: {
          // @option tolerance: Number = 0
          // How much to extend the click tolerance around a path/object on the map.
          tolerance: 0
        },
        getEvents: function() {
          var events = Renderer.prototype.getEvents.call(this);
          events.viewprereset = this._onViewPreReset;
          return events;
        },
        _onViewPreReset: function() {
          this._postponeUpdatePaths = true;
        },
        onAdd: function() {
          Renderer.prototype.onAdd.call(this);
          this._draw();
        },
        _initContainer: function() {
          var container = this._container = document.createElement("canvas");
          on(container, "mousemove", this._onMouseMove, this);
          on(container, "click dblclick mousedown mouseup contextmenu", this._onClick, this);
          on(container, "mouseout", this._handleMouseOut, this);
          container["_leaflet_disable_events"] = true;
          this._ctx = container.getContext("2d");
        },
        _destroyContainer: function() {
          cancelAnimFrame(this._redrawRequest);
          delete this._ctx;
          remove(this._container);
          off(this._container);
          delete this._container;
        },
        _updatePaths: function() {
          if (this._postponeUpdatePaths) {
            return;
          }
          var layer;
          this._redrawBounds = null;
          for (var id in this._layers) {
            layer = this._layers[id];
            layer._update();
          }
          this._redraw();
        },
        _update: function() {
          if (this._map._animatingZoom && this._bounds) {
            return;
          }
          Renderer.prototype._update.call(this);
          var b2 = this._bounds, container = this._container, size = b2.getSize(), m2 = Browser.retina ? 2 : 1;
          setPosition(container, b2.min);
          container.width = m2 * size.x;
          container.height = m2 * size.y;
          container.style.width = size.x + "px";
          container.style.height = size.y + "px";
          if (Browser.retina) {
            this._ctx.scale(2, 2);
          }
          this._ctx.translate(-b2.min.x, -b2.min.y);
          this.fire("update");
        },
        _reset: function() {
          Renderer.prototype._reset.call(this);
          if (this._postponeUpdatePaths) {
            this._postponeUpdatePaths = false;
            this._updatePaths();
          }
        },
        _initPath: function(layer) {
          this._updateDashArray(layer);
          this._layers[stamp(layer)] = layer;
          var order = layer._order = {
            layer,
            prev: this._drawLast,
            next: null
          };
          if (this._drawLast) {
            this._drawLast.next = order;
          }
          this._drawLast = order;
          this._drawFirst = this._drawFirst || this._drawLast;
        },
        _addPath: function(layer) {
          this._requestRedraw(layer);
        },
        _removePath: function(layer) {
          var order = layer._order;
          var next2 = order.next;
          var prev2 = order.prev;
          if (next2) {
            next2.prev = prev2;
          } else {
            this._drawLast = prev2;
          }
          if (prev2) {
            prev2.next = next2;
          } else {
            this._drawFirst = next2;
          }
          delete layer._order;
          delete this._layers[stamp(layer)];
          this._requestRedraw(layer);
        },
        _updatePath: function(layer) {
          this._extendRedrawBounds(layer);
          layer._project();
          layer._update();
          this._requestRedraw(layer);
        },
        _updateStyle: function(layer) {
          this._updateDashArray(layer);
          this._requestRedraw(layer);
        },
        _updateDashArray: function(layer) {
          if (typeof layer.options.dashArray === "string") {
            var parts = layer.options.dashArray.split(/[, ]+/), dashArray = [], dashValue, i2;
            for (i2 = 0; i2 < parts.length; i2++) {
              dashValue = Number(parts[i2]);
              if (isNaN(dashValue)) {
                return;
              }
              dashArray.push(dashValue);
            }
            layer.options._dashArray = dashArray;
          } else {
            layer.options._dashArray = layer.options.dashArray;
          }
        },
        _requestRedraw: function(layer) {
          if (!this._map) {
            return;
          }
          this._extendRedrawBounds(layer);
          this._redrawRequest = this._redrawRequest || requestAnimFrame(this._redraw, this);
        },
        _extendRedrawBounds: function(layer) {
          if (layer._pxBounds) {
            var padding = (layer.options.weight || 0) + 1;
            this._redrawBounds = this._redrawBounds || new Bounds();
            this._redrawBounds.extend(layer._pxBounds.min.subtract([padding, padding]));
            this._redrawBounds.extend(layer._pxBounds.max.add([padding, padding]));
          }
        },
        _redraw: function() {
          this._redrawRequest = null;
          if (this._redrawBounds) {
            this._redrawBounds.min._floor();
            this._redrawBounds.max._ceil();
          }
          this._clear();
          this._draw();
          this._redrawBounds = null;
        },
        _clear: function() {
          var bounds = this._redrawBounds;
          if (bounds) {
            var size = bounds.getSize();
            this._ctx.clearRect(bounds.min.x, bounds.min.y, size.x, size.y);
          } else {
            this._ctx.save();
            this._ctx.setTransform(1, 0, 0, 1, 0, 0);
            this._ctx.clearRect(0, 0, this._container.width, this._container.height);
            this._ctx.restore();
          }
        },
        _draw: function() {
          var layer, bounds = this._redrawBounds;
          this._ctx.save();
          if (bounds) {
            var size = bounds.getSize();
            this._ctx.beginPath();
            this._ctx.rect(bounds.min.x, bounds.min.y, size.x, size.y);
            this._ctx.clip();
          }
          this._drawing = true;
          for (var order = this._drawFirst; order; order = order.next) {
            layer = order.layer;
            if (!bounds || layer._pxBounds && layer._pxBounds.intersects(bounds)) {
              layer._updatePath();
            }
          }
          this._drawing = false;
          this._ctx.restore();
        },
        _updatePoly: function(layer, closed) {
          if (!this._drawing) {
            return;
          }
          var i2, j, len2, p2, parts = layer._parts, len = parts.length, ctx = this._ctx;
          if (!len) {
            return;
          }
          ctx.beginPath();
          for (i2 = 0; i2 < len; i2++) {
            for (j = 0, len2 = parts[i2].length; j < len2; j++) {
              p2 = parts[i2][j];
              ctx[j ? "lineTo" : "moveTo"](p2.x, p2.y);
            }
            if (closed) {
              ctx.closePath();
            }
          }
          this._fillStroke(ctx, layer);
        },
        _updateCircle: function(layer) {
          if (!this._drawing || layer._empty()) {
            return;
          }
          var p2 = layer._point, ctx = this._ctx, r2 = Math.max(Math.round(layer._radius), 1), s2 = (Math.max(Math.round(layer._radiusY), 1) || r2) / r2;
          if (s2 !== 1) {
            ctx.save();
            ctx.scale(1, s2);
          }
          ctx.beginPath();
          ctx.arc(p2.x, p2.y / s2, r2, 0, Math.PI * 2, false);
          if (s2 !== 1) {
            ctx.restore();
          }
          this._fillStroke(ctx, layer);
        },
        _fillStroke: function(ctx, layer) {
          var options = layer.options;
          if (options.fill) {
            ctx.globalAlpha = options.fillOpacity;
            ctx.fillStyle = options.fillColor || options.color;
            ctx.fill(options.fillRule || "evenodd");
          }
          if (options.stroke && options.weight !== 0) {
            if (ctx.setLineDash) {
              ctx.setLineDash(layer.options && layer.options._dashArray || []);
            }
            ctx.globalAlpha = options.opacity;
            ctx.lineWidth = options.weight;
            ctx.strokeStyle = options.color;
            ctx.lineCap = options.lineCap;
            ctx.lineJoin = options.lineJoin;
            ctx.stroke();
          }
        },
        // Canvas obviously doesn't have mouse events for individual drawn objects,
        // so we emulate that by calculating what's under the mouse on mousemove/click manually
        _onClick: function(e2) {
          var point = this._map.mouseEventToLayerPoint(e2), layer, clickedLayer;
          for (var order = this._drawFirst; order; order = order.next) {
            layer = order.layer;
            if (layer.options.interactive && layer._containsPoint(point)) {
              if (!(e2.type === "click" || e2.type === "preclick") || !this._map._draggableMoved(layer)) {
                clickedLayer = layer;
              }
            }
          }
          this._fireEvent(clickedLayer ? [clickedLayer] : false, e2);
        },
        _onMouseMove: function(e2) {
          if (!this._map || this._map.dragging.moving() || this._map._animatingZoom) {
            return;
          }
          var point = this._map.mouseEventToLayerPoint(e2);
          this._handleMouseHover(e2, point);
        },
        _handleMouseOut: function(e2) {
          var layer = this._hoveredLayer;
          if (layer) {
            removeClass(this._container, "leaflet-interactive");
            this._fireEvent([layer], e2, "mouseout");
            this._hoveredLayer = null;
            this._mouseHoverThrottled = false;
          }
        },
        _handleMouseHover: function(e2, point) {
          if (this._mouseHoverThrottled) {
            return;
          }
          var layer, candidateHoveredLayer;
          for (var order = this._drawFirst; order; order = order.next) {
            layer = order.layer;
            if (layer.options.interactive && layer._containsPoint(point)) {
              candidateHoveredLayer = layer;
            }
          }
          if (candidateHoveredLayer !== this._hoveredLayer) {
            this._handleMouseOut(e2);
            if (candidateHoveredLayer) {
              addClass(this._container, "leaflet-interactive");
              this._fireEvent([candidateHoveredLayer], e2, "mouseover");
              this._hoveredLayer = candidateHoveredLayer;
            }
          }
          this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : false, e2);
          this._mouseHoverThrottled = true;
          setTimeout(bind(function() {
            this._mouseHoverThrottled = false;
          }, this), 32);
        },
        _fireEvent: function(layers2, e2, type) {
          this._map._fireDOMEvent(e2, type || e2.type, layers2);
        },
        _bringToFront: function(layer) {
          var order = layer._order;
          if (!order) {
            return;
          }
          var next2 = order.next;
          var prev2 = order.prev;
          if (next2) {
            next2.prev = prev2;
          } else {
            return;
          }
          if (prev2) {
            prev2.next = next2;
          } else if (next2) {
            this._drawFirst = next2;
          }
          order.prev = this._drawLast;
          this._drawLast.next = order;
          order.next = null;
          this._drawLast = order;
          this._requestRedraw(layer);
        },
        _bringToBack: function(layer) {
          var order = layer._order;
          if (!order) {
            return;
          }
          var next2 = order.next;
          var prev2 = order.prev;
          if (prev2) {
            prev2.next = next2;
          } else {
            return;
          }
          if (next2) {
            next2.prev = prev2;
          } else if (prev2) {
            this._drawLast = prev2;
          }
          order.prev = null;
          order.next = this._drawFirst;
          this._drawFirst.prev = order;
          this._drawFirst = order;
          this._requestRedraw(layer);
        }
      });
      function canvas(options) {
        return Browser.canvas ? new Canvas(options) : null;
      }
      var vmlCreate = (function() {
        try {
          document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml");
          return function(name) {
            return document.createElement("<lvml:" + name + ' class="lvml">');
          };
        } catch (e2) {
        }
        return function(name) {
          return document.createElement("<" + name + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
        };
      })();
      var vmlMixin = {
        _initContainer: function() {
          this._container = create$1("div", "leaflet-vml-container");
        },
        _update: function() {
          if (this._map._animatingZoom) {
            return;
          }
          Renderer.prototype._update.call(this);
          this.fire("update");
        },
        _initPath: function(layer) {
          var container = layer._container = vmlCreate("shape");
          addClass(container, "leaflet-vml-shape " + (this.options.className || ""));
          container.coordsize = "1 1";
          layer._path = vmlCreate("path");
          container.appendChild(layer._path);
          this._updateStyle(layer);
          this._layers[stamp(layer)] = layer;
        },
        _addPath: function(layer) {
          var container = layer._container;
          this._container.appendChild(container);
          if (layer.options.interactive) {
            layer.addInteractiveTarget(container);
          }
        },
        _removePath: function(layer) {
          var container = layer._container;
          remove(container);
          layer.removeInteractiveTarget(container);
          delete this._layers[stamp(layer)];
        },
        _updateStyle: function(layer) {
          var stroke = layer._stroke, fill = layer._fill, options = layer.options, container = layer._container;
          container.stroked = !!options.stroke;
          container.filled = !!options.fill;
          if (options.stroke) {
            if (!stroke) {
              stroke = layer._stroke = vmlCreate("stroke");
            }
            container.appendChild(stroke);
            stroke.weight = options.weight + "px";
            stroke.color = options.color;
            stroke.opacity = options.opacity;
            if (options.dashArray) {
              stroke.dashStyle = isArray(options.dashArray) ? options.dashArray.join(" ") : options.dashArray.replace(/( *, *)/g, " ");
            } else {
              stroke.dashStyle = "";
            }
            stroke.endcap = options.lineCap.replace("butt", "flat");
            stroke.joinstyle = options.lineJoin;
          } else if (stroke) {
            container.removeChild(stroke);
            layer._stroke = null;
          }
          if (options.fill) {
            if (!fill) {
              fill = layer._fill = vmlCreate("fill");
            }
            container.appendChild(fill);
            fill.color = options.fillColor || options.color;
            fill.opacity = options.fillOpacity;
          } else if (fill) {
            container.removeChild(fill);
            layer._fill = null;
          }
        },
        _updateCircle: function(layer) {
          var p2 = layer._point.round(), r2 = Math.round(layer._radius), r22 = Math.round(layer._radiusY || r2);
          this._setPath(layer, layer._empty() ? "M0 0" : "AL " + p2.x + "," + p2.y + " " + r2 + "," + r22 + " 0," + 65535 * 360);
        },
        _setPath: function(layer, path) {
          layer._path.v = path;
        },
        _bringToFront: function(layer) {
          toFront(layer._container);
        },
        _bringToBack: function(layer) {
          toBack(layer._container);
        }
      };
      var create = Browser.vml ? vmlCreate : svgCreate;
      var SVG = Renderer.extend({
        _initContainer: function() {
          this._container = create("svg");
          this._container.setAttribute("pointer-events", "none");
          this._rootGroup = create("g");
          this._container.appendChild(this._rootGroup);
        },
        _destroyContainer: function() {
          remove(this._container);
          off(this._container);
          delete this._container;
          delete this._rootGroup;
          delete this._svgSize;
        },
        _update: function() {
          if (this._map._animatingZoom && this._bounds) {
            return;
          }
          Renderer.prototype._update.call(this);
          var b2 = this._bounds, size = b2.getSize(), container = this._container;
          if (!this._svgSize || !this._svgSize.equals(size)) {
            this._svgSize = size;
            container.setAttribute("width", size.x);
            container.setAttribute("height", size.y);
          }
          setPosition(container, b2.min);
          container.setAttribute("viewBox", [b2.min.x, b2.min.y, size.x, size.y].join(" "));
          this.fire("update");
        },
        // methods below are called by vector layers implementations
        _initPath: function(layer) {
          var path = layer._path = create("path");
          if (layer.options.className) {
            addClass(path, layer.options.className);
          }
          if (layer.options.interactive) {
            addClass(path, "leaflet-interactive");
          }
          this._updateStyle(layer);
          this._layers[stamp(layer)] = layer;
        },
        _addPath: function(layer) {
          if (!this._rootGroup) {
            this._initContainer();
          }
          this._rootGroup.appendChild(layer._path);
          layer.addInteractiveTarget(layer._path);
        },
        _removePath: function(layer) {
          remove(layer._path);
          layer.removeInteractiveTarget(layer._path);
          delete this._layers[stamp(layer)];
        },
        _updatePath: function(layer) {
          layer._project();
          layer._update();
        },
        _updateStyle: function(layer) {
          var path = layer._path, options = layer.options;
          if (!path) {
            return;
          }
          if (options.stroke) {
            path.setAttribute("stroke", options.color);
            path.setAttribute("stroke-opacity", options.opacity);
            path.setAttribute("stroke-width", options.weight);
            path.setAttribute("stroke-linecap", options.lineCap);
            path.setAttribute("stroke-linejoin", options.lineJoin);
            if (options.dashArray) {
              path.setAttribute("stroke-dasharray", options.dashArray);
            } else {
              path.removeAttribute("stroke-dasharray");
            }
            if (options.dashOffset) {
              path.setAttribute("stroke-dashoffset", options.dashOffset);
            } else {
              path.removeAttribute("stroke-dashoffset");
            }
          } else {
            path.setAttribute("stroke", "none");
          }
          if (options.fill) {
            path.setAttribute("fill", options.fillColor || options.color);
            path.setAttribute("fill-opacity", options.fillOpacity);
            path.setAttribute("fill-rule", options.fillRule || "evenodd");
          } else {
            path.setAttribute("fill", "none");
          }
        },
        _updatePoly: function(layer, closed) {
          this._setPath(layer, pointsToPath(layer._parts, closed));
        },
        _updateCircle: function(layer) {
          var p2 = layer._point, r2 = Math.max(Math.round(layer._radius), 1), r22 = Math.max(Math.round(layer._radiusY), 1) || r2, arc = "a" + r2 + "," + r22 + " 0 1,0 ";
          var d2 = layer._empty() ? "M0 0" : "M" + (p2.x - r2) + "," + p2.y + arc + r2 * 2 + ",0 " + arc + -r2 * 2 + ",0 ";
          this._setPath(layer, d2);
        },
        _setPath: function(layer, path) {
          layer._path.setAttribute("d", path);
        },
        // SVG does not have the concept of zIndex so we resort to changing the DOM order of elements
        _bringToFront: function(layer) {
          toFront(layer._path);
        },
        _bringToBack: function(layer) {
          toBack(layer._path);
        }
      });
      if (Browser.vml) {
        SVG.include(vmlMixin);
      }
      function svg(options) {
        return Browser.svg || Browser.vml ? new SVG(options) : null;
      }
      Map.include({
        // @namespace Map; @method getRenderer(layer: Path): Renderer
        // Returns the instance of `Renderer` that should be used to render the given
        // `Path`. It will ensure that the `renderer` options of the map and paths
        // are respected, and that the renderers do exist on the map.
        getRenderer: function(layer) {
          var renderer = layer.options.renderer || this._getPaneRenderer(layer.options.pane) || this.options.renderer || this._renderer;
          if (!renderer) {
            renderer = this._renderer = this._createRenderer();
          }
          if (!this.hasLayer(renderer)) {
            this.addLayer(renderer);
          }
          return renderer;
        },
        _getPaneRenderer: function(name) {
          if (name === "overlayPane" || name === void 0) {
            return false;
          }
          var renderer = this._paneRenderers[name];
          if (renderer === void 0) {
            renderer = this._createRenderer({ pane: name });
            this._paneRenderers[name] = renderer;
          }
          return renderer;
        },
        _createRenderer: function(options) {
          return this.options.preferCanvas && canvas(options) || svg(options);
        }
      });
      var Rectangle2 = Polygon2.extend({
        initialize: function(latLngBounds, options) {
          Polygon2.prototype.initialize.call(this, this._boundsToLatLngs(latLngBounds), options);
        },
        // @method setBounds(latLngBounds: LatLngBounds): this
        // Redraws the rectangle with the passed bounds.
        setBounds: function(latLngBounds) {
          return this.setLatLngs(this._boundsToLatLngs(latLngBounds));
        },
        _boundsToLatLngs: function(latLngBounds) {
          latLngBounds = toLatLngBounds(latLngBounds);
          return [
            latLngBounds.getSouthWest(),
            latLngBounds.getNorthWest(),
            latLngBounds.getNorthEast(),
            latLngBounds.getSouthEast()
          ];
        }
      });
      function rectangle(latLngBounds, options) {
        return new Rectangle2(latLngBounds, options);
      }
      SVG.create = create;
      SVG.pointsToPath = pointsToPath;
      GeoJSON.geometryToLayer = geometryToLayer;
      GeoJSON.coordsToLatLng = coordsToLatLng;
      GeoJSON.coordsToLatLngs = coordsToLatLngs;
      GeoJSON.latLngToCoords = latLngToCoords;
      GeoJSON.latLngsToCoords = latLngsToCoords;
      GeoJSON.getFeature = getFeature;
      GeoJSON.asFeature = asFeature;
      Map.mergeOptions({
        // @option boxZoom: Boolean = true
        // Whether the map can be zoomed to a rectangular area specified by
        // dragging the mouse while pressing the shift key.
        boxZoom: true
      });
      var BoxZoom = Handler.extend({
        initialize: function(map) {
          this._map = map;
          this._container = map._container;
          this._pane = map._panes.overlayPane;
          this._resetStateTimeout = 0;
          map.on("unload", this._destroy, this);
        },
        addHooks: function() {
          on(this._container, "mousedown", this._onMouseDown, this);
        },
        removeHooks: function() {
          off(this._container, "mousedown", this._onMouseDown, this);
        },
        moved: function() {
          return this._moved;
        },
        _destroy: function() {
          remove(this._pane);
          delete this._pane;
        },
        _resetState: function() {
          this._resetStateTimeout = 0;
          this._moved = false;
        },
        _clearDeferredResetState: function() {
          if (this._resetStateTimeout !== 0) {
            clearTimeout(this._resetStateTimeout);
            this._resetStateTimeout = 0;
          }
        },
        _onMouseDown: function(e2) {
          if (!e2.shiftKey || e2.which !== 1 && e2.button !== 1) {
            return false;
          }
          this._clearDeferredResetState();
          this._resetState();
          disableTextSelection();
          disableImageDrag();
          this._startPoint = this._map.mouseEventToContainerPoint(e2);
          on(document, {
            contextmenu: stop,
            mousemove: this._onMouseMove,
            mouseup: this._onMouseUp,
            keydown: this._onKeyDown
          }, this);
        },
        _onMouseMove: function(e2) {
          if (!this._moved) {
            this._moved = true;
            this._box = create$1("div", "leaflet-zoom-box", this._container);
            addClass(this._container, "leaflet-crosshair");
            this._map.fire("boxzoomstart");
          }
          this._point = this._map.mouseEventToContainerPoint(e2);
          var bounds = new Bounds(this._point, this._startPoint), size = bounds.getSize();
          setPosition(this._box, bounds.min);
          this._box.style.width = size.x + "px";
          this._box.style.height = size.y + "px";
        },
        _finish: function() {
          if (this._moved) {
            remove(this._box);
            removeClass(this._container, "leaflet-crosshair");
          }
          enableTextSelection();
          enableImageDrag();
          off(document, {
            contextmenu: stop,
            mousemove: this._onMouseMove,
            mouseup: this._onMouseUp,
            keydown: this._onKeyDown
          }, this);
        },
        _onMouseUp: function(e2) {
          if (e2.which !== 1 && e2.button !== 1) {
            return;
          }
          this._finish();
          if (!this._moved) {
            return;
          }
          this._clearDeferredResetState();
          this._resetStateTimeout = setTimeout(bind(this._resetState, this), 0);
          var bounds = new LatLngBounds(
            this._map.containerPointToLatLng(this._startPoint),
            this._map.containerPointToLatLng(this._point)
          );
          this._map.fitBounds(bounds).fire("boxzoomend", { boxZoomBounds: bounds });
        },
        _onKeyDown: function(e2) {
          if (e2.keyCode === 27) {
            this._finish();
            this._clearDeferredResetState();
            this._resetState();
          }
        }
      });
      Map.addInitHook("addHandler", "boxZoom", BoxZoom);
      Map.mergeOptions({
        // @option doubleClickZoom: Boolean|String = true
        // Whether the map can be zoomed in by double clicking on it and
        // zoomed out by double clicking while holding shift. If passed
        // `'center'`, double-click zoom will zoom to the center of the
        //  view regardless of where the mouse was.
        doubleClickZoom: true
      });
      var DoubleClickZoom = Handler.extend({
        addHooks: function() {
          this._map.on("dblclick", this._onDoubleClick, this);
        },
        removeHooks: function() {
          this._map.off("dblclick", this._onDoubleClick, this);
        },
        _onDoubleClick: function(e2) {
          var map = this._map, oldZoom = map.getZoom(), delta = map.options.zoomDelta, zoom2 = e2.originalEvent.shiftKey ? oldZoom - delta : oldZoom + delta;
          if (map.options.doubleClickZoom === "center") {
            map.setZoom(zoom2);
          } else {
            map.setZoomAround(e2.containerPoint, zoom2);
          }
        }
      });
      Map.addInitHook("addHandler", "doubleClickZoom", DoubleClickZoom);
      Map.mergeOptions({
        // @option dragging: Boolean = true
        // Whether the map is draggable with mouse/touch or not.
        dragging: true,
        // @section Panning Inertia Options
        // @option inertia: Boolean = *
        // If enabled, panning of the map will have an inertia effect where
        // the map builds momentum while dragging and continues moving in
        // the same direction for some time. Feels especially nice on touch
        // devices. Enabled by default.
        inertia: true,
        // @option inertiaDeceleration: Number = 3000
        // The rate with which the inertial movement slows down, in pixels/second².
        inertiaDeceleration: 3400,
        // px/s^2
        // @option inertiaMaxSpeed: Number = Infinity
        // Max speed of the inertial movement, in pixels/second.
        inertiaMaxSpeed: Infinity,
        // px/s
        // @option easeLinearity: Number = 0.2
        easeLinearity: 0.2,
        // TODO refactor, move to CRS
        // @option worldCopyJump: Boolean = false
        // With this option enabled, the map tracks when you pan to another "copy"
        // of the world and seamlessly jumps to the original one so that all overlays
        // like markers and vector layers are still visible.
        worldCopyJump: false,
        // @option maxBoundsViscosity: Number = 0.0
        // If `maxBounds` is set, this option will control how solid the bounds
        // are when dragging the map around. The default value of `0.0` allows the
        // user to drag outside the bounds at normal speed, higher values will
        // slow down map dragging outside bounds, and `1.0` makes the bounds fully
        // solid, preventing the user from dragging outside the bounds.
        maxBoundsViscosity: 0
      });
      var Drag = Handler.extend({
        addHooks: function() {
          if (!this._draggable) {
            var map = this._map;
            this._draggable = new Draggable(map._mapPane, map._container);
            this._draggable.on({
              dragstart: this._onDragStart,
              drag: this._onDrag,
              dragend: this._onDragEnd
            }, this);
            this._draggable.on("predrag", this._onPreDragLimit, this);
            if (map.options.worldCopyJump) {
              this._draggable.on("predrag", this._onPreDragWrap, this);
              map.on("zoomend", this._onZoomEnd, this);
              map.whenReady(this._onZoomEnd, this);
            }
          }
          addClass(this._map._container, "leaflet-grab leaflet-touch-drag");
          this._draggable.enable();
          this._positions = [];
          this._times = [];
        },
        removeHooks: function() {
          removeClass(this._map._container, "leaflet-grab");
          removeClass(this._map._container, "leaflet-touch-drag");
          this._draggable.disable();
        },
        moved: function() {
          return this._draggable && this._draggable._moved;
        },
        moving: function() {
          return this._draggable && this._draggable._moving;
        },
        _onDragStart: function() {
          var map = this._map;
          map._stop();
          if (this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
            var bounds = toLatLngBounds(this._map.options.maxBounds);
            this._offsetLimit = toBounds(
              this._map.latLngToContainerPoint(bounds.getNorthWest()).multiplyBy(-1),
              this._map.latLngToContainerPoint(bounds.getSouthEast()).multiplyBy(-1).add(this._map.getSize())
            );
            this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity));
          } else {
            this._offsetLimit = null;
          }
          map.fire("movestart").fire("dragstart");
          if (map.options.inertia) {
            this._positions = [];
            this._times = [];
          }
        },
        _onDrag: function(e2) {
          if (this._map.options.inertia) {
            var time = this._lastTime = +/* @__PURE__ */ new Date(), pos = this._lastPos = this._draggable._absPos || this._draggable._newPos;
            this._positions.push(pos);
            this._times.push(time);
            this._prunePositions(time);
          }
          this._map.fire("move", e2).fire("drag", e2);
        },
        _prunePositions: function(time) {
          while (this._positions.length > 1 && time - this._times[0] > 50) {
            this._positions.shift();
            this._times.shift();
          }
        },
        _onZoomEnd: function() {
          var pxCenter = this._map.getSize().divideBy(2), pxWorldCenter = this._map.latLngToLayerPoint([0, 0]);
          this._initialWorldOffset = pxWorldCenter.subtract(pxCenter).x;
          this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
        },
        _viscousLimit: function(value, threshold) {
          return value - (value - threshold) * this._viscosity;
        },
        _onPreDragLimit: function() {
          if (!this._viscosity || !this._offsetLimit) {
            return;
          }
          var offset = this._draggable._newPos.subtract(this._draggable._startPos);
          var limit = this._offsetLimit;
          if (offset.x < limit.min.x) {
            offset.x = this._viscousLimit(offset.x, limit.min.x);
          }
          if (offset.y < limit.min.y) {
            offset.y = this._viscousLimit(offset.y, limit.min.y);
          }
          if (offset.x > limit.max.x) {
            offset.x = this._viscousLimit(offset.x, limit.max.x);
          }
          if (offset.y > limit.max.y) {
            offset.y = this._viscousLimit(offset.y, limit.max.y);
          }
          this._draggable._newPos = this._draggable._startPos.add(offset);
        },
        _onPreDragWrap: function() {
          var worldWidth = this._worldWidth, halfWidth = Math.round(worldWidth / 2), dx = this._initialWorldOffset, x2 = this._draggable._newPos.x, newX1 = (x2 - halfWidth + dx) % worldWidth + halfWidth - dx, newX2 = (x2 + halfWidth + dx) % worldWidth - halfWidth - dx, newX = Math.abs(newX1 + dx) < Math.abs(newX2 + dx) ? newX1 : newX2;
          this._draggable._absPos = this._draggable._newPos.clone();
          this._draggable._newPos.x = newX;
        },
        _onDragEnd: function(e2) {
          var map = this._map, options = map.options, noInertia = !options.inertia || e2.noInertia || this._times.length < 2;
          map.fire("dragend", e2);
          if (noInertia) {
            map.fire("moveend");
          } else {
            this._prunePositions(+/* @__PURE__ */ new Date());
            var direction = this._lastPos.subtract(this._positions[0]), duration = (this._lastTime - this._times[0]) / 1e3, ease = options.easeLinearity, speedVector = direction.multiplyBy(ease / duration), speed = speedVector.distanceTo([0, 0]), limitedSpeed = Math.min(options.inertiaMaxSpeed, speed), limitedSpeedVector = speedVector.multiplyBy(limitedSpeed / speed), decelerationDuration = limitedSpeed / (options.inertiaDeceleration * ease), offset = limitedSpeedVector.multiplyBy(-decelerationDuration / 2).round();
            if (!offset.x && !offset.y) {
              map.fire("moveend");
            } else {
              offset = map._limitOffset(offset, map.options.maxBounds);
              requestAnimFrame(function() {
                map.panBy(offset, {
                  duration: decelerationDuration,
                  easeLinearity: ease,
                  noMoveStart: true,
                  animate: true
                });
              });
            }
          }
        }
      });
      Map.addInitHook("addHandler", "dragging", Drag);
      Map.mergeOptions({
        // @option keyboard: Boolean = true
        // Makes the map focusable and allows users to navigate the map with keyboard
        // arrows and `+`/`-` keys.
        keyboard: true,
        // @option keyboardPanDelta: Number = 80
        // Amount of pixels to pan when pressing an arrow key.
        keyboardPanDelta: 80
      });
      var Keyboard = Handler.extend({
        keyCodes: {
          left: [37],
          right: [39],
          down: [40],
          up: [38],
          zoomIn: [187, 107, 61, 171],
          zoomOut: [189, 109, 54, 173]
        },
        initialize: function(map) {
          this._map = map;
          this._setPanDelta(map.options.keyboardPanDelta);
          this._setZoomDelta(map.options.zoomDelta);
        },
        addHooks: function() {
          var container = this._map._container;
          if (container.tabIndex <= 0) {
            container.tabIndex = "0";
          }
          on(container, {
            focus: this._onFocus,
            blur: this._onBlur,
            mousedown: this._onMouseDown
          }, this);
          this._map.on({
            focus: this._addHooks,
            blur: this._removeHooks
          }, this);
        },
        removeHooks: function() {
          this._removeHooks();
          off(this._map._container, {
            focus: this._onFocus,
            blur: this._onBlur,
            mousedown: this._onMouseDown
          }, this);
          this._map.off({
            focus: this._addHooks,
            blur: this._removeHooks
          }, this);
        },
        _onMouseDown: function() {
          if (this._focused) {
            return;
          }
          var body = document.body, docEl = document.documentElement, top = body.scrollTop || docEl.scrollTop, left = body.scrollLeft || docEl.scrollLeft;
          this._map._container.focus();
          window.scrollTo(left, top);
        },
        _onFocus: function() {
          this._focused = true;
          this._map.fire("focus");
        },
        _onBlur: function() {
          this._focused = false;
          this._map.fire("blur");
        },
        _setPanDelta: function(panDelta) {
          var keys = this._panKeys = {}, codes = this.keyCodes, i2, len;
          for (i2 = 0, len = codes.left.length; i2 < len; i2++) {
            keys[codes.left[i2]] = [-1 * panDelta, 0];
          }
          for (i2 = 0, len = codes.right.length; i2 < len; i2++) {
            keys[codes.right[i2]] = [panDelta, 0];
          }
          for (i2 = 0, len = codes.down.length; i2 < len; i2++) {
            keys[codes.down[i2]] = [0, panDelta];
          }
          for (i2 = 0, len = codes.up.length; i2 < len; i2++) {
            keys[codes.up[i2]] = [0, -1 * panDelta];
          }
        },
        _setZoomDelta: function(zoomDelta) {
          var keys = this._zoomKeys = {}, codes = this.keyCodes, i2, len;
          for (i2 = 0, len = codes.zoomIn.length; i2 < len; i2++) {
            keys[codes.zoomIn[i2]] = zoomDelta;
          }
          for (i2 = 0, len = codes.zoomOut.length; i2 < len; i2++) {
            keys[codes.zoomOut[i2]] = -zoomDelta;
          }
        },
        _addHooks: function() {
          on(document, "keydown", this._onKeyDown, this);
        },
        _removeHooks: function() {
          off(document, "keydown", this._onKeyDown, this);
        },
        _onKeyDown: function(e2) {
          if (e2.altKey || e2.ctrlKey || e2.metaKey) {
            return;
          }
          var key = e2.keyCode, map = this._map, offset;
          if (key in this._panKeys) {
            if (!map._panAnim || !map._panAnim._inProgress) {
              offset = this._panKeys[key];
              if (e2.shiftKey) {
                offset = toPoint(offset).multiplyBy(3);
              }
              if (map.options.maxBounds) {
                offset = map._limitOffset(toPoint(offset), map.options.maxBounds);
              }
              if (map.options.worldCopyJump) {
                var newLatLng = map.wrapLatLng(map.unproject(map.project(map.getCenter()).add(offset)));
                map.panTo(newLatLng);
              } else {
                map.panBy(offset);
              }
            }
          } else if (key in this._zoomKeys) {
            map.setZoom(map.getZoom() + (e2.shiftKey ? 3 : 1) * this._zoomKeys[key]);
          } else if (key === 27 && map._popup && map._popup.options.closeOnEscapeKey) {
            map.closePopup();
          } else {
            return;
          }
          stop(e2);
        }
      });
      Map.addInitHook("addHandler", "keyboard", Keyboard);
      Map.mergeOptions({
        // @section Mouse wheel options
        // @option scrollWheelZoom: Boolean|String = true
        // Whether the map can be zoomed by using the mouse wheel. If passed `'center'`,
        // it will zoom to the center of the view regardless of where the mouse was.
        scrollWheelZoom: true,
        // @option wheelDebounceTime: Number = 40
        // Limits the rate at which a wheel can fire (in milliseconds). By default
        // user can't zoom via wheel more often than once per 40 ms.
        wheelDebounceTime: 40,
        // @option wheelPxPerZoomLevel: Number = 60
        // How many scroll pixels (as reported by [L.DomEvent.getWheelDelta](#domevent-getwheeldelta))
        // mean a change of one full zoom level. Smaller values will make wheel-zooming
        // faster (and vice versa).
        wheelPxPerZoomLevel: 60
      });
      var ScrollWheelZoom = Handler.extend({
        addHooks: function() {
          on(this._map._container, "wheel", this._onWheelScroll, this);
          this._delta = 0;
        },
        removeHooks: function() {
          off(this._map._container, "wheel", this._onWheelScroll, this);
        },
        _onWheelScroll: function(e2) {
          var delta = getWheelDelta(e2);
          var debounce = this._map.options.wheelDebounceTime;
          this._delta += delta;
          this._lastMousePos = this._map.mouseEventToContainerPoint(e2);
          if (!this._startTime) {
            this._startTime = +/* @__PURE__ */ new Date();
          }
          var left = Math.max(debounce - (+/* @__PURE__ */ new Date() - this._startTime), 0);
          clearTimeout(this._timer);
          this._timer = setTimeout(bind(this._performZoom, this), left);
          stop(e2);
        },
        _performZoom: function() {
          var map = this._map, zoom2 = map.getZoom(), snap = this._map.options.zoomSnap || 0;
          map._stop();
          var d2 = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), d3 = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(d2)))) / Math.LN2, d4 = snap ? Math.ceil(d3 / snap) * snap : d3, delta = map._limitZoom(zoom2 + (this._delta > 0 ? d4 : -d4)) - zoom2;
          this._delta = 0;
          this._startTime = null;
          if (!delta) {
            return;
          }
          if (map.options.scrollWheelZoom === "center") {
            map.setZoom(zoom2 + delta);
          } else {
            map.setZoomAround(this._lastMousePos, zoom2 + delta);
          }
        }
      });
      Map.addInitHook("addHandler", "scrollWheelZoom", ScrollWheelZoom);
      var tapHoldDelay = 600;
      Map.mergeOptions({
        // @section Touch interaction options
        // @option tapHold: Boolean
        // Enables simulation of `contextmenu` event, default is `true` for mobile Safari.
        tapHold: Browser.touchNative && Browser.safari && Browser.mobile,
        // @option tapTolerance: Number = 15
        // The max number of pixels a user can shift his finger during touch
        // for it to be considered a valid tap.
        tapTolerance: 15
      });
      var TapHold = Handler.extend({
        addHooks: function() {
          on(this._map._container, "touchstart", this._onDown, this);
        },
        removeHooks: function() {
          off(this._map._container, "touchstart", this._onDown, this);
        },
        _onDown: function(e2) {
          clearTimeout(this._holdTimeout);
          if (e2.touches.length !== 1) {
            return;
          }
          var first = e2.touches[0];
          this._startPos = this._newPos = new Point(first.clientX, first.clientY);
          this._holdTimeout = setTimeout(bind(function() {
            this._cancel();
            if (!this._isTapValid()) {
              return;
            }
            on(document, "touchend", preventDefault);
            on(document, "touchend touchcancel", this._cancelClickPrevent);
            this._simulateEvent("contextmenu", first);
          }, this), tapHoldDelay);
          on(document, "touchend touchcancel contextmenu", this._cancel, this);
          on(document, "touchmove", this._onMove, this);
        },
        _cancelClickPrevent: function cancelClickPrevent() {
          off(document, "touchend", preventDefault);
          off(document, "touchend touchcancel", cancelClickPrevent);
        },
        _cancel: function() {
          clearTimeout(this._holdTimeout);
          off(document, "touchend touchcancel contextmenu", this._cancel, this);
          off(document, "touchmove", this._onMove, this);
        },
        _onMove: function(e2) {
          var first = e2.touches[0];
          this._newPos = new Point(first.clientX, first.clientY);
        },
        _isTapValid: function() {
          return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
        },
        _simulateEvent: function(type, e2) {
          var simulatedEvent = new MouseEvent(type, {
            bubbles: true,
            cancelable: true,
            view: window,
            // detail: 1,
            screenX: e2.screenX,
            screenY: e2.screenY,
            clientX: e2.clientX,
            clientY: e2.clientY
            // button: 2,
            // buttons: 2
          });
          simulatedEvent._simulated = true;
          e2.target.dispatchEvent(simulatedEvent);
        }
      });
      Map.addInitHook("addHandler", "tapHold", TapHold);
      Map.mergeOptions({
        // @section Touch interaction options
        // @option touchZoom: Boolean|String = *
        // Whether the map can be zoomed by touch-dragging with two fingers. If
        // passed `'center'`, it will zoom to the center of the view regardless of
        // where the touch events (fingers) were. Enabled for touch-capable web
        // browsers.
        touchZoom: Browser.touch,
        // @option bounceAtZoomLimits: Boolean = true
        // Set it to false if you don't want the map to zoom beyond min/max zoom
        // and then bounce back when pinch-zooming.
        bounceAtZoomLimits: true
      });
      var TouchZoom = Handler.extend({
        addHooks: function() {
          addClass(this._map._container, "leaflet-touch-zoom");
          on(this._map._container, "touchstart", this._onTouchStart, this);
        },
        removeHooks: function() {
          removeClass(this._map._container, "leaflet-touch-zoom");
          off(this._map._container, "touchstart", this._onTouchStart, this);
        },
        _onTouchStart: function(e2) {
          var map = this._map;
          if (!e2.touches || e2.touches.length !== 2 || map._animatingZoom || this._zooming) {
            return;
          }
          var p1 = map.mouseEventToContainerPoint(e2.touches[0]), p2 = map.mouseEventToContainerPoint(e2.touches[1]);
          this._centerPoint = map.getSize()._divideBy(2);
          this._startLatLng = map.containerPointToLatLng(this._centerPoint);
          if (map.options.touchZoom !== "center") {
            this._pinchStartLatLng = map.containerPointToLatLng(p1.add(p2)._divideBy(2));
          }
          this._startDist = p1.distanceTo(p2);
          this._startZoom = map.getZoom();
          this._moved = false;
          this._zooming = true;
          map._stop();
          on(document, "touchmove", this._onTouchMove, this);
          on(document, "touchend touchcancel", this._onTouchEnd, this);
          preventDefault(e2);
        },
        _onTouchMove: function(e2) {
          if (!e2.touches || e2.touches.length !== 2 || !this._zooming) {
            return;
          }
          var map = this._map, p1 = map.mouseEventToContainerPoint(e2.touches[0]), p2 = map.mouseEventToContainerPoint(e2.touches[1]), scale2 = p1.distanceTo(p2) / this._startDist;
          this._zoom = map.getScaleZoom(scale2, this._startZoom);
          if (!map.options.bounceAtZoomLimits && (this._zoom < map.getMinZoom() && scale2 < 1 || this._zoom > map.getMaxZoom() && scale2 > 1)) {
            this._zoom = map._limitZoom(this._zoom);
          }
          if (map.options.touchZoom === "center") {
            this._center = this._startLatLng;
            if (scale2 === 1) {
              return;
            }
          } else {
            var delta = p1._add(p2)._divideBy(2)._subtract(this._centerPoint);
            if (scale2 === 1 && delta.x === 0 && delta.y === 0) {
              return;
            }
            this._center = map.unproject(map.project(this._pinchStartLatLng, this._zoom).subtract(delta), this._zoom);
          }
          if (!this._moved) {
            map._moveStart(true, false);
            this._moved = true;
          }
          cancelAnimFrame(this._animRequest);
          var moveFn = bind(map._move, map, this._center, this._zoom, { pinch: true, round: false }, void 0);
          this._animRequest = requestAnimFrame(moveFn, this, true);
          preventDefault(e2);
        },
        _onTouchEnd: function() {
          if (!this._moved || !this._zooming) {
            this._zooming = false;
            return;
          }
          this._zooming = false;
          cancelAnimFrame(this._animRequest);
          off(document, "touchmove", this._onTouchMove, this);
          off(document, "touchend touchcancel", this._onTouchEnd, this);
          if (this._map.options.zoomAnimation) {
            this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), true, this._map.options.zoomSnap);
          } else {
            this._map._resetView(this._center, this._map._limitZoom(this._zoom));
          }
        }
      });
      Map.addInitHook("addHandler", "touchZoom", TouchZoom);
      Map.BoxZoom = BoxZoom;
      Map.DoubleClickZoom = DoubleClickZoom;
      Map.Drag = Drag;
      Map.Keyboard = Keyboard;
      Map.ScrollWheelZoom = ScrollWheelZoom;
      Map.TapHold = TapHold;
      Map.TouchZoom = TouchZoom;
      exports$12.Bounds = Bounds;
      exports$12.Browser = Browser;
      exports$12.CRS = CRS;
      exports$12.Canvas = Canvas;
      exports$12.Circle = Circle2;
      exports$12.CircleMarker = CircleMarker;
      exports$12.Class = Class;
      exports$12.Control = Control;
      exports$12.DivIcon = DivIcon;
      exports$12.DivOverlay = DivOverlay;
      exports$12.DomEvent = DomEvent;
      exports$12.DomUtil = DomUtil;
      exports$12.Draggable = Draggable;
      exports$12.Evented = Evented;
      exports$12.FeatureGroup = FeatureGroup;
      exports$12.GeoJSON = GeoJSON;
      exports$12.GridLayer = GridLayer;
      exports$12.Handler = Handler;
      exports$12.Icon = Icon;
      exports$12.ImageOverlay = ImageOverlay;
      exports$12.LatLng = LatLng;
      exports$12.LatLngBounds = LatLngBounds;
      exports$12.Layer = Layer;
      exports$12.LayerGroup = LayerGroup;
      exports$12.LineUtil = LineUtil;
      exports$12.Map = Map;
      exports$12.Marker = Marker3;
      exports$12.Mixin = Mixin;
      exports$12.Path = Path;
      exports$12.Point = Point;
      exports$12.PolyUtil = PolyUtil;
      exports$12.Polygon = Polygon2;
      exports$12.Polyline = Polyline2;
      exports$12.Popup = Popup2;
      exports$12.PosAnimation = PosAnimation;
      exports$12.Projection = index;
      exports$12.Rectangle = Rectangle2;
      exports$12.Renderer = Renderer;
      exports$12.SVG = SVG;
      exports$12.SVGOverlay = SVGOverlay;
      exports$12.TileLayer = TileLayer2;
      exports$12.Tooltip = Tooltip;
      exports$12.Transformation = Transformation;
      exports$12.Util = Util;
      exports$12.VideoOverlay = VideoOverlay;
      exports$12.bind = bind;
      exports$12.bounds = toBounds;
      exports$12.canvas = canvas;
      exports$12.circle = circle;
      exports$12.circleMarker = circleMarker;
      exports$12.control = control;
      exports$12.divIcon = divIcon;
      exports$12.extend = extend2;
      exports$12.featureGroup = featureGroup;
      exports$12.geoJSON = geoJSON;
      exports$12.geoJson = geoJson;
      exports$12.gridLayer = gridLayer;
      exports$12.icon = icon;
      exports$12.imageOverlay = imageOverlay;
      exports$12.latLng = toLatLng;
      exports$12.latLngBounds = toLatLngBounds;
      exports$12.layerGroup = layerGroup;
      exports$12.map = createMap;
      exports$12.marker = marker;
      exports$12.point = toPoint;
      exports$12.polygon = polygon;
      exports$12.polyline = polyline;
      exports$12.popup = popup;
      exports$12.rectangle = rectangle;
      exports$12.setOptions = setOptions;
      exports$12.stamp = stamp;
      exports$12.svg = svg;
      exports$12.svgOverlay = svgOverlay;
      exports$12.tileLayer = tileLayer;
      exports$12.tooltip = tooltip;
      exports$12.transformation = toTransformation;
      exports$12.version = version;
      exports$12.videoOverlay = videoOverlay;
      var oldL = window.L;
      exports$12.noConflict = function() {
        window.L = oldL;
        return this;
      };
      window.L = exports$12;
    }));
  })(leafletSrc$1, leafletSrc$1.exports);
  return leafletSrc$1.exports;
}
var leafletSrcExports = requireLeafletSrc();
const L$1 = /* @__PURE__ */ getDefaultExportFromCjs$2(leafletSrcExports);
const t = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: L$1
}, [leafletSrcExports]);
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
  L$1 as L,
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
  LoadScript as j,
  require$$0 as r,
  serializeStyles as s,
  ue as u,
  w
};
