import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const paymentId = req.url.split('/payments/')[1].split('/complete')[0];
  const body = await req.json();
  
  const res = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
    method: "POST",
    headers: {
      Authorization: `Key ${process.env.PI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
