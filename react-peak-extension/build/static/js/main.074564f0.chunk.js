(window["webpackJsonpreact-peek-extension"]=window["webpackJsonpreact-peek-extension"]||[]).push([[0],{11:function(e,n,t){},14:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),i=t(2),l=t.n(i),d=(t(11),t(16)),r=t(4),c=t.n(r),s=t(5),m=function(){return{windowPosition:{x:100,y:100}}},u=o.a.createContext({}),E=function(e){var n=e.children,t=m().windowPosition,i=Object(a.useState)(void 0),l=Object(s.a)(i,2),d=l[0],r=l[1];return Object(a.useEffect)((function(){window.addEventListener("message",(function(e){e.source===window&&e.data.type&&"EXTENSION_ID_RESULT"===e.data.type&&r(e.data.extensionId)}))}),[]),o.a.createElement(u.Provider,{value:{extensionId:d,getExtensionId:function(){window.postMessage({type:"GET_EXTENSION_ID"},"*")},windowPosition:t}},n)},w=function(){return o.a.createElement(u.Consumer,null,(function(e){var n=e.windowPosition,t=e.hasDraggedWindowPosition,a=e.extensionId,i=e.getExtensionId;return o.a.createElement(c.a,{handle:".modal-handle",defaultPosition:{x:n.x,y:n.y},position:t?{x:n.x,y:n.y}:null},o.a.createElement("div",{id:"modal",className:"modal-window",style:{transform:n}},o.a.createElement("div",{className:"modal-window-inner-border"},o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"modal-body"},o.a.createElement("div",{className:"modal-handle"},o.a.createElement("div",{className:"modal-close-button"},o.a.createElement(d.a,{color:"#5d6484",size:"14"}))),o.a.createElement("div",{className:"modal-content"},o.a.createElement("h3",null,a),o.a.createElement("button",{onClick:i,className:"modal-button"},"Get Extension ID")))))))}))};var f=function(){return o.a.createElement(E,null,o.a.createElement(w,null))};l.a.render(o.a.createElement(o.a.Fragment,null,o.a.createElement(f,null)),document.getElementById("modal-window"))},6:function(e,n,t){e.exports=t(14)}},[[6,1,2]]]);
//# sourceMappingURL=main.074564f0.chunk.js.map