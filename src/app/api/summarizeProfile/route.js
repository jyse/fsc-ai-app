// /app/api/summarizeProfile/route.js
import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";
import { Readable } from "stream";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const pdfText = await pdfParse(buffer).then((data) => data.text);

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that summarizes LinkedIn profiles into 1-2 sentences describing the user’s job and interests."
      },
      {
        role: "user",
        content: `Summarize this profile:\n\n${pdfText}`
      }
    ],
    model: "gpt-3.5-turbo"
  });

  const summary = completion.choices[0].message.content;
  return NextResponse.json({ summary });
}
