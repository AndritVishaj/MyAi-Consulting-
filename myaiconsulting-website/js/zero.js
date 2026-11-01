(function(){
"use strict";
var KB=(window.ZERO_KB||[]).map(function(e){var k=e[0],s=k.charAt(0)==="~";if(s)k=k.slice(1);return{k:k.split("|"),a:e[1],soft:s}});
var $=function(i){return document.getElementById(i)};
var btn=$("zeroBtn"),panel=$("zeroPanel"),logEl=$("zeroLog"),form=$("zeroForm"),inp=$("zeroIn"),chips=$("zeroChips"),closeB=$("zeroClose");
if(!btn||!panel)return;
var greeted=false,fb=0,reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
var M="[[mailto:info@myai-consulting.com|info@myai-consulting.com]]";
var FALL=["Hmm, that one is a bit outside what I know. I’m best with questions about MyAIConsulting, but I’m happy to chat. Try one of the buttons below, or email a real person at "+M+".",
"Good question! I don’t have an answer for that one. I can help with our services, plans, process and contact details.",
"I’m not sure about that. I’m a small assistant, so I stick to what I know. Want to try one of the buttons below?"];
var CHIPS=[["Services","what services do you offer"],["Plans and prices","how much does it cost"],["How it works","how does it work"],["Talk to a person","talk to a person"]];
function norm(s){return " "+s.toLowerCase().replace(/[’'`]/g,"").replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim()+" "}
function ed1(a,b){if(a===b)return true;var l=a.length-b.length;if(l>1||l<-1)return false;var i=0,j=0,d=0;while(i<a.length&&j<b.length){if(a[i]===b[j]){i++;j++}else{if(++d>1)return false;if(l>0)i++;else if(l<0)j++;else{i++;j++}}}return d+(a.length-i)+(b.length-j)<=1}
function best(t){var toks=t.trim().split(" "),n=toks.length,top=null,ts=0;
 KB.forEach(function(e){var s=0;e.k.forEach(function(k){var w=k.split(" ").length;
  if(t.indexOf(" "+k+" ")>-1||t.indexOf(" "+k+"s ")>-1)s+=w*2+k.length/100;
  else if(w===1&&k.length>=5)for(var i=0;i<n;i++)if(ed1(k,toks[i])){s+=1.5;break}});
  if(e.soft&&n>4)s*=.4;if(s>ts){ts=s;top=e}});
 return ts>=1.5?top:null}
function maths(raw){var m=raw.toLowerCase().replace(/[?=]/g,"").replace(/^(what is|whats|what's|calculate|compute|how much is)\s+/,"").trim().match(/^(-?\d+(?:\.\d+)?)\s*([+\-*\/x×÷])\s*(-?\d+(?:\.\d+)?)$/);
 if(!m)return null;var a=+m[1],b=+m[3],o=m[2],div=o==="/"||o==="÷";
 if(div&&b===0)return "I can’t divide by zero, and neither can any computer.";
 var r=o==="+"?a+b:o==="-"?a-b:div?a/b:a*b;return a+" "+o+" "+b+" = "+(Math.round(r*1e6)/1e6)}
function fill(a){var p=a.split("~~");a=p[Math.floor(Math.random()*p.length)];
 return a.replace("{time}",new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})).replace("{date}",new Date().toLocaleDateString(undefined,{weekday:"long",year:"numeric",month:"long",day:"numeric"}))}
function render(node,text){text.split(/(\[\[[^\]]+\]\])/).forEach(function(p){var m=p.match(/^\[\[([^|\]]+)\|([^\]]+)\]\]$/);
 if(m&&/^(#|mailto:)/.test(m[1])){var a=document.createElement("a");a.href=m[1];a.textContent=m[2];node.appendChild(a)}else node.appendChild(document.createTextNode(p))})}
function add(who,text){var d=document.createElement("div");d.className="zmsg "+who;render(d,text);logEl.appendChild(d);logEl.scrollTop=logEl.scrollHeight;return d}
function reply(q){var r=maths(q);if(r)return r;var e=best(norm(q));return e?fill(e.a):FALL[fb++%FALL.length]}
function send(text){text=text.trim().slice(0,200);if(!text)return;add("user",text);var t=add("bot","…");var ans=reply(text);
 setTimeout(function(){t.textContent="";render(t,ans);logEl.scrollTop=logEl.scrollHeight},reduce?0:350)}
function open(o){panel.hidden=!o;btn.setAttribute("aria-expanded",String(o));
 if(o){if(!greeted){greeted=true;add("bot","Hi, I’m Zero, MyAIConsulting’s chat assistant. I’m an automated bot, not a person, but I can answer questions about our services, plans and how we work. What would you like to know?")}inp.focus()}else btn.focus()}
CHIPS.forEach(function(c){var b=document.createElement("button");b.type="button";b.textContent=c[0];b.addEventListener("click",function(){send(c[1])});chips.appendChild(b)});
btn.addEventListener("click",function(){open(panel.hidden)});
closeB.addEventListener("click",function(){open(false)});
form.addEventListener("submit",function(e){e.preventDefault();send(inp.value);inp.value=""});
logEl.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a");if(a&&a.getAttribute("href").charAt(0)==="#"&&window.innerWidth<700)panel.hidden=true,btn.setAttribute("aria-expanded","false")});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!panel.hidden)open(false)});
})();
