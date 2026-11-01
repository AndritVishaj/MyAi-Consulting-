(function(){
 var NS="http://www.w3.org/2000/svg",N=64,R1=58,R2=108,step=2*Math.PI/N;
 function pts(i){var a=i*step,wi=step*.15,wo=step*.31,p=[[R1,a-wi],[R2,a-wo],[R2,a+wo],[R1,a+wi]];
  return p.map(function(q){return (q[0]*Math.cos(q[1])).toFixed(2)+","+(q[0]*Math.sin(q[1])).toFixed(2)}).join(" ")}
 document.querySelectorAll("svg.sun,#heroSun").forEach(function(svg){
  for(var i=0;i<N;i++){var p=document.createElementNS(NS,"polygon");p.setAttribute("points",pts(i));p.setAttribute("fill","#0a0a0a");p.style.setProperty("--i",i);svg.appendChild(p)}
 });
 document.getElementById("yr").textContent=new Date().getFullYear();
 var K="mac-cookie-consent",mem=null,bn=document.getElementById("cookie");
 function get(){if(mem)return mem;try{return localStorage.getItem(K)}catch(e){return null}}
 function showState(){var s=document.getElementById("consentState"),c=get();if(s)s.textContent=c==="all"?"You accepted all cookies.":c==="essential"?"You chose essential cookies only.":"You have not made a choice yet."}
 function set(v){mem=v;try{localStorage.setItem(K,v)}catch(e){}bn.hidden=true;showState()}
 [["cAll","all"],["cAll2","all"],["cEss","essential"],["cEss2","essential"]].forEach(function(p){document.getElementById(p[0]).addEventListener("click",function(){set(p[1])})});
 document.getElementById("cSet").addEventListener("click",function(){bn.hidden=false});
 bn.hidden=!!get();
 var home=document.getElementById("top"),pg=document.getElementById("pages"),nav=document.getElementById("mainNav"),mb=document.getElementById("menuBtn"),dd=document.querySelector(".dd"),ddb=dd.querySelector(".ddb");
 var T={plans:"Plans",about:"About",faq:"FAQ",blog:"Blog","the-world":"The World",privacy:"Privacy Policy",terms:"Terms and Conditions",cookies:"Cookie Policy"},base=document.title;
 var D={plans:"Simple plans for AI consulting, marketing, automation and brand work. Every project is built around your goals.",about:"Learn about MyAIConsulting: what we do, who we help and how we work.",faq:"Answers to common questions about our services, process, timing and how to get started.",blog:"Notes on AI, marketing and building a business that works.","the-world":"An example blog post about how AI is changing the way businesses work.",privacy:"How MyAIConsulting collects, uses and protects your personal data.",terms:"The terms for using the MyAIConsulting website and services.",cookies:"How MyAIConsulting uses cookies and how you can control them."};
 var CT={faq:"Still have questions?",plans:"Not sure which plan fits?",blog:"Have a project in mind?"};
 var md=document.getElementById("metaDesc"),dBase=md.getAttribute("content");
 function route(){
  var h=decodeURIComponent(location.hash.slice(1)),v=T.hasOwnProperty(h);
  home.hidden=v;pg.hidden=!v;
  pg.querySelectorAll(".page").forEach(function(p){p.hidden=p.id!==h});
  document.title=v?T[h]+" | MyAIConsulting":base;md.setAttribute("content",v?D[h]:dBase);document.getElementById("fctaH").textContent=CT[h]||"Ready to grow with AI?";
  nav.classList.remove("open");mb.setAttribute("aria-expanded","false");dd.classList.remove("open");ddb.setAttribute("aria-expanded","false");
  var t=!v&&h&&document.getElementById(h);
  if(t)t.scrollIntoView();else window.scrollTo(0,0);
  showState();
 }
 mb.addEventListener("click",function(){var o=nav.classList.toggle("open");mb.setAttribute("aria-expanded",o)});
 ddb.addEventListener("click",function(){var o=dd.classList.toggle("open");ddb.setAttribute("aria-expanded",o)});
 document.addEventListener("click",function(e){if(!dd.contains(e.target))dd.classList.remove("open")});
 document.addEventListener("keydown",function(e){if(e.key==="Escape"){dd.classList.remove("open");nav.classList.remove("open")}});
 var tb=document.getElementById("themeBtn"),root=document.documentElement,tm=document.querySelector('meta[name="theme-color"]');
 function applyTheme(t,save){root.dataset.theme=t;tb.setAttribute("aria-label",t==="dark"?"Switch to light mode":"Switch to dark mode");tm.setAttribute("content",t==="dark"?"#0a0a0a":"#ffffff");if(save){try{localStorage.setItem("mac-theme",t)}catch(e){}}}
 tb.addEventListener("click",function(){applyTheme(root.dataset.theme==="dark"?"light":"dark",true)});
 applyTheme(root.dataset.theme||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),false);
 window.addEventListener("hashchange",route);
 route();
 var f=document.getElementById("form"),msg=document.getElementById("msg");
 f.addEventListener("submit",function(ev){
  ev.preventDefault();
  var n=f.n.value.trim(),e=f.e.value.trim(),m=document.getElementById("m").value.trim(),s=document.getElementById("s").value;
  if(!n||!/^\S+@\S+\.\S+$/.test(e)||!m){msg.textContent="Add your name, a valid email and a short message, then send again.";return}
  var body="Name: "+n+"\nEmail: "+e+"\nInterested in: "+s+"\n\n"+m;
  window.location.href="mailto:"+"info@myai-consulting.com"+"?subject="+encodeURIComponent("Enquiry: "+s)+"&body="+encodeURIComponent(body);
  msg.textContent="Your email app should open with the message ready. If it doesn’t, write to info@myai-consulting.com.";
 });
})();
