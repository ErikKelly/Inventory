(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[292],{1655:(e,t,r)=>{Promise.resolve().then(r.bind(r,7503))},7503:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>c});var s=r(5155),a=r(2115),l=r(5565);function c(){let[e,t]=(0,a.useState)([]),[r,c]=(0,a.useState)(!0),[n,d]=(0,a.useState)(null);if((0,a.useEffect)(()=>{let e="https://docs.google.com/spreadsheets/d/".concat("1gUdbhzWjdRmcet7CX592wJ25GN_CW-k1J08wERqzAGY","/gviz/tq?tqx=out:json&sheet=").concat(encodeURIComponent("PC-Graded"));console.log(e),fetch(e).then(e=>e.text()).then(e=>{let r=JSON.parse(e.substring(e.indexOf("(")+1,e.lastIndexOf(")"))),s=r.table.cols.map(e=>e.label);t(r.table.rows.map(e=>{let t={};return s.forEach((r,s)=>{var a,l;t[r]=(null===(l=e.c[s])||void 0===l?void 0:null===(a=l.v)||void 0===a?void 0:a.toString())||""}),t})),c(!1)}).catch(e=>{console.error("Error fetching data:",e),d(e.message),c(!1)})},[]),r)return(0,s.jsx)("div",{className:"p-4",children:"Loading collection..."});if(n)return(0,s.jsxs)("div",{className:"p-4 text-red-500",children:["Error: ",n]});let o=e.length>0?Object.keys(e[0]):[],i=e=>{if(!e||"string"!=typeof e)return!1;let t=!!e.match(/\.(jpeg|jpg|gif|png|webp)$/i),r=e.startsWith("http")&&e.includes("image");return t||r};return(0,s.jsxs)("div",{className:"relative py-5",children:[(0,s.jsx)("div",{className:"p-4",children:(0,s.jsx)("h1",{className:"text-2xl font-bold mb-4",children:"Personal Collection - Graded"})}),(0,s.jsx)("div",{className:"overflow-x-auto px-4",children:(0,s.jsxs)("table",{className:"min-w-full bg-white border border-gray-300",children:[(0,s.jsx)("thead",{children:(0,s.jsx)("tr",{children:o.map(e=>(0,s.jsx)("th",{className:"py-2 px-4 border-b border-gray-300 text-left",children:e},e))})}),(0,s.jsx)("tbody",{children:e.map((e,t)=>(0,s.jsx)("tr",{className:t%2==0?"bg-gray-50":"bg-white",children:o.map(t=>(0,s.jsx)("td",{className:"py-2 px-4 border-b border-gray-300",children:i(e[t])?(0,s.jsx)(l.default,{src:e[t],alt:"Product image",className:"w-24 h-24 object-contain",width:96,height:96}):e[t]},t))},t))})]})})]})}}},e=>{var t=t=>e(e.s=t);e.O(0,[565,441,517,358],()=>t(1655)),_N_E=e.O()}]);