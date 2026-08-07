// Admins paste all kinds of links into "Video URL" fields — YouTube watch
// pages, Vimeo pages, direct links to a video file, or pages on sites like
// sheetmusicdirect.com that have no embeddable player at all (they send
// X-Frame-Options: SAMEORIGIN and there's no public /embed/ variant, unlike
// YouTube/Vimeo). Only providers confirmed to support iframe embedding get
// "iframe" — everything else falls back to an outbound link rather than an
// iframe that the browser will silently refuse to load.
export type VideoEmbed =
  | { kind: "iframe"; src: string }
  | { kind: "file"; src: string }
  | { kind: "link"; src: string; host: string }
  | { kind: "purchase"; src: string; host: string };

const FILE_EXTENSIONS = [".mp4", ".webm", ".ogg", ".ogv", ".mov", ".m4v"];

// sheetmusicdirect.com links point at a sheet music storefront listing, not
// a video — labeling it "Video" / "Watch on..." is misleading.
const PURCHASE_HOSTS = ["sheetmusicdirect.com"];

function toYouTubeEmbedUrl(parsed: URL): string | null {
  const host = parsed.hostname.replace(/^www\./, "");
  let videoId: string | null = null;

  if (host === "youtu.be") {
    videoId = parsed.pathname.slice(1);
  } else if (host === "youtube.com" || host === "m.youtube.com") {
    if (parsed.pathname === "/watch") {
      videoId = parsed.searchParams.get("v");
    } else if (parsed.pathname.startsWith("/embed/")) {
      return parsed.toString();
    } else if (parsed.pathname.startsWith("/shorts/")) {
      videoId = parsed.pathname.split("/")[2];
    }
  }

  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}

function toVimeoEmbedUrl(parsed: URL): string | null {
  const host = parsed.hostname.replace(/^www\./, "");
  if (host !== "vimeo.com" && host !== "player.vimeo.com") return null;

  if (parsed.pathname.startsWith("/video/")) return parsed.toString();

  const videoId = parsed.pathname.split("/").filter(Boolean).pop();
  return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
}

function isDirectFileUrl(parsed: URL): boolean {
  const path = parsed.pathname.toLowerCase();
  return FILE_EXTENSIONS.some((ext) => path.endsWith(ext));
}

// Resolves any URL an admin might paste into a renderable embed. Anything
// that isn't a known embeddable provider or a direct file link becomes an
// outbound link, since most sites (sheetmusicdirect.com included) refuse to
// render inside an iframe.
export function resolveVideoEmbed(url: string): VideoEmbed {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return { kind: "link", src: url, host: url };
  }

  if (isDirectFileUrl(parsed)) {
    return { kind: "file", src: url };
  }

  const youtube = toYouTubeEmbedUrl(parsed);
  if (youtube) return { kind: "iframe", src: youtube };

  const vimeo = toVimeoEmbedUrl(parsed);
  if (vimeo) return { kind: "iframe", src: vimeo };

  const host = parsed.hostname.replace(/^www\./, "");
  if (PURCHASE_HOSTS.includes(host)) return { kind: "purchase", src: url, host };

  return { kind: "link", src: url, host };
}

// A "Video URL" that actually points to a storefront listing (e.g.
// sheetmusicdirect.com) rather than a video — callers that want to offer a
// purchase link instead of embedding a video use this.
export function getPurchaseLink(url: string | null): { src: string; host: string } | null {
  if (!url) return null;
  const embed = resolveVideoEmbed(url);
  return embed.kind === "purchase" ? { src: embed.src, host: embed.host } : null;
}

// Display host for an arbitrary outbound link (e.g. an admin-entered
// purchase URL) — falls back to the raw string if it isn't a valid URL.
export function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
