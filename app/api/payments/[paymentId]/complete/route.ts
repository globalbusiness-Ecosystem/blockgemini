import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { paymentId: string } }
) {
  try {
    const body = await req.json();
    const res = await fetch(`https://api.testnet.minepi.com/v2/payments/${params.paymentId}/complete`, {
      method: "POST",
      headers: {
        Authorization: `Key ${process.env.PI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    const data = text ? JSON.parse(text) : {};
    return NextResponse.json(data, { status: res.status });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
