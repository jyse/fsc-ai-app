"use client";
import { useState } from "react";

export default function PDFUploader({ onSummaryReady }) {
  const [loading, setLoading] = useState(false);

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/summarizeProfile", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
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
