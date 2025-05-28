// /src/app/api/recommendTalks/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  const { summary, interests } = await req.json();
  console.log(summary, "SUMMARY HERE? 🌸");

  try {
    const response = await fetch("http://127.0.0.1:5000/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ summary, interests })
    });

    const data = await response.json();
    console.log(data, " what is data here? 🐼");
    return NextResponse.json({ recommendations: data.recommendations });
  } catch (error) {
    return NextResponse.json(
      { error: "❌ Failed to get recommendations" },
      { status: 500 }
    );
  }
}
