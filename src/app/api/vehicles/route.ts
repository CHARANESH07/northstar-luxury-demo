import { vehicles } from "@/data/vehicles";
export async function GET(){
  return Response.json(vehicles, { headers:{ "Cache-Control":"public, s-maxage=60" }});
}
