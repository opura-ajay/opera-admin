import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("get api run");

  // return new Response('Hello Next JS... !');
  return NextResponse.json({ message: "Hello Next JS, Welcome to Opura AI... !" }, { status: 200 });
}


