(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-10f15375"],{"1b73":function(t,a,e){"use strict";e("514a")},"47fe":function(t,a,e){"use strict";e.r(a);var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"app-container"},[e("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[e("el-form-item",{attrs:{label:"品牌名称"}},[e("el-input",{model:{value:t.form.name,callback:function(a){t.$set(t.form,"name",a)},expression:"form.name"}})],1),e("el-form-item",{attrs:{label:"品牌图片"}},[e("el-upload",{staticClass:"avatar-uploader",attrs:{action:"http://localhost/brand/upload","show-file-list":!1,"on-success":t.handleAvatarSuccess,"before-upload":t.beforeAvatarUpload,name:"img"}},[t.form.image?e("img",{staticClass:"avatar",attrs:{src:t.form.image}}):e("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),e("el-form-item",{attrs:{label:"品牌字母"}},[e("el-input",{model:{value:t.form.letter,callback:function(a){t.$set(t.form,"letter",a)},expression:"form.letter"}})],1),e("el-form-item",{attrs:{label:"所属分类"}},[e("el-cascader",{attrs:{props:t.props},model:{value:t.form.categoryId,callback:function(a){t.$set(t.form,"categoryId",a)},expression:"form.categoryId"}})],1),e("el-form-item",[e("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("立即创建")])],1)],1)],1)},n=[],o=(e("d81d"),e("b0c0"),e("c405")),l=e("9add"),c={data:function(){return{form:{name:"",letter:"",image:"",categoryId:""},props:{lazy:!0,lazyLoad:this.lazyLoad}}},created:function(){var t=this;if(this.$route.params.id){var a=this.$route.params.id;Object(l["b"])(a).then((function(a){t.form=a.data.brand}))}},methods:{onSubmit:function(){var t=this;console.log(this.form),Object(l["a"])(this.form).then((function(a){t.$message({message:"添加成功",type:"success"})})),this.$router.push({path:"/brand/list"})},handleAvatarSuccess:function(t){this.form.image="http://localhost/"+t},beforeAvatarUpload:function(){},lazyLoad:function(t,a){var e=t.level;0==e?Object(o["a"])().then((function(t){var e=t.data.items.map((function(t){return{value:t.id,label:t.name,leaf:!1}}));a(e)})):Object(o["b"])(t.data.value).then((function(t){var r=t.data.items.map((function(t){return{value:t.id,label:t.name,leaf:e>=2}}));a(r)}))}}},s=c,i=(e("1b73"),e("2877")),u=Object(i["a"])(s,r,n,!1,null,null,null);a["default"]=u.exports},"514a":function(t,a,e){},"9add":function(t,a,e){"use strict";e.d(a,"c",(function(){return n})),e.d(a,"b",(function(){return o})),e.d(a,"a",(function(){return l}));var r=e("b775");function n(t){return Object(r["a"])({url:"/brand/all",method:"get",params:{pageNum:t}})}function o(t){return Object(r["a"])({url:"/brand/get",method:"get",params:{id:t}})}function l(t){return t.categoryId=t.categoryId[2],Object(r["a"])({url:"/brand/add",method:"post",params:t})}},c405:function(t,a,e){"use strict";e.d(a,"a",(function(){return n})),e.d(a,"b",(function(){return o}));var r=e("b775");function n(){return Object(r["a"])({url:"/category/all",method:"get"})}function o(t){return Object(r["a"])({url:"/category/get",method:"get",params:{parentId:t}})}}}]);