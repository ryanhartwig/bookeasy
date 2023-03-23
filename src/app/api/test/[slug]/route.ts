import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: any}) {
  
  return new Response(typeof params.slug);
}