import type { Row } from "@libsql/client";
import db from "./db";

export type Composition = {
  id: string;
  title: string;
  description: string | null;
  lyrics: string | null;
  voiceParts: string[];
  pdfPath: string | null;
  pdfPath2: string | null;
  pdfPath3: string | null;
  videoUrl: string | null;
  audioUrl: string | null;
};

export type Arrangement = Composition & {
  originalComposer: string | null;
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

export type VocalistAppearance = {
  id: string;
  title: string;
  description: string | null;
  date: string;
  ticketUrl: string | null;
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
  aboutEducation: string;
  vocalistDescription: string;
  vocalistVideoUrl: string;
  featuredVideoUrl: string;
  featuredVideoTitle: string;
  featuredVideoDescription: string;
  featuredCompositionId: string;
  featuredArrangementId: string;
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

function mapSongRow(row: Row): Composition {
  return {
    id: row.id as string,
    title: row.title as string,
    description: row.description as string | null,
    lyrics: row.lyrics as string | null,
    voiceParts: parseVoiceParts(row.voice_parts as string | null),
    pdfPath: row.pdf_path as string | null,
    pdfPath2: row.pdf_path_2 as string | null,
    pdfPath3: row.pdf_path_3 as string | null,
    videoUrl: row.video_url as string | null,
    audioUrl: row.audio_url as string | null,
  };
}

function mapArrangementRow(row: Row): Arrangement {
  return {
    ...mapSongRow(row),
    originalComposer: row.original_composer as string | null,
  };
}

export async function getCompositions(): Promise<Composition[]> {
  const result = await db.execute("SELECT * FROM compositions ORDER BY rowid");
  return result.rows.map(mapSongRow);
}

export async function getComposition(id: string): Promise<Composition | null> {
  const result = await db.execute({
    sql: "SELECT * FROM compositions WHERE id = ?",
    args: [id],
  });

  if (result.rows.length === 0) return null;
  return mapSongRow(result.rows[0]);
}

export async function getArrangements(): Promise<Arrangement[]> {
  const result = await db.execute("SELECT * FROM arrangements ORDER BY rowid");
  return result.rows.map(mapArrangementRow);
}

export async function getArrangement(id: string): Promise<Arrangement | null> {
  const result = await db.execute({
    sql: "SELECT * FROM arrangements WHERE id = ?",
    args: [id],
  });

  if (result.rows.length === 0) return null;
  return mapArrangementRow(result.rows[0]);
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

export async function getVocalistAppearances(): Promise<VocalistAppearance[]> {
  const result = await db.execute(
    "SELECT * FROM vocalist_appearances ORDER BY date ASC",
  );

  return result.rows.map((row) => ({
    id: row.id as string,
    title: row.title as string,
    description: row.description as string | null,
    date: row.date as string,
    ticketUrl: row.ticket_url as string | null,
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
    aboutEducation: map["about_education"] ?? "",
    vocalistDescription: map["vocalist_description"] ?? "",
    vocalistVideoUrl: map["vocalist_video_url"] ?? "",
    featuredVideoUrl: map["featured_video_url"] ?? "",
    featuredVideoTitle: map["featured_video_title"] ?? "",
    featuredVideoDescription: map["featured_video_description"] ?? "",
    featuredCompositionId: map["featured_composition_id"] ?? "",
    featuredArrangementId: map["featured_arrangement_id"] ?? "",
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
