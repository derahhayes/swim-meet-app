import { useState } from "react";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.message || "Check your email for reset instructions.");
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h2>Reset Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <button onClick={handleReset} className="bg-blue-500 text-white p-2 mt-2">
        Send Reset Link
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

