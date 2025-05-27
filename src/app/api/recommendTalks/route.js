// /src/app/api/recommendTalks/route.js
import { NextResponse } from "next/server";
import talks from "@/data/talks.json";

export async function POST(req) {
  const { summary, selectedTags } = await req.json();

  // 🧠 Simple relevance ranking: count tag overlaps
  const scoredTalks = talks.map((talk) => {
    const overlap = talk.tags.filter((tag) => selectedTags.includes(tag));
    return { ...talk, score: overlap.length };
  });

  // 🥇 Sort by score, highest first
  const sorted = scoredTalks.sort((a, b) => b.score - a.score);

  // 🎯 Return top 3
  return NextResponse.json({ recommendations: sorted.slice(0, 3) });
}
