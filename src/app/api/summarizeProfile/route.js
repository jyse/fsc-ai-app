// /app/api/summarizeProfile/route.js
import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

if (!apiKey) {
  return Response.json(
    { error: "OpenAI API key not configured" },
    { status: 500 }
  );
}

export async function POST(req) {
  try {
    console.log("👋 Step 1: Getting form data...");
    const formData = await req.formData();
    const file = formData.get("file");
    console.log("✅ Received file for summarization...", file);

    if (!file) {
      console.log("❌ No file uploaded");
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    console.log("👋 Step 2: Reading file buffer...");
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log("👋 Step 3: Parsing PDF...");
    const pdfText = await pdfParse(buffer).then((data) => data.text);
    console.log("👋 Step 3: PDF Text extracted...");

    console.log("👋 Step 4: Calling OpenAI...");
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that summarizes LinkedIn profiles into 1-2 sentences describing the user’s job and interests."
        },
        {
          role: "user",
          content: pdfText
        }
      ]
    });

    const summary = completion.choices[0].message.content;
    console.log("✅ Got summary: ", summary);
    return NextResponse.json({ summary });
  } catch (error) {
    console.error("❌ Error in summarizeProfile:", error);
    return NextResponse.json(
      { error: "Something went wrong processing your LinkedIn profile." },
      { status: 500 }
    );
  }
}
