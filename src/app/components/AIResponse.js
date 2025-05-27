"use client";
import { Typewriter } from "react-simple-typewriter";

export default function AIResponse({ text }) {
  return (
    <div className="mt-6 p-4 bg-gray-50 border-l-4 border-blue-500 rounded-md shadow-sm">
      <Typewriter
        words={[text]}
        loop={1}
        cursor
        cursorStyle="|"
        typeSpeed={30}
        deleteSpeed={50}
        delaySpeed={1000}
      />
    </div>
  );
}
