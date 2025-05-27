"use client";
import { useState } from "react";
import AIResponse from "./components/AIResponse.js";

export default function Home() {
  const [aiResponse, setAIResponse] = useState();

  const handleSubmit = async () => {
    // handle file + interests ...

    // const response = await fetch('/api/recommend', { ... });
    // const data = await response.json();
    // setAIResponse(data.recommendation);
    setAIResponse("Giving recommendation..!");
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

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Upload LinkedIn PDF
            </label>
            <input
              type="file"
              accept="application/pdf"
              className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Select your interests
            </label>
            <div className="flex flex-wrap gap-2">
              {["AI", "Frontend", "Backend", "DevOps", "Accessibility"].map(
                (tag) => (
                  <button
                    type="button"
                    key={tag}
                    className="px-3 py-1 rounded-full border border-gray-300 text-sm text-gray-700 hover:bg-gray-200"
                  >
                    {tag}
                  </button>
                )
              )}
            </div>
          </div>

          <button
            onClick={() => handleSubmit()}
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
