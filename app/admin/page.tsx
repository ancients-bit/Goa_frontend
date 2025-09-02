"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Direct redirect to dashboard without authentication
    router.push("/admin/dashboard");
  }, [router]);

  // Show loading while redirecting
  return (
    <div className="min-h-screen bg-earth-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 h-12 border-b-2 border-forest-700 mx-auto mb-4"></div>
        <p className="text-soil-700 text-lg">Redirecting to Dashboard...</p>
      </div>
    </div>
  );
}
