import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
  return new Response(JSON.stringify({test: 'test'}));
}

export async function POST(request: Request) {
  const req = new NextRequest(request);

  console.log(req);

  return NextResponse.json({ response: 'noice'});
}