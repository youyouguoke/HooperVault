/**
 * HooperVault Analytics Event Tracking
 *
 * Dual-track: GA4 (gtag) + Plausible (custom events)
 * All calls are non-blocking and fire-and-forget.
 * Safe to call from any client component.
 */

type EventName =
  | "start_build"
  | "select_mode"
  | "select_team"
  | "draft_round"
  | "draft_complete"
  | "simulation_start"
  | "simulation_complete"
  | "result_view"
  | "share_click"
  | "replay_click"
  | "challenge_start"
  | "challenge_submit";

type EventData = Record<string, string | number | boolean | undefined>;

/**
 * Track a gameplay or engagement event.
 * Sends to both GA4 and Plausible in parallel.
 * No-ops gracefully if either is unavailable.
 */
export function trackEvent(name: EventName, data?: EventData): void {
  try {
    // GA4 via gtag
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      (window as any).gtag("event", name, data);
    }
  } catch {
    // swallow
  }

  try {
    // Plausible custom events (props)
    if (typeof window !== "undefined" && typeof (window as any).plausible === "function") {
      (window as any).plausible(name, { props: data });
    }
  } catch {
    // swallow
  }
}
