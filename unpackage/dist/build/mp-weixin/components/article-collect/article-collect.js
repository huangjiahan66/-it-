(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/article-collect/article-collect"],{"0b08":function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return c})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}));var c=function(){var t=this,e=t.$createElement;t._self._c},a=[]},"11d1":function(t,e,n){},"3bd8":function(t,e,n){"use strict";n.r(e);var r=n("0b08"),c=n("82d5");for(var a in c)"default"!==a&&function(t){n.d(e,t,(function(){return c[t]}))}(a);n("8cd5");var i,o=n("f0c5"),u=Object(o["a"])(c["default"],r["b"],r["c"],!1,null,"b723e848",null,!1,r["a"],i);e["default"]=u.exports},"7dcc":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=i(n("a34a")),c=n("26cb"),a=n("9d45");function i(t){return t&&t.__esModule?t:{default:t}}function o(t,e,n,r,c,a,i){try{var o=t[a](i),u=o.value}catch(l){return void n(l)}o.done?e(u):Promise.resolve(u).then(r,c)}function u(t){return function(){var e=this,n=arguments;return new Promise((function(r,c){var a=t.apply(e,n);function i(t){o(a,r,c,i,u,"next",t)}function u(t){o(a,r,c,i,u,"throw",t)}i(void 0)}))}}function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){f(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function f(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var d={name:"article-collect ",props:{articleData:{type:Object,required:!0}},computed:{getIsCollect:function(){return this.articleData&&this.articleData.isCollect?"/static/images/collect.png":"/static/images/un-collect.png"}},data:function(){return{}},mounted:function(){},methods:s(s({},(0,c.mapActions)("user",["isLogin"])),{},{onClick:function(){var e=this;return u(r.default.mark((function n(){var c;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.isLogin();case 2:if(n.sent){n.next=4;break}return n.abrupt("return");case 4:return t.showLoading({title:"加载中"}),n.next=7,(0,a.userCollect)({articleId:e.articleData.articleId,isCollect:!e.articleData.isCollect});case 7:c=n.sent,c.data,t.hideLoading(),e.$emit("changeCollect",!e.articleData.isCollect);case 11:case"end":return n.stop()}}),n)})))()}})};e.default=d}).call(this,n("543d")["default"])},"82d5":function(t,e,n){"use strict";n.r(e);var r=n("7dcc"),c=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=c.a},"8cd5":function(t,e,n){"use strict";var r=n("11d1"),c=n.n(r);c.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/article-collect/article-collect-create-component',
    {
        'components/article-collect/article-collect-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("3bd8"))
        })
    },
    [['components/article-collect/article-collect-create-component']]
]);
