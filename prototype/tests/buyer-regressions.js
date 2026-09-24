// Run with cdp-runner.cjs against an isolated Chrome profile; uses only demo data.
await cdp('Network.enable');
await cdp('Network.setCacheDisabled',{cacheDisabled:true});
await cdp('Network.setBlockedURLs',{urls:['*fonts.googleapis.com*','*fonts.gstatic.com*']});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const E=async expression=>{const r=await ev(expression);if(r.subtype==='error')throw Error(r.description);return r.value;};
const check=async(label,expression)=>{if(!await E(expression))throw Error('FAIL '+label+'\n'+await E('document.body.innerText.slice(-1600)'));console.log('PASS',label);};
const page=async path=>{await nav(path);for(let i=0;i<60;i++){if(await E('!!document.querySelector(".buyer-app #main .stack")'))break;await sleep(100);}await sleep(80);};
const click=async selector=>{await E('document.querySelector('+JSON.stringify(selector)+').click()');await sleep(500);};
const fill=async(name,data,submit=true)=>{await E('(()=>{const f=document.querySelector('+JSON.stringify('form[data-form="'+name+'"]')+');for(const [k,v] of Object.entries('+JSON.stringify(data)+')){const el=f.elements[k];if(el.type==="checkbox")el.checked=v;else el.value=v;el.dispatchEvent(new Event("input",{bubbles:true}));}'+(submit?'f.requestSubmit();':'')+'})()');await sleep(600);};
const stored=key=>'JSON.parse(localStorage.getItem("pcmatch-demo-v2")).'+key;
await page('buyer/home.html');await E('localStorage.clear();sessionStorage.clear()');await page('buyer/home.html');
// Browse round-trip must retain every filter, sort, and page.
await page('buyer/search.html?category=CPU&brand=AMD&min=1000&sort=desc&p=1');
await E('location.href=document.querySelector(".catalog-card h3 a").href');await sleep(600);
await click('a[href*="search.html?category=CPU&brand=AMD"]');
await check('search filters retained','location.search.includes("brand=AMD")&&location.search.includes("sort=desc")&&document.querySelector("[name=brand]").value==="AMD"');
await page('buyer/shop.html?id=TZ');await click('a[href*="model.html?id=CPU-7600"]');
await check('exact shop offer first','document.querySelector("form[data-form=offer] [name=offerId]").value==="TZ-CPU-7600"&&document.querySelector(".offer-selected")!==null');
await fill('offer',{qty:1,target:'cart'});await check('chosen shop preserved in cart',stored('cart[0].offerId')+'==="TZ-CPU-7600"');
await page('buyer/shop.html?id=NV');await click('a[href*="model.html?id=CPU-7600"]');
await check('inactive shop cannot buy selected offer','document.querySelector(".offer-selected button[type=submit]").disabled');
await page('buyer/shop.html?id=BP&q=not-found');await check('shop empty results','document.body.innerText.includes("Không có sản phẩm phù hợp")');
// Public question must retain its draft through authentication.
await page('buyer/model.html?id=CPU-7600');await fill('question',{shopId:'TZ',text:'Tư vấn BIOS cho CPU này'});
await check('question requests login','location.pathname.endsWith("login.html")');await click('a[href*="mode=register"]');
await fill('register',{name:'Kiểm thử phần thiếu',email:'regressions@test.local',password:'Demo12345',confirm:'Demo12345'});
await check('question draft after login','document.querySelector("textarea[name=text]").value==="Tư vấn BIOS cho CPU này"&&document.querySelector("[name=shopId]").value==="TZ"');
await fill('question',{text:'Tư vấn BIOS cho CPU này'});await check('question saved once',stored('questions.length')+'===1');
// Build snapshots and consultation history remain associated with the old version.
await page('buyer/model.html?id=PSU-750');await fill('offer',{qty:1,target:'build'});await fill('save-build',{name:'Cấu hình lưu'});
await page('buyer/consultation.html?new=1&shop=TZ');await check('consultation shop retained','document.querySelector("[name=shopId]").value==="TZ"');
await fill('consult',{budget:15000000,text:'Kiểm tra giúp nguồn'});const consultation=await E(stored('consultations[0].id'));
await page('buyer/model.html?id=CPU-7600');await fill('offer',{qty:1,target:'build'});
await page('buyer/consultation.html?id='+consultation);await click('[data-action=consult-update]');
await check('immutable previous consultation version',stored('consultations[0].versions.length')+'===2&&'+stored('consultations[0].versions[0].build.slots.CPU')+'===undefined&&!!'+stored('consultations[0].versions[1].build.slots.CPU'));
await click('[data-action=consult-complete]');await click('#confirm [value=ok]');await check('consultation completion','document.body.innerText.includes("Hoàn tất")&&!document.querySelector("form[data-form=consult-message]")');
// Address drafts must not leak into another address or the new-address form.
await page('buyer/addresses.html');await fill('address',{name:'Người A',phone:'0901111111',detail:'12 Đường A, Phường A',region:'HCM'});
await fill('address',{name:'Người B',phone:'0902222222',detail:'34 Đường B, Phường B',region:'HN'});
const addresses=await E(stored('addresses'));
await page('buyer/addresses.html?edit='+addresses[0].id);await fill('address',{detail:'Bản nháp của riêng A'},false);
await page('buyer/addresses.html?edit='+addresses[1].id);await check('address draft isolated','document.querySelector("[name=detail]").value==="34 Đường B, Phường B"');
await page('buyer/addresses.html?edit='+addresses[0].id);await check('address draft retained','document.querySelector("[name=detail]").value==="Bản nháp của riêng A"');
// Start checkout with both shops; fixtures exposed through UI controls.
await page('buyer/model.html?id=CPU-7600');await fill('offer',{qty:1,target:'cart'});
await page('buyer/checkout.html');await click('[data-action=warranty-change]');await check('warranty diff shown','document.body.innerText.includes("bảo hành 36 → 12 tháng")');
await click('[data-action=shipping-error]');await fill('place-order',{changes:true,terms:true});await check('shipping failure blocks whole order',stored('orders.length')+'===0&&document.body.innerText.includes("Thử tính lại phí giao")');
await click('[data-action=shipping-retry]');await fill('voucher',{code:'BP50'});await check('shop discount applied','document.body.innerText.includes("BuildPro tài trợ")&&document.querySelector("[data-total]").textContent.includes("9.")');
await fill('voucher',{code:'PC100'});await check('voucher exclusion explained','document.body.innerText.includes("Không kết hợp hai mã")');
await click('[data-action=voucher-remove]');await fill('voucher',{code:'EXPIRED'});await check('expired voucher','document.body.innerText.includes("Voucher đã hết hạn")');
await fill('voucher',{code:'PC100'});
// Change data in the same document after the displayed consent snapshot.
await E('(async()=>{const s=await import("../assets/js/store.js");s.tx(db=>{db.overrides[db.cart[0].offerId].price=s.currentOffer(db.cart[0].offerId).price+10000;});})()');
await fill('place-order',{changes:true,terms:true});await check('changed data requires fresh consent',stored('orders.length')+'===0&&!document.querySelector("[name=changes]").checked&&document.body.innerText.includes("Dữ liệu vừa thay đổi")');
await fill('place-order',{changes:true,terms:true});await check('checkout creates one order',stored('orders.length')+'===1');
const order=await E(stored('orders[0]'));
// Cancel button must work even when required reason is empty. Error stays in the dialog.
await page('buyer/order.html?id='+order.id);await click('[data-action=cancel-order]');await click('#confirm [value=cancel]');await check('cancel dialog bypasses required reason','!document.querySelector("#confirm").open');
await click('[data-action=cancel-order]');await E('document.querySelector("#confirm [name=reason]").value="Không còn nhu cầu"');
await E('window.originalSetItem=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k==="pcmatch-demo-v2")throw new DOMException("Quota","QuotaExceededError");return window.originalSetItem.call(this,k,v);}');
await click('#confirm [value=ok]');await check('storage error stays reviewable','document.querySelector("#confirm").open&&document.querySelector("#confirm .form-error").textContent.includes("Không lưu được")');
await E('Storage.prototype.setItem=window.originalSetItem');await click('#confirm [value=ok]');
await check('storage retry updates actual state',stored('orders[0].suborders[0].status')+'==="Chờ duyệt hủy"');
await click('[data-action=cancel-reject]');await page('buyer/payment.html?id='+order.id);await fill('pay',{result:'paid'});
await check('payment lists exact child orders','document.body.innerText.includes('+JSON.stringify(order.suborders[0].id)+')&&document.body.innerText.includes('+JSON.stringify(order.suborders[1].id)+')');
// Delivered review and warranty have distinct flows; evidence can be added later.
await page('buyer/order.html?id='+order.id);await click('[data-action=order-delivered]');
const sub=order.suborders[0],item=sub.items[0];
await page('buyer/cases.html?new=aftersale&order='+order.id+'&sub='+sub.id+'&item='+item.id);await fill('case',{type:'warranty',qty:1,reason:'Không khởi động',text:'Kiểm tra giúp sản phẩm'});
await E('(()=>{const f=new File(["%PDF-1.4 demo"],"bang-chung.pdf",{type:"application/pdf"});const dt=new DataTransfer();dt.items.add(f);document.querySelector("[name=evidence]").files=dt.files;})()');
await fill('case-message',{text:'Bổ sung tệp chứng minh'});await check('supplementary evidence downloadable','[...document.querySelectorAll("a[download]")].some(a=>a.download==="bang-chung.pdf")');
await click('[data-action=case-inspect]');await click('[data-action=case-sent]');await click('[data-action=case-replace]');await check('replacement serial traceable','document.body.innerText.includes("Serial thay thế demo")');
await click('[data-action=case-received]');await check('after-sales return completed','document.body.innerText.includes("Đã nhận lại sản phẩm")');
// Expiring proposals produce a single contextual notification and cannot be selected.
await page('buyer/requests.html?new=1');const deadline=new Date(Date.now()+7*86400000).toISOString().slice(0,10);
await fill('request',{purpose:'Máy thử phiên bản',budget:30000000,owned:'Không',region:'HCM',deadline,status:'open'});await click('#confirm [value=cancel]');await page('buyer/requests.html?new=1');await check('cancel preview retains request draft','document.querySelector("[name=purpose]").value==="Máy thử phiên bản"');
await fill('request',{});await click('#confirm [value=ok]');await click('[data-action=seed-proposals]');const proposal=await E(stored('proposals[0]'));
await page('buyer/proposals.html?id='+proposal.id);await fill('proposal-feedback',{text:'Xin điều chỉnh phí giao'});await click('[data-action=proposal-revise]');
await check('revised proposal has lineage',stored('proposals[2].previousId')+'==='+JSON.stringify(proposal.id));
await page('buyer/proposals.html?id='+await E(stored('proposals[2].id')));await click('[data-action=proposal-expire]');
await page('buyer/notifications.html');const count=await E(stored('notifications.length'));await page('buyer/notifications.html');
await check('expiry notification once',stored('notifications.length')+'==='+count+'&&document.body.innerText.includes("Báo giá đã hết hạn")');
// Complete page inventory and responsive checks use the revised content, not just the Home.
const pages=['home','search','shop?id=TZ','model?id=CPU-7600&shop=TZ','builder','builds','consultation?id='+consultation,'requests','proposals?id='+proposal.id,'cart','checkout','payment?id='+order.id,'orders','order?id='+order.id,'cases','addresses','account','notifications','compare','help'];
for(const width of [360,768,1440]){
 await cdp('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
 for(const path of pages){const [r,q]=path.split('?');await page('buyer/'+r+'.html'+(q?'?'+q:''));await check('responsive '+width+' '+r,'document.documentElement.scrollWidth<=innerWidth&&!document.body.innerText.includes("Không thể tải dữ liệu demo")&&!document.querySelector(\'a[href="#"]\')');}
 await page('buyer/model.html?id=CPU-7600&shop=TZ');fs.writeFileSync('/tmp/pcmatch-model-'+width+'.png',Buffer.from((await cdp('Page.captureScreenshot',{format:'png'})).data,'base64'));
}
await cdp('Emulation.setDeviceMetricsOverride',{width:360,height:800,deviceScaleFactor:1,mobile:false});await page('buyer/home.html');await click('[data-action=menu]');
await cdp('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape'});await cdp('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape'});
await check('mobile Escape restores menu focus','document.activeElement.dataset.action==="menu"&&document.activeElement.getAttribute("aria-expanded")==="false"');
console.log('ALL REGRESSIONS PASSED');
