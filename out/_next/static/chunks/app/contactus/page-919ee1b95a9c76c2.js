(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[618],{4066:function(e,a,s){Promise.resolve().then(s.bind(s,1085))},1085:function(e,a,s){"use strict";s.r(a);var r=s(7437),l=s(2265);a.default=()=>{let[e,a]=(0,l.useState)({name:"",email:"",message:""}),s=s=>{a({...e,[s.target.name]:s.target.value})},n=async s=>{s.preventDefault();try{(await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).ok?(alert("Message sent successfully!"),a({name:"",email:"",message:""})):alert("Failed to send message. Please try again.")}catch(e){console.error("Error:",e),alert("An error occurred. Please try again.")}};return(0,r.jsxs)("section",{className:"container py-24",children:[(0,r.jsxs)("h1",{className:"text-5xl flex justify-center items-center mb-12",children:["Thank you for contacting ",(0,r.jsx)("span",{className:"text-primary ml-2",children:"US"})]}),(0,r.jsxs)("article",{className:"flex flex-col md:flex-row gap-8",children:[(0,r.jsxs)("div",{className:"flex-1 text-xl bg-gray-100 p-6 rounded-lg",children:[(0,r.jsx)("h2",{className:"text-3xl font-semibold mb-4",children:"Contact Details"}),(0,r.jsxs)("p",{className:"mb-2",children:[(0,r.jsx)("strong",{children:"Address:"})," Adwaitmarg, Bagbazar, Kathmandu, Nepal."]}),(0,r.jsxs)("p",{className:"mb-2",children:[(0,r.jsx)("strong",{children:"Phone:"})," ",(0,r.jsx)("a",{href:"tel:+9779843671048",className:" hover:underline",children:"+977 9843671048"}),","," ",(0,r.jsx)("a",{href:"tel:+9779844393183",className:" hover:underline",children:"9844393183"}),","," ",(0,r.jsx)("a",{href:"tel:+9779867350369",className:" hover:underline",children:"9867350369"})]}),(0,r.jsxs)("p",{className:"mb-2",children:[(0,r.jsx)("strong",{children:"Email:"})," ",(0,r.jsx)("a",{href:"mailto:kanooniastra@gmail.com",className:" hover:underline",children:"kanooniastra@gmail.com"})]}),(0,r.jsx)("iframe",{src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.4530915269293!2d85.3169575120045!3d27.703293576085628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1900638a26d9%3A0x2cc8d8288a524442!2sKanooni%20Astra!5e0!3m2!1sen!2snp!4v1724668607999!5m2!1sen!2snp",width:"100%",height:"450",style:{border:0},loading:"lazy",referrerPolicy:"no-referrer-when-downgrade"})]}),(0,r.jsx)("div",{className:"flex-1 place-content-center",children:(0,r.jsxs)("form",{className:"space-y-4",onSubmit:n,children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"name",className:"block mb-1",children:"Name"}),(0,r.jsx)("input",{type:"text",id:"name",name:"name",value:e.name,onChange:s,className:"w-full p-2 border rounded",required:!0})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"email",className:"block mb-1",children:"Email"}),(0,r.jsx)("input",{type:"email",id:"email",name:"email",value:e.email,onChange:s,className:"w-full p-2 border rounded",required:!0})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"message",className:"block mb-1",children:"Message"}),(0,r.jsx)("textarea",{id:"message",name:"message",value:e.message,onChange:s,className:"w-full p-2 border rounded",required:!0})]}),(0,r.jsx)("button",{type:"submit",className:"rounded-lg bg-primary p-2 text-white hover:border-black hover:border-2 hover:bg-white border-2 border-white hover:text-black",children:"Send Message"})]})})]})]})}}},function(e){e.O(0,[971,23,744],function(){return e(e.s=4066)}),_N_E=e.O()}]);