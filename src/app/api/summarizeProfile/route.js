export const runtime = "nodejs";
import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";
import OpenAI from "openai";

console.log("🔑 API Key exists:", !!process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.log("❌ No API key found");
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file");
    console.log("✅ Received file:", file?.name, file?.size);

    if (!file) {
      console.log("❌ No file uploaded");
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const pdfData = await pdfParse(buffer);
    const pdfText = pdfData.text;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant that creates concise professional summaries from LinkedIn profiles. 

          Format your response exactly like this pattern:
          "[Job Title] at [Company Type] in [City]. [1-2 sentences about their specific work and interests, being concrete and direct]."

          Requirements:
          - Keep it under 40 words total
          - Be specific about their role and work
          - Mention their location (city)
          - Use concrete language, avoid vague words like "passionate" or "dedicated"
          - Focus on what they actually DO, not personality traits

          Example: "Frontend Developer at a fintech startup in Amsterdam. Builds trading interfaces and real-time data visualizations using React and WebSockets, focusing on performance optimization and user experience."`
        },
        {
          role: "user",
          content: pdfText
        }
      ]
    });

    const summary = completion.choices[0].message.content;
    console.log("✅ Got summary:", summary);
    return NextResponse.json({ summary });
  } catch (error) {
    console.error("❌ Detailed error:", error);
    console.error("❌ Error stack:", error.stack);
    console.error("❌ Error name:", error.name);
    console.error("❌ Error message:", error.message);

    return NextResponse.json(
      { error: `Server error: ${error.message}` },
      { status: 500 }
    );
  }
}
