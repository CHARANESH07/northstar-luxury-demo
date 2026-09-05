// ponytail: one runnable check for booking logic
const base = "http://localhost:3001";
async function j(url, opts){ const r=await fetch(url, opts); const t=await r.text(); try{return {status:r.status, json:JSON.parse(t)}}catch{return {status:r.status, text:t}}}
const date = new Date(Date.now()+86400000*2).toISOString().slice(0,10);
console.log("date",date);
let r=await j(`${base}/api/availability?date=${date}&passengers=4&vehicleType=Any`);
console.log("avail", r.json.available.length, "unavail", r.json.unavailable.length);
if(r.json.available.length===0) throw new Error("no available");
const vid = r.json.available[0].id;
console.log("hold vid",vid);
let h=await j(`${base}/api/holds`, {method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({vehicleId:vid, date})});
console.log("hold",h);
if(h.status!==201) throw new Error("hold failed");
let h2=await j(`${base}/api/holds`, {method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({vehicleId:vid, date})});
console.log("second hold (should 409)", h2.status, h2.json?.error?.code);
if(h2.status!==409) throw new Error("double hold guard failed");
let pay=await j(`${base}/api/payments`, {method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({holdId:h.json.holdId, amount:1000})});
console.log("pay init",pay.json);
let verify=await j(`${base}/api/payments`, {method:"PUT", headers:{"Content-Type":"application/json"}, body: JSON.stringify({paymentId:pay.json.paymentId, force:"success"})});
console.log("verify",verify.json);
let confirm=await j(`${base}/api/confirm`, {method:"POST", headers:{"Content-Type":"application/json","Idempotency-Key":h.json.holdId}, body: JSON.stringify({holdId:h.json.holdId, vehicleId:vid, customer:{name:"Test",phone:"9810115661",email:"a@b.com"}, trip:{pickup:"Delhi",drop:"Jaipur",date,passengers:4}, price:{kms:300,days:2,subtotal:3000,driver:800,taxes:190,total:3990}})});
console.log("confirm",confirm);
if(confirm.status!==201) throw new Error("confirm failed");
let confirm2=await j(`${base}/api/confirm`, {method:"POST", headers:{"Content-Type":"application/json","Idempotency-Key":h.json.holdId}, body: JSON.stringify({holdId:h.json.holdId, vehicleId:vid, customer:{name:"Test2",phone:"9810115662",email:"b@b.com"}, trip:{pickup:"Delhi",drop:"Jaipur",date,passengers:4}, price:{kms:300,days:2,subtotal:3000,driver:800,taxes:190,total:3990}})});
console.log("second confirm (should fail 410/409/404)", confirm2.status, confirm2.json);
// now availability should show booked
let avail2=await j(`${base}/api/availability?date=${date}&passengers=4&vehicleType=Any`);
console.log("avail2 booked check", avail2.json.unavailable.filter((u)=>u.vehicleId===vid));
console.log("ALL CHECKS PASSED");
