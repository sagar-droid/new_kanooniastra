(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{3318:function(e,t,l){Promise.resolve().then(l.t.bind(l,8173,23)),Promise.resolve().then(l.t.bind(l,231,23)),Promise.resolve().then(l.bind(l,6643))},9416:function(e,t,l){"use strict";var i=l(7437),s=l(2265);t.Z=()=>{let[e,t]=(0,s.useState)(!1),l=e=>{t(!1),"enquiry"===e?window.location.href="mailto:kanooniastra@gmail.com":"message"===e&&window.open("https://wa.me/9867350369","_blank")};return(0,i.jsxs)("div",{className:"relative",children:[(0,i.jsx)("button",{className:"rounded-lg text-xl bg-primary p-2 text-white hover:border-black hover:border-2 hover:bg-white border-2 border-white hover:text-black",onClick:()=>{t(e=>!e)},children:"Appointment"}),e&&(0,i.jsxs)("div",{className:"absolute top-full mt-2 bg-white shadow-lg rounded p-2 text-black",children:[(0,i.jsx)("button",{className:"block w-full text-left px-4 py-2 hover:bg-gray-200",onClick:()=>l("enquiry"),children:"Enquiry"}),(0,i.jsx)("button",{className:"block w-full text-left px-4 py-2 hover:bg-gray-200",onClick:()=>l("message"),children:"Message"})]})]})}},7567:function(e,t,l){"use strict";l.d(t,{Z:function(){return a}});var i=l(7437),s=l(7138);l(2265);var n=l(4839),r=l(6164),a=e=>{let{title:t,link:l,className:a,...o}=e;return(0,i.jsx)("button",{...o,className:function(){for(var e=arguments.length,t=Array(e),l=0;l<e;l++)t[l]=arguments[l];return(0,r.m6)((0,n.W)(t))}("rounded-lg text-xl bg-primary p-2 text-white hover:border-black hover:border-2 hover:bg-white border-2 border-white hover:text-black",a),children:(0,i.jsx)(s.default,{href:l,children:t})})}},1057:function(e,t,l){"use strict";var i=l(7437),s=l(7138),n=l(6463),r=l(2265),a=l(9824);let o={"Practice Area":[{title:"Foreign Direct Investment",link:"/our-services#foreign-direct-investment"},{title:"Intellectual Property",link:"/our-services#intellectual-property"},{title:"Family Law",link:"/our-services#family-law"},{title:"Property Law",link:"/our-services#property-law"},{title:"Corporate Law",link:"/our-services#corporate-law"},{title:"Litigation",link:"/our-services#litigation"},{title:"Criminal Law",link:"/our-services#criminal-law"}],Resources:[{title:"Blogs",link:"#"},{title:"Article",link:"#"},{title:"Useful Link",submenu:[{title:"Supreme Court of Nepal",link:"https://supremecourt.gov.np/web/"},{title:"Nepal Kanoon Patrika",link:"https://nkp.gov.np/"},{title:"Company Registar Office",link:"https://camis.ocr.gov.np/"},{title:"Nepal law commission",link:"https://www.lawcommission.gov.np/"},{title:"Tax office",link:"https://ird.gov.np/"},{title:"Department of cottage and small Industries",link:"http://www.dcsi.gov.np/en"},{title:"Department of Industries",link:"https://doind.gov.np/"},{title:"Department of commerce supplies and consumer protection",link:"https://doc.gov.np/"},{title:"Tourism Board",link:"https://www.tourismdepartment.gov.np/"},{title:"Department of Food Technology and Quality Control",link:"https://dftqc.gov.np/"},{title:"Tourism Office Kathmandu",link:"https://tourismktm.bagamati.gov.np/"},{title:"Social Wealfare Council",link:"https://www.swc.org.np/ne"},{title:"Office of the attorney General Nepal",link:"https://www.swc.org.np/ne"},{title:"Ip Bulletin",link:"https://doind.gov.np/industrial-property-bulletin "}]},{title:"News and Information",link:"#"}],About:[{title:"About Us",link:"/aboutus"},{title:"Our Team",link:"/ourteam"},{title:"Careers",link:"/careers"}]};t.Z=()=>{let e=(0,n.usePathname)(),[t,l]=(0,r.useState)(null),[c,u]=(0,r.useState)(null),d=(0,r.useRef)(null);(0,r.useEffect)(()=>{let e=e=>{d.current&&!d.current.contains(e.target)&&(l(null),u(null))};return document.addEventListener("mousedown",e),()=>{document.removeEventListener("mousedown",e)}},[]);let m=(e,i)=>{i.stopPropagation(),l(t===e?null:e),t!==e&&u(null)},p=(e,t)=>{t.stopPropagation(),u(c===e?null:e)},h=()=>{l(null),u(null)};return(0,i.jsxs)("ul",{ref:d,className:"flex flex-col md:items-center md:flex-row !z-[999999] gap-6",children:["/"!==e&&(0,i.jsx)("li",{className:"hover:text-red-500",children:(0,i.jsx)(s.default,{href:"/",children:"Home"})}),Object.entries(o).map(e=>{let[l,n]=e;return(0,i.jsxs)("li",{className:n.length>0?"relative hover:text-red-500":"",children:[(0,i.jsxs)("div",{tabIndex:0,role:"button",className:"flex gap-2 items-center cursor-pointer",onClick:e=>m(l,e),children:[l,n.length>0&&(0,i.jsx)("span",{className:"flex items-center",children:(0,i.jsx)(a.OId,{})})]}),n.length>0&&t===l&&(0,i.jsx)("ul",{className:"absolute dropdown-content text-black text-xl menu bg-base-100 rounded-box z-[99999] w-52 p-2 shadow",children:n.map(e=>(0,i.jsxs)("li",{className:"relative",children:[(0,i.jsxs)("div",{className:"flex justify-between items-center cursor-pointer",onClick:t=>e.submenu?p(e.title,t):h(),children:[(0,i.jsx)(s.default,{href:e.link||"#",children:e.title}),e.submenu&&(0,i.jsx)(a.OId,{})]}),e.submenu&&c===e.title&&(0,i.jsx)("ul",{className:"absolute border-2 border-gray-200 -left-2 top-[100%] m-0 md:ml-4 md:left-full md:top-0 text-black menu bg-base-100 rounded-box !z-[999999] md:w-96 p-2 shadow",children:e.submenu.map(e=>(0,i.jsx)("li",{onClick:h,children:(0,i.jsx)(s.default,{href:e.link,children:e.title})},e.title))})]},e.title))})]},l)})]})}},459:function(e,t,l){"use strict";var i=l(7437),s=l(2265),n=l(6648),r=l(7138),a=l(6463),o=l(4635),c=l(4446),u=l(1057),d=l(7567),m=l(9416);t.Z=()=>{let[e,t]=(0,s.useState)(!1),l=(0,a.usePathname)();return(0,i.jsxs)("div",{className:"md:hidden z-[9999999999999]",children:[(0,i.jsxs)("div",{className:"flex justify-between items-center p-4 ".concat("/"===l?"bg-transparent":"bg-white"," text-primary"),children:[(0,i.jsx)(r.default,{href:"/",children:(0,i.jsx)(n.default,{src:"/logo.png",alt:"logo",width:80,height:80})}),(0,i.jsx)(o.E.button,{onClick:()=>{t(!e)},className:"text-3xl z-50 ".concat(e?"text-white":"text-primary"),whileTap:{scale:.95},children:e?"\xd7":"☰"})]}),(0,i.jsx)(c.M,{children:e&&(0,i.jsx)(o.E.div,{initial:{opacity:0,x:"100%"},animate:{opacity:1,x:0},exit:{opacity:0,x:"100%"},transition:{type:"tween",duration:.3},className:"fixed top-0 left-0 w-full h-full bg-primary z-40 flex flex-col",children:(0,i.jsxs)(o.E.div,{className:"flex flex-col items-center justify-center space-y-6 text-white overflow-y-auto h-full p-6",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.2},children:[(0,i.jsx)(u.Z,{}),(0,i.jsx)(d.Z,{title:"Contact Us",link:"/contactus"}),(0,i.jsx)(m.Z,{})]})})})]})}},6643:function(e,t,l){"use strict";var i=l(7437),s=l(9416),n=l(7567),r=l(1057),a=l(459),o=l(6648);l(2265),t.default=()=>(0,i.jsxs)("section",{className:"relative w-full h-screen ",children:[(0,i.jsxs)("section",{className:"bg-transparent z-10 w-full absolute top-0",children:[(0,i.jsxs)("article",{className:"container py-10 hidden md:flex gap-20 !z-[999999] text-white items-center",children:[(0,i.jsx)("div",{children:(0,i.jsx)(o.default,{src:"/logowhite.png",alt:"logo",width:130,height:130})}),(0,i.jsxs)("div",{className:"items-center text-xl flex justify-between w-full",children:[(0,i.jsx)(r.Z,{}),(0,i.jsxs)("div",{className:"flex gap-4",children:[(0,i.jsx)(n.Z,{title:"Contact Us",link:"/contactus"}),(0,i.jsx)(s.Z,{})]})]})]}),(0,i.jsx)("div",{className:"z-20",children:(0,i.jsx)(a.Z,{})})]}),(0,i.jsx)("section",{children:(0,i.jsxs)("video",{className:"absolute z-0 top-0 left-0 w-full h-[100vh] object-cover",autoPlay:!0,loop:!0,muted:!0,playsInline:!0,children:[(0,i.jsx)("source",{src:"/video.mp4",type:"video/mp4",className:"w-full"}),"Your browser does not support the video tag."]})}),(0,i.jsxs)("article",{className:"relative h-screen",children:[(0,i.jsxs)("div",{className:"absolute inset-0 flex flex-col items-center justify-center",children:[(0,i.jsxs)("h1",{className:"text-5xl lg:text-[120px] uppercase text-primary font-bold",children:["Kanooni",(0,i.jsx)("span",{className:"text-white",children:"Astra"})]}),(0,i.jsx)("p",{className:"text-2xl font-semibold text-white",children:"“ ASTRA FOR ALL LEGAL ISSUES ”"})]}),(0,i.jsx)("div",{className:"absolute flex text-2xl items-center justify-center bottom-0 text-white p-8",children:(0,i.jsxs)("p",{children:["Beacon of"," ",(0,i.jsx)("span",{className:"text-primary italic",children:"legal excellence"})," forged by ",(0,i.jsx)("br",{}),(0,i.jsx)("span",{className:"text-primary italic",children:"passion"})," and"," ",(0,i.jsx)("span",{className:"text-primary italic",children:" commitment"})]})})]})]})}},function(e){e.O(0,[452,173,108,231,569,971,23,744],function(){return e(e.s=3318)}),_N_E=e.O()}]);