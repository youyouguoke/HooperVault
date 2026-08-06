"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function Redirect() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    window.location.href = `/en/build/team?${params.toString()}`;
  }, [searchParams]);

  return <div className="min-h-screen bg-[#111317]" />;
}

export default function PositionRedirectPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#111317]" />}>
      <Redirect />
    </Suspense>
  );
}
