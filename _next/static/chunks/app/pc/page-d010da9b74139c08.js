(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[834],{6387:(e,t,s)=>{Promise.resolve().then(s.bind(s,8007))},8007:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>c});var r=s(5155),l=s(2115),a=s(5565);function c(){let[e,t]=(0,l.useState)([]),[s,c]=(0,l.useState)(!0),[n,o]=(0,l.useState)(null);if((0,l.useEffect)(()=>{let e="https://docs.google.com/spreadsheets/d/".concat("1gUdbhzWjdRmcet7CX592wJ25GN_CW-k1J08wERqzAGY","/gviz/tq?tqx=out:json&sheet=").concat(encodeURIComponent("PersonalCollection"));console.log(e),fetch(e).then(e=>e.text()).then(e=>{let s=JSON.parse(e.substring(e.indexOf("(")+1,e.lastIndexOf(")"))),r=s.table.cols.map(e=>e.label);t(s.table.rows.map(e=>{let t={};return r.forEach((s,r)=>{var l,a;t[s]=(null===(a=e.c[r])||void 0===a?void 0:null===(l=a.v)||void 0===l?void 0:l.toString())||""}),t})),c(!1)}).catch(e=>{console.error("Error fetching data:",e),o(e.message),c(!1)})},[]),s)return(0,r.jsx)("div",{className:"p-4",children:"Loading collection..."});if(n)return(0,r.jsxs)("div",{className:"p-4 text-red-500",children:["Error: ",n]});let i=e.length>0?Object.keys(e[0]):[],d=e=>{if(!e||"string"!=typeof e)return!1;let t=!!e.match(/\.(jpeg|jpg|gif|png|webp)$/i),s=e.startsWith("http")&&e.includes("image");return t||s};return(0,r.jsxs)("div",{className:"relative",children:[(0,r.jsx)("div",{className:"p-4",children:(0,r.jsx)("h1",{className:"text-2xl font-bold mb-4",children:"Personal Collection"})}),(0,r.jsx)("div",{className:"overflow-x-auto px-4",children:(0,r.jsxs)("table",{className:"min-w-full bg-white border border-gray-300",children:[(0,r.jsx)("thead",{children:(0,r.jsx)("tr",{children:i.map(e=>(0,r.jsx)("th",{className:"py-2 px-4 border-b border-gray-300 text-left",children:e},e))})}),(0,r.jsx)("tbody",{children:e.map((e,t)=>(0,r.jsx)("tr",{className:t%2==0?"bg-gray-50":"bg-white",children:i.map(t=>(0,r.jsx)("td",{className:"py-2 px-4 border-b border-gray-300",children:d(e[t])?(0,r.jsx)(a.default,{src:e[t],alt:"Product image",className:"w-24 h-24 object-contain",width:96,height:96}):e[t]},t))},t))})]})})]})}}},e=>{var t=t=>e(e.s=t);e.O(0,[565,441,517,358],()=>t(6387)),_N_E=e.O()}]);