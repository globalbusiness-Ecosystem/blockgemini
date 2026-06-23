import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { paymentId: string } }
) {
  try {
    const res = await fetch(`https://api.minepi.com/v2/payments/${params.paymentId}/approve`, {
      method: "POST",
      headers: {
        Authorization: `Key ${process.env.PI_API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    
    const text = await res.text();
    console.log("Approve response:", res.status, text);
    
    const data = text ? JSON.parse(text) : {};
    return NextResponse.json(data, { status: res.status });
  } catch (e: any) {
    console.error("Approve error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
