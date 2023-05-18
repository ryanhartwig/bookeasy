import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  return NextResponse.redirect(session ? 'http://localhost:3000/home/dashboard' : 'http://localhost:3000/login');
}