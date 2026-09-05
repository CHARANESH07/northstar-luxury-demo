export type Vehicle = {
  id: string;
  slug: string;
  category: "Car" | "Tempo Traveller";
  name: string;
  seater: number;
  ac: boolean;
  features: string[];
  description: string;
  pricing: { perKm: number; driverPerDay: number; minKmPerDay: number; extraPerKm: number; taxPct: number };
  image: string;
  imageAlt: string;
};

export const vehicles: Vehicle[] = [
  { id:"sedan", slug:"sedan", category:"Car", name:"Sedan", seater:4, ac:true, features:["AC","Bottle Holder","Charging Point","Luggage 2 Bags"], description:"Comfortable for small families and business trips. Swift Dzire / Etios equivalent.", pricing:{ perKm:14, driverPerDay:400, minKmPerDay:250, extraPerKm:14, taxPct:5 }, image:"https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&auto=format&fit=crop&q=60", imageAlt:"White sedan car on road — 4 seater" },
  { id:"suv", slug:"suv", category:"Car", name:"SUV", seater:6, ac:true, features:["AC","Spacious","Charging Point","Luggage 3 Bags"], description:"Innova / Ertiga class. Extra space for luggage and longer rides.", pricing:{ perKm:18, driverPerDay:500, minKmPerDay:250, extraPerKm:18, taxPct:5 }, image:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=60", imageAlt:"Silver SUV on highway — 6 seater" },
  { id:"premium", slug:"premium-car", category:"Car", name:"Premium Car", seater:4, ac:true, features:["AC","Leather Seats","Premium Audio","Bottle Holder"], description:"Executive travel. Camry / Crysta premium feel.", pricing:{ perKm:22, driverPerDay:600, minKmPerDay:250, extraPerKm:22, taxPct:5 }, image:"https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=60", imageAlt:"Black premium sedan — executive" },
  { id:"tt9", slug:"9-seater-tt", category:"Tempo Traveller", name:"9 Seater Tempo Traveller", seater:9, ac:true, features:["Pushback","AC Vents","Luggage Carrier","Music System"], description:"Force Traveller 9-seater. Ideal for small groups.", pricing:{ perKm:24, driverPerDay:600, minKmPerDay:250, extraPerKm:24, taxPct:5 }, image:"https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=60", imageAlt:"White tempo traveller 9 seater — Force Traveller" },
  { id:"tt12", slug:"12-seater-tt", category:"Tempo Traveller", name:"12 Seater Tempo Traveller", seater:12, ac:true, features:["Pushback","AC Vents","Luggage Carrier","Charging Points"], description:"Most popular for family and corporate groups.", pricing:{ perKm:26, driverPerDay:600, minKmPerDay:250, extraPerKm:26, taxPct:5 }, image:"https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&auto=format&fit=crop&q=60", imageAlt:"White 12 seater tempo traveller on road" },
  { id:"tt17", slug:"17-seater-tt", category:"Tempo Traveller", name:"17 Seater Tempo Traveller", seater:17, ac:true, features:["Pushback","AC Vents","Luggage Carrier","Charging Points","TV"], description:"Long wheelbase, ample luggage space for tours.", pricing:{ perKm:30, driverPerDay:700, minKmPerDay:250, extraPerKm:30, taxPct:5 }, image:"https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&auto=format&fit=crop&q=60", imageAlt:"White 17 seater tempo traveller — long wheelbase" },
  { id:"tt20", slug:"20-seater-tt", category:"Tempo Traveller", name:"20 Seater Tempo Traveller", seater:20, ac:true, features:["Pushback","AC Vents","Luggage Carrier","Music System","TV"], description:"For weddings and large groups. 2x2 layout.", pricing:{ perKm:35, driverPerDay:700, minKmPerDay:250, extraPerKm:35, taxPct:5 }, image:"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&auto=format&fit=crop&q=60", imageAlt:"Large tempo traveller 20 seater — 2x2 layout" },
];

export const destinations = [
  { id:"jaipur", slug:"jaipur", name:"Jaipur", tagline:"Pink City palaces & forts" },
  { id:"agra", slug:"agra", name:"Agra", tagline:"Taj Mahal & heritage" },
  { id:"goa", slug:"goa", name:"Goa", tagline:"Beaches & churches" },
  { id:"manali", slug:"manali", name:"Manali", tagline:"Himalayan valleys" },
  { id:"udaipur", slug:"udaipur", name:"Udaipur", tagline:"Lakes & palaces" },
  { id:"shimla", slug:"shimla", name:"Shimla", tagline:"Hill station retreat" },
];

export const services = [
  { slug:"outstation", title:"Outstation", desc:"Intercity round-trip & one-way with transparent per-km pricing.", points:["250 km/day included","Extra km at fixed rate","Driver allowance included","Tolls & taxes extra"] },
  { slug:"local", title:"Local Rental", desc:"4h/40km, 8h/80km, 12h/120km packages for city use.", points:["Flexible hourly","Multiple stops","At your disposal"] },
  { slug:"airport", title:"Airport Transfer", desc:"On-time pickup with flight-aware scheduling.", points:["Flight tracking (real: add later)","Meet & greet","Luggage assist"] },
  { slug:"family", title:"Family Travel", desc:"Sanitized vehicles, courteous chauffeurs, child-friendly.", points:["Verified drivers","Clean & sanitized","24/7 support"] },
  { slug:"corporate", title:"Corporate Travel", desc:"Bills, GST invoice, and reliable monthly billing.", points:["GST invoice","Monthly billing","Dedicated manager"] },
  { slug:"group", title:"Group Travel", desc:"Tempo Travellers from 9 to 20 seater, single vehicle, together.", points:["9–20 seater","Pushback + AC","Luggage carrier"] },
];

export const company = {
  name:"NorthStar Travels",
  tagline:"Travel Together. Arrive Better.",
  phone:"+91 98806 01004",
  email:"book@northstartravels.example",
  whatsapp:"+91 98806 01004",
  address:"UG 54, Palika Place, Panchkuian Road, New Delhi 110001",
  hours:"24×7 booking & support",
  areas:["Delhi NCR","Jaipur","Agra","Chandigarh","Manali","Goa"],
};
