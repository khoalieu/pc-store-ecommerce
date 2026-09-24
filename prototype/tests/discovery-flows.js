// Execute with cdp-runner.cjs in an isolated Chrome profile. Resets only demo storage.
await cdp('Network.enable');await cdp('Network.setCacheDisabled',{cacheDisabled:true});await cdp('Network.setBlockedURLs',{urls:['*fonts.googleapis.com*','*fonts.gstatic.com*']});
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const E=async expression=>{const r=await ev(expression);if(r.subtype==='error')throw Error(r.description);return r.value;};
const ready=async()=>{await wait(320);for(let i=0;i<30;i++){if(await E('document.querySelector("#main .container.stack")!==null'))return;await wait(100);}throw Error('Page did not render');};
const page=async path=>{await nav(path);await ready();};
const check=async(label,expression)=>{if(!await E(expression))throw Error(label+'\n'+await E('document.body.innerText.slice(-1800)'));console.log('PASS',label);};
const click=async selector=>{await E('document.querySelector('+JSON.stringify(selector)+').click()');await wait(650);};
const fill=async(form,data)=>{await E('(()=>{const f=document.querySelector('+JSON.stringify('[data-form="'+form+'"]')+');for(const [key,value] of Object.entries('+JSON.stringify(data)+')){f.elements[key].value=value;}f.requestSubmit();})()');await wait(750);};
await cdp('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
await page('buyer/home.html');await E('localStorage.clear();sessionStorage.clear()');await page('buyer/home.html');
await click('.category-strip a[href*="category=CPU"]');
await check('Home CPU category','document.querySelectorAll("[data-model-id]").length===3&&document.querySelector("h1").textContent==="Bộ xử lý"');
await fill('filters',{min:4000000,max:5000000,shop:'TZ',region:'HCM',availability:'in'});
await check('price shop region same offer','document.querySelectorAll("[data-model-id]").length===1&&document.querySelector("[data-model-id]").dataset.modelId==="CPU-7600"');
await click('.catalog-card h3 a');await check('exact shop context','document.querySelector(".offer-selected [name=offerId]").value==="TZ-CPU-7600"');
await click('[data-action=offers-toggle]');await check('comparison same model three rows','!document.querySelector("#offer-comparison").hidden&&document.querySelectorAll("#offer-comparison tbody tr").length===3');
let old=await E('document.querySelector("#offer-comparison").textContent');await fill('region',{region:'HN'});await check('region updates comparison and stays open','!document.querySelector("#offer-comparison").hidden&&document.querySelector("#offer-comparison").textContent!=='+JSON.stringify(old));
await fill('offer',{qty:2,target:'cart'});await check('exact offer and quantity in cart','JSON.parse(localStorage.getItem("pcmatch-demo-v2")).cart[0].offerId==="TZ-CPU-7600"&&JSON.parse(localStorage.getItem("pcmatch-demo-v2")).cart[0].qty===2');
await page('buyer/home.html');await E('document.querySelector("#global-search").value="RTX";document.querySelector(".market-search").requestSubmit()');await ready();
await check('Home RTX search GPU only','document.querySelectorAll("[data-model-id]").length===2&&[...document.querySelectorAll("[data-model-id]")].every(n=>n.dataset.modelId.startsWith("GPU-"))');
await click('.catalog-card h3 a');await check('GPU spec','document.querySelector(".spec-grid").textContent.includes("VRAM")');await click('a[href*="search.html?q=RTX"]');await check('return retains RTX','document.querySelector("#catalog-filters [name=q]").value==="RTX"');
await page('buyer/model.html?id=CPU-7600&shop=BP');await click('.offer-selected h3 a');await fill('shop-filter',{q:'SSD',category:'SSD',availability:'in'});await check('shop category products','document.querySelectorAll("[data-model-id]").length===2');
await click('.catalog-card h3 a');await check('shop selects other exact offer','document.querySelector(".offer-selected [name=offerId]").value.startsWith("BP-SSD-")');await fill('offer',{qty:1,target:'cart'});await check('cart preserves both sellers','JSON.parse(localStorage.getItem("pcmatch-demo-v2")).cart.length===2');
await page('buyer/search.html?category=CPU&min=999999999');await check('empty recovery','document.body.innerText.includes("Không có kết quả")&&!!document.querySelector("[data-action=remove-filter]")');await click('[data-action=remove-filter][data-id=min]');await check('remove one chip','document.querySelectorAll("[data-model-id]").length===3');
await fill('filters',{min:5000000,max:1000000});await check('invalid price range preserves entry','document.querySelector(".form-error").textContent.includes("Giá đến")&&document.querySelector("[name=min]").value==="5000000"');
await page('buyer/search.html?category=COOL&shop=TZ&availability=out');await check('out of stock search','document.querySelectorAll("[data-model-id]").length===1');await click('.catalog-card h3 a');await check('sold out blocked','document.querySelector(".offer-selected button[type=submit]").disabled&&document.querySelector(".offer-selected").textContent.includes("Hết hàng")');
await page('buyer/model.html?id=CPU-7600&shop=NV');await check('paused shop blocked','document.querySelector(".offer-selected button[type=submit]").disabled&&document.querySelector(".offer-selected").textContent.includes("Shop tạm dừng")');
await page('buyer/search.html?region=OTHER');await check('unsupported delivery region','document.body.innerText.includes("Không có kết quả")');
await page('buyer/search.html?category=RAM');await check('RAM technical fields','!!document.querySelector("#catalog-filters").elements.namedItem("tech:RAM")&&!!document.querySelector("#catalog-filters").elements.namedItem("tech:Kit")');await fill('filters',{'tech:RAM':'DDR4'});await check('RAM type filter','document.querySelectorAll("[data-model-id]").length===1&&document.querySelector("[data-model-id]").dataset.modelId==="RAM-C16"');
for(const [cat,key] of [['CPU','Socket'],['GPU','VRAM'],['SSD','Chuẩn'],['PSU','Công suất'],['CASE','GPU tối đa'],['COOL','Chiều cao']]){await page('buyer/search.html?category='+cat);await check('technical '+cat,'!!document.querySelector('+JSON.stringify('[name="tech:'+key+'"]')+')');}
await page('buyer/search.html');const first=await E('[...document.querySelectorAll("[data-model-id]")].map(n=>n.dataset.modelId)');await click('.pagination a[href*="p=2"]');await check('pagination changes models','[...document.querySelectorAll("[data-model-id]")].every(n=>!'+JSON.stringify(first)+'.includes(n.dataset.modelId))');
await page('buyer/search.html?category=CPU&error=1');await click('[data-action=search-retry]');await check('retry keeps category','document.querySelectorAll("[data-model-id]").length===3');
await click('[data-action=compare-add][data-id=CPU-7600]');await click('[data-action=compare-add][data-id=CPU-7700]');await check('comparison tray updates','document.querySelector("[data-compare-link]").textContent.includes("2")&&document.querySelector(".compare-tray").textContent.includes("CPU")===false');
await click('[data-compare-link]');await check('model comparison table','document.querySelectorAll(".data-table thead th").length===3');await click('[data-action=compare-remove][data-id=CPU-7700]');await check('remove model','document.querySelectorAll(".data-table thead th").length===2');
await page('buyer/search.html?category=GPU');await click('[data-action=compare-add]');await check('cross-category compare rejected','document.querySelector("#feedback").textContent.includes("cùng loại")');
await page('buyer/compare.html');await click('[data-action=compare-clear]');await check('comparison empty','document.body.innerText.includes("Chưa chọn model")');
await page('buyer/model.html?id=CPU-7600');await E('document.querySelector("img[data-product-image]").src="../assets/images/catalog/missing-test.svg"');await wait(300);await check('image error fallback','!document.querySelector(".image-fallback").hidden&&document.querySelector("img[data-product-image]").hidden');
await E('(async()=>{const s=await import("../assets/js/store.js");s.tx(db=>db.compare=["CPU-7600","CPU-7700"]);})()');
// Inspect matching screenshots and overflow at all requested device widths.
for(const width of [360,768,1440]){
 await cdp('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
 for(const route of ['search.html?category=GPU','model.html?id=GPU-5060&shop=TZ&compareOffers=1','shop.html?id=BP','compare.html']){
  await page('buyer/'+route);await check('layout '+width+' '+route,'document.documentElement.scrollWidth<=innerWidth&&!document.body.innerText.includes("Không thể tải dữ liệu demo")');
  if(!route.startsWith('compare'))fs.writeFileSync('/tmp/discovery-'+route.split('.')[0]+'-'+width+'.png',Buffer.from((await cdp('Page.captureScreenshot',{format:'png'})).data,'base64'));
 }
}
await cdp('Emulation.setDeviceMetricsOverride',{width:360,height:800,deviceScaleFactor:1,mobile:false});await page('buyer/search.html?category=CPU');await click('[data-action=filters-open]');await check('mobile drawer modal','document.querySelector("#filter-drawer").open&&!!document.querySelector("#filter-drawer form")');
await E('document.querySelector("#filter-drawer [name=max]").value="5000000"');await cdp('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27,nativeVirtualKeyCode:27});await cdp('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27,nativeVirtualKeyCode:27});await wait(100);await check('Escape restores focus and unsent filter','!document.querySelector("#filter-drawer").open&&document.activeElement.dataset.action==="filters-open"&&document.querySelector("#filter-home [name=max]").value==="5000000"');
await click('[data-action=filters-open]');fs.writeFileSync('/tmp/discovery-drawer-360.png',Buffer.from((await cdp('Page.captureScreenshot',{format:'png'})).data,'base64'));await fill('filters',{min:4000000,max:5000000});await check('mobile apply filters','document.querySelectorAll("[data-model-id]").length===1&&!document.querySelector("#filter-drawer").open');
console.log('ALL DISCOVERY FLOWS PASSED');
