(function(t){function e(e){for(var n,o,r=e[0],l=e[1],c=e[2],m=0,p=[];m<r.length;m++)o=r[m],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&p.push(i[o][0]),i[o]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);d&&d(e);while(p.length)p.shift()();return s.push.apply(s,c||[]),a()}function a(){for(var t,e=0;e<s.length;e++){for(var a=s[e],n=!0,r=1;r<a.length;r++){var l=a[r];0!==i[l]&&(n=!1)}n&&(s.splice(e--,1),t=o(o.s=a[0]))}return t}var n={},i={app:0},s=[];function o(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=n,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(a,n,function(e){return t[e]}.bind(null,n));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=e,r=r.slice();for(var c=0;c<r.length;c++)e(r[c]);var d=l;s.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"034f":function(t,e,a){"use strict";var n=a("85ec"),i=a.n(n);i.a},"269f":function(t,e,a){"use strict";var n=a("89fc"),i=a.n(n);i.a},"3b77":function(t,e,a){"use strict";var n=a("b040"),i=a.n(n);i.a},"4e6b":function(t,e,a){},"56d7":function(t,e,a){"use strict";a.r(e);var n=a("2b0e"),i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("navBar"),a("router-view")],1)},s=[],o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"boardList"},[t._v(" [ "),t._l(t.boards,(function(e,n){return a("span",{key:n},[n+1<t.boards.length?a("span",[a("span",{staticClass:"link",on:{click:function(a){return t.goBoard(e.name)}}},[t._v(" "+t._s(e.name)+" ")]),t._v(" / ")]):a("span",[a("span",{staticClass:"link",on:{click:function(a){return t.goBoard(e.name)}}},[t._v(" "+t._s(e.name)+" ")])])])})),t._v(" ] "),t._m(0)],2)},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"navTopRight"},[t._v(" [ "),a("a",{staticClass:"boards",attrs:{href:"#"}},[t._v(" Home ")]),t._v(" ] ")])}],l={name:"navBar",data(){return{boards:[{name:"a",title:"Anime and Cartoons"},{name:"b",title:"Random"}]}},methods:{goBoard(t){this.$router.push({path:`/${t}/catalog`,params:{board:t}})}}},c=l,d=(a("3b77"),a("2877")),m=Object(d["a"])(c,o,r,!1,null,null,null),p=m.exports,u={name:"App",components:{navBar:p}},h=u,g=(a("034f"),Object(d["a"])(h,i,s,!1,null,null,null)),v=g.exports,f=a("8c4f"),b=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",[t._m(0),a("div",{staticClass:"boardTitle"},[t._v(" /"+t._s(t.board)+"/ - "+t._s(t.boardInfo[t.board])+" ")])]),a("div",{staticClass:"threadContent"})])},_=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"boardBanner"},[a("img",{staticClass:"center",attrs:{src:"/image/4bran.jpg"}})])}],C={name:"catalogPage",props:["board"],data(){return{boardInfo:{a:"Anime and Manga",b:"Random"}}},methods:{},mounted(){console.log("BRAN IS ONLINE")}},y=C,w=(a("269f"),Object(d["a"])(y,b,_,!1,null,null,null)),N=w.exports,x=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("originalPost"),a("thread"),a("reply-box",{ref:"replyBox"})],1)},k=[],P=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container pt-5"},[t._m(0),a("div",[a("div",{staticClass:"collapse",attrs:{id:"formContainer"}},[a("div",{staticClass:"row mt-2 justify-content-center"},[a("label",{staticClass:"mr-2 thread-label",attrs:{for:"uploadTitle"}},[t._v("Title")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],staticClass:"col-5",attrs:{type:"text",id:"uploadTitle"},domProps:{value:t.title},on:{input:function(e){e.target.composing||(t.title=e.target.value)}}})]),a("div",{staticClass:"row mt-2 mb-2 justify-content-center"},[a("p",{staticClass:"mr-2 thread-label"},[t._v("Description")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.content,expression:"content"}],staticClass:"col-5",attrs:{type:"text",rows:"8",id:"uploadContent"},domProps:{value:t.content},on:{input:function(e){e.target.composing||(t.content=e.target.value)}}})]),a("div",{staticClass:"row justify-content-center"},[a("form",{attrs:{enctype:"multipart/form-data"}},[a("input",{attrs:{type:"file",id:"uploadImage"},on:{change:t.onFileSelected}}),a("button",{staticClass:"ml-auto",attrs:{type:"submit"},on:{click:t.onUpload}},[t._v("Submit")])])])])])])},I=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex justify-content-center"},[a("button",{attrs:{id:"newThread",type:"button","data-target":"#formContainer","data-toggle":"collapse","aria-expanded":"false","aria-controls":"formContainer"}},[t._v("[ New Thread ]")])])}],T=a("bc3a"),j=a.n(T),E={name:"originalPost",data(){return{image:void 0,open:!0,title:"",content:""}},methods:{onFileSelected(t){console.log(t.target.files[0]),this.image=t.target.files[0]},async onUpload(){const t=new FormData;t.append("image",this.image,this.image.name),t.append("title",this.title),t.append("content",this.content),console.log(t),await j.a.post("/api/upload",t).then(t=>{console.log(t),location.reload()})},disableButton(){console.log("disabled"),document.getElementById("newThread").disabled=!0},async getThread(){await j.a.get("/api/thread").then(t=>{void 0!==t.data.image&&this.disableButton()})}},mounted(){this.getThread()}},S=E,O=(a("d975"),Object(d["a"])(S,P,I,!1,null,"25dcf4e8",null)),D=O.exports,B=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("div",[t.isFetching||void 0===t.thread.content?a("div"):a("div",{staticClass:"opContainer"},[a("div",{staticClass:"titleContainer"},[a("div",{staticClass:"threadTitle subject"},[t._v(" "+t._s(t.thread.title)+" ")]),a("div",{staticClass:"threadTitle"},[t._v("File: "),a("a",{attrs:{href:t.thread.image.path}},[t._v("Image URL ("+t._s(t.thread.image.size.nWidth)+"x"+t._s(t.thread.image.size.nHeight)+")")]),a("div",{staticClass:"threadTitle anonymous"},[t._v(" Anonymous ")]),a("button",{staticClass:"threadTitle postNumber ml-2",on:{click:function(e){return t.emitGlobalClickEvent()}}},[t._v(" No. "+t._s(t.thread.postNumber)+" ")])])]),a("div",{staticClass:"imageContainer"},[a("imageComponent",{attrs:{image:t.thread.image}})],1),a("div",{staticClass:"threadContent postMessage"},[t._v(" "+t._s(t.thread.content)+" ")]),t._l(t.thread.replies,(function(t,e){return a("div",{key:e,staticClass:"threadReplies"},[a("replyComponent",{attrs:{replyData:t}})],1)}))],2)])])},R=[];const q=new n["a"];var A=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("img",{attrs:{width:t.newImage.width,height:t.newImage.height,src:t.image.path},on:{click:t.expandImage}})])},F=[],z={name:"imageComponent",props:["image"],data(){return{newImage:{width:0,height:0},expanded:!1}},methods:{expandImage(){this.expanded?(this.newImage.width=this.image.size.pWidth,this.newImage.height=this.image.size.pHeight,this.expanded=!1):(this.newImage.width=this.image.size.nWidth,this.newImage.height=this.image.size.nHeight,this.expanded=!0)}},created(){this.newImage.height=this.image.size.height,this.newImage.width=this.image.size.width}},H=z,L=Object(d["a"])(H,A,F,!1,null,null,null),M=L.exports,G=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"sideArrows"},[t._v(">>")]),a("div",{staticClass:"reply post",attrs:{id:t.padPostNumber(t.replyData.postNumber)}},[a("div",{staticClass:"postInfo"},[a("span",{staticClass:"anonymous"},[t._v(" Anonymous ")]),void 0!==t.replyData.image?a("span",[t._v("File: "),a("a",{attrs:{href:t.replyData.image.path}},[t._v("Image URL ("+t._s(t.replyData.image.size.nWidth)+"x"+t._s(t.replyData.image.size.nHeight)+")")])]):t._e(),a("span",{staticClass:"postNumber ml-2",on:{click:function(e){return t.emitGlobalClickEvent(t.replyData.postNumber)}}},[t._v("No."+t._s(t.padPostNumber(t.replyData.postNumber)))])]),a("div",{staticClass:"postMessage"},[t.replyData.image?a("imageComponent",{staticClass:"imageMessage",attrs:{image:t.replyData.image}}):t._e(),a("span",{domProps:{innerHTML:t._s(t.parseContent(t.replyData.comment))}})],1)])])},W=[],U={name:"replyComponent",props:["replyData"],components:{imageComponent:M},methods:{padPostNumber(t){let e=8-t.toString().length;console.log("padding: ",t.toString.length,e);let a=t.toString();return a=a.padStart(e,"0"),a},emitGlobalClickEvent(){q.$emit("thread-number-clicked",this.padPostNumber(this.replyData.postNumber))},parseContent(t){let e="";e=t.replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll("\n","<br>").replaceAll(/&gt;&gt;[0-9]{7}/g,t=>(console.log(`<button class="quoteLink">${t}</button>`),`<button class="quoteLink" id="${t.substr(2)}">${t}</button>`)).replace(/\[spoiler\].*\[\/spoiler\]/g,t=>(t=t.replace("[spoiler]",""),t=t.replace("[/spoiler]",""),console.log(t),`<s>${t}</s>`));let a=[];return e=e.split("\n"),e.forEach(t=>{t.search(/&gt;(?!&gt;).+$/g)?(t=`<span class="quote">${t}</span>`,a.push(t)):a.push(t)}),a=a.join("\n"),a},scrollToPost(t){let e=document.getElementById(t);e.scrollIntoView()}},mounted(){var t=document.getElementsByClassName("quoteLink");for(let e=0;e<t.length;e++)t[e].addEventListener("click",()=>{console.log("Clicked ",this.scrollToPost(t[e].id))})}},V=U,J=(a("db12"),Object(d["a"])(V,G,W,!1,null,null,null)),K=J.exports,X={name:"thread",data(){return{image:void 0,isFetching:!0,thread:{},webm:!1}},methods:{async getThread(){await j.a.get("/api/thread").then(t=>{this.isFetching=!1,this.thread.image=t.data.image,this.thread.image.path=`${window.location.origin}/${t.data.image.path}`,this.thread.title=t.data.title,this.thread.replies=t.data.replies,this.thread.content=t.data.content,this.thread.postNumber=this.padPostNumber(t.data.postNumber),this.thread.replies.forEach(t=>{t.image&&(t.image.path=`${window.location.origin}/${t.image.path}`)}),console.log("getThread",t.data.postNumber)})},getImageType(t){return console.log("Here With the Image bud"),!0},padPostNumber(t){let e=8-t.toString().length;console.log("padding: ",t.toString.length,e);let a=t.toString();return a=a.padStart(e,"0"),a},emitGlobalClickEvent(){q.$emit("thread-number-clicked",this.thread.postNumber)}},created(){this.getThread()},components:{imageComponent:M,replyComponent:K}},Y=X,Q=(a("9af0"),Object(d["a"])(Y,B,R,!1,null,null,null)),Z=Q.exports,tt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.open?a("div",{staticClass:"extPanel reply d-none",attrs:{id:"quickReply"}},[a("div",{staticClass:"drag postblock",attrs:{id:"qrHeader"}},[t._v("Reply to Thread No."),a("span",{attrs:{id:"qrTid"}},[t._v(t._s(t.padPostNumber(t.threadNumber)))]),a("img",{staticClass:"extButton",attrs:{alt:"X",src:"/image/cross.png",id:"qrClose",title:"Close Window"},on:{click:function(e){return t.hide()}}})]),a("div",{attrs:{id:"qrForm"}},[a("div",[a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.comment,expression:"comment"}],attrs:{name:"com",cols:"48",rows:"4",wrap:"soft",tabindex:"0",placeholder:"Comment"},domProps:{value:t.comment},on:{input:function(e){e.target.composing||(t.comment=e.target.value)}}})]),a("div",[a("form",{attrs:{enctype:"multipart/form-data"}},[a("input",{attrs:{type:"file",id:"uploadReplyImage"},on:{change:t.onFileSelected}}),a("button",{staticClass:"ml-auto",attrs:{type:"submit"},on:{click:function(e){return t.sendReply()}}},[t._v("Submit")])])])]),a("div",{attrs:{id:"qrError"}})]):t._e()},et=[],at={name:"replyBox",data(){return{image:void 0,comment:"",open:!0,threadNumber:0}},methods:{makeDraggable(){const t=$("#quickReply");t.draggable()},makeVisible(){const t=$("#quickReply");t.hasClass("d-none")&&t.removeClass("d-none")},hide(){const t=$("#quickReply");t.hasClass("d-none")||t.addClass("d-none")},addComment(t){this.comment=this.comment.concat(`>>${t} \n`)},padPostNumber(t){let e=8-t.toString().length;console.log("padding: ",t.toString.length,e);let a=t.toString();return a=a.padStart(e,"0"),a},onFileSelected(t){console.log(t.target.files[0]),this.image=t.target.files[0]},async getThread(){await j.a.get("/api/thread").then(t=>{t.data.postNumber&&(this.threadNumber=t.data.postNumber),void 0!==t.data.image&&this.makeVisible()})},async sendReply(){const t=new FormData;void 0!==this.image&&t.append("image",this.image,this.image.name),t.append("comment",this.comment),console.log("IS ANYTHING FUCKING HAPPENING",t),await j.a.post("/api/reply",t).then(t=>{console.log(t)})}},mounted(){this.makeDraggable(),this.getThread(),q.$on("thread-number-clicked",t=>{this.makeVisible(),this.addComment(t)})}},nt=at,it=(a("a1fe"),Object(d["a"])(nt,tt,et,!1,null,null,null)),st=it.exports,ot={name:"threadPage",components:{originalPost:D,thread:Z,replyBox:st}},rt=ot,lt=Object(d["a"])(rt,x,k,!1,null,null,null),ct=lt.exports;n["a"].use(f["a"]);const dt=[{path:"/:board/catalog",component:N,name:"catalogPage",props:!0},{path:"/:board/thread/:threadId",component:ct,name:"threadPage",props:!0}],mt=new f["a"]({routes:dt});var pt=mt;n["a"].config.productionTip=!1,new n["a"]({router:pt,render:function(t){return t(v)}}).$mount("#app")},"85ec":function(t,e,a){},"89fc":function(t,e,a){},"9af0":function(t,e,a){"use strict";var n=a("c1a1"),i=a.n(n);i.a},a1fe:function(t,e,a){"use strict";var n=a("ea5e"),i=a.n(n);i.a},b040:function(t,e,a){},b5ea:function(t,e,a){},c1a1:function(t,e,a){},d975:function(t,e,a){"use strict";var n=a("4e6b"),i=a.n(n);i.a},db12:function(t,e,a){"use strict";var n=a("b5ea"),i=a.n(n);i.a},ea5e:function(t,e,a){}});
//# sourceMappingURL=app.cc33881b.js.map