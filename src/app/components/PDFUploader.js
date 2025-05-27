"use client";
import { useState } from "react";

export default function PDFUploader({ onSummaryReady }) {
  console.log("🤖 Loading up PDF");
  const [loading, setLoading] = useState(false);

  async function handleFileChange(e) {
    const file = e.target.files[0];
    console.log("🐼🐼🐼🐼🐼🐼 what is", file);
    if (!file) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      console.log("❓: what is formData?", formData);

      const res = await fetch("/api/summarizeProfile", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      console.log("🤖 Data is: ", data);
      setLoading(false);
      onSummaryReady(data.summary);
    } catch (error) {
      console.error("❌ Error during upload or summarization", error);
      alert("Something went wrong, Check the console for details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Upload LinkedIn PDF</label>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      {loading && (
        <p className="text-sm text-blue-600">Summarizing profile...</p>
      )}
    </div>
  );
}
