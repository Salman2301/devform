import{H as _,_ as v,a as y,x as m,i as h,$ as T,a0 as N,a1 as w}from"./runtime.ORTRfx21.js";function E(e){console.warn("hydration_mismatch")}let o=!1;function O(e){o=e}let d=null,i;function $(e){d=e,i=e&&e[0]}function c(e){if(e.nodeType!==8)return e;var t=e;if(t.data!==_)return e;for(var n=[],a=0;(t=t.nextSibling)!==null;){if(t.nodeType===8){var r=t.data;if(r===_)a+=1;else if(r[0]===v){if(a===0)return d=n,i=n[0],t;a-=1}}n.push(t)}throw E(),y}var p,R;function D(){if(p===void 0){p=window,R=document;var e=Element.prototype;e.__click=void 0,e.__className="",e.__attributes=null,e.__e=void 0,Text.prototype.__nodeValue=" "}}function f(){return document.createTextNode("")}function I(e){const t=e.firstChild;return o?t===null?e.appendChild(f()):c(t):t}function S(e,t){return o?c(i):e.firstChild}function b(e,t=!1){const n=e.nextSibling;if(!o)return n;if(t&&(n==null?void 0:n.nodeType)!==3){var a=f(),r=m.dom;return r.unshift(a),n==null||n.before(a),a}return c(n)}function x(e){e.textContent=""}function u(e,t=m){var n=t.dom;return n===null?t.dom=e:(h(n)||(n=t.dom=[n]),h(e)?n.push(...e):n.push(e)),e}function g(e,t){var n=(t&N)!==0,a=(t&w)!==0,r;return()=>{if(o)return u(n?d:i),i;r||(r=T(e),n||(r=r.firstChild));var s=a?document.importNode(r,!0):r.cloneNode(!0);return u(n?[...s.childNodes]:s),s}}function H(e,t,n="svg"){var a=g(`<${n}>${e}</${n}>`,0),r;return()=>{if(o)return u(i),i;if(!r){var s=a();r=s.firstChild}var l=r.cloneNode(!0);return u(l),l}}function M(e){if(!o)return u(f());var t=i;return t||e.before(t=f()),u(t),t}function P(){if(o)return u(d),i;var e=document.createDocumentFragment(),t=f();return e.append(t),u([t]),e}function L(e,t){o||e.before(t)}const A="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(A);export{p as $,L as a,c as b,P as c,d,f as e,S as f,O as g,o as h,D as i,x as j,I as k,b as l,M as m,i as n,H as o,u as p,R as q,$ as s,g as t};