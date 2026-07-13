import db from "./db";

export type Composition = {
  id: string;
  title: string;
  description: string | null;
  lyrics: string | null;
  voiceParts: string[];
  pdfUrl: string | null;
  videoUrl: string | null;
  audioUrl: string | null;
};

export type Arrangement = {
  id: string;
  title: string;
  originalComposer: string | null;
  description: string | null;
  lyrics: string | null;
  voiceParts: string[];
  pdfUrl: string | null;
  videoUrl: string | null;
  audioUrl: string | null;
};

export type Event = {
  id: string;
  title: string;
  description: string | null;
  startDate: string;
  endDate: string;
  location: string | null;
  eventDetailsUrl: string | null;
};

export type Gig = {
  id: string;
  choirName: string;
  startDate: string;
  endDate: string;
  summary: string | null;
  videoUrl: string | null;
};

export type SiteSettings = {
  aboutHeading: string;
  aboutBody: string;
  aboutLocation: string;
  aboutSpecialties: string;
  featuredVideoUrl: string;
  featuredVideoTitle: string;
  featuredVideoDescription: string;
  newestCompositionId: string;
  newestArrangementId: string;
  contactInstagram: string;
  contactInstagramHandle: string;
  contactLinkedin: string;
  contactEmail: string;
};

export type ContactInfo = {
  instagram: string;
  instagramHandle: string;
  linkedin: string;
  email: string;
};

function parseVoiceParts(raw: string | null | undefined): string[] {
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function getCompositions(): Promise<Composition[]> {
  const result = await db.execute("SELECT * FROM compositions ORDER BY rowid");

  return result.rows.map((row) => ({
    id: row.id as string,
    title: row.title as string,
    description: row.description as string | null,
    lyrics: row.lyrics as string | null,
    voiceParts: parseVoiceParts(row.voice_parts as string | null),
    pdfUrl: row.pdf_url as string | null,
    videoUrl: row.video_url as string | null,
    audioUrl: row.audio_url as string | null,
  }));
}

export async function getComposition(id: string): Promise<Composition | null> {
  const result = await db.execute({
    sql: "SELECT * FROM compositions WHERE id = ?",
    args: [id],
  });

  if (result.rows.length === 0) return null;

  const row = result.rows[0];

  return {
    id: row.id as string,
    title: row.title as string,
    description: row.description as string | null,
    lyrics: row.lyrics as string | null,
    voiceParts: parseVoiceParts(row.voice_parts as string | null),
    pdfUrl: row.pdf_url as string | null,
    videoUrl: row.video_url as string | null,
    audioUrl: row.audio_url as string | null,
  };
}

export async function getArrangements(): Promise<Arrangement[]> {
  const result = await db.execute("SELECT * FROM arrangements ORDER BY rowid");

  return result.rows.map((row) => ({
    id: row.id as string,
    title: row.title as string,
    originalComposer: row.original_composer as string | null,
    description: row.description as string | null,
    lyrics: row.lyrics as string | null,
    voiceParts: parseVoiceParts(row.voice_parts as string | null),
    pdfUrl: row.pdf_url as string | null,
    videoUrl: row.video_url as string | null,
    audioUrl: row.audio_url as string | null,
  }));
}

export async function getArrangement(id: string): Promise<Arrangement | null> {
  const result = await db.execute({
    sql: "SELECT * FROM arrangements WHERE id = ?",
    args: [id],
  });

  if (result.rows.length === 0) return null;

  const row = result.rows[0];

  return {
    id: row.id as string,
    title: row.title as string,
    originalComposer: row.original_composer as string | null,
    description: row.description as string | null,
    lyrics: row.lyrics as string | null,
    voiceParts: parseVoiceParts(row.voice_parts as string | null),
    pdfUrl: row.pdf_url as string | null,
    videoUrl: row.video_url as string | null,
    audioUrl: row.audio_url as string | null,
  };
}

export async function getUpcomingEvents(): Promise<Event[]> {
  const result = await db.execute(
    "SELECT * FROM events ORDER BY start_date ASC",
  );

  return result.rows.map((row) => ({
    id: row.id as string,
    title: row.title as string,
    description: row.description as string | null,
    startDate: row.start_date as string,
    endDate: row.end_date as string,
    location: row.location as string | null,
    eventDetailsUrl: row.event_details_url as string | null,
  }));
}

export async function getGigs(): Promise<Gig[]> {
  const result = await db.execute(
    "SELECT * FROM gigs ORDER BY start_date DESC",
  );

  return result.rows.map((row) => ({
    id: row.id as string,
    choirName: row.choir_name as string,
    startDate: row.start_date as string,
    endDate: row.end_date as string,
    summary: row.summary as string | null,
    videoUrl: row.video_url as string | null,
  }));
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const result = await db.execute("SELECT key, value FROM site_settings");

  const map: Record<string, string> = {};

  for (const row of result.rows) {
    map[row.key as string] = row.value as string;
  }

  return {
    aboutHeading: map["about_heading"] ?? "",
    aboutBody: map["about_body"] ?? "",
    aboutLocation: map["about_location"] ?? "",
    aboutSpecialties: map["about_specialties"] ?? "",
    featuredVideoUrl: map["featured_video_url"] ?? "",
    featuredVideoTitle: map["featured_video_title"] ?? "",
    featuredVideoDescription: map["featured_video_description"] ?? "",
    newestCompositionId: map["newest_composition_id"] ?? "",
    newestArrangementId: map["newest_arrangement_id"] ?? "",
    contactInstagram: map["contact_instagram"] ?? "",
    contactInstagramHandle: map["contact_instagram_handle"] ?? "",
    contactLinkedin: map["contact_linkedin"] ?? "",
    contactEmail: map["contact_email"] ?? "",
  };
}

export async function getContactInfo(): Promise<ContactInfo> {
  const result = await db.execute(
    "SELECT key, value FROM site_settings WHERE key IN ('contact_instagram','contact_instagram_handle','contact_linkedin','contact_email')",
  );

  const map: Record<string, string> = {};

  for (const row of result.rows) {
    map[row.key as string] = row.value as string;
  }
  
  return {
    instagram: map["contact_instagram"] ?? "",
    instagramHandle: map["contact_instagram_handle"] ?? "",
    linkedin: map["contact_linkedin"] ?? "",
    email: map["contact_email"] ?? "",
  };
}
