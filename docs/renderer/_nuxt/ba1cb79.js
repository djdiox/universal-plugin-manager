(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{383:function(e,t,r){var content=r(397);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(11).default)("7d7879ae",content,!0,{sourceMap:!1})},396:function(e,t,r){"use strict";r(383)},397:function(e,t,r){var n=r(10)(!1);n.push([e.i,".e-nuxt-container{min-height:calc(100vh - 50px);background:linear-gradient(90deg,#ece9e6,#fff);font-family:Helvetica,sans-serif}.e-nuxt-content{display:flex;justify-content:space-around;padding-top:100px;align-items:flex-start;flex-wrap:wrap}.e-nuxt-logo{width:400px}.e-nuxt-system-info{padding:20px;border-top:1px solid #397c6d;border-bottom:1px solid #397c6d}.e-nuxt-links{padding:100px 0;display:flex;justify-content:center}.e-nuxt-button{color:#364758;padding:5px 20px;border:1px solid #397c6d;margin:0 20px;border-radius:15px;font-size:1rem}.e-nuxt-button:hover{cursor:pointer;color:#fff;background-color:#397c6d}",""]),e.exports=n},452:function(e,t,r){"use strict";r.r(t);var n=r(26),o=(r(4),r(47),r(394),r(54),r(167),r(86),r(350)),c=r.n(o),l=r(351),d=r.n(l),f=r(354),h=r.n(f),m=r(347),x=r.n(m),v=r(355),w={name:"IndexPage",data:function(){return{externalContent:"",search:"",path:"",folder:[],headers:[{text:"Name",value:"name"},{text:"path",value:"path"},{text:"isLink",value:"isLink"}]}},mounted:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,controller.getAll();case 3:r=t.sent,console.log("Got Apps",r),e.folder=r,t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),console.error("Error while getting Apps");case 11:e.folder&&0!==e.folder.length||e.showFolder();case 12:case"end":return t.stop()}}),t,null,[[0,8]])})))()},methods:{handleClick:function(e){console.log(e),this.$router.push({path:"/apps/"+e.id})},showFolder:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:t.t0=process.platform,t.next="win32"===t.t0?3:"darwin"===t.t0?7:11;break;case 3:return e.path="C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs",t.next=6,e.showFolderWin32("C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs");case 6:return t.abrupt("break",13);case 7:return e.path="/Applications/",t.next=10,e.showFolderMacOS(e.path);case 10:return t.abrupt("break",13);case 11:r=new Notification("Not Supported",{body:process.platform+" is not supported"}),console.log(r);case 13:case"end":return t.stop()}}),t)})))()},openURL:function(e){window.open(e)},onFileChange:function(e){var t=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:n=e.target.files||e.dataTransfer.files,console.log(e,e.target.files),n.length||(t.folder=e.target.files,console(t.folder));case 3:case"end":return r.stop()}}),r)})))()},showFolderMacOS:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r=c.a.readdirSync(e.path).flatMap((function(t){return e.path+t})).map((function(e){var t=d.a.basename(e),r=c.a.statSync(e);return{path:e,isLink:!0,id:v.v4(),attributes:r,fileName:t,name:t.split(".")[0]}})).filter((function(e){return e.fileName.endsWith(".app")})),e.folder=r,c.a.writeFileSync("./apps.json",JSON.stringify(e.folder,null,2),"utf-8"),console.log(r);case 4:case"end":return t.stop()}}),t)})))()},showFolderWin32:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r=c.a.readdirSync(e.path).flatMap((function(t){var r=e.path+"\\"+t;return c.a.statSync(r).isDirectory()?c.a.readdirSync(r).map((function(e){return r+"\\"+e})):e.path+"\\"+t})).map((function(e){var t=d.a.basename(e),r={path:e,id:v.v4(),isLink:!1,attributes:null,fileName:t,name:t.split(".")[0]};if(e.endsWith("lnk"))try{r.attributes=x.a.shell.readShortcutLink(e),r.isLink=!0}catch(t){console.log("Can not read from "+e,t)}return r})),e.folder=e.folder.map((function(e){return e.hash=h.a.createHash("md5").update(JSON.stringify(e)).digest("hex"),e})),e.folder=r,c.a.writeFileSync("./apps.json",JSON.stringify(e.folder,null,2),"utf-8");case 4:case"end":return t.stop()}}),t)})))()}}},k=w,y=(r(396),r(53)),S=r(73),O=r.n(S),R=r(348),j=r(346),C=r(375),F=r(449),M=r(443),component=Object(y.a)(k,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",{attrs:{fluid:""}},[r("h1",[e._v("Installed Applications")]),e._v(" "),r("v-card",[r("v-card-title",[r("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"Search","single-line":"","hide-details":""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1),e._v(" "),r("v-data-table",{attrs:{headers:e.headers,items:e.folder,search:e.search},on:{"click:row":e.handleClick}})],1)],1)}),[],!1,null,null,null);t.default=component.exports;O()(component,{VCard:R.a,VCardTitle:j.a,VContainer:C.a,VDataTable:F.a,VTextField:M.a})}}]);