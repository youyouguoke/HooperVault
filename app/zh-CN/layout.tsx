// NOTE: No shared metadata here to avoid canonical/og:url leaking to child pages.
// Each page must define its own alternates.canonical and openGraph.url.

export default function ZhCNLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
