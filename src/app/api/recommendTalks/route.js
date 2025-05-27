// /src/app/api/recommendTalks/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: "No prompt provided." }, { status: 400 });
  }

  try {
    const response = await fetch("http://localhost:5000/infer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    return NextResponse.json({ result: data.result });
  } catch (err) {
    console.error("Error contacting Python server:", err);
    return NextResponse.json({ error: "AI server error" }, { status: 500 });
  }
}
