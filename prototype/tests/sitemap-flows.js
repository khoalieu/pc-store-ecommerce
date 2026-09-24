await cdp('Network.enable');await cdp('Network.setCacheDisabled',{cacheDisabled:true});await cdp('Network.setBlockedURLs',{urls:['*fonts.googleapis.com*','*fonts.gstatic.com*']});
const delay=async()=>{await new Promise(r=>setTimeout(r,600));for(let n=0;n<80;n++){const r=await ev('document.body.classList.contains("buyer-app")&&!document.querySelector("#main").innerText.includes("Đang tải")&&!document.querySelector("#main").innerText.includes("Đang xử lý thanh toán demo")');if(r.value)return;await new Promise(r=>setTimeout(r,150));}throw Error('Page did not finish loading')};
const E=async x=>{const r=await ev(x);if(r.subtype==='error')throw Error(r.description);return r.value;};
const check=async(label,x)=>{if(!await E(x))throw Error('FAIL '+label+' '+await E('document.body.innerText.slice(-1200)'));console.log('PASS',label)};
const fill=async(name,data)=>{await E('(()=>{const f=document.querySelector('+JSON.stringify('form[data-form="'+name+'"]')+');if(!f)throw Error("Missing form '+name+'");for(const [k,v] of Object.entries('+JSON.stringify(data)+')){const el=f.elements[k];if(!el)throw Error("Missing "+k);if(el.type==="checkbox")el.checked=v;else el.value=v;el.dispatchEvent(new Event("input",{bubbles:true}));}f.requestSubmit();})()');await delay();};
const click=async(action,id)=>{await E('document.querySelector('+JSON.stringify('[data-action="'+action+'"]'+(id?'[data-id="'+id+'"]':''))+').click()');await delay();};
const confirm=async()=>{await E('document.querySelector("#confirm button[value=ok]").click()');await delay();};
const state=async()=>JSON.parse(await E('localStorage.getItem("pcmatch-demo-v2")'));
await nav('index.html');

await E(`(()=>{const input=document.querySelector('input[type=search]');input.value='B45';input.dispatchEvent(new Event('input',{bubbles:true}));})()`);await check('sitemap search B45',`document.querySelectorAll('.screen-link:not([hidden])').length===1`);await E(`(()=>{const input=document.querySelector('input[type=search]');input.value='no-match-zz';input.dispatchEvent(new Event('input',{bubbles:true}));})()`);await check('sitemap empty results','document.body.innerText.includes("Không tìm thấy màn hình")');await E(`(()=>{const input=document.querySelector('input[type=search]');input.value='';input.dispatchEvent(new Event('input',{bubbles:true}));})()`);
const entries=await E(`[...document.querySelectorAll('#buyer .screen-link')].map(a=>({id:a.querySelector('.screen-id').textContent,url:a.getAttribute('href')}))`);
if(entries.length!==45)throw Error('Expected 45 buyer entries');
const links=new Set();
for(const entry of entries){await nav(entry.url);await delay();await check(entry.id+' renders usable page','!!document.querySelector("#main h1,#main h2")&&!document.body.innerText.includes("Không thể tải dữ liệu demo")');const hrefs=await E(`[...document.querySelectorAll('a[href]')].map(a=>a.href).filter(h=>h.startsWith(location.origin))`);hrefs.forEach(h=>links.add(h));await check(entry.id+' no placeholder CTA',`![...document.querySelectorAll('a')].some(a=>a.getAttribute('href')==='#')`);}
for(const url of links){const response=await fetch(url);if(!response.ok)throw Error('Dead link '+url+' '+response.status);}
console.log('PASS',links.size,'rendered local link destinations');console.log('SITEMAP FLOWS PASSED');
