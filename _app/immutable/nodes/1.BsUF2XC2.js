import{a as y,t as k,k as i,f as x,l as c}from"../chunks/disclose-version.DT3gz_Os.js";import{R as I,T as f,k as w,V as l,y as d,W as E,w as m,X as N,Y as u,F as T,U as b,t as p,v as U,p as Z,Z as j,j as A}from"../chunks/runtime.ORTRfx21.js";import{a as _}from"../chunks/render.-hGGWO_O.js";import{s as D}from"../chunks/entry.BNdivZNA.js";function F(){const s=w,e=s.l.u;e&&(e.b.length&&I(()=>{g(s),l(e.b)}),f(()=>{const n=d(()=>e.m.map(E));return()=>{for(const t of n)typeof t=="function"&&t()}}),e.a.length&&f(()=>{g(s),l(e.a)}))}function g(s){if(s.l.s)for(const e of s.l.s)m(e);N(s.s)}function L(s,e,n){if(s==null)return e(void 0),u;const t=s.subscribe(e,n);return t.unsubscribe?()=>t.unsubscribe():t}function R(s,e,n){let t=n[e];const r=t===void 0;r&&(t={store:null,last_value:null,value:U(b),unsubscribe:u},n[e]=t),(r||t.store!==s)&&(t.unsubscribe(),t.store=s??null,t.unsubscribe=S(s,t.value));const a=m(t.value);return a===b?t.last_value:a}function S(s,e){return s==null?(p(e,void 0),u):L(s,n=>p(e,n))}function V(s){W(()=>{let e;for(e in s)s[e].unsubscribe()})}function W(s){T(()=>()=>d(s))}const X=()=>{const s=D;return{page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},updated:s.updated}},Y={subscribe(s){return X().page.subscribe(s)}};var q=k("<h1> </h1> <p> </p>",1);function H(s,e){Z(e,!1);const n={};V(n);const t=()=>R(Y,"$page",n);F();var r=q(),a=x(r),v=i(a),h=c(c(a,!0)),$=i(h);j(()=>{var o;_(v,t().status),_($,(o=t().error)==null?void 0:o.message)}),y(s,r),A()}export{H as component};