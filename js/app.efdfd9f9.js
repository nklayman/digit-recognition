(function(e){function t(t){for(var r,a,i=t[0],u=t[1],f=t[2],s=0,d=[];s<i.length;s++)a=i[s],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&d.push(o[a][0]),o[a]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);b&&b(t);while(d.length)d.shift()();return c.push.apply(c,f||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,a=1;a<n.length;a++){var i=n[a];0!==o[i]&&(r=!1)}r&&(c.splice(t--,1),e=f(f.s=n[0]))}return e}var r={},o={app:0},c=[];function a(e){return f.p+"js/"+({}[e]||e)+"."+{"chunk-1fd22ee3":"799f77f4"}[e]+".js"}var i={};var u={ebb0:function(){return{"./rust_neural_network_bg.js":{__wbindgen_string_new:function(e,t){return r["d588"].exports["s"](e,t)},__wbindgen_json_parse:function(e,t){return r["d588"].exports["o"](e,t)},__wbindgen_json_serialize:function(e,t){return r["d588"].exports["p"](e,t)},__wbindgen_object_drop_ref:function(e){return r["d588"].exports["q"](e)},__wbg_log_3bafd82835c6de6d:function(e){return r["d588"].exports["f"](e)},__wbindgen_is_undefined:function(e){return r["d588"].exports["n"](e)},__wbg_new_59cb74e423758ede:function(){return r["d588"].exports["h"]()},__wbg_stack_558ba5917b466edd:function(e,t){return r["d588"].exports["l"](e,t)},__wbg_error_4bb6c2a97407129a:function(e,t){return r["d588"].exports["c"](e,t)},__wbg_getRandomValues_3ac1b33c90b52596:function(e,t,n){return r["d588"].exports["e"](e,t,n)},__wbg_randomFillSync_6f956029658662ec:function(e,t,n){return r["d588"].exports["i"](e,t,n)},__wbg_self_1c83eb4471d9eb9b:function(){return r["d588"].exports["k"]()},__wbg_require_5b2b5b594d809d9f:function(e,t,n){return r["d588"].exports["j"](e,t,n)},__wbg_crypto_c12f14e810edcaa2:function(e){return r["d588"].exports["b"](e)},__wbg_msCrypto_679be765111ba775:function(e){return r["d588"].exports["g"](e)},__wbg_getRandomValues_05a60bf171bfc2be:function(e){return r["d588"].exports["d"](e)},__wbg_static_accessor_MODULE_abf5ae284bffdf45:function(){return r["d588"].exports["m"]()},__wbindgen_throw:function(e,t){return r["d588"].exports["t"](e,t)},__wbindgen_rethrow:function(e){return r["d588"].exports["r"](e)}}}}};function f(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,f),n.l=!0,n.exports}f.e=function(e){var t=[],n=o[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,r){n=o[e]=[t,r]}));t.push(n[2]=r);var c,s=document.createElement("script");s.charset="utf-8",s.timeout=120,f.nc&&s.setAttribute("nonce",f.nc),s.src=a(e);var d=new Error;c=function(t){s.onerror=s.onload=null,clearTimeout(l);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),c=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+c+")",d.name="ChunkLoadError",d.type=r,d.request=c,n[1](d)}o[e]=void 0}};var l=setTimeout((function(){c({type:"timeout",target:s})}),12e4);s.onerror=s.onload=c,document.head.appendChild(s)}var b={"chunk-1fd22ee3":["ebb0"]}[e]||[];return b.forEach((function(e){var n=i[e];if(n)t.push(n);else{var r,o=u[e](),c=fetch(f.p+""+{ebb0:"516f2a5c95a63b74eb29"}[e]+".module.wasm");if(o instanceof Promise&&"function"===typeof WebAssembly.compileStreaming)r=Promise.all([WebAssembly.compileStreaming(c),o]).then((function(e){return WebAssembly.instantiate(e[0],e[1])}));else if("function"===typeof WebAssembly.instantiateStreaming)r=WebAssembly.instantiateStreaming(c,o);else{var a=c.then((function(e){return e.arrayBuffer()}));r=a.then((function(e){return WebAssembly.instantiate(e,o)}))}t.push(i[e]=r.then((function(t){return f.w[e]=(t.instance||t).exports})))}})),Promise.all(t)},f.m=e,f.c=r,f.d=function(e,t,n){f.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},f.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},f.t=function(e,t){if(1&t&&(e=f(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(f.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)f.d(n,r,function(t){return e[t]}.bind(null,r));return n},f.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return f.d(t,"a",t),t},f.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},f.p="/digit-recognition/",f.oe=function(e){throw console.error(e),e},f.w={};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],d=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var b=d;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"64be":function(e,t,n){"use strict";n("c894")},c894:function(e,t,n){},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23"),o=Object(r["c"])(" Draw below: "),c=Object(r["d"])("br",null,null,-1),a={ref:"canvas",style:{border:"2px solid black"}},i=Object(r["d"])("br",null,null,-1),u={key:0},f={key:1},s=Object(r["d"])("br",null,null,-1),d=Object(r["d"])("br",null,null,-1),l=Object(r["d"])("br",null,null,-1),b=Object(r["d"])("a",{href:"https://github.com/nklayman/digit-recognition"},"Source on GitHub",-1);function v(e,t,n,v,p,h){var _=Object(r["i"])("canvas");return Object(r["g"])(),Object(r["b"])("div",null,[o,c,Object(r["k"])(Object(r["d"])("canvas",a,null,512),[[_]]),i,Object(r["d"])("button",{onClick:t[1]||(t[1]=function(){return e.clear.apply(e,arguments)})},"Clear"),e.modelLoaded?(Object(r["g"])(),Object(r["b"])("div",f,"Guess is "+Object(r["j"])(e.guess)+", confidence is "+Object(r["j"])(e.confidence),1)):(Object(r["g"])(),Object(r["b"])("div",u,"Loading")),s,d,l,b])}n("4160"),n("d81d"),n("b680"),n("d3b7"),n("159b"),n("96cf");var p=n("1da1"),h=(n("99af"),n("5530")),_=function(e){var t=e,n=t.getContext("2d");if(!n)throw new Error("no canvas ctx");t.width=280,t.height=280,n.lineCap="round",n.lineWidth=10,n.shadowBlur=5,n.shadowColor="rgb(0, 0, 0)";var r={offsetX:0,offsetY:0},o=[],c=!1,a="black",i=function(e,t,o){if(n){var c=t.offsetX,a=t.offsetY,i=e.offsetX,u=e.offsetY;n.beginPath(),n.strokeStyle=o,n.moveTo(i,u),n.lineTo(c,a),n.stroke(),r={offsetX:c,offsetY:a}}},u=function(e){var t=e.offsetX,n=e.offsetY;c=!0,r={offsetX:t,offsetY:n}},f=function(e){var t;c&&(c=!1),null===(t=e.target)||void 0===t||t.dispatchEvent(new Event("endPaint"))},s=function(e){if(c){var t=e.offsetX,n=e.offsetY,u={offsetX:t,offsetY:n},f={start:Object(h["a"])({},r),stop:Object(h["a"])({},u)};o=o.concat(f),i(r,u,a)}};t.addEventListener("mousedown",u),t.addEventListener("mousemove",s),t.addEventListener("mouseup",f),t.addEventListener("mouseleave",f),t.addEventListener("touchstart",(function(e){e.preventDefault();var n=e.touches[0],r=t.getBoundingClientRect(),o=n.clientX+2*r.left,c=n.clientY+2*r.top,a=new MouseEvent("mousedown",{clientX:o,clientY:c});t.dispatchEvent(a)})),t.addEventListener("touchmove",(function(e){var n=e.touches[0],r=t.getBoundingClientRect(),o=n.clientX+2*r.left,c=n.clientY+2*r.top,a=new MouseEvent("mousemove",{clientX:o,clientY:c});t.dispatchEvent(a)}),!1),t.addEventListener("touchend",f),t.addEventListener("touchcancel",f)},g={mounted:_},m=(n("fb2c"),n("9a8c"),n("a975"),n("735e"),n("c1ac"),n("d139"),n("3a7b"),n("d5d6"),n("82f8"),n("e91f"),n("60bd"),n("5f96"),n("3280"),n("3fcc"),n("ca91"),n("25a1"),n("cd26"),n("3c5d"),n("2954"),n("649e"),n("219c"),n("170b"),n("b39a"),n("72f7"),function(e){var t=e.height,n=e.width,r=e.getContext("2d");if(!r)throw new Error("Could not get canvas ctx");var o,c,a=r.getImageData(0,0,n,t),i=a.data,u=new Uint32Array(i.buffer),f=n,s=t,d=0,l=0;for(c=0;c<t;c++)for(o=0;o<n;o++)u[o+c*n]>0&&o<f&&(f=o);for(c=0;c<t;c++)for(o=n;o>=0;o--)u[o+c*n]>0&&o>d&&(d=o);for(o=0;o<n;o++)for(c=0;c<t;c++)u[o+c*n]>0&&c<s&&(s=c);for(o=0;o<n;o++)for(c=t;c>=0;c--)u[o+c*n]>0&&c>l&&(l=c);return{left:f-50,top:s-50,width:d-f+100,height:l-s+100}}),w=m,j=Object(r["e"])({name:"App",directives:{canvas:g},setup:function(){var e,t=Object(r["h"])(),o=document.createElement("canvas"),c=o.getContext("2d"),a=function(){if(!t.value)throw new Error("No canvas");var e=w(t.value),n=e.top,r=e.left,a=e.width,i=e.height;null===c||void 0===c||c.clearRect(0,0,o.width,o.height),null===c||void 0===c||c.drawImage(t.value,r,n,a,i,0,0,28,28);var u=[];return null===c||void 0===c||c.getImageData(0,0,28,28).data.forEach((function(e,t){t%4===3&&u.push(e/255)})),u},i=Object(r["h"])(!1),u=function(){var t=Object(p["a"])(regeneratorRuntime.mark((function t(){var r,o,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,n.e("chunk-1fd22ee3").then(n.bind(null,"31e6"));case 2:return r=t.sent,o=r.Network,t.next=6,fetch("./model.json");case 6:return t.next=8,t.sent.text();case 8:c=t.sent,e=o.from_model(c),i.value=!0;case 11:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),f=Object(r["h"])(),s=Object(r["h"])(),d=function(){var t=a(),n=e.predict([t])[0],r=0;n.forEach((function(e,t){e>=n[r]&&(r=t,s.value=e.toFixed(3))})),console.log(n.map((function(e){return e.toFixed(3)}))),f.value=r};Object(r["f"])((function(){var e;u(),null===(e=t.value)||void 0===e||e.addEventListener("endPaint",(function(){i.value&&d()}))}));var l=function(){var e,n;null===(e=t.value)||void 0===e||null===(n=e.getContext("2d"))||void 0===n||n.clearRect(0,0,t.value.width,t.value.height),f.value=void 0,s.value=void 0};return{clear:l,canvas:t,modelLoaded:i,guess:f,confidence:s}}});n("64be");j.render=v;var y=j;Object(r["a"])(y).mount("#app")}});
//# sourceMappingURL=app.efdfd9f9.js.map