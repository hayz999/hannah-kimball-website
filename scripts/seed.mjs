import { createClient } from "@libsql/client";
import { readFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
  console.error("Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN env vars");
  process.exit(1);
}

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const dataDir = join(__dirname, "../src/app/data");
const home = JSON.parse(readFileSync(join(dataDir, "home.json"), "utf-8"));
const about = JSON.parse(readFileSync(join(dataDir, "about.json"), "utf-8"));
const compositions = JSON.parse(readFileSync(join(dataDir, "compositions.json"), "utf-8"));
const arrangements = JSON.parse(readFileSync(join(dataDir, "arrangements.json"), "utf-8"));
const choralDirecting = JSON.parse(readFileSync(join(dataDir, "choral-directing.json"), "utf-8"));
const contact = JSON.parse(readFileSync(join(dataDir, "contact.json"), "utf-8"));

async function seed() {
  console.log("Creating tables...");

  await db.execute(`
    CREATE TABLE IF NOT EXISTS compositions (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      lyrics TEXT,
      voice_parts TEXT,
      pdf_url TEXT,
      video_url TEXT,
      audio_url TEXT
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS arrangements (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      original_composer TEXT,
      description TEXT,
      lyrics TEXT,
      voice_parts TEXT,
      pdf_url TEXT,
      video_url TEXT,
      audio_url TEXT
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS events (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      start_date TEXT,
      end_date TEXT,
      location TEXT,
      event_details_url TEXT
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS gigs (
      id TEXT PRIMARY KEY,
      choir_name TEXT NOT NULL,
      start_date TEXT,
      end_date TEXT,
      summary TEXT,
      video_url TEXT
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT
    )
  `);

  console.log("Seeding compositions...");
  for (const song of compositions.songs) {
    await db.execute({
      sql: `INSERT OR REPLACE INTO compositions
              (id, title, description, lyrics, voice_parts, pdf_url, video_url, audio_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        song.id,
        song.title,
        song.description || null,
        song.lyrics || null,
        JSON.stringify(song.voiceParts),
        song.pdfUrl ?? null,
        song.videoUrl ?? null,
        song.audioUrl ?? null,
      ],
    });
  }

  console.log("Seeding arrangements...");
  for (const song of arrangements.songs) {
    await db.execute({
      sql: `INSERT OR REPLACE INTO arrangements
              (id, title, original_composer, description, lyrics, voice_parts, pdf_url, video_url, audio_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        song.id,
        song.title,
        song.originalComposer ?? null,
        song.description || null,
        song.lyrics || null,
        JSON.stringify(song.voiceParts),
        song.pdfUrl ?? null,
        song.videoUrl ?? null,
        song.audioUrl ?? null,
      ],
    });
  }

  console.log("Seeding events...");
  for (const event of home.upcomingEvents) {
    await db.execute({
      sql: `INSERT OR REPLACE INTO events
              (id, title, description, start_date, end_date, location, event_details_url)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [
        event.id,
        event.title,
        event.description || null,
        event.startDate,
        event.endDate,
        event.location || null,
        event.eventDetailsUrl ?? null,
      ],
    });
  }

  console.log("Seeding gigs...");
  for (const gig of choralDirecting.gigs) {
    await db.execute({
      sql: `INSERT OR REPLACE INTO gigs
              (id, choir_name, start_date, end_date, summary, video_url)
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: [
        gig.id,
        gig.choirName,
        gig.startDate || null,
        gig.endDate || null,
        gig.summary || null,
        gig.videoUrl ?? null,
      ],
    });
  }

  console.log("Seeding site settings...");
  const settings = {
    about_heading: about.heading,
    about_body: about.body,
    about_location: about.location,
    about_specialties: about.specialties,
    featured_video_url: home.featuredVideo.url,
    featured_video_title: home.featuredVideo.title,
    featured_video_description: home.featuredVideo.description,
    newest_composition_id: home.newestComposition,
    newest_arrangement_id: home.newestArrangement,
    contact_instagram: contact.instagram,
    contact_instagram_handle: contact.instagramHandle,
    contact_linkedin: contact.linkedin,
    contact_email: contact.email,
  };

  for (const [key, value] of Object.entries(settings)) {
    await db.execute({
      sql: "INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)",
      args: [key, value],
    });
  }

  console.log("Seed complete!");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
