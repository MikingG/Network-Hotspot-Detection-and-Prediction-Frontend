(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5fc39b94"],{a192:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("el-tree",{attrs:{props:t.props,load:t.loadNode,lazy:"","show-checkbox":""}})],1)},c=[],o=n("c405"),r={data:function(){return{props:{label:"name",children:"zones",isLeaf:"leaf"}}},created:function(){},methods:{loadNode:function(t,e){0===t.level&&Object(o["a"])().then((function(t){e(t.data.items)})),t.level>0&&Object(o["b"])(t.data.id).then((function(t){e(t.data.items)}))}}},u=r,l=n("2877"),i=Object(l["a"])(u,a,c,!1,null,null,null);e["default"]=i.exports},c405:function(t,e,n){"use strict";n.d(e,"a",(function(){return c})),n.d(e,"b",(function(){return o}));var a=n("b775");function c(){return Object(a["a"])({url:"/category/all",method:"get"})}function o(t){return Object(a["a"])({url:"/category/get",method:"get",params:{parentId:t}})}}}]);