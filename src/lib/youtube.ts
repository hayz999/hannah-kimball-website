// Converts any URL an admin might paste (watch, share, youtu.be, shorts, or
// already-embed) into a proper /embed/ URL. YouTube's watch pages send
// X-Frame-Options: sameorigin, so embedding anything but /embed/ in an
// iframe is silently refused by the browser.
export function toYouTubeEmbedUrl(url: string): string {
  if (!url) return url;

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return url;
  }

  const host = parsed.hostname.replace(/^www\./, "");
  let videoId: string | null = null;

  if (host === "youtu.be") {
    videoId = parsed.pathname.slice(1);
  } else if (host === "youtube.com" || host === "m.youtube.com") {
    if (parsed.pathname === "/watch") {
      videoId = parsed.searchParams.get("v");
    } else if (parsed.pathname.startsWith("/embed/")) {
      return url;
    } else if (parsed.pathname.startsWith("/shorts/")) {
      videoId = parsed.pathname.split("/")[2];
    }
  }

  if (!videoId) return url;

  return `https://www.youtube.com/embed/${videoId}`;
}
