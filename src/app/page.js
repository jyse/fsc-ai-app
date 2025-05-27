"use client";
import { useState } from "react";
import AIResponse from "./components/AIResponse.js";
import PDFUploader from "./components/PDFUploader.js";
import { TALK_TAGS } from "../app/data/tags.js";

export default function Home() {
  const [aiResponse, setAIResponse] = useState();
  const [profileSummary, setProfileSummary] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const handleSubmit = async () => {
    // For now, just log what you'd send to AI:
    console.log("Using summary:", profileSummary);
    // You’ll send summary + selected interests to your fine-tuned model later

    setAIResponse("Giving recommendation..!");
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) => {
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag];
    });
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            AI Talk Coach
          </span>
        </h1>
        <p className="text-center text-gray-700">
          Upload your LinkedIn profile and get your personalized FullStack
          Conference talk recommendations.
        </p>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {/* ✅ PDF Upload Component */}
          <PDFUploader onSummaryReady={setProfileSummary} />

          {/* 👀 Show profile summary once parsed */}
          {profileSummary && (
            <div className="bg-green-100 text-sm text-gray-800 p-3 rounded-md border border-green-300">
              <strong>Profile Summary:</strong> {profileSummary}
            </div>
          )}

          {/* 🧠 Tag Selector – will be wired up next */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Select your interests
            </label>
            <div className="flex flex-wrap gap-2">
              {TALK_TAGS.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    selectedTags.includes(tag)
                      ? "bg-blue-500 text-white"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-2 rounded-md hover:opacity-90 transition"
          >
            Get My Talk Recommendations
          </button>
        </form>

        {aiResponse && <AIResponse text={aiResponse} />}
      </div>
    </main>
  );
}
