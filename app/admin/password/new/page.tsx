"use client";
import React, { useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export default function ForgotPassword() {
  const [step, setStep] = useState<"request" | "reset">("request");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Step 1: Request reset code
  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMsg(null);

    try {
      const res = await fetch(`${API_BASE}/admin/password/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMsg(
        data.message || "If the email exists, a reset code has been sent."
      );
      setStep("reset");
    } catch {
      setError("Something went wrong while requesting the reset code.");
    }
  };

  // Step 2: Submit code + new password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMsg(null);

    try {
      const res = await fetch(`${API_BASE}/admin/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          code,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Reset failed.");
      }

      setMsg(data.message || "Password updated successfully.");
      // Optional: redirect after success
      setTimeout(() => {
        window.location.href = "/admin/sign_in";
      }, 1200);
    } catch (err: any) {
      setError(err.message || "Could not reset password.");
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 font-sans bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>

      {msg && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-2 mb-4 rounded">
          {msg}
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-2 mb-4 rounded">
          {error}
        </div>
      )}

      {step === "request" && (
        <form onSubmit={handleRequestCode} className="flex flex-col gap-4">
          <label htmlFor="email-request" className="font-semibold">
            Email
          </label>
          <input
            id="email-request"
            type="email"
            value={email}
            required
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-accent"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="bg-accent text-white py-2 rounded hover:bg-accent/90 font-semibold"
          >
            Send Reset Code
          </button>
        </form>
      )}

      {step === "reset" && (
        <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
          <label htmlFor="email-reset" className="font-semibold">
            Email
          </label>
          <input
            id="email-reset"
            type="email"
            value={email}
            required
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-accent"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="reset-code" className="font-semibold">
            6-Character Code
          </label>
          <input
            id="reset-code"
            type="text"
            value={code}
            maxLength={6}
            required
            placeholder="Enter code"
            className="w-full px-3 py-2 border rounded tracking-widest focus:outline-none focus:ring focus:border-accent"
            onChange={(e) => setCode(e.target.value.toUpperCase())}
          />

          <label htmlFor="new-password" className="font-semibold">
            New Password
          </label>
          <input
            id="new-password"
            type="password"
            value={password}
            required
            placeholder="Enter new password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-accent"
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="confirm-password" className="font-semibold">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            type="password"
            value={passwordConfirmation}
            required
            placeholder="Confirm new password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-accent"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />

          <button
            type="submit"
            className="bg-accent text-white py-2 rounded hover:bg-accent/90 font-semibold"
          >
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
}
